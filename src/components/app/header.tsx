import React from 'react';
import { BookText } from 'lucide-react';

const Header = () => {
  return (
    <header className="flex items-center justify-center w-full mb-8">
      <div className="glass-effect flex items-center justify-center rounded-lg shadow-lg p-4">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter animated-gradient-text flex items-center gap-4">
          <BookText className="w-12 h-12 md:w-16 md:h-16" />
          <span>DIGITAL DIARY</span>
        </h1>
      </div>
    </header>
  );
};

export default Header;
