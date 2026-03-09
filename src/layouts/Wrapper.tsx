import { useEffect, type ReactNode } from 'react';
import { animationCreate } from '../utils/utils';
import ScrollToTop from '../common/ScrollToTop';
import AnimationProvider from '../common/AnimationProvider';
import BackToTop from '../common/BackToTop';

interface WrapperProps {
  children: ReactNode;
}

export default function Wrapper({ children }: WrapperProps) {
  useEffect(() => {
    // animation
    const timer = setTimeout(() => {
      animationCreate();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {children}
      <ScrollToTop />
      <BackToTop />
      <AnimationProvider />
    </>
  );
}
