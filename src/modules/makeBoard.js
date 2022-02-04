
// refactor position ship to allow players to do it manually
const boardFactory = (name) => {
  const rows = [];
  let hitCounter = 0;
  let status;
  let activeSpace;

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
  function updateStatus(board) {
    if(board.name === this.name) {
      status = 'active';
    } else {
      status = 'inactive';
    }
  }

  function drawShip(shipPositions, name) {
    for(let i = 0; i < shipPositions.length; i++) {
      const rowPos = shipPositions[i].row;
      const colPos = shipPositions[i].column;
      rows[rowPos][colPos] = name;
    }
  }

  const placeArmada = (armadaArr) => {
    for (let ship of armadaArr) {
      drawShip(ship.getPositions(), ship.name);
    }
  }

  function hitShip(coordinates, player) {
    for(let i = 0; i < player.getArmada().length; i++) {
      const positionArray = player.getArmada()[i].getPositions();
      for(let x = 0; x < positionArray.length; x++) {
        if(positionArray[x].row === coordinates.row && positionArray[x].column === coordinates.column) {
          player.getArmada()[i].hit();
        }
      }
    }
  }

  const receiveAttack = (space, player) => {
    let row;
    let column;
    let coordinates;

    if(space.dataset) {
      row = space.dataset.rowCoord;
      column = space.dataset.columnCoord;
      coordinates = { row: row, column: column }
    } else {
      row = space.row;
      column = space.column;
      coordinates = space;
    }
    if(rows[row][column] !== 'open') {
      rows[row][column] = 'hit';
      hitShip(coordinates, player);
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
  
  return { rows, getStatus, name, drawShip, placeArmada, receiveAttack, checkIfAllSunk, hitShip, updateStatus }
}

export { boardFactory } 