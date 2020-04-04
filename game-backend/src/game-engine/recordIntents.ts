import vm, { Context, Script } from 'vm';
import {
  UserScript,
  UserExecutionContext,
  State,
  Food,
  Unit,
} from '@darwin/types';
import deepClone from '../helper/deepClone';
import { Intent } from './intent/Intent';
import MoveIntent, { Direction } from './intent/MoveIntent';
import ConsumeIntent from './intent/ConsumeIntent';
import { selectFoods, selectUserUnit, getNearestFood } from './state-selectors';
import selectPowerUps from './state-selectors/powerUpSelector';

interface ScriptContextMethods {
  move: (direction: Direction) => void;
  consume: () => void;
}

interface ScriptContextVariables {
  foods: Food[];
  nearestFood: Food;
  userUnit: Unit;
}

export interface ScriptContext
  extends ScriptContextMethods,
    ScriptContextVariables {}

function createGameContext(context: ScriptContext): Context {
  return vm.createContext(context);
}

/**
 * Run given script in context, throws exception if execution fails.
 * The script is not sandboxed in a secure manner.
 * @param userScript
 * @param context
 */
function runScript(userScript: UserScript, context: Context): void {
  const script = new Script(userScript.script);
  script.runInContext(context, {
    // arbitrary number
    timeout: 20,
    breakOnSigint: true,
  });
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
  const powerUps = selectPowerUps(state);
  const userUnit = selectUserUnit(state, userExecutionContext.unitId);
  const nearestFood = getNearestFood(state, userUnit);

  const variables: ScriptContextVariables = deepClone({
    nearestFood,
    foods,
    powerUps,
    userUnit,
  });

  const methods: ScriptContextMethods = {
    move: (direction: Direction) => {
      intentions.push(new MoveIntent(direction));
    },
    consume: () => {
      intentions.push(new ConsumeIntent());
    },
  };

  const context = createGameContext({
    ...methods,
    ...variables,
  });
  runScript(userExecutionContext.userScript, context);

  return intentions;
}

export default recordIntents;
