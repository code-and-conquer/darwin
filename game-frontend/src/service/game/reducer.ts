import {
  Message,
  MatchUpdate,
  FeedbackType,
  RoleResponse,
} from '@darwin/types';
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

const handleRoleResponse = (
  state: ContextState,
  action: RoleResponse
): ContextState => {
  const { newRole } = action.payload;
  return {
    ...state,
    role: newRole,
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
    case 'roleResponse':
      return handleRoleResponse(state, action as RoleResponse);
    default:
      return state;
  }
};

export default reducer;
