import { State, GAME_OBJECT_TYPES, PowerUp } from '@darwin/types';

import { getGameObjectsPerType } from '../../helper/gameObjects';

const selectPowerUps = (state: State): PowerUp[] => {
  return getGameObjectsPerType<PowerUp>(state, GAME_OBJECT_TYPES.POWER_UP);
};

export default selectPowerUps;
