'use client';

import React from 'react';
import { useTripStore } from '@/lib/store/tripStore';
import { CloudRain, RefreshCw, RotateCcw, Plane, ShieldCheck, Zap } from 'lucide-react';

export const DemoControlBar: React.FC = () => {
  const { simulateDisruption, runTripCheck, resetDemo, isAnalyzing } = useTripStore();

  return (
    <div className="sticky bottom-4 z-40 max-w-5xl mx-auto px-4 w-full">
      <div className="glass-panel-elevated p-3 sm:px-6 sm:py-3.5 rounded-3xl border border-cyan-500/40 shadow-[0_0_40px_rgba(0,0,0,0.7)] flex flex-wrap items-center justify-between gap-3 backdrop-blur-2xl">
        
        {/* Left Label */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl overflow-hidden shadow-glow border border-cyan-500/40 flex-shrink-0">
            <img src="/wayvia-logo.png" alt="Wayvia" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-white tracking-tight">Wayvia Demo Controller</span>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                Live Simulator
              </span>
            </div>
            <span className="text-[11px] text-slate-400 hidden sm:inline">
              Trigger real-world events to test autonomous agent replanning
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
          
          <button
            onClick={() => simulateDisruption('rain')}
            disabled={isAnalyzing}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 rounded-2xl text-xs font-bold text-white bg-gradient-to-r from-rose-600 via-pink-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 shadow-[0_0_20px_rgba(244,63,94,0.4)] transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
          >
            <CloudRain className="w-3.5 h-3.5 animate-bounce" />
            <span>🌧️ Simulate Rain (Day 3)</span>
          </button>

          <button
            onClick={() => simulateDisruption('flight')}
            disabled={isAnalyzing}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-bold text-slate-200 hover:text-white bg-surface-subtle hover:bg-surface-elevated border border-white/10 transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
          >
            <Plane className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden md:inline">✈️ Simulate Delay</span>
          </button>

          <button
            onClick={runTripCheck}
            disabled={isAnalyzing}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-semibold text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
            title="Scan live Open-Meteo weather and recalculate trip health"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${isAnalyzing ? 'animate-spin' : ''}`} />
            <span className="hidden lg:inline">Run Trip Check</span>
          </button>

          <button
            onClick={resetDemo}
            className="p-2 rounded-2xl text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all hover:scale-105 active:scale-95"
            title="Reset to initial 7-day Seoul plan"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

        </div>

      </div>
    </div>
  );
};
