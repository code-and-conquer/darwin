import { Tick } from '../Tick';
import { State } from '../State';
import { Message } from './Message';
import { UserContext } from '../UserContext';
import { Feedback } from '../Feedback';

export interface MatchUpdate extends Message {
  type: 'matchUpdate';
  payload: {
    state: State;
    userContext: UserContext;
    feedback: Feedback[];
    meta: {
      currentTick: Tick;
    };
  };
}
