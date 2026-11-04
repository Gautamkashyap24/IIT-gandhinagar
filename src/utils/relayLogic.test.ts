import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateRelayProgress, checkRewardStatus, appendUserActivity } from './relayLogic';
import { SharedCommunityReward, ParticipantActivity } from '../types';

test('calculateRelayProgress calculates percentages and remaining count', () => {
  const result = calculateRelayProgress(75, 100);
  assert.equal(result.percentage, 75);
  assert.equal(result.remaining, 25);
  assert.equal(result.isTargetMet, false);

  const completed = calculateRelayProgress(150, 150);
  assert.equal(completed.percentage, 100);
  assert.equal(completed.remaining, 0);
  assert.equal(completed.isTargetMet, true);

  const overflow = calculateRelayProgress(160, 150);
  assert.equal(overflow.percentage, 100);
  assert.equal(overflow.remaining, 0);
  assert.equal(overflow.isTargetMet, true);
});

test('checkRewardStatus unlocks reward when threshold is achieved', () => {
  const reward: SharedCommunityReward = {
    title: 'Community Solar Garden Light Set',
    description: '10 automated solar pillar lanterns for society garden pathways',
    thresholdHouseholds: 120,
    unlocked: false,
    indicativeValue: '₹14,500',
    sponsorNote: 'Demo sponsor preview',
  };

  const beforeUnlock = checkRewardStatus(115, reward);
  assert.equal(beforeUnlock.unlocked, false);

  const afterUnlock = checkRewardStatus(120, reward);
  assert.equal(afterUnlock.unlocked, true);
});

test('appendUserActivity prepends fresh participant to activity feed', () => {
  const initialActivities: ParticipantActivity[] = [
    {
      id: '1',
      participantRef: 'Kiran P.',
      householdUnit: 'Tower B-302',
      actionTitle: 'Washing machine delayed to solar window',
      timeAgo: '4m ago',
      status: 'joined',
    },
  ];

  const updated = appendUserActivity(initialActivities, {
    participantRef: 'You',
    householdUnit: 'Flat A-204',
    actionTitle: 'Pre-cooled AC before evening peak',
    status: 'joined',
  });

  assert.equal(updated.length, 2);
  assert.equal(updated[0].participantRef, 'You');
  assert.equal(updated[0].householdUnit, 'Flat A-204');
  assert.equal(updated[0].timeAgo, 'Just now');
});
