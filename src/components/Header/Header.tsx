import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className='sticky top-0 z-50 w-full bg-white shadow-md'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex h-16 items-center justify-between'>
          {/* Left side: Logo/Title */}
          <div className='flex items-center'>
            <span className='text-xl font-bold text-primary-800'>
              EspressoPlace
            </span>
          </div>

          {/* Right side: Connect Wallet Button */}
          <div className='flex items-center'>
            <appkit-button balance='hide' />
          </div>
        </div>
      </div>
    </header>
  );
};
