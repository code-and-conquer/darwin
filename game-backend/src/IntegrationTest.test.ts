import { GameObjectTypes } from '@darwin/types';
import GameController from './GameController';
import performTick from './game-engine';
import { getGameObjectsPerType } from './helper/gameObjects';

describe('Integration Test', () => {
  let gameController: GameController;
  const mockSendMatchUpdate = jest.fn();
  const mockTerminate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();

    gameController = new GameController(mockSendMatchUpdate, mockTerminate);
  });

  it('add two user and let game end', () => {
    gameController.appendUser('user0');
    gameController.appendUser('user1');

    const store = gameController.getStore();
    const userContexts = store.userContexts.userContextIds.map(
      id => store.userContexts.userContextMap[id]
    );
    let newState = store.matchState;

    for (let i = 0; i < 34; i++) {
      newState = performTick(newState, userContexts);
    }

    expect(getGameObjectsPerType(newState, GameObjectTypes.Unit).length).toBe(
      0
    );
  });
});
