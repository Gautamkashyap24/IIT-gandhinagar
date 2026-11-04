import React from 'react';
import { useApp } from '../context/AppContext';
import { DemoDataBadge } from '../components/DemoDataBadge';
import {
  Zap,
  ArrowRight,
  Users,
  Award,
  Sun,
  Clock,
  HelpCircle,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { navigateTo, relay, activeCommunity } = useApp();

  const progressPercent = Math.min(
    100,
    Math.round((relay.currentHouseholds / relay.targetHouseholds) * 100)
  );

  return (
    <div className="space-y-20 pb-16">
      {/* Cinematic Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center -mt-20 pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Image with Scrim */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/aistudio/Wind_Turbines_Across_a_Lush_Valley_d9ad8e86.png"
            alt="Cinematic renewable energy landscape with wind turbines and lush valley under teal sky"
            className="w-full h-full object-cover object-center filter brightness-[0.82] contrast-[1.08] transform scale-[1.02]"
            referrerPolicy="no-referrer"
          />
          {/* Subtle gradient scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-teal-950/40" />
          <div className="absolute inset-0 bg-radial from-transparent via-slate-950/30 to-slate-950/80" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8 pt-8">
          {/* Top Badge */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 px-3.5 sm:px-4 py-1.5 bg-slate-900/80 border border-emerald-400/30 text-emerald-300 text-[11px] sm:text-xs font-semibold backdrop-blur-md shadow-lg max-w-full rounded-md">
            <span className="w-2 h-2 bg-emerald-400 animate-pulse shrink-0 rounded-full" />
            <span>Mission LiFE Energy Challenge</span>
            <span className="text-slate-400 hidden sm:inline">·</span>
            <span className="text-teal-200">Gujarat Pilot</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] font-display text-balance drop-shadow-md">
            Neighbours. One relay.{' '}
            <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-sky-300 bg-clip-text text-transparent">
              A lighter energy footprint.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-200 leading-relaxed drop-shadow">
            Join local energy challenges, coordinate flexible habits with your community, and unlock shared rewards together.
          </p>

          {/* Action Buttons (Subtle curved) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => navigateTo('relay')}
              className="cursor-pointer w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold text-xs tracking-wider uppercase shadow-lg transition-all rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
            >
              <Zap className="w-4 h-4 fill-slate-950" />
              <span>Explore the live relay</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigateTo('how-it-works')}
              className="cursor-pointer w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 hero-glass-card hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider border border-white/25 transition-all rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
            >
              <HelpCircle className="w-4 h-4 text-teal-300" />
              <span>How it works</span>
            </button>
          </div>

          {/* Translucent Glass Information Cards (Subtle curve) */}
          <div className="pt-8 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto text-left">
            {/* Card 1: Sample Live Relay Snapshot */}
            <div className="hero-glass-card p-5 border border-white/20 shadow-xl space-y-3 relative rounded-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-teal-500/20 border border-teal-400/40 flex items-center justify-center rounded-lg">
                    <Zap className="w-4 h-4 text-teal-300" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-teal-300 block">
                      Active Community Relay
                    </span>
                    <h2 className="text-sm font-bold text-white truncate max-w-[200px]">
                      {relay.title}
                    </h2>
                  </div>
                </div>
                <DemoDataBadge label="Demo Relay" />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-slate-300">
                  <span className="text-slate-400">Team Progress:</span>
                  <span className="font-semibold text-white font-mono">
                    {relay.currentHouseholds} of {relay.targetHouseholds} households ({progressPercent}%)
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-900 border border-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-teal-400 rounded-full transition-all duration-700"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 text-xs">
                <span className="text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-teal-300" />
                  {relay.windowTime}
                </span>
                <span className="text-teal-300 font-semibold">
                  {relay.targetHouseholds - relay.currentHouseholds > 0
                    ? `${relay.targetHouseholds - relay.currentHouseholds} more to unlock reward`
                    : 'Target Reached!'}
                </span>
              </div>
            </div>

            {/* Card 2: Collective Impact Preview */}
            <div className="hero-glass-card p-5 border border-white/20 shadow-xl space-y-3 relative rounded-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-teal-500/20 border border-teal-400/40 flex items-center justify-center rounded-lg">
                    <Users className="w-4 h-4 text-teal-300" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-teal-300 block">
                      Neighbourhood Teamwork
                    </span>
                    <h2 className="text-sm font-bold text-white">
                      {activeCommunity.name}
                    </h2>
                  </div>
                </div>
                <DemoDataBadge label="Sample Stats" />
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 bg-slate-950/70 border border-white/10 rounded-lg">
                  <span className="text-slate-400 text-[10px] uppercase font-semibold block">Relays Completed</span>
                  <span className="text-lg font-bold text-white font-mono">
                    {activeCommunity.relaysCompleted}
                  </span>
                </div>
                <div className="p-2.5 bg-slate-950/70 border border-white/10 rounded-lg">
                  <span className="text-slate-400 text-[10px] uppercase font-semibold block">Flexible Habit Points</span>
                  <span className="text-lg font-bold text-teal-300 font-mono">
                    {activeCommunity.totalPoints.toLocaleString()}
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-slate-300 leading-normal">
                Rewarding coordinated community participation rather than individual footprint guilt.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: How the Energy Relay Works (Subtle Curved Cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-800">
            Neighbourhood Coordination
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
            How an Energy Relay works
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Unlike solo energy trackers, LiFE Flex League synchronizes simple, voluntary household shifts during critical grid demand hours.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="p-7 bg-white border border-sky-200 shadow-sm space-y-4 rounded-xl hover:border-teal-700 transition-colors">
            <div className="w-10 h-10 bg-teal-800 text-white flex items-center justify-center font-bold text-base font-mono rounded-lg">
              01
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-display">
              Join your community team
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Find your residential society, apartment tower, or school ward. Join neighbours working toward shared neighbourhood targets rather than competing alone.
            </p>
            <div className="pt-2 text-xs text-teal-800 font-bold">
              Over 6 Gujarat societies active in demo →
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-7 bg-white border border-sky-200 shadow-sm space-y-4 rounded-xl hover:border-teal-700 transition-colors">
            <div className="w-10 h-10 bg-teal-800 text-white flex items-center justify-center font-bold text-base font-mono rounded-lg">
              02
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-display">
              Choose a flexible action
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Pick an action that fits your day: delay the washing machine to sunny midday hours, nudge AC to 26°C with a fan, or power off standby power strips.
            </p>
            <div className="pt-2 text-xs text-teal-800 font-bold">
              Comfort and household safety first →
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-7 bg-white border border-sky-200 shadow-sm space-y-4 rounded-xl hover:border-teal-700 transition-colors">
            <div className="w-10 h-10 bg-teal-800 text-white flex items-center justify-center font-bold text-base font-mono rounded-lg">
              03
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-display">
              Unlock community rewards
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Every participating household moves the team meter. Reaching the threshold unlocks collective perks like solar garden lights or eco-audits for the society.
            </p>
            <div className="pt-2 text-xs text-teal-800 font-bold">
              Published transparent reward rules →
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: This Week's Sample Challenge Spotlight (Subtle Curved Block) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 bg-white border-2 border-slate-300 shadow-md rounded-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider bg-teal-100 text-teal-900 border border-teal-300 rounded-md">
                  Featured Relay
                </span>
                <DemoDataBadge label="Sample Challenge" />
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
                Evening Grid Relief Relay
              </h2>

              <p className="text-sm text-slate-700 leading-relaxed">
                Between 6:00 PM and 9:00 PM, state power grids experience heavy evening dinner peaks. By coordinating flexible habits across <strong className="text-slate-900">{activeCommunity.name}</strong>, residents help ease grid strain and unlock community solar garden lanterns.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 bg-[#f3f8fb] border border-sky-200 rounded-lg">
                  <span className="text-[10px] text-slate-500 uppercase font-bold block">Window</span>
                  <span className="text-xs font-bold text-slate-900 font-mono">6:00 – 9:00 PM IST</span>
                </div>
                <div className="p-3 bg-[#f3f8fb] border border-sky-200 rounded-lg">
                  <span className="text-[10px] text-slate-500 uppercase font-bold block">Team Target</span>
                  <span className="text-xs font-bold text-slate-900 font-mono">140 Households</span>
                </div>
                <div className="p-3 bg-[#f3f8fb] border border-sky-200 rounded-lg col-span-2 sm:col-span-1">
                  <span className="text-[10px] text-slate-500 uppercase font-bold block">Community Prize</span>
                  <span className="text-xs font-bold text-teal-800 truncate block">12 Solar Garden Lights</span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => navigateTo('relay')}
                  className="cursor-pointer inline-flex items-center gap-2 px-6 py-3 bg-teal-800 hover:bg-teal-900 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all rounded-lg"
                >
                  <Zap className="w-4 h-4 fill-white" />
                  <span>Join this relay now</span>
                </button>
                <button
                  onClick={() => navigateTo('challenges')}
                  className="cursor-pointer inline-flex items-center gap-2 px-5 py-3 bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold uppercase tracking-wider border border-slate-300 transition-all rounded-lg"
                >
                  <span>View all challenges</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right Progress Meter (Subtle Curves) */}
            <div className="lg:col-span-5 p-6 bg-[#f0f7fb] border border-sky-300 space-y-4 rounded-xl">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600 font-semibold uppercase tracking-wider text-[11px]">Participation Meter</span>
                <span className="font-mono text-teal-900 font-bold">{progressPercent}% of target</span>
              </div>

              <div className="w-full h-3.5 bg-white border border-slate-300 overflow-hidden rounded-full">
                <div
                  className="h-full bg-teal-700 transition-all duration-700 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <div className="flex justify-between items-center text-xs">
                <div>
                  <span className="text-2xl font-black text-slate-900 font-mono block">
                    {relay.currentHouseholds}
                  </span>
                  <span className="text-[11px] text-slate-500 font-semibold uppercase">Households Joined</span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-slate-700 font-mono block">
                    {relay.targetHouseholds}
                  </span>
                  <span className="text-[11px] text-slate-500 font-semibold uppercase">Target to Unlock</span>
                </div>
              </div>

              <div className="p-3 bg-white border border-teal-300 text-xs text-slate-800 space-y-1 rounded-lg">
                <span className="font-bold text-teal-900 block flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-teal-700" />
                  Milestone Reward:
                </span>
                <p className="text-[11px] text-slate-600">
                  {relay.sharedReward.title} (Unlocks for {activeCommunity.name} at 140 households)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Community Progress & Leaderboard (Subtle Curved Cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-teal-800">
              League Standings
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
              Gujarat Community Leaderboard
            </h2>
          </div>
          <button
            onClick={() => navigateTo('leaderboard')}
            className="cursor-pointer inline-flex items-center gap-1.5 text-xs font-bold text-teal-900 hover:text-teal-700 uppercase tracking-wider"
          >
            <span>Full leaderboard & reward rules</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 bg-white border border-sky-200 shadow-sm space-y-3 rounded-xl">
            <div className="flex items-center justify-between text-xs">
              <span className="text-amber-800 font-bold font-mono">#1 Leader</span>
              <span className="text-slate-500 font-medium">Gandhinagar</span>
            </div>
            <h3 className="font-bold text-slate-900 text-sm">
              Vidyapith Green Campus League
            </h3>
            <div className="flex items-center justify-between text-xs text-slate-600 pt-2 border-t border-slate-200">
              <span>Participation Rate</span>
              <span className="font-mono text-slate-900 font-bold">86.9%</span>
            </div>
          </div>

          <div className="p-5 bg-white border border-sky-200 shadow-sm space-y-3 rounded-xl">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-700 font-bold font-mono">#2 Rank</span>
              <span className="text-slate-500 font-medium">Ahmedabad</span>
            </div>
            <h3 className="font-bold text-slate-900 text-sm">
              Shantigram Greens, SG Highway
            </h3>
            <div className="flex items-center justify-between text-xs text-slate-600 pt-2 border-t border-slate-200">
              <span>Participation Rate</span>
              <span className="font-mono text-slate-900 font-bold">84.2%</span>
            </div>
          </div>

          <div className="p-5 bg-teal-50/70 border-2 border-teal-700/60 shadow-sm space-y-3 rounded-xl">
            <div className="flex items-center justify-between text-xs">
              <span className="text-teal-900 font-bold font-mono">#3 Rank · Your Team</span>
              <span className="text-slate-500 font-medium">Ahmedabad</span>
            </div>
            <h3 className="font-bold text-slate-900 text-sm">
              Navrangpura Green Residency
            </h3>
            <div className="flex items-center justify-between text-xs text-slate-600 pt-2 border-t border-teal-200">
              <span>Participation Rate</span>
              <span className="font-mono text-teal-900 font-bold">82.5%</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Sample Rewards Teaser (Subtle Curved Cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <DemoDataBadge label="Sample Rewards — No Sponsor Confirmed" />
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            Transparent community incentives
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm">
            Rewards are designed to benefit the common neighbourhood or assist household energy transitions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="p-6 bg-white border border-sky-200 shadow-sm space-y-3 rounded-xl">
            <span className="text-[10px] font-bold text-teal-800 uppercase tracking-widest block">
              Individual Draw Concept
            </span>
            <h3 className="text-base font-bold text-slate-900">
              LED Eco-Home Efficiency Kit
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              10-pack of high-efficacy 5-star LED lamps to replace inefficient incandescent lighting.
            </p>
            <div className="pt-2 text-[11px] text-slate-500 border-t border-slate-200 flex justify-between">
              <span>Eligibility: 3+ flexible actions</span>
              <span className="text-amber-800 font-mono font-semibold">Sample Item</span>
            </div>
          </div>

          <div className="p-6 bg-white border border-sky-200 shadow-sm space-y-3 rounded-xl">
            <span className="text-[10px] font-bold text-teal-800 uppercase tracking-widest block">
              Mobility Concept
            </span>
            <h3 className="text-base font-bold text-slate-900">
              BRTS / Metro Monthly Transit Pass
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Supporting sustainable urban public transit across Ahmedabad municipal corridors.
            </p>
            <div className="pt-2 text-[11px] text-slate-500 border-t border-slate-200 flex justify-between">
              <span>Eligibility: Top flex contributors</span>
              <span className="text-amber-800 font-mono font-semibold">Sample Item</span>
            </div>
          </div>

          <div className="p-6 bg-white border-2 border-teal-700/60 shadow-sm space-y-3 rounded-xl">
            <span className="text-[10px] font-bold text-teal-900 uppercase tracking-widest block">
              Shared Society Asset
            </span>
            <h3 className="text-base font-bold text-slate-900">
              Solar Garden Pathway Lantern Set
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              12 dusk-to-dawn solar pillar fixtures installed on society walkways when the relay target is reached.
            </p>
            <div className="pt-2 text-[11px] text-slate-500 border-t border-slate-200 flex justify-between">
              <span>Unlocks at: 140 households</span>
              <span className="text-teal-900 font-mono font-bold">Community Prize</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Rooftop Solar Readiness Callout (Subtle Curve) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 bg-white border-2 border-slate-300 shadow-md flex flex-col md:flex-row items-center justify-between gap-8 rounded-2xl">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-900">
              <Sun className="w-4 h-4 text-amber-700" />
              <span>PM Surya Ghar Muft Bijli Yojana Readiness</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
              Check your home's rooftop solar potential
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Calculate indicative system size, monthly unit generation, roof area needs, and estimated central government subsidy for Gujarat homes in under 60 seconds.
            </p>
          </div>
          <button
            onClick={() => navigateTo('solar')}
            className="cursor-pointer shrink-0 inline-flex items-center gap-2 px-6 py-3.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all rounded-lg"
          >
            <span>Launch Solar Explorer</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
