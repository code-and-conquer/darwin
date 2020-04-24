import ivm from 'isolated-vm';
import { UserScript, UserStore } from '@darwin/types';
import { ScriptContext } from './recordIntents';

const MAX_MEMORY_MB = 8;
const MAX_EXECUTION_TIME_MS = 20;

/**
 * Run given script with context, throws exception if execution fails.
 * The script execution is sandboxed in a secure manner.
 * @param userScript
 * @param scriptContext
 */
export default function runScript(
  userScript: UserScript,
  scriptContext: ScriptContext
): UserStore {
  const isolate = new ivm.Isolate({ memoryLimit: MAX_MEMORY_MB });
  const context = isolate.createContextSync();

  // Provide global object
  const jail = context.global;
  jail.setSync('global', jail.derefInto());

  const functionKeys = Object.entries(scriptContext)
    .filter(([, value]) => typeof value === 'function')
    .map(([name]) => name);

  context.evalClosureSync(
    `
    $0.copySync().forEach((name) => {
      global[name] = function(...args) {
        $1.getSync(name).applySync(undefined, args, { arguments: { copy: true } });
      }
    });
    `,
    [functionKeys, scriptContext],
    { arguments: { reference: true } }
  );

  const objectKeys = Object.entries(scriptContext)
    .filter(([, value]) => typeof value !== 'function')
    .map(([name]) => name);

  context.evalClosureSync(
    `
     $0.copySync().forEach((name) => {
       global[name] = $1.getSync(name).copySync();
     }); 
    `,
    [objectKeys, scriptContext],
    { arguments: { reference: true } }
  );

  const script = isolate.compileScriptSync(userScript.script);
  script.runSync(context, { timeout: MAX_EXECUTION_TIME_MS });

  const store = jail.getSync('store').copySync();

  // cleanup
  script.release();
  context.release();
  isolate.dispose();

  return store;
}
