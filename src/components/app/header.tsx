import React from 'react';
import { PenSquare } from 'lucide-react';

const Header = () => {
  return (
    <header className="glass-effect flex items-center justify-center gap-4 mb-8 p-4 rounded-lg shadow-lg">
      <PenSquare className="w-12 h-12 text-purple-400" />
      <h1 className="text-5xl md:text-7xl font-bold tracking-tighter animated-gradient-text">
        DIGITAL DIARY
      </h1>
    </header>
  );
};

export default Header;
