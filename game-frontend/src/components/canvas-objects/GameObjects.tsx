import React, { FC } from 'react';
import {
  GameObject,
  ObjectId,
  Unit as UnitT,
  Consumable as ConsumableT,
  GAME_OBJECT_TYPES,
} from '@darwin/types';
import Unit from './Unit';
import Food from './Food';

type Props = {
  objectIds: ObjectId[];
  objectMap: Record<ObjectId, GameObject>;
  ownUnitId: ObjectId;
  scaleFactor: number;
};

const sortLayerConfig: Record<GAME_OBJECT_TYPES, number> = {
  unit: 2,
  food: 1,
  endurancePowerup: 1,
};

const GameObjects: FC<Props> = ({
  objectIds,
  objectMap,
  ownUnitId,
  scaleFactor,
}) => (
  <>
    {objectIds
      .map(objectId => objectMap[objectId])
      .sort((a, b) =>
        sortLayerConfig[a.type] > sortLayerConfig[b.type] ? 1 : -1
      )
      .map((gameObject): JSX.Element | null => {
        switch (gameObject.type) {
          case GAME_OBJECT_TYPES.UNIT: {
            const unit = gameObject as UnitT;
            return (
              <Unit
                key={unit.id}
                health={unit.health}
                position={{
                  x: unit.position.x * scaleFactor,
                  y: unit.position.y * scaleFactor,
                }}
                isOwn={unit.id === ownUnitId}
              />
            );
          }
          case GAME_OBJECT_TYPES.FOOD: {
            const food = gameObject as ConsumableT;
            return (
              <Food
                key={food.id}
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
