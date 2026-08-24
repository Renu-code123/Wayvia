import { Trip } from '@/types/trip';

export interface BudgetBreakdown {
  totalBudget: number;
  spentAmount: number;
  remainingAmount: number;
  spentPercentage: number;
  status: 'safe' | 'warning' | 'danger';
  categories: {
    name: string;
    allocated: number;
    spent: number;
    color: string;
  }[];
}

export function evaluateTripBudget(trip: Trip): BudgetBreakdown {
  const total = trip.totalBudget || 80000;
  const spent = trip.spentAmount || 52400;
  const remaining = Math.max(0, total - spent);
  const spentPercentage = Math.min(100, Math.round((spent / total) * 100));

  let status: BudgetBreakdown['status'] = 'safe';
  if (spentPercentage > 85) status = 'danger';
  else if (spentPercentage > 65) status = 'warning';

  return {
    totalBudget: total,
    spentAmount: spent,
    remainingAmount: remaining,
    spentPercentage,
    status,
    categories: [
      { name: 'Experiences & Entry', allocated: 22000, spent: 15400, color: '#06b6d4' },
      { name: 'Dining & Cafes', allocated: 25000, spent: 18200, color: '#10b981' },
      { name: 'Transit & Metro', allocated: 13000, spent: 8800, color: '#38bdf8' },
      { name: 'Shopping & K-Pop', allocated: 20000, spent: 10000, color: '#a855f7' },
    ],
  };
}
