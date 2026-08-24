export type Category = 
  | 'culture'
  | 'history'
  | 'food'
  | 'shopping'
  | 'kpop'
  | 'nature'
  | 'nightlife'
  | 'photography'
  | 'architecture'
  | 'museum'
  | 'relaxation';

export type Priority = 'high' | 'medium' | 'low';
export type TravelStyle = 'relaxed' | 'moderate' | 'packed';
export type WeatherSensitivity = 'low' | 'medium' | 'high';

export interface Activity {
  id: string;
  name: string;
  category: Category;
  startTime: string; // "10:00"
  endTime: string;   // "12:00"
  location: string;
  lat: number;
  lng: number;
  estimatedCost: number; // in INR
  indoor: boolean;
  priority: Priority;
  description?: string;
  imageUrl?: string;
  travelTimeFromPreviousMin?: number;
  disrupted?: boolean;
  disruptionReason?: string;
}

export interface DayItinerary {
  day: number;
  date: string; // "2026-09-15"
  title: string;
  theme: string;
  activities: Activity[];
}

export interface TripPreferences {
  interests: Category[];
  travelStyle: TravelStyle;
  weatherSensitivity: WeatherSensitivity;
  pace: 'slow' | 'standard' | 'fast';
  budgetTotal: number; // in INR e.g. 80000
  currency: string;
}

export interface Trip {
  id: string;
  destination: string;
  destinationCountry: string;
  startDate: string;
  endDate: string;
  durationDays: number;
  preferences: TripPreferences;
  days: DayItinerary[];
  spentAmount: number;
  totalBudget: number;
  healthScore: number; // 0 - 100
  status: 'active' | 'planning' | 'completed';
  createdAt: string;
  updatedAt: string;
}

export interface WeatherCondition {
  temperature: number;
  precipitationProbability: number;
  precipitationMm: number;
  weatherCode: number;
  weatherDescription: string;
  windSpeed: number;
  hourlyForecast?: {
    time: string;
    temp: number;
    pop: number;
    code: number;
  }[];
}

export interface DisruptionAlert {
  id: string;
  tripId: string;
  dayNumber: number;
  type: 'weather' | 'closure' | 'transit' | 'flight';
  severity: 'low' | 'medium' | 'high';
  confidence: number;
  title: string;
  message: string;
  affectedActivityIds: string[];
  affectedActivityNames: string[];
  weatherSnapshot?: WeatherCondition;
  timestamp: string;
  resolved: boolean;
}

export interface ReplanChange {
  originalActivityId: string;
  removed: string;
  replacement: Activity;
  reason: string;
  originalTime: string;
  newTime: string;
  preferenceMatchScore: number; // e.g. 0.94
}

export interface ReplanProposal {
  id: string;
  tripId: string;
  dayNumber: number;
  disruptionAlertId: string;
  title: string;
  summary: string;
  rationale: string;
  changes: ReplanChange[];
  metrics: {
    outdoorExposure: {
      original: 'High' | 'Medium' | 'Low';
      proposed: 'High' | 'Medium' | 'Low';
    };
    totalCost: {
      original: number;
      proposed: number;
      delta: number;
    };
    travelTimeMinutes: {
      original: number;
      proposed: number;
      delta: number;
    };
    preferenceMatch: {
      original: number; // % e.g. 88
      proposed: number; // % e.g. 94
    };
  };
  proposedDayItinerary: DayItinerary;
  createdAt: string;
  status: 'pending' | 'accepted' | 'rejected';
}
