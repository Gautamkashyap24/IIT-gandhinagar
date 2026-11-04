import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SAMPLE_REWARDS } from '../data/mockData';
import { DemoDataBadge } from '../components/DemoDataBadge';
import {
  Trophy,
  Users,
  Medal,
  Gift,
  ShieldCheck,
  Info,
} from 'lucide-react';

export const LeaderboardPage: React.FC = () => {
  const { individualLeaderboard, communityLeaderboard } = useApp();
  const [activeTab, setActiveTab] = useState<'individual' | 'community'>('individual');
  const [rewardCategory, setRewardCategory] = useState<'all' | 'individual' | 'community'>('all');

  const filteredRewards = SAMPLE_REWARDS.filter(r => {
    if (rewardCategory === 'all') return true;
    if (rewardCategory === 'individual') return r.category === 'Individual Draw';
    if (rewardCategory === 'community') return r.category === 'Community Milestone';
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Page Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-100/80 border border-teal-300 text-xs font-bold uppercase tracking-wider text-teal-900 rounded-md">
          <Trophy className="w-3.5 h-3.5 text-teal-800" />
          <span>Community League Standings</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-display">
          Leaderboard & Rewards
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Celebrating neighbours and residential societies coordinating flexible energy habits under Mission LiFE.
        </p>
      </div>

      {/* Switchable Leaderboard Views (Curved Controls) */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* View Switcher Button */}
          <div className="flex items-center gap-1 p-1 bg-white border border-slate-300 rounded-xl shadow-sm">
            <button
              onClick={() => setActiveTab('individual')}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 rounded-lg ${
                activeTab === 'individual'
                  ? 'bg-teal-800 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Individual Resident Ranks</span>
            </button>
            <button
              onClick={() => setActiveTab('community')}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 rounded-lg ${
                activeTab === 'community'
                  ? 'bg-teal-800 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Trophy className="w-3.5 h-3.5" />
              <span>Society & Campus Standings</span>
            </button>
          </div>

          <DemoDataBadge label="Fictional Demo Scores" />
        </div>

        {/* Scoring Transparency Notice */}
        <div className="p-4 bg-white border border-slate-300 flex items-start gap-3 text-xs text-slate-700 rounded-xl shadow-sm">
          <Info className="w-4 h-4 text-teal-800 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-slate-900">Scoring Transparency:</strong> In a production deployment, programme rules and verification criteria would be published by the coordinating municipality or programme administrator. In this prototype, points reflect demo self-attestations (+50 joining, +120–180 completion).
          </p>
        </div>

        {/* Individual Leaderboard Table (Curved Container) */}
        {activeTab === 'individual' ? (
          <div className="overflow-x-auto border-2 border-slate-300 bg-white rounded-2xl shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#eef5f9] text-slate-700 uppercase tracking-wider text-[11px] border-b-2 border-slate-300">
                <tr>
                  <th className="py-3.5 px-4 font-bold">Rank</th>
                  <th className="py-3.5 px-4 font-bold">Household / Resident</th>
                  <th className="py-3.5 px-4 font-bold">Society Team</th>
                  <th className="py-3.5 px-4 font-bold text-center">Relays Joined</th>
                  <th className="py-3.5 px-4 font-bold text-center">Actions Done</th>
                  <th className="py-3.5 px-4 font-bold text-right">Flex Points</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {individualLeaderboard.map(entry => (
                  <tr
                    key={entry.id}
                    className={`transition-colors ${
                      entry.isCurrentUser
                        ? 'bg-teal-50 text-teal-950 font-semibold'
                        : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <td className="py-3.5 px-4 font-mono font-bold">
                      {entry.rank === 1 ? (
                        <span className="text-amber-800 flex items-center gap-1">
                          <Medal className="w-4 h-4" /> 1
                        </span>
                      ) : entry.rank === 2 ? (
                        <span className="text-slate-700 flex items-center gap-1">
                          <Medal className="w-4 h-4" /> 2
                        </span>
                      ) : entry.rank === 3 ? (
                        <span className="text-amber-700 flex items-center gap-1">
                          <Medal className="w-4 h-4" /> 3
                        </span>
                      ) : (
                        `#${entry.rank}`
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">
                          {entry.householdRef}
                        </span>
                        {entry.isCurrentUser && (
                          <span className="px-1.5 py-0.5 text-[10px] bg-teal-800 text-white font-bold uppercase rounded-md">
                            You
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-teal-800 font-semibold">{entry.badge}</span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">{entry.societyName}</td>
                    <td className="py-3.5 px-4 text-center font-mono font-medium">{entry.relaysJoined}</td>
                    <td className="py-3.5 px-4 text-center font-mono font-medium">{entry.completedActions}</td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-teal-800">
                      {entry.flexPoints.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          /* Community Leaderboard Table (Curved Container) */
          <div className="overflow-x-auto border-2 border-slate-300 bg-white rounded-2xl shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#eef5f9] text-slate-700 uppercase tracking-wider text-[11px] border-b-2 border-slate-300">
                <tr>
                  <th className="py-3.5 px-4 font-bold">Rank</th>
                  <th className="py-3.5 px-4 font-bold">Community / Society</th>
                  <th className="py-3.5 px-4 font-bold">City</th>
                  <th className="py-3.5 px-4 font-bold text-center">Active Households</th>
                  <th className="py-3.5 px-4 font-bold text-center">Participation Rate</th>
                  <th className="py-3.5 px-4 font-bold text-center">Relays Completed</th>
                  <th className="py-3.5 px-4 font-bold text-right">League Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {communityLeaderboard.map(comm => (
                  <tr
                    key={comm.id}
                    className={`transition-colors ${
                      comm.isUserCommunity
                        ? 'bg-teal-50 text-teal-950 font-semibold'
                        : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <td className="py-3.5 px-4 font-mono font-bold">
                      {comm.rank === 1 ? (
                        <span className="text-amber-800 flex items-center gap-1">
                          <Trophy className="w-4 h-4" /> 1
                        </span>
                      ) : comm.rank === 2 ? (
                        <span className="text-slate-700 flex items-center gap-1">
                          <Medal className="w-4 h-4" /> 2
                        </span>
                      ) : comm.rank === 3 ? (
                        <span className="text-amber-700 flex items-center gap-1">
                          <Medal className="w-4 h-4" /> 3
                        </span>
                      ) : (
                        `#${comm.rank}`
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{comm.name}</span>
                        {comm.isUserCommunity && (
                          <span className="px-1.5 py-0.5 text-[10px] bg-teal-800 text-white font-bold uppercase rounded-md">
                            Your Team
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-500">{comm.type}</span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 font-medium">{comm.city}</td>
                    <td className="py-3.5 px-4 text-center font-mono font-medium">{comm.participatingHouseholds}</td>
                    <td className="py-3.5 px-4 text-center font-mono text-teal-800 font-bold">
                      {comm.averageFlexRate}
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono font-medium">{comm.relaysAchieved}</td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-teal-800">
                      {comm.leaguePoints.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Sample Rewards Section (Curved Rectangles) */}
      <div className="space-y-8 pt-8 border-t border-slate-300">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Gift className="w-4 h-4 text-teal-800" />
              <span className="text-xs font-bold uppercase tracking-widest text-teal-800">
                Incentive Catalogue
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
              Sample Community & Individual Rewards
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mt-1">
              Sample reward catalogue illustrating collective neighbourhood milestones and individual sponsor gift concepts under published rules.
            </p>
          </div>

          <div className="flex items-center gap-1 p-1 bg-white border border-slate-300 rounded-xl shadow-sm">
            <button
              onClick={() => setRewardCategory('all')}
              className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider cursor-pointer rounded-lg ${
                rewardCategory === 'all'
                  ? 'bg-teal-800 text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setRewardCategory('individual')}
              className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider cursor-pointer rounded-lg ${
                rewardCategory === 'individual'
                  ? 'bg-teal-800 text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Individual Draws
            </button>
            <button
              onClick={() => setRewardCategory('community')}
              className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider cursor-pointer rounded-lg ${
                rewardCategory === 'community'
                  ? 'bg-teal-800 text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Community Milestones
            </button>
          </div>
        </div>

        {/* Mandatory Transparency Disclaimer */}
        <div className="p-4 bg-amber-50 border-2 border-amber-300 text-xs text-amber-950 space-y-1 rounded-xl">
          <div className="font-bold flex items-center gap-1.5 text-amber-900 uppercase tracking-wide">
            <ShieldCheck className="w-4 h-4 text-amber-800" />
            Prototype Rules & Transparency Notice
          </div>
          <p className="leading-relaxed">
            All items shown below are illustrative concepts. <strong>No commercial sponsor partnerships are confirmed or active.</strong> Real reward redemption is disabled in this demonstration. Selection dates and qualification criteria demonstrate how a live municipal programme would operate transparently.
          </p>
        </div>

        {/* Reward Cards (Curved Rectangles) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRewards.map(reward => {
            const isMilestone = reward.category === 'Community Milestone';

            return (
              <div
                key={reward.id}
                className={`p-6 bg-white border flex flex-col justify-between space-y-5 rounded-2xl shadow-sm transition-all ${
                  isMilestone
                    ? 'border-2 border-teal-800'
                    : 'border-sky-200 hover:border-slate-400'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                        isMilestone
                          ? 'bg-teal-100 text-teal-900 border border-teal-300'
                          : 'bg-sky-100 text-sky-900 border border-sky-300'
                      }`}
                    >
                      {reward.category}
                    </span>
                    <span className="text-[11px] font-mono font-bold text-slate-600">
                      {reward.illustrativeValue}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 font-display">
                    {reward.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {reward.description}
                  </p>

                  <div className="p-3 bg-[#f8fbfe] border border-sky-200 space-y-1 text-xs rounded-xl">
                    <div className="text-slate-600">
                      <span className="font-bold text-slate-800">Eligibility:</span>{' '}
                      {reward.eligibility}
                    </div>
                    <div className="text-slate-600">
                      <span className="font-bold text-slate-800">Selection Date:</span>{' '}
                      {reward.selectionDate}
                    </div>
                  </div>

                  {/* Rules list */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block">
                      Published Sample Rules:
                    </span>
                    <ul className="text-[11px] text-slate-600 space-y-1">
                      {reward.rules.map((rule, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-teal-800 font-bold">·</span>
                          <span>{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200">
                  <span className="text-[11px] text-amber-900 font-semibold block">
                    {reward.badgeNote}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
