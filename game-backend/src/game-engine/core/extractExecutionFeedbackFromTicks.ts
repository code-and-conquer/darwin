import { UserExecutionFeedbackContainer } from '@darwin/types';
import { UserTickIntents } from '../intent/Intent';

/**
 * Provides the new stores
 * @param userTicks
 */
export default function extractExecutionFeedbackFromTicks(
  userTicks: UserTickIntents[]
): UserExecutionFeedbackContainer {
  const newStores: UserExecutionFeedbackContainer = {
    userMap: {},
    userIds: [],
  };
  userTicks.forEach(({ context, feedback }) => {
    const { store, userId } = context;
    newStores.userIds.push(userId);
    newStores.userMap[userId] = {
      store,
      feedback,
    };
  });
  return newStores;
}
