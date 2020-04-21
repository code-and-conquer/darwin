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
 * @param scriptContext
 */
function runScript(
  userScript: UserScript,
  scriptContext: ScriptContext
): UserStore {
  const isolate = new ivm.Isolate({ memoryLimit: 8 });
  const context = isolate.createContextSync();

  // Provide global object
  const jail = context.global;
  jail.setSync('global', jail.derefInto());

  const objectKeys = Object.entries(scriptContext)
    .filter(([, value]) => typeof value !== 'function')
    .map(([name]) => name);

  const functionKeys = Object.entries(scriptContext)
    .filter(([, value]) => typeof value === 'function')
    .map(([name]) => name);

  context.evalClosureSync(
    `$1.copySync().forEach((name) => {
       global[name] = function(...args) {
         $2.getSync(name).applySync(undefined, args, { arguments: { copy: true } });
       }
     });
     $0.copySync().forEach((name) => {
       global[name] = $2.getSync(name).copySync();
     }); 
    `,
    [objectKeys, functionKeys, scriptContext],
    { arguments: { reference: true } }
  );

  const script = isolate.compileScriptSync(userScript.script);

  script.runSync(context, { timeout: 20 });
  const store = jail.getSync('store').copySync();
  script.release();
  context.release();
  isolate.dispose();
  return store;
}

/**
 * Executes User Script and records user intents
 * @param userExecutionContext
 * @param state
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

  // This is in place in order to update the store of a given user transparently
  // eslint-disable-next-line no-param-reassign
  userExecutionContext.store = runScript(
    userExecutionContext.userScript,
    context
  );

  return intentions;
}

export default recordIntents;
