const makeBoard = require ('./src/makeBoard');
const makeShips = require('./src/makeShips');

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

  describe('armada tests', () => {  
    const testArmada = [];
    testBoard.buildArmada('testPlayer', testArmada);

    test('armada is an array of objects', () => {
      expect(testArmada[2]).toStrictEqual(expect.any(Object));
    })
    test('armada array.length is 5', () => {
      expect(testArmada.length).toBe(5);
    })
    test('armada has 17 positions', () => {
      expect(testBoard.getAllShipPositions(testArmada).length).toBe(17);
    })
    test('armada ship hit() works', () => {
      testArmada[1].hit();
      expect(testArmada[1].getHits()).toBe(1);
    })
    test('board sends hit to ship',() => {
      testBoard.hitShip(testArmada[2].getPositions()[0], testArmada);
      expect(testArmada[2].getHits()).toBe(1);
    })
    test('ship doesn\'t sink on first hit',() => {
      testBoard.hitShip(testArmada[2].getPositions()[0], testArmada);
      expect(testArmada[2].getStatus()).toBe('afloat');
    })
    test('board sinks ship', () => {
      testBoard.hitShip(testArmada[0].getPositions()[0], testArmada);
      testBoard.hitShip(testArmada[0].getPositions()[1], testArmada);
      expect(testArmada[0].getStatus()).toBe('sunk');
    })
    test('armada sinks', () => {
      let testStatus = 'afloat';
      const testLengthArray = [ 1, 2, 3, 4 ];
      let testCounter = 10;
      testBoard.checkIfAllSunk(testLengthArray, testCounter, testStatus);
      expect(testStatus).toBe('sunk');
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
      expect(testArmada[1].getPositions()[1].row).not.toBeNaN();
      expect(testArmada[1].getPositions()[1].column).not.toBeNaN();
    })

    describe('ship placement tests', () => {
      test('ship has as many positions as length', () => {
        expect(testArmada[1].getPositions().length).toStrictEqual(testArmada[1].size);
      }) 
      test('adds', () => {
  
      })
      test.only('places horizontal ship on board', () => {
      const testShipPositions = [ { row: 2, column: 6 }, { row: 2, column: 7 }];
      testBoard.placeShip(testShipPositions);
      expect(testBoard.rows[2]).toStrictEqual(['open', 'open', 'open', 'open', 'open', 'open', 'ship', 'ship', 'open', 'open']);
      })
    })
  })
})