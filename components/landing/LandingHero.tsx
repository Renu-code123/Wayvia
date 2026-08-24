'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  CloudRain, Plane, Train, Shield, Coins, ArrowRight, Play, Sparkles,
  CheckCircle2, XCircle, Pencil, Radio, Navigation, Zap,
} from 'lucide-react';
import { WayviaLogo } from '@/components/brand/WayviaLogo';
import { QuickPlanModal } from '@/components/plan/QuickPlanModal';
import { useTripStore } from '@/lib/store/tripStore';

export const LandingHero: React.FC = () => {
  const router = useRouter();
  const { simulateDisruption, resetDemo } = useTripStore();
  const [isQuickPlanOpen, setIsQuickPlanOpen] = useState(false);

  const handleSeeDashboard = () => { resetDemo(); router.push('/dashboard'); };
  const handleReplanDemo = () => { router.push('/dashboard'); setTimeout(() => simulateDisruption('rain'), 500); };

  return (
    <section className="relative overflow-hidden bg-[#060a12] min-h-[calc(100vh-72px)] flex flex-col">

      {/* Ambient blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/4 w-[800px] h-[600px] bg-gradient-radial from-sky-600/12 to-transparent rounded-full blur-[120px]" />
        <div className="absolute top-1/2 -right-32 w-[600px] h-[500px] bg-gradient-radial from-purple-700/10 to-transparent rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[400px] bg-gradient-radial from-cyan-700/8 to-transparent rounded-full blur-[100px]" />
        {/* Subtle grid */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[75vh]">

          {/* ── LEFT COLUMN ── */}
          <div className="space-y-8 animate-fade-in">

            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-cyan-500/25 bg-cyan-950/30 backdrop-blur-sm text-cyan-300 text-xs font-bold shadow-glow-sm">
              <span className="flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
              </span>
              <Sparkles className="w-3.5 h-3.5" />
              Agentic Travel Intelligence Platform
            </div>

            {/* Headline */}
            <div>
              <h1 className="text-5xl sm:text-6xl lg:text-[64px] font-black tracking-[-0.03em] text-white leading-[1.05]">
                Your journey<br />
                shouldn&apos;t be{' '}
                <span className="gradient-text">static.</span>
              </h1>
              <p className="mt-5 text-lg text-slate-400 leading-relaxed max-w-xl font-medium">
                Wayvia watches your trip, understands real-world changes, and adapts your itinerary — automatically, in real time.
              </p>
            </div>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-2">
              {[
                { icon: CloudRain, label: 'Weather Alerts', color: 'text-sky-400' },
                { icon: Plane,     label: 'Flight Changes', color: 'text-blue-400' },
                { icon: Train,     label: 'Transit Delays', color: 'text-indigo-400' },
                { icon: Shield,    label: 'Safety Alerts',  color: 'text-purple-400' },
                { icon: Coins,     label: 'Budget Tracking',color: 'text-emerald-400' },
              ].map(({ icon: Icon, label, color }) => (
                <div
                  key={label}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl bg-white/4 border border-white/8 text-xs font-semibold text-slate-300 hover:border-white/15 transition-colors"
                >
                  <Icon className={`w-3.5 h-3.5 ${color}`} />
                  {label}
                </div>
              ))}
            </div>

            {/* CTA row */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => setIsQuickPlanOpen(true)}
                className="btn-primary px-7 py-3.5 text-base"
              >
                <Sparkles className="w-4 h-4" />
                Plan My Trip
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleSeeDashboard}
                className="btn-secondary px-6 py-3.5 text-base"
              >
                <Play className="w-4 h-4 fill-current text-cyan-400" />
                See It In Action
              </button>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-4 pt-2">
              <div className="flex -space-x-2.5">
                {[
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&auto=format&fit=crop&q=80',
                  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&auto=format&fit=crop&q=80',
                  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&auto=format&fit=crop&q=80',
                  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&auto=format&fit=crop&q=80',
                ].map((src, i) => (
                  <img key={i} src={src} alt="Traveler" className="w-9 h-9 rounded-full ring-2 ring-[#060a12] object-cover" />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 text-amber-400 text-sm">{'★★★★★'}</div>
                <p className="text-xs text-slate-400 font-medium">Loved by <strong className="text-slate-200">10,000+</strong> smart travelers</p>
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN — Interactive preview card ── */}
          <div className="relative animate-fade-in delay-200">

            {/* Main card shell */}
            <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#0a1020] shadow-[0_32px_80px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.05)]">

              {/* Cinematic Seoul background */}
              <div className="absolute inset-0 z-0">
                <img
                  src="https://images.unsplash.com/photo-1538669715315-155099bfa88c?w=1200&auto=format&fit=crop&q=80"
                  alt="Seoul skyline"
                  className="w-full h-full object-cover opacity-25 scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#060a12]/90 via-[#0a1422]/70 to-[#060a12]/95" />
              </div>

              {/* Content */}
              <div className="relative z-10 p-6 space-y-4">

                {/* Trip header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🇰🇷</span>
                    <div>
                      <p className="text-xs font-bold text-white">Seoul, South Korea</p>
                      <p className="text-[10px] text-slate-400">Sep 15–21 · 7 Days</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/25">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[11px] font-bold text-emerald-300">92% On Track</span>
                  </div>
                </div>

                {/* Alert card */}
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-rose-950/40 border border-rose-500/30">
                  <div className="w-8 h-8 rounded-xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center flex-shrink-0">
                    <CloudRain className="w-4 h-4 text-rose-400 animate-bounce" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs font-bold text-white">Weather Alert — Day 3</p>
                      <span className="badge-rose text-[9px] px-2 py-0.5 flex-shrink-0">HIGH</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">Heavy rain expected · 2 outdoor activities at risk</p>
                    <button
                      onClick={handleReplanDemo}
                      className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-bold text-cyan-300 hover:text-cyan-200 transition-colors"
                    >
                      <Zap className="w-3 h-3" /> View AI Replan →
                    </button>
                  </div>
                </div>

                {/* Day 3 mini schedule */}
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">Day 3 Schedule</p>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { time: '10:00', name: 'Namsan Park', ok: false },
                      { time: '13:00', name: 'Han River Walk', ok: false },
                      { time: '16:00', name: 'National Museum ✦ AI', ok: true },
                      { time: '19:00', name: 'COEX Starfield ✦ AI', ok: true },
                    ].map((a) => (
                      <div
                        key={a.name}
                        className={`flex items-center justify-between gap-2 px-2.5 py-2 rounded-xl text-[10px] border transition-all ${
                          a.ok
                            ? 'bg-emerald-950/30 border-emerald-500/25 text-emerald-200'
                            : 'bg-rose-950/20 border-rose-500/20 text-slate-500 line-through'
                        }`}
                      >
                        <span className="font-semibold text-slate-400">{a.time}</span>
                        <span className="truncate font-bold">{a.name}</span>
                        {a.ok ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" /> : <XCircle className="w-3.5 h-3.5 text-rose-500/60 flex-shrink-0" />}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Map preview */}
                <div className="h-28 rounded-2xl overflow-hidden relative bg-[#060d1a] border border-cyan-500/15">
                  <svg className="absolute inset-0 w-full h-full opacity-15">
                    <defs>
                      <pattern id="map-grid" width="16" height="16" patternUnits="userSpaceOnUse">
                        <path d="M 16 0 L 0 0 0 16" fill="none" stroke="#38bdf8" strokeWidth="0.5" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#map-grid)" />
                    <path d="M 50 90 C 90 60, 140 80, 190 50 S 260 30, 310 60" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="6,4" opacity="0.7" />
                  </svg>
                  <div className="absolute top-3 left-4 flex items-center gap-1.5 bg-[#0a1825]/95 border border-cyan-400/40 px-2.5 py-1.5 rounded-xl shadow-glow-sm">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    <span className="text-[10px] font-bold text-white">National Museum</span>
                    <span className="text-[9px] text-emerald-400 font-bold">94%</span>
                  </div>
                  <div className="absolute bottom-3 right-4 flex items-center gap-1.5 bg-[#0a1825]/95 border border-purple-400/40 px-2.5 py-1.5 rounded-xl">
                    <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                    <span className="text-[10px] font-bold text-white">COEX Starfield</span>
                    <span className="text-[9px] text-emerald-400 font-bold">91%</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Floating phone widget */}
            <div className="absolute -bottom-6 -left-6 w-44 bg-[#0c1828]/95 backdrop-blur-xl border border-white/15 rounded-2xl p-3 shadow-[0_20px_60px_rgba(0,0,0,0.5)] animate-float hidden sm:block">
              <p className="text-[9px] font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Trip Health</p>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xl font-black text-white">92%</span>
                <span className="badge-emerald text-[8px] px-1.5 py-0.5">On Track</span>
              </div>
              <div className="progress-bar mb-1">
                <div className="progress-fill" style={{ width: '92%' }} />
              </div>
              <p className="text-[9px] text-slate-500 font-medium">6/7 days clear ✓</p>
            </div>

            {/* Floating stat top-right */}
            <div className="absolute -top-4 -right-4 bg-[#0c1828]/95 backdrop-blur-xl border border-cyan-500/25 rounded-2xl px-3.5 py-2.5 shadow-glow-sm hidden sm:flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <div>
                <p className="text-[11px] font-black text-white">AI Replanned</p>
                <p className="text-[9px] text-emerald-400 font-semibold">–18 min · +6% match</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── WORKFLOW STRIP ── */}
      <div id="how-it-works" className="relative z-10 mt-auto">
        <div className="section-divider" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { icon: Pencil,    label: 'Plan',    desc: 'Tell us your destination, dates & interests.',      color: 'bg-sky-500/15 border-sky-500/30 text-sky-400',      num: '01' },
              { icon: Radio,     label: 'Monitor', desc: 'We watch weather, flights & local conditions.',     color: 'bg-cyan-500/15 border-cyan-500/30 text-cyan-400',    num: '02' },
              { icon: Sparkles,  label: 'Adapt',   desc: 'AI finds better options when your plan shifts.',   color: 'bg-purple-500/15 border-purple-500/30 text-purple-400', num: '03' },
              { icon: Navigation,label: 'Travel',  desc: 'Enjoy a stress-free, intelligently guided trip.',  color: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400', num: '04' },
            ].map(({ icon: Icon, label, desc, color, num }, i) => (
              <div key={label} className="flex items-start gap-4 group animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center flex-shrink-0 ${color} transition-transform group-hover:scale-110 duration-300`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[9px] font-bold text-slate-600">{num}</span>
                    <h4 className="text-sm font-extrabold text-white">{label}</h4>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <QuickPlanModal isOpen={isQuickPlanOpen} onClose={() => setIsQuickPlanOpen(false)} />
    </section>
  );
};
