import vm, { Context, Script } from 'vm';
import { Intent } from './intent/Intent';
import MoveIntent, { Direction } from './intent/MoveIntent';
import ConsumeIntent from './intent/ConsumeIntent';
import {
  UserScript,
  UserExecutionContext,
} from '../../../darwin-types/UserContext';
import { State } from '../../../darwin-types/State';
import { selectFoods, selectUserUnit } from './state-selectors';
import { Food } from '../../../darwin-types/game-objects/Food';
import { Unit } from '../../../darwin-types/game-objects/Unit';

export interface ScriptContext {
  move: (direction: Direction) => void;
  consume: () => void;
  foods: Food[];
  userUnit: Unit;
}

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
  const userUnit = selectUserUnit(state, userExecutionContext.unitId);
  const context = createGameContext({
    move: (direction: Direction) => {
      intentions.push(new MoveIntent(direction));
    },
    consume: () => {
      intentions.push(new ConsumeIntent());
    },
    foods,
    userUnit,
  });
  runScript(userExecutionContext.userScript, context);

  return intentions;
}

export default recordIntents;
