'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MapPin, ArrowRight, Sparkles, Compass, Thermometer, Clock } from 'lucide-react';
import { useTripStore } from '@/lib/store/tripStore';

const DESTINATIONS = [
  {
    city: 'Seoul',
    country: 'South Korea',
    flag: '🇰🇷',
    tag: 'Demo Ready',
    tagColor: 'badge-cyan',
    image: 'https://images.unsplash.com/photo-1538669715315-155099bfa88c?w=800&auto=format&fit=crop&q=80',
    description: 'Dynamic mix of Joseon palaces, K-pop culture, and high-tech nightlife with full adaptive weather replanning.',
    weather: '22°C · Partly Cloudy',
    duration: '7 Days',
    isDemo: true,
    highlight: true,
  },
  {
    city: 'Tokyo',
    country: 'Japan',
    flag: '🇯🇵',
    tag: 'Neon & Heritage',
    tagColor: 'badge-purple',
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&auto=format&fit=crop&q=80',
    description: 'Shibuya crossings, ancient Asakusa shrines, Michelin dining, and robotic urban transit intelligence.',
    weather: '24°C · Clear',
    duration: '6 Days',
    isDemo: false,
  },
  {
    city: 'Kyoto',
    country: 'Japan',
    flag: '🇯🇵',
    tag: 'Temples & Zen',
    tagColor: 'badge-emerald',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&auto=format&fit=crop&q=80',
    description: 'Bamboo groves, Fushimi Inari torii gates, and traditional tea ceremonies with indoor rain contingencies.',
    weather: '20°C · Mild',
    duration: '5 Days',
    isDemo: false,
  },
  {
    city: 'Singapore',
    country: 'Singapore',
    flag: '🇸🇬',
    tag: 'Garden City',
    tagColor: 'badge-emerald',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&auto=format&fit=crop&q=80',
    description: 'Marina Bay Sands skyline, Supertree Grove, and climate-controlled indoor domes for year-round comfort.',
    weather: '29°C · Tropical',
    duration: '4 Days',
    isDemo: false,
  },
];

export const LandingDestinations: React.FC = () => {
  const router = useRouter();
  const { resetDemo } = useTripStore();

  return (
    <section id="destinations" className="py-24 relative">
      <div className="section-divider mb-24" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <div className="badge-cyan mb-4 w-fit">
              <Compass className="w-3.5 h-3.5" />
              Curated Destinations
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Explore Adaptive Itineraries
            </h2>
            <p className="text-sm text-slate-400 mt-3 leading-relaxed">
              Every destination is monitored in real-time with automatic indoor/outdoor routing and weather contingency plans.
            </p>
          </div>

          <Link
            href="/plan"
            className="flex-shrink-0 flex items-center gap-2 text-sm font-bold text-cyan-400 hover:text-cyan-300 transition-colors group"
          >
            Plan Custom Destination
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Destination Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {DESTINATIONS.map((dest, i) => (
            <div
              key={dest.city}
              className={`group flex flex-col rounded-3xl overflow-hidden border transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(0,0,0,0.5)] animate-fade-in ${
                dest.highlight
                  ? 'border-cyan-500/30 bg-[#080f1e] hover:border-cyan-400/50 shadow-glow-sm'
                  : 'border-white/8 bg-[#080f1e] hover:border-white/20'
              }`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden flex-shrink-0">
                <img
                  src={dest.image}
                  alt={dest.city}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080f1e] via-[#080f1e]/40 to-transparent" />

                {/* Flag + city */}
                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                  <span className="text-lg">{dest.flag}</span>
                  <div>
                    <p className="text-sm font-extrabold text-white">{dest.city}</p>
                    <p className="text-[10px] text-slate-400 font-medium">{dest.country}</p>
                  </div>
                </div>

                {/* Tag */}
                <div className={`absolute top-3 right-3 ${dest.tagColor} text-[9px] px-2 py-0.5`}>
                  {dest.highlight && <Sparkles className="w-2.5 h-2.5" />}
                  {dest.tag}
                </div>
              </div>

              {/* Body */}
              <div className="flex flex-col flex-1 p-4 space-y-3">
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 flex-1">{dest.description}</p>

                <div className="flex items-center justify-between text-[11px] pt-2 border-t border-white/5">
                  <div className="flex items-center gap-1 text-cyan-300 font-semibold">
                    <Thermometer className="w-3 h-3" />
                    {dest.weather}
                  </div>
                  <div className="flex items-center gap-1 text-slate-500 font-medium">
                    <Clock className="w-3 h-3" />
                    {dest.duration}
                  </div>
                </div>

                {dest.isDemo ? (
                  <button
                    onClick={() => { resetDemo(); router.push('/dashboard'); }}
                    className="w-full py-2.5 rounded-2xl text-xs font-bold text-white bg-gradient-to-r from-sky-500 via-blue-600 to-purple-600 hover:from-sky-400 hover:to-purple-500 flex items-center justify-center gap-1.5 shadow-glow transition-all hover:shadow-glow-lg"
                  >
                    <Compass className="w-3.5 h-3.5" />
                    Launch Live Demo
                  </button>
                ) : (
                  <Link
                    href="/plan"
                    className="w-full py-2.5 rounded-2xl text-xs font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center gap-1.5 transition-all"
                  >
                    Generate Itinerary
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
