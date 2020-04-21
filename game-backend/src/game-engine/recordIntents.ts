import ivm from 'isolated-vm';
import {
  UserScript,
  UserExecutionContext,
  State,
  Consumable,
  Unit,
  UserStore,
} from '@darwin/types';
import deepClone from '../helper/deepClone';
import { Intent } from './intent/Intent';
import MoveIntent, { Direction } from './intent/MoveIntent';
import ConsumeIntent from './intent/ConsumeIntent';
import {
  selectPowerups,
  getNearestPowerup,
} from './state-selectors/powerupSelector';
import {
  selectFoods,
  selectUserUnit,
  getNearestFood,
  selectEnemyUnits,
  selectNearestEnemyUnit,
} from './state-selectors';

interface ScriptContextMethods {
  move: (direction: Direction) => void;
  consume: () => void;
}

interface ScriptContextVariables {
  foods: Consumable[];
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
 * Run given script in context, throws exception if execution fails.
 * The script is not sandboxed in a secure manner.
 * @param userScript
 * @param context
 */
function runScript(userScript: UserScript, scriptContext: ScriptContext): void {
  const isolate = new ivm.Isolate({ memoryLimit: 8 });
  const context = isolate.createContextSync();

  // Provide global object
  const jail = context.global;
  jail.setSync('global', jail.derefInto());

  context.evalClosureSync(
    `$0.copySync().forEach((name) => {
        global[name] = function(...args) {
          $1.getSync(name).applySync(undefined, args, { arguments: { copy: true } })
        }
      });
      `,
    [Object.keys(scriptContext), scriptContext],
    { arguments: { reference: true } }
  );

  const script = isolate.compileScriptSync(userScript.script);

  script.runSync(context, { timeout: 20 });
  script.release();
  context.release();
}

/**
 * Executes User Script and records user intents
 * @param userScript
 */
function recordIntents(
  userExecutionContext: UserExecutionContext,
  state: State
): Intent[] {
  const intentions: Intent[] = [];
  const foods = selectFoods(state);
  const userUnit = selectUserUnit(state, userExecutionContext.unitId);
  const nearestFood = getNearestFood(state, userUnit);
  const enemyUnits = selectEnemyUnits(state, userExecutionContext.unitId);
  const nearestEnemyUnit = selectNearestEnemyUnit(state, userUnit);
  const powerups = selectPowerups(state);
  const nearestPowerup = getNearestPowerup(state, userUnit);

  const variables: ScriptContextVariables = deepClone({
    nearestFood,
    foods,
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
    consume: () => {
      intentions.push(new ConsumeIntent());
    },
  };

  const context: ScriptContext = {
    ...methods,
    ...variables,
    store: userExecutionContext.store,
  };
  runScript(userExecutionContext.userScript, context);

  return intentions;
}

export default recordIntents;
