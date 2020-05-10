import { FeedbackType, State } from '@darwin/types';
import { UserTickIntents } from '../intent/Intent';
import recordIntents from './recordIntents';
import { ElevatedUserExecutionContext } from './types';

export default function handleUserScript(
  state: State,
  executionContext: ElevatedUserExecutionContext
): UserTickIntents {
  try {
    const [intents, store, feedback] = recordIntents(executionContext, state);
    return {
      context: {
        ...executionContext,
        store,
      },
      intents,
      feedback,
    };
  } catch (e) {
    // assume no intents in case of script error
    return {
      context: executionContext,
      intents: [],
      feedback: [
        {
          type: FeedbackType.ERROR,
          content: [`${e.name}: ${e.message}`],
        },
      ],
    };
  }
}
