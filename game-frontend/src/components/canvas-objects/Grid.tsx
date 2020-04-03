import React, { FC } from 'react';
import { Position } from '@darwin/types';
import Field from './Field';

type Props = {
  numberOfRows: number;
  numberOfColumns: number;
  scaleFactor: number;
};

const Grid: FC<Props> = ({ numberOfRows, numberOfColumns, scaleFactor }) => {
  const fields: Position[] = [];

  for (let row = 0; row < numberOfRows; row++) {
    for (let col = 0; col < numberOfColumns; col++) {
      fields.push({
        x: row * scaleFactor,
        y: col * scaleFactor,
      });
    }
  }

  return (
    <>
      {fields.map(field => (
        <Field
          key={`${field.x}-${field.y}`}
          position={field}
          scaleFactor={scaleFactor}
        />
      ))}
    </>
  );
};

export default Grid;
