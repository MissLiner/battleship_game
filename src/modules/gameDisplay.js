import { boardFactory } from "./makeBoard";
import { playerFactory } from "./makePlayer";
import { shipFactory } from "./makeShips";
import { takeTurn } from "../index";

function displayGame(board1, board2) {
  const boardBox1 = document.getElementById('board-box-1');
  const boardBox2 = document.getElementById('board-box-2');

 
  
  function displayBoard(board, boardBox, gameBoardID, audience) {

    if(document.getElementById(gameBoardID)) {
      document.getElementById(gameBoardID).remove();
    }
    function transformSpace(space) {
      let rowNum = space.dataset.rowCoord;
      rowNum = Number(rowNum);
      let colNum = space.dataset.columnCoord;
      colNum = Number(colNum);
      const coord = { row: rowNum, column: colNum };
      return coord;
    }
    function transformCoord(coord) {
      space.dataset.rowCoord = coord[row];
      space.dataset.columnCoord = coord[column];
    }

    function displayStatus(div, row, column) {
      const spaceStatus = board.rows[row][column];
      div.classList.add(spaceStatus);
      const coord = transformSpace(div);
      if(coord === board.getActiveSpace()) {
        div.classList.add('active');
      }
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
    function addAttackListener(div, board) {
      div.addEventListener('click', (e) => {
        const classes = e.target.classList;
        if(classes.contains('space')) {
          if(!classes.contains('miss') && !classes.contains('hit')) {
            const coord = transformSpace(e.target);
            board.updateActiveSpace(coord);
            buildBoard(board);
          } else {
            return;
            // board.updateActiveSpace('');
            // alert(writeErrMessage('dupe'));
          }
        }
      })
    }
    function buildBoard() {
      const gameBoard = document.createElement('div');
      gameBoard.classList.add('gameboard');
      gameBoard.id = gameBoardID;
      if(board.getStatus() === 'active') {
        gameBoard.classList.add('active');
        addAttackListener(gameBoard);
      }
      else if(gameBoard.classList.contains('active')) {
        gameBoard.classList.remove('active');
      }
      boardBox.appendChild(gameBoard);
      for(let i = 0; i < 10; i++) {
        const row = document.createElement('div');
        row.classList.add('row');
        addSpace(row, i);
        gameBoard.appendChild(row);
      }
    }
    buildBoard();
    addAttackListener();
  }
  displayBoard(board1, boardBox1, 'gameboard-1', 'private');
  addAttackListener(document.getElementById('gameboard-1', board1));
  displayBoard(board2, boardBox2, 'gameboard-2', 'public');
  addAttackListener(document.getElementById('gameboard-2', board2));
}
export { displayGame };