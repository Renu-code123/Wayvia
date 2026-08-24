'use client';

import React from 'react';
import { Trip } from '@/types/trip';
import { evaluateTripBudget } from '@/lib/ai/budget';
import { Wallet, IndianRupee, PieChart, ArrowUpRight } from 'lucide-react';

interface BudgetTrackerProps {
  trip: Trip;
}

export const BudgetTracker: React.FC<BudgetTrackerProps> = ({ trip }) => {
  const budget = evaluateTripBudget(trip);

  return (
    <div className="glass-panel p-5 rounded-2xl border border-border/50 shadow-glass flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Wallet className="w-5 h-5 text-emerald-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Budget Allocation</h3>
        </div>
        <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
          Remaining: ₹{budget.remainingAmount.toLocaleString()}
        </span>
      </div>

      {/* Main Budget Metrics */}
      <div className="my-3">
        <div className="flex items-baseline justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-semibold">Total Planned</span>
            <span className="text-2xl font-extrabold text-white">₹{budget.totalBudget.toLocaleString()}</span>
          </div>
          <div className="text-right">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-semibold">Current Expenditure</span>
            <span className="text-lg font-bold text-slate-200">₹{budget.spentAmount.toLocaleString()}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-surface-subtle h-2.5 rounded-full overflow-hidden my-3 border border-white/5">
          <div
            className="h-full bg-gradient-to-r from-brand-500 to-emerald-400 rounded-full transition-all duration-500"
            style={{ width: `${budget.spentPercentage}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <span>{budget.spentPercentage}% Utilized</span>
          <span>Buffer: ₹{budget.remainingAmount.toLocaleString()} safe</span>
        </div>
      </div>

      {/* Category Mini-Pills */}
      <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/5">
        {budget.categories.map((cat, i) => (
          <div key={i} className="p-2 rounded-xl bg-surface-subtle/80 border border-white/5 flex items-center justify-between">
            <span className="text-xs text-slate-300 truncate max-w-[90px]">{cat.name}</span>
            <span className="text-xs font-bold text-slate-100">₹{cat.spent.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
