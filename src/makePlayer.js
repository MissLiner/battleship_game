import { boardFactory } from "./makeBoard"
const playerFactory = (isComputer, turn) => {
  let playerBoard = boardFactory();
  if(isComputer === true) {
    playerBoard.buildArmada();
  }

  function makeGuess(board) {
    const allOpenSpaces = findOpenSpaces(board);
    //pick random space form array
  }
  return { playerBoard, turn };
}
export { playerFactory };