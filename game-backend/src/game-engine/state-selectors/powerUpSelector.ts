import { State, GAME_OBJECT_TYPES, PowerUp } from '@darwin/types';

import { getGameObjectsPerType } from '../../helper/gameObjects';

const selectPowerUps = (state: State): PowerUp[] => {
  return getGameObjectsPerType(state, GAME_OBJECT_TYPES.POWER_UP) as PowerUp[];
};

export default selectPowerUps;
