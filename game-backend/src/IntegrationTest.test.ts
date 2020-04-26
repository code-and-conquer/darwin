/* eslint-disable no-param-reassign */
import {
  GameObjectTypes,
  State,
  UserExecutionContext,
  INITIAL_HEALTH,
} from '@darwin/types';
import performTick from './game-engine';
import { getGameObjectsPerType } from './helper/gameObjects';
import StateBuilder from './test-helper/StateBuilder';
import { HEALTH_LOSS_RATE } from './game-engine/mechanics/hunger-handler';

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

  const ticksTillDeath = INITIAL_HEALTH / HEALTH_LOSS_RATE + 1;
  let startState: State;
  let userContexts: UserExecutionContext[];
  beforeEach(() => {
    startState = StateBuilder.buildState()
      .addUnit({
        id: UNIT_ID1,
        x: 0,
        y: 0,
        attributes: {
          healthRegenBoost: 10,
        },
      })
      .addUnit({ id: UNIT_ID2, x: 20, y: 20 })
      .build();
    userContexts = [
      {
        unitId: UNIT_ID1,
        userScript: {
          script: '',
        },
        store: {},
      },
      {
        unitId: UNIT_ID2,
        userScript: {
          script: '',
        },
        store: {},
      },
    ];
  });

  it('add two units and let game end', () => {
    for (let i = 0; i < ticksTillDeath; i++) {
      startState = performTick(startState, userContexts);
    }

    expect(getGameObjectsPerType(startState, GameObjectTypes.Unit).length).toBe(
      0
    );
  });

  it('one unit eats the other not', () => {
    userContexts.find(elem => {
      return elem.unitId === UNIT_ID1;
    }).userScript = {
      script,
    };

    for (let i = 0; i < ticksTillDeath; i++) {
      startState = performTick(startState, userContexts);
    }

    expect(getGameObjectsPerType(startState, GameObjectTypes.Unit).length).toBe(
      1
    );
  });

  it('one unit eats the other not', () => {
    userContexts.forEach(elem => {
      elem.userScript = {
        script,
      };
    });

    for (let i = 0; i < ticksTillDeath; i++) {
      startState = performTick(startState, userContexts);
    }

    expect(getGameObjectsPerType(startState, GameObjectTypes.Unit).length).toBe(
      1
    );
  });
});
