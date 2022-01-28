import { boardFactory } from "./makeBoard";
import { playerFactory } from "./makePlayer";
import { shipFactory } from "../makeShips";

function displayGame(board) {

  const boardContainer = document.getElementById('board-container');

  function addSpaces(row) {
    for(let i = 0; i < 10; i++) {
      const space = document.createElement('div');
      space.class = 'space';
      row.appendChild(space);
    }
  }
  function buildBoard(board) {
    const gameBoard = document.createElement('div');
    gameBoard.class = 'gameboard';
    board.id = board;
    boardContainer.appendChild(gameBoard);
    for(let i = 0; i < 10; i++) {
      const row = document.createElement('div');
      row.class = 'row';
      addSpaces(row);
      gameBoard.appendChild(row);
    }
  }
  buildBoard(board);
}
export { displayGame };