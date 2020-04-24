import hyperid from 'hyperid';
import {
  GameObjectTypes,
  MatchUpdate,
  Unit,
  UserContext,
  UserExecutionContext,
  UserId,
  UserScript,
  Feedback,
} from '@darwin/types';
import { createUnit, getGameObjectsPerType } from './helper/gameObjects';
import { generateFreePosition } from './helper/fields';
import performTick from './game-engine';
import { createGameStore } from './createGameStore';

export const TICK_INTERVAL = 2000;

interface TickFeedback {
  userId: UserId;
  feedback: Feedback[];
}

export default class GameController {
  private isRunning = false;

  private tickingInterval: NodeJS.Timeout;

  private hyperIdInstance = hyperid();

  private store = createGameStore();

  constructor(
    private sendMatchUpdate: (userId: UserId, matchUpdate: MatchUpdate) => void,
    private terminate: () => void
  ) {}

  appendUser(userId: UserId): void {
    const unit = this.generateUnit();

    this.addUnitToMatchState(unit);
    const userCtx: UserExecutionContext = {
      unitId: unit.id,
      userScript: {
        script: '',
      },
      store: {},
    };

    this.store.userContexts.userContextMap[userId] = userCtx;
    this.store.userContexts.userContextIds.push(userId);

    this.checkGameState();
  }

  setScript(userId: UserId, script: UserScript): void {
    this.store.userContexts.userContextMap[userId].userScript = script;
  }

  private checkGameState(): void {
    if (this.hasMoreThanOneUser() && !this.isRunning) {
      this.startGame();
    }
  }

  private generateUnit(): Unit {
    const unit = createUnit({
      id: this.hyperIdInstance(),
      position: generateFreePosition(this.store.matchState),
    });
    return unit;
  }

  private addUnitToMatchState(unit: Unit): void {
    this.store.matchState.objectMap[unit.id] = unit;
    this.store.matchState.objectIds.push(unit.id);
  }

  private hasMoreThanOneUser(): boolean {
    return this.store.userContexts.userContextIds.length > 1;
  }

  private startGame(): void {
    this.isRunning = true;
    this.tickingInterval = setInterval(this.getTickExecutor(), TICK_INTERVAL);
  }

  private getTickExecutor() {
    return (): void => {
      const tickFeedback = this.tick();
      this.notifyUsers(tickFeedback);
      const units = getGameObjectsPerType(
        this.store.matchState,
        GameObjectTypes.Unit
      );
      const lessThanTwoPlayersLeft = units.length < 2;
      if (lessThanTwoPlayersLeft) {
        this.stopTicking();
        this.terminate();
      }
    };
  }

  private static getPlainUserContext(userContext: UserContext): UserContext {
    return {
      unitId: userContext.unitId,
    };
  }

  private notifyUsers(tickFeedback: TickFeedback[]): void {
    tickFeedback.forEach(userTickFeedback => {
      const context = this.store.userContexts.userContextMap[
        userTickFeedback.userId
      ];
      const update = this.generateUpdate(
        GameController.getPlainUserContext(context),
        userTickFeedback.feedback
      );
      this.sendMatchUpdate(userTickFeedback.userId, update);
    });
  }

  private tick(): TickFeedback[] {
    this.store.currentTick++;

    const [newState, newStores] = performTick(
      this.store.matchState,
      this.store.userContexts
    );
    this.store.matchState = newState;
    // update user stores
    newStores.userIds.forEach(userId => {
      const { store } = newStores.userMap[userId];
      this.store.userContexts.userContextMap[userId].store = store;
    });
    return newStores.userIds.map(userId => {
      const { feedback } = newStores.userMap[userId];
      return {
        userId,
        feedback,
      };
    });
  }

  private generateUpdate(
    userContext: UserContext,
    feedback: Feedback[]
  ): MatchUpdate {
    return {
      type: 'matchUpdate',
      payload: {
        state: this.store.matchState,
        userContext,
        feedback,
        meta: {
          currentTick: this.store.currentTick,
        },
      },
    };
  }

  private stopTicking(): void {
    clearInterval(this.tickingInterval);
  }
}
