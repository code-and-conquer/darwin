import React from "react";
import Position from "../../../../darwin-types/Position";
import Field from "./Field";

type Props = {
  numberOfRows: number;
  numberOfColumns: number;
  scaleFactor: number;
};

function Grid({ numberOfRows, numberOfColumns, scaleFactor }: Props): JSX.Element {
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
          position={field}
          scaleFactor={scaleFactor}
        />
      ))}
    </>
  )
}

export default Grid;