import { Message, MatchUpdate, FeedbackType } from '@darwin/types';
import { ContextState } from './types';

const handleMatchUpdate = (
  state: ContextState,
  action: MatchUpdate
): ContextState => {
  const {
    state: gameState,
    userContext,
    feedback,
    meta: { currentTick },
  } = action.payload;
  const newFeedbackEntries =
    feedback.length > 0
      ? [
          {
            type: FeedbackType.INFO,
            content: [`feedback for Tick #${currentTick}`],
          },
          ...feedback,
        ]
      : [];
  // clear feedback on first tick
  const oldFeedbackEntries = currentTick === 1 ? [] : state.feedback;
  return {
    ...state,
    state: gameState,
    userContext,
    feedback: [...oldFeedbackEntries, ...newFeedbackEntries],
    meta: {
      currentTick,
    },
  };
};

const reducer = (state: ContextState, action: Message): ContextState => {
  switch (action.type) {
    case 'socketUpdate':
      return {
        ...state,
        socket: action.payload as WebSocket,
      };
    case 'matchUpdate':
      return handleMatchUpdate(state, action as MatchUpdate);
    default:
      return state;
  }
};

export default reducer;
