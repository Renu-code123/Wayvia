'use client';

import React from 'react';
import { WeatherCondition } from '@/types/trip';
import { CloudRain, Wind, Thermometer, RefreshCw, SunMedium, CloudLightning } from 'lucide-react';

interface WeatherCardProps {
  weather: WeatherCondition;
  isLoading: boolean;
  onRefresh: () => void;
  isSimulatedRain?: boolean;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({
  weather,
  isLoading,
  onRefresh,
  isSimulatedRain = false,
}) => {
  const isHighRain = weather.precipitationProbability >= 70;

  return (
    <div className={`glass-panel p-5 rounded-2xl border transition-all shadow-glass flex flex-col justify-between ${
      isHighRain ? 'border-rose-500/40 bg-rose-950/20 shadow-glow-rose' : 'border-border/50'
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CloudRain className={`w-5 h-5 ${isHighRain ? 'text-rose-400 animate-bounce' : 'text-cyan-400'}`} />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Meteorological Monitor</h3>
        </div>

        <button
          onClick={onRefresh}
          disabled={isLoading}
          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors border border-white/5 flex items-center gap-1.5 text-xs font-semibold"
          title="Sync live Open-Meteo API"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-cyan-400' : ''}`} />
          <span>Sync</span>
        </button>
      </div>

      {/* Main Temp & Status */}
      <div className="my-3 flex items-center justify-between">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-white tracking-tight">
              {weather.temperature}°C
            </span>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${
              isHighRain ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' : 'bg-cyan-500/20 text-cyan-300'
            }`}>
              {weather.weatherDescription}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Seoul, KR • Open-Meteo Live API
          </p>
        </div>

        <div className="text-right">
          <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-semibold">Rain Probability</span>
          <span className={`text-xl font-extrabold ${isHighRain ? 'text-rose-400' : 'text-cyan-300'}`}>
            {weather.precipitationProbability}%
          </span>
        </div>
      </div>

      {/* Hourly mini sparkline / forecast */}
      {weather.hourlyForecast && weather.hourlyForecast.length > 0 && (
        <div className="grid grid-cols-4 gap-1.5 pt-3 border-t border-white/5">
          {weather.hourlyForecast.slice(0, 4).map((h, i) => (
            <div key={i} className="p-1.5 rounded-lg bg-surface-subtle/80 text-center border border-white/5">
              <span className="text-[10px] text-slate-400 block">{h.time}</span>
              <span className="text-xs font-bold text-white block my-0.5">{h.temp}°</span>
              <span className={`text-[10px] font-semibold ${h.pop >= 60 ? 'text-rose-400' : 'text-cyan-400'}`}>
                {h.pop}% rain
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
