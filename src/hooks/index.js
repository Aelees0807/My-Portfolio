import { useEffect, useState } from 'react';

/**
 * useScrollProgress — Returns a normalized 0→1 value representing
 * how far the user has scrolled through the page.
 *
 * Uses requestAnimationFrame for performance, passive listener
 * to avoid blocking scroll.
 */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          setProgress(docHeight > 0 ? Math.min(scrollY / docHeight, 1) : 0);
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return progress;
}

/**
 * useNavScrolled — Returns true when the user has scrolled past
 * a threshold (default 20px). Used to toggle the .scrolled class
 * on the glass-nav.
 */
export function useNavScrolled(threshold = 20) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > threshold);
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return scrolled;
}

/**
 * useInView — Simple intersection observer hook.
 * Returns a ref to attach to the target element and a boolean
 * indicating whether it's currently in the viewport.
 *
 * @param {Object} options — IntersectionObserver options
 * @param {boolean} once — If true, stops observing after first intersection
 */
export function useInView(options = {}, once = true) {
  const [inView, setInView] = useState(false);
  const [ref, setRef] = useState(null);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        if (once) observer.unobserve(ref);
      } else if (!once) {
        setInView(false);
      }
    }, {
      threshold: 0.1,
      ...options,
    });

    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref, once, options]);

  return [setRef, inView];
}
