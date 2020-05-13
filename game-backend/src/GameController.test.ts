import {
  MatchUpdate,
  State,
  Tick,
  UserContextContainer,
  UserExecutionFeedbackContainer,
} from '@darwin/types';
import GameController, { TICK_INTERVAL } from './GameController';
import performTick from './game-engine';
import StateBuilder from './test-helper/StateBuilder';

jest.mock('./game-engine');
const performTickMock = performTick as jest.Mock<
  [State, UserExecutionFeedbackContainer]
>;

describe('GameController', () => {
  let gameController: GameController;
  const mockSendMatchUpdate = jest.fn();
  const mockTerminate = jest.fn();
  jest.useFakeTimers();

  const parseMatchUpdate = (body: object): MatchUpdate => {
    return body as MatchUpdate;
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();

    gameController = new GameController(mockSendMatchUpdate, mockTerminate);
    performTickMock.mockImplementation(
      (state: State, userContextContainer: UserContextContainer) => [
        state,
        {
          userMap: userContextContainer.userContextIds.reduce((agg, id) => {
            return {
              ...agg,
              [id]: {
                store: {},
                feedback: [],
              },
            };
          }, {}),
          userIds: userContextContainer.userContextIds,
        },
      ]
    );
  });

  it('starts ticking', () => {
    gameController.appendUsers(['user0', 'user1']);
    jest.advanceTimersByTime(TICK_INTERVAL);

    expect(setInterval).toBeCalledTimes(1);
  });

  it('sends a matchUpdate', () => {
    gameController.appendUsers(['user0', 'user1']);
    jest.advanceTimersByTime(TICK_INTERVAL);

    const matchUpdate = parseMatchUpdate(mockSendMatchUpdate.mock.calls[0][1]);
    expect(matchUpdate.type).toBe('matchUpdate');
  });

  it('sends correct states on tick', () => {
    gameController.appendUsers(['user0', 'user1']);
    jest.advanceTimersByTime(TICK_INTERVAL);

    const matchUpdate = parseMatchUpdate(mockSendMatchUpdate.mock.calls[0][1]);
    const unitId = matchUpdate.payload.state.objectIds[0];

    expect(unitId).not.toBeNull();
    expect(matchUpdate.payload.state.objectMap[unitId]).toBeDefined();
  });

  it('sends empty user context on tick for spectators', () => {
    gameController.appendUsers(['user0', 'user1']);
    jest.advanceTimersByTime(TICK_INTERVAL);

    const matchUpdate = parseMatchUpdate(mockSendMatchUpdate.mock.calls[2][1]);
    const { userContext } = matchUpdate.payload;

    expect(userContext).toBeNull();
  });

  it('increments tick counter on each tick', () => {
    let matchUpdate: MatchUpdate;

    gameController.appendUsers(['user0', 'user1']);

    jest.advanceTimersByTime(TICK_INTERVAL);
    matchUpdate = parseMatchUpdate(mockSendMatchUpdate.mock.calls[0][1]);
    expect(matchUpdate.payload.meta.currentTick).toBe(1);

    jest.advanceTimersByTime(TICK_INTERVAL);
    matchUpdate = parseMatchUpdate(mockSendMatchUpdate.mock.calls[3][1]);
    expect(matchUpdate.payload.meta.currentTick).toBe(2);
  });

  function assertStatesMatch(
    updateClient0: object,
    updateClient1: object,
    expectedTick: Tick
  ): void {
    const matchUpdate0 = parseMatchUpdate(updateClient0);
    const matchUpdate1 = parseMatchUpdate(updateClient1);
    expect(matchUpdate0.payload.state).toStrictEqual(
      matchUpdate1.payload.state
    );
    expect(matchUpdate0.payload.userContext.unitId).not.toBe(
      matchUpdate1.payload.userContext.unitId
    );
    expect(matchUpdate0.payload.meta.currentTick).toBe(expectedTick);
    expect(matchUpdate1.payload.meta.currentTick).toBe(expectedTick);
  }

  it('sends the same state to players', () => {
    gameController.appendUsers(['user0', 'user1']);

    jest.advanceTimersByTime(TICK_INTERVAL);
    jest.advanceTimersByTime(TICK_INTERVAL);

    assertStatesMatch(
      mockSendMatchUpdate.mock.calls[0][1],
      mockSendMatchUpdate.mock.calls[1][1],
      1
    );
    assertStatesMatch(
      mockSendMatchUpdate.mock.calls[3][1],
      mockSendMatchUpdate.mock.calls[4][1],
      2
    );
  });

  it('terminates the game when only one survives', () => {
    const emptyState = StateBuilder.buildState().build();
    performTickMock.mockImplementation(() => [
      emptyState,
      { userMap: {}, userIds: [] },
    ]);

    gameController.appendUsers(['user0', 'user1']);
    expect(mockTerminate).toHaveBeenCalledTimes(1);
  });
});
