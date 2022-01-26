
const makeShips = require('./src/makeShips');
import { mockRandom, resetMockRandom } from 'jest-mock-random';

describe('makeShips tests', () => {
  const testShip = makeShips.shipFactory('testPlayer', 5);
  
  test('ship has no initial position', () => {
    expect(testShip.getPositions()).not.toBeDefined();
  })
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
  describe.only('position tests', () => {
    mockRandom(0.1, 0.4, 0.5); // horizontal, row: 4, column: 5
    testShip.positionShip();

    test('assigns initial direction', () => {
      expect(testShip.getDirection()).toBe('horizontal');
    })
    test('ship position is two numbers', () => {
    expect(testShip.getPositions()[0].row).toEqual(expect.any(Number));
    })
    test('creates correct # of positions', () => {
      expect(testShip.getPositions().length).toBe(5);
    })
    test('horizontal ship has same row positions', () => {
      expect(testShip.getPositions()[1].row).toEqual(testShip.getPositions()[3].row);
    })
  })

  // test.only('ship flips direction', () => {
  //   testShip.flip();
  //   expect(testShip.getDirection()).toBe('vertical');
  // })

  test('ship checks for duplicate positions', () => {

  })
})