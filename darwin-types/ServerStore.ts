import { UserContext, UserContextId } from './UserContext';
import { State } from './State';

export interface ServerStore {
  matchState: State;
  userContexts: {
    userContextMap: Record<UserContextId, UserContext>;
    userContextIds: UserContextId[];
  };
}
