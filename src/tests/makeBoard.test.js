const makeBoard = require ('../modules/makeBoard');
const makeShips = require('../makeShips');

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
  const testBoard2 = makeBoard.boardFactory();

  test('places ship on board', () => {
  const testHorPositions = [ { row: 2, column: 6 }, { row: 2, column: 7 }];
  testBoard2.placeShip(testHorPositions);
  expect(testBoard2.rows[2]).toStrictEqual(['open', 'open', 'open', 'open', 'open', 'open', 'ship', 'ship', 'open', 'open']);
  })
})

test('armada sinks', () => {
  const testLengthArray = [ 1, 2, 3, 4 ];
  let testCounter = 10;
  expect(testBoard2.checkIfAllSunk(testLengthArray, testCounter)).toBe('sunk');
})