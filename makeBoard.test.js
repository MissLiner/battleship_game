const makeBoard = require ('./makeBoard');
import { mockRandom, resetMockRandom } from 'jest-mock-random';

describe('makeBoard tests', () => {
  const testBoard = makeBoard.boardFactory(10, 10);
  test('places ships', () => {
    testBoard.placeShip(1);
    expect(testBoard.board[0]).toBe('s');
  }) 
  test('getRandomInt returns a number', () => {
    expect(testBoard.getRandomInt(50)).toEqual(expect.any(Number));
  })
  test('getRandomInt returns number between 0 and maxNum', () => {
    for (let i = 0; i < 10; i++) {
      expect(testBoard.getRandomInt(50)).toBeLessThan(50);
    }
  })
  test('places ships randomly', () => {
    mockRandom(0.22);
    testBoard.placeShip(1);
    expect(testBoard.board[21]).toBe('s');
    resetMockRandom();
  })
  test.only('draws correct number of rows', () => {
    expect(testBoard.rows.length).toBe(10);
  })
  test.only('draws correct number of columns', () => {
    expect(testBoard.rows[0].length).toBe(10);
  })
})
