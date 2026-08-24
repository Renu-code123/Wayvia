'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Trip, DayItinerary, Activity, WeatherCondition, DisruptionAlert, ReplanProposal } from '@/types/trip';
import { AgentStepStatus } from '@/types/agent';
import { DEFAULT_SEMO_TRIP, REPLAN_DAY3_PROPOSAL } from '../demo/scenarios';
import { fetchLiveWeather, getFallbackWeather } from '../services/weather';
import { evaluateTripHealth } from '../ai/monitor';
import { detectDisruptions } from '../ai/disruption';
import { findIndoorAlternatives } from '../ai/alternatives';
import { generateReplanProposal } from '../ai/replanner';
import confetti from 'canvas-confetti';

interface TripStoreContextType {
  trip: Trip;
  activeDayNumber: number;
  setActiveDayNumber: (day: number) => void;
  selectedActivityId: string | null;
  setSelectedActivityId: (id: string | null) => void;
  weather: WeatherCondition;
  isWeatherLoading: boolean;
  disruptionAlert: DisruptionAlert | null;
  replanProposal: ReplanProposal | null;
  isAnalyzing: boolean;
  agentSteps: AgentStepStatus[];
  isReplanModalOpen: boolean;
  setIsReplanModalOpen: (open: boolean) => void;
  runTripCheck: () => Promise<void>;
  simulateDisruption: (type?: 'rain' | 'flight' | 'transit') => Promise<void>;
  acceptReplan: () => void;
  rejectReplan: () => void;
  resetDemo: () => void;
  setTrip: (trip: Trip) => void;
  loadPresetTrip: (destination: string) => void;
  swapActivity: (dayNumber: number, activityId: string, newActivity: Activity) => void;
}

const STORAGE_KEY = 'wayvia_active_trip_v2';

const TripStoreContext = createContext<TripStoreContextType | undefined>(undefined);

