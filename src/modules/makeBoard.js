
// refactor position ship to allow players to do it manually
const boardFactory = () => {
  const rows = [];
  let hitCounter = 0;

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

  function placeShip(shipPositions) {
    for(let i = 0; i < shipPositions.length; i++) {
      const rowPos = shipPositions[i].row;
      const colPos = shipPositions[i].column;
      rows[rowPos][colPos] = 'ship';
    }
  }

  const placeArmada = (armadaArr) => {
    for (let ship of armadaArr) {
      placeShip(ship.getPositions());
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

  const receiveAttack = (coordinates) => {
    const row = coordinates.row;
    const column = coordinates.column;

    switch(rows[row][column]) {
      case 'open': rows[row][column] = 'miss';
        break;
      case 'ship': rows[row][column] = 'hit';
        hitShip(coordinates);
        hitCounter++;
        break;
    }
  }

  const checkIfAllSunk= () => {
    const shipSpaceTotal = 17;
    if(shipSpaceTotal === hitCounter) {
      return 'sunk';
    }
  }
  
  return { rows, placeShip, placeArmada, receiveAttack, checkIfAllSunk, hitShip }
}

export { boardFactory } 

  // let armadaStatus = 'afloat';
  // const shipLengths = [2, 3, 3, 4, 5];
  // const armadaArr = [];
  // const allShipPositions = [];

  // function checkIfShipOffBoard() {
  //   const allSpaces = [];
  //   for(let i = 0; i < allShipPositions.length; i++) {
  //     allSpaces.push(allShipPositions[i].row);
  //     allSpaces.push(allShipPositions[i].column);
  //   }
  //   const offBoard = allSpaces.filter(value => value > 9);
  //   if(offBoard.length > 0) {
  //     throw 'ship is off board' + offBoard.length;
  //   }
  // }