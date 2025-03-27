'use client';

import * as React from 'react';
import '@/lib/env';
 
import Canvas from '../components/Canvas';
/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */
import Logo from '~/svg/Logo.svg';
import { Header } from '@/components/Header/Header';
import DraggableBox from '@/components/DraggableBox';
 

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {
  return (
    <main>
 
      <Header />
      <div className='flex justify-center items-center h-screen'>
        <Canvas />
      </div>
 
      <DraggableBox />
 
    </main>
  );
}
