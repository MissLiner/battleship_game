const makePlayer = require('../modules/makePlayer');
const makeBoard = require('../modules/makeBoard')

import { mockRandom, resetMockRandom } from 'jest-mock-random';

describe('makePlayer tests', () => {
  const testBoard1 = makeBoard.boardFactory();
  const testBoard2 = makeBoard.boardFactory();
  const testBoard3 = makeBoard.boardFactory();

  const testPlayer1 = makePlayer.playerFactory('Hal', true, testBoard2);
  const testPlayer2 = makePlayer.playerFactory('Nemesis', true, testBoard1);
  const testPlayer3 = makePlayer.playerFactory('Human', false, testBoard3);

  test.only('shipCounter works - one ship', () => {
    testPlayer3.placeShip( { row: 0, column:0 }, 'horizontal');
    expect(testPlayer3.getShipCounter()).toBe(1);
  })
  test.only('shipCounter works - armada', () => {
    testPlayer3.autoBuildArmada();
    expect(testPlayer3.getShipCounter()).toBe(5);
  })


  describe('armada tests', () => { 

    testBoard1.placeArmada(testPlayer1.getArmada());
    testBoard2.placeArmada(testPlayer2.getArmada());
  
    test('armada is an array of objects', () => {
      expect(testPlayer1.getArmada()[2]).toStrictEqual(expect.any(Object));
    })
    test('armada array.length is 5', () => {
      expect(testPlayer1.getArmada().length).toBe(5);
    })
    test('armada has 17 positions', () => {
      expect(testPlayer1.getAllShipPositions().length).toBe(17);
    })
    test('armada ship hit() works', () => {
      testPlayer1.getArmada()[1].hit();
      expect(testPlayer1.getArmada()[1].getHits()).toBe(1);
    })
    test('board sends hit to ship',() => {
      oppBoard.hitShip(testPlayer1.getArmada()[2].getPositions()[0], testPlayer1);
      expect(testPlayer1.getArmada()[2].getHits()).toBe(1);
    })
    test('ship doesn\'t sink on first hit',() => {
      oppBoard.hitShip(testPlayer1.getArmada()[2].getPositions()[0], testPlayer1);
      expect(testPlayer1.getArmada()[2].getStatus()).toBe('afloat');
    })
    test('board sinks ship', () => {
      oppBoard.hitShip(testPlayer1.getArmada()[0].getPositions()[0], testPlayer1);
      oppBoard.hitShip(testPlayer1.getArmada()[0].getPositions()[1], testPlayer1);
      expect(testPlayer1.getArmada()[0].getStatus()).toBe('sunk');
    })
  
    test('dupe check - with dupes', () => {
      const testArr = [{ "row": 1, "column": 2 }, { "row": 2, "column": 3}, { "row": 1, "column": 2 }];
        expect(testPlayer1.checkForDupes(testArr)).toBe(true);
    })
    test('dupe check - no dupes', () => {
      const testArr = [{ "row": 4, "column": 2}, { "row": 2, "column": 3}, { "row": 1, "column": 2 }];
        expect(testPlayer1.checkForDupes(testArr)).toBe(false);
    })
    test('assigns initial direction', () => {
      mockRandom([0.1]);
      expect(testPlayer1.pickDirection()).toBe('vertical');
      resetMockRandom();
    })
  })
})
