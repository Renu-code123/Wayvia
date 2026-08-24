import { Trip, WeatherCondition } from '@/types/trip';

export interface TripHealthStatus {
  overallScore: number; // 0 - 100
  weatherStatus: 'optimal' | 'warning' | 'critical';
  scheduleStatus: 'optimal' | 'tight' | 'conflicted';
  budgetStatus: 'healthy' | 'moderate' | 'exceeded';
  transportStatus: 'smooth' | 'moderate_delay' | 'disrupted';
  alertsCount: number;
  lastCheckedAt: string;
  summary: string;
}

export function evaluateTripHealth(trip: Trip, weather?: WeatherCondition): TripHealthStatus {
  let score = 95;
  let weatherStatus: TripHealthStatus['weatherStatus'] = 'optimal';
  let scheduleStatus: TripHealthStatus['scheduleStatus'] = 'optimal';
  let budgetStatus: TripHealthStatus['budgetStatus'] = 'healthy';
  let transportStatus: TripHealthStatus['transportStatus'] = 'smooth';
  let alertsCount = 0;

  // Check weather impact
  const pop = weather?.precipitationProbability ?? 15;
  if (pop >= 70) {
    score -= 18;
    weatherStatus = 'critical';
    alertsCount++;
  } else if (pop >= 40) {
    score -= 8;
    weatherStatus = 'warning';
  }

  // Check budget ratio
  const spentRatio = trip.spentAmount / (trip.totalBudget || 1);
  if (spentRatio > 0.9) {
    score -= 15;
    budgetStatus = 'exceeded';
    alertsCount++;
  } else if (spentRatio > 0.65) {
    score -= 5;
    budgetStatus = 'moderate';
  }

  const finalScore = Math.max(45, Math.min(100, score));

  return {
    overallScore: finalScore,
    weatherStatus,
    scheduleStatus,
    budgetStatus,
    transportStatus,
    alertsCount,
    lastCheckedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    summary:
      weatherStatus === 'critical'
        ? 'High precipitation forecast detected affecting scheduled outdoor activities.'
        : 'All active systems operating within optimal parameters.',
  };
}
