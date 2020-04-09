import { AttributeName, INITIAL_ATTRIBUTES } from '@darwin/types';
import { updateAttribute } from './attribute';
import { createUnit } from './gameObjects';

describe('updateAttribute', () => {
  const normalUnit = createUnit({ id: 'unit', position: { x: 0, y: 0 } });
  const maxedUnit = createUnit({
    id: 'unit',
    position: { x: 0, y: 0 },
    attributes: { ...INITIAL_ATTRIBUTES, enduranceBoost: 2 },
  });
  const nerfedUnit = createUnit({
    id: 'unit',
    position: { x: 0, y: 0 },
    attributes: { ...INITIAL_ATTRIBUTES, enduranceBoost: -2 },
  });

  it('should update attributes value of unit', () => {
    const { value, hasChanged } = updateAttribute(
      normalUnit,
      AttributeName.EnduranceBoost,
      v => v + 1
    );
    expect(value).toBe(1);
    expect(hasChanged).toBe(true);
  });

  it('should respect upper value boundaries', () => {
    const { value, hasChanged } = updateAttribute(
      maxedUnit,
      AttributeName.EnduranceBoost,
      v => v + 1
    );
    expect(value).toBe(2);
    expect(hasChanged).toBe(false);
  });

  it('should respect lower value boundaries', () => {
    const { value, hasChanged } = updateAttribute(
      nerfedUnit,
      AttributeName.EnduranceBoost,
      v => v - 1
    );
    expect(value).toBe(-2);
    expect(hasChanged).toBe(false);
  });
});
