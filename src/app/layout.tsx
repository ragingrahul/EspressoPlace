import { Metadata } from 'next';
import * as React from 'react';

import '@/styles/globals.css';
// !STARTERCONF This is for demo purposes, remove @/styles/colors.css import immediately
import '@/styles/colors.css';

import { siteConfig } from '@/constant/config';

// !STARTERCONF Change these default meta
// !STARTERCONF Look at @/constant/config to change them
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  robots: { index: true, follow: true },
  // !STARTERCONF this is the default favicon, you can generate your own from https://realfavicongenerator.net/
  // ! copy to /favicon folder
  icons: {
    icon: '/icon.ico',
  },
  manifest: `/favicon/site.webmanifest`,
  openGraph: {
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.title,
    images: [`${siteConfig.url}/images/Demo Image.png`],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [`${siteConfig.url}/images/Demo Image.png`],
    // creator: '@th_clarence',
  },
  // authors: [
  //   {
  //     name: 'Theodorus Clarence',
  //     url: 'https://theodorusclarence.com',
  //   },
  // ],
};

import { headers } from 'next/headers'; // added
import { Toaster } from 'react-hot-toast';

import ContextProvider from '@/context';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookies = headers().get('cookie');

  return (
    <html lang='en'>
      <body className='grid-lines min-h-screen bg-[rgb(248,245,240)] text-[#453315]'>
        <div className='grid-lines fixed inset-0 -z-10 bg-[#f8f5f0]'></div>
        <ContextProvider cookies={cookies}>
          {children}
          <Toaster
            position='bottom-left'
            toastOptions={{
              style: {
                background: '#F8F5F0',
                color: '#5d4422',
                border: '2px solid #5d4422',
                borderRadius: '12px',
                padding: '20px 24px',
                fontSize: '18px',
                fontWeight: '600',
                boxShadow: '0 8px 24px rgba(93, 68, 34, 0.2)',
                backdropFilter: 'blur(8px)',
                minWidth: '320px',
                maxWidth: '420px',
                transform: 'translateX(0)',
                opacity: '1',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              },
              success: {
                iconTheme: {
                  primary: '#5d4422',
                  secondary: '#F8F5F0',
                },
                duration: 4000,
                className:
                  '!bg-[#F8F5F0] !border-[#5d4422] hover:scale-105 transition-transform duration-200 animate-slide-in',
              },
              error: {
                iconTheme: {
                  primary: '#FF3D3D',
                  secondary: '#F8F5F0',
                },
                duration: 5000,
                className:
                  '!bg-[#FFF5F5] !border-[#FF3D3D] hover:scale-105 transition-transform duration-200 animate-slide-in',
              },
            }}
          />
        </ContextProvider>
      </body>
    </html>
  );
}
