import { useState, useEffect } from 'react';

const MOBILE_BREAKPOINT = 768;

/**
 * Hook to detect if the current viewport is mobile-sized
 * Uses matchMedia API for efficient media query detection
 * @returns boolean indicating if viewport width is below mobile breakpoint (768px)
 */
export const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener('change', onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return !!isMobile;
};