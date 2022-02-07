const makeBoard = require ('../modules/makeBoard');
const makePlayer = require('../modules/makePlayer');

describe('makeBoard tests', () => {
  const testBoard = makeBoard.boardFactory('testBoard');
  const testBoard2 = makeBoard.boardFactory('testBoard2');
  const testPlayer = makePlayer.playerFactory('Hal', true, testBoard);
  const testPlayer2 = makePlayer.playerFactory('Human', false, testBoard2);

  test('draws correct number of rows', () => {
    expect(testBoard.rows.length).toBe(10);
  })
  test('draws correct number of columns', () => {
    expect(testBoard.rows[0].length).toBe(10);
  })
  test.only('marks misses on board', () => {
    testBoard2.updateActiveSpace( { row: 0, column: 0 } );
    testBoard2.receiveAttack(testPlayer2);
    expect(testBoard2.rows[0][0]).toBe('miss');
  })
  test('updates active board status', () => {
    let activeBoard = testBoard;
    testBoard.updateStatus(activeBoard);
    expect(testBoard.getStatus()).toBe('active');
  })
  test('updates inactive board status', () => {
    let activeBoard = testBoard;
    testBoard2.updateStatus(activeBoard);
    expect(testBoard2.getStatus()).toBe('inactive');
  })
  test('places ship on board', () => {
    const testHorPositions = [ { row: 2, column: 6 }, { row: 2, column: 7 }];
    testBoard2.placeShip(testHorPositions, 'Submarine');
    expect(testBoard2.rows[2]).toStrictEqual(['open', 'open', 'open', 'open', 'open', 'open', 'Submarine', 'Submarine', 'open', 'open']);
  })
})
  

