import { State, Position, Attributes } from '@darwin/types';
import produce from '../helper/produce';
import { createPowerUpHelper } from '../game-engine/mechanics/power-up-spawner/createPowerUp';
import createUnit from '../helper/createUnit';
import createFood from '../game-engine/mechanics/food-spawner/createFood';

export interface GameObject {
  id: string;
  type: string;
  position: Position;
  moveBlocking: boolean;
  isConsumable: boolean;
}
export interface AddGameObject {
  id: string;
  x?: number;
  y?: number;
  moveBlocking?: boolean;
}

interface AddGameObjectUnit extends AddGameObject {
  health?: number;
  attributes?: Attributes;
}

interface AddGameObjectPowerUp extends AddGameObject {
  subType: string;
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

  addUnit({ x = 1, y = 1, ...props }: AddGameObjectUnit): StateBuilder {
    const position = { x, y };
    const unit = createUnit({ position, ...props });
    return this.addObject(unit);
  }

  addFood({ id, x = 1, y = 1 }: AddGameObject): StateBuilder {
    const position = { x, y };
    const food = createFood({ id, position });
    return this.addObject(food);
  }

  addPowerUp({
    id,
    x = 1,
    y = 1,
    subType,
  }: AddGameObjectPowerUp): StateBuilder {
    const position = { x, y };
    const food = createPowerUpHelper({ id, position, subType });
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
