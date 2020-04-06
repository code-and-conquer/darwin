import { State, UserContext } from '@darwin/types';

export type IntentCost = number;

/**
 * Represents an action dispatched by a user script.
 * Stores a single intent and gives the ability to execute the intent.
 * An intent may update the state or keep the previous state.
 * An intent execution must never throw an exception.
 */
export interface Intent {
  execute: (state: State, userContext: UserContext) => State;
  cost: IntentCost;
}

/**
 * Stores the intents of a user during a single tick.
 */
export interface UserTickIntents {
  context: UserContext;
  intents: Intent[];
}
