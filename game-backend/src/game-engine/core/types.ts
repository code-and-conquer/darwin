import { UserExecutionContext, UserId } from '@darwin/types';

/**
 * used for exchange within the game engine
 */
export interface ElevatedUserExecutionContext extends UserExecutionContext {
  userId: UserId;
}
