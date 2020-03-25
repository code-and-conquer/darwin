import { State } from '../../../darwin-types/State';
import { UserExecutionContext } from '../../../darwin-types/UserContext';
import recordIntents from './recordIntents';
import scheduleIntents from './scheduleIntents';
import { UserTickIntents } from './intent/Intent';
import handleFoodSpawning from './food-spawner';
import { UnitType, Unit } from '../../../darwin-types/game-objects/Unit';
import {
  GAME_OBJECT_TYPES,
  GameObject,
} from '../../../darwin-types/game-objects/GameObject';
import { HEALTH_LOSS_RATE } from '../constants/gameObjects';
import produce from '../../src/helper/produce';
import { ObjectId } from '../../../darwin-types/game-objects/GameObject';
import { updateHealth } from './health-mechanics/unitUtils';

const handleGameMechanics = (state: State, userTicks: UserTickIntents[]) =>
  handleFoodSpawning(updateHealth(scheduleIntents(state, userTicks)));

/**
 * Executes all given user scripts and returns the next state object.
 *
 * @param state
 * @param scripts
 */
function performTick(state: State, scripts: UserExecutionContext[]): State {
  const userTicks = scripts.map(
    (executionContext): UserTickIntents => {
      try {
        const intents = recordIntents(executionContext, state);
        return {
          context: executionContext,
          intents,
        };
      } catch (e) {
        // assume no intents in case of script error
        return {
          context: executionContext,
          intents: [],
        };
      }
    }
  );
  return handleGameMechanics(state, userTicks);
}

export default performTick;
