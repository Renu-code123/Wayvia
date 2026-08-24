'use client';

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Activity } from '@/types/trip';
import { Clock, IndianRupee, MapPin, Sparkles, Navigation } from 'lucide-react';
import { useTripStore } from '@/lib/store/tripStore';

interface LeafletMapInnerProps {
  activities: Activity[];
  activeDayNumber: number;
}

// Helper to re-center and fit bounds when activities change
const MapUpdater: React.FC<{ activities: Activity[]; selectedId: string | null }> = ({ activities, selectedId }) => {
  const map = useMap();

  useEffect(() => {
    if (!activities || activities.length === 0) return;

    if (selectedId) {
      const target = activities.find(a => a.id === selectedId);
      if (target && typeof target.lat === 'number' && typeof target.lng === 'number') {
        map.flyTo([target.lat, target.lng], 15, { animate: true, duration: 1 });
        return;
      }
    }

    const validPoints = activities.filter(a => typeof a.lat === 'number' && typeof a.lng === 'number');
    if (validPoints.length === 0) return;

    const bounds = L.latLngBounds(validPoints.map(a => [a.lat, a.lng]));
    map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14, animate: true });
  }, [activities, selectedId, map]);

  return null;
};

// Create custom colored numbered icon
const createNumberedIcon = (index: number, isIndoor: boolean, isSelected: boolean) => {
  const bgColor = isIndoor ? '#06b6d4' : '#10b981';
  const borderColor = isSelected ? '#ffffff' : '#0d1527';
  const size = isSelected ? 40 : 34;

  const html = `
    <div style="
      background: ${bgColor};
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      border: 3px solid ${borderColor};
      box-shadow: 0 0 ${isSelected ? '25px #38bdf8' : '15px ' + bgColor + '88'};
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
      font-weight: 800;
      font-size: ${isSelected ? '15px' : '13px'};
      cursor: pointer;
      transform: ${isSelected ? 'scale(1.15)' : 'scale(1)'};
      transition: all 0.2s ease;
    ">
      ${index + 1}
    </div>
  `;
  return L.divIcon({
    html,
    className: 'custom-leaflet-marker',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
  });
};

export const LeafletMapInner: React.FC<LeafletMapInnerProps> = ({ activities, activeDayNumber }) => {
  const { selectedActivityId, setSelectedActivityId } = useTripStore();
  const defaultCenter: [number, number] = [37.5665, 126.9780]; // Seoul
  const initialPosition = activities.length > 0 ? [activities[0].lat, activities[0].lng] as [number, number] : defaultCenter;

  const polylineCoordinates: [number, number][] = activities
    .filter(a => typeof a.lat === 'number' && typeof a.lng === 'number')
    .map(a => [a.lat, a.lng]);

  return (
    <div className="w-full h-full min-h-[440px] relative">
      <MapContainer
        center={initialPosition}
        zoom={13}
        scrollWheelZoom={false}
        className="w-full h-full min-h-[440px]"
      >
        {/* Dark Voyager tile layer */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />

        <MapUpdater activities={activities} selectedId={selectedActivityId} />

        {/* Route Connection Line */}
        {polylineCoordinates.length > 1 && (
          <Polyline
            positions={polylineCoordinates}
            pathOptions={{
              color: '#06b6d4',
              weight: 3.5,
              opacity: 0.85,
              dashArray: '6, 8',
            }}
          />
        )}

        {/* Markers */}
        {activities.map((activity, idx) => {
          const isSelected = activity.id === selectedActivityId;
          return (
            <Marker
              key={activity.id}
              position={[activity.lat, activity.lng]}
              icon={createNumberedIcon(idx, activity.indoor, isSelected)}
              eventHandlers={{
                click: () => {
                  setSelectedActivityId(activity.id);
                },
              }}
            >
              <Popup className="custom-map-popup">
                <div className="p-1 max-w-[240px] text-slate-100">
                  {activity.imageUrl && (
                    <div className="w-full h-24 rounded-lg overflow-hidden mb-2 bg-surface">
                      <img
                        src={activity.imageUrl}
                        alt={activity.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-brand-500/20 text-brand-300">
                      Stop #{idx + 1}
                    </span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                      activity.indoor ? 'bg-cyan-500/20 text-cyan-300' : 'bg-emerald-500/20 text-emerald-300'
                    }`}>
                      {activity.indoor ? 'Indoor' : 'Outdoor'}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-white leading-snug">{activity.name}</h4>
                  <div className="flex items-center justify-between text-xs text-slate-400 mt-2 pt-2 border-t border-white/10">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-cyan-400" />
                      {activity.startTime}
                    </span>
                    <span className="font-semibold text-emerald-400">
                      {activity.estimatedCost === 0 ? 'Free Entry' : `₹${activity.estimatedCost.toLocaleString()}`}
                    </span>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};
