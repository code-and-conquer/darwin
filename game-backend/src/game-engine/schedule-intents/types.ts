import { UserContext } from '@darwin/types';
import { Intent, IntentCost } from '../intent/Intent';

export const PER_TICK_ENERGY = 3;

export interface UserIntentEntry {
  intent: Intent;
  context: UserContext;
}

export interface TimelineEntry {
  cost: IntentCost;
  userIntents: UserIntentEntry[];
}

export interface ExecutionTimeline {
  map: Record<IntentCost, TimelineEntry>;
  accessors: IntentCost[];
}
