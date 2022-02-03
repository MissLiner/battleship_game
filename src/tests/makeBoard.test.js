const makeBoard = require ('../modules/makeBoard');
const makePlayer = require('../modules/makePlayer');
const makeShips = require('../modules/makeShips');

describe('makeBoard tests', () => {
  const testBoard = makeBoard.boardFactory('testBoard');
  const testBoard2 = makeBoard.boardFactory('testBoard2');
  const testPlayer = makePlayer.playerFactory('Hal', true, testBoard);

  test('draws correct number of rows', () => {
    expect(testBoard.rows.length).toBe(10);
  })
  test('draws correct number of columns', () => {
    expect(testBoard.rows[0].length).toBe(10);
  })
  test('marks misses on board', () => {
    testBoard.receiveAttack( { row: 1, column: 2 },  testPlayer);
    expect(testBoard.rows[1][2]).toBe('miss');
  })
  test.only('updates active board status', () => {
    let activeBoard = testBoard;
    testBoard.updateStatus(activeBoard);
    expect(testBoard.getStatus()).toBe('active');
  })
  test.only('updates inactive board status', () => {
    let activeBoard = testBoard;
    testBoard2.updateStatus(activeBoard);
    expect(testBoard2.getStatus()).toBe('inactive');
  })
  test('places ship on board', () => {
    const testHorPositions = [ { row: 2, column: 6 }, { row: 2, column: 7 }];
    testBoard2.drawShip(testHorPositions, 'Submarine');
    expect(testBoard2.rows[2]).toStrictEqual(['open', 'open', 'open', 'open', 'open', 'open', 'Submarine', 'Submarine', 'open', 'open']);
  })
})
  

