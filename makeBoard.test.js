const makeBoard = require ('./src/makeBoard');
const makeShips = require('./src/makeShips');

describe('makeBoard tests', () => {
  const testBoard = makeBoard.boardFactory();

  test('draws correct number of rows', () => {
    expect(testBoard.rows.length).toBe(10);
  })
  test('draws correct number of columns', () => {
    expect(testBoard.rows[0].length).toBe(10);
  })
  test('reports all spaces open before armada placement', () => {
    expect(testBoard.findOpenSpaces().length).toBe(100);
  })
  test('marks misses on board', () => {
    testBoard.receiveAttack( { row: 1, column: 2 } );
    expect(testBoard.rows[1][2]).toBe('miss');
  })
})

describe('ship placement tests', () => {
  const testBoard3 = makeBoard.boardFactory();
  test('places horizontal ship on board', () => {
  const testShipPositions = [ { row: 2, column: 6 }, { row: 2, column: 7 }];
  testBoard3.placeShip(testShipPositions);
  expect(testBoard3.rows[2]).toStrictEqual(['open', 'open', 'open', 'open', 'open', 'open', 'ship', 'ship', 'open', 'open']);
  })
})

describe('armada tests', () => { 
  const testBoard2 = makeBoard.boardFactory();
  testBoard2.buildArmada('testPlayer');
  testBoard2.placeArmada();

  test('armada is an array of objects', () => {
    expect(testBoard2.getArmada()[2]).toStrictEqual(expect.any(Object));
  })
  test('armada array.length is 5', () => {
    expect(testBoard2.getArmada().length).toBe(5);
  })
  test('armada has 17 positions', () => {
    expect(testBoard2.getAllShipPositions(testBoard2.getArmada()).length).toBe(17);
  })
  test('reports 83 open spaces after armada placement', () => {
    expect(testBoard2.findOpenSpaces().length).toBe(83);
  })
  test('armada ship hit() works', () => {
    testBoard2.getArmada()[1].hit();
    expect(testBoard2.getArmada()[1].getHits()).toBe(1);
  })
  test('board sends hit to ship',() => {
    testBoard2.hitShip(testBoard2.getArmada()[2].getPositions()[0]);
    expect(testBoard2.getArmada()[2].getHits()).toBe(1);
  })
  test('ship doesn\'t sink on first hit',() => {
    testBoard2.hitShip(testBoard2.getArmada()[2].getPositions()[0]);
    expect(testBoard2.getArmada()[2].getStatus()).toBe('afloat');
  })
  test('board sinks ship', () => {
    testBoard2.hitShip(testBoard2.getArmada()[0].getPositions()[0]);
    testBoard2.hitShip(testBoard2.getArmada()[0].getPositions()[1]);
    expect(testBoard2.getArmada()[0].getStatus()).toBe('sunk');
  })
  test('armada sinks', () => {
    const testLengthArray = [ 1, 2, 3, 4 ];
    let testCounter = 10;
    expect(testBoard2.checkIfAllSunk(testLengthArray, testCounter)).toBe('sunk');
  })
  test('dupe check - with dupes', () => {
    const testArr = [{ "row": 1, "column": 2 }, { "row": 2, "column": 3}, { "row": 1, "column": 2 }];
      expect(testBoard2.checkForDupes(testArr)).toBe(true);
  })
  test('dupe check - no dupes', () => {
    const testArr = [{ "row": 4, "column": 2}, { "row": 2, "column": 3}, { "row": 1, "column": 2 }];
      expect(testBoard2.checkForDupes(testArr)).toBe(false);
  })
  test('ship positions are two numbers', () => {
    expect(testBoard2.getArmada()[1].getPositions()[1].row).not.toBeNaN();
    expect(testBoard2.getArmada()[1].getPositions()[1].column).not.toBeNaN();
  })
  test('ship has as many positions as length', () => {
    expect(testBoard2.getArmada()[1].getPositions().length).toStrictEqual(testBoard2.getArmada()[1].size);
  }) 
})