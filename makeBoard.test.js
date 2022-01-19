const makeBoard = require ('./makeBoard');

test.only('makeBoard places ships', () => {
  const board1 = makeBoard.boardFactory();
  board1.placeShip(1);
  expect(board1.board[0]).toBe('s');
}) 