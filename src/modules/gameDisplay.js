import { boardFactory } from "./makeBoard";
import { playerFactory } from "./makePlayer";
import { shipFactory } from "../makeShips";

function displayGame(boardName, boardRows, audience) {

  const boardContainer = document.getElementById('board-container');

  function addSpaces(row, rowNumber) {
    for(let x = 0; x < 10; x++) {
      const space = document.createElement('div');
      space.classList.add('space');
      row.appendChild(space);
      displayStatus(space, rowNumber, x)
    }
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
      case 'missed': div.classList.add('missed');
        break;
      case 'hit': div.classList.add('hit');
        break;
    }
  }
  function buildBoard() {
    const gameBoard = document.createElement('div');
    gameBoard.classList.add('gameboard');
    gameBoard.id = boardName;
    boardContainer.appendChild(gameBoard);
    for(let i = 0; i < 10; i++) {
      const row = document.createElement('div');
      row.classList.add('row');
      row.id = `board-${i}`;
      addSpaces(row, i);
      gameBoard.appendChild(row);
    }
  } // add 'ship' spaces to openspaces for guess

  buildBoard(boardName);
}
export { displayGame };