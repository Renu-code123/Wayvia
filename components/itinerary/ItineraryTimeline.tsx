'use client';

import React from 'react';
import { Activity, DayItinerary } from '@/types/trip';
import { Clock, MapPin, IndianRupee, Compass, AlertTriangle, Sparkles, Navigation, CheckCircle2, RefreshCw } from 'lucide-react';
import { useTripStore } from '@/lib/store/tripStore';

interface ItineraryTimelineProps {
  days: DayItinerary[];
  activeDayNumber: number;
  onSelectDay: (day: number) => void;
  disruptedActivityIds?: string[];
}

export const ItineraryTimeline: React.FC<ItineraryTimelineProps> = ({
  days,
  activeDayNumber,
  onSelectDay,
  disruptedActivityIds = [],
}) => {
  const { selectedActivityId, setSelectedActivityId, simulateDisruption } = useTripStore();
  const currentDay = days.find(d => d.day === activeDayNumber) || days[0];

  return (
    <div className="flex flex-col gap-6">
      
      {/* Day Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {days.map((d) => {
          const isActive = d.day === activeDayNumber;
          const hasDisruption = d.activities.some(a => disruptedActivityIds.includes(a.id));

          return (
            <button
              key={d.day}
              onClick={() => onSelectDay(d.day)}
              className={`flex-shrink-0 px-4 py-2.5 rounded-2xl text-left transition-all relative border ${
                isActive
                  ? 'bg-gradient-to-r from-sky-600/30 via-cyan-500/20 to-purple-600/20 border-cyan-400 text-white shadow-[0_0_20px_rgba(6,182,212,0.3)]'
                  : 'glass-panel hover:border-white/20 text-slate-400 hover:text-white'
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-black uppercase tracking-wider">Day {d.day}</span>
                {hasDisruption && (
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                )}
              </div>
              <p className="text-[11px] text-slate-300 font-medium truncate max-w-[130px] mt-0.5">
                {d.title.split(':')[0]}
              </p>
            </button>
          );
        })}
      </div>

      {/* Active Day Header */}
      <div className="glass-panel p-5 rounded-3xl border border-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-glass">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-extrabold tracking-widest text-cyan-400 bg-cyan-950/70 border border-cyan-800/50 px-3 py-0.5 rounded-full">
              Day {currentDay.day} Itinerary
            </span>
            <span className="text-xs text-slate-400 font-medium">{currentDay.date}</span>
          </div>
          <h3 className="text-lg sm:text-xl font-extrabold text-white mt-1.5 tracking-tight">
            {currentDay.title}
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Focus: <span className="text-slate-200 font-medium">{currentDay.theme}</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-2 rounded-2xl bg-surface-subtle border border-white/10 text-right">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-bold">Day Planned Spend</span>
            <span className="text-sm font-extrabold text-emerald-400">
              ₹{currentDay.activities.reduce((s, a) => s + a.estimatedCost, 0).toLocaleString()}
            </span>
          </div>
          <div className="px-3.5 py-2 rounded-2xl bg-surface-subtle border border-white/10 text-right">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-bold">Stops</span>
            <span className="text-sm font-extrabold text-white">{currentDay.activities.length} venues</span>
          </div>
        </div>
      </div>

      {/* Vertical Timeline Activity List */}
      <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 before:top-4 before:bottom-4 before:w-[2px] before:bg-gradient-to-b before:from-cyan-500 before:via-sky-500/50 before:to-purple-500/20">
        {currentDay.activities.map((activity, index) => {
          const isDisrupted = disruptedActivityIds.includes(activity.id);
          const isSelected = activity.id === selectedActivityId;

          return (
            <div
              key={activity.id}
              className="relative group cursor-pointer"
              onClick={() => setSelectedActivityId(activity.id)}
            >
              
              {/* Timeline Marker Node */}
              <div
                className={`absolute -left-6 sm:-left-8 top-4 w-6 h-6 rounded-full border-2 flex items-center justify-center text-[11px] font-extrabold transition-all duration-300 ${
                  isSelected
                    ? 'scale-125 bg-cyan-400 text-slate-900 border-white shadow-[0_0_15px_#38bdf8]'
                    : isDisrupted
                    ? 'bg-rose-950 border-rose-500 text-rose-300 shadow-glow-rose'
                    : activity.indoor
                    ? 'bg-surface-elevated border-cyan-400 text-cyan-300 shadow-glow'
                    : 'bg-surface-elevated border-emerald-400 text-emerald-300 shadow-glow-emerald'
                }`}
              >
                {index + 1}
              </div>

              {/* Transit connector between activities */}
              {index > 0 && activity.travelTimeFromPreviousMin && activity.travelTimeFromPreviousMin > 0 && (
                <div className="mb-3 -mt-2 flex items-center gap-2 text-[11px] text-slate-400 bg-surface/50 px-3 py-1 rounded-xl w-fit border border-white/5">
                  <Navigation className="w-3 h-3 text-cyan-400" />
                  <span>Transit: ~{activity.travelTimeFromPreviousMin} mins urban transit</span>
                </div>
              )}

              {/* Activity Card */}
              <div
                className={`p-4 sm:p-5 rounded-3xl transition-all duration-300 border ${
                  isSelected
                    ? 'border-cyan-400/80 bg-[#111f3d] shadow-[0_0_30px_rgba(6,182,212,0.25)] scale-[1.01]'
                    : isDisrupted
                    ? 'bg-rose-950/25 border-2 border-rose-500/50 shadow-glow-rose'
                    : 'glass-panel-interactive border-white/10'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  
                  {/* Left content */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-lg bg-white/5 text-cyan-300 border border-white/10">
                        <Clock className="w-3 h-3 text-cyan-400" />
                        {activity.startTime} – {activity.endTime}
                      </span>

                      <span
                        className={`text-[11px] font-bold px-2.5 py-0.5 rounded-lg border ${
                          activity.indoor
                            ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30'
                            : 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                        }`}
                      >
                        {activity.indoor ? 'Indoor Venue' : 'Outdoor Setting'}
                      </span>

                      <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-lg bg-surface-subtle text-slate-300 uppercase tracking-wider border border-white/5">
                        {activity.category}
                      </span>

                      {isDisrupted && (
                        <span className="flex items-center gap-1 text-[11px] font-extrabold px-2.5 py-0.5 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse">
                          <AlertTriangle className="w-3 h-3 text-rose-400" />
                          Heavy Rain Exposed
                        </span>
                      )}
                    </div>

                    <h4 className="text-base sm:text-lg font-bold text-white tracking-tight">
                      {activity.name}
                    </h4>

                    <p className="text-xs text-slate-300 mt-1.5 leading-relaxed line-clamp-2">
                      {activity.description}
                    </p>

                    <div className="flex items-center justify-between text-xs text-slate-400 mt-3 pt-3 border-t border-white/5">
                      <span className="flex items-center gap-1.5 truncate max-w-[260px]">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                        <span className="truncate">{activity.location}</span>
                      </span>

                      <span className="flex items-center gap-1 font-bold text-emerald-400 flex-shrink-0 ml-auto">
                        <IndianRupee className="w-3.5 h-3.5" />
                        {activity.estimatedCost === 0 ? 'Free Entry' : activity.estimatedCost.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Right Image */}
                  {activity.imageUrl && (
                    <div className="w-full md:w-36 h-28 rounded-2xl overflow-hidden flex-shrink-0 bg-surface border border-white/10 relative">
                      <img
                        src={activity.imageUrl}
                        alt={activity.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}

                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
