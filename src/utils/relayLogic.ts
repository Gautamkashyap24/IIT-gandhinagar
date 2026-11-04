import { EnergyRelay, ParticipantActivity, SharedCommunityReward } from '../types';

export function calculateRelayProgress(
  currentHouseholds: number,
  targetHouseholds: number
): {
  percentage: number;
  remaining: number;
  isTargetMet: boolean;
} {
  const safeTarget = Math.max(1, targetHouseholds);
  const percentage = Math.min(100, Math.round((currentHouseholds / safeTarget) * 1000) / 10);
  const remaining = Math.max(0, safeTarget - currentHouseholds);
  const isTargetMet = currentHouseholds >= safeTarget;

  return {
    percentage,
    remaining,
    isTargetMet,
  };
}

export function checkRewardStatus(
  currentHouseholds: number,
  reward: SharedCommunityReward
): SharedCommunityReward {
  const unlocked = currentHouseholds >= reward.thresholdHouseholds;
  return {
    ...reward,
    unlocked,
  };
}

export function appendUserActivity(
  activities: ParticipantActivity[],
  newActivity: {
    participantRef: string;
    householdUnit: string;
    actionTitle: string;
    status: 'joined' | 'completed';
  }
): ParticipantActivity[] {
  const item: ParticipantActivity = {
    id: `act_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    participantRef: newActivity.participantRef,
    householdUnit: newActivity.householdUnit,
    actionTitle: newActivity.actionTitle,
    timeAgo: 'Just now',
    status: newActivity.status,
  };
  return [item, ...activities.slice(0, 19)]; // Keep latest 20 activities
}
