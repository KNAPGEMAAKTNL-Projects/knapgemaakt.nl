import { useState, useEffect, useCallback } from 'react';

// =============================================================================
// CONFIGURATION - Edit these when adding new services
// =============================================================================

const CONSENT_VERSION = '1.0';
const STORAGE_KEY = 'cookie_consent';
const CONSENT_EXPIRY_DAYS = 365;

interface ConsentCategories {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

interface ConsentData {
  version: string;
  timestamp: number;
  expiresAt: number;
  categories: ConsentCategories;
  consentId: string;
}

// =============================================================================
// CONSENT LOGIC
// =============================================================================

function generateConsentId(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function getStoredConsent(): ConsentData | null {
  if (typeof window === 'undefined') return null;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    const data: ConsentData = JSON.parse(stored);

    // Check version and expiry
    if (data.version !== CONSENT_VERSION || data.expiresAt < Date.now()) {
      return null;
    }

    return data;
  } catch {
    return null;
  }
}

function saveConsent(categories: ConsentCategories): void {
  const data: ConsentData = {
    version: CONSENT_VERSION,
    timestamp: Date.now(),
    expiresAt: Date.now() + CONSENT_EXPIRY_DAYS * 24 * 60 * 60 * 1000,
    categories,
    consentId: generateConsentId(),
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

  // Clear the "banner showing" flag since user made a choice
  sessionStorage.removeItem('cookie_banner_showing');

  // Also set a simple cookie for potential server-side detection
  document.cookie = `consent_given=1; path=/; max-age=${CONSENT_EXPIRY_DAYS * 24 * 60 * 60}; SameSite=Lax`;
}

function updateGoogleConsentMode(categories: ConsentCategories): void {
  if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
    (window as any).gtag('consent', 'update', {
      'analytics_storage': categories.analytics ? 'granted' : 'denied',
      'ad_storage': categories.marketing ? 'granted' : 'denied',
      'ad_user_data': categories.marketing ? 'granted' : 'denied',
      'ad_personalization': categories.marketing ? 'granted' : 'denied',
    });
  }
}


function deleteCookiesByCategory(category: 'analytics' | 'marketing'): void {
  const cookiesToDelete: Record<string, string[]> = {
    analytics: ['_ga', '_gid', '_clck', '_clsk', 'CLID', 'ANONCHK', 'MR', 'MUID', 'SM'],
    marketing: ['_fbp', '_fbc'],
  };

  const domain = window.location.hostname;
  const cookies = cookiesToDelete[category];

  cookies.forEach((name) => {
    // Delete with various domain/path combinations to ensure removal
    const paths = ['/', ''];
    const domains = [domain, `.${domain}`, ''];

    domains.forEach((d) => {
      paths.forEach((p) => {
        const domainPart = d ? `; domain=${d}` : '';
        const pathPart = p ? `; path=${p}` : '';
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT${domainPart}${pathPart}`;
      });
    });
  });

  // Also delete GA4 measurement-specific cookies (_ga_XXXXXXXXX pattern)
  if (category === 'analytics') {
    document.cookie.split(';').forEach((cookie) => {
      const name = cookie.split('=')[0].trim();
      if (name.startsWith('_ga_')) {
        const paths = ['/', ''];
        const domains = [domain, `.${domain}`, ''];
        domains.forEach((d) => {
          paths.forEach((p) => {
            const domainPart = d ? `; domain=${d}` : '';
            const pathPart = p ? `; path=${p}` : '';
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT${domainPart}${pathPart}`;
          });
        });
      }
    });
  }
}

function enableBlockedScripts(category: 'analytics' | 'marketing'): void {
  document.querySelectorAll(`script[type="text/plain"][data-consent="${category}"]`)
    .forEach((script) => {
      const newScript = document.createElement('script');
      const src = script.getAttribute('data-src');

      if (src) {
        newScript.src = src;
        newScript.async = true;
      } else {
        newScript.textContent = script.textContent;
      }

      script.parentNode?.replaceChild(newScript, script);
    });
}

// =============================================================================
// COOKIE CONSENT COMPONENT
// =============================================================================

