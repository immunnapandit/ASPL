import { useEffect } from 'react';
interface FadeVars {
  opacity: number;
  duration: number;
  delay: number;
  ease: string;
  scrollTrigger: { trigger: HTMLElement; start: string };
  y?: number;
  x?: number;
}

export default function AnimationProvider() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Scroll to top on component mount
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

    const initGSAP = async () => {
      // Dynamic imports
      const gsapModule = await import('gsap');
      const ScrollTriggerModule = await import('gsap/ScrollTrigger');
      const SplitTextModule = await import('gsap/SplitText');

      const gsap = gsapModule.default;
      const ScrollTrigger = ScrollTriggerModule.ScrollTrigger;
      const SplitText = SplitTextModule.default;

      gsap.registerPlugin(ScrollTrigger, SplitText);
      gsap.config({ nullTargetWarn: false });

      const ctx = gsap.context(() => {
        /* SPLIT TEXT ANIMATION */
        gsap.utils.toArray<HTMLElement>('.tv-spltv-text').forEach((el) => {
          const split = new SplitText(el, {
            type: 'lines,words,chars',
            linesClass: 'tv-spltv-line',
          });
          gsap.set(el, { perspective: 400 });

          if (el.classList.contains('tv-spltv-in-right'))
            gsap.set(split.chars, { opacity: 0, x: 50 });
          if (el.classList.contains('tv-spltv-in-left'))
            gsap.set(split.chars, { opacity: 0, x: -50 });
          if (el.classList.contains('tv-spltv-in-up'))
            gsap.set(split.chars, { opacity: 0, y: 80 });
          if (el.classList.contains('tv-spltv-in-down'))
            gsap.set(split.chars, { opacity: 0, y: -80 });

          gsap.to(split.chars, {
            scrollTrigger: { trigger: el, start: 'top 90%' },
            x: 0,
            y: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.02,
            ease: 'power2.out',
          });
        });

        /* FADE ANIMATION */
        gsap.utils.toArray<HTMLElement>('.tv-fade-anim').forEach((item) => {
          const fadeFrom = item.dataset.fadeFrom || 'bottom';
          const offset = Number(item.dataset.fadeOffset) || 50;
          const duration = Number(item.dataset.duration) || 1.15;
          const delay = Number(item.dataset.delay) || 0.15;
          const ease = item.dataset.ease || 'power2.out';

          const vars: FadeVars = {
            opacity: 0,
            duration,
            delay,
            ease,
            scrollTrigger: { trigger: item, start: 'top 85%' },
          };

          if (fadeFrom === 'top') vars.y = -offset;
          if (fadeFrom === 'bottom') vars.y = offset;
          if (fadeFrom === 'left') vars.x = -offset;
          if (fadeFrom === 'right') vars.x = offset;

          gsap.from(item, vars);
        });

        ScrollTrigger.refresh();
      });

      return () => ctx.revert(); // cleanup on unmount
    };

    initGSAP();
  }, []); // run once on mount

  return null;
}
