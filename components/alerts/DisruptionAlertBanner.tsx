'use client';

import React from 'react';
import { DisruptionAlert } from '@/types/trip';
import { CloudRain, AlertTriangle, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

interface DisruptionAlertBannerProps {
  alert: DisruptionAlert | null;
  onReviewReplan: () => void;
}

export const DisruptionAlertBanner: React.FC<DisruptionAlertBannerProps> = ({ alert, onReviewReplan }) => {
  if (!alert) return null;

  if (alert.resolved) {
    return (
      <div className="glass-panel p-4 rounded-2xl border border-emerald-500/40 bg-emerald-950/20 shadow-glow-emerald flex items-center justify-between gap-4 animate-fade-in">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 flex-shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-white text-sm">Disruption Successfully Resolved</h4>
            <p className="text-xs text-emerald-300/90 mt-0.5">
              Itinerary adapted with indoor alternatives. Schedule and health score restored to 98%.
            </p>
          </div>
        </div>
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
          Protected
        </span>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-5 rounded-2xl border-2 border-rose-500/50 bg-gradient-to-r from-rose-950/60 via-surface-card to-surface-card shadow-glow-rose flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex items-start gap-3.5">
        <div className="w-11 h-11 rounded-xl bg-rose-500/20 border border-rose-500/50 flex items-center justify-center text-rose-400 flex-shrink-0 mt-0.5">
          <CloudRain className="w-6 h-6 animate-pulse" />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded bg-rose-500/30 text-rose-200 border border-rose-500/50">
              High Severity Disruption
            </span>
            <span className="text-xs text-rose-300/80 font-medium">Confidence 91%</span>
          </div>

          <h4 className="font-bold text-white text-base sm:text-lg mt-1">
            {alert.title}
          </h4>

          <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
            {alert.message}
          </p>

          <div className="flex flex-wrap items-center gap-2 mt-2">
            <span className="text-xs text-slate-400">Affected venues:</span>
            {alert.affectedActivityNames.map((name, i) => (
              <span key={i} className="text-xs font-semibold px-2 py-0.5 rounded bg-white/5 text-rose-300 border border-rose-500/30">
                ❌ {name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 flex-shrink-0 self-end md:self-center">
        <button
          onClick={onReviewReplan}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-500 to-brand-500 hover:from-cyan-400 hover:to-brand-400 text-white shadow-glow transition-all hover:scale-105 active:scale-95"
        >
          <Sparkles className="w-4 h-4" />
          <span>Review AI Replan</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
