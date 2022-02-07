
const boardFactory = (name) => {
  const rows = [];
  let hitCounter = 0;
  let status;
  let activeSpace = '';

  (function popBoard() { 
    for (let i=0; i < 10; i++) {
      let newRow = [];
      rows.push(newRow);
    }
    for (let row of rows) {
      for (let i = 0; i < 10; i++) {
        let newColumn = 'open';
        row.push(newColumn);
      }
    }
  })()
  const updateStatus = (board) => {
    if(board.name === this.name) {
      status = 'active';
    } else {
      status = 'inactive';
    }
  }

  const updateActiveSpace = (newSpace) => {
    activeSpace = newSpace;
  }

  function placeShip(shipPositions, name) {
    for(let i = 0; i < shipPositions.length; i++) {
      const rowPos = shipPositions[i].row;
      const colPos = shipPositions[i].column;
      rows[rowPos][colPos] = name;
    }
  }

  const placeArmada = (armadaArr) => {
    for (let ship of armadaArr) {
      placeShip(ship.getPositions(), ship.name);
    }
  }

  function hitShip(player) {
    for(let i = 0; i < player.getArmada().length; i++) {
      const positionArray = player.getArmada()[i].getPositions();
      for(let x = 0; x < positionArray.length; x++) {
        if(positionArray[x].row === activeSpace.row && positionArray[x].column === activeSpace.column) {
          player.getArmada()[i].hit();
        }
      }
    }
  }

  const receiveAttack = (player) => {
    let row;
    let column;
    // let coordinates;

    if(activeSpace) {
      row = activeSpace.row;
      column = activeSpace.column;
      // coordinates = { row: row, column: column }
    }

    // if(space.dataset) {
    //   row = space.dataset.rowCoord;
    //   column = space.dataset.columnCoord;
    //   coordinates = { row: row, column: column }
    // } else {
    //   row = space.row;
    //   column = space.column;
    //   coordinates = space;
    // }
    if(rows[row][column] !== 'open') {
      rows[row][column] = 'hit';
      hitShip(player);
      hitCounter++;
    } else {
      rows[row][column] = 'miss';
    }
  }

  const checkIfAllSunk= () => {
    const shipSpaceTotal = 17;
    if(shipSpaceTotal === hitCounter) {
      status = 'sunk';
      return true;
    }
  }
  function getStatus() { return status };
  function getActiveSpace() { return activeSpace };
  
  return { activeSpace, rows, getStatus, name, placeShip, placeArmada, receiveAttack, checkIfAllSunk, hitShip, updateStatus, updateActiveSpace, getActiveSpace }
}

export { boardFactory } 