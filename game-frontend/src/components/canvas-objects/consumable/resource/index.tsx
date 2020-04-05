import React, { FC } from 'react';
import { Consumable as ConsumableT, CONSUMABLE_SUBTYPES } from '@darwin/types';
import Food from './Food';
import scalePosition from '../../../../helper/scalePosition';

type Props = {
  consumable: ConsumableT;
};

const Resource: FC<Props> = ({ consumable }) => {
  switch (consumable.subType) {
    case CONSUMABLE_SUBTYPES.FOOD:
      return <Food position={scalePosition(consumable.position)} />;
    default:
      return null;
  }
};

export default Resource;
