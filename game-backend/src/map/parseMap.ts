import { Position } from '@darwin/types';

const parseMap = (map: string[]): Position[] => {
  return map
    .reduce((positions, row, rowIndex) => {
      return positions.concat(
        ...row.split('').map((field, colIndex) => {
          if (field === 'w') {
            return { x: colIndex, y: rowIndex };
          }
          return undefined;
        })
      );
    }, [])
    .filter(Boolean);
};

export default parseMap;
