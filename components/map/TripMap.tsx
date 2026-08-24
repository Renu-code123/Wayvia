'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Activity } from '@/types/trip';
import { MapPin, Navigation, Compass, Layers } from 'lucide-react';

interface TripMapProps {
  activities: Activity[];
  activeDayNumber: number;
}

// Dynamically import Leaflet components to avoid SSR window is not defined error
const LeafletMap = dynamic(
  () => import('./LeafletMapInner').then((mod) => mod.LeafletMapInner),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[380px] rounded-2xl bg-surface-subtle flex flex-col items-center justify-center text-slate-400 gap-3 border border-border/40">
        <div className="w-10 h-10 rounded-full border-2 border-brand-500/30 border-t-brand-400 animate-spin"></div>
        <span className="text-xs font-medium tracking-wide">Initializing Geospatial Vector Engine...</span>
      </div>
    ),
  }
);

export const TripMap: React.FC<TripMapProps> = ({ activities, activeDayNumber }) => {
  return (
    <div className="w-full h-full min-h-[420px] rounded-2xl overflow-hidden glass-panel relative border border-border/50 shadow-glass flex flex-col">
      {/* Top Map Header Badge */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-surface/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10 shadow-lg">
        <Navigation className="w-4 h-4 text-cyan-400" />
        <span className="text-xs font-semibold text-white tracking-tight">
          Day {activeDayNumber} Route Overview
        </span>
        <span className="text-[10px] px-1.5 py-0.5 rounded bg-brand-500/20 text-brand-300 font-medium">
          {activities.length} Stops
        </span>
      </div>

      <div className="w-full h-full flex-1">
        <LeafletMap activities={activities} activeDayNumber={activeDayNumber} />
      </div>
    </div>
  );
};
