
const makeShips = require('./src/makeShips');

describe('makeShips tests', () => {
  const testShip = makeShips.shipFactory('testPlayer', 5, [4, 2], 'horizontal')
  test('ship has size', () => {
    expect(testShip.size).toBe(5);
  }) 
  test('ship records hits', () => {
    testShip.hit();
    expect(testShip.getHits()).toBe(1);
  })
  test('ship sinks', () => {
    for (let i = 0; i < 4; i++) { testShip.hit(); }
    expect(testShip.getStatus()).toBe('sunk');
  })
  test('ship position is two numbers', () => {
    expect(testShip.position).toEqual([expect.any(Number), expect.any(Number)]);
  })
})