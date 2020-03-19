import React, { FC } from 'react';
import Unit from './Unit';
import {
  ObjectId,
  GameObject,
} from '../../../../darwin-types/game-objects/GameObject';
import { Unit as UnitT } from '../../../../darwin-types/game-objects/Unit';
import Food from './Food';

type Props = {
  objectIds: ObjectId[];
  objectMap: Record<ObjectId, GameObject>;
  scaleFactor: number;
};

const GameObjects: FC<Props> = ({ objectIds, objectMap, scaleFactor }) => (
  <>
    {objectIds.map((objectId): JSX.Element | null => {
      const gameObject = objectMap[objectId];
      switch (gameObject.type) {
        case 'unit': {
          const unit = gameObject as UnitT;
          return (
            <Unit
              key={objectId}
              health={unit.health}
              position={{
                x: unit.position.x * scaleFactor,
                y: unit.position.y * scaleFactor,
              }}
            />
          );
        }
        case 'food': {
          const food = gameObject as UnitT;
          return (
            <Food
              key={objectId}
              position={{
                x: food.position.x * scaleFactor,
                y: food.position.y * scaleFactor,
              }}
            />
          );
        }
        default:
          return null;
      }
    })}
  </>
);

export default GameObjects;
