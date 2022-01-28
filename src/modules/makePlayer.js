import { boardFactory } from "./makeBoard"

const playerFactory = (isComputer, turn) => {
  let playerBoard = boardFactory();
  if(isComputer === true) {
    playerBoard.buildArmada();
  }
  function getRandomInt(maxNum) {
    return Math.floor(Math.random() * (maxNum + 1));
  }

  function makeGuess(board) {
    const allOpenSpaces = board.findOpenSpaces();
    const maxNum = allOpenSpaces.length;
    const guess = getRandomInt(maxNum);
    board.receiveAttack(allOpenSpaces[guess]);
  }

  return { playerBoard, turn, makeGuess };
}
export { playerFactory };