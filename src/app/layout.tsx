import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '../styles/globals.css';

import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer'; // ✅ enable footer
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
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
