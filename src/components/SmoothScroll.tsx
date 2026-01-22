import { useEffect } from "react";
import Lenis from "lenis";

export function SmoothScroll() {
    useEffect(() => {
        const lenis = new Lenis({
            lerp: 0.1,
            smoothWheel: true,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Handle anchor link clicks for smooth scrolling on same page
        // Use capture phase to intercept before Astro ViewTransitions
        function handleAnchorClick(e: MouseEvent) {
            const target = e.target as HTMLElement;
            const anchor = target.closest('a[href^="#"], a[href^="/#"]') as HTMLAnchorElement | null;

            if (!anchor) return;

            const href = anchor.getAttribute('href');
            if (!href) return;

            // Extract the hash part
            const hashIndex = href.indexOf('#');
            if (hashIndex === -1) return;
            const hash = href.slice(hashIndex);
            if (!hash || hash === '#') return;

            // Check if we're on the same page (either #anchor or /#anchor on homepage)
            const isHomepage = window.location.pathname === '/' || window.location.pathname === '';
            const isHashOnly = href.startsWith('#');
            const isHomeAnchor = href.startsWith('/#');

            // Only handle if we're on homepage and it's a hash link
            if (isHashOnly || (isHomeAnchor && isHomepage)) {
                const element = document.querySelector(hash);
                if (element) {
                    // Prevent default to block ViewTransitions and native navigation
                    // Note: Don't use stopPropagation() - other handlers (like mobile menu close) need the event
                    e.preventDefault();

                    // Update URL hash without triggering navigation
                    history.pushState(null, '', hash);

                    // Smooth scroll to element
                    // Sections have py-16 (64px) / py-24 (96px) internal padding
                    // So offset ~0 puts the heading right below the fixed header
                    const isMobile = window.innerWidth < 768;
                    lenis.scrollTo(element, {
                        offset: isMobile ? 0 : -8,
                        duration: 1.2,
                    });
                }
            }
        }

        // Use capture phase to run before ViewTransitions
        document.addEventListener('click', handleAnchorClick, { capture: true });

        return () => {
            document.removeEventListener('click', handleAnchorClick, { capture: true });
            lenis.destroy();
        };
    }, []);

    return null;
}
