import { boardFactory } from "./makeBoard";
import { playerFactory } from "./makePlayer";
import { shipFactory } from "../makeShips";
import { takeTurn } from "../index";

function displayGame(board, boardRows, audience) {

  const boardContainer = document.getElementById('board-container');
  if(boardContainer.firstChild) {
    boardContainer.removeChild(boardContainer.firstChild);
  }

  function displayStatus(div, row, column) {
    const spaceStatus = boardRows[row][column];
    switch(spaceStatus) {
      case 'open': div.classList.add('open');
        break;
      case 'ship': if(audience === 'public') {
          div.classList.add('open'); 
        } else if(audience === 'private') {
          div.classList.add('ship'); 
        }
        break;
      case 'miss': div.classList.add('miss');
        break;
      case 'hit': div.classList.add('hit');
        break;
    }
  }
  function addSpace(row, rowNumber) {
    for(let x = 0; x < 10; x++) {
      // if(x === 0) {
      //   const numberSpace = document.createElement('div');
      //   numberSpace.textContent = rowNumber;
      //   numberSpace.classList.add('label-space');
      //   row.appendChild(numberSpace);
      // }
      const space = document.createElement('div');
      space.classList.add('space');

      row.appendChild(space);
      //const columnNumber = x + 1;
      displayStatus(space, rowNumber, x);
    }
  }
  function buildBoard() {
    const gameBoard = document.createElement('div');
    gameBoard.classList.add('gameboard');
    // gameBoard.id = boardName;
    boardContainer.appendChild(gameBoard);
    for(let i = 0; i < 10; i++) {
      const row = document.createElement('div');
      row.classList.add('row');
      row.id = `board-${i}`;

      addSpace(row, i);
      gameBoard.appendChild(row);
    }
  }
  buildBoard(board);
}
export { displayGame };