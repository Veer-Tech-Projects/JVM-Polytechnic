import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Script from 'next/script'; // ✅ ADD THIS
import '../styles/globals.css';

import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import AOSProvider from '@/components/providers/AOSProvider';
import GlobalLoader from "@/components/GlobalLoader";

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'JVM Polytechnic',
  description: 'Official website of JVM Polytechnic — Empowering Technical Education',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Google Analytics Tag */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
          `}
        </Script>
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen bg-white text-gray-900`}
      >
        <GlobalLoader>
          <AOSProvider>
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </AOSProvider>
        </GlobalLoader>
      </body>
    </html>
  );
}
