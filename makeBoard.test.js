const makeBoard = require ('./makeBoard');
import { mockRandom, resetMockRandom } from 'jest-mock-random';

test('makeBoard places ships', () => {
  const board1 = makeBoard.boardFactory();
  board1.placeShip(1);
  expect(board1.board[0]).toBe('s');
}) 
test('getRandomInt returns a number', () => {
  const board2 = makeBoard.boardFactory();
  expect(board2.getRandomInt(50)).toEqual(expect.any(Number));
})
test('getRandomInt returns number between 0 and maxNum', () => {
  const board3 = makeBoard.boardFactory();
  for (let i = 0; i < 10; i++) {
    expect(board3.getRandomInt(50)).toBeLessThan(50);
  }
})
test.only('makeBoard places ships randomly', () => {
  mockRandom(0.22);
  const board2 = makeBoard.boardFactory();
  board2.placeShip(1);
  expect(board2.board[21]).toBe('s');
})