import WebSocket from 'ws';
import {
  ConnectionInitialization,
  MatchUpdate,
  ScriptUpdate,
  UserId,
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
  const onFunction = jest.fn();
  const wsMock0: unknown = {
    send: sendFunction0,
    on: onFunction,
  };
  const wsMock1: unknown = {
    send: sendFunction1,
    on: onFunction,
  };

  let mainController: MainController;
  let sendMatchUpdate: (userId: UserId, matchUpdate: MatchUpdate) => void;
  let terminate: () => void;

  let fakeMatchUpdate: MatchUpdate;

  jest.useFakeTimers();

  const parseMatchUpdate = (body: string): MatchUpdate => {
    return JSON.parse(body);
  };

  const parseConnectionInitialization = (
    body: string
  ): ConnectionInitialization => {
    return JSON.parse(body);
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();

    mainController = new MainController();
    // eslint-disable-next-line prefer-destructuring
    sendMatchUpdate = GameControllerMock.mock.calls[0][0];
    // eslint-disable-next-line prefer-destructuring
    terminate = GameControllerMock.mock.calls[0][1];

    const state = StateBuilder.buildState()
      .addUnit({ id: 'unit1' })
      .build();
    fakeMatchUpdate = {
      type: 'matchUpdate',
      payload: {
        state,
        userContext: { unitId: 'unit1' },
        meta: { currentTick: null },
      },
    };
  });

  it('sends a generated connection id back', () => {
    mainController.newConnection(wsMock0 as WebSocket, 'connection0');
    const connectionInitialization = parseConnectionInitialization(
      sendFunction0.mock.calls[0][0]
    );
    expect(connectionInitialization.type).toBe('connectionInitialization');
    expect(connectionInitialization.payload.userId).not.toBe('connection0');
  });

  it('sends the previous connection id back', () => {
    // first connection
    mainController.newConnection(wsMock0 as WebSocket, 'connection0');
    const connectionInitialization0 = parseConnectionInitialization(
      sendFunction0.mock.calls[0][0]
    );

    // second connection
    mainController.newConnection(
      wsMock1 as WebSocket,
      connectionInitialization0.payload.userId
    );
    const connectionInitialization1 = parseConnectionInitialization(
      sendFunction1.mock.calls[0][0]
    );

    // assert
    expect(connectionInitialization1.type).toBe('connectionInitialization');
    expect(connectionInitialization1.payload.userId).toBe(
      connectionInitialization0.payload.userId
    );
  });

  it('forwards a matchUpdate to the client', () => {
    mainController.newConnection(wsMock0 as WebSocket, '');
    const {
      payload: { userId },
    } = parseConnectionInitialization(sendFunction0.mock.calls[0][0]);
    sendMatchUpdate(userId, fakeMatchUpdate);

    const matchUpdate = parseMatchUpdate(sendFunction0.mock.calls[1][0]);
    expect(matchUpdate.type).toBe(fakeMatchUpdate.type);
  });

  it('forwards a scriptUpdate to the GameController', () => {
    mainController.newConnection(wsMock0 as WebSocket, '');
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
    mainController.newConnection(wsMock0 as WebSocket, '');
    const {
      payload: { userId },
    } = parseConnectionInitialization(sendFunction0.mock.calls[0][0]);
    mainController.newConnection(wsMock1 as WebSocket, userId);

    sendMatchUpdate(userId, fakeMatchUpdate);

    const matchUpdate0 = parseMatchUpdate(sendFunction0.mock.calls[1][0]);
    const matchUpdate1 = parseMatchUpdate(sendFunction1.mock.calls[1][0]);
    expect(matchUpdate0.payload.state).toStrictEqual(
      matchUpdate1.payload.state
    );
    expect(matchUpdate0.payload.userContext.unitId).toBe(
      matchUpdate1.payload.userContext.unitId
    );
  });

  it('restarts a game when the previous has finished', () => {
    terminate();
    jest.advanceTimersByTime(GAME_RESTART_TIME);

    expect(GameControllerMock.mock.calls.length).toBe(2);
  });
});
