'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTripStore } from '@/lib/store/tripStore';
import { generateTripPlan } from '@/lib/ai/planner';
import { Category, TravelStyle, WeatherSensitivity } from '@/types/trip';
import {
  Compass, Sparkles, Calendar, ShieldCheck, Check,
  ArrowRight, Zap, MapPin, IndianRupee,
} from 'lucide-react';
import { WayviaLogo } from '@/components/brand/WayviaLogo';

const INTERESTS: { id: Category; label: string; icon: string }[] = [
  { id: 'culture',      label: 'Culture & Heritage',    icon: '🏛️' },
  { id: 'history',      label: 'Historic Palaces',       icon: '🏯' },
  { id: 'food',         label: 'Dining & Cafes',         icon: '🍜' },
  { id: 'shopping',     label: 'Shopping & Malls',       icon: '🛍️' },
  { id: 'kpop',         label: 'K-Pop & Entertainment',  icon: '🎤' },
  { id: 'nature',       label: 'Scenic Nature',          icon: '🌿' },
  { id: 'nightlife',    label: 'Indie Nightlife',        icon: '🌃' },
  { id: 'photography',  label: 'Photography Spots',      icon: '📸' },
  { id: 'architecture', label: 'Modern Architecture',    icon: '🏙️' },
  { id: 'relaxation',   label: 'Spas & Wellness',        icon: '♨️' },
];

const STEPS = [
  'Agent 1 — Parsing preferences & travel style...',
  'Agent 4 — Discovering top attractions & geolocations...',
  'Agent 5 — Optimizing transit routes & schedule feasibility...',
  'Agent 6 — Verifying budget allocation & category caps...',
  'Agent 2 — Finalizing adaptive itinerary with health check...',
];

