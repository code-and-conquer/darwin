import {
  UserExecutionContext,
  State,
  Consumable,
  Unit,
  UserStore,
  GameObject,
  Feedback,
} from '@darwin/types';
import deepClone from '../../helper/deepClone';
import { Intent } from '../intent/Intent';
import MoveIntent, { Direction } from '../intent/MoveIntent';
import ConsumeIntent from '../intent/ConsumeIntent';
import AttackIntent from '../intent/AttackIntent';
import {
  selectPowerups,
  getNearestPowerup,
} from '../state-selectors/powerupSelector';
import {
  selectFoods,
  selectWalls,
  selectUserUnit,
  getNearestFood,
  selectEnemyUnits,
  selectNearestEnemyUnit,
} from '../state-selectors';
import runScript from './runScript';

interface ScriptContextMethods {
  move: (direction: Direction) => void;
  attack: (unit: Unit) => void;
  consume: () => void;
}

interface ScriptContextVariables {
  foods: Consumable[];
  walls: GameObject[];
  nearestFood: Consumable;
  userUnit: Unit;
  enemyUnits: Unit[];
  nearestEnemyUnit: Unit;
}

export interface ScriptContext
  extends ScriptContextMethods,
    ScriptContextVariables {
  store: UserStore;
}

/**
 * Executes User Script and records user intents
 * @param userExecutionContext
 * @param state
 */
function recordIntents(
  userExecutionContext: UserExecutionContext,
  state: State
): [Intent[], UserStore, Feedback[]] {
  const intentions: Intent[] = [];
  const foods = selectFoods(state);
  const walls = selectWalls(state);
  const userUnit = selectUserUnit(state, userExecutionContext.unitId);
  const nearestFood = getNearestFood(state, userUnit);
  const enemyUnits = selectEnemyUnits(state, userExecutionContext.unitId);
  const nearestEnemyUnit = selectNearestEnemyUnit(state, userUnit);
  const powerups = selectPowerups(state);
  const nearestPowerup = getNearestPowerup(state, userUnit);

  const variables: ScriptContextVariables = deepClone({
    nearestFood,
    foods,
    walls,
    userUnit,
    enemyUnits,
    nearestEnemyUnit,
    powerups,
    nearestPowerup,
  });

  const methods: ScriptContextMethods = {
    move: (direction: Direction) => {
      intentions.push(new MoveIntent(direction));
    },
    attack: (unit: Unit = nearestEnemyUnit) => {
      intentions.push(new AttackIntent(unit));
    },
    consume: () => {
      intentions.push(new ConsumeIntent());
    },
  };

  const context: ScriptContext = {
    ...methods,
    ...variables,
    store: userExecutionContext.store,
  };

  // This is in place in order to update the store of a given user transparently
  const [store, feedback] = runScript(userExecutionContext.userScript, context);

  return [intentions, store, feedback];
}

export default recordIntents;
