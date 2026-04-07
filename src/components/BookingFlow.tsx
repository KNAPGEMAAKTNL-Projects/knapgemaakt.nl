import { useState, useEffect, useRef } from 'react';
import { Clock, ChevronLeft, ChevronRight, Globe, ArrowLeft, Check, Video, Phone as PhoneIcon } from 'lucide-react';

// ─── Types ─────────────────────────────────────────────────────────────────────

interface TimeSlot {
  start: string;
  end: string;
  display: string;
  endDisplay: string;
}

interface MonthData {
  bookings: Array<{ start: string; end: string }>;
  blockedTimes: Array<{ start: string; end: string }>;
  config: {
    businessHours: Record<string, { enabled: boolean; start: string; end: string }>;
    slotDuration: number;
    minAdvanceBooking: number;
    maxAdvanceBooking: number;
  };
}

type Step = 'calendar' | 'form' | 'confirmed';
type Duration = 15 | 30 | 60;
type MeetingType = 'google-meet' | 'zoom' | 'phone';

// ─── Constants ─────────────────────────────────────────────────────────────────

const COUNTRIES = [
  { code: 'NL', dial: '+31', flag: '\u{1F1F3}\u{1F1F1}', placeholder: '06 12345678' },
  { code: 'BE', dial: '+32', flag: '\u{1F1E7}\u{1F1EA}', placeholder: '0470 12 34 56' },
  { code: 'DE', dial: '+49', flag: '\u{1F1E9}\u{1F1EA}', placeholder: '0170 1234567' },
  { code: 'GB', dial: '+44', flag: '\u{1F1EC}\u{1F1E7}', placeholder: '07911 123456' },
  { code: 'FR', dial: '+33', flag: '\u{1F1EB}\u{1F1F7}', placeholder: '06 12 34 56 78' },
  { code: 'ES', dial: '+34', flag: '\u{1F1EA}\u{1F1F8}', placeholder: '612 34 56 78' },
  { code: 'IT', dial: '+39', flag: '\u{1F1EE}\u{1F1F9}', placeholder: '320 123 4567' },
  { code: 'AT', dial: '+43', flag: '\u{1F1E6}\u{1F1F9}', placeholder: '0664 1234567' },
  { code: 'CH', dial: '+41', flag: '\u{1F1E8}\u{1F1ED}', placeholder: '078 123 45 67' },
  { code: 'PL', dial: '+48', flag: '\u{1F1F5}\u{1F1F1}', placeholder: '501 234 567' },
];

const DURATIONS: { value: Duration; label: string }[] = [
  { value: 15, label: '15 min' },
  { value: 30, label: '30 min' },
  { value: 60, label: '60 min' },
];

const MEETING_TYPES: { value: MeetingType; label: string; icon: 'video' | 'phone' }[] = [
  { value: 'google-meet', label: 'Google Meet', icon: 'video' },
  { value: 'zoom', label: 'Zoom', icon: 'video' },
  { value: 'phone', label: 'Telefoon', icon: 'phone' },
];

const SPEC_MAP: Record<MeetingType, string> = {
  'google-meet': 'Videogesprek (Google Meet)',
  'zoom': 'Videogesprek (Zoom)',
  'phone': 'Telefoongesprek',
};

// ─── Calendar Utilities ────────────────────────────────────────────────────────

function getLastSundayOfMonth(year: number, month: number): number {
  const lastDay = new Date(year, month + 1, 0);
  const dow = lastDay.getDay();
  return lastDay.getDate() - (dow === 0 ? 0 : dow);
}

function getAmsterdamOffset(date: Date): number {
  const y = date.getFullYear();
  const dstStart = new Date(Date.UTC(y, 2, getLastSundayOfMonth(y, 2), 1, 0, 0));
  const dstEnd = new Date(Date.UTC(y, 9, getLastSundayOfMonth(y, 9), 1, 0, 0));
  const t = date.getTime();
  return (t >= dstStart.getTime() && t < dstEnd.getTime()) ? 7200000 : 3600000;
}

