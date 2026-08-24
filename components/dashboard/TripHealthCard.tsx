'use client';

import React from 'react';
import { Activity, ShieldCheck, CheckCircle2, AlertCircle, TrendingUp } from 'lucide-react';

interface TripHealthCardProps {
  score: number;
  weatherStatus: 'optimal' | 'warning' | 'critical';
  scheduleStatus: 'optimal' | 'tight' | 'conflicted';
  budgetStatus: 'healthy' | 'moderate' | 'exceeded';
  transportStatus: 'smooth' | 'moderate_delay' | 'disrupted';
}

export const TripHealthCard: React.FC<TripHealthCardProps> = ({
  score,
  weatherStatus,
  scheduleStatus,
  budgetStatus,
  transportStatus,
}) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'optimal':
      case 'healthy':
      case 'smooth':
        return <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400">🟢 Nominal</span>;
      case 'warning':
      case 'tight':
      case 'moderate':
      case 'moderate_delay':
        return <span className="flex items-center gap-1 text-[11px] font-bold text-amber-400">🟡 Advisory</span>;
      case 'critical':
      case 'conflicted':
      case 'exceeded':
      case 'disrupted':
        return <span className="flex items-center gap-1 text-[11px] font-bold text-rose-400">🔴 Action Req</span>;
      default:
        return null;
    }
  };

  return (
    <div className="glass-panel p-5 rounded-2xl border border-border/50 shadow-glass flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-cyan-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Trip Health Index</h3>
        </div>
        <span className="text-[11px] font-semibold text-slate-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
          Live Vector
        </span>
      </div>

      {/* Main Score Gauge */}
      <div className="my-4 flex items-center justify-between gap-4">
        <div>
          <div className="text-4xl font-extrabold tracking-tight text-white flex items-baseline gap-1">
            <span className={score >= 90 ? 'gradient-text-cyan' : 'text-amber-400'}>{score}%</span>
            <span className="text-xs font-medium text-slate-400">/ 100</span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            {score >= 90
              ? 'Autonomous agent safeguard active & balanced'
              : 'Disruption detected. Replan review recommended'}
          </p>
        </div>

        {/* Circular Ring Graphic */}
        <div className="relative w-14 h-14 flex items-center justify-center flex-shrink-0">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-white/10"
              strokeWidth="3.5"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className={score >= 90 ? 'text-cyan-400 transition-all duration-500' : 'text-amber-400 transition-all duration-500'}
              strokeDasharray={`${score}, 100`}
              strokeWidth="3.5"
              strokeLinecap="round"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <TrendingUp className="w-5 h-5 text-cyan-400 absolute" />
        </div>
      </div>

      {/* Sub-vector Matrix */}
      <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/5">
        <div className="p-2 rounded-xl bg-surface-subtle/70 border border-white/5 flex items-center justify-between">
          <span className="text-xs text-slate-300 font-medium">Weather</span>
          {getStatusBadge(weatherStatus)}
        </div>
        <div className="p-2 rounded-xl bg-surface-subtle/70 border border-white/5 flex items-center justify-between">
          <span className="text-xs text-slate-300 font-medium">Schedule</span>
          {getStatusBadge(scheduleStatus)}
        </div>
        <div className="p-2 rounded-xl bg-surface-subtle/70 border border-white/5 flex items-center justify-between">
          <span className="text-xs text-slate-300 font-medium">Budget</span>
          {getStatusBadge(budgetStatus)}
        </div>
        <div className="p-2 rounded-xl bg-surface-subtle/70 border border-white/5 flex items-center justify-between">
          <span className="text-xs text-slate-300 font-medium">Transit</span>
          {getStatusBadge(transportStatus)}
        </div>
      </div>
    </div>
  );
};
