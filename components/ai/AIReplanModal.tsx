'use client';

import React from 'react';
import { ReplanProposal } from '@/types/trip';
import {
  X,
  Sparkles,
  CloudRain,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Clock,
  IndianRupee,
  Compass,
  TrendingDown,
  TrendingUp,
  MapPin,
} from 'lucide-react';

interface AIReplanModalProps {
  isOpen: boolean;
  onClose: () => void;
  proposal: ReplanProposal | null;
  onAccept: () => void;
  onReject: () => void;
}

export const AIReplanModal: React.FC<AIReplanModalProps> = ({
  isOpen,
  onClose,
  proposal,
  onAccept,
  onReject,
}) => {
  if (!isOpen || !proposal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div
        className="w-full max-w-4xl bg-surface-elevated border border-border/70 rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto relative animate-scale-in max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-surface to-surface-subtle border-b border-border/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-brand-600 flex items-center justify-center text-white shadow-glow">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-brand-500/20 text-brand-300 border border-brand-500/30">
                  Agentic Adaptive Replanner
                </span>
                <span className="text-xs text-slate-400">Day {proposal.dayNumber} Optimized</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mt-0.5">
                AI Replan Proposal
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          
          {/* 1. WHY - Disruption Context */}
          <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/30 flex items-start gap-3">
            <CloudRain className="w-6 h-6 text-rose-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-rose-200">
                Trigger: Heavy Torrential Rain Detected (87% Probability)
              </h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                6 hours of continuous high precipitation detected. Outdoor activities at mountain elevation and open riverbanks present severe weather risks.
              </p>
            </div>
          </div>

          {/* 2. AFFECTED vs RECOMMENDED REPLACEMENTS */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Itinerary Modifications
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {proposal.changes.map((change, idx) => (
                <div key={idx} className="glass-panel p-4 rounded-2xl border border-white/10 flex flex-col justify-between">
                  
                  {/* Removed Venue */}
                  <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-500/30 mb-3">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-bold text-rose-400 flex items-center gap-1">
                        ❌ Removed Activity
                      </span>
                      <span className="text-[11px] text-slate-400">{change.originalTime}</span>
                    </div>
                    <h5 className="font-bold text-white text-sm">{change.removed}</h5>
                    <p className="text-[11px] text-rose-200/80 mt-1">{change.reason}</p>
                  </div>

                  <div className="flex items-center justify-center my-0.5">
                    <div className="p-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                      <ArrowRight className="w-4 h-4 transform rotate-90 md:rotate-0" />
                    </div>
                  </div>

                  {/* Recommended Venue */}
                  <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/30 mt-3">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-bold text-cyan-400 flex items-center gap-1">
                        ✅ Recommended Alternative
                      </span>
                      <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/20 px-1.5 py-0.5 rounded">
                        {Math.round(change.preferenceMatchScore * 100)}% Match
                      </span>
                    </div>
                    <h5 className="font-bold text-white text-sm">{change.replacement.name}</h5>
                    <p className="text-[11px] text-slate-300 mt-1">{change.replacement.description}</p>
                    <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 pt-2 border-t border-white/5">
                      <span className="flex items-center gap-1 text-cyan-300">
                        <ShieldCheck className="w-3 h-3" />
                        100% Indoor Protected
                      </span>
                      <span className="font-semibold text-emerald-400">
                        {change.replacement.estimatedCost === 0 ? 'Free Entry' : `₹${change.replacement.estimatedCost.toLocaleString()}`}
                      </span>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>

          {/* 3. METRIC COMPARISON MATRIX */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Impact Comparison Analysis
            </h3>

            <div className="overflow-hidden rounded-2xl border border-white/10 bg-surface">
              <table className="w-full text-left text-sm">
                <thead className="bg-surface-subtle/80 text-xs uppercase font-bold text-slate-400 border-b border-white/10">
                  <tr>
                    <th className="p-3.5 sm:px-5">Optimization Metric</th>
                    <th className="p-3.5 sm:px-5 text-right">Original Plan</th>
                    <th className="p-3.5 sm:px-5 text-right text-cyan-400">AI Replan</th>
                    <th className="p-3.5 sm:px-5 text-right text-emerald-400">Net Improvement</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-medium">
                  <tr>
                    <td className="p-3.5 sm:px-5 text-slate-300 flex items-center gap-2">
                      <CloudRain className="w-4 h-4 text-cyan-400" />
                      Outdoor Exposure
                    </td>
                    <td className="p-3.5 sm:px-5 text-right text-rose-400 font-semibold">
                      {proposal.metrics.outdoorExposure.original}
                    </td>
                    <td className="p-3.5 sm:px-5 text-right text-emerald-400 font-bold">
                      {proposal.metrics.outdoorExposure.proposed}
                    </td>
                    <td className="p-3.5 sm:px-5 text-right text-emerald-400 text-xs font-bold">
                      Shielded from Rain
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3.5 sm:px-5 text-slate-300 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-cyan-400" />
                      Day Transit Travel Time
                    </td>
                    <td className="p-3.5 sm:px-5 text-right text-slate-400">
                      {proposal.metrics.travelTimeMinutes.original} mins
                    </td>
                    <td className="p-3.5 sm:px-5 text-right text-cyan-300 font-bold">
                      {proposal.metrics.travelTimeMinutes.proposed} mins
                    </td>
                    <td className="p-3.5 sm:px-5 text-right text-emerald-400 text-xs font-bold flex items-center justify-end gap-1">
                      <TrendingDown className="w-3.5 h-3.5" />
                      18 mins faster (-24%)
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3.5 sm:px-5 text-slate-300 flex items-center gap-2">
                      <IndianRupee className="w-4 h-4 text-cyan-400" />
                      Day Activity Cost
                    </td>
                    <td className="p-3.5 sm:px-5 text-right text-slate-400">
                      ₹{proposal.metrics.totalCost.original.toLocaleString()}
                    </td>
                    <td className="p-3.5 sm:px-5 text-right text-slate-200 font-bold">
                      ₹{proposal.metrics.totalCost.proposed.toLocaleString()}
                    </td>
                    <td className="p-3.5 sm:px-5 text-right text-slate-300 text-xs">
                      ₹0 budget delta (Balanced)
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3.5 sm:px-5 text-slate-300 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-cyan-400" />
                      Interest & Preference Match
                    </td>
                    <td className="p-3.5 sm:px-5 text-right text-slate-400">
                      {proposal.metrics.preferenceMatch.original}%
                    </td>
                    <td className="p-3.5 sm:px-5 text-right text-emerald-400 font-extrabold">
                      {proposal.metrics.preferenceMatch.proposed}%
                    </td>
                    <td className="p-3.5 sm:px-5 text-right text-emerald-400 text-xs font-bold flex items-center justify-end gap-1">
                      <TrendingUp className="w-3.5 h-3.5" />
                      +6% Alignment Boost
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 4. AI EXPLANATION - HUMAN-IN-THE-LOOP */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-surface to-brand-950/40 border border-brand-500/30">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                Why Wayvia Recommends This
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
              &ldquo;{proposal.rationale}&rdquo;
            </p>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-5 sm:p-6 bg-surface border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-400">
            Human-in-the-loop: Itinerary is only updated upon your explicit approval.
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onReject}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
            >
              Keep Original Plan
            </button>

            <button
              onClick={onAccept}
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 shadow-glow-emerald transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Accept New Plan</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
