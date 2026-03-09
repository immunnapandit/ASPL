import { useEffect, useState } from 'react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsVisible(window.scrollY > 500);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      className={`scroll-top scroll-to-target ${isVisible ? 'open' : ''}`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <i className="far fa-angle-double-up"></i>
    </button>
  );
};

export default ScrollToTop;
