import { UserContext, UserContextId } from '../../darwin-types/UserContext';
import { State } from '../../darwin-types/State';

export interface ServerStore {
  matchState: State;
  userContexts: {
    userContextMap: Record<UserContextId, UserContext>;
    userContextIds: UserContextId[];
  };
}

export const createStore = (): ServerStore => {
  return {
    matchState: {
      objectIds: [],
      objectMap: {},
    },
    userContexts: {
      userContextIds: [],
      userContextMap: {},
    },
  };
};
