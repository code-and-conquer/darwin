import produce from '../helper/produce';
import { State } from '../../../darwin-types/State';
import Position from '../../../darwin-types/Position';
import { createUnit, createFood } from '../helper/gameObjects';

export interface GameObject {
  id: string;
  type: string;
  position: Position;
  moveBlocking: boolean;
}
export interface AddGameObject {
  id: string;
  x?: number;
  y?: number;
  moveBlocking?: boolean;
}

interface AddGameObjectUnit extends AddGameObject {
  health?: number;
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

  addUnit({ id, x = 1, y = 1, health }: AddGameObjectUnit): StateBuilder {
    const position = { x, y };
    const unit = createUnit({ id, position, health });
    return this.addObject(unit);
  }

  addFood({ id, x = 1, y = 1 }: AddGameObject): StateBuilder {
    const position = { x, y };
    const food = createFood({ id, position });
    return this.addObject(food);
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
