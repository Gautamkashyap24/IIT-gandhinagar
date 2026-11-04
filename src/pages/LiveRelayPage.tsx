import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DemoDataBadge } from '../components/DemoDataBadge';
import {
  Zap,
  Clock,
  Users,
  Award,
  CheckCircle2,
  Sparkles,
  Info,
  Check,
} from 'lucide-react';

export const LiveRelayPage: React.FC = () => {
  const {
    relay,
    activeCommunity,
    userParticipation,
    joinRelay,
    completeAction,
    activities,
  } = useApp();

  const [selectedActionId, setSelectedActionId] = useState<string>(
    userParticipation.selectedActionId || relay.actions[0]?.id || ''
  );
  const [householdUnit, setHouseholdUnit] = useState<string>(
    userParticipation.householdUnit || 'Flat A-102'
  );
  const [showJoinModal, setShowJoinModal] = useState<boolean>(false);

  const progressPercent = Math.min(
    100,
    Math.round((relay.currentHouseholds / relay.targetHouseholds) * 1000) / 10
  );

  const remainingHouseholds = Math.max(0, relay.targetHouseholds - relay.currentHouseholds);
  const isRewardUnlocked = relay.sharedReward.unlocked || relay.currentHouseholds >= relay.targetHouseholds;

  const handleJoinClick = (actionId?: string) => {
    if (actionId) setSelectedActionId(actionId);
    setShowJoinModal(true);
  };

  const handleConfirmJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedActionId) return;
    joinRelay(selectedActionId, householdUnit.trim() || 'Flat A-102');
    setShowJoinModal(false);
  };

  const currentAction = relay.actions.find(a => a.id === userParticipation.selectedActionId);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Top Banner / Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-300">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-teal-700 shrink-0" />
            <span className="text-xs font-bold uppercase tracking-widest text-teal-800">
              Live Relay in Progress
            </span>
            <span className="text-slate-400">·</span>
            <span className="text-xs text-slate-600 font-medium">{activeCommunity.name} ({activeCommunity.city})</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
            {relay.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            {relay.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <DemoDataBadge label="Live Demo Relay" />
        </div>
      </div>

      {/* Hero Relay Dashboard: Progress & Reward Unlocking (Curved Blocks) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Progress Meter & Status */}
        <div className="lg:col-span-7 p-6 sm:p-8 bg-white border border-sky-300 shadow-sm space-y-6 rounded-2xl">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs text-slate-700">
              <Clock className="w-4 h-4 text-teal-700" />
              <span className="font-bold text-slate-900">Relay Window:</span>
              <span className="font-mono">{relay.windowTime}</span>
            </div>
            <span className="text-[10px] font-bold text-teal-900 uppercase tracking-wider bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-md">
              Illustrative Grid Window
            </span>
          </div>

          {/* Big Progress Numbers */}
          <div className="space-y-3">
            <div className="flex justify-between items-baseline">
              <div>
                <span className="text-4xl sm:text-5xl font-black text-slate-900 font-mono">
                  {relay.currentHouseholds}
                </span>
                <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider ml-2">
                  / {relay.targetHouseholds} households committed
                </span>
              </div>
              <span className="text-2xl font-bold font-mono text-teal-800">
                {progressPercent}%
              </span>
            </div>

            {/* Visual Bar with subtle curve */}
            <div className="w-full h-3.5 bg-slate-100 border border-slate-300 overflow-hidden rounded-full">
              <div
                className="h-full bg-teal-700 transition-all duration-700 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="flex justify-between items-center text-xs text-slate-600">
              <span>Community Base: {activeCommunity.name}</span>
              <span className="text-teal-900 font-bold">
                {remainingHouseholds > 0
                  ? `${remainingHouseholds} more households needed to unlock shared reward`
                  : 'Target Met! Reward Unlocked for Society'}
              </span>
            </div>
          </div>

          {/* User Participation State Card */}
          <div className="pt-4 border-t border-slate-200">
            {!userParticipation.hasJoined ? (
              <div className="p-5 bg-[#f0f7fb] border border-sky-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xl">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-teal-900 uppercase tracking-wide flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-teal-700" />
                    You haven't joined this relay yet
                  </span>
                  <p className="text-xs text-slate-600">
                    Pick a simple appliance task below to add your household to the community progress.
                  </p>
                </div>
                <button
                  onClick={() => handleJoinClick()}
                  className="cursor-pointer w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-teal-800 hover:bg-teal-900 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all rounded-lg shrink-0"
                >
                  <Zap className="w-4 h-4 fill-white" />
                  <span>Join the relay</span>
                </button>
              </div>
            ) : (
              <div className="p-5 bg-[#f0f7fb] border-2 border-teal-800 space-y-3 rounded-xl">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 bg-teal-800 text-white flex items-center justify-center rounded-md font-bold">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-900">
                        {userParticipation.householdUnit}: Active Participant
                      </span>
                      <span className="text-[11px] text-teal-800 font-semibold block">
                        Action: {currentAction?.title || 'Selected Habit'}
                      </span>
                    </div>
                  </div>

                  {userParticipation.isCompleted ? (
                    <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-teal-100 text-teal-900 border border-teal-300 flex items-center gap-1.5 rounded-md">
                      <CheckCircle2 className="w-4 h-4 text-teal-800" />
                      Action Completed (+{userParticipation.pointsEarned} pts)
                    </span>
                  ) : (
                    <button
                      onClick={completeAction}
                      className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 bg-teal-800 hover:bg-teal-900 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all rounded-lg"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Mark my action complete</span>
                    </button>
                  )}
                </div>

                {!userParticipation.isCompleted && (
                  <p className="text-[11px] text-slate-600 leading-normal">
                    When you finish shifting your appliance task, click "Mark my action complete" to claim your flexible points and move the community score!
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Reward Unlock Indicator & Rules (Curved Rectangles) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Shared Community Reward Card */}
          <div
            className={`p-6 border rounded-2xl shadow-sm transition-all ${
              isRewardUnlocked
                ? 'bg-teal-50/70 border-2 border-teal-700'
                : 'bg-white border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-teal-900 uppercase tracking-widest flex items-center gap-1.5">
                <Award className="w-4 h-4 text-teal-700" />
                Shared Community Reward
              </span>
              <span
                className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                  isRewardUnlocked
                    ? 'bg-teal-700 text-white'
                    : 'bg-slate-200 text-slate-700'
                }`}
              >
                {isRewardUnlocked ? 'Unlocked' : 'Locked'}
              </span>
            </div>

            <h3 className="text-lg font-bold text-slate-900 font-display">
              {relay.sharedReward.title}
            </h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              {relay.sharedReward.description}
            </p>

            <div className="mt-4 pt-3 border-t border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Unlock Threshold:</span>
                <span className="font-bold text-slate-900 font-mono">
                  {relay.sharedReward.thresholdHouseholds} Households
                </span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Indicative Asset Value:</span>
                <span className="font-bold text-teal-800 font-mono">
                  {relay.sharedReward.indicativeValue}
                </span>
              </div>
            </div>

            <div className="mt-4 p-3 bg-[#f5fafc] border border-sky-200 text-[11px] text-slate-600 rounded-lg">
              {relay.sharedReward.sponsorNote}
            </div>
          </div>

          {/* Quick Rules Box */}
          <div className="p-6 bg-white border border-slate-300 space-y-3 rounded-2xl shadow-sm">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-teal-700" />
              Community Relay Rules
            </h4>
            <ul className="text-xs text-slate-700 space-y-2">
              {relay.rules.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-teal-800 font-bold font-mono text-[11px] shrink-0">
                    {idx + 1}.
                  </span>
                  <span className="leading-relaxed">{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Available Sample Actions (Curved Rectangles) */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-teal-800">
              Choose What Fits Your Home
            </span>
            <h2 className="text-2xl font-bold text-slate-900 font-display">
              Available Flexible Actions
            </h2>
          </div>
          <p className="text-xs text-slate-600 max-w-md">
            Illustrative sample actions. Choose any action that is convenient; comfort and medical needs are never compromised.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {relay.actions.map(action => {
            const isUserAction = userParticipation.selectedActionId === action.id;

            return (
              <div
                key={action.id}
                className={`p-6 border flex flex-col justify-between space-y-4 rounded-xl shadow-sm transition-all ${
                  isUserAction
                    ? 'bg-white border-2 border-teal-800 shadow-md'
                    : 'bg-white border-sky-200 hover:border-slate-400'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-teal-900 bg-teal-50 px-2 py-0.5 border border-teal-200 rounded-md">
                      {action.category}
                    </span>
                    <span className="text-xs font-mono font-bold text-teal-800">
                      +{action.points} pts
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900">
                    {action.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {action.description}
                  </p>

                  <div className="p-3 bg-[#f8fbfe] border border-sky-200 text-[11px] text-slate-600 space-y-1 rounded-lg">
                    <span className="font-bold text-slate-800 block uppercase text-[10px]">Suggested timing:</span>
                    <span className="font-medium text-slate-700">{action.suggestedWindow}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-mono">
                    ~{action.illustrativeKwhShift} kWh shift
                  </span>

                  {userParticipation.hasJoined ? (
                    isUserAction ? (
                      <span className="text-xs font-bold text-teal-800 uppercase tracking-wider flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Selected
                      </span>
                    ) : (
                      <button
                        onClick={() => handleJoinClick(action.id)}
                        className="cursor-pointer text-xs text-teal-800 hover:text-teal-900 font-bold uppercase tracking-wider"
                      >
                        Switch to this
                      </button>
                    )
                  ) : (
                    <button
                      onClick={() => handleJoinClick(action.id)}
                      className="cursor-pointer px-4 py-2 text-xs font-bold uppercase tracking-wider bg-teal-800 hover:bg-teal-900 text-white rounded-lg transition-colors"
                    >
                      Select & Join
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Activity Chain / Live Neighbourhood Participant Stream (Curved Rectangles) */}
      <div className="p-6 sm:p-8 bg-white border border-slate-300 space-y-5 rounded-2xl shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-slate-900 font-display flex items-center gap-2">
              <Users className="w-4 h-4 text-teal-800" />
              Community Participation Activity Chain
            </h3>
            <p className="text-xs text-slate-600">
              Recent household check-ins in {activeCommunity.name}. Simulated activity demonstrating team momentum.
            </p>
          </div>
          <DemoDataBadge label="Fictional Activity Chain" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {activities.slice(0, 9).map(act => (
            <div
              key={act.id}
              className={`p-3.5 border text-xs space-y-1.5 rounded-lg transition-all ${
                act.participantRef === 'You'
                  ? 'bg-teal-50/80 border-2 border-teal-800'
                  : 'bg-[#f8fbfd] border-sky-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 truncate max-w-[150px]">
                  {act.participantRef} ({act.householdUnit})
                </span>
                <span className="text-[10px] text-slate-500 font-mono">{act.timeAgo}</span>
              </div>
              <p className="text-slate-600 text-[11px] truncate" title={act.actionTitle}>
                {act.actionTitle}
              </p>
              <div className="flex items-center gap-1 text-[10px]">
                {act.status === 'completed' ? (
                  <span className="text-teal-900 font-bold flex items-center gap-1 uppercase tracking-wide">
                    <CheckCircle2 className="w-3 h-3 text-teal-700" /> Habit completed
                  </span>
                ) : (
                  <span className="text-slate-600 font-semibold flex items-center gap-1 uppercase tracking-wide">
                    <Zap className="w-3 h-3 text-teal-700" /> Committed to shift
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Join Relay Interactive Modal (Curved Modal) */}
      {showJoinModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="max-w-md w-full p-7 bg-white border-2 border-slate-900 shadow-2xl space-y-5 rounded-2xl">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-widest text-teal-800">
                Community Relay Check-in
              </span>
              <h3 className="text-xl font-bold text-slate-900 font-display">
                Join Evening Energy Relay
              </h3>
              <p className="text-xs text-slate-600">
                Your participation is credited to <strong className="text-slate-900">{activeCommunity.name}</strong>.
              </p>
            </div>

            <form onSubmit={handleConfirmJoin} className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-800 block mb-1">
                  Household / Unit Reference (Fictional Demo)
                </label>
                <input
                  type="text"
                  value={householdUnit}
                  onChange={e => setHouseholdUnit(e.target.value)}
                  placeholder="e.g. Flat B-402 or Villa 12"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-700 rounded-lg"
                  required
                />
                <span className="text-[10px] text-slate-500 mt-1 block">
                  No real identity or personal info collected.
                </span>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-800 block mb-1">
                  Select Your Flexible Habit Action
                </label>
                <select
                  value={selectedActionId}
                  onChange={e => setSelectedActionId(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-700 cursor-pointer rounded-lg"
                >
                  {relay.actions.map(a => (
                    <option key={a.id} value={a.id}>
                      {a.title} (+{a.points} pts)
                    </option>
                  ))}
                </select>
              </div>

              <div className="p-3 bg-[#f8fbfe] border border-sky-200 text-[11px] text-slate-600 leading-normal rounded-lg">
                By joining, you pledge to shift this task if convenient. Remember: health and family comfort always come first.
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowJoinModal(false)}
                  className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-slate-900 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="cursor-pointer px-6 py-3 bg-teal-800 hover:bg-teal-900 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all rounded-lg"
                >
                  Confirm & Join Team
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
