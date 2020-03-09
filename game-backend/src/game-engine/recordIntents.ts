import vm, { Context, Script } from 'vm';
import { Intent } from './intent/Intent';
import MoveIntent, { Direction } from './intent/MoveIntent';
import { UserScript } from '../../../darwin-types/UserContext';

export interface ScriptContext {
  move: (direction: Direction) => void;
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
function recordIntents(userScript: UserScript): Intent[] {
  const intentions: Intent[] = [];
  const context = createGameContext({
    move: (direction: Direction) => {
      intentions.push(new MoveIntent(direction));
    },
  });
  runScript(userScript, context);

  return intentions;
}

export default recordIntents;
