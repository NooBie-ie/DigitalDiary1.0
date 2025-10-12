"use client";

import { useTheme } from 'next-themes';
import { useEffect, useState, useMemo } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function ThemeChangeNotifier() {
  const { resolvedTheme, theme } = useTheme();
  const [showNotification, setShowNotification] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [animationClass, setAnimationClass] = useState('');

  const themeToShow = useMemo(() => resolvedTheme || theme, [resolvedTheme, theme]);

  useEffect(() => {
    if (isInitialLoad) {
      setIsInitialLoad(false);
      return;
    }
    
    if (themeToShow) {
      setShowNotification(true);
      setAnimationClass('animate-in');
      const timer = setTimeout(() => {
        setAnimationClass('animate-out');
        // Wait for fade-out animation to complete before hiding
        setTimeout(() => setShowNotification(false), 1000); 
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [themeToShow, isInitialLoad]);
  
  if (!showNotification) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-start justify-center pt-10 pointer-events-none transition-all duration-1000 ${animationClass === 'animate-in' ? 'backdrop-blur-sm' : 'backdrop-blur-0'}`}
    >
      <div
        className={`glass-effect rounded-lg p-6 shadow-2xl flex flex-col items-center gap-4 ${animationClass}`}
      >
        {themeToShow === 'dark' ? (
          <Moon className="w-12 h-12" />
        ) : (
          <Sun className="w-12 h-12" />
        )}
        <p className="text-xl font-semibold">
          {themeToShow === 'dark' ? 'Dark Mode' : 'Light Mode'}
        </p>
      </div>
    </div>
  );
}