function formatTimeAmsterdam(date: Date): string {
  const offset = getAmsterdamOffset(date);
  const ams = new Date(date.getTime() + offset);
  return `${ams.getUTCHours().toString().padStart(2, '0')}:${ams.getUTCMinutes().toString().padStart(2, '0')}`;
}

function generateTimeSlotsForDay(
  date: Date, startTime: string, endTime: string, duration: number
): TimeSlot[] {
  const slots: TimeSlot[] = [];
  const [sh, sm] = startTime.split(':').map(Number);
  const [eh, em] = endTime.split(':').map(Number);
  const offset = getAmsterdamOffset(date);

  const dayStart = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), sh, sm) - offset
  );
  const dayEnd = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), eh, em) - offset
  );

  let current = dayStart.getTime();
  const end = dayEnd.getTime();
  const durationMs = duration * 60000;

  while (current + durationMs <= end) {
    const s = new Date(current);
    const e = new Date(current + durationMs);
    slots.push({
      start: s.toISOString(),
      end: e.toISOString(),
      display: formatTimeAmsterdam(s),
      endDisplay: formatTimeAmsterdam(e),
    });
    current += durationMs;
  }
  return slots;
}

function formatDateString(date: Date): string {
  const y = date.getFullYear();
  const m = (date.getMonth() + 1).toString().padStart(2, '0');
  const d = date.getDate().toString().padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function getDaysInMonth(date: Date): (Date | null)[] {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDow = (firstDay.getDay() + 6) % 7; // Monday = 0

  const days: (Date | null)[] = [];
  for (let i = 0; i < startDow; i++) days.push(null);
  for (let day = 1; day <= daysInMonth; day++) days.push(new Date(year, month, day));
  return days;
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function BookingFlow() {
  // ── State ──────────────────────────────────────────────────────────────────
  const [step, setStep] = useState<Step>('calendar');
  const [duration, setDuration] = useState<Duration>(30);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [monthData, setMonthData] = useState<MonthData | null>(null);
  const [monthLoading, setMonthLoading] = useState(false);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [slotsError, setSlotsError] = useState<string | null>(null);

  const [meetingType, setMeetingType] = useState<MeetingType | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryIdx, setCountryIdx] = useState(0);
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState('');

  const slotsRef = useRef<HTMLDivElement>(null);
  const turnstileRef = useRef<HTMLDivElement>(null);
  const targetScrollRef = useRef(0);
  const isScrollingRef = useRef(false);
  const autoSelectDone = useRef(false);
  const timeSlotsColumnRef = useRef<HTMLDivElement>(null);

  // ── Effects ────────────────────────────────────────────────────────────────

  // Fetch month data
  useEffect(() => {
    const fetchMonth = async () => {
      setMonthLoading(true);
      try {
        const y = currentMonth.getFullYear();
        const m = currentMonth.getMonth() + 1;
        const res = await fetch(`/api/availability-month?year=${y}&month=${m}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Kon beschikbaarheid niet laden');
        setMonthData(data);
      } catch (err) {
        console.error('Error fetching month data:', err);
      } finally {
        setMonthLoading(false);
      }
    };
    fetchMonth();
  }, [currentMonth]);

  // Auto-select first available date (runs once on initial load)
  useEffect(() => {
    if (!monthData || autoSelectDone.current) return;
    autoSelectDone.current = true;

    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      if (!checkDateDisabled(d, monthData, duration)) {
        setSelectedDate(formatDateString(d));
        // Ensure calendar shows the right month
        if (d.getMonth() !== currentMonth.getMonth() || d.getFullYear() !== currentMonth.getFullYear()) {
          setCurrentMonth(new Date(d.getFullYear(), d.getMonth()));
        }
        return;
      }
    }
  }, [monthData]);

  // Generate slots when date/duration/data changes
  useEffect(() => {
    if (!selectedDate || !monthData) return;
    generateSlots(selectedDate, monthData, duration);
    setSelectedSlot(null);
  }, [selectedDate, monthData, duration]);

  // Render Turnstile widget when entering form step
  useEffect(() => {
    if (step !== 'form' || !turnstileRef.current) return;
    const win = window as any;
    if (!win.turnstile) return;

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      if (turnstileRef.current) {
        turnstileRef.current.innerHTML = '';
        win.turnstile.render(turnstileRef.current, {
          sitekey: '0x4AAAAAACzkKUPSoLBK6a1f',
          theme: 'dark',
          size: 'invisible',
          appearance: 'interaction-only',
        });
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [step]);

  // Smooth wheel scroll on time slots
  useEffect(() => {
    const el = slotsRef.current;
    if (!el) return;
    el.scrollTop = 0;
    targetScrollRef.current = 0;

    const smoothScroll = () => {
      const c = slotsRef.current;
      if (!c) return;
      const diff = targetScrollRef.current - c.scrollTop;
      if (Math.abs(diff) < 0.5) {
        c.scrollTop = targetScrollRef.current;
        isScrollingRef.current = false;
        return;
      }
      c.scrollTop += diff * 0.15;
      requestAnimationFrame(smoothScroll);
    };

    const onWheel = (e: WheelEvent) => {
      if (el.scrollHeight <= el.clientHeight) return;
      e.preventDefault();
      e.stopPropagation();
      if (!isScrollingRef.current) targetScrollRef.current = el.scrollTop;
      let delta = e.deltaY;
      if (e.deltaMode === 1) delta *= 20;
      if (e.deltaMode === 2) delta *= 400;
      const max = el.scrollHeight - el.clientHeight;
      targetScrollRef.current = Math.max(0, Math.min(targetScrollRef.current + delta, max));
      if (!isScrollingRef.current) {
        isScrollingRef.current = true;
        requestAnimationFrame(smoothScroll);
      }
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [selectedDate]);

  // ── Calendar Logic ─────────────────────────────────────────────────────────

  function checkDateDisabled(date: Date | null, data: MonthData | null, dur: number): boolean {
    if (!date || !data) return true;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) return true;

    const dow = (date.getDay() + 6) % 7;
    const dayNames = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const cfg = data.config.businessHours[dayNames[dow]];
    if (!cfg?.enabled) return true;

    const now = new Date();
    const minTime = new Date(now.getTime() + data.config.minAdvanceBooking * 60000);
    const maxDate = new Date(now.getTime() + data.config.maxAdvanceBooking * 86400000);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    if (endOfDay < minTime || date > maxDate) return true;

    const slots = generateTimeSlotsForDay(date, cfg.start, cfg.end, dur);
    return !slots.some(slot => {
      const ss = new Date(slot.start).getTime();
      const se = new Date(slot.end).getTime();
      if (ss < minTime.getTime() || ss > maxDate.getTime()) return false;
      const booked = data.bookings.some(b =>
        ss < new Date(b.end).getTime() && se > new Date(b.start).getTime()
      );
      const blocked = data.blockedTimes.some(b =>
        ss < new Date(b.end).getTime() && se > new Date(b.start).getTime()
      );
      return !booked && !blocked;
    });
  }

  const isDateDisabled = (date: Date | null) => checkDateDisabled(date, monthData, duration);

  function generateSlots(dateStr: string, data: MonthData, dur: number) {
    setSlotsLoading(true);
    setSlotsError(null);
    try {
      const date = new Date(dateStr);
      const dow = (date.getDay() + 6) % 7;
      const dayNames = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
      const cfg = data.config.businessHours[dayNames[dow]];

      if (!cfg?.enabled) {
        setAvailableSlots([]);
        setSlotsError('Geen beschikbaarheid op deze dag');
        setSlotsLoading(false);
        return;
      }

      const now = new Date();
      const minTime = new Date(now.getTime() + data.config.minAdvanceBooking * 60000);
      const maxDate = new Date(now.getTime() + data.config.maxAdvanceBooking * 86400000);

      const all = generateTimeSlotsForDay(date, cfg.start, cfg.end, dur);
      const available = all.filter(slot => {
        const ss = new Date(slot.start).getTime();
        const se = new Date(slot.end).getTime();
        if (ss < minTime.getTime() || ss > maxDate.getTime()) return false;
        const booked = data.bookings.some(b =>
          ss < new Date(b.end).getTime() && se > new Date(b.start).getTime()
        );
        const blocked = data.blockedTimes.some(b =>
          ss < new Date(b.end).getTime() && se > new Date(b.start).getTime()
        );
        return !booked && !blocked;
      });

      setAvailableSlots(available);
      if (available.length === 0) setSlotsError('Geen tijden beschikbaar');
    } catch {
      setSlotsError('Kon tijden niet laden');
      setAvailableSlots([]);
    } finally {
      setSlotsLoading(false);
    }
  }

  // ── Handlers ───────────────────────────────────────────────────────────────

  const handleDurationChange = (d: Duration) => {
    if (d === duration) return;
    setDuration(d);
    setSelectedSlot(null);
    if (step === 'form') setStep('calendar');
  };

  const handleDateClick = (date: Date) => {
    if (isDateDisabled(date)) return;
    setSelectedDate(formatDateString(date));

    // On mobile, gently scroll to reveal time slots below the calendar
    if (window.innerWidth < 1024) {
      setTimeout(() => {
        const el = timeSlotsColumnRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        // Only nudge if time slots are mostly below the visible area
        if (rect.top > window.innerHeight * 0.65) {
          const start = window.scrollY;
          const target = start + rect.top - window.innerHeight * 0.5;
          const distance = target - start;
          const duration = 800;
          let t0: number | null = null;
          const ease = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
          const step = (ts: number) => {
            if (!t0) t0 = ts;
            const progress = Math.min((ts - t0) / duration, 1);
            window.scrollTo(0, start + distance * ease(progress));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      }, 500);
    }
  };

  const handleSlotClick = (slot: TimeSlot) => {
    setSelectedSlot(slot);
  };

  const handleConfirm = () => {
    if (!selectedSlot) return;
    setStep('form');
    setFormError(null);
  };

  const handleBack = () => {
    setStep('calendar');
    setFormError(null);
  };

  const goToPreviousMonth = () => {
    setSelectedDate('');
    setSelectedSlot(null);
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const goToNextMonth = () => {
    setSelectedDate('');
    setSelectedSlot(null);
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const isPrevMonthDisabled = () => {
    const today = new Date();
    return currentMonth.getMonth() === today.getMonth() && currentMonth.getFullYear() === today.getFullYear();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Honeypot — silently reject
    if (honeypot) {
      setStep('confirmed');
      return;
    }

    if (!meetingType) { setFormError('Kies hoe je wilt afspreken'); return; }
    if (!name.trim()) { setFormError('Vul je naam in'); return; }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFormError('Vul een geldig e-mailadres in'); return;
    }
    if (meetingType === 'phone' && !phone.trim()) {
      setFormError('Vul je telefoonnummer in'); return;
    }
    if (!privacyChecked) {
      setFormError('Ga akkoord met de privacyverklaring'); return;
    }

    const turnstileInput = turnstileRef.current?.querySelector<HTMLInputElement>(
      '[name="cf-turnstile-response"]'
    );
    const token = turnstileInput?.value || '';
    if (!token) {
      setFormError('Beveiligingsverificatie laden... Probeer het over een paar seconden opnieuw.');
      return;
    }

    setSubmitting(true);

    // Strip leading 0 (trunk prefix) when combining with country code
    // e.g. NL: 0623571852 → +31 623571852
    const localNumber = phone.trim().replace(/^0+/, '');
    const phoneNumber = meetingType === 'phone'
      ? `${COUNTRIES[countryIdx].dial}${localNumber}`
      : undefined;

    try {
      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'aanvraag',
          specification: SPEC_MAP[meetingType],
          name: name.trim(),
          email: email.trim(),
          phone: phoneNumber || '',
          start_time: selectedSlot!.start,
          end_time: selectedSlot!.end,
          meeting_type: meetingType,
          'cf-turnstile-response': token,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Er ging iets mis');
      setStep('confirmed');
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Er ging iets mis. Probeer het opnieuw.');
    } finally {
      setSubmitting(false);
    }
  };

  // ── Derived Values ─────────────────────────────────────────────────────────

  const days = getDaysInMonth(currentMonth);
  const monthName = currentMonth.toLocaleDateString('nl-NL', { month: 'long' }).toLowerCase();
  const yearNum = currentMonth.getFullYear();

  const selectedDateFormatted = selectedDate
    ? new Date(selectedDate).toLocaleDateString('nl-NL', {
        weekday: 'long', day: 'numeric', month: 'long',
      })
    : '';

  // ── Render: Confirmation ───────────────────────────────────────────────────

  if (step === 'confirmed') {
    return (
      <div className="w-full max-w-lg mx-auto bg-black border border-white/10 rounded-2xl p-8 md:p-12 text-center space-y-6 animate-in fade-in zoom-in-95 duration-500">
        <div className="w-16 h-16 mx-auto bg-[var(--color-accent)] rounded-xl flex items-center justify-center">
          <Check size={32} className="text-black" strokeWidth={3} />
        </div>
        <h2 className="text-3xl font-bold text-white tracking-tight">
          Afspraak bevestigd!
        </h2>
        <div className="space-y-1 text-zinc-300">
          <p className="font-medium text-white capitalize">{selectedDateFormatted}</p>
          <p>{selectedSlot?.display} – {selectedSlot?.endDisplay}</p>
          <p>{duration} minuten &middot; {MEETING_TYPES.find(m => m.value === meetingType)?.label}</p>
        </div>
        <p className="text-zinc-400 text-sm">
          Check je inbox voor de bevestiging met alle details.
        </p>
        <div className="pt-4">
          <p className="text-[10px] text-zinc-600 uppercase tracking-widest font-mono">
            Gemaakt door <span className="text-white">KNAP GEMAAKT.</span>
          </p>
        </div>
      </div>
    );
  }

  // ── Render: Calendar + Form ────────────────────────────────────────────────

  return (
    <div className="w-full bg-black border-y lg:border border-white/10 shadow-none lg:shadow-2xl flex flex-col lg:flex-row overflow-hidden h-auto lg:h-[535px] animate-in fade-in zoom-in-95 duration-500 lg:rounded-2xl text-white font-sans">

      {/* ── Sidebar ── */}
      <div className="w-full lg:w-[240px] shrink-0 p-4 md:p-5 border-b lg:border-b-0 lg:border-r border-white/10 bg-[#111111] flex flex-col gap-6 relative">

        {step === 'form' && (
          <button
            type="button"
            onClick={handleBack}
            className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors -mb-2"
          >
            <ArrowLeft size={16} /> Terug
          </button>
        )}

        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-white uppercase tracking-tight leading-none">
            Gesprek plannen<span className="text-[var(--color-accent)]">.</span>
          </h3>
          <div className="flex items-center gap-3">
            <img
              src="/assets/yannick.webp"
              alt="Yannick Veldhuisen"
              className="w-10 h-10 rounded-full object-cover object-top shrink-0 ring-2 ring-[var(--color-accent)]/30"
            />
            <span className="text-sm font-medium text-zinc-300">Yannick Veldhuisen</span>
          </div>
        </div>

        {/* Duration picker (calendar step) or selected time summary (form step) */}
        {step === 'calendar' ? (
          <div className="space-y-3">
            <label className="text-[10px] uppercase tracking-widest font-mono text-zinc-500">
              Duur
            </label>
            <div className="flex gap-2">
              {DURATIONS.map(d => (
                <button
                  key={d.value}
                  type="button"
                  onClick={() => handleDurationChange(d.value)}
                  className={`flex-1 py-2 text-sm font-bold rounded-lg border transition-all ${
                    duration === d.value
                      ? 'bg-[var(--color-accent)] border-[var(--color-accent)] text-black'
                      : 'border-white/10 text-zinc-400 hover:border-white/20 hover:text-white'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-2 text-sm">
            <p className="font-medium text-white capitalize">{selectedDateFormatted}</p>
            <div className="flex items-center gap-2 text-zinc-300">
              <Clock size={14} className="text-[var(--color-accent)]" />
              <span>{selectedSlot?.display} – {selectedSlot?.endDisplay}</span>
            </div>
            <p className="text-zinc-400">{duration} minuten</p>
          </div>
        )}

        <div className="flex items-center gap-3 text-sm text-zinc-400">
          <Globe size={14} className="text-[var(--color-accent)]" />
          <span>Europe/Amsterdam</span>
        </div>

        <div className="mt-auto pt-4">
          <p className="text-[10px] text-zinc-600 uppercase tracking-widest font-mono">
            Gemaakt door <span className="text-white">KNAP GEMAAKT.</span>
          </p>
        </div>
      </div>

      {/* ── Main Content ── */}
      {step === 'calendar' ? (
        <>
          {/* Calendar Grid */}
          <div className="w-full lg:flex-1 lg:min-w-[340px] p-4 md:p-5 flex flex-col bg-black relative">
            {/* Month Header */}
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xl text-white tracking-tight flex gap-2">
                <span className="font-bold">{monthName}</span>
                <span className="font-medium text-white/50">{yearNum}</span>
              </h4>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={goToPreviousMonth}
                  disabled={isPrevMonthDisabled()}
                  className={`p-2 transition-colors border border-transparent rounded-lg ${
                    isPrevMonthDisabled()
                      ? 'text-zinc-500 cursor-not-allowed'
                      : 'text-white hover:bg-white/5 hover:border-white/10'
                  }`}
                  aria-label="Vorige maand"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  onClick={goToNextMonth}
                  className="p-2 hover:bg-white/5 transition-colors text-white border border-transparent hover:border-white/10 rounded-lg"
                  aria-label="Volgende maand"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            {/* Weekday Headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['ma', 'di', 'wo', 'do', 'vr', 'za', 'zo'].map(day => (
                <div key={day} className="text-center text-sm font-mono uppercase text-zinc-300 font-bold py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Day Grid */}
            <div className="grid grid-cols-7 gap-1">
              {days.map((date, index) => {
                if (!date) return <div key={`e-${index}`} />;
                const disabled = isDateDisabled(date);
                const isSelected = selectedDate === formatDateString(date);
                const isToday = formatDateString(new Date()) === formatDateString(date);
                const available = !disabled;

                return (
                  <button
                    type="button"
                    key={index}
                    onClick={() => handleDateClick(date)}
                    disabled={disabled}
                    className={`
                      aspect-square w-full flex items-center justify-center text-sm transition-all relative border border-transparent rounded-lg
                      ${isSelected ? 'bg-[var(--color-accent)] text-black font-bold border-[var(--color-accent)]' : ''}
                      ${!isSelected && available ? 'bg-[#1a1a1a] text-zinc-200 font-bold hover:border-[var(--color-accent)]/50 hover:bg-[#222]' : ''}
                      ${!isSelected && !available ? 'text-zinc-500 font-normal cursor-default hover:bg-transparent' : ''}
                      ${isToday && !isSelected ? 'text-[var(--color-accent)] font-bold relative after:content-[""] after:absolute after:bottom-1.5 after:w-1 after:h-1 after:bg-[var(--color-accent)] after:rounded-full' : ''}
                    `}
                  >
                    {date.getDate()}
                  </button>
                );
              })}
            </div>

            {/* Loading Overlay */}
            {monthLoading && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-zinc-700 border-t-[var(--color-accent)] rounded-full animate-spin" />
              </div>
            )}
          </div>

          {/* Time Slots Column */}
          <div ref={timeSlotsColumnRef} className={`w-full lg:w-[260px] shrink-0 p-4 pb-0 md:p-5 md:pb-0 border-t lg:border-t-0 lg:border-l border-white/10 bg-[#0a0a0a] transition-all duration-300 flex flex-col overflow-hidden ${
            selectedDate ? 'opacity-100' : 'opacity-30 pointer-events-none'
          }`}>
            {!selectedDate ? (
              <div className="h-full flex flex-col items-center justify-center text-zinc-600 space-y-4 py-12 lg:py-0">
                <div className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center">
                  <Clock size={20} className="text-zinc-700" />
                </div>
                <div className="text-xs font-mono uppercase tracking-widest text-center">
                  Kies een datum
                </div>
              </div>
            ) : (
              <div className="flex-1 min-h-0 flex flex-col animate-in fade-in slide-in-from-right-4 duration-300">
                {/* Selected Day Header */}
                <div className="mb-2 pb-2 border-b border-white/5">
                  <h4 className="text-xl text-white tracking-tight flex gap-2">
                    <span className="font-bold">
                      {new Date(selectedDate).toLocaleDateString('nl-NL', { weekday: 'short' }).toLowerCase()}
                    </span>
                    <span className="font-medium text-white/80">
                      {new Date(selectedDate).getDate()}
                    </span>
                  </h4>
                </div>

                {/* Scrollable Slot List */}
                <div
                  ref={slotsRef}
                  className="flex-1 min-h-0 overflow-y-scroll overscroll-contain space-y-2 touch-pan-y pt-1 pb-4 scrollbar-hide"
                  style={{ WebkitOverflowScrolling: 'touch' }}
                >
                  {slotsLoading && (
                    <div className="flex flex-col items-center justify-center py-10 gap-4 text-zinc-500">
                      <div className="w-5 h-5 border-2 border-zinc-800 border-t-[var(--color-accent)] rounded-full animate-spin" />
                      <span className="text-xs font-mono uppercase tracking-widest">Laden...</span>
                    </div>
                  )}

                  {slotsError && !slotsLoading && (
                    <div className="text-zinc-500 text-sm text-center py-4">{slotsError}</div>
                  )}

                  {!slotsLoading && availableSlots.map((slot, i) => {
                    const isSelected = selectedSlot?.start === slot.start;
                    return (
                      <div key={i} className="flex gap-1.5">
                        <button
                          type="button"
                          onClick={() => !isSelected && handleSlotClick(slot)}
                          className={`
                            flex-1 min-w-0 px-3 py-2 border text-sm font-bold rounded-lg transition-colors
                            bg-[#1a1a1a] border-white/5 text-zinc-200
                            ${!isSelected ? 'hover:border-[var(--color-accent)]/50 hover:bg-[#222] cursor-pointer' : ''}
                          `}
                        >
                          {slot.display}
                        </button>
                        {isSelected && (
                          <div
                            className="shrink-0 overflow-hidden"
                            ref={el => {
                              if (!el) return;
                              el.style.maxWidth = '0';
                              el.style.opacity = '0';
                              requestAnimationFrame(() => {
                                requestAnimationFrame(() => {
                                  el.style.transition = 'max-width 350ms cubic-bezier(0.16,1,0.3,1), opacity 250ms ease-out 80ms';
                                  el.style.maxWidth = '120px';
                                  el.style.opacity = '1';
                                });
                              });
                            }}
                          >
                            <button
                              type="button"
                              onClick={handleConfirm}
                              className="px-3 py-2 bg-[var(--color-accent)] text-black text-sm font-bold rounded-lg whitespace-nowrap cursor-pointer"
                            >
                              Bevestig
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

              </div>
            )}
          </div>
        </>
      ) : (
        /* ── Form Step ── */
        <div className="w-full lg:flex-1 p-4 md:p-6 lg:p-8 bg-black overflow-y-auto scrollbar-hide animate-in fade-in slide-in-from-right-4 duration-300">
          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">

            {/* Meeting Type */}
            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-widest font-mono text-zinc-500">
                Via
              </label>
              <div className="grid grid-cols-3 gap-2">
                {MEETING_TYPES.map(mt => (
                  <button
                    key={mt.value}
                    type="button"
                    onClick={() => setMeetingType(mt.value)}
                    className={`py-3 px-2 border rounded-lg text-center transition-all flex flex-col items-center gap-1.5 ${
                      meetingType === mt.value
                        ? 'bg-[var(--color-accent)] border-[var(--color-accent)] text-black'
                        : 'border-white/10 text-zinc-400 hover:border-white/20 hover:text-white'
                    }`}
                  >
                    {mt.icon === 'video' ? <Video size={18} /> : <PhoneIcon size={18} />}
                    <span className="text-xs font-bold leading-tight">{mt.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Name */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-mono text-zinc-500">
                Naam
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Je volledige naam"
                className="w-full bg-[#111] border border-white/10 rounded-lg py-3 px-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/20 transition-colors"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-mono text-zinc-500">
                E-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="je@email.nl"
                className="w-full bg-[#111] border border-white/10 rounded-lg py-3 px-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/20 transition-colors"
              />
            </div>

            {/* Phone (conditional: only for phone meetings) */}
            {meetingType === 'phone' && (
              <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                <label className="text-[10px] uppercase tracking-widest font-mono text-zinc-500">
                  Telefoon
                </label>
                <div className="flex gap-2">
                  <div className="relative shrink-0">
                    <select
                      value={countryIdx}
                      onChange={e => setCountryIdx(Number(e.target.value))}
                      className="bg-[#111] border border-white/10 rounded-lg py-3 pl-3 pr-7 text-white focus:outline-none focus:border-[var(--color-accent)] transition-colors appearance-none cursor-pointer text-sm h-full"
                    >
                      {COUNTRIES.map((c, i) => (
                        <option key={c.code} value={i}>
                          {c.flag} {c.dial}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
                      <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                        <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder={COUNTRIES[countryIdx].placeholder}
                    className="flex-1 min-w-0 bg-[#111] border border-white/10 rounded-lg py-3 px-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/20 transition-colors"
                  />
                </div>
              </div>
            )}

            {/* Honeypot (hidden from real users, catches bots) */}
            <div style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true">
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={e => setHoneypot(e.target.value)}
              />
            </div>

            {/* Privacy */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={privacyChecked}
                onChange={e => setPrivacyChecked(e.target.checked)}
                className="mt-1 w-4 h-4 shrink-0 accent-[var(--color-accent)] cursor-pointer"
                id="plan-privacy"
              />
              <label htmlFor="plan-privacy" className="text-xs text-zinc-500 cursor-pointer">
                Ik ga akkoord met de{' '}
                <a
                  href="/privacy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-white transition-colors"
                >
                  privacyverklaring
                </a>
              </label>
            </div>

            {/* Turnstile */}
            <div ref={turnstileRef} />

            {/* Error */}
            {formError && (
              <div className="p-3 border border-red-500/30 bg-red-500/10 rounded-lg text-red-400 text-sm animate-in fade-in duration-200">
                {formError}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 bg-[var(--color-accent)] text-black font-bold rounded-lg hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {submitting ? (
                <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              ) : (
                'Afspraak bevestigen'
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
