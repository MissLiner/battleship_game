const makePlayer = require('../modules/makePlayer');
const makeBoard = require('../modules/makeBoard')

describe('armada tests', () => { 
  const oppBoard = makeBoard.boardFactory();
  const testBoard = makeBoard.boardFactory();
  const testAIPlayer = makePlayer.playerFactory('Hal', true, oppBoard, testBoard);
  const testAIPlayer2 = makePlayer.playerFactory('Nemsis', true, testBoard, oppBoard);
  testBoard.placeArmada(testAIPlayer.getArmada());
  oppBoard.placeArmada(testAIPlayer2.getArmada());

  test('armada is an array of objects', () => {
    expect(testAIPlayer.getArmada()[2]).toStrictEqual(expect.any(Object));
  })
  test('armada array.length is 5', () => {
    expect(testAIPlayer.getArmada().length).toBe(5);
  })
  test('armada has 17 positions', () => {
    expect(testAIPlayer.getAllShipPositions().length).toBe(17);
  })
  test('reports 83 open spaces after armada placement', () => {
    expect(testAIPlayer.findOpenSpaces().length).toBe(83);
  })
  test('armada ship hit() works', () => {
    testAIPlayer.getArmada()[1].hit();
    expect(testAIPlayer.getArmada()[1].getHits()).toBe(1);
  })
  test('board sends hit to ship',() => {
    oppBoard.hitShip(testAIPlayer.getArmada()[2].getPositions()[0]);
    expect(testAIPlayer.getArmada()[2].getHits()).toBe(1);
  })
  test('ship doesn\'t sink on first hit',() => {
    oppBoard.hitShip(testAIPlayer.getArmada()[2].getPositions()[0]);
    expect(testAIPlayer.getArmada()[2].getStatus()).toBe('afloat');
  })
  test('board sinks ship', () => {
    oppBoard.hitShip(testAIPlayer.getArmada()[0].getPositions()[0]);
    oppBoard.hitShip(testAIPlayer.getArmada()[0].getPositions()[1]);
    expect(testAIPlayer.getArmada()[0].getStatus()).toBe('sunk');
  })

  test('dupe check - with dupes', () => {
    const testArr = [{ "row": 1, "column": 2 }, { "row": 2, "column": 3}, { "row": 1, "column": 2 }];
      expect(testAIPlayer.checkForDupes(testArr)).toBe(true);
  })
  test('dupe check - no dupes', () => {
    const testArr = [{ "row": 4, "column": 2}, { "row": 2, "column": 3}, { "row": 1, "column": 2 }];
      expect(testAIPlayer.checkForDupes(testArr)).toBe(false);
  })
})