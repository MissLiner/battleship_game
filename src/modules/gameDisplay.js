import { boardFactory } from "./makeBoard";
import { playerFactory } from "./makePlayer";
import { shipFactory } from "./makeShips";
import { takeTurn } from "../index";
import { AstPath } from "prettier";

function displayGame(board1, board2) {
  const gameboardBox1 = document.getElementById('gameboard-box-1');
  const gameboardBox2 = document.getElementById('gameboard-box-2');
  const gameboardBoxes = document.querySelectorAll('.gameboard-box');

  gameboardBoxes.forEach(box => {
    if(box.firstChild) {
      box.removeChild(box.firstChild);
    }
  })

  function transformSpace(space) {
    let rowNum = space.dataset.rowCoord;
    rowNum = Number(rowNum);
    let colNum = space.dataset.columnCoord;
    colNum = Number(colNum);
    const coord = { row: rowNum, column: colNum };
    return coord;
  }

  function displayBoard(board, gameboardBox, gameBoardID, audience) {

    if(document.getElementById(gameBoardID)) {
      document.getElementById(gameBoardID).remove();
    }

    // function transformCoord(coord) {
    //   space.dataset.rowCoord = coord[row];
    //   space.dataset.columnCoord = coord[column];
    // }

    function displayStatus(div, row, column) {
      const spaceStatus = board.rows[row][column];
      div.classList.add(spaceStatus);
      const coord = [ row, column ];
      //console.log(coord);
      // let aspace = board.getActiveSpace();
      // let actcoord = [ aspace.row, aspace.column ];

      // // const actRow = aspace.row;
      // // const actCol = aspace.column;
      // //if(actRow === row && actCol === column) 
      // if(actcoord === coord) {
      //   div.classList.add('active');
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
      gameBoard.id = gameBoardID;
      if(board.getStatus() === 'active') {
        gameboardBox.classList.add('active');
      }
      else if(gameboardBox.classList.contains('active')) {
        gameboardBox.classList.remove('active');
      }
      gameboardBox.appendChild(gameBoard);
      for(let i = 0; i < 10; i++) {
        const row = document.createElement('div');
        row.classList.add('row');
        addSpace(row, i);
        gameBoard.appendChild(row);
      }
    }
    buildBoard();

    // gameBoard.addEventListener('click', (e) => {
    //   const classes = e.target.classList;
    //   if(!classes.contains('miss') && !classes.contains('hit')) {
    //     const coord = transformSpace(e.target);
    //     board.updateActiveSpace(coord);
    //     buildBoard
    //     //e.target.classList.add('active');
    //   } else {
    //     return;
    //     // board.updateActiveSpace('');
    //     // alert(writeErrMessage('dupe'));
    //   }
    // })
  }
  // function addAttackListener(div, board) {
  //   div.addEventListener('click', (e) => {
  //     const classes = e.target.classList;
  //     if(classes.contains('space')) {
  //       if(!classes.contains('miss') && !classes.contains('hit')) {
  //         const coord = transformSpace(e.target);
  //         board.updateActiveSpace(coord);
  //         buildBoard(board);
  //       } else {
  //         return;
  //         // board.updateActiveSpace('');
  //         // alert(writeErrMessage('dupe'));
  //       }
  //     }
  //   })
  // }
  displayBoard(board1, gameboardBox1, 'gameboard-1', 'private');
  //addAttackListener(document.getElementById('gameboard-1', board1));
  displayBoard(board2, gameboardBox2, 'gameboard-2', 'public');
  //addAttackListener(document.getElementById('gameboard-2', board2));
}
export { displayGame };