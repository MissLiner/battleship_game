const makeBoard = require ('./src/makeBoard');
const makeShips = require('./src/makeShips');

import { mockRandom, resetMockRandom } from 'jest-mock-random';

describe('makeBoard tests', () => {
  const testBoard = makeBoard.boardFactory(10, 10);

  test('draws correct number of rows', () => {
    expect(testBoard.rows.length).toBe(10);
  })
  test('draws correct number of columns', () => {
    expect(testBoard.rows[0].length).toBe(10);
  })
  test('marks misses on board', () => {
    testBoard.receiveAttack( { row: 1, column: 2 } );
    expect(testBoard.rows[1][2]).toBe('miss');
  })

  // test('places horizontal ship on board', () => {
  //   const testShip = makeShips.shipFactory('caroline', 2, [3, 3], 'horizontal');
  //   testBoard.placeShip(testShip, testBoard);
  //   expect(testBoard.rows[3]).toStrictEqual(['o', 'o', 'o', 's', 's', 'o', 'o', 'o', 'o', 'o']);
  // })

  describe('armada tests', () => {  
    const testArmada = [];
    testBoard.buildArmada('testPlayer', testArmada);

    test('armada is an array of objects', () => {
      expect(testArmada[2]).toStrictEqual(expect.any(Object));
    })
    test('armada array.length is 5', () => {
      expect(testArmada.length).toBe(5);
    })
    test.only('getAllPositions works', () => {
      expect(testBoard.getAllShipPositions(testArmada).length).toBe(17);
    })
    test('dupe check - with dupes', () => {
      const testArr = [{ "row": 1, "column": 2 }, { "row": 2, "column": 3}, { "row": 1, "column": 2 }];
        expect(testBoard.checkForDupes(testArr)).toBe(true);
    })
    test('dupe check - no dupes', () => {
      const testArr = [{ "row": 4, "column": 2}, { "row": 2, "column": 3}, { "row": 1, "column": 2 }];
        expect(testBoard.checkForDupes(testArr)).toBe(false);
    })
    test('ship positions are two numbers', () => {
      expect(testArmada[1].positions.row).not.toBeNaN();
      expect(testArmada[1].positions.column).not.toBeNaN();
    })
    describe('ship placement tests', () => {
      test('addPositions returns array of objects', () => {
        const testArray = [];
        const testPositions = testBoard.addPositions(testArmada[2], testArray);
        expect(testPositions[1]).toStrictEqual(expect.any(Object));
      })
      test('ship has as many positions as length', () => {
        expect(testArmada[1].positions.length).toStrictEqual(testArmada[1].size);
      }) 
      test('adds', () => {
  
      })
    })
  })
})


