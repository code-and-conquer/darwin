import { UserContext, UserContextId } from './UserContext';

export interface Store {
  userContextMap: Record<UserContextId, UserContext>
  userContextIds: UserContextId[]
}
