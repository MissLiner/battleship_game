const makeBoard = require ('./makeBoard');
import { mockRandom, resetMockRandom } from 'jest-mock-random';

describe('makeBoard tests', () => {
  const testBoard = makeBoard.boardFactory(10, 10);
  test('getRandomInt returns number between 0 and maxNum', () => {
    for (let i = 0; i < 10; i++) {
      expect(testBoard.getRandomInt(10)).toBeLessThan(11);
    }
  })
  test('places ships randomly', () => {
    mockRandom([0.7, 0.3]);
    expect(testBoard.positionShip()).toStrictEqual([6, 2]);
    resetMockRandom();
  })
  test('draws correct number of rows', () => {
    expect(testBoard.rows.length).toBe(10);
  })
  test('draws correct number of columns', () => {
    expect(testBoard.rows[0].length).toBe(10);
  })
  describe('armada tests', () => {  
    const testArmada = [];
    const testPlayer = 'testPlayer';
    testBoard.buildArmada(testPlayer, testArmada);

    test('armada is an array of objects', () => {
      expect(testArmada[2]).toStrictEqual(expect.any(Object));
    })
    test.only('throws error of ship placed off of board', () => {
      expect(testBoard.placeShip([8, 2], 1, 5, testBoard)).toThrow();
    })
    test('adds armada to board', ()=> {
      testBoard.placeArmada(testArmada);
      expect(testBoard.rows).toContain('s');
    })
  })
})