// Session flag to persist banner state across View Transitions
const BANNER_SHOWING_KEY = 'cookie_banner_showing';

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [categories, setCategories] = useState<ConsentCategories>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  // Initialize on mount and handle View Transitions
  useEffect(() => {
    const checkAndShowBanner = () => {
      const stored = getStoredConsent();

      if (stored) {
        // User already made a choice - apply it
        setCategories(stored.categories);
        applyConsent(stored.categories);
        setShowBanner(false);
        sessionStorage.removeItem(BANNER_SHOWING_KEY);
      } else {
        // No consent stored - check if banner was already showing
        const wasShowing = sessionStorage.getItem(BANNER_SHOWING_KEY);
        if (wasShowing) {
          // Banner was showing before navigation - show immediately
          setShowBanner(true);
        } else {
          // First visit - show after brief delay
          const timer = setTimeout(() => {
            setShowBanner(true);
            sessionStorage.setItem(BANNER_SHOWING_KEY, 'true');
          }, 1000);
          return () => clearTimeout(timer);
        }
      }
    };

    checkAndShowBanner();

    // Re-check after View Transitions (Astro navigation)
    const handleSwap = () => {
      // Small delay to let the new page settle
      setTimeout(checkAndShowBanner, 100);
    };

    document.addEventListener('astro:after-swap', handleSwap);
    return () => document.removeEventListener('astro:after-swap', handleSwap);
  }, []);

  // Listen for footer link clicks (works across View Transitions)
  useEffect(() => {
    const handler = () => {
      // Check if user already has consent stored
      const hasExistingConsent = getStoredConsent() !== null;

      setShowSettings(true);

      if (hasExistingConsent) {
        // User already made a choice - only show settings modal (not banner afterward)
        setShowBanner(false);
      } else {
        // No consent yet - show banner too (in case they close settings without saving)
        setShowBanner(true);
        sessionStorage.setItem(BANNER_SHOWING_KEY, 'true');
      }
    };

    window.addEventListener('openCookieSettings', handler);
    document.addEventListener('astro:after-swap', () => {
      // Re-attach listener after View Transition
      window.addEventListener('openCookieSettings', handler);
    });

    return () => window.removeEventListener('openCookieSettings', handler);
  }, []);

  const applyConsent = useCallback((cats: ConsentCategories) => {
    // Update Google Consent Mode
    updateGoogleConsentMode(cats);

    // Enable blocked scripts based on consent
    if (cats.analytics) enableBlockedScripts('analytics');
    if (cats.marketing) enableBlockedScripts('marketing');

    // Delete cookies when consent is revoked
    if (!cats.analytics) deleteCookiesByCategory('analytics');
    if (!cats.marketing) deleteCookiesByCategory('marketing');
  }, []);

  const handleAcceptAll = useCallback(() => {
    const newCategories: ConsentCategories = {
      necessary: true,
      analytics: true,
      marketing: true,
    };

    setCategories(newCategories);
    saveConsent(newCategories);
    applyConsent(newCategories);
    setShowBanner(false);
    setShowSettings(false);
  }, [applyConsent]);

  const handleRejectAll = useCallback(() => {
    const newCategories: ConsentCategories = {
      necessary: true,
      analytics: false,
      marketing: false,
    };

    setCategories(newCategories);
    saveConsent(newCategories);
    applyConsent(newCategories);
    setShowBanner(false);
    setShowSettings(false);
  }, [applyConsent]);

  const handleSavePreferences = useCallback(() => {
    saveConsent(categories);
    applyConsent(categories);
    setShowBanner(false);
    setShowSettings(false);
  }, [categories, applyConsent]);

  const handleToggleCategory = useCallback((category: 'analytics' | 'marketing') => {
    setCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  }, []);

  // Nothing to show
  if (!showBanner && !showSettings) return null;

  // ==========================================================================
  // SETTINGS MODAL - Full-screen overlay with backdrop (blocks page interaction)
  // Can show independently (when opened from footer after user already made a choice)
  // ==========================================================================
  if (showSettings) {
    return (
      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
        style={{ contain: 'layout style paint' }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-title"
      >
        {/* Backdrop - closes modal on click */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setShowSettings(false)}
        />

        {/* Settings Panel */}
        <div className="relative w-full max-w-2xl bg-ink text-canvas shadow-2xl rounded-xl">
          <div className="p-6 md:p-8">
            <div className="flex items-start justify-between mb-6">
              <h2 id="cookie-title" className="text-xl md:text-2xl font-bold">
                Cookie-instellingen
              </h2>
              <button
                onClick={() => setShowSettings(false)}
                className="p-2 hover:bg-canvas/10 rounded-lg transition-colors"
                aria-label="Sluiten"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <p className="text-canvas/70 text-sm mb-6">
              Wij gebruiken cookies om je ervaring te verbeteren. Je kunt per categorie aangeven welke cookies je accepteert.
            </p>

            {/* Category Toggles */}
            <div className="space-y-4 mb-8">
              {/* Necessary - Always on */}
              <div className="flex items-center justify-between p-4 bg-canvas/5 rounded-lg">
                <div>
                  <h3 className="font-semibold">Noodzakelijk</h3>
                  <p className="text-sm text-canvas/60">Essentieel voor de werking van de website</p>
                </div>
                <div className="px-3 py-1 bg-acid/20 text-acid text-xs font-mono rounded whitespace-nowrap shrink-0">
                  Altijd aan
                </div>
              </div>

              {/* Analytics */}
              <div className="flex items-center justify-between p-4 bg-canvas/5 rounded-lg hover:bg-canvas/10 transition-colors">
                <div>
                  <h3 className="font-semibold">Analytisch</h3>
                  <p className="text-sm text-canvas/60">Helpt ons de website te verbeteren (Google Analytics, Clarity)</p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={categories.analytics}
                  onClick={() => handleToggleCategory('analytics')}
                  className={`
                    relative shrink-0 w-12 h-7 rounded-full transition-colors cursor-pointer
                    ${categories.analytics ? 'bg-acid' : 'bg-canvas/20'}
                  `}
                >
                  <span
                    className={`
                      absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-200
                      ${categories.analytics ? 'translate-x-5' : 'translate-x-0'}
                    `}
                  />
                </button>
              </div>

              {/* Marketing */}
              <div className="flex items-center justify-between p-4 bg-canvas/5 rounded-lg hover:bg-canvas/10 transition-colors">
                <div>
                  <h3 className="font-semibold">Marketing</h3>
                  <p className="text-sm text-canvas/60">Voor gepersonaliseerde advertenties (Meta, LinkedIn)</p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={categories.marketing}
                  onClick={() => handleToggleCategory('marketing')}
                  className={`
                    relative shrink-0 w-12 h-7 rounded-full transition-colors cursor-pointer
                    ${categories.marketing ? 'bg-acid' : 'bg-canvas/20'}
                  `}
                >
                  <span
                    className={`
                      absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-200
                      ${categories.marketing ? 'translate-x-5' : 'translate-x-0'}
                    `}
                  />
                </button>
              </div>
            </div>

            {/* Action Buttons - Equal prominence */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleSavePreferences}
                className="flex-1 px-6 py-3 bg-canvas text-ink font-semibold rounded-lg hover:bg-canvas/90 transition-colors"
              >
                Voorkeuren opslaan
              </button>
              <button
                onClick={handleAcceptAll}
                className="flex-1 px-6 py-3 bg-canvas text-ink font-semibold rounded-lg hover:bg-canvas/90 transition-colors"
              >
                Alles accepteren
              </button>
            </div>

            <div className="mt-4 text-center">
              <a href="/privacy#cookies" className="text-sm text-canvas/50 underline hover:text-acid transition-colors">
                Bekijk ons cookiebeleid
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================================================
  // SIMPLE BANNER - Fixed at bottom, NO overlay (allows clicking rest of page)
  // ==========================================================================
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[9999] bg-ink text-canvas shadow-2xl"
      style={{ contain: 'layout style paint' }}
      role="dialog"
      aria-labelledby="cookie-title"
    >
      <div className="p-4 md:p-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
          <div className="flex-1">
            <h2 id="cookie-title" className="font-bold text-lg mb-1">
              Wij gebruiken cookies
            </h2>
            <p className="text-canvas/70 text-sm">
              Om je de beste ervaring te bieden gebruiken wij cookies voor analyse en marketing.{' '}
              <a href="/privacy#cookies" className="text-acid underline hover:text-acid/80">Meer info</a>
            </p>
          </div>

          {/* Buttons - Equal prominence as required by Dutch DPA */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleAcceptAll}
              className="px-6 py-3 bg-canvas text-ink font-semibold rounded-lg hover:bg-canvas/90 transition-colors min-w-[140px]"
            >
              Accepteren
            </button>
            <button
              onClick={handleRejectAll}
              className="px-6 py-3 bg-canvas text-ink font-semibold rounded-lg hover:bg-canvas/90 transition-colors min-w-[140px]"
            >
              Weigeren
            </button>
            <button
              onClick={() => setShowSettings(true)}
              className="px-6 py-3 border border-canvas/30 text-canvas font-semibold rounded-lg hover:bg-canvas/10 transition-colors min-w-[140px]"
            >
              Aanpassen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CookieConsent;
