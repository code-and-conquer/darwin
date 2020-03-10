import WebSocket from 'ws';
import MainController from './MainController';
import { State } from '../../darwin-types/State';

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

  it('sends correct states on tick', () => {
    mainController.newConnection(wsMock0 as WebSocket, 'connection0');
    jest.advanceTimersByTime(2000);
    const state: State = JSON.parse(sendFunction0.mock.calls[0][0]);
    const unitId = state.objectIds[0];
    expect(unitId).not.toBeNull();
    expect(state.objectMap.unitId).not.toBeNull();
  });

  it('increments tick counter on each tick', () => {
    let state: State;

    mainController.newConnection(wsMock0 as WebSocket, 'connection0');

    jest.advanceTimersByTime(2000);
    state = JSON.parse(sendFunction0.mock.calls[0][0]);
    expect(state.tick).toBe(1);

    jest.advanceTimersByTime(2000);
    state = JSON.parse(sendFunction0.mock.calls[1][0]);
    expect(state.tick).toBe(2);
  });

  // we will probably have to change this in the future, when we hide infos for certain users
  it('sends the same state to multiple clients', () => {
    mainController.newConnection(wsMock0 as WebSocket, 'connection0');
    mainController.newConnection(wsMock1 as WebSocket, 'connection1');

    jest.advanceTimersByTime(2000);
    const state0 = sendFunction0.mock.calls[0][0];
    const state1 = sendFunction1.mock.calls[0][0];
    expect(state0).toMatch(state1);
    expect(JSON.parse(state0).tick).toBe(1);
    expect(JSON.parse(state1).tick).toBe(1);

    jest.advanceTimersByTime(2000);
    const state2 = sendFunction0.mock.calls[1][0];
    const state3 = sendFunction1.mock.calls[1][0];
    expect(state2).toMatch(state3);
    expect(JSON.parse(state2).tick).toBe(2);
    expect(JSON.parse(state3).tick).toBe(2);
  });
});
