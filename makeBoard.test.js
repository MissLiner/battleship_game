const makeBoard = require ('./src/makeBoard');
const makeShips = require('./src/makeShips');

import { mockRandom, resetMockRandom } from 'jest-mock-random';

describe('makeBoard tests', () => {
  const testBoard = makeBoard.boardFactory(10, 10);
  test('getRandomInt returns number between 0 and maxNum', () => {
    for (let i = 0; i < 10; i++) {
      expect(testBoard.getRandomInt(10)).toBeLessThan(11);
    }
  })
  test('assigns two numbers for ship position', () => {
    expect(testBoard.positionShip(5, 'horizonal')).toEqual({ row: expect.any(Number), column: expect.any(Number)});
  })
  test('draws correct number of rows', () => {
    expect(testBoard.rows.length).toBe(10);
  })
  test('draws correct number of columns', () => {
    expect(testBoard.rows[0].length).toBe(10);
  })
  test('throws error of ship placed off of board', () => {
    expect(() => {
      testBoard.checkIfOnBoard(111, 'right');
    }).toThrow();
  })
  test('places horizontal ship on board', () => {
    const testShip = makeShips.shipFactory('caroline', 2, [3, 3], 'horizontal');
    testBoard.placeShip(testShip, testBoard);
    expect(testBoard.rows[3]).toStrictEqual(['o', 'o', 'o', 's', 's', 'o', 'o', 'o', 'o', 'o']);
  })
  
  describe('armada tests', () => {  
    const testArmada = [];
    testBoard.buildArmada('testPlayer', testArmada);

    test('armada is an array of objects', () => {
      expect(testArmada[2]).toStrictEqual(expect.any(Object));
    })
    test('armada array.length is 5', () => {
      expect(testArmada.length).toBe(5);
    })
    test('dupe check - with dupes', () => {
      const testArr = [{ "row": 1, "column": 2 }, { "row": 2, "column": 3}, { "row": 1, "column": 2 }];
        expect(testBoard.checkForDupes(testArr, 'row', 'column')).toBe(true);
    })
    test('dupe check - no dupes', () => {
      const testArr = [{ "row": 4, "column": 2}, { "row": 2, "column": 3}, { "row": 1, "column": 2 }];
        expect(testBoard.checkForDupes(testArr, 'row', 'column')).toBe(false);
    })
  })
})


