import { State } from '@darwin/types';
import produce from '../helper/produce';
import createWall from './createWall';
import { pickRandom } from '../helper/array';
import maps from './maps';

const createMap = (state: State): State => {
  const selectedMap = pickRandom(maps);
  return produce(state, draft => {
    selectedMap.map(createWall).forEach(wall => {
      draft.objectIds.push(wall.id);
      draft.objectMap[wall.id] = wall;
    });
  });
};

export default createMap;
