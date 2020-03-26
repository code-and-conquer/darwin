import produce from '../helper/produce';
import { State } from '../../../darwin-types/State';
import { GAME_OBJECT_TYPES } from '../../../darwin-types/game-objects/GameObject';

export interface GameObject extends GameObjectWithoutType {
  type: string;
}
export interface GameObjectWithoutType {
  id: string;
  x: number;
  y: number;
  restOfProps?: Record<string, any>;
}
export interface UnitProps {
  id: string;
  x: number;
  y: number;
  health?: number;
}

export default class StateBuilder {
  constructor(private state: State) {
    return this;
  }

  addObject({ id, x, y, type, restOfProps }: GameObject): StateBuilder {
    this.state = produce(this.state, draft => {
      draft.objectMap[id] = {
        id,
        type,
        position: { x, y },
        ...restOfProps,
      };
      draft.objectIds.push(id);
    });
    return this;
  }

  addUnit({ id, x, y, health = 100 }: UnitProps): StateBuilder {
    return this.addObject({
      id,
      x,
      y,
      restOfProps: { health },
      type: GAME_OBJECT_TYPES.UNIT,
    });
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
