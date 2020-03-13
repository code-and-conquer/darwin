import { Tick } from '../Tick';
import { State } from '../State';

export interface MatchUpdate {
  type: 'matchUpdate';
  payload: {
    state: State;
    meta: {
      currentTick: Tick;
    };
  };
}
