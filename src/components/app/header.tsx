import React from 'react';

const Header = () => {
  return (
    <header className="flex items-center justify-center w-full mb-8">
      <div className="glass-effect flex items-center justify-center rounded-lg shadow-lg p-4">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter flex items-center gap-4">
          <span>📒</span>
          <span className="animated-gradient-text">DIGITAL DIARY</span>
        </h1>
      </div>
    </header>
  );
};

export default Header;
