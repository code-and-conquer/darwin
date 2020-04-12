import WebSocket from 'ws';
import {
  WEBSOCKET_HEARTBEAT_INTERVAL,
  initHeartbeatCheck,
  WebSocketWithStatus,
  initHeartbeatInterval,
} from './heartbeat';

describe('heartbeat helper', () => {
  jest.useFakeTimers();

  const onFunctionEvents: Record<string, Function> = {};
  const onFunction = jest
    .fn()
    .mockImplementation((event: string, func: Function) => {
      onFunctionEvents[event] = func;
    });
  const pingFunctionAlive = jest.fn().mockImplementation(function ping() {
    this.isAlive = true;
  });
  const wsMock0: unknown = {
    on: onFunction,
    ping: pingFunctionAlive,
    isAlive: null,
  };
  const wsServerMock: unknown = {
    clients: [wsMock0],
    on: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    initHeartbeatCheck(wsMock0 as WebSocketWithStatus);
    initHeartbeatInterval(wsServerMock as WebSocket.Server);
  });

  it('initializes the WebSocket checking', () => {
    expect(onFunction).toBeCalledTimes(1);
    expect(onFunction).toBeCalledWith<[string, Function]>(
      'pong',
      expect.any(Function)
    );
    expect((wsMock0 as WebSocketWithStatus).isAlive).toBe(true);
  });

  it('sets the connection to be alive on pong', () => {
    onFunctionEvents.pong();
    expect((wsMock0 as WebSocketWithStatus).isAlive).toBe(true);
  });

  it('checks the connection in an interval', () => {
    jest.advanceTimersByTime(WEBSOCKET_HEARTBEAT_INTERVAL);
    expect(pingFunctionAlive).toBeCalled();
    expect((wsMock0 as WebSocketWithStatus).isAlive).toBe(true);
  });
});