export const PlanWizard: React.FC = () => {
  const router = useRouter();
  const { setTrip, resetDemo, loadPresetTrip } = useTripStore();

  const [destination, setDestination] = useState('Seoul');
  const [startDate, setStartDate] = useState('2026-09-15');
  const [endDate, setEndDate] = useState('2026-09-21');
  const [budget, setBudget] = useState(80000);
  const [travelStyle, setTravelStyle] = useState<TravelStyle>('moderate');
  const [weatherSensitivity, setWeatherSensitivity] = useState<WeatherSensitivity>('high');
  const [selectedInterests, setSelectedInterests] = useState<Category[]>(['culture', 'kpop', 'food', 'shopping', 'history', 'photography']);
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  const toggle = (id: Category) =>
    setSelectedInterests((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    for (let i = 0; i < STEPS.length; i++) {
      setLoadingStep(i);
      await new Promise((r) => setTimeout(r, 500));
    }
    const trip = await generateTripPlan({
      destination, startDate, endDate, durationDays: 7,
      preferences: { interests: selectedInterests, travelStyle, weatherSensitivity, pace: 'standard', budgetTotal: budget, currency: 'INR (₹)' },
    });
    setTrip(trip);
    setIsGenerating(false);
    router.push('/dashboard');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">

      {/* Page heading */}
      <div className="mb-8 text-center">
        <div className="badge-cyan mx-auto mb-4 w-fit">
          <Sparkles className="w-3.5 h-3.5" />
          Agentic Trip Builder
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
          Create an Adaptive Journey
        </h1>
        <p className="text-slate-400 text-sm mt-2 max-w-xl mx-auto">
          Wayvia designs resilient multi-day itineraries that replan automatically when real-world conditions change.
        </p>
      </div>

      {/* Demo presets banner */}
      <div className="glass-panel rounded-3xl border border-cyan-500/20 p-5 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-cyan-500/15 border border-cyan-500/25 flex items-center justify-center flex-shrink-0">
            <Zap className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <p className="text-sm font-bold text-white">1-Click Demo Presets</p>
            <p className="text-xs text-slate-400 mt-0.5">Pre-configured trips with real weather disruption simulations</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => { resetDemo(); router.push('/dashboard'); }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs font-bold text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 shadow-glow-sm transition-all hover:scale-105"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Seoul 7-Day (Rain Demo)
          </button>
          <button
            onClick={() => { loadPresetTrip('Tokyo'); router.push('/dashboard'); }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs font-bold text-purple-300 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 transition-all hover:scale-105"
          >
            Tokyo 6-Day Preset
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* ── FORM ── */}
        <div className="lg:col-span-8 space-y-6">
          <div className="glass-panel rounded-3xl border border-white/8 p-6 sm:p-8 shadow-glass space-y-6">

            {/* Destination + Dates */}
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">Trip Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500 block mb-1.5">Destination</label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-cyan-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      placeholder="e.g. Seoul, Tokyo"
                      className="input-field pl-9"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500 block mb-1.5">Start Date</label>
                  <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="input-field" />
                </div>
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500 block mb-1.5">End Date</label>
                  <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="input-field" />
                </div>
              </div>
            </div>

            {/* Budget */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500">Total Budget</label>
                <span className="text-lg font-black text-emerald-400">₹{budget.toLocaleString()}</span>
              </div>
              <input
                type="range" min="30000" max="250000" step="5000" value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-[10px] text-slate-600 mt-2 font-medium">
                <span>₹30,000 · Backpacker</span>
                <span>₹80,000 · Moderate</span>
                <span>₹2,50,000 · Luxury</span>
              </div>
            </div>

            {/* Interests */}
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">Trip Focus & Activities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
                {INTERESTS.map((item) => {
                  const selected = selectedInterests.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggle(item.id)}
                      className={`p-3 rounded-2xl border text-left flex flex-col gap-1.5 transition-all duration-200 ${
                        selected
                          ? 'bg-cyan-950/40 border-cyan-400/50 shadow-glow-sm scale-[1.02]'
                          : 'bg-white/3 border-white/6 hover:border-white/15 hover:bg-white/6'
                      }`}
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span className={`text-[11px] font-bold leading-tight ${selected ? 'text-cyan-200' : 'text-slate-400'}`}>
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Style + Sensitivity */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500 block mb-3">Travel Style</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['relaxed', 'moderate', 'packed'] as TravelStyle[]).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setTravelStyle(s)}
                      className={`py-2.5 rounded-2xl text-xs font-bold capitalize border transition-all ${
                        travelStyle === s
                          ? 'bg-sky-500/15 border-sky-400/50 text-sky-300 shadow-glow-sm'
                          : 'bg-white/3 border-white/6 text-slate-500 hover:text-white hover:border-white/15'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500 block mb-3">Weather Guard</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['low', 'medium', 'high'] as WeatherSensitivity[]).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setWeatherSensitivity(s)}
                      className={`py-2.5 rounded-2xl text-xs font-bold capitalize border transition-all ${
                        weatherSensitivity === s
                          ? 'bg-purple-500/15 border-purple-400/50 text-purple-300'
                          : 'bg-white/3 border-white/6 text-slate-500 hover:text-white hover:border-white/15'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <ShieldCheck className="w-4 h-4 text-cyan-500" />
                Multi-agent reasoning with real-time adaptive replanning
              </div>
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="btn-primary w-full sm:w-auto px-8 py-3.5 text-sm disabled:opacity-60"
              >
                <Sparkles className="w-4 h-4" />
                Generate My Trip
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

        {/* ── LIVE SUMMARY CARD ── */}
        <div className="lg:col-span-4 sticky top-24">
          <div className="glass-panel rounded-3xl border border-white/10 p-6 shadow-glass space-y-5">

            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-3">AI Itinerary Summary</p>
              <h3 className="text-xl font-black text-white flex items-center gap-2">
                <MapPin className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                {destination || 'Your Destination'}
              </h3>
              <p className="text-xs text-slate-500 mt-1">{startDate} → {endDate}</p>
            </div>

            <div className="space-y-2.5 text-xs border-t border-white/5 pt-4">
              {[
                { label: 'Budget', value: `₹${budget.toLocaleString()}`, color: 'text-emerald-400' },
                { label: 'Travel Style', value: travelStyle, color: 'text-sky-300' },
                { label: 'Weather Guard', value: `${weatherSensitivity} sensitivity`, color: 'text-purple-300' },
                { label: 'Focus Areas', value: `${selectedInterests.length} selected`, color: 'text-cyan-300' },
              ].map(({ label, value, color }) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium">{label}</span>
                  <span className={`font-bold capitalize ${color}`}>{value}</span>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-950/40 to-purple-950/30 border border-cyan-500/15 text-xs text-slate-300 leading-relaxed">
              <span className="text-cyan-300 font-bold">💡 Adaptive Shield:</span>{' '}
              If rain, closures, or delays occur during your stay, Wayvia finds indoor alternatives within your ₹{budget.toLocaleString()} cap.
            </div>

            {/* Trust indicators */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/5">
              {[
                { val: '6', label: 'AI Agents' },
                { val: 'Live', label: 'Weather' },
                { val: '98%', label: 'Accuracy' },
              ].map(({ val, label }) => (
                <div key={label} className="stat-chip">
                  <span className="text-sm font-black text-white">{val}</span>
                  <span className="text-[10px] text-slate-500 font-medium mt-0.5">{label}</span>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>

      {/* ── LOADING OVERLAY ── */}
      {isGenerating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-lg animate-fade-in">
          <div className="w-full max-w-md glass-panel-elevated rounded-3xl border border-cyan-500/30 p-8 shadow-[0_40px_100px_rgba(0,0,0,0.8)] animate-scale-in">
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 mx-auto flex items-center justify-center text-cyan-400 mb-4 animate-spin-slow shadow-glow">
                <Compass className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-extrabold text-white">Synthesizing Journey...</h3>
              <p className="text-xs text-cyan-300 mt-1 font-medium">{STEPS[loadingStep]}</p>
            </div>

            <div className="progress-bar mb-5">
              <div
                className="progress-fill"
                style={{ width: `${((loadingStep + 1) / STEPS.length) * 100}%` }}
              />
            </div>

            <div className="space-y-2">
              {STEPS.map((step, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-xs transition-all ${
                    idx < loadingStep
                      ? 'border-emerald-500/20 bg-emerald-950/20 text-emerald-300'
                      : idx === loadingStep
                      ? 'border-cyan-500/35 bg-cyan-950/25 text-cyan-200 font-bold shadow-glow-sm'
                      : 'border-transparent text-slate-600'
                  }`}
                >
                  {idx < loadingStep ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  ) : (
                    <span className="w-3.5 h-3.5 rounded-full border border-current flex-shrink-0 flex items-center justify-center text-[9px] font-black">
                      {idx + 1}
                    </span>
                  )}
                  <span className="truncate">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
