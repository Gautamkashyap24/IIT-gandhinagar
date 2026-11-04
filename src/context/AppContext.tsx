import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  PageId,
  Community,
  EnergyRelay,
  ParticipantActivity,
  IndividualLeaderboardEntry,
  CommunityLeaderboardEntry,
} from '../types';
import {
  INITIAL_COMMUNITIES,
  INITIAL_RELAY,
  INITIAL_ACTIVITIES,
  INDIVIDUAL_LEADERBOARD,
  COMMUNITY_LEADERBOARD,
} from '../data/mockData';
import { calculateRelayProgress, checkRewardStatus, appendUserActivity } from '../utils/relayLogic';

interface AppContextType {
  currentPage: PageId;
  navigateTo: (page: PageId) => void;
  communities: Community[];
  activeCommunity: Community;
  relay: EnergyRelay;
  activities: ParticipantActivity[];
  individualLeaderboard: IndividualLeaderboardEntry[];
  communityLeaderboard: CommunityLeaderboardEntry[];
  userParticipation: {
    hasJoined: boolean;
    selectedActionId: string | null;
    isCompleted: boolean;
    householdUnit: string;
    pointsEarned: number;
  };
  joinRelay: (actionId: string, householdUnit: string) => void;
  completeAction: () => void;
  selectCommunity: (communityId: string) => void;
  resetDemoData: () => void;
  toastMessage: string | null;
  clearToast: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY = 'life_flex_league_state_v1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Page routing via hash
  const getPageFromHash = (): PageId => {
    const hash = window.location.hash.replace('#', '') as PageId;
    const validPages: PageId[] = [
      'home',
      'how-it-works',
      'relay',
      'challenges',
      'leaderboard',
      'solar',
      'communities',
      'about',
    ];
    return validPages.includes(hash) ? hash : 'home';
  };

  const [currentPage, setCurrentPage] = useState<PageId>(getPageFromHash);
  const [communities, setCommunities] = useState<Community[]>(INITIAL_COMMUNITIES);
  const [activeCommunityId, setActiveCommunityId] = useState<string>('comm-navrangpura');
  const [relay, setRelay] = useState<EnergyRelay>(INITIAL_RELAY);
  const [activities, setActivities] = useState<ParticipantActivity[]>(INITIAL_ACTIVITIES);
  const [individualLeaderboard, setIndividualLeaderboard] = useState<IndividualLeaderboardEntry[]>(INDIVIDUAL_LEADERBOARD);
  const [communityLeaderboard, setCommunityLeaderboard] = useState<CommunityLeaderboardEntry[]>(COMMUNITY_LEADERBOARD);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [userParticipation, setUserParticipation] = useState<{
    hasJoined: boolean;
    selectedActionId: string | null;
    isCompleted: boolean;
    householdUnit: string;
    pointsEarned: number;
  }>({
    hasJoined: false,
    selectedActionId: null,
    isCompleted: false,
    householdUnit: 'Flat A-102',
    pointsEarned: 0,
  });

