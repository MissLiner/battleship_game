function displayGame(board1, board2) {
  const gameboardBox1 = document.getElementById('gameboard-box-1');
  const gameboardBox2 = document.getElementById('gameboard-box-2');
  const gameboardBoxes = document.querySelectorAll('.gameboard-box');

  gameboardBoxes.forEach(box => {
    if(box.firstChild) {
      box.removeChild(box.firstChild);
    }
  })

  function displayBoard(board, gameboardBox, gameBoardID) {
    if(document.getElementById(gameBoardID)) {
      document.getElementById(gameBoardID).remove();
    }

    function displayStatus(div, row, column) {
      const spaceStatus = board.rows[row][column];
      div.classList.add(spaceStatus);
      const coord = [ row, column ];
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
  }
  displayBoard(board1, gameboardBox1, 'gameboard-1', 'public');
  displayBoard(board2, gameboardBox2, 'gameboard-2', 'private');
}
export { displayGame };