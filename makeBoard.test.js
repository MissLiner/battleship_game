const makeBoard = require ('./makeBoard');
const makeShips = require('./makeShips');

import { mockRandom, resetMockRandom } from 'jest-mock-random';

describe('makeBoard tests', () => {
  const testBoard = makeBoard.boardFactory(10, 10);
  test('getRandomInt returns number between 0 and maxNum', () => {
    for (let i = 0; i < 10; i++) {
      expect(testBoard.getRandomInt(10)).toBeLessThan(11);
    }
  })
  test('assigns two numbers for ship position', () => {
    expect(testBoard.positionShip(5, 'horizonal')).toEqual([expect.any(Number), expect.any(Number)]);
    resetMockRandom();
  })
  test('draws correct number of rows', () => {
    expect(testBoard.rows.length).toBe(10);
  })
  test('draws correct number of columns', () => {
    expect(testBoard.rows[0].length).toBe(10);
  })
  test('throws error of ship placed off of board', () => {
    expect(() => {
      testBoard.checkIfOnBoard(11, 'right');
    }).toThrow();
  })
  test('places horizontal ship on board', () => {
    const testShip = makeShips.shipFactory('caroline', 2, [3, 3], 'horizontal');
    testBoard.placeShip(testShip, testBoard);
    expect(testBoard.rows[3]).toStrictEqual(['o', 'o', 'o', 's', 's', 'o', 'o', 'o', 'o', 'o']);
  })
  test('no duplicate positions', () => {
    
  })
  describe('armada tests', () => {  
    const testArmada = [];
    const testPlayer = 'testPlayer';
    testBoard.buildArmada(testPlayer, testArmada);

    test('armada is an array of objects', () => {
      expect(testArmada[2]).toStrictEqual(expect.any(Object));
    })
    test.only('armada array.length is 5', () => {
      expect(testArmada.length).toBe(5);
    })
  })
})


