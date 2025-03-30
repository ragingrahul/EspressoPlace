'use client';

import * as React from 'react';
import '@/lib/env';

import DraggableBox from '@/components/DraggableBox';
import { Header } from '@/components/Header/Header';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {
  return (
    <main className='flex min-h-screen flex-col'>
      <Header />

      <div className='container mx-auto flex-1 px-4 py-6'>
        <div className='mb-8 flex justify-center'>
          <div className='max-w-md text-center'>
            <h1 className='text-glow mb-2 text-2xl font-bold text-[#453315]'>
              Welcome to EspressoPlace
            </h1>
            <p className='text-sm text-[#5d4422]/80'>
              A decentralized pixel canvas on EspressoPlace Chain (ID: 4406).
              Create your digital masterpiece in this cozy virtual space.
            </p>
          </div>
        </div>

        <DraggableBox />
      </div>

      <div className='pointer-events-none fixed bottom-0 left-0 h-24 w-full bg-gradient-to-t from-[rgba(248,245,240,0.9)] to-transparent'></div>
    </main>
  );
}
