import React, { FC } from 'react';
import Unit from './Unit';
import { Unit as UnitT } from '../../../../darwin-types/game-objects/Unit';
import {
  GameObject,
  ObjectId,
} from '../../../../darwin-types/game-objects/GameObject';
import GAME_OBJECT_TYPES from '../../constants/gameObjects';
import Food from './Food';

type Props = {
  objectIds: ObjectId[];
  objectMap: Record<ObjectId, GameObject>;
  ownUnitId: ObjectId;
  scaleFactor: number;
};

const GameObjects: FC<Props> = ({
  objectIds,
  objectMap,
  ownUnitId,
  scaleFactor,
}) => (
  <>
    {objectIds.map((objectId): JSX.Element | null => {
      const gameObject = objectMap[objectId];
      switch (gameObject.type) {
        case GAME_OBJECT_TYPES.UNIT: {
          const unit = gameObject as UnitT;
          return (
            <Unit
              key={objectId}
              health={unit.health}
              position={{
                x: unit.position.x * scaleFactor,
                y: unit.position.y * scaleFactor,
              }}
              isOwn={objectId === ownUnitId}
            />
          );
        }
        case GAME_OBJECT_TYPES.FOOD: {
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
