import { Tick } from '../Tick';
import { State } from '../State';
import { Message } from './Message';

export interface MatchUpdate extends Message {
  type: 'matchUpdate';
  payload: {
    state: State;
    meta: {
      currentTick: Tick;
    };
  };
}
