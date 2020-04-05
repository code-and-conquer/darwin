import hyperid from 'hyperid';
import { Position, Consumable } from '@darwin/types';
import createFood from './createFood';

const generateId = hyperid();

const spawnResource = (position: Position): Consumable => {
  const resource = createFood({
    id: generateId(),
    position,
  });
  return resource;
};

export default spawnResource;