  // Listen to hashchange for native forward/back navigation
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPage(getPageFromHash());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Sync state from localStorage on initial load
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.userParticipation) setUserParticipation(parsed.userParticipation);
        if (parsed.currentHouseholds) {
          setRelay(prev => {
            const updated = {
              ...prev,
              currentHouseholds: parsed.currentHouseholds,
            };
            return {
              ...updated,
              sharedReward: checkRewardStatus(parsed.currentHouseholds, updated.sharedReward),
            };
          });
        }
        if (parsed.activeCommunityId) setActiveCommunityId(parsed.activeCommunityId);
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  // Save changes to localStorage
  const saveToStorage = (updates: {
    userParticipation?: typeof userParticipation;
    currentHouseholds?: number;
    activeCommunityId?: string;
  }) => {
    try {
      const current = localStorage.getItem(STORAGE_KEY);
      const parsed = current ? JSON.parse(current) : {};
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...parsed, ...updates }));
    } catch {
      // Ignore
    }
  };

  const navigateTo = (page: PageId) => {
    window.location.hash = page;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(prev => (prev === message ? null : prev));
    }, 4500);
  };

  const clearToast = () => setToastMessage(null);

  const activeCommunity =
    communities.find(c => c.id === activeCommunityId) || communities[0];

  const joinRelay = (actionId: string, householdUnit: string) => {
    const targetAction = relay.actions.find(a => a.id === actionId);
    const actionTitle = targetAction ? targetAction.title : 'Selected Energy Habit';

    const newCurrent = relay.currentHouseholds + 1;
    const updatedReward = checkRewardStatus(newCurrent, relay.sharedReward);

    const updatedRelay: EnergyRelay = {
      ...relay,
      currentHouseholds: newCurrent,
      sharedReward: updatedReward,
    };

    const newParticipation = {
      hasJoined: true,
      selectedActionId: actionId,
      isCompleted: false,
      householdUnit: householdUnit || 'Flat A-102',
      pointsEarned: 50, // Initial joining participation bonus
    };

    const updatedActivities = appendUserActivity(activities, {
      participantRef: 'You',
      householdUnit: newParticipation.householdUnit,
      actionTitle,
      status: 'joined',
    });

    setRelay(updatedRelay);
    setUserParticipation(newParticipation);
    setActivities(updatedActivities);

    saveToStorage({
      userParticipation: newParticipation,
      currentHouseholds: newCurrent,
    });

    showToast(`You joined the relay! Household ${newParticipation.householdUnit} committed to: ${actionTitle}`);
  };

  const completeAction = () => {
    if (!userParticipation.hasJoined) return;

    const action = relay.actions.find(a => a.id === userParticipation.selectedActionId);
    const actionPoints = action ? action.points : 120;
    const totalPoints = userParticipation.pointsEarned + actionPoints;

    const newParticipation = {
      ...userParticipation,
      isCompleted: true,
      pointsEarned: totalPoints,
    };

    const updatedActivities = appendUserActivity(activities, {
      participantRef: 'You',
      householdUnit: userParticipation.householdUnit,
      actionTitle: action ? action.title : 'Action Completed',
      status: 'completed',
    });

    // Update individual leaderboard with fresh score
    setIndividualLeaderboard(prev =>
      prev.map(item =>
        item.isCurrentUser
          ? {
              ...item,
              completedActions: item.completedActions + 1,
              flexPoints: item.flexPoints + actionPoints,
            }
          : item
      )
    );

    setUserParticipation(newParticipation);
    setActivities(updatedActivities);

    saveToStorage({
      userParticipation: newParticipation,
    });

    showToast(`Action marked complete! You earned +${actionPoints} flex points toward your community relay.`);
  };

  const selectCommunity = (communityId: string) => {
    setActiveCommunityId(communityId);
    setCommunities(prev =>
      prev.map(c => ({
        ...c,
        isJoined: c.id === communityId,
      }))
    );
    const target = communities.find(c => c.id === communityId);
    if (target) {
      setRelay(prev => ({
        ...prev,
        communityId: target.id,
        communityName: target.name,
        city: target.city,
      }));
      showToast(`Switched community to ${target.name} (${target.city}).`);
      saveToStorage({ activeCommunityId: communityId });
    }
  };

  const resetDemoData = () => {
    localStorage.removeItem(STORAGE_KEY);
    setRelay(INITIAL_RELAY);
    setActivities(INITIAL_ACTIVITIES);
    setUserParticipation({
      hasJoined: false,
      selectedActionId: null,
      isCompleted: false,
      householdUnit: 'Flat A-102',
      pointsEarned: 0,
    });
    setCommunities(INITIAL_COMMUNITIES);
    setActiveCommunityId('comm-navrangpura');
    setIndividualLeaderboard(INDIVIDUAL_LEADERBOARD);
    showToast('Demo data and participation state reset to initial values.');
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        navigateTo,
        communities,
        activeCommunity,
        relay,
        activities,
        individualLeaderboard,
        communityLeaderboard,
        userParticipation,
        joinRelay,
        completeAction,
        selectCommunity,
        resetDemoData,
        toastMessage,
        clearToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
