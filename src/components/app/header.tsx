import React from 'react';
import { PenSquare } from 'lucide-react';

const Header = () => {
  return (
    <header className="flex items-center justify-center gap-4 mb-8">
      <PenSquare className="w-12 h-12 text-accent" />
      <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/60">
        Digitalis
      </h1>
    </header>
  );
};

export default Header;
