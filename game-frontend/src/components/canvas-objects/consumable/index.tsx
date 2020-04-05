import React, { FC } from 'react';
import {
  Consumable as ConsumableT,
  CONSUMABLE_CATEGORIES,
} from '@darwin/types';
import Resource from './resource';
import PowerUp from './power-up';

type Props = {
  consumable: ConsumableT;
};

const Consumable: FC<Props> = ({ consumable }) => {
  switch (consumable.category) {
    case CONSUMABLE_CATEGORIES.RESOURCE:
      return <Resource consumable={consumable} />;
    case CONSUMABLE_CATEGORIES.POWER_UP:
      return <PowerUp consumable={consumable} />;
    default:
      return null;
  }
};

export default Consumable;
