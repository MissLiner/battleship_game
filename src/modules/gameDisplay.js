import { boardFactory } from "./makeBoard";
import { playerFactory } from "./makePlayer";
import { shipFactory } from "./makeShips";
import { takeTurn } from "../index";

function displayGame(board, boardRows, audience) {

  const boardContainer = document.getElementById('board-container');
  
  if(boardContainer.childElementCount === 3) {
    boardContainer.removeChild(boardContainer.lastChild);
  }

  function displayStatus(div, row, column) {
    const spaceStatus = boardRows[row][column];
    if(audience === 'private') {
      div.classList.add(spaceStatus);
    } else {
      if(spaceStatus === 'open' || spaceStatus === 'miss' || spaceStatus === 'hit') {
        div.classList.add(spaceStatus);
      } else {
        div.classList.add('open');
      }
    }
    
    // switch(spaceStatus) {
    //   case 'open': div.classList.add('open');
    //     break;
    //   case 'miss': div.classList.add('miss');
    //     break;
    //   case 'hit': div.classList.add('hit');
    //     break;
    //   case 'ship': if(audience === 'public') {
    //     div.classList.add('open'); 
    //   } else if(audience === 'private') {
    //     div.classList.add('ship'); 
    //   }
    //   break;
    }
  function addSpace(row, rowNumber) {
    for(let x = 0; x < 10; x++) {
      const space = document.createElement('div');
      space.classList.add('space');
      space.dataset.rowCoord = rowNumber;
      space.dataset.columnCoord = x;
      row.appendChild(space);
      displayStatus(space, rowNumber, x);
    }
  }
  function buildBoard() {
    
    const gameBoard = document.createElement('div');
    gameBoard.classList.add('gameboard');
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