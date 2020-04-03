import { Message, MatchUpdate } from '@darwin/types';
import { ContextState } from './types';

const reducer = (state: ContextState, action: Message): ContextState => {
  switch (action.type) {
    case 'socketUpdate':
      return {
        ...state,
        socket: action.payload as WebSocket,
      };
    case 'matchUpdate':
      return {
        ...state,
        ...(action as MatchUpdate).payload,
      };

    default:
      return state;
  }
};

export default reducer;
