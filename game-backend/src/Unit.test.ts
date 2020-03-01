import Unit from './Unit';

test('Unit JSON serialization is correct', () => {
  const unit = new Unit();
  const unitAsJSONString = JSON.stringify(unit);
  const unitAsJSON = JSON.parse(unitAsJSONString);
  expect(unitAsJSON.type).toBe('Unit');
  expect(unitAsJSON.position.x).toBeGreaterThanOrEqual(0);
  expect(unitAsJSON.position.x).toBeLessThanOrEqual(20);
  expect(unitAsJSON.position.y).toBeGreaterThanOrEqual(0);
  expect(unitAsJSON.position.y).toBeLessThanOrEqual(20);
});
