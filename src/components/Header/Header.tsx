import Image from 'next/image';
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className='sticky top-0 z-50 w-full'>
      {/* Decorative top bar with gradient */}
      <div className='h-1 w-full bg-gradient-to-r from-[#A0522D] via-[#F4A460] to-[#8B4513]'></div>

      {/* Main header with glass effect */}
      <div className='border-b border-[rgba(196,175,138,0.3)] bg-[rgba(248,245,240,0.8)] shadow-sm backdrop-blur-lg'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex h-20 items-center justify-between'>
            {/* Left side: Logo/Title with fancy styling */}
            <div className='group flex items-center'>
              {/* EspressoPlace Logo */}
              <div className='relative mr-3 h-10 w-10 overflow-hidden transition-transform duration-300 group-hover:scale-110'>
                <Image
                  src='/images/EspressoPlace Logo.png'
                  alt='EspressoPlace Logo'
                  width={40}
                  height={40}
                  className='object-contain'
                />
              </div>

              <div className='relative'>
                <h1 className='relative z-10 text-2xl font-bold tracking-tight transition-all duration-300 group-hover:tracking-wider'>
                  {/* First part with gradient text */}
                  <span className='relative inline-block bg-gradient-to-r from-[#8B4513] via-[#A0522D] to-[#CD853F] bg-clip-text text-transparent'>
                    <span className='inline-block transition-transform duration-150 hover:translate-y-[-2px]'>
                      E
                    </span>
                    <span className='inline-block transition-transform delay-[50ms] duration-150 hover:translate-y-[-2px]'>
                      s
                    </span>
                    <span className='inline-block transition-transform delay-[100ms] duration-150 hover:translate-y-[-2px]'>
                      p
                    </span>
                    <span className='inline-block transition-transform delay-[150ms] duration-150 hover:translate-y-[-2px]'>
                      r
                    </span>
                    <span className='inline-block transition-transform delay-[200ms] duration-150 hover:translate-y-[-2px]'>
                      e
                    </span>
                    <span className='inline-block transition-transform delay-[250ms] duration-150 hover:translate-y-[-2px]'>
                      s
                    </span>
                    <span className='inline-block transition-transform delay-[300ms] duration-150 hover:translate-y-[-2px]'>
                      s
                    </span>
                    <span className='inline-block transition-transform delay-[350ms] duration-150 hover:translate-y-[-2px]'>
                      o
                    </span>
                  </span>

                  {/* Second part with different gradient */}
                  <span className='relative ml-1 inline-block bg-gradient-to-r from-[#A0522D] via-[#CD853F] to-[#DEB887] bg-clip-text font-extrabold text-transparent'>
                    <span className='inline-block transition-transform delay-[400ms] duration-150 hover:translate-y-[-2px]'>
                      P
                    </span>
                    <span className='inline-block transition-transform delay-[450ms] duration-150 hover:translate-y-[-2px]'>
                      l
                    </span>
                    <span className='inline-block transition-transform delay-[500ms] duration-150 hover:translate-y-[-2px]'>
                      a
                    </span>
                    <span className='inline-block transition-transform delay-[550ms] duration-150 hover:translate-y-[-2px]'>
                      c
                    </span>
                    <span className='inline-block transition-transform delay-[600ms] duration-150 hover:translate-y-[-2px]'>
                      e
                    </span>
                  </span>
                </h1>

                {/* Enhanced underline effect with animation */}
                <div className='absolute bottom-0 left-0 h-[2px] w-full overflow-hidden'>
                  <div className='animate-gradient-x h-full w-full bg-gradient-to-r from-[#8B4513] via-[#F4A460] to-[#DEB887]'></div>
                </div>

                {/* Subtle decorative dots */}
                <div className='absolute left-0 top-0 flex w-full justify-between px-1 opacity-0 transition-opacity duration-500 group-hover:opacity-100'>
                  <span className='h-1 w-1 rounded-full bg-[#A0522D]'></span>
                  <span className='h-1 w-1 rounded-full bg-[#CD853F]'></span>
                  <span className='h-1 w-1 rounded-full bg-[#DEB887]'></span>
                </div>
              </div>
            </div>

            {/* Right side: Connect Wallet Button with enhanced styling */}
            <div className='flex items-center'>
              {/* Decorative circle background */}
              <div className='relative'>
                <div className='absolute -inset-1 rounded-full bg-gradient-to-r from-[#A0522D]/20 to-[#F4A460]/20 opacity-75 blur-md transition duration-300 group-hover:opacity-100'></div>
                <div className='glow-on-hover overflow-hidden rounded-full bg-gradient-to-r from-[#A0522D] to-[#F4A460] p-0.5 shadow-md transition-shadow duration-300 hover:shadow-lg'>
                  <div className='rounded-full bg-[rgba(248,245,240,0.9)] p-0.5'>
                    <appkit-button balance='hide' />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
