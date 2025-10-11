import React from 'react';
import Logo from './logo';

const Header = () => {
  return (
    <header className="flex items-center justify-center gap-4 mb-8 p-4 rounded-lg">
      <div className="glass-effect flex items-center justify-center rounded-lg shadow-lg p-4">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter animated-gradient-text flex items-center gap-4">
          <Logo className="w-12 h-12 animated-gradient-text" />
          <span>DIGITAL DIARY</span>
        </h1>
      </div>
    </header>
  );
};

export default Header;
