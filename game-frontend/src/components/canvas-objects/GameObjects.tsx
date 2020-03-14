import React, { FC } from 'react';
import Unit from './Unit';
import { ObjectId, GameObject } from '../../../../darwin-types/GameObject';

type Props = {
  objectIds: ObjectId[];
  objectMap: Record<ObjectId, GameObject>;
  scaleFactor: number;
};

const GameObjects: FC<Props> = ({ objectIds, objectMap, scaleFactor }) => (
  <>
    {objectIds.map(objectId => {
      const { position } = objectMap[objectId];
      return (
        <Unit
          key={objectId}
          position={{
            x: position.x * scaleFactor,
            y: position.y * scaleFactor,
          }}
        />
      );
    })}
  </>
);

export default GameObjects;
