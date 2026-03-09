import { useEffect, useRef, useState } from 'react';

interface StickyState {
  sticky: boolean;
}

// Throttle function to limit how often a function can be called
const throttle = <T extends unknown[]>(
  func: (...args: T) => void,
  limit: number
) => {
  let inThrottle: boolean;
  return function (...args: T) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

const UseSticky = (): StickyState => {
  const [sticky, setSticky] = useState(false);
  const throttledHandleScroll = useRef<(() => void) | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 200);
    };

    // Create throttled version with 100ms limit
    throttledHandleScroll.current = throttle(handleScroll, 100) as () => void;

    window.addEventListener('scroll', throttledHandleScroll.current, {
      passive: true,
    });

    return () => {
      if (throttledHandleScroll.current) {
        window.removeEventListener('scroll', throttledHandleScroll.current);
      }
    };
  }, []);

  return { sticky };
};

export default UseSticky;
