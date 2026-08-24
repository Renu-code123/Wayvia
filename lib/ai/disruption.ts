import { Activity, DayItinerary, DisruptionAlert, Trip, WeatherCondition } from '@/types/trip';
import { DisruptionDetectionResult } from '@/types/agent';
import { callGeminiStructured } from './gemini';

export async function detectDisruptions(
  trip: Trip,
  dayNumber: number,
  weather: WeatherCondition,
  simulatedRain: boolean = false
): Promise<DisruptionDetectionResult> {
  const day = trip.days.find(d => d.day === dayNumber) || trip.days[0];
  const outdoorActivities = day.activities.filter(a => !a.indoor);

  const isRainDisruption = simulatedRain || weather.precipitationProbability >= 70;

  if (isRainDisruption && outdoorActivities.length > 0) {
    const affected = outdoorActivities;
    return {
      disruptionDetected: true,
      type: 'weather',
      severity: 'high',
      confidence: 0.91,
      affectedActivities: affected,
      reason: `Heavy rainfall forecast (${weather.precipitationProbability}% precipitation probability) directly disrupts ${affected.length} outdoor activities: ${affected.map(a => a.name).join(', ')}.`,
      weatherSnapshot: weather,
    };
  }

  // Low or normal weather condition
  return {
    disruptionDetected: false,
    type: 'weather',
    severity: 'low',
    confidence: 0.95,
    affectedActivities: [],
    reason: 'Favorable conditions. No schedule interference detected.',
    weatherSnapshot: weather,
  };
}
