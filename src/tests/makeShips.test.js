
const makeShips = require('../makeShips');
const makePlayer = require('../modules/makePlayer');
const makeBoard = require('../modules/makeBoard')

import { mockRandom, resetMockRandom } from 'jest-mock-random';

describe('makeShips tests', () => {
  const testShip = makeShips.shipFactory('testPlayer', 5, { row: 1, column: 3 }, 'horizontal');
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
})
