import { useState, useEffect, useRef, lazy, Suspense } from 'react';

type Branch = 'nieuwe-website' | 'bestaande-website' | 'automatisering' | 'iets-anders';
type Urgency = 'zo-snel-mogelijk' | 'geen-haast' | 'weet-niet';
type Pakket = 'essentieel' | 'groei' | 'compleet' | null;
type OpenToRebuild = 'ja' | 'nee' | null;

interface QuizState {
  step: number;
  branch: Branch | null;
  goals: string[];
  existingPlatform: string | null;
  existingProblem: string | null;
  openToRebuild: OpenToRebuild;
  addons: string[];
  somethingElse: string;
  urgency: Urgency | null;
  naam: string;
  bedrijfsnaam: string;
  telefoon: string;
  email: string;
  privacy: boolean;
}

const STORAGE_KEY = 'kg_offerte_quiz_v2';

const GOAL_OPTIONS = [
  { id: 'netter', label: 'Gewoon een nette website' },
  { id: 'leads-sneller', label: 'Sneller reageren op aanvragen' },
  { id: 'google', label: 'Actief werken aan gevonden worden in Google' },
  { id: 'reviews', label: 'Automatisch reviews verzamelen' },
  { id: 'afspraken', label: 'Klanten die zelf afspraken inplannen' },
];

const PLATFORM_OPTIONS = [
  { id: 'wordpress', label: 'WordPress' },
  { id: 'wix-squarespace', label: 'Wix of Squarespace' },
  { id: 'anders', label: 'Iets anders' },
  { id: 'weet-niet', label: 'Weet ik niet precies' },
];

const PROBLEM_OPTIONS = [
  { id: 'traag', label: 'Te traag' },
  { id: 'gedateerd', label: 'Ziet er gedateerd uit' },
  { id: 'onderhoud', label: 'Te veel onderhoud of plugins' },
  { id: 'overstap', label: 'Ik wil graag overstappen' },
];

const ADDON_OPTIONS = [
  { id: 'lead-opvolging', label: 'Lead-opvolging (WhatsApp bij aanvragen)' },
  { id: 'ai-content', label: 'AI content voor social media' },
  { id: 'factuurherinneringen', label: 'Automatische factuurherinneringen' },
  { id: 'whatsapp-opvolging', label: 'WhatsApp-opvolging na klussen' },
  { id: 'weekoverzichten', label: 'Weekoverzicht in je inbox' },
  { id: 'iets-anders', label: 'Iets anders, leg ik uit' },
];

function recommendPakket(state: QuizState): Pakket {
  if (state.branch === 'nieuwe-website') {
    if (state.goals.length === 0) return null;
    if (state.goals.includes('afspraken') || state.goals.length >= 4) return 'compleet';
    if (state.goals.includes('google') || state.goals.includes('reviews')) return 'groei';
    return 'essentieel';
  }
  if (state.branch === 'bestaande-website' && state.openToRebuild === 'ja') {
    return 'groei';
  }
  return null;
}

function explainRecommendation(state: QuizState, pakket: Pakket): string[] {
  if (pakket === 'essentieel') {
    return [
      'Een professionele website met hosting en onderhoud in één vast maandbedrag.',
      'Geen grote investering vooraf, je betaalt vanaf de maand dat de site live staat.',
      'Kleine aanpassingen doe ik binnen 48 uur zonder losse rekening.',
    ];
  }
  if (pakket === 'groei') {
    const firstBullet = state.branch === 'bestaande-website'
      ? 'Je hebt al een site, maar loopt ertegenaan. Groei is gebouwd om actief terrein te winnen.'
      : 'Actief werken aan je zichtbaarheid in Google, met een maandrapport dat laat zien wat werkt.';
    return [
      firstBullet,
      'Google Bedrijfsprofiel-beheer en automatisch reviews verzamelen na elke klus.',
      'Alles uit Essentieel, plus lead-opvolging via WhatsApp bij elke aanvraag.',
    ];
  }
  if (pakket === 'compleet') {
    return [
      'Klanten plannen zelf afspraken in via je website, zonder dat je er aan hoeft te denken.',
      'Maandelijks een SEO-blog die ik voor je schrijf, zodat je constant nieuwe kansen op ranking creëert.',
      'Alles uit Groei, plus kwartaalgesprek voor strategie en priority support binnen een uur op werkdagen.',
    ];
  }
  if (state.branch === 'bestaande-website' && state.openToRebuild === 'nee') {
    return [
      'Ik maak nieuwe websites op maat en onderhoud wat ik zelf heb gebouwd.',
      'Je huidige WordPress of Wix-site opknappen doe ik niet, dat past beter bij een andere partij.',
      'Toch even sparren of een herstart overwegen? Plan gerust een kort gesprek.',
    ];
  }
  if (state.branch === 'automatisering') {
    return [
      'Je zoekt geen website, maar automatisering naast je bestaande werk.',
      'Prijs hangt af van welke processen je wilt koppelen en hoe vaak ze lopen.',
      'In het gesprek kijken we welke automatisering het meeste oplevert voor jou.',
    ];
  }
  return [
    'Op basis van je antwoorden past een gesprek beter dan een standaardpakket.',
    'We lopen samen door wat je nodig hebt en of daar een van de pakketten bij past, of iets op maat.',
  ];
}

