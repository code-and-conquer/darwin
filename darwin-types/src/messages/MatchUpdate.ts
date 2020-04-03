import { Tick } from '../Tick';
import { State } from '../State';
import { Message } from './Message';
import { UserContext } from '../UserContext';

export interface MatchUpdate extends Message {
  type: 'matchUpdate';
  payload: {
    state: State;
    userContext: UserContext;
    meta: {
      currentTick: Tick;
    };
  };
}
