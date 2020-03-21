import { Message } from '../../../../darwin-types/messages/Message';
import { MatchUpdate } from '../../../../darwin-types/messages/MatchUpdate';
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
