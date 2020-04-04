import React, { FC } from 'react';
import {
  GameObject,
  ObjectId,
  Unit as UnitT,
  Food as FoodT,
  PowerUp as PowerUpT,
} from '@darwin/types';
import Unit from './Unit';
import GAME_OBJECT_TYPES from '../../constants/gameObjects';
import Food from './Food';

import PowerUp from './PowerUp';

type Props = {
  objectIds: ObjectId[];
  objectMap: Record<ObjectId, GameObject>;
  ownUnitId: ObjectId;
  scaleFactor: number;
};

const sortLayerConfig = {
  [GAME_OBJECT_TYPES.UNIT]: 2,
  [GAME_OBJECT_TYPES.FOOD]: 1,
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
            const food = gameObject as FoodT;
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
          case GAME_OBJECT_TYPES.POWER_UP: {
            const powerUp = gameObject as PowerUpT;
            return (
              <PowerUp
                key={powerUp.id}
                subType={powerUp.subType}
                position={{
                  x: powerUp.position.x * scaleFactor,
                  y: powerUp.position.y * scaleFactor,
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
