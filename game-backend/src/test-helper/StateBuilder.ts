import produce from '../helper/produce';
import { State } from '../../../darwin-types/State';
import { GAME_OBJECT_TYPES } from '../../../darwin-types/game-objects/GameObject';
import Position from '../../../darwin-types/Position';

export interface GameObject {
  id: string;
  type: string;
  position: Position;
  moveBlocking: boolean;
}
export interface AddGameObject {
  id: string;
  x: number;
  y: number;
  moveBlocking?: boolean;
}

export default class StateBuilder {
  constructor(private state: State) {
    return this;
  }

  addObject({ id, ...props }: GameObject): StateBuilder {
    this.state = produce(this.state, draft => {
      draft.objectMap[id] = {
        id,
        ...props,
      };
      draft.objectIds.push(id);
    });
    return this;
  }

  addUnit({ id, x, y, moveBlocking = true }: AddGameObject): StateBuilder {
    const position = { x, y };
    return this.addObject({
      id,
      position,
      type: GAME_OBJECT_TYPES.UNIT,
      moveBlocking,
    });
  }

  addFood({ id, x, y, moveBlocking = false }: AddGameObject): StateBuilder {
    const position = { x, y };
    return this.addObject({
      id,
      position,
      type: GAME_OBJECT_TYPES.FOOD,
      moveBlocking,
    });
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
