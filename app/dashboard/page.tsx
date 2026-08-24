'use client';

import React from 'react';
import { useTripStore } from '@/lib/store/tripStore';
import { TripHealthCard } from '@/components/dashboard/TripHealthCard';
import { WeatherCard } from '@/components/dashboard/WeatherCard';
import { BudgetTracker } from '@/components/dashboard/BudgetTracker';
import { ItineraryTimeline } from '@/components/itinerary/ItineraryTimeline';
import { TripMap } from '@/components/map/TripMap';
import { DisruptionAlertBanner } from '@/components/alerts/DisruptionAlertBanner';
import { AIReplanModal } from '@/components/ai/AIReplanModal';
import { AgentThinkingOverlay } from '@/components/ai/AgentThinkingOverlay';
import { DemoControlBar } from '@/components/demo/DemoControlBar';
import { evaluateTripHealth } from '@/lib/ai/monitor';
import { Calendar, MapPin, Sparkles, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const {
    trip, activeDayNumber, setActiveDayNumber,
    weather, isWeatherLoading, disruptionAlert,
    replanProposal, isAnalyzing, agentSteps,
    isReplanModalOpen, setIsReplanModalOpen,
    runTripCheck, acceptReplan, rejectReplan,
  } = useTripStore();

  const healthStatus = evaluateTripHealth(trip, weather);
  const activeDay = trip.days.find((d) => d.day === activeDayNumber) || trip.days[0];
  const disruptedIds =
    disruptionAlert && !disruptionAlert.resolved && disruptionAlert.dayNumber === activeDayNumber
      ? disruptionAlert.affectedActivityIds : [];

  return (
    <div className="flex-1 pb-32 pt-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">

      {/* ── TOP HEADER ── */}
      <div className="glass-panel rounded-3xl border border-white/8 shadow-glass mb-6 p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <div className="badge-cyan">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Active Monitor
            </div>
            <span className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
              <Calendar className="w-3.5 h-3.5" />
              {trip.startDate} — {trip.endDate} · {trip.durationDays} Days
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
            <MapPin className="w-6 h-6 text-cyan-400 flex-shrink-0" />
            {trip.destination}, {trip.destinationCountry}
          </h1>
          <p className="text-xs text-slate-500 mt-1.5">
            Focus:{' '}
            <span className="text-slate-300 font-semibold">
              {trip.preferences.interests.slice(0, 4).join(' · ')}
            </span>
            {' '}· Style:{' '}
            <span className="text-slate-300 font-semibold capitalize">{trip.preferences.travelStyle}</span>
          </p>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={runTripCheck}
            disabled={isAnalyzing}
            className="btn-secondary px-4 py-2.5 text-xs"
          >
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            Run Trip Check
          </button>
          <Link
            href="/plan"
            className="btn-primary px-4 py-2.5 text-xs"
          >
            <Sparkles className="w-4 h-4" />
            Plan New Trip
          </Link>
        </div>
      </div>

      {/* ── DISRUPTION ALERT ── */}
      {disruptionAlert && !disruptionAlert.resolved && (
        <div className="mb-6">
          <DisruptionAlertBanner
            alert={disruptionAlert}
            onReviewReplan={() => setIsReplanModalOpen(true)}
          />
        </div>
      )}

      {/* ── 3-WIDGET ROW ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        <TripHealthCard
          score={trip.healthScore}
          weatherStatus={healthStatus.weatherStatus}
          scheduleStatus={healthStatus.scheduleStatus}
          budgetStatus={healthStatus.budgetStatus}
          transportStatus={healthStatus.transportStatus}
        />
        <WeatherCard
          weather={weather}
          isLoading={isWeatherLoading}
          onRefresh={runTripCheck}
          isSimulatedRain={Boolean(disruptionAlert && !disruptionAlert.resolved)}
        />
        <BudgetTracker trip={trip} />
      </div>

      {/* ── TIMELINE + MAP ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        {/* Itinerary */}
        <div className="lg:col-span-7">
          <ItineraryTimeline
            days={trip.days}
            activeDayNumber={activeDayNumber}
            onSelectDay={setActiveDayNumber}
            disruptedActivityIds={disruptedIds}
          />
        </div>

        {/* Map + Route Summary */}
        <div className="lg:col-span-5 sticky top-20 space-y-4">
          <TripMap activities={activeDay.activities} activeDayNumber={activeDayNumber} />

          {/* Route summary */}
          <div className="glass-panel rounded-2xl border border-white/8 p-4">
            <div className="flex items-center justify-between text-xs mb-3">
              <span className="font-bold text-slate-300">Day Route Summary</span>
              <span className="badge-cyan text-[10px] py-0.5">{activeDay.activities.length} Waypoints</span>
            </div>
            <div className="space-y-2">
              {activeDay.activities.map((a, i) => (
                <div key={a.id} className="flex items-center justify-between text-[11px] py-1.5 border-b border-white/4 last:border-0">
                  <span className="text-slate-400 truncate max-w-[200px]">
                    <strong className="text-white font-bold mr-2">#{i + 1}</strong>
                    {a.name}
                  </span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-lg ${a.indoor ? 'bg-cyan-950/60 text-cyan-400' : 'bg-emerald-950/60 text-emerald-400'}`}>
                    {a.indoor ? 'Indoor' : 'Outdoor'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Demo bar, modals */}
      <DemoControlBar />
      <AIReplanModal
        isOpen={isReplanModalOpen}
        onClose={() => setIsReplanModalOpen(false)}
        proposal={replanProposal}
        onAccept={acceptReplan}
        onReject={rejectReplan}
      />
      <AgentThinkingOverlay isAnalyzing={isAnalyzing} steps={agentSteps} />
    </div>
  );
}
