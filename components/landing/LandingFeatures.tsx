'use client';

import React from 'react';
import { Compass, Activity, AlertTriangle, Sparkles, Route, Wallet, ShieldCheck } from 'lucide-react';

const AGENTS = [
  {
    num: '01', title: 'Trip Planner',
    desc: 'Generates structured, geo-anchored multi-day itineraries tailored to your pace, interests, and travel style.',
    icon: Compass, from: 'from-sky-500/20', border: 'border-sky-500/30', text: 'text-sky-400',
  },
  {
    num: '02', title: 'Trip Monitor',
    desc: 'Continuously queries meteorological feeds, transit statuses, opening hours, and itinerary health metrics.',
    icon: Activity, from: 'from-emerald-500/20', border: 'border-emerald-500/30', text: 'text-emerald-400',
  },
  {
    num: '03', title: 'Disruption Detector',
    desc: 'Evaluates weather thresholds and flags exact activities exposed to heavy rain, extreme heat, or closures.',
    icon: AlertTriangle, from: 'from-rose-500/20', border: 'border-rose-500/30', text: 'text-rose-400',
  },
  {
    num: '04', title: 'Alternative Finder',
    desc: 'Matches user preferences with indoor cultural, culinary, and architectural alternatives without route backtracking.',
    icon: Sparkles, from: 'from-amber-500/20', border: 'border-amber-500/30', text: 'text-amber-400',
  },
  {
    num: '05', title: 'Adaptive Replanner',
    desc: 'Calculates transit time savings, exposure reduction, and preference alignment before presenting a clean comparison.',
    icon: Route, from: 'from-cyan-500/20', border: 'border-cyan-500/30', text: 'text-cyan-400',
  },
  {
    num: '06', title: 'Budget Guardian',
    desc: 'Monitors category caps and validates that every replanned activity stays within your total travel budget.',
    icon: Wallet, from: 'from-purple-500/20', border: 'border-purple-500/30', text: 'text-purple-400',
  },
];

export const LandingFeatures: React.FC = () => (
  <section id="features" className="py-24 relative">
    {/* Section divider top */}
    <div className="section-divider mb-24" />

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="badge-cyan mx-auto mb-4 w-fit">
          <Sparkles className="w-3.5 h-3.5" />
          Agentic Architecture
        </div>
        <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
          Travel doesn&apos;t follow a script.
        </h2>
        <p className="text-base text-slate-400 mt-4 leading-relaxed">
          Weather changes. Attractions close. Transit delays. Budgets tighten. Traditional planners create static PDFs — Wayvia creates living itineraries.
        </p>
      </div>

      {/* Agent Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
        {AGENTS.map((agent, i) => {
          const Icon = agent.icon;
          return (
            <div
              key={agent.num}
              className="glass-panel-interactive rounded-3xl p-6 group animate-fade-in"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${agent.from} border ${agent.border} flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 duration-300`}>
                  <Icon className={`w-5 h-5 ${agent.text}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[9px] font-black text-slate-600 tracking-widest">{agent.num}</span>
                    <h3 className={`text-sm font-bold ${agent.text}`}>{agent.title}</h3>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{agent.desc}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Trust banner */}
      <div className="relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-[#0a1628]/80 via-[#0d1e3a]/70 to-[#100d2a]/80 p-8 sm:p-12 text-center shadow-glow">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-64 h-64 bg-cyan-500/5 rounded-full blur-[80px]" />
          <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-purple-500/5 rounded-full blur-[60px]" />
        </div>
        <div className="relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 mx-auto flex items-center justify-center text-cyan-400 mb-5 shadow-glow">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-white mb-3">
            Human-in-the-Loop AI
          </h3>
          <p className="text-sm text-slate-400 max-w-lg mx-auto leading-relaxed">
            Wayvia never blindly alters your reservations. It analyzes disruptions, surfaces alternatives with clear explanations, and applies updates only after you click{' '}
            <strong className="text-emerald-400">Accept New Plan</strong>.
          </p>
        </div>
      </div>

    </div>
  </section>
);
