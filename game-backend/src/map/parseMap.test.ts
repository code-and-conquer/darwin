import parseMap from './parseMap';

describe('parseMap', () => {
  it('should ignore dots and build walls', () => {
    const sampleMap = ['w..................w', '..ww............ww..'];
    const wallPositions = parseMap(sampleMap);

    expect(wallPositions.length).toBe(6);
    expect(wallPositions[0].x).toBe(0);
    expect(wallPositions[1].x).toBe(19);
    expect(wallPositions[3].y).toBe(1);
    expect(wallPositions[3].x).toBe(3);
  });
});
