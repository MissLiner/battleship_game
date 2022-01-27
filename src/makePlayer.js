import { boardFactory } from "./makeBoard"
const playerFactory = (isComputer, turn) => {
  let playerBoard = boardFactory();
  if(isComputer === true) {
    playerBoard.buildArmada();
  }
  function findOpenSpaces(board) {
    const allOpenSpaces = [];
    for(let i = 0; i < 10; i++) {
      for(let x = 0; x < 10; x++) {
        if(board.row[i][x] === 'open') {
          let position = { row: i, column: x };
          allOpenSpaces.push(position);
        }
      }
    }
    return allOpenSpaces;
  }
  function makeGuess(board) {
    const allOpenSpaces = findOpenSpaces(board);
    //pick random space form array
  }
  return { playerBoard, turn };
}
export { playerFactory };