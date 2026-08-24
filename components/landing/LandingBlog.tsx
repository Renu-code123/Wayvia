'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, Calendar, Clock, ArrowRight, Sparkles } from 'lucide-react';

const ARTICLES = [
  {
    title: 'Why Static Travel Itineraries Fail: The Rise of Agentic Replanning',
    category: 'Agentic AI',
    readTime: '4 min',
    date: 'Aug 2026',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&auto=format&fit=crop&q=80',
    summary: 'Explore how autonomous meteorological agents monitor hourly changes and eliminate travel schedule collapse.',
    color: 'text-cyan-400',
    badge: 'badge-cyan',
  },
  {
    title: 'Seoul Travel Guide: Mastering Rainy Days with Indoor Cultural Gems',
    category: 'Destinations',
    readTime: '5 min',
    date: 'Aug 2026',
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80',
    summary: 'From the National Museum of Korea to the Starfield Library at COEX, navigate Seoul without missing a beat.',
    color: 'text-purple-400',
    badge: 'badge-purple',
  },
  {
    title: 'Human-in-the-Loop AI: The Key to Trustworthy Autonomous Travel',
    category: 'Product Engineering',
    readTime: '3 min',
    date: 'Aug 2026',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
    summary: 'Why AI agents must explain decisions, compare metrics, and request explicit approval before modifying plans.',
    color: 'text-emerald-400',
    badge: 'badge-emerald',
  },
];

export const LandingBlog: React.FC = () => (
  <section id="blog" className="py-24 relative">
    <div className="section-divider mb-24" />

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
        <div>
          <div className="badge-purple mb-4 w-fit">
            <BookOpen className="w-3.5 h-3.5" />
            Travel Intelligence
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Insights & AI Research
          </h2>
          <p className="text-sm text-slate-400 mt-3 max-w-xl leading-relaxed">
            Learn how real-world data pipelines and multi-agent reasoning are revolutionizing modern travel.
          </p>
        </div>

        <Link
          href="/dashboard"
          className="flex-shrink-0 flex items-center gap-2 text-sm font-bold text-cyan-400 hover:text-cyan-300 transition-colors group"
        >
          See Live Agent Demo
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Articles grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {ARTICLES.map((art, i) => (
          <article
            key={art.title}
            className="group glass-panel-interactive rounded-3xl overflow-hidden flex flex-col animate-fade-in"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="relative h-48 overflow-hidden flex-shrink-0">
              <img
                src={art.image}
                alt={art.title}
                className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c1321] via-[#0c1321]/40 to-transparent" />
              <span className={`${art.badge} absolute top-3 left-3 text-[9px]`}>{art.category}</span>
            </div>

            <div className="flex flex-col flex-1 p-5">
              <div className="flex items-center gap-3 text-[11px] text-slate-500 mb-3">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {art.date}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {art.readTime} read
                </span>
              </div>

              <h3 className="text-sm font-bold text-white group-hover:text-cyan-200 transition-colors leading-snug mb-2 flex-1">
                {art.title}
              </h3>

              <p className="text-xs text-slate-400 leading-relaxed mb-4">{art.summary}</p>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                <span className={`text-xs font-bold ${art.color}`}>Read Article</span>
                <ArrowRight className={`w-4 h-4 ${art.color} group-hover:translate-x-1 transition-transform`} />
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Footer CTA */}
      <div className="mt-16 text-center space-y-4">
        <p className="text-slate-500 text-sm font-medium">Built for the Google Gemini AI Hackathon 2026</p>
        <div className="flex items-center justify-center gap-2 text-xs text-slate-600">
          <WayviaLogoMini />
          <span>Wayvia · Travel Smarter. Always.</span>
        </div>
      </div>

    </div>
  </section>
);

// Inline mini logo text mark
const WayviaLogoMini = () => (
  <span className="font-black text-xs">
    <span className="text-white">Way</span>
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">via</span>
  </span>
);
