import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const PageTransitionLoader = () => {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // بدء الـ loading فوراً
    setLoading(true);
    setShow(false);
    
    // إظهار الـ loader بعد 100ms (لو الصفحة لسه بتحمل)
    const showTimer = setTimeout(() => {
      if (loading) {
        setShow(true);
      }
    }, 100);
    
    // إخفاء الـ loader بعد 400ms
    const hideTimer = setTimeout(() => {
      setLoading(false);
      setShow(false);
    }, 400);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [location.pathname]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-background/80 backdrop-blur-sm flex items-center justify-center animate-in fade-in duration-200">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-primary/50 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
        </div>
        <p className="text-sm text-muted-foreground animate-pulse">جاري التحميل...</p>
      </div>
    </div>
  );
};
