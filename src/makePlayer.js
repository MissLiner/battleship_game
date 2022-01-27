import { boardFactory } from "./makeBoard"
const playerFactory = (isComputer, turn) => {
  let playerBoard = boardFactory();
  if(isComputer === true) {
    playerBoard.buildArmada();
  }
  return { playerBoard, turn };
}
export { playerFactory };