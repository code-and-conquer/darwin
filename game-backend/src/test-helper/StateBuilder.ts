import produce from 'immer';
import { State } from '../../../darwin-types/State';

export interface GameObject {
  id: string;
  x: number;
  y: number;
}

export default class StateBuilder {
  constructor(private state: State) {
    return this;
  }

  addObject({ id, x, y }: GameObject): StateBuilder {
    this.state = produce(this.state, draft => {
      draft.objectMap[id] = {
        id,
        position: { x, y },
      };
      draft.objectIds.push(id);
    });
    return this;
  }

  build(): State {
    return this.state;
  }

  static buildState(): StateBuilder {
    return new StateBuilder({
      objectMap: {},
      objectIds: [],
    });
  }
}
