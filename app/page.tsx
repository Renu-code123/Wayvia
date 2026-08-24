'use client';

import React from 'react';
import { LandingHero } from '@/components/landing/LandingHero';
import { LandingFeatures } from '@/components/landing/LandingFeatures';
import { LandingDestinations } from '@/components/landing/LandingDestinations';
import { LandingBlog } from '@/components/landing/LandingBlog';

export default function HomePage() {
  return (
    <div className="flex flex-col flex-1">
      <LandingHero />
      <div id="features">
        <LandingFeatures />
      </div>
      <LandingDestinations />
      <LandingBlog />
    </div>
  );
}
