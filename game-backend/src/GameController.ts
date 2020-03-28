import hyperid from 'hyperid';
import {
  UserContext,
  UserExecutionContext,
  UserId,
  UserScript,
} from '../../darwin-types/UserContext';
import { Unit } from '../../darwin-types/game-objects/Unit';
import { createUnit, getGameObjectsPerType } from './helper/gameObjects';
import { generateFreePosition } from './helper/fields';
import { GAME_OBJECT_TYPES } from '../../darwin-types/game-objects/GameObject';
import performTick from './game-engine';
import { MatchUpdate } from '../../darwin-types/messages/MatchUpdate';
import { createGameStore } from './createGameStore';

export const TICK_INTERVAL = 2000;

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
      this.tick();
      this.notifyUsers();
      const units = getGameObjectsPerType(
        this.store.matchState,
        GAME_OBJECT_TYPES.UNIT
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

  private notifyUsers(): void {
    this.store.userContexts.userContextIds
      .map(id => ({ id, context: this.store.userContexts.userContextMap[id] }))
      .forEach(userEntry => {
        const update = this.generateUpdate(
          GameController.getPlainUserContext(userEntry.context)
        );
        this.sendMatchUpdate(userEntry.id, update);
      });
  }

  private tick(): void {
    this.store.currentTick++;
    const userContexts = this.store.userContexts.userContextIds.map(
      id => this.store.userContexts.userContextMap[id]
    );
    this.store.matchState = performTick(this.store.matchState, userContexts);
  }

  private generateUpdate(userContext: UserContext): MatchUpdate {
    return {
      type: 'matchUpdate',
      payload: {
        state: this.store.matchState,
        userContext,
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
