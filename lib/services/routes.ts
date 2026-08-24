export interface RouteSegment {
  fromName: string;
  toName: string;
  distanceKm: number;
  durationMinutes: number;
  mode: 'transit' | 'walk' | 'metro';
}

export function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Number((R * c).toFixed(1));
}

export function estimateUrbanTransitDuration(distanceKm: number): number {
  // Average urban speed ~ 20 km/h with wait times + transfers
  if (distanceKm <= 0.8) return Math.round(distanceKm * 15); // Walking
  return Math.max(12, Math.round(distanceKm * 3.5 + 8));
}

export function calculateTotalDayTravelTime(activities: { lat: number; lng: number; name: string }[]): {
  totalMinutes: number;
  segments: RouteSegment[];
} {
  if (activities.length <= 1) return { totalMinutes: 0, segments: [] };

  const segments: RouteSegment[] = [];
  let totalMinutes = 0;

  for (let i = 0; i < activities.length - 1; i++) {
    const from = activities[i];
    const to = activities[i + 1];
    const distance = calculateDistanceKm(from.lat, from.lng, to.lat, to.lng);
    const duration = estimateUrbanTransitDuration(distance);
    totalMinutes += duration;

    segments.push({
      fromName: from.name,
      toName: to.name,
      distanceKm: distance,
      durationMinutes: duration,
      mode: distance < 1 ? 'walk' : 'metro',
    });
  }

  return { totalMinutes, segments };
}
