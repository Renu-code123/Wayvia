'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTripStore } from '@/lib/store/tripStore';
import { generateTripPlan } from '@/lib/ai/planner';
import { X, Sparkles, MapPin, IndianRupee, ArrowRight, Zap } from 'lucide-react';

interface QuickPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickPlanModal: React.FC<QuickPlanModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const { setTrip, resetDemo } = useTripStore();
  const [destination, setDestination] = useState('Seoul');
  const [budget, setBudget] = useState(80000);
  const [duration, setDuration] = useState(7);
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    if (destination.toLowerCase().includes('seoul')) {
      resetDemo();
      setIsGenerating(false);
      onClose();
      router.push('/dashboard');
      return;
    }

    const trip = await generateTripPlan({
      destination,
      startDate: '2026-09-15',
      endDate: '2026-09-21',
      durationDays: duration,
      preferences: {
        interests: ['culture', 'food', 'shopping', 'history'],
        travelStyle: 'moderate',
        weatherSensitivity: 'high',
        pace: 'standard',
        budgetTotal: budget,
        currency: 'INR (₹)',
      },
    });

    setTrip(trip);
    setIsGenerating(false);
    onClose();
    router.push('/dashboard');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Card */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0c1525]/98 shadow-[0_40px_120px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.05)] backdrop-blur-2xl">

          {/* Ambient top glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-cyan-500/8 rounded-full blur-[60px] pointer-events-none" />

          <div className="relative p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-sky-500/30 to-purple-600/30 border border-cyan-500/30 flex items-center justify-center shadow-glow-sm">
                  <Sparkles className="w-5 h-5 text-cyan-300" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-white">Plan My Journey</h3>
                  <p className="text-[11px] text-slate-500">Wayvia Agentic Trip Engine</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-xl text-slate-500 hover:text-white hover:bg-white/8 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleGenerate} className="space-y-4">
              {/* Destination */}
              <div>
                <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500 block mb-1.5">
                  Destination
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-cyan-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="Seoul, Tokyo, Paris, Singapore..."
                    className="input-field pl-10"
                  />
                </div>
              </div>

              {/* Duration + Budget */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500 block mb-1.5">
                    Duration
                  </label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    className="input-field"
                    style={{ background: 'rgba(15, 26, 45, 0.8)' }}
                  >
                    <option value={3}>3 Days</option>
                    <option value={5}>5 Days</option>
                    <option value={7}>7 Days ⭐</option>
                    <option value={10}>10 Days</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500 block mb-1.5">
                    Budget (INR)
                  </label>
                  <div className="relative">
                    <span className="text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold pointer-events-none">₹</span>
                    <input
                      type="number"
                      step="5000"
                      value={budget}
                      onChange={(e) => setBudget(Number(e.target.value))}
                      className="input-field pl-8"
                    />
                  </div>
                </div>
              </div>

              {/* Demo preset */}
              <button
                type="button"
                onClick={() => { setDestination('Seoul'); setDuration(7); setBudget(80000); }}
                className="w-full flex items-center justify-between px-4 py-3 rounded-2xl border border-cyan-500/20 bg-cyan-950/20 hover:bg-cyan-950/35 hover:border-cyan-500/35 transition-all group"
              >
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-bold text-cyan-300">Seoul 7-Day Rain Demo</span>
                </div>
                <span className="text-[10px] font-bold text-cyan-500 group-hover:text-cyan-300 transition-colors">Fill Preset →</span>
              </button>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="btn-secondary flex-1 py-3 text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isGenerating}
                  className="btn-primary flex-1 py-3 text-sm disabled:opacity-60"
                >
                  {isGenerating ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Building...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Launch Trip
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
