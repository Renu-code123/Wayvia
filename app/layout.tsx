import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { TripProvider } from '@/lib/store/tripStore';
import { Navbar } from '@/components/layout/Navbar';

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Wayvia — Travel Smarter. Always.',
  description:
    'Wayvia watches your trip, understands real-world changes, and adapts your itinerary automatically. Powered by 6 specialized AI agents.',
  keywords: ['travel AI', 'adaptive travel', 'trip planner', 'agentic AI', 'itinerary', 'weather-aware travel'],
  authors: [{ name: 'Wayvia' }],
  openGraph: {
    title: 'Wayvia — Travel Smarter. Always.',
    description: 'Agentic AI that monitors and replans your trip in real time.',
    type: 'website',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${jakartaSans.variable} ${inter.variable}`}>
      <body className={`${jakartaSans.className} bg-background min-h-screen text-slate-100 antialiased`}>
        <TripProvider>
          <Navbar />
          <main className="min-h-[calc(100vh-72px)] flex flex-col">
            {children}
          </main>
        </TripProvider>
      </body>
    </html>
  );
}
