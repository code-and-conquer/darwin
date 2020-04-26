/* eslint-disable no-param-reassign */
import {
  GameObjectTypes,
  State,
  INITIAL_HEALTH,
  AttributeName,
  Unit,
  UserContextContainer,
} from '@darwin/types';
import performTick from './game-engine';
import { getGameObjectsPerType } from './helper/gameObjects';
import StateBuilder from './test-helper/StateBuilder';
import { HEALTH_LOSS_RATE } from './game-engine/mechanics/hunger-handler';
import deepClone from './helper/deepClone';

describe('Complete game-engine', () => {
  const UNIT_ID1 = 'unit1';
  const UNIT_ID2 = 'unit2';

  const script = `
    if (nearestFood.position.x > userUnit.position.x) {
      move('RIGHT');
      if (nearestFood.position.x - userUnit.position.x > 2) {
        move('RIGHT');
      }
    } else if (nearestFood.position.x < userUnit.position.x) {
      move('LEFT');
      if (nearestFood.position.x - userUnit.position.x < -2) {
        move('LEFT');
      }
    } else if (nearestFood.position.y > userUnit.position.y) {
      move('DOWN');
      if (nearestFood.position.y - userUnit.position.y > 2) {
        move('DOWN');
      }
    } else if (nearestFood.position.y < userUnit.position.y) {
      move('UP');
      if (nearestFood.position.y - userUnit.position.y < -2) {
        move('UP');
      }
    }
    consume();
  `;
  const scriptEatOnce = `
    store.eaten = false;
    if (!store.eaten) {
      if (nearestFood.position.x > userUnit.position.x) {
        move('RIGHT');
        if (nearestFood.position.x - userUnit.position.x > 2) {
          move('RIGHT');
        }
      } else if (nearestFood.position.x < userUnit.position.x) {
        move('LEFT');
        if (nearestFood.position.x - userUnit.position.x < -2) {
          move('LEFT');
        }
      } else if (nearestFood.position.y > userUnit.position.y) {
        move('DOWN');
        if (nearestFood.position.y - userUnit.position.y > 2) {
          move('DOWN');
        }
      } else if (nearestFood.position.y < userUnit.position.y) {
        move('UP');
        if (nearestFood.position.y - userUnit.position.y < -2) {
          move('UP');
        }
      } else {
        consume();
      }
      store.eaten = true;
    }
  `;

  const ticksTillDeath = INITIAL_HEALTH / HEALTH_LOSS_RATE + 1;
  let startState: State;
  let userContextContainers: UserContextContainer;
  beforeEach(() => {
    startState = StateBuilder.buildState()
      .addUnit({ id: UNIT_ID1, x: 0, y: 0 })
      .addUnit({ id: UNIT_ID2, x: 20, y: 20 })
      .build();
    userContextContainers = {
      userContextIds: [UNIT_ID1, UNIT_ID2],
      userContextMap: {
        [UNIT_ID1]: {
          unitId: UNIT_ID1,
          userScript: {
            script: '',
          },
          store: {},
        },
        [UNIT_ID2]: {
          unitId: UNIT_ID2,
          userScript: {
            script: '',
          },
          store: {},
        },
      },
    };
  });

  it('add two units and let game end', () => {
    let state: State = deepClone(startState);
    for (let i = 0; i < ticksTillDeath; i++) {
      [state] = performTick(startState, userContextContainers);
    }

    expect(getGameObjectsPerType(state, GameObjectTypes.Unit).length).toBe(0);
  });

  it('one unit eats, the other does not', () => {
    for (const context of Object.values(userContextContainers.userContextMap)) {
      if (context.unitId === UNIT_ID1) {
        context.userScript = {
          script,
        };
      }
    }

    let state: State = deepClone(startState);
    for (let i = 0; i < ticksTillDeath; i++) {
      [state] = performTick(state, userContextContainers);
    }

    expect(getGameObjectsPerType(state, GameObjectTypes.Unit).length).toBe(1);
  });

  it('both eat but one boosted', () => {
    for (const context of Object.values(userContextContainers.userContextMap)) {
      context.userScript = {
        script,
      };
    }
    let unit1: Unit = startState.objectMap[UNIT_ID1] as Unit;
    unit1.attributes[AttributeName.HealthRegenBoost] = 10;

    let timesUnit1IsHealthier = 0;
    let timesUnit2IsHealthier = 0;
    const maxMatches = 50;
    for (let matches = 0; matches < maxMatches; matches++) {
      let state: State = deepClone(startState);
      for (let i = 0; i < ticksTillDeath - 1; i++) {
        [state] = performTick(state, userContextContainers);
      }

      unit1 = state.objectMap[UNIT_ID1] as Unit;
      const unit2 = state.objectMap[UNIT_ID2] as Unit;

      if (unit1.health > unit2.health) {
        timesUnit1IsHealthier++;
      } else {
        timesUnit2IsHealthier++;
      }
    }
    expect(timesUnit1IsHealthier).toBeGreaterThan(timesUnit2IsHealthier);
  });
});

describe('Controller Tests', () => {
  jest.useFakeTimers();

  // const mainController = new MainController();
});
