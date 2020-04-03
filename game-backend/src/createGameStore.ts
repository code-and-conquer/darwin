import { State, UserExecutionContext, UserId } from '@darwin/types';

export interface GameStore {
  matchState: State;
  userContexts: {
    userContextMap: Record<UserId, UserExecutionContext>;
    userContextIds: UserId[];
  };
  currentTick: number;
}

export const createGameStore = (): GameStore => {
  return {
    matchState: {
      objectIds: [],
      objectMap: {},
    },
    userContexts: {
      userContextIds: [],
      userContextMap: {},
    },
    currentTick: 0,
  };
};
