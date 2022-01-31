
const makeShips = require('../makeShips');
const makePlayer = require('../modules/makePlayer');
const makeBoard = require('../modules/makeBoard')

import { mockRandom, resetMockRandom } from 'jest-mock-random';

describe('makeShips tests', () => {
  const oppBoard = makeBoard.boardFactory();
  const testPlayer = makePlayer.playerFactory('testPlayer', false, oppBoard);
  const testShip = makeShips.shipFactory('testPlayer', 5, { row: 1, column: 3 }, 'horizontal');
  
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
