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
    testBoard.buildArmada('testPlayer');

    test('armada is an array of objects', () => {
      expect(testBoard.getArmada()[2]).toStrictEqual(expect.any(Object));
    })
    test('armada array.length is 5', () => {
      expect(testBoard.getArmada().length).toBe(5);
    })
    test('armada has 17 positions', () => {
      expect(testBoard.getAllShipPositions(testBoard.getArmada()).length).toBe(17);
    })
    test('armada ship hit() works', () => {
      testBoard.getArmada()[1].hit();
      expect(testBoard.getArmada()[1].getHits()).toBe(1);
    })
    test('board sends hit to ship',() => {
      testBoard.hitShip(testBoard.getArmada()[2].getPositions()[0], testArmada);
      expect(testBoard.getArmada()[2].getHits()).toBe(1);
    })
    test('ship doesn\'t sink on first hit',() => {
      testBoard.hitShip(testBoard.getArmada()[2].getPositions()[0], testArmada);
      expect(testBoard.getArmada()[2].getStatus()).toBe('afloat');
    })
    test.only('board sinks ship', () => {
      testBoard.hitShip(testBoard.getArmada()[0].getPositions()[0]);
      testBoard.hitShip(testBoard.getArmada()[0].getPositions()[1]);
      expect(testBoard.getArmada()[0].getStatus()).toBe('sunk');
    })
    test.only('armada sinks', () => {
      const testLengthArray = [ 1, 2, 3, 4 ];
      let testCounter = 10;
      expect(testBoard.checkIfAllSunk(testLengthArray, testCounter)).toBe('sunk');
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
      expect(testBoard.getArmada()[1].getPositions()[1].row).not.toBeNaN();
      expect(testBoard.getArmada()[1].getPositions()[1].column).not.toBeNaN();
    })

    describe('ship placement tests', () => {
      test('ship has as many positions as length', () => {
        expect(testBoard.getArmada()[1].getPositions().length).toStrictEqual(testBoard.getArmada()[1].size);
      }) 
      test('places horizontal ship on board', () => {
      const testShipPositions = [ { row: 2, column: 6 }, { row: 2, column: 7 }];
      testBoard.placeShip(testShipPositions);
      expect(testBoard.rows[2]).toStrictEqual(['open', 'open', 'open', 'open', 'open', 'open', 'ship', 'ship', 'open', 'open']);
      })
    })
  })
})