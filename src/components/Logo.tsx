import React from 'react';

export const Logo = ({ className = "w-20 h-20" }: { className?: string }) => (
  <div className={`relative ${className} flex items-center justify-center`}>
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
      <circle cx="50" cy="50" r="48" fill="#e11d48" />
      <path 
        d="M50 78 C 30 65 15 50 15 35 C 15 25 23 18 33 18 C 39 18 46 22 50 28 C 54 22 61 18 67 18 C 77 18 85 25 85 35 C 85 50 70 65 50 78 Z" 
        fill="white"
      />
    </svg>
  </div>
);
