import React, { FC } from 'react';
import {
  GameObject,
  ObjectId,
  Unit as UnitT,
  Consumable as ConsumableT,
  GAME_OBJECT_TYPES,
} from '@darwin/types';
import Unit from './Unit';

import Consumable from './consumable';
import scalePosition from '../../helper/scalePosition';

type Props = {
  objectIds: ObjectId[];
  objectMap: Record<ObjectId, GameObject>;
  ownUnitId: ObjectId;
  scaleFactor: number;
};

const sortLayerConfig = {
  [GAME_OBJECT_TYPES.UNIT]: 2,
  [GAME_OBJECT_TYPES.CONSUMABLE]: 1,
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
          case GAME_OBJECT_TYPES.UNIT: {
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
          case GAME_OBJECT_TYPES.CONSUMABLE: {
            const consumable = gameObject as ConsumableT;
            console.log('rendering a consumable', consumable);
            return <Consumable key={consumable.id} consumable={consumable} />;
          }
          default:
            return null;
        }
      })}
  </>
);
export default GameObjects;
