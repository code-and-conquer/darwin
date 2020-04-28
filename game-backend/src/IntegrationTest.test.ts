import {
  GameObjectTypes,
  State,
  INITIAL_HEALTH,
  AttributeName,
  Unit,
  UserContextContainer,
  MatchUpdate,
} from '@darwin/types';
import WebSocket, { OPEN } from 'ws';
import performTick from './game-engine';
import { getGameObjectsPerType, getUnit } from './helper/gameObjects';
import StateBuilder from './test-helper/StateBuilder';
import { HEALTH_LOSS_RATE } from './game-engine/mechanics/hunger-handler';
import MainController, { GAME_RESTART_TIME } from './MainController';
import { TICK_INTERVAL } from './GameController';

const ticksTillDeath = Math.floor(INITIAL_HEALTH / HEALTH_LOSS_RATE) + 1;

const performTickNTimes = (
  startState: State,
  userContextContainers: UserContextContainer,
  times: number
): State => {
  let state = startState;
  for (let i = 0; i < times; i++) {
    [state] = performTick(state, userContextContainers);
  }
  return state;
};

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
    const state = performTickNTimes(
      startState,
      userContextContainers,
      ticksTillDeath
    );
    expect(getGameObjectsPerType(state, GameObjectTypes.Unit).length).toBe(0);
  });

  it('one unit eats, the other does not', () => {
    const context = Object.values(userContextContainers.userContextMap).find(
      ctx => ctx.unitId === UNIT_ID1
    );
    context.userScript = {
      script,
    };

    const state = performTickNTimes(
      startState,
      userContextContainers,
      ticksTillDeath
    );

    expect(getGameObjectsPerType(state, GameObjectTypes.Unit).length).toBe(1);
  });

  it('both eat but one boosted', () => {
    Object.values(userContextContainers.userContextMap).map(context => {
      // eslint-disable-next-line no-param-reassign
      context.userScript = {
        script,
      };
    });
    let unit1 = getUnit(startState, UNIT_ID1);
    unit1.attributes[AttributeName.HealthRegenBoost] = 10;

    let timesUnit1IsHealthier = 0;
    let timesUnit2IsHealthier = 0;
    const maxMatches = 50;
    for (let matches = 0; matches < maxMatches; matches++) {
      const state = performTickNTimes(
        startState,
        userContextContainers,
        ticksTillDeath - 1
      );

      unit1 = getUnit(state, UNIT_ID1);
      const unit2 = getUnit(state, UNIT_ID2);

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
  const sendFunction1 = jest.fn();
  const sendFunction2 = jest.fn();
  const onFunction = jest.fn();
  const pingFunctionAlive = jest.fn().mockImplementation(function ping() {
    this.isAlive = true;
  });
  const wsMock1: unknown = {
    send: sendFunction1,
    on: onFunction,
    ping: pingFunctionAlive,
    readyState: OPEN,
    isAlive: true,
  };
  const wsMock2: unknown = {
    send: sendFunction2,
    on: onFunction,
    ping: pingFunctionAlive,
    isAlive: true,
    readyState: OPEN,
  };

  const parseMatchUpdate = (body: string): MatchUpdate => {
    return JSON.parse(body);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getLastMatchUpdate = (sendFunction: any): MatchUpdate => {
    return parseMatchUpdate(
      sendFunction.mock.calls[sendFunction.mock.calls.length - 1][0]
    );
  };

  const UNIT_ID1 = 'unit1';
  const UNIT_ID2 = 'unit2';

  jest.useFakeTimers();

  let mainController: MainController;
  beforeAll(() => {
    jest.clearAllTimers();

    mainController = new MainController();
    mainController.newConnection(wsMock1 as WebSocket, UNIT_ID1);
    mainController.newConnection(wsMock2 as WebSocket, UNIT_ID2);
  });

  it('finishes one game with both players dying at the same time', () => {
    // match has started
    jest.advanceTimersByTime(TICK_INTERVAL);
    const matchUpdate = parseMatchUpdate(sendFunction1.mock.calls[0][0]);
    expect(matchUpdate.payload.meta.currentTick).toBe(1);

    // last round
    jest.advanceTimersByTime(TICK_INTERVAL * (ticksTillDeath - 2));
    let { state } = getLastMatchUpdate(sendFunction1).payload;
    expect(getGameObjectsPerType(state, GameObjectTypes.Unit).length).toBe(2);

    // match has ended
    jest.advanceTimersByTime(TICK_INTERVAL);
    state = getLastMatchUpdate(sendFunction1).payload.state;
    expect(getGameObjectsPerType(state, GameObjectTypes.Unit).length).toBe(0);
  });

  it('runs 5 matches after another', () => {
    const matches = 5;
    for (let i = 0; i < matches; i++) {
      jest.advanceTimersByTime(TICK_INTERVAL * ticksTillDeath);
      jest.advanceTimersByTime(GAME_RESTART_TIME);
    }
    jest.advanceTimersByTime(TICK_INTERVAL);
    const { state } = parseMatchUpdate(
      sendFunction1.mock.calls[matches * ticksTillDeath][0]
    ).payload;

    const units: Unit[] = getGameObjectsPerType(
      state,
      GameObjectTypes.Unit
    ) as Unit[];
    expect(units.length).toBe(2);
    expect(units[0].health).toBe(100 - HEALTH_LOSS_RATE);
    expect(units[1].health).toBe(100 - HEALTH_LOSS_RATE);
  });
});
