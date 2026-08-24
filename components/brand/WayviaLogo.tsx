'use client';

import React from 'react';
import Image from 'next/image';

interface WayviaLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  withText?: boolean;
}

export const WayviaLogo: React.FC<WayviaLogoProps> = ({
  className = '',
  size = 'md',
  showTagline = false,
  withText = true,
}) => {
  const iconDimensions = {
    sm: { width: 34, height: 34 },
    md: { width: 44, height: 44 },
    lg: { width: 56, height: 56 },
    xl: { width: 72, height: 72 },
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
  };

  const currentDim = iconDimensions[size];

  return (
    <div className={`flex items-center gap-3 select-none group ${className}`}>
      {/* Real Wayvia Logo Image */}
      <div className="relative rounded-2xl overflow-hidden shadow-[0_0_20px_rgba(6,182,212,0.35)] border border-cyan-500/30 flex-shrink-0 transition-transform group-hover:scale-105 duration-300">
        <img
          src="/wayvia-logo.png"
          alt="Wayvia Logo"
          className="object-cover"
          style={{ width: currentDim.width, height: currentDim.height }}
        />
      </div>

      {/* Typography with gradient 'via' and optional tagline */}
      {withText && (
        <div className="flex flex-col">
          <div className="flex items-center">
            <span className={`font-black tracking-tight text-white ${textSizes[size]}`}>
              Way
            </span>
            <span className={`font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-400 to-purple-400 ${textSizes[size]}`}>
              via
            </span>
          </div>
          {showTagline && (
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="h-[1.5px] w-3 bg-gradient-to-r from-cyan-400 to-sky-400 rounded-full" />
              <span className="text-[8px] font-extrabold uppercase tracking-[0.2em] text-slate-300">
                TRAVEL SMARTER. ALWAYS.
              </span>
              <span className="h-[1.5px] w-3 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
