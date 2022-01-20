
const makeShips = require('./makeShips');

describe('makeShips tests', () => {
  const testShip = makeShips.shipFactory('testPlayer', 5, [4, 2], 'vertical')
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
})