
const makeShips = require('../modules/makeShips');

describe('makeShips tests', () => {
  const testShip = makeShips.shipFactory('testPlayer', 5, 
    { row: 1, column: 3 }, 'Horizontal');
  testShip.positionShip();
  
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
  test('row is number', () => {
   expect(testShip.getPositions()[0].row).not.toBeNaN();
  })
  test('each space has two coordinates', () => {
    expect(Object.keys(testShip.getPositions()[0]).length).toBe(2);
  })
  test('creates correct # of positions', () => {
    expect(testShip.getPositions().length).toBe(5);
  })
  test('position is stable', () => {
    expect(testShip.getPositions()).toEqual(testShip.getPositions());
  })
  test('horizontal ship has same row positions', () => {
    expect(testShip.getPositions()[1].row).toEqual(testShip.getPositions()[3].row);
  })
  test('horizontal ship has diff column positions', () => {
    expect(testShip.getPositions()[1].column).not.toEqual(testShip.getPositions()[2].column);
  })
})
