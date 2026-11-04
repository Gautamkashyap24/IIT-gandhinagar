export type PageId =
  | 'home'
  | 'how-it-works'
  | 'relay'
  | 'challenges'
  | 'leaderboard'
  | 'solar'
  | 'communities'
  | 'about';

export interface Community {
  id: string;
  name: string;
  type: 'Housing Society' | 'Apartment Complex' | 'School / College' | 'Neighbourhood Ward';
  city: string;
  area: string;
  pinCode: string;
  membersCount: number;
  activeRelaysCount: number;
  relaysCompleted: number;
  currentRank: number;
  totalPoints: number;
  isJoined?: boolean;
}

export interface RelayAction {
  id: string;
  title: string;
  category: 'Appliance Shift' | 'Cooling Comfort' | 'Water Heating' | 'Standby Power' | 'Lighting Optimization';
  description: string;
  suggestedWindow: string;
  illustrativeKwhShift: number;
  points: number;
  tip: string;
}

export interface SharedCommunityReward {
  title: string;
  description: string;
  thresholdHouseholds: number;
  unlocked: boolean;
  indicativeValue: string;
  sponsorNote: string;
}

export interface EnergyRelay {
  id: string;
  title: string;
  subtitle: string;
  communityId: string;
  communityName: string;
  city: string;
  status: 'live' | 'upcoming' | 'completed';
  windowLabel: string;
  windowTime: string;
  targetHouseholds: number;
  currentHouseholds: number;
  rules: string[];
  sharedReward: SharedCommunityReward;
  actions: RelayAction[];
}

export interface ParticipantActivity {
  id: string;
  participantRef: string;
  householdUnit: string;
  actionTitle: string;
  timeAgo: string;
  status: 'joined' | 'completed';
}

export interface Challenge {
  id: string;
  title: string;
  theme: string;
  status: 'current' | 'upcoming' | 'past';
  window: string;
  participationCredit: number;
  eligibility: string;
  verificationMethod: string;
  description: string;
  actionsSummary: string[];
  safetyGuidance: string;
  sampleParticipants: number;
}

export interface IndividualLeaderboardEntry {
  id: string;
  rank: number;
  householdRef: string;
  societyName: string;
  relaysJoined: number;
  completedActions: number;
  flexPoints: number;
  badge: string;
  isCurrentUser?: boolean;
}

export interface CommunityLeaderboardEntry {
  id: string;
  rank: number;
  name: string;
  city: string;
  type: string;
  participatingHouseholds: number;
  averageFlexRate: string;
  relaysAchieved: number;
  leaguePoints: number;
  isUserCommunity?: boolean;
}

export interface SampleReward {
  id: string;
  title: string;
  category: 'Individual Draw' | 'Community Milestone';
  badgeNote: string;
  description: string;
  eligibility: string;
  selectionDate: string;
  rules: string[];
  illustrativeValue: string;
  unlocked?: boolean;
}

export interface SolarCalculationResult {
  monthlyBill: number;
  city: string;
  pinCode: string;
  roofAreaSqFt: number;
  shadingLevel: 'none' | 'partial' | 'heavy';
  recommendedKw: number;
  estimatedMonthlyUnits: number;
  indicativeMonthlySavings: number;
  indicativeAnnualSavings: number;
  requiredRoofAreaSqFt: number;
  isRoofSufficient: boolean;
  indicativeGovtSubsidy: number;
  indicativeSystemCostRange: [number, number];
  indicativeNetCostRange: [number, number];
  indicativeSimplePaybackYears: number;
  questionsForInstaller: string[];
  disclaimer: string;
}
