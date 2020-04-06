import React, { FC } from 'react';
import {
  GameObject,
  ObjectId,
  Unit as UnitT,
  Consumable as ConsumableT,
  GameObjectTypes,
} from '@darwin/types';
import Unit from './Unit';
import Food from './Food';
import PowerUp from './Powerup';

type Props = {
  objectIds: ObjectId[];
  objectMap: Record<ObjectId, GameObject>;
  ownUnitId: ObjectId;
  scaleFactor: number;
};

const sortLayerConfig: Record<GameObjectTypes, number> = {
  unit: 2,
  food: 1,
  enduranceBoost: 1,
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
          case GameObjectTypes.Unit: {
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
          case GameObjectTypes.Food: {
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
          case GameObjectTypes.EnduranceBoost: {
            const powerup = gameObject as ConsumableT;
            return <PowerUp key={powerup.id} consumable={powerup} />;
          }
          default:
            return null;
        }
      })}
  </>
);
export default GameObjects;
