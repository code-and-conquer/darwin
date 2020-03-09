import WebSocket from 'ws';
import MainController from './MainController';

describe('MainController', () => {
  it('sends object', () => {
    const sendFunction = jest.fn();
    const wsMock = {
      send: sendFunction,
    };
    MainController.newConnection((wsMock as unknown) as WebSocket, 'randomId');
    const object = JSON.parse(sendFunction.mock.calls[0][0]);
    expect(object.id).not.toBeNull();
  });
});
