'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { WayviaLogo } from '@/components/brand/WayviaLogo';
import { Menu, X, ArrowRight, LayoutDashboard, Sparkles, BookOpen, Globe } from 'lucide-react';
import { QuickPlanModal } from '@/components/plan/QuickPlanModal';

const NAV_LINKS = [
  { href: '/#how-it-works', label: 'How It Works' },
  { href: '/#features', label: 'Features' },
  { href: '/#destinations', label: 'Destinations' },
  { href: '/#blog', label: 'Blog' },
];

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isQuickPlanOpen, setIsQuickPlanOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#060a12]/95 backdrop-blur-xl border-b border-white/5 shadow-[0_4px_20px_rgba(0,0,0,0.4)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[72px]">

            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <WayviaLogo size="md" showTagline={false} />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              <Link
                href="/dashboard"
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  pathname === '/dashboard'
                    ? 'text-cyan-300 bg-cyan-500/10 border border-cyan-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
                <span className="relative flex h-2 w-2 ml-0.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
                </span>
              </Link>

              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-400 hover:text-white hover:bg-white/5 transition-all"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              <Link
                href="/plan"
                className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-slate-300 hover:text-white hover:bg-white/5 border border-white/8 transition-all"
              >
                <Globe className="w-4 h-4 text-slate-400" />
                <span>Full Planner</span>
              </Link>

              <button
                onClick={() => setIsQuickPlanOpen(true)}
                className="btn-primary text-sm px-5 py-2.5"
              >
                <Sparkles className="w-4 h-4" />
                <span>Plan My Trip</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-white/5 bg-[#060a12]/98 backdrop-blur-xl animate-fade-in">
            <div className="px-4 py-4 space-y-1">
              <Link
                href="/dashboard"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 px-4 py-3 rounded-2xl text-sm font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition-all"
              >
                <LayoutDashboard className="w-4 h-4 text-cyan-400" />
                Live Dashboard
              </Link>
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex px-4 py-3 rounded-2xl text-sm font-semibold text-slate-400 hover:text-white hover:bg-white/5 transition-all"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 border-t border-white/5">
                <button
                  onClick={() => { setMobileOpen(false); setIsQuickPlanOpen(true); }}
                  className="w-full btn-primary justify-center py-3"
                >
                  <Sparkles className="w-4 h-4" />
                  Plan My Trip
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      <QuickPlanModal isOpen={isQuickPlanOpen} onClose={() => setIsQuickPlanOpen(false)} />
    </>
  );
};
