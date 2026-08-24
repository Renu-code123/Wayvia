'use client';

import React from 'react';
import { AgentStepStatus } from '@/types/agent';
import { Sparkles, CheckCircle2, Loader2 } from 'lucide-react';

interface AgentThinkingOverlayProps {
  isAnalyzing: boolean;
  steps: AgentStepStatus[];
}

export const AgentThinkingOverlay: React.FC<AgentThinkingOverlayProps> = ({ isAnalyzing, steps }) => {
  if (!isAnalyzing) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-lg bg-surface-elevated border border-cyan-500/40 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
        
        {/* Glow corner */}
        <div className="absolute -top-12 -right-12 w-36 h-36 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-white tracking-tight">
              Agentic Reasoning Engine Active
            </h3>
            <p className="text-xs text-slate-400">
              Evaluating real-world conditions & replanning itinerary...
            </p>
          </div>
        </div>

        {/* Steps List */}
        <div className="space-y-3">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-xl border transition-all flex items-center justify-between text-xs ${
                s.status === 'running'
                  ? 'bg-cyan-950/40 border-cyan-500/50 text-cyan-300 font-semibold shadow-glow'
                  : s.status === 'completed'
                  ? 'bg-surface border-white/10 text-emerald-400 font-medium'
                  : 'bg-surface/40 border-white/5 text-slate-500'
              }`}
            >
              <div className="flex items-center gap-2.5">
                {s.status === 'completed' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                ) : s.status === 'running' ? (
                  <Loader2 className="w-4 h-4 text-cyan-400 animate-spin flex-shrink-0" />
                ) : (
                  <span className="w-4 h-4 rounded-full border border-slate-600 flex-shrink-0" />
                )}
                <span>{s.label}</span>
              </div>

              <span className="text-[10px] uppercase font-bold tracking-wider">
                {s.status === 'running' && 'Active'}
                {s.status === 'completed' && 'Done'}
                {s.status === 'idle' && 'Waiting'}
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
