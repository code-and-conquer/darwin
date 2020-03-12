import WebSocket from 'ws';
import MainController from './MainController';
import { MatchUpdate } from '../../darwin-types/messages/matchUpdate';

describe('MainController', () => {
  // Websocket mocks
  const sendFunction0 = jest.fn();
  const sendFunction1 = jest.fn();
  const wsMock0: unknown = {
    send: sendFunction0,
  };
  const wsMock1: unknown = {
    send: sendFunction1,
  };

  let mainController: MainController;
  jest.useFakeTimers();

  beforeEach(() => {
    mainController = new MainController();
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  it('starts ticking', () => {
    mainController.newConnection(wsMock0 as WebSocket, 'connection0');
    jest.advanceTimersByTime(2000);
    expect(setInterval).toBeCalledTimes(1);
  });

  it('sends a matchUpdate', () => {
    mainController.newConnection(wsMock0 as WebSocket, 'connection0');
    jest.advanceTimersByTime(2000);

    const matchUpdate = JSON.parse(
      sendFunction0.mock.calls[0][0]
    ) as MatchUpdate;
    expect(matchUpdate.type).toBe('matchUpdate');
  });

  it('sends correct states on tick', () => {
    mainController.newConnection(wsMock0 as WebSocket, 'connection0');
    jest.advanceTimersByTime(2000);

    const matchUpdate = JSON.parse(
      sendFunction0.mock.calls[0][0]
    ) as MatchUpdate;
    const unitId = matchUpdate.payload.state.objectIds[0];

    expect(unitId).not.toBeNull();
    expect(matchUpdate.payload.state.objectMap[unitId]).toBeDefined();
  });

  it('increments tick counter on each tick', () => {
    let matchUpdate: MatchUpdate;

    mainController.newConnection(wsMock0 as WebSocket, 'connection0');

    jest.advanceTimersByTime(2000);
    matchUpdate = JSON.parse(sendFunction0.mock.calls[0][0]);
    expect(matchUpdate.debug.currentTick).toBe(1);

    jest.advanceTimersByTime(2000);
    matchUpdate = JSON.parse(sendFunction0.mock.calls[1][0]);
    expect(matchUpdate.debug.currentTick).toBe(2);
  });

  // we will probably have to change this in the future, when we hide infos for certain users
  it('sends the same update to multiple clients', () => {
    mainController.newConnection(wsMock0 as WebSocket, 'connection0');
    mainController.newConnection(wsMock1 as WebSocket, 'connection1');

    jest.advanceTimersByTime(2000);
    const matchUpdate0 = sendFunction0.mock.calls[0][0];
    const matchUpdate1 = sendFunction1.mock.calls[0][0];
    expect(matchUpdate0).toMatch(matchUpdate1);
    expect((JSON.parse(matchUpdate0) as MatchUpdate).debug.currentTick).toBe(1);
    expect((JSON.parse(matchUpdate1) as MatchUpdate).debug.currentTick).toBe(1);

    jest.advanceTimersByTime(2000);
    const matchUpdate2 = sendFunction0.mock.calls[0][0];
    const matchUpdate3 = sendFunction1.mock.calls[0][0];
    expect(matchUpdate2).toMatch(matchUpdate3);
    expect((JSON.parse(matchUpdate2) as MatchUpdate).debug.currentTick).toBe(1);
    expect((JSON.parse(matchUpdate3) as MatchUpdate).debug.currentTick).toBe(1);
  });
});
