import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MOCK_CHALLENGES } from '../data/mockData';
import { DemoDataBadge } from '../components/DemoDataBadge';
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react';

export const ChallengesPage: React.FC = () => {
  const { navigateTo } = useApp();
  const [filter, setFilter] = useState<'all' | 'current' | 'upcoming' | 'past'>('all');

  const filteredChallenges = MOCK_CHALLENGES.filter(c => {
    if (filter === 'all') return true;
    return c.status === filter;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-100/80 border border-teal-300 text-xs font-bold uppercase tracking-wider text-teal-900 rounded-md">
          <Sparkles className="w-3.5 h-3.5 text-teal-800" />
          <span>Community Challenge Library</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-display">
          Energy Relay Challenges
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Structured, time-bound community sprints designed to sync household tasks with clean renewable power and peak grid relief.
        </p>
      </div>

      {/* Filter Tabs & Safety Banner (Curved Controls) */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Interactive Filter Control */}
        <div className="flex items-center gap-1 p-1 bg-white border border-slate-300 rounded-xl shadow-sm">
          {(['all', 'current', 'upcoming', 'past'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer rounded-lg ${
                filter === tab
                  ? 'bg-teal-800 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {tab === 'all' ? 'All Relays' : `${tab} Relays`}
            </button>
          ))}
        </div>

        <DemoDataBadge label="Sample Challenges" />
      </div>

      {/* Safety & Household Comfort Notice */}
      <div className="p-4 bg-white border-l-4 border-l-teal-800 border-y border-r border-slate-300 flex items-start gap-3 rounded-xl shadow-sm">
        <ShieldCheck className="w-5 h-5 text-teal-800 shrink-0 mt-0.5" />
        <p className="text-xs text-slate-700 leading-relaxed">
          <strong className="text-slate-900">Responsible Flexibility Principle:</strong> No resident should feel pressured to take actions that are inconvenient, unsafe, or unsuitable for their household. Power shifts are strictly voluntary habit experiments.
        </p>
      </div>

      {/* Challenge Cards Grid (Curved Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredChallenges.map(chal => {
          const isLive = chal.status === 'current';
          const isUpcoming = chal.status === 'upcoming';

          return (
            <div
              key={chal.id}
              className={`p-7 bg-white border flex flex-col justify-between space-y-6 shadow-sm rounded-2xl transition-all ${
                isLive
                  ? 'border-2 border-teal-800'
                  : 'border-sky-200 hover:border-slate-400'
              }`}
            >
              <div className="space-y-4">
                {/* Status + Credits */}
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md ${
                      isLive
                        ? 'bg-teal-100 text-teal-900 border border-teal-300 font-extrabold'
                        : isUpcoming
                        ? 'bg-sky-100 text-sky-900 border border-sky-300'
                        : 'bg-slate-100 text-slate-700 border border-slate-300'
                    }`}
                  >
                    {isLive ? '● Live Challenge' : isUpcoming ? 'Upcoming Sample' : 'Concluded'}
                  </span>

                  <span className="font-mono text-xs font-bold text-teal-800">
                    +{chal.participationCredit} Flex Points
                  </span>
                </div>

                <div>
                  <span className="text-[11px] text-teal-800 font-bold uppercase tracking-wider block mb-1">
                    {chal.theme}
                  </span>
                  <h2 className="text-xl font-bold text-slate-900 font-display">
                    {chal.title}
                  </h2>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {chal.description}
                </p>

                {/* Key Spec Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                  <div className="p-3 bg-[#f8fbfe] border border-sky-200 rounded-lg">
                    <span className="text-[10px] text-slate-500 uppercase font-bold block mb-0.5">
                      Challenge Window
                    </span>
                    <span className="text-slate-900 font-medium font-mono">{chal.window}</span>
                  </div>

                  <div className="p-3 bg-[#f8fbfe] border border-sky-200 rounded-lg">
                    <span className="text-[10px] text-slate-500 uppercase font-bold block mb-0.5">
                      Eligibility
                    </span>
                    <span className="text-slate-900 font-medium truncate block" title={chal.eligibility}>
                      {chal.eligibility}
                    </span>
                  </div>
                </div>

                {/* Action Summary */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block">
                    Recommended Flexible Actions:
                  </span>
                  <ul className="text-xs text-slate-600 space-y-1.5">
                    {chal.actionsSummary.map((act, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Verification Method & Safety Note */}
                <div className="p-3.5 bg-[#f5f9fc] border border-slate-300 text-[11px] space-y-1.5 rounded-xl">
                  <div className="text-slate-700">
                    <strong className="text-slate-900 font-bold">Verification:</strong> {chal.verificationMethod}
                  </div>
                  <div className="text-amber-900 flex items-start gap-1.5 pt-1 border-t border-slate-200">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-700" />
                    <span>{chal.safetyGuidance}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Card Actions */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">
                  {chal.sampleParticipants} sample households joined
                </span>

                {isLive ? (
                  <button
                    onClick={() => navigateTo('relay')}
                    className="cursor-pointer inline-flex items-center gap-1.5 px-5 py-2.5 bg-teal-800 hover:bg-teal-900 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all rounded-lg"
                  >
                    <span>Participate now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    {isUpcoming ? 'Opens soon' : 'Archived'}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
