import { State } from '../../darwin-types/State';
import { UserExecutionContext, UserId } from '../../darwin-types/UserContext';

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