export const TripProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [trip, setTripState] = useState<Trip>(DEFAULT_SEMO_TRIP);
  const [activeDayNumber, setActiveDayNumber] = useState<number>(3); // Focus Day 3 for the demo
  const [selectedActivityId, setSelectedActivityId] = useState<string | null>(null);
  const [weather, setWeather] = useState<WeatherCondition>(getFallbackWeather());
  const [isWeatherLoading, setIsWeatherLoading] = useState<boolean>(false);
  const [disruptionAlert, setDisruptionAlert] = useState<DisruptionAlert | null>(null);
  const [replanProposal, setReplanProposal] = useState<ReplanProposal | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [isReplanModalOpen, setIsReplanModalOpen] = useState<boolean>(false);

  const initialSteps: AgentStepStatus[] = [
    { step: 'analyzing_weather', label: 'Trip Monitor: Inspecting live meteorological feeds', status: 'idle' },
    { step: 'evaluating_itinerary', label: 'Disruption Detector: Checking outdoor activity exposure', status: 'idle' },
    { step: 'searching_alternatives', label: 'Alternative Finder: Sourcing indoor cultural matches', status: 'idle' },
    { step: 'optimizing_routes', label: 'Routing Engine: Minimizing transit delays & backtracking', status: 'idle' },
    { step: 'evaluating_budget', label: 'Budget Agent: Verifying expenditure & pricing delta', status: 'idle' },
    { step: 'synthesizing_replan', label: 'Replanner: Synthesizing adaptive itinerary with explanation', status: 'idle' },
  ];

  const [agentSteps, setAgentSteps] = useState<AgentStepStatus[]>(initialSteps);

  // Initialize from LocalStorage if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setTripState(JSON.parse(saved));
      }
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, []);

  // Fetch live weather on mount (Seoul coordinates: 37.5665, 126.9780)
  useEffect(() => {
    const loadWeather = async () => {
      setIsWeatherLoading(true);
      const data = await fetchLiveWeather(37.5665, 126.9780);
      setWeather(data);
      setIsWeatherLoading(false);
    };
    loadWeather();
  }, []);

  const setTrip = (newTrip: Trip) => {
    setTripState(newTrip);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newTrip));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  };

  const runTripCheck = async () => {
    setIsAnalyzing(true);
    setIsWeatherLoading(true);
    const liveData = await fetchLiveWeather(37.5665, 126.9780);
    setWeather(liveData);
    setIsWeatherLoading(false);

    // Evaluate health
    const health = evaluateTripHealth(trip, liveData);
    const updatedTrip: Trip = {
      ...trip,
      healthScore: health.overallScore,
      updatedAt: new Date().toISOString(),
    };
    setTrip(updatedTrip);
    setIsAnalyzing(false);
  };

  const simulateDisruption = async (type: 'rain' | 'flight' | 'transit' = 'rain') => {
    setIsAnalyzing(true);
    setAgentSteps(initialSteps.map(s => ({ ...s, status: 'idle' })));

    if (type === 'flight') {
      // Step 1: Flight delay
      setAgentSteps(prev => prev.map((s, i) => i === 0 ? { ...s, label: 'Flight Monitor: Incheon Flight ICN-402 delayed by 3 hours', status: 'running' } : s));
      await new Promise(r => setTimeout(r, 450));
      setAgentSteps(prev => prev.map((s, i) => i === 0 ? { ...s, status: 'completed' } : s));

      // Step 2: Disruption Detection
      setAgentSteps(prev => prev.map((s, i) => i === 1 ? { ...s, label: 'Disruption Detector: Day 1 Arrival schedule shift', status: 'running' } : s));
      await new Promise(r => setTimeout(r, 450));
      const alert: DisruptionAlert = {
        id: `alert-flight-d1`,
        tripId: trip.id,
        dayNumber: 1,
        type: 'flight',
        severity: 'medium',
        confidence: 0.96,
        title: '✈️ Flight Delay Detected (+3 Hours)',
        message: 'Incheon arrival delayed to 13:00. Morning palace visit automatically shifted to Day 2.',
        affectedActivityIds: ['act-d1-1'],
        affectedActivityNames: ['Gyeongbokgung Palace & Changing Guard'],
        timestamp: new Date().toISOString(),
        resolved: false,
      };
      setDisruptionAlert(alert);
      setActiveDayNumber(1);
      setAgentSteps(prev => prev.map((s, i) => i === 1 ? { ...s, status: 'completed' } : s));

      // Step 3-6: Replanning
      for (let stepIdx = 2; stepIdx <= 5; stepIdx++) {
        setAgentSteps(prev => prev.map((s, i) => i === stepIdx ? { ...s, status: 'running' } : s));
        await new Promise(r => setTimeout(r, 350));
        setAgentSteps(prev => prev.map((s, i) => i === stepIdx ? { ...s, status: 'completed' } : s));
      }

      setReplanProposal({
        ...REPLAN_DAY3_PROPOSAL,
        id: 'replan-flight-d1',
        dayNumber: 1,
        title: '✈️ Flight Delay Adaptation: Shift Day 1 Schedule',
        summary: 'Pushed palace visit to afternoon with direct express airport transit.',
        rationale: 'Flight delayed by 3 hours. Replaced morning activities with airport spa relaxation and moved palace tour to optimal late afternoon lighting.',
      });

      setIsAnalyzing(false);
      setIsReplanModalOpen(true);
      return;
    }

    // Default: Rain Disruption
    setActiveDayNumber(3);
    setAgentSteps(prev => prev.map((s, i) => i === 0 ? { ...s, status: 'running' } : s));
    await new Promise(r => setTimeout(r, 450));
    const rainWeather: WeatherCondition = {
      temperature: 19,
      precipitationProbability: 87,
      precipitationMm: 24.5,
      weatherCode: 65,
      weatherDescription: 'Heavy Torrential Rain',
      windSpeed: 28,
      hourlyForecast: [
        { time: '10:00', temp: 18, pop: 85, code: 65 },
        { time: '13:00', temp: 19, pop: 90, code: 65 },
        { time: '16:00', temp: 19, pop: 87, code: 65 },
        { time: '19:00', temp: 18, pop: 40, code: 2 },
      ]
    };
    setWeather(rainWeather);
    setAgentSteps(prev => prev.map((s, i) => i === 0 ? { ...s, status: 'completed' } : s));

    // Step 2: Disruption Detection
    setAgentSteps(prev => prev.map((s, i) => i === 1 ? { ...s, status: 'running' } : s));
    await new Promise(r => setTimeout(r, 450));
    const alert: DisruptionAlert = {
      id: `alert-rain-d${activeDayNumber}`,
      tripId: trip.id,
      dayNumber: 3,
      type: 'weather',
      severity: 'high',
      confidence: 0.91,
      title: '🌧️ Heavy Rain Detected (87% Probability)',
      message: 'Torrential downpour forecast between 10:00 AM - 5:00 PM. 2 outdoor activities directly affected.',
      affectedActivityIds: ['act-d3-1', 'act-d3-3'],
      affectedActivityNames: ['Namsan Seoul Tower & Mountain Park', 'Han River Yeouido Park & Picnic'],
      weatherSnapshot: rainWeather,
      timestamp: new Date().toISOString(),
      resolved: false,
    };
    setDisruptionAlert(alert);
    setAgentSteps(prev => prev.map((s, i) => i === 1 ? { ...s, status: 'completed' } : s));

    // Step 3: Alternatives
    setAgentSteps(prev => prev.map((s, i) => i === 2 ? { ...s, status: 'running' } : s));
    await new Promise(r => setTimeout(r, 450));
    setAgentSteps(prev => prev.map((s, i) => i === 2 ? { ...s, status: 'completed' } : s));

    // Step 4: Routing Optimization
    setAgentSteps(prev => prev.map((s, i) => i === 3 ? { ...s, status: 'running' } : s));
    await new Promise(r => setTimeout(r, 400));
    setAgentSteps(prev => prev.map((s, i) => i === 3 ? { ...s, status: 'completed' } : s));

    // Step 5: Budget
    setAgentSteps(prev => prev.map((s, i) => i === 4 ? { ...s, status: 'running' } : s));
    await new Promise(r => setTimeout(r, 350));
    setAgentSteps(prev => prev.map((s, i) => i === 4 ? { ...s, status: 'completed' } : s));

    // Step 6: Synthesis
    setAgentSteps(prev => prev.map((s, i) => i === 5 ? { ...s, status: 'running' } : s));
    await new Promise(r => setTimeout(r, 400));
    setReplanProposal(REPLAN_DAY3_PROPOSAL);
    setAgentSteps(prev => prev.map((s, i) => i === 5 ? { ...s, status: 'completed' } : s));

    // Update health to warning while pending
    const impactedHealth = evaluateTripHealth(trip, rainWeather);
    setTripState(prev => ({
      ...prev,
      healthScore: impactedHealth.overallScore,
    }));

    setIsAnalyzing(false);
    setIsReplanModalOpen(true);
  };

  const acceptReplan = () => {
    if (!replanProposal) return;

    const updatedDays = trip.days.map(d => {
      if (d.day === replanProposal.dayNumber) {
        return replanProposal.proposedDayItinerary;
      }
      return d;
    });

    const updatedTrip: Trip = {
      ...trip,
      days: updatedDays,
      healthScore: 98, // Health restored & optimized!
      spentAmount: trip.spentAmount + replanProposal.metrics.totalCost.delta,
      updatedAt: new Date().toISOString(),
    };

    setTrip(updatedTrip);
    if (disruptionAlert) {
      setDisruptionAlert({ ...disruptionAlert, resolved: true });
    }
    setReplanProposal(null);
    setIsReplanModalOpen(false);

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#06b6d4', '#10b981', '#38bdf8', '#c084fc', '#fbbf24'],
      });
    } catch (e) {
      // ignore
    }
  };

  const rejectReplan = () => {
    setIsReplanModalOpen(false);
  };

  const resetDemo = () => {
    setTripState(DEFAULT_SEMO_TRIP);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_SEMO_TRIP));
    } catch (e) {
      console.warn('LocalStorage reset error:', e);
    }
    setActiveDayNumber(3);
    setSelectedActivityId(null);
    setDisruptionAlert(null);
    setReplanProposal(null);
    setIsReplanModalOpen(false);
    setWeather(getFallbackWeather());
  };

  const loadPresetTrip = (dest: string) => {
    if (dest.toLowerCase().includes('seoul')) {
      resetDemo();
      return;
    }

    // Custom preset for Tokyo
    const tokyoTrip: Trip = {
      ...DEFAULT_SEMO_TRIP,
      id: `trip-tokyo-${Date.now()}`,
      destination: 'Tokyo',
      destinationCountry: 'Japan',
      startDate: '2026-10-01',
      endDate: '2026-10-07',
      durationDays: 6,
      totalBudget: 95000,
      spentAmount: 58000,
      healthScore: 95,
      days: [
        {
          day: 1,
          date: '2026-10-01',
          title: 'Neon Shibuya & Harajuku Culture',
          theme: 'Modern Pop Culture & Fashion',
          activities: [
            {
              id: 'act-tyo-1',
              name: 'Shibuya Crossing & Hachiko Statue',
              category: 'culture',
              startTime: '10:00',
              endTime: '12:00',
              location: 'Shibuya City, Tokyo',
              lat: 35.6595,
              lng: 139.7004,
              estimatedCost: 0,
              indoor: false,
              priority: 'high',
              description: 'World-famous scramble crossing with neon billboards and vibrant street energy.',
              imageUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&auto=format&fit=crop&q=80',
            },
            {
              id: 'act-tyo-2',
              name: 'Meiji Jingu Shinto Shrine',
              category: 'history',
              startTime: '13:00',
              endTime: '15:30',
              location: '1-1 Yoyogikamizonocho, Shibuya City, Tokyo',
              lat: 35.6764,
              lng: 139.6993,
              estimatedCost: 0,
              indoor: false,
              priority: 'high',
              description: 'Tranquil forested shrine dedicated to Emperor Meiji and Empress Shoken.',
              imageUrl: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&auto=format&fit=crop&q=80',
            },
            {
              id: 'act-tyo-3',
              name: 'teamLab Planets Digital Art Museum',
              category: 'museum',
              startTime: '16:30',
              endTime: '19:30',
              location: '6 Chome-1-16 Toyosu, Koto City, Tokyo',
              lat: 35.6491,
              lng: 139.7898,
              estimatedCost: 2800,
              indoor: true,
              priority: 'high',
              description: 'Immersive body-interactive digital art museum walking through water and crystalline light rooms.',
              imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&auto=format&fit=crop&q=80',
            }
          ]
        },
        {
          day: 2,
          date: '2026-10-02',
          title: 'Historic Asakusa & Akihabara Tech',
          theme: 'Edo Heritage & High-Tech Electronics',
          activities: [
            {
              id: 'act-tyo-4',
              name: 'Senso-ji Temple & Nakamise Street',
              category: 'history',
              startTime: '09:30',
              endTime: '12:30',
              location: '2 Chome-3-1 Asakusa, Taito City, Tokyo',
              lat: 35.7148,
              lng: 139.7967,
              estimatedCost: 500,
              indoor: false,
              priority: 'high',
              description: 'Tokyo’s oldest Buddhist temple with towering Kaminarimon gate and snack stalls.',
              imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&auto=format&fit=crop&q=80',
            },
            {
              id: 'act-tyo-5',
              name: 'Akihabara Electric Town & Retro Arcades',
              category: 'shopping',
              startTime: '14:00',
              endTime: '18:00',
              location: 'Sotokanda, Chiyoda City, Tokyo',
              lat: 35.6984,
              lng: 139.7731,
              estimatedCost: 2200,
              indoor: true,
              priority: 'high',
              description: 'World capital of anime, gaming, multi-floor gadget malls, and VR arcades.',
              imageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop&q=80',
            }
          ]
        }
      ]
    };

    setTrip(tokyoTrip);
    setActiveDayNumber(1);
  };

  const swapActivity = (dayNumber: number, activityId: string, newActivity: Activity) => {
    const updatedDays = trip.days.map(d => {
      if (d.day === dayNumber) {
        return {
          ...d,
          activities: d.activities.map(a => a.id === activityId ? newActivity : a)
        };
      }
      return d;
    });

    const updatedTrip = { ...trip, days: updatedDays };
    setTrip(updatedTrip);
  };

  return (
    <TripStoreContext.Provider
      value={{
        trip,
        activeDayNumber,
        setActiveDayNumber,
        selectedActivityId,
        setSelectedActivityId,
        weather,
        isWeatherLoading,
        disruptionAlert,
        replanProposal,
        isAnalyzing,
        agentSteps,
        isReplanModalOpen,
        setIsReplanModalOpen,
        runTripCheck,
        simulateDisruption,
        acceptReplan,
        rejectReplan,
        resetDemo,
        setTrip,
        loadPresetTrip,
        swapActivity,
      }}
    >
      {children}
    </TripStoreContext.Provider>
  );
};

export const useTripStore = (): TripStoreContextType => {
  const context = useContext(TripStoreContext);
  if (!context) {
    throw new Error('useTripStore must be used within a TripProvider');
  }
  return context;
};
