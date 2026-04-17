import { useEffect, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { animationCreate } from '../utils/utils';
import ScrollToTop from '../common/ScrollToTop';
import AnimationProvider from '../common/AnimationProvider';
import BackToTop from '../common/BackToTop';
import DefaultSeo from '../common/DefaultSeo';

interface WrapperProps {
  children: ReactNode;
}

export default function Wrapper({ children }: WrapperProps) {
  const location = useLocation();

  useEffect(() => {
    // animation
    const timer = setTimeout(() => {
      animationCreate();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!location.hash) {
      return;
    }

    const timer = window.setTimeout(() => {
      const element = document.getElementById(location.hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 120);

    return () => window.clearTimeout(timer);
  }, [location.hash, location.pathname]);

  return (
    <>
      <DefaultSeo />
      {children}
      <ScrollToTop />
      <BackToTop />
      <AnimationProvider />
    </>
  );
}
