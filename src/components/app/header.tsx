import React from 'react';
import { PenSquare } from 'lucide-react';

const Header = () => {
  return (
    <header className="flex items-center justify-center gap-4 mb-8">
      <div className="animated-gradient-text">
        <PenSquare className="w-12 h-12" />
      </div>
      <h1 className="text-5xl md:text-7xl font-bold tracking-tighter animated-gradient-text">
        DIGITAL DIARY
      </h1>
    </header>
  );
};

export default Header;
