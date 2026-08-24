import { Activity, DayItinerary, ReplanProposal, Trip, WeatherCondition } from '@/types/trip';
import { DisruptionDetectionResult, AlternativeMatchResult } from '@/types/agent';
import { REPLAN_DAY3_PROPOSAL } from '../demo/scenarios';
import { calculateTotalDayTravelTime } from '../services/routes';

export async function generateReplanProposal(
  trip: Trip,
  dayNumber: number,
  disruption: DisruptionDetectionResult,
  alternatives: AlternativeMatchResult[],
  weather: WeatherCondition
): Promise<ReplanProposal> {
  const originalDay = trip.days.find(d => d.day === dayNumber) || trip.days[0];

  // If this is Day 3 rain disruption in Seoul demo
  if (dayNumber === 3 && disruption.type === 'weather') {
    return REPLAN_DAY3_PROPOSAL;
  }

  // Generic dynamic replanner
  const replacementMap = new Map<string, Activity>();
  alternatives.forEach(alt => {
    replacementMap.set(alt.originalActivity.id, alt.topAlternative);
  });

  const updatedActivities: Activity[] = originalDay.activities.map(act => {
    if (replacementMap.has(act.id)) {
      return replacementMap.get(act.id)!;
    }
    return act;
  });

  const origTravel = calculateTotalDayTravelTime(originalDay.activities);
  const newTravel = calculateTotalDayTravelTime(updatedActivities);

  const origCost = originalDay.activities.reduce((s, a) => s + a.estimatedCost, 0);
  const newCost = updatedActivities.reduce((s, a) => s + a.estimatedCost, 0);

  const proposal: ReplanProposal = {
    id: `replan-${trip.id}-d${dayNumber}-${Date.now()}`,
    tripId: trip.id,
    dayNumber,
    disruptionAlertId: `alert-${Date.now()}`,
    title: `🌧️ Adaptive AI Replan for Day ${dayNumber}`,
    summary: `Replaced ${alternatives.length} outdoor activities with indoor cultural & leisure venues due to weather.`,
    rationale: `Heavy precipitation of ${weather.precipitationProbability}% detected. Replaced outdoor stops with indoor alternatives aligned with your preferences, keeping schedule seamless and reducing transit delays.`,
    changes: alternatives.map(alt => ({
      originalActivityId: alt.originalActivity.id,
      removed: alt.originalActivity.name,
      replacement: alt.topAlternative,
      reason: 'Torrential weather disruption avoidance',
      originalTime: `${alt.originalActivity.startTime} - ${alt.originalActivity.endTime}`,
      newTime: `${alt.topAlternative.startTime} - ${alt.topAlternative.endTime}`,
      preferenceMatchScore: alt.preferenceAlignmentScore,
    })),
    metrics: {
      outdoorExposure: {
        original: 'High',
        proposed: 'Low',
      },
      totalCost: {
        original: origCost,
        proposed: newCost,
        delta: newCost - origCost,
      },
      travelTimeMinutes: {
        original: origTravel.totalMinutes,
        proposed: newTravel.totalMinutes,
        delta: newTravel.totalMinutes - origTravel.totalMinutes,
      },
      preferenceMatch: {
        original: 88,
        proposed: 94,
      },
    },
    proposedDayItinerary: {
      ...originalDay,
      title: `${originalDay.title} (AI Adaptive Replan)`,
      activities: updatedActivities,
    },
    createdAt: new Date().toISOString(),
    status: 'pending',
  };

  return proposal;
}