const TURNSTILE_SITEKEY = '0x4AAAAAACzkKUPSoLBK6a1f';

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement | string, opts: { sitekey: string; theme?: string; size?: string; callback?: (token: string) => void }) => string;
      reset: (widgetId?: string) => void;
    };
  }
}

export default function OfferteQuiz() {
  const [state, setState] = useState<QuizState>({
    step: 1,
    branch: null,
    goals: [],
    existingPlatform: null,
    existingProblem: null,
    openToRebuild: null,
    addons: [],
    somethingElse: '',
    urgency: null,
    naam: '',
    bedrijfsnaam: '',
    telefoon: '',
    email: '',
    privacy: false,
  });
  const [slot, setSlot] = useState<{ start: string; end: string } | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string>('');
  const [Calendar, setCalendar] = useState<React.ComponentType<any> | null>(null);
  const turnstileRef = useRef<HTMLDivElement>(null);
  const turnstileWidgetId = useRef<string | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setState(s => ({ ...s, ...parsed, step: parsed.step || 1 }));
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      const { privacy, ...persistable } = state;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(persistable));
    } catch {}
  }, [state]);

  // Scroll to top of the quiz on step change
  const prevStep = useRef(state.step);
  useEffect(() => {
    if (prevStep.current !== state.step) {
      prevStep.current = state.step;
      // Small delay so the new step has rendered before we scroll
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }, [state.step]);

  const setStep = (step: number) => setState(s => ({ ...s, step }));
  const toggleGoal = (id: string) => setState(s => ({
    ...s,
    goals: s.goals.includes(id) ? s.goals.filter(g => g !== id) : [...s.goals, id],
  }));
  const toggleAddon = (id: string) => setState(s => ({
    ...s,
    addons: s.addons.includes(id) ? s.addons.filter(a => a !== id) : [...s.addons, id],
  }));

  const handleBranchSelect = (branch: Branch) => {
    setState(s => ({ ...s, branch, step: 2 }));
  };

  const handleUrgencySelect = (urgency: Urgency) => {
    setState(s => ({ ...s, urgency, step: 4 }));
  };

  const handleExistingAdvance = (patch: Partial<QuizState>) => {
    setState(s => {
      const next = { ...s, ...patch };
      if (next.existingPlatform && next.existingProblem && next.openToRebuild) {
        next.step = 3;
      }
      return next;
    });
  };

  const canAdvanceStep2 = (): boolean => {
    if (state.branch === 'nieuwe-website') return state.goals.length > 0;
    if (state.branch === 'bestaande-website') return !!(state.existingPlatform && state.existingProblem && state.openToRebuild);
    if (state.branch === 'automatisering') return state.addons.length > 0;
    if (state.branch === 'iets-anders') return state.somethingElse.trim().length > 0;
    return false;
  };

  const errors = {
    naam: state.naam.trim().length > 0 && state.naam.trim().length < 2 ? 'Naam is te kort' : '',
    bedrijfsnaam: state.bedrijfsnaam.trim().length > 0 && state.bedrijfsnaam.trim().length < 2 ? 'Bedrijfsnaam is te kort' : '',
    telefoon: state.telefoon.trim().length > 0 && !/^[+\d][\d\s\-()]{6,}$/.test(state.telefoon.trim()) ? 'Geen geldig telefoonnummer' : '',
    email: state.email.trim().length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email.trim()) ? 'Geen geldig e-mailadres' : '',
  };
  const formValid = !!(
    state.naam.trim().length >= 2 &&
    state.bedrijfsnaam.trim().length >= 2 &&
    /^[+\d][\d\s\-()]{6,}$/.test(state.telefoon.trim()) &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email.trim())
  );
  const canShowCalendar = state.step === 4 && formValid;

  // Lazy-load BookingCalendar once the form is valid
  useEffect(() => {
    if (canShowCalendar && !Calendar) {
      import('./BookingCalendar').then(mod => setCalendar(() => mod.default));
    }
  }, [canShowCalendar, Calendar]);

  // Render Turnstile once form is valid
  useEffect(() => {
    if (!canShowCalendar) return;
    const scriptId = 'cf-turnstile-script';
    let existing = document.getElementById(scriptId);
    if (!existing) {
      const s = document.createElement('script');
      s.id = scriptId;
      s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      s.async = true;
      s.defer = true;
      document.head.appendChild(s);
      s.onload = () => mountTurnstile();
    } else {
      mountTurnstile();
    }
    function mountTurnstile() {
      if (!turnstileRef.current || turnstileWidgetId.current) return;
      if (window.turnstile) {
        turnstileWidgetId.current = window.turnstile.render(turnstileRef.current, {
          sitekey: TURNSTILE_SITEKEY,
          theme: 'light',
          size: 'flexible',
          callback: (token: string) => setTurnstileToken(token),
        });
      }
    }
  }, [canShowCalendar]);

  const pakket = recommendPakket(state);
  const pakketLabel = pakket
    ? { essentieel: 'Essentieel (€49/mo)', groei: 'Groei (€99/mo)', compleet: 'Compleet (€149/mo)' }[pakket]
    : null;

  const canSubmit = canShowCalendar && !!slot && state.privacy && !!turnstileToken && !submitting;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setSubmitting(true);
    setSubmitError('');
    const specification =
      state.branch === 'nieuwe-website' ? 'Website'
      : state.branch === 'bestaande-website' ? 'Website'
      : state.branch === 'automatisering' ? 'Automatisering'
      : pakket ? 'Pakketkeuze'
      : 'Iets anders';
    try {
      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'aanvraag',
          specification,
          name: state.naam,
          email: state.email,
          phone: state.telefoon,
          company: state.bedrijfsnaam,
          has_website: state.branch === 'bestaande-website' ? 'ja' : undefined,
          start_time: slot!.start,
          end_time: slot!.end,
          'cf-turnstile-response': turnstileToken,
          bron: 'offerte-quiz',
          iets_anders_details: state.branch === 'iets-anders' ? state.somethingElse : '',
          quiz_context: {
            branch: state.branch,
            goals: state.goals,
            existing_platform: state.existingPlatform,
            existing_problem: state.existingProblem,
            open_to_rebuild: state.openToRebuild,
            addons: state.addons,
            something_else: state.somethingElse,
            urgency: state.urgency,
            recommended_pakket: pakket,
          },
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
      try { localStorage.removeItem(STORAGE_KEY); } catch {}
      window.location.href = '/aanvragen/bedankt/';
    } catch (e: any) {
      setSubmitError(e?.message || 'Er ging iets mis. Probeer het opnieuw.');
      setSubmitting(false);
      if (window.turnstile && turnstileWidgetId.current) {
        window.turnstile.reset(turnstileWidgetId.current);
        setTurnstileToken('');
      }
    }
  };

  const totalSteps = 4;
  const progress = Math.min((state.step / totalSteps) * 100, 100);

  const choiceClass = 'text-left bg-canvas border border-warm hover:border-accent rounded-xl p-4 md:p-5 transition-colors group cursor-pointer';
  const labelClass = 'flex items-center gap-4 bg-canvas border border-warm rounded-xl p-4 md:p-5 cursor-pointer hover:border-accent transition-colors';

  return (
    <div>
      {/* Progress */}
      <div className="mb-10">
        <div className="flex justify-between text-xs font-mono uppercase tracking-widest text-ink/40 mb-2">
          <span>Stap {Math.min(state.step, totalSteps)} van {totalSteps}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-1 bg-canvas-alt rounded-full overflow-hidden">
          <div className="h-full bg-accent transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Step 1 */}
      {state.step === 1 && (
        <div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-tight break-words mb-8">Waar kan ik je mee helpen?</h2>
          <div className="grid gap-4">
            {[
              { id: 'nieuwe-website', label: 'Een nieuwe website', sub: 'Vanaf nul opbouwen of mijn eerste site ooit' },
              { id: 'bestaande-website', label: 'Hulp met mijn bestaande website', sub: 'Vernieuwen, versnellen of overstappen' },
              { id: 'automatisering', label: 'Automatisering voor mijn bedrijf', sub: 'Lead-opvolging, AI content, facturen en meer' },
              { id: 'iets-anders', label: 'Iets anders', sub: 'Leg het in eigen woorden uit' },
            ].map(opt => (
              <button key={opt.id} onClick={() => handleBranchSelect(opt.id as Branch)} className={choiceClass}>
                <div className="font-bold text-lg mb-1 group-hover:text-accent transition-colors">{opt.label}</div>
                <div className="text-ink/60 text-sm">{opt.sub}</div>
              </button>
            ))}
          </div>
          <div className="mt-10 text-center">
            <a href="/aanvragen/" className="text-ink/60 hover:text-accent text-sm underline">
              Liever direct een gesprek inplannen?
            </a>
          </div>
        </div>
      )}

      {/* Step 2:nieuwe-website */}
      {state.step === 2 && state.branch === 'nieuwe-website' && (
        <div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-tight break-words mb-4">Wat wil je bereiken met de website?</h2>
          <p className="text-ink/60 mb-8">Kies alles dat van toepassing is.</p>
          <div className="grid gap-3">
            {GOAL_OPTIONS.map(opt => (
              <label key={opt.id} className={labelClass}>
                <input type="checkbox" checked={state.goals.includes(opt.id)} onChange={() => toggleGoal(opt.id)} className="w-5 h-5 accent-accent shrink-0 cursor-pointer" />
                <span className="font-medium">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Step 2:bestaande-website */}
      {state.step === 2 && state.branch === 'bestaande-website' && (
        <div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-tight break-words mb-8">Drie korte vragen over wat je nu hebt</h2>

          <div className="mb-8">
            <p className="font-bold mb-3">Wat gebruik je nu?</p>
            <div className="grid gap-2">
              {PLATFORM_OPTIONS.map(opt => (
                <label key={opt.id} className={labelClass + ' p-3 md:p-4'}>
                  <input type="radio" name="platform" checked={state.existingPlatform === opt.id} onChange={() => handleExistingAdvance({ existingPlatform: opt.id })} className="w-5 h-5 accent-accent shrink-0 cursor-pointer" />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <p className="font-bold mb-3">Waar loop je tegenaan?</p>
            <div className="grid gap-2">
              {PROBLEM_OPTIONS.map(opt => (
                <label key={opt.id} className={labelClass + ' p-3 md:p-4'}>
                  <input type="radio" name="problem" checked={state.existingProblem === opt.id} onChange={() => handleExistingAdvance({ existingProblem: opt.id })} className="w-5 h-5 accent-accent shrink-0 cursor-pointer" />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <p className="font-bold mb-3">Sta je open voor een volledig nieuwe website op maat?</p>
            <div className="grid gap-2">
              {[
                { id: 'ja', label: 'Ja, ik wil kijken naar een nieuwe website op maat' },
                { id: 'nee', label: 'Nee, ik wil alleen mijn huidige website optimaliseren' },
              ].map(opt => (
                <label key={opt.id} className={labelClass + ' p-3 md:p-4'}>
                  <input type="radio" name="rebuild" checked={state.openToRebuild === opt.id} onChange={() => handleExistingAdvance({ openToRebuild: opt.id as OpenToRebuild })} className="w-5 h-5 accent-accent shrink-0 cursor-pointer" />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 2:automatisering */}
      {state.step === 2 && state.branch === 'automatisering' && (
        <div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-tight break-words mb-4">Welke automatisering interesseert je?</h2>
          <p className="text-ink/60 mb-8">Kies alles dat van toepassing is. Je zit er niet aan vast.</p>
          <div className="grid gap-3">
            {ADDON_OPTIONS.map(opt => (
              <label key={opt.id} className={labelClass}>
                <input type="checkbox" checked={state.addons.includes(opt.id)} onChange={() => toggleAddon(opt.id)} className="w-5 h-5 accent-accent shrink-0 cursor-pointer" />
                <span className="font-medium">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Step 2:iets anders */}
      {state.step === 2 && state.branch === 'iets-anders' && (
        <div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-tight break-words mb-4">Vertel in je eigen woorden</h2>
          <p className="text-ink/60 mb-4">Waar loop je tegenaan of wat wil je regelen?</p>
          <textarea
            value={state.somethingElse}
            onChange={e => setState(s => ({ ...s, somethingElse: e.target.value }))}
            rows={6}
            placeholder="Bijvoorbeeld: ik heb een idee voor een tool die..."
            className="w-full bg-canvas border border-warm rounded-xl p-4 focus:border-accent outline-none"
          />
        </div>
      )}

      {/* Step 3: urgency */}
      {state.step === 3 && (
        <div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-tight break-words mb-8">Wanneer moet het af zijn?</h2>
          <div className="grid gap-3">
            {[
              { id: 'zo-snel-mogelijk', label: 'Zo snel mogelijk', sub: 'Ik wil graag direct aan de slag.' },
              { id: 'geen-haast', label: 'Het heeft geen haast', sub: 'Er zit geen urgentie achter.' },
              { id: 'weet-niet', label: 'Ik weet het niet', sub: 'Geen tijdlijn op dit moment.' },
            ].map(opt => (
              <button key={opt.id} onClick={() => handleUrgencySelect(opt.id as Urgency)} className={choiceClass}>
                <div className="font-bold group-hover:text-accent transition-colors">{opt.label}</div>
                <div className="text-ink/60 text-sm">{opt.sub}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 4: results + inline form */}
      {state.step === 4 && (
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-accent mb-4 block">
            Advies op basis van je antwoorden
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4 leading-tight break-words">
            {pakket
              ? <>Het <span className="text-accent">{pakketLabel}</span>-pakket past het beste.</>
              : state.branch === 'bestaande-website' && state.openToRebuild === 'nee'
                ? 'Waarschijnlijk geen match, maar laten we praten.'
                : state.branch === 'automatisering'
                  ? 'Voor automatisering past een gesprek het beste.'
                  : 'Een kort gesprek past beter dan een standaardpakket.'}
          </h2>

          <ul className="space-y-3 my-8">
            {explainRecommendation(state, pakket).map((line, i) => (
              <li key={i} className="flex gap-3 text-ink/80 leading-relaxed">
                <span className="text-accent font-bold shrink-0">→</span>
                <span>{line}</span>
              </li>
            ))}
          </ul>

          <div className="bg-canvas-alt rounded-2xl p-4 sm:p-6 md:p-8 mt-10 overflow-hidden -mx-4 w-[calc(100%+2rem)] sm:-mx-6 sm:w-[calc(100%+3rem)] md:-mx-10 md:w-[calc(100%+5rem)]">
            <h3 className="text-2xl font-bold tracking-tight mb-2 break-words">Plan een kennismaking</h3>
            <p className="text-ink/60 mb-6 break-words">Vul je gegevens in, dan verschijnt de agenda.</p>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-bold mb-1">Naam</label>
                <input type="text" autoComplete="name" value={state.naam} onChange={e => setState(s => ({ ...s, naam: e.target.value }))} className={`w-full bg-canvas border rounded-lg p-3 focus:border-accent outline-none ${errors.naam ? 'border-red-500' : 'border-warm'}`} />
                {errors.naam && <p className="text-red-600 text-xs mt-1">{errors.naam}</p>}
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Bedrijfsnaam</label>
                <input type="text" autoComplete="organization" value={state.bedrijfsnaam} onChange={e => setState(s => ({ ...s, bedrijfsnaam: e.target.value }))} className={`w-full bg-canvas border rounded-lg p-3 focus:border-accent outline-none ${errors.bedrijfsnaam ? 'border-red-500' : 'border-warm'}`} />
                {errors.bedrijfsnaam && <p className="text-red-600 text-xs mt-1">{errors.bedrijfsnaam}</p>}
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Telefoonnummer</label>
                <input type="tel" autoComplete="tel" placeholder="06 12345678" value={state.telefoon} onChange={e => setState(s => ({ ...s, telefoon: e.target.value }))} className={`w-full bg-canvas border rounded-lg p-3 focus:border-accent outline-none ${errors.telefoon ? 'border-red-500' : 'border-warm'}`} />
                {errors.telefoon && <p className="text-red-600 text-xs mt-1">{errors.telefoon}</p>}
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">E-mailadres</label>
                <input type="email" autoComplete="email" placeholder="naam@bedrijf.nl" value={state.email} onChange={e => setState(s => ({ ...s, email: e.target.value }))} className={`w-full bg-canvas border rounded-lg p-3 focus:border-accent outline-none ${errors.email ? 'border-red-500' : 'border-warm'}`} />
                {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
              </div>
            </div>

            {canShowCalendar && (
              <div className="mt-8">
                <h4 className="font-bold text-lg mb-3">Kies een moment</h4>
                {Calendar ? (
                  <div className="-mx-4 w-[calc(100%+2rem)] sm:-mx-6 sm:w-[calc(100%+3rem)] md:-mx-8 md:w-[calc(100%+4rem)] rounded-2xl overflow-hidden">
                    <Suspense fallback={<p className="text-ink/60 text-sm">Agenda wordt geladen...</p>}>
                      <Calendar onSlotSelect={(s: { start: string; end: string }) => setSlot(s)} selectedSlot={slot} />
                    </Suspense>
                  </div>
                ) : (
                  <p className="text-ink/60 text-sm">Agenda wordt geladen...</p>
                )}
              </div>
            )}

            {!canShowCalendar && (
              <p className="text-ink/40 text-sm italic mb-4">Vul de vier velden in om de agenda te laten verschijnen.</p>
            )}

            {canShowCalendar && (
              <>
                <div className="mt-6 mb-4" ref={turnstileRef}></div>

                <label className="flex items-start gap-3 cursor-pointer mb-6">
                  <input type="checkbox" checked={state.privacy} onChange={e => setState(s => ({ ...s, privacy: e.target.checked }))} className="w-5 h-5 accent-accent shrink-0 mt-0.5 cursor-pointer" />
                  <span className="text-sm text-ink/70">
                    Ik ga akkoord met de <a href="/privacy/" target="_blank" className="underline hover:text-accent">privacyverklaring</a> en begrijp dat mijn gegevens worden gebruikt om contact op te nemen.
                  </span>
                </label>

                {submitError && (
                  <p className="text-red-600 text-sm mb-4">{submitError}</p>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={!canSubmit}
                  className="bg-ink text-canvas px-8 py-4 rounded-lg font-bold tracking-tight hover:bg-ink/80 transition-colors duration-300 inline-flex items-center justify-center gap-3 disabled:opacity-40 disabled:cursor-not-allowed w-full sm:w-auto"
                >
                  {submitting ? 'Versturen...' : 'Plan de kennismaking'}
                  {!submitting && <span>&rarr;</span>}
                </button>

                {!slot && <p className="text-ink/40 text-xs mt-3">Kies eerst een moment in de agenda.</p>}
                {slot && !state.privacy && <p className="text-ink/40 text-xs mt-3">Vink de privacyverklaring aan om te versturen.</p>}
                {slot && state.privacy && !turnstileToken && <p className="text-ink/40 text-xs mt-3">Even wachten op de beveiligingscheck...</p>}
              </>
            )}
          </div>
        </div>
      )}

      {/* Navigation */}
      {state.step > 1 && state.step < 4 && (
        <div className="flex justify-between items-center mt-10 pt-6 border-t border-warm">
          <button onClick={() => setStep(Math.max(1, state.step - 1))} className="text-ink/60 hover:text-accent text-sm font-medium inline-flex items-center gap-2 cursor-pointer">
            <span>&larr;</span> Terug
          </button>
          {state.step === 2 && (
            <button
              onClick={() => setStep(3)}
              disabled={!canAdvanceStep2()}
              className="bg-accent text-white px-6 py-3 rounded-lg font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-accent/90 transition-colors inline-flex items-center gap-2 cursor-pointer"
            >
              Volgende <span>&rarr;</span>
            </button>
          )}
        </div>
      )}
      {state.step === 4 && (
        <div className="mt-10 pt-6 border-t border-warm">
          <button onClick={() => setStep(3)} className="text-ink/60 hover:text-accent text-sm font-medium inline-flex items-center gap-2 cursor-pointer">
            <span>&larr;</span> Terug naar mijn antwoorden
          </button>
        </div>
      )}
    </div>
  );
}
