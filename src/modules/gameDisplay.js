import { boardFactory } from "./makeBoard";
import { playerFactory } from "./makePlayer";
import { shipFactory } from "./makeShips";
import { takeTurn } from "../index";

function displayGame(board1, board2) {
  //console.log(board1.rows);
  const boardBox1 = document.getElementById('board-box-1');
  const boardBox2 = document.getElementById('board-box-2');
  
  function displayBoard(board, boardBox, audience) {
    //console.log(board.rows);
    if(boardBox.childElementCount === 3) {
      boardBox.removeChild(boardBox.lastChild);
    }

    function displayStatus(div, row, column) {
      const spaceStatus = board.rows[row][column];
      div.classList.add(spaceStatus);
      // if(audience === 'private') {
      //   div.classList.add(spaceStatus);
      // } else {
      //   if(spaceStatus === 'open' || spaceStatus === 'miss' || spaceStatus === 'hit') {
      //     div.classList.add(spaceStatus);
      //   } else {
      //     div.classList.add('open');
      //   }
      // }
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
      boardBox.appendChild(gameBoard);
      for(let i = 0; i < 10; i++) {
        const row = document.createElement('div');
        row.classList.add('row');
        addSpace(row, i);
        gameBoard.appendChild(row);
      }
    }
    buildBoard();
  }
  displayBoard(board1, boardBox1, 'private');
  displayBoard(board2, boardBox2, 'public');
}
export { displayGame };