import { Activity, Category, DayItinerary, Trip, TripPreferences } from '@/types/trip';
import { callGeminiStructured } from './gemini';
import { DEFAULT_SEMO_TRIP } from '../demo/scenarios';

export interface PlanTripParams {
  destination: string;
  startDate: string;
  endDate: string;
  durationDays: number;
  preferences: TripPreferences;
}

// City coordinates database for instant accurate map centering
export const CITY_COORDINATES: Record<string, { lat: number; lng: number; country: string }> = {
  seoul: { lat: 37.5665, lng: 126.9780, country: 'South Korea' },
  tokyo: { lat: 35.6762, lng: 139.6503, country: 'Japan' },
  kyoto: { lat: 35.0116, lng: 135.7681, country: 'Japan' },
  paris: { lat: 48.8566, lng: 2.3522, country: 'France' },
  singapore: { lat: 1.3521, lng: 103.8198, country: 'Singapore' },
  dubai: { lat: 25.2048, lng: 55.2708, country: 'United Arab Emirates' },
  london: { lat: 51.5074, lng: -0.1278, country: 'United Kingdom' },
  'new york': { lat: 40.7128, lng: -74.0060, country: 'United States' },
  bangkok: { lat: 13.7563, lng: 100.5018, country: 'Thailand' },
  rome: { lat: 41.9028, lng: 12.4964, country: 'Italy' },
  bali: { lat: -8.4095, lng: 115.1889, country: 'Indonesia' },
  barcelona: { lat: 41.3879, lng: 2.1699, country: 'Spain' },
};

export async function generateTripPlan(params: PlanTripParams): Promise<Trip> {
  const { destination, startDate, endDate, durationDays = 7, preferences } = params;
  const cityKey = destination.toLowerCase().trim();

  // If Seoul, return the verified Seoul demo trip
  if (cityKey.includes('seoul')) {
    return {
      ...DEFAULT_SEMO_TRIP,
      id: `trip-seoul-${Date.now()}`,
      startDate,
      endDate,
      durationDays: Math.min(durationDays, DEFAULT_SEMO_TRIP.days.length),
      preferences,
      totalBudget: preferences.budgetTotal,
      spentAmount: Math.round(preferences.budgetTotal * 0.65),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }

  // Get base coordinates
  const cityMeta = CITY_COORDINATES[cityKey] || {
    lat: 37.5665,
    lng: 126.9780,
    country: 'International',
  };

  // Generate dynamic customized days matching the city
  const generatedDays: DayItinerary[] = [];
  const interests: Category[] = preferences.interests && preferences.interests.length > 0
    ? preferences.interests
    : (['culture', 'food', 'shopping'] as Category[]);

  for (let d = 1; d <= durationDays; d++) {
    const dayDate = new Date(startDate || '2026-09-15');
    dayDate.setDate(dayDate.getDate() + (d - 1));
    const dateStr = dayDate.toISOString().split('T')[0];

    const category1: Category = interests[(d - 1) % interests.length] || 'culture';
    const category2: Category = 'food';
    const category3: Category = interests[d % interests.length] || 'shopping';

    const activities: Activity[] = [
      {
        id: `act-gen-d${d}-1`,
        name: `${destination} Iconic ${category1.charAt(0).toUpperCase() + category1.slice(1)} Discovery`,
        category: category1,
        startTime: '10:00',
        endTime: '12:30',
        location: `Central ${destination}, ${cityMeta.country}`,
        lat: cityMeta.lat + (Math.random() - 0.5) * 0.04,
        lng: cityMeta.lng + (Math.random() - 0.5) * 0.04,
        estimatedCost: Math.round(preferences.budgetTotal * 0.02),
        indoor: category1 === 'museum' || category1 === 'shopping' || category1 === 'relaxation',
        priority: 'high',
        description: `Explore renowned ${category1} highlights in ${destination} tailored to your ${preferences.travelStyle} travel style.`,
        imageUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&auto=format&fit=crop&q=80',
        travelTimeFromPreviousMin: 0,
      },
      {
        id: `act-gen-d${d}-2`,
        name: `Authentic Gourmet ${destination} Lunch`,
        category: category2,
        startTime: '13:00',
        endTime: '14:30',
        location: `Old Town District, ${destination}`,
        lat: cityMeta.lat + (Math.random() - 0.5) * 0.04,
        lng: cityMeta.lng + (Math.random() - 0.5) * 0.04,
        estimatedCost: Math.round(preferences.budgetTotal * 0.03),
        indoor: true,
        priority: 'high',
        description: `Indulge in seasonal culinary specialties and chef recommendations.`,
        imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80',
        travelTimeFromPreviousMin: 14,
      },
      {
        id: `act-gen-d${d}-3`,
        name: `${destination} Landmark ${category3.charAt(0).toUpperCase() + category3.slice(1)} Tour`,
        category: category3,
        startTime: '15:30',
        endTime: '18:00',
        location: `Scenic Promenade, ${destination}`,
        lat: cityMeta.lat + (Math.random() - 0.5) * 0.04,
        lng: cityMeta.lng + (Math.random() - 0.5) * 0.04,
        estimatedCost: Math.round(preferences.budgetTotal * 0.025),
        indoor: category3 === 'museum' || category3 === 'shopping' || category3 === 'relaxation',
        priority: 'medium',
        description: `Afternoon immersion experiencing panoramic architectural vistas and local culture.`,
        imageUrl: 'https://images.unsplash.com/photo-1546874177-9e664107314e?w=800&auto=format&fit=crop&q=80',
        travelTimeFromPreviousMin: 18,
      },
    ];

    generatedDays.push({
      day: d,
      date: dateStr,
      title: `Day ${d}: ${destination} ${category1.charAt(0).toUpperCase() + category1.slice(1)} & Culinary Highlights`,
      theme: `${category1} • Local Flavors • ${category3}`,
      activities,
    });
  }

  const newTrip: Trip = {
    id: `trip-${destination.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
    destination,
    destinationCountry: cityMeta.country,
    startDate,
    endDate,
    durationDays,
    totalBudget: preferences.budgetTotal,
    spentAmount: Math.round(preferences.budgetTotal * 0.62),
    healthScore: 96,
    status: 'active',
    preferences,
    days: generatedDays,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return newTrip;
}
