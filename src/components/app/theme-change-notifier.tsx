"use client";

import { useTheme } from 'next-themes';
import { useEffect, useState, useMemo } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function ThemeChangeNotifier() {
  const { resolvedTheme, theme } = useTheme();
  const [showNotification, setShowNotification] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const themeToShow = useMemo(() => resolvedTheme || theme, [resolvedTheme, theme]);

  useEffect(() => {
    if (isInitialLoad) {
      setIsInitialLoad(false);
      return;
    }
    
    if (themeToShow) {
      setShowNotification(true);
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 3000); 

      return () => clearTimeout(timer);
    }
  }, [themeToShow, isInitialLoad]);

  const animationClass = showNotification ? 'animate-in' : 'animate-out';

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-start justify-center pt-10 transition-all duration-300 pointer-events-none ${showNotification ? 'backdrop-blur-sm' : 'backdrop-blur-0'}`}
    >
      <div
        className={`glass-effect rounded-lg p-6 shadow-2xl flex flex-col items-center gap-4 ${animationClass}`}
        style={{
          animationFillMode: 'forwards',
          animationDuration: showNotification ? '500ms' : '300ms',
          animationDelay: showNotification ? '0ms' : '2700ms', /* Show for 3s total */
        }}
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
