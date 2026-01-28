import { useState, useEffect, useRef } from 'react';

export function ContactWidget() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [isContactPage, setIsContactPage] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Show the floating button after a delay (after cookie banner has appeared)
  useEffect(() => {
    const checkPage = () => {
      setIsContactPage(window.location.pathname === '/contact' || window.location.pathname === '/contact/');
    };

    const show = () => {
      checkPage();
      const timer = setTimeout(() => setVisible(true), 2500);
      return timer;
    };

    let timer = show();

    const handleSwap = () => {
      setOpen(false);
      checkPage();
      timer = show();
    };

    document.addEventListener('astro:after-swap', handleSwap);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('astro:after-swap', handleSwap);
    };
  }, []);

  // Close card when clicking outside
  useEffect(() => {
    if (!open) return;

    const handleClick = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    const timer = setTimeout(() => {
      document.addEventListener('click', handleClick);
    }, 10);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('click', handleClick);
    };
  }, [open]);

  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open]);

  if (isContactPage) return null;

  return (
    <>
      {/* Backdrop overlay */}
      {open && (
        <div
          className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-[2px] transition-opacity duration-300"
          aria-hidden="true"
        />
      )}

      {/* Contact card */}
      <div
        ref={cardRef}
        className={`
          fixed bottom-24 right-4 md:right-8 z-[80] w-[min(360px,calc(100vw-2rem))]
          bg-ink text-canvas shadow-2xl border border-canvas/10
          transition-all duration-300 origin-bottom-right
          ${open ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4 pointer-events-none'}
        `}
        role="dialog"
        aria-modal="true"
        aria-label="Contact opties"
      >
        {/* Header */}
        <div className="flex items-center gap-4 p-5 pb-4">
          <img
            src="/assets/yannick.webp"
            alt="Yannick Veldhuisen"
            className="w-12 h-12 rounded-full object-cover object-top shrink-0 ring-2 ring-acid/30"
          />
          <div>
            <h2 className="text-lg font-black uppercase tracking-tight text-canvas leading-tight">
              Waar kan ik je mee helpen?
            </h2>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="ml-auto p-1.5 text-canvas/40 hover:text-acid transition-colors shrink-0 self-start cursor-pointer"
            aria-label="Sluiten"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Options */}
        <div className="px-4 pb-3 space-y-2">
          {/* Plan een kennismaking */}
          <a
            href="/aanvragen"
            className="group flex items-center gap-3 p-3 border border-canvas/10 hover:border-acid hover:bg-acid/5 transition-all duration-200"
          >
            <span className="w-9 h-9 bg-acid flex items-center justify-center shrink-0">
              <svg className="w-[18px] h-[18px] text-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </span>
            <span className="text-sm font-bold uppercase tracking-tight text-canvas/80 group-hover:text-acid transition-colors">
              Plan een kennismaking
            </span>
            <span className="ml-auto text-canvas/30 group-hover:text-acid group-hover:translate-x-1 transition-all duration-200">&rarr;</span>
          </a>

          {/* Een vraag stellen */}
          <a
            href="/contact"
            className="group flex items-center gap-3 p-3 border border-canvas/10 hover:border-acid hover:bg-acid/5 transition-all duration-200"
          >
            <span className="w-9 h-9 bg-electric flex items-center justify-center shrink-0">
              <svg className="w-[18px] h-[18px] text-canvas" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
            <span className="text-sm font-bold uppercase tracking-tight text-canvas/80 group-hover:text-acid transition-colors">
              Een vraag stellen
            </span>
            <span className="ml-auto text-canvas/30 group-hover:text-acid group-hover:translate-x-1 transition-all duration-200">&rarr;</span>
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/31623571852"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 p-3 border border-canvas/10 hover:border-acid hover:bg-acid/5 transition-all duration-200"
          >
            <span className="w-9 h-9 bg-[#25D366] flex items-center justify-center shrink-0">
              <svg className="w-[18px] h-[18px] text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </span>
            <span className="text-sm text-canvas/80 group-hover:text-acid transition-colors">
              <strong className="font-bold text-[#25D366]">Appen:</strong>{' '}
              <span className="font-mono">06 2357 1852</span>
            </span>
          </a>
        </div>

        {/* Contact page link */}
        <div className="border-t border-canvas/10 mx-4">
          <a
            href="/contact"
            className="group flex items-center gap-2 py-3 text-sm font-bold uppercase tracking-tight text-canvas/50 hover:text-acid transition-colors"
          >
            Contactgegevens
            <span className="group-hover:translate-x-1 transition-transform duration-200">&rarr;</span>
          </a>
        </div>
      </div>

      {/* Floating action button */}
      <button
        onClick={() => setOpen(!open)}
        className={`
          fixed bottom-6 right-4 md:right-8 z-[80]
          w-14 h-14 shadow-lg
          flex items-center justify-center
          transition-all duration-500 cursor-pointer
          ${open
            ? 'bg-canvas text-ink hover:bg-canvas/90'
            : 'bg-ink text-acid border border-canvas/20 hover:bg-ink/90 hover:shadow-xl hover:scale-105'
          }
          ${visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0 pointer-events-none'}
        `}
        aria-label={open ? 'Contactmenu sluiten' : 'Contactmenu openen'}
        aria-expanded={open}
      >
        {open ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>
    </>
  );
}

export default ContactWidget;
