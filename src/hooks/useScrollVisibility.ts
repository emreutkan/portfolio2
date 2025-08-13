import { useState, useEffect } from 'react';

export const useScrollVisibility = (threshold: number = 100) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window === 'undefined') return;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsVisible(scrollTop > threshold);
    };

    // Check initial scroll position
    handleScroll();

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [threshold]);

  return isVisible;
};
