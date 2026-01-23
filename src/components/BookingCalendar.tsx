import { useState, useEffect, useRef } from 'react';
import { Clock, ChevronLeft, ChevronRight, User, Globe, Check } from 'lucide-react';

interface TimeSlot {
  start: string;
  end: string;
  display: string;
}

interface BookingCalendarProps {
  onSlotSelect?: (slot: { start: string; end: string }) => void;
  selectedSlot?: { start: string; end: string } | null;
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

export default function BookingCalendar({ onSlotSelect, selectedSlot: selectedSlotProp }: BookingCalendarProps = {}) {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState<{ start: string; end: string } | null>(null);
  const [monthData, setMonthData] = useState<MonthData | null>(null);
  const [monthLoading, setMonthLoading] = useState(false);
  const slotsContainerRef = useRef<HTMLDivElement>(null);
  const targetScrollRef = useRef(0);
  const isScrollingRef = useRef(false);

  // Handle wheel scroll on time slots container with smooth easing
  useEffect(() => {
    const el = slotsContainerRef.current;
    if (!el) return;

    // Reset scroll position when date changes
    el.scrollTop = 0;
    targetScrollRef.current = 0;

    const smoothScroll = () => {
      const container = slotsContainerRef.current;
      if (!container) return;

      const diff = targetScrollRef.current - container.scrollTop;
      if (Math.abs(diff) < 0.5) {
        container.scrollTop = targetScrollRef.current;
        isScrollingRef.current = false;
        return;
      }

      // Faster easing for snappier feel (0.05 -> 0.15)
      container.scrollTop += diff * 0.15;
      requestAnimationFrame(smoothScroll);
    };

    const handleWheel = (e: WheelEvent) => {
      if (el.scrollHeight > el.clientHeight) {
        e.preventDefault();
        e.stopPropagation();

        // CRITICAL FIX: Sync target if starting new scroll interaction
        if (!isScrollingRef.current) {
          targetScrollRef.current = el.scrollTop;
        }

        // Normalize delta
        let delta = e.deltaY;
        if (e.deltaMode === 1) delta *= 20; // Line mode
        if (e.deltaMode === 2) delta *= 400; // Page mode

        // REMOVED CAP: Let it fly naturally

        // Update target position with simple clamping
        const maxScroll = el.scrollHeight - el.clientHeight;
        targetScrollRef.current = Math.max(0, Math.min(targetScrollRef.current + delta, maxScroll));

        // Start animation if not already running
        if (!isScrollingRef.current) {
          isScrollingRef.current = true;
          requestAnimationFrame(smoothScroll);
        }
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [selectedDate]);

  // Initialize calendar with today's month (don't select date yet - wait for availability data)
  useEffect(() => {
    setCurrentMonth(new Date());
  }, []);

  // Once monthData loads, find and select the first available day
  useEffect(() => {
    if (!monthData || selectedDate) return; // Only run once when monthData first loads

    const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const today = new Date();

    // Search up to 14 days ahead for the first available day (starting from TODAY)
    for (let i = 0; i < 14; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(today.getDate() + i);

      const dayName = dayNames[checkDate.getDay()];
      const dayConfig = monthData.config.businessHours[dayName];

      if (dayConfig?.enabled) {
        // For today, also check if there's still time for a slot
        if (i === 0) {
          const now = new Date();
          const minBookingTime = new Date(now.getTime() + monthData.config.minAdvanceBooking * 60000);

          // Parse end time to check if there's still time today
          const [endHour, endMin] = dayConfig.end.split(':').map(Number);
          const dayEnd = new Date(checkDate);
          dayEnd.setHours(endHour, endMin, 0, 0);

          // Skip today if we're past the business hours end time (accounting for min advance booking)
          if (minBookingTime >= dayEnd) {
            continue;
          }
        }

        setSelectedDate(formatDateString(checkDate));
        return;
      }
    }

    // Fallback: if no available day found in 14 days, just select tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setSelectedDate(formatDateString(tomorrow));
  }, [monthData, selectedDate]);

  // Fetch month data when month changes
  useEffect(() => {
    fetchMonthData(currentMonth);
  }, [currentMonth]);

  // Generate slots for selected date when date or month data changes
  useEffect(() => {
    if (selectedDate && monthData) {
      generateSlotsForDate(selectedDate);
      setSelectedSlot(null);
      (window as any).selectedBookingSlot = null;
    }
  }, [selectedDate, monthData]);

  const fetchMonthData = async (month: Date) => {
    setMonthLoading(true);

    try {
      const year = month.getFullYear();
      const monthNum = month.getMonth() + 1; // JS months are 0-indexed

      const response = await fetch(`/api/availability-month?year=${year}&month=${monthNum}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch month availability');
      }

      setMonthData(data);
    } catch (err) {
      console.error('Error fetching month data:', err);
      setError(err instanceof Error ? err.message : 'Failed to load calendar data');
    } finally {
      setMonthLoading(false);
    }
  };

  const generateSlotsForDate = (dateStr: string) => {
    if (!monthData) return;

    setLoading(true);
    setError(null);

    try {
      const date = new Date(dateStr);
      const dayOfWeek = (date.getDay() + 6) % 7; // 0 = Monday, 6 = Sunday
      const dayNames = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
      const dayName = dayNames[dayOfWeek];
      const dayConfig = monthData.config.businessHours[dayName];

      // Check if this day is enabled
      if (!dayConfig?.enabled) {
        setAvailableSlots([]);
        setError('No availability on this day');
        setLoading(false);
        return;
      }

      // Calculate booking time window
      const now = new Date();
      const minBookingTime = new Date(now.getTime() + monthData.config.minAdvanceBooking * 60000);
      const maxBookingDate = new Date(now.getTime() + monthData.config.maxAdvanceBooking * 24 * 60 * 60000);

      // Generate all possible time slots for this day
      const allSlots = generateTimeSlotsForDay(date, dayConfig.start, dayConfig.end, monthData.config.slotDuration);

      // Filter out unavailable slots (booked, blocked, too soon, or too far in advance)
      const availableSlots = allSlots.filter(slot => {
        const slotStart = new Date(slot.start).getTime();
        const slotEnd = new Date(slot.end).getTime();

        // Check if slot is too soon or too far in advance
        if (slotStart < minBookingTime.getTime() || slotStart > maxBookingDate.getTime()) {
          return false;
        }

        // Check if slot overlaps with any booking
        const isBooked = monthData.bookings.some(booking => {
          const bookingStart = new Date(booking.start).getTime();
          const bookingEnd = new Date(booking.end).getTime();
          return slotStart < bookingEnd && slotEnd > bookingStart;
        });

        // Check if slot overlaps with any blocked time
        const isBlocked = monthData.blockedTimes.some(blocked => {
          const blockedStart = new Date(blocked.start).getTime();
          const blockedEnd = new Date(blocked.end).getTime();
          return slotStart < blockedEnd && slotEnd > blockedStart;
        });

        return !isBooked && !isBlocked;
      });

      setAvailableSlots(availableSlots);

      if (availableSlots.length === 0) {
        setError('No time slots available on this day');
      }
    } catch (err) {
      console.error('Error generating slots:', err);
      setError('Failed to generate time slots');
      setAvailableSlots([]);
    } finally {
      setLoading(false);
    }
  };

  const generateTimeSlotsForDay = (date: Date, startTime: string, endTime: string, duration: number): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);

    // Calculate timezone offset for Europe/Amsterdam on this date
    const tzOffset = getAmsterdamOffset(date);

    // Create slot times in Amsterdam timezone by adjusting UTC date
    const slotStart = new Date(Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      startHour,
      startMinute,
      0,
      0
    ) - tzOffset);

    const slotEnd = new Date(Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      endHour,
      endMinute,
      0,
      0
    ) - tzOffset);

    let current = slotStart.getTime();
    const end = slotEnd.getTime();

    while (current + (duration * 60000) <= end) {
      const slotStartDate = new Date(current);
      const slotEndDate = new Date(current + (duration * 60000));

      slots.push({
        start: slotStartDate.toISOString(),
        end: slotEndDate.toISOString(),
        display: formatTimeSlot(slotStartDate)
      });

      current += duration * 60000;
    }

    return slots;
  };

  const getAmsterdamOffset = (date: Date): number => {
    const year = date.getFullYear();

    // DST starts: Last Sunday of March at 2am → 3am
    const marchLastSunday = getLastSundayOfMonth(year, 2);
    const dstStart = new Date(Date.UTC(year, 2, marchLastSunday, 1, 0, 0));

    // DST ends: Last Sunday of October at 3am → 2am
    const octoberLastSunday = getLastSundayOfMonth(year, 9);
    const dstEnd = new Date(Date.UTC(year, 9, octoberLastSunday, 1, 0, 0));

    const dateTime = date.getTime();

    // If date is between last Sunday of March and last Sunday of October: CEST (UTC+2)
    if (dateTime >= dstStart.getTime() && dateTime < dstEnd.getTime()) {
      return 7200000; // UTC+2 (CEST)
    }

    // Otherwise: CET (UTC+1)
    return 3600000; // UTC+1 (CET)
  };

  const getLastSundayOfMonth = (year: number, month: number): number => {
    const lastDay = new Date(year, month + 1, 0);
    const lastDayOfWeek = lastDay.getDay();
    const lastDayDate = lastDay.getDate();

    if (lastDayOfWeek === 0) {
      return lastDayDate;
    }
    return lastDayDate - lastDayOfWeek;
  };

  const formatTimeSlot = (date: Date): string => {
    const tzOffset = getAmsterdamOffset(date);
    const amsterdamTime = new Date(date.getTime() + tzOffset);

    const hours = amsterdamTime.getUTCHours().toString().padStart(2, '0');
    const minutes = amsterdamTime.getUTCMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = (firstDay.getDay() + 6) % 7; // Monday = 0

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    return days;
  };

  const isDateDisabled = (date: Date | null) => {
    if (!date || !monthData) return true;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Disable past dates
    if (date < today) return true;

    // Get day of week configuration
    const dayOfWeek = (date.getDay() + 6) % 7;
    const dayNames = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const dayName = dayNames[dayOfWeek];
    const dayConfig = monthData.config.businessHours[dayName];

    // If day is not enabled in config, disable it
    if (!dayConfig || !dayConfig.enabled) return true;

    // Calculate booking time window
    const now = new Date();
    const minBookingTime = new Date(now.getTime() + monthData.config.minAdvanceBooking * 60000);
    const maxBookingDate = new Date(now.getTime() + monthData.config.maxAdvanceBooking * 24 * 60 * 60000);

    // If the entire day is outside the booking window, disable it
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    if (endOfDay < minBookingTime || date > maxBookingDate) return true;

    // Check if there are any available slots on this day
    const allSlots = generateTimeSlotsForDay(date, dayConfig.start, dayConfig.end, monthData.config.slotDuration);

    const hasAvailableSlot = allSlots.some(slot => {
      const slotStart = new Date(slot.start).getTime();
      const slotEnd = new Date(slot.end).getTime();

      // Check if slot is within booking window
      if (slotStart < minBookingTime.getTime() || slotStart > maxBookingDate.getTime()) {
        return false;
      }

      // Check if slot overlaps with any booking
      const isBooked = monthData.bookings.some(booking => {
        const bookingStart = new Date(booking.start).getTime();
        const bookingEnd = new Date(booking.end).getTime();
        return slotStart < bookingEnd && slotEnd > bookingStart;
      });

      // Check if slot overlaps with any blocked time
      const isBlocked = monthData.blockedTimes.some(blocked => {
        const blockedStart = new Date(blocked.start).getTime();
        const blockedEnd = new Date(blocked.end).getTime();
        return slotStart < blockedEnd && slotEnd > blockedStart;
      });

      return !isBooked && !isBlocked;
    });

    return !hasAvailableSlot;
  };

  const formatDateString = (date: Date) => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleDateClick = (date: Date) => {
    if (isDateDisabled(date)) return;
    setSelectedDate(formatDateString(date));
  };

  const handleSlotClick = (slot: TimeSlot) => {
    const slotData = { start: slot.start, end: slot.end };
    setSelectedSlot(slotData);
    (window as any).selectedBookingSlot = slotData;
    if (onSlotSelect) onSlotSelect(slotData);
    window.dispatchEvent(new CustomEvent('slotSelected', { detail: slotData }));
  };

  const goToPreviousMonth = () => {
    const prevMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1);
    setCurrentMonth(prevMonth);
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const isPreviousNbMonthDisabled = (date: Date) => {
    const today = new Date();
    return date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
  };

  const days = getDaysInMonth(currentMonth);
  const monthName = currentMonth.toLocaleDateString('nl-NL', { month: 'long' }).toLowerCase();
  const year = currentMonth.getFullYear();

  return (
    <div className="w-full max-w-7xl mx-auto bg-black border-y lg:border border-white/10 shadow-none lg:shadow-2xl flex flex-col lg:flex-row overflow-hidden h-auto lg:h-[535px] animate-in fade-in zoom-in-95 duration-500 rounded-none text-white font-sans">

      {/* Sidebar - Profile & Details */}
      <div className="w-full lg:w-[200px] p-4 md:p-5 border-b lg:border-b-0 lg:border-r border-white/10 bg-[#111111] flex flex-col gap-8 relative">
        <div className="space-y-6">

          <div className="space-y-2">
            <h3 className="text-2xl font-black text-white uppercase tracking-tighter leading-none">Intro Call<span className="text-[var(--color-acid)]">.</span></h3>
          </div>

          <div className="flex flex-col gap-4 text-zinc-400 font-medium text-sm">
            <div className="flex items-center gap-3">
              <Clock size={16} className="text-[var(--color-acid)]" />
              <span className="text-white">15 min</span>
            </div>
            <div className="flex items-center gap-3">
              <Globe size={16} className="text-[var(--color-acid)]" />
              <span className="text-white">Europe/Amsterdam</span>
            </div>
          </div>

          <p className="text-zinc-400 text-sm leading-relaxed mt-4 border-t border-white/5 pt-6">
            Een kort gesprek om kennis te maken en je ideeën te bespreken. Je krijgt <strong className="text-white">direct een eerlijk advies</strong> over je online mogelijkheden, ongeacht of we gaan samenwerken.
          </p>
        </div>

        <div className="mt-auto pt-6">
          <p className="text-[10px] text-zinc-600 uppercase tracking-widest font-mono">
            Made by <span className="text-white">KNAP GEMAAKT.</span>
          </p>
        </div>
      </div>

      {/* Calendar Section */}
      <div className="w-full lg:w-[500px] p-4 md:p-5 flex flex-col bg-black relative border-r border-white/10">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-xl text-white tracking-tight flex gap-2">
            <span className="font-black">{monthName}</span>
            <span className="font-medium text-white/50">{year}</span>
          </h4>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={goToPreviousMonth}
              disabled={isPreviousNbMonthDisabled(currentMonth)}
              className={`p-2 transition-colors border border-transparent 
                ${isPreviousNbMonthDisabled(currentMonth)
                  ? 'text-zinc-500 cursor-not-allowed'
                  : 'text-white hover:bg-white/5 hover:border-white/10'}`}
              aria-label="Vorige maand"
            >
              <ChevronLeft size={20} />
            </button>
            <button type="button" onClick={goToNextMonth} className="p-2 hover:bg-white/5 transition-colors text-white border border-transparent hover:border-white/10" aria-label="Volgende maand">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {['ma', 'di', 'wo', 'do', 'vr', 'za', 'zo'].map(day => (
            <div key={day} className="text-center text-sm font-mono uppercase text-zinc-300 font-bold py-2">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {days.map((date, index) => {
            if (!date) return <div key={`empty-${index}`} />;

            const isDisabled = isDateDisabled(date);
            const isSelected = selectedDate === formatDateString(date);
            const isToday = formatDateString(new Date()) === formatDateString(date);

            // Mimic Cal.com "available block" style for future weekdays
            const isFutureWeekday = !isDisabled;

            return (
              <button
                type="button"
                key={index}
                onClick={() => handleDateClick(date)}
                disabled={isDisabled}
                className={`
                            aspect-square w-full flex items-center justify-center text-sm transition-all relative border border-transparent
                            ${isSelected ? 'bg-[var(--color-acid)] text-black font-bold border-[var(--color-acid)]' : ''}
                            ${!isSelected && isFutureWeekday ? 'bg-[#1a1a1a] text-zinc-300 font-bold hover:border-[var(--color-acid)]/50 hover:bg-[#222]' : ''}
                            ${!isSelected && !isFutureWeekday ? 'text-zinc-400 font-normal cursor-default hover:bg-transparent' : ''}
                            ${isToday && !isSelected ? 'text-[var(--color-acid)] font-bold relative after:content-[""] after:absolute after:bottom-1.5 after:w-1 after:h-1 after:bg-[var(--color-acid)] after:rounded-full' : ''}
                        `}
              >
                {date.getDate()}
              </button>
            );
          })}
        </div>
      </div>

      {/* Time Slots Section */}
      <div className={`w-full flex-1 p-4 pb-0 md:p-5 md:pb-0 border-l border-white/10 bg-[#0a0a0a] transition-all duration-300 flex flex-col overflow-hidden ${selectedDate ? 'opacity-100 translate-x-0' : 'opacity-30 pointer-events-none'}`}>
        {!selectedDate ? (
          <div className="h-full flex flex-col items-center justify-center text-zinc-600 space-y-4">
            <div className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center">
              <Clock size={20} className="text-zinc-700" />
            </div>
            <div className="text-xs font-mono uppercase tracking-widest text-center">
              Kies een datum
            </div>
          </div>
        ) : (
          <div className="flex-1 min-h-0 flex flex-col animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="mb-2 pb-2 border-b border-white/5">
              <h4 className="text-xl text-white tracking-tight flex gap-2">
                <span className="font-black">
                  {new Date(selectedDate).toLocaleDateString('nl-NL', { weekday: 'short' }).toLowerCase()}
                </span>
                <span className="font-medium text-white/80">
                  {new Date(selectedDate).getDate()}
                </span>
              </h4>
            </div>

            <div
              ref={slotsContainerRef}
              className="flex-1 min-h-0 overflow-y-scroll overscroll-contain space-y-2 touch-pan-y pt-1 pb-6 scrollbar-hide"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              {loading && (
                <div className="flex flex-col items-center justify-center py-10 gap-4 text-zinc-500">
                  <div className="w-5 h-5 border-2 border-zinc-800 border-t-[var(--color-acid)] rounded-full animate-spin"></div>
                  <span className="text-xs font-mono uppercase tracking-widest">Beschikbaarheid laden...</span>
                </div>
              )}

              {error && (
                <div className="text-red-400 text-sm text-center py-4 bg-red-500/5 border border-red-500/10">
                  {error}
                </div>
              )}

              {!loading && !error && availableSlots.length === 0 && (
                <div className="text-center py-10 text-zinc-500 bg-zinc-900/50 border border-dashed border-zinc-800">
                  Geen tijden beschikbaar
                </div>
              )}

              {!loading && availableSlots.map((slot, index) => {
                const isSelected = selectedSlot && selectedSlot.start === slot.start && selectedSlot.end === slot.end;
                return (
                  <button
                    type="button"
                    key={index}
                    onClick={() => handleSlotClick(slot)}
                    className={`
                                    w-full px-4 py-2 border text-sm font-bold transition-all flex items-center justify-center gap-3 group relative
                                    ${isSelected
                        ? 'bg-[var(--color-acid)] border-[var(--color-acid)] text-black'
                        : 'bg-[#1a1a1a] border-white/5 text-zinc-300 hover:border-[var(--color-acid)]/50 hover:bg-[#222]'}
                                `}
                  >
                    <span>{slot.display}</span>
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
