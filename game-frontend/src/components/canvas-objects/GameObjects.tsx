import React from 'react';
import Unit from './Unit';
import { ObjectId, GameObject } from '../../../../darwin-types/GameObject';

type Props = {
  objectIds: ObjectId[];
  objectMap: Record<ObjectId, GameObject>;
  scaleFactor: number;
};

function GameObjects({
  objectIds,
  objectMap,
  scaleFactor,
}: Props): JSX.Element {
  return (
    <>
      {objectIds.map(objectId => {
        const { position } = objectMap[objectId];
        return (
          <Unit
            position={{
              x: position.x + scaleFactor,
              y: position.y + scaleFactor,
            }}
            key={objectId}
          />
        );
      })}
    </>
  );
}

export default GameObjects;
