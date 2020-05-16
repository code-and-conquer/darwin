import WebSocket, { CLOSED, OPEN } from 'ws';
import {
  MatchUpdate,
  ScriptUpdate,
  UserId,
  RoleRequest,
  Role,
} from '@darwin/types';
import MainController, { GAME_RESTART_TIME } from './MainController';

import * as GameController from './GameController';
import StateBuilder from './test-helper/StateBuilder';

jest.mock('./GameController');

const mocked = GameController as jest.Mocked<typeof GameController>;
const GameControllerMock = mocked.default;

describe('MainController', () => {
  // Websocket mocks
  const sendFunction0 = jest.fn();
  const sendFunction1 = jest.fn();
  const sendFunctionDead = jest.fn();
  const onFunction = jest.fn();
  const pingFunctionAlive = jest.fn().mockImplementation(function ping() {
    this.isAlive = true;
  });
  const pingFunctionDead = jest.fn();
  const wsMock0: unknown = {
    send: sendFunction0,
    on: onFunction,
    ping: pingFunctionAlive,
    readyState: OPEN,
    isAlive: true,
  };
  const wsMock1: unknown = {
    send: sendFunction1,
    on: onFunction,
    ping: pingFunctionAlive,
    isAlive: true,
    readyState: OPEN,
  };
  const wsMockDead: unknown = {
    send: sendFunctionDead,
    on: onFunction,
    ping: pingFunctionDead,
    isAlive: false,
    readyState: CLOSED,
  };

  let mainController: MainController;
  let sendMatchUpdate: (userId: UserId, matchUpdate: MatchUpdate) => void;
  let sendTickNotification: (matchUpdate: MatchUpdate) => void;
  let terminate: () => void;

  let fakeMatchUpdate: MatchUpdate;

  jest.useFakeTimers();

  const parseMatchUpdate = (body: string): MatchUpdate => {
    return JSON.parse(body);
  };

  const roleRequestPlayer: RoleRequest = {
    type: 'roleRequest',
    payload: { newRole: Role.PLAYER },
  };

  const obtainGameControllerCallbacks = (): void => {
    // eslint-disable-next-line prefer-destructuring
    sendMatchUpdate = GameControllerMock.mock.calls[0][1];
    // eslint-disable-next-line prefer-destructuring
    sendTickNotification = GameControllerMock.mock.calls[0][2];
    // eslint-disable-next-line prefer-destructuring
    terminate = GameControllerMock.mock.calls[0][3];
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();

    mainController = new MainController();

    const state = StateBuilder.buildState()
      .addUnit({ id: 'unit1' })
      .build();
    fakeMatchUpdate = {
      type: 'matchUpdate',
      payload: {
        state,
        userContext: { unitId: 'unit1' },
        meta: { currentTick: null },
        feedback: [],
      },
    };
  });

  const givenTwoPlayersConnect = (): [UserId, UserId] => {
    const userId0 = 'user0';
    const userId1 = 'user1';
    mainController.newConnection(wsMock0 as WebSocket, userId0);
    mainController.newConnection(wsMock1 as WebSocket, userId1);

    onFunction.mock.calls[0][1](JSON.stringify(roleRequestPlayer));

    onFunction.mock.calls[1][1](JSON.stringify(roleRequestPlayer));

    obtainGameControllerCallbacks();
    return [userId0, userId1];
  };

  const givenOneSpectatorConnectsAfterTwoPlayers = (): [UserId] => {
    const userId2 = 'user2';
    mainController.newConnection(wsMock0 as WebSocket, userId2);
    return [userId2];
  };

  it('forwards a matchUpdate to the player', () => {
    const [userId] = givenTwoPlayersConnect();
    sendMatchUpdate(userId, fakeMatchUpdate);

    const matchUpdate = parseMatchUpdate(sendFunction0.mock.calls[0][0]);
    expect(matchUpdate.type).toBe(fakeMatchUpdate.type);
  });

  it('forwards a matchUpdate to spectators', () => {
    givenTwoPlayersConnect();
    givenOneSpectatorConnectsAfterTwoPlayers();

    sendTickNotification(fakeMatchUpdate);

    const matchUpdate = parseMatchUpdate(sendFunction0.mock.calls[0][0]);
    expect(matchUpdate.type).toBe(fakeMatchUpdate.type);
  });

  it('forwards a scriptUpdate to the GameController', () => {
    givenTwoPlayersConnect();
    const onListener = onFunction.mock.calls[0][1];
    const scriptUpdate: ScriptUpdate = {
      type: 'scriptUpdate',
      payload: { script: 'try()' },
    };
    onListener(JSON.stringify(scriptUpdate));

    const mockInstance = GameControllerMock.mock.instances[0];
    const setScriptMock = mockInstance.setScript as jest.Mock;
    const updateCall = setScriptMock.mock.calls[0][1];
    expect(updateCall.script).toBe(scriptUpdate.payload.script);
  });

  it('sends the same update to multiple connections of the same user', () => {
    const [userId] = givenTwoPlayersConnect();
    mainController.newConnection(wsMock1 as WebSocket, userId);

    sendMatchUpdate(userId, fakeMatchUpdate);

    const matchUpdate0 = parseMatchUpdate(sendFunction0.mock.calls[0][0]);
    const matchUpdate1 = parseMatchUpdate(sendFunction1.mock.calls[0][0]);
    expect(matchUpdate0.payload.state).toStrictEqual(
      matchUpdate1.payload.state
    );
    expect(matchUpdate0.payload.userContext.unitId).toBe(
      matchUpdate1.payload.userContext.unitId
    );
  });

  it('restarts a game when the previous has finished', () => {
    givenTwoPlayersConnect();

    terminate();
    jest.advanceTimersByTime(GAME_RESTART_TIME);

    expect(GameControllerMock.mock.calls.length).toBe(2);
  });

  it('removes inactive users from store', () => {
    const [userId0, userId1] = givenTwoPlayersConnect();
    mainController.newConnection(wsMockDead as WebSocket, 'user2');
    onFunction.mock.calls[2][1](JSON.stringify(roleRequestPlayer));
    terminate();
    jest.advanceTimersByTime(GAME_RESTART_TIME);

    const userIds = GameControllerMock.mock.calls[1][0];
    expect(userIds.length).toBe(2);
    expect(userIds[0]).toBe(userId0);
    expect(userIds[1]).toBe(userId1);
  });
});
