import React from 'react';
import { useGameState } from './service/game';
import UnitHealthStatus from './components/unitstatus';
import { Unit as UnitT } from '../../darwin-types/game-objects/Unit';

function UnitProperties(): JSX.Element {
  const gameState = useGameState();

  const units = gameState.objectIds
    .map(id => gameState.objectMap[id])
    .filter(obj => obj.type === 'unit')
    .filter(gameUnit => gameUnit != null);

  const state = {
    size: 100,
    progress: 0,
    strokeWidth: 5,
    circleOneStroke: '#FF0000',
    circleTwoStroke: '#4C9900',
  };

  let unit = null;

  if (units[0] !== undefined) {
    unit = units[0] as UnitT;
  }

  if (!gameState) {
    return <p>Loading</p>;
  }

  return (
    <>{unit ? <UnitHealthStatus {...state} progress={unit.health} /> : null}</>
  );
}

export default UnitProperties;
