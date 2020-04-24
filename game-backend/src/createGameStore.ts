import { State, UserContextContainer } from '@darwin/types';

export interface GameStore {
  matchState: State;
  userContexts: UserContextContainer;
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
