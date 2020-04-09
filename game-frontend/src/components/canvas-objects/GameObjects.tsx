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
import scalePosition from '../../helper/scalePosition';

type Props = {
  objectIds: ObjectId[];
  objectMap: Record<ObjectId, GameObject>;
  ownUnitId: ObjectId;
};

const sortLayerConfig: Record<GameObjectTypes, number> = {
  unit: 2,
  food: 1,
  enduranceBoost: 1,
};

const GameObjects: FC<Props> = ({ objectIds, objectMap, ownUnitId }) => (
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
                position={scalePosition(unit.position)}
                isOwn={unit.id === ownUnitId}
              />
            );
          }
          case GameObjectTypes.Food: {
            const food = gameObject as ConsumableT;
            return (
              <Food key={food.id} position={scalePosition(food.position)} />
            );
          }
          case GameObjectTypes.EnduranceBoost: {
            return (
              <PowerUp
                key={gameObject.id}
                color={0x05bf96}
                position={scalePosition(gameObject.position)}
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
