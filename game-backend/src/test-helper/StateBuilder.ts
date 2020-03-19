import produce from 'immer';
import { State } from '../../../darwin-types/State';
import { GAME_OBJECT_TYPES } from '../../../darwin-types/game-objects/GameObject';

export interface GameObject extends GameObjectWithoutType {
  type: string;
}
export interface GameObjectWithoutType {
  id: string;
  x: number;
  y: number;
}

export default class StateBuilder {
  constructor(private state: State) {
    return this;
  }

  addObject({ id, x, y, type }: GameObject): StateBuilder {
    this.state = produce(this.state, draft => {
      draft.objectMap[id] = {
        id,
        type,
        position: { x, y },
      };
      draft.objectIds.push(id);
    });
    return this;
  }

  addUnit({ id, x, y }: GameObjectWithoutType): StateBuilder {
    return this.addObject({ id, x, y, type: GAME_OBJECT_TYPES.UNIT });
  }

  addFood({ id, x, y }: GameObjectWithoutType): StateBuilder {
    return this.addObject({ id, x, y, type: GAME_OBJECT_TYPES.FOOD });
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
