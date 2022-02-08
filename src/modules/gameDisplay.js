function displayGame(board1, board2) {
  const gameboardBox1 = document.getElementById('gameboard-box-1');
  const gameboardBox2 = document.getElementById('gameboard-box-2');

  function displayBoard(board, gameboardBox, gameBoardID, audience) {
    if(gameboardBox.firstChild) {
      gameboardBox.removeChild(gameboardBox.firstChild);
    }

    function displayStatus(div, row, column) {
      const spaceStatus = board.rows[row][column];
      if(audience === 'private') {
        div.classList.add(spaceStatus);
      } else {
        switch(spaceStatus) {
          case 'hit': 
            div.classList.add('hit');
          case 'miss': 
            div.classList.add('miss');
          case 'sunk': 
            div.classList.add('sunk');
          default: 
            div.classList.add('open');
        }
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
    
    function buildBoard() {
      const gameBoard = document.createElement('div');
      gameBoard.classList.add('gameboard');
      gameBoard.id = gameBoardID;
      if(board.getStatus() === 'active') {
        gameboardBox.classList.add('active-board');
      }
      else if(gameboardBox.classList.contains('active-board')) {
        gameboardBox.classList.remove('active-board');
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
  displayBoard(board1, gameboardBox1, 'gameboard-1', 'private');
  displayBoard(board2, gameboardBox2, 'gameboard-2', 'public');
}
export { displayGame };