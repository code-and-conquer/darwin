import {
  State,
  Position,
  Attributes,
  GameObjectTypes,
  PowerupType,
  INITIAL_ATTRIBUTES,
} from '@darwin/types';
import produce from '../helper/produce';
import { createUnit, createFood } from '../helper/gameObjects';
import createPowerup from '../game-engine/mechanics/powerup-spawner/createPowerup';

export interface GameObject {
  id: string;
  type: GameObjectTypes;
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
  attributes?: Partial<Attributes>;
}

interface AddGameObjectPowerup extends AddGameObject {
  type: PowerupType;
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

  addUnit({
    id,
    x = 1,
    y = 1,
    health,
    attributes,
  }: AddGameObjectUnit): StateBuilder {
    const position = { x, y };
    const unit = createUnit({
      id,
      position,
      health,
      attributes: { ...INITIAL_ATTRIBUTES, ...attributes },
    });
    return this.addObject(unit);
  }

  addFood({ id, x = 1, y = 1 }: AddGameObject): StateBuilder {
    const position = { x, y };
    const food = createFood({ id, position });
    return this.addObject(food);
  }

  addPowerup({ id, x = 1, y = 1, type }: AddGameObjectPowerup): StateBuilder {
    const position = { x, y };
    const powerup = createPowerup({ id, position, type });
    return this.addObject(powerup);
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
