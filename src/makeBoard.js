import { shipFactory } from './makeShips';
// refactor position ship to allow players to do it manually
const boardFactory = (height, width) => {
  const rows = [];
  let hitCounter = 0;
  let armadaStatus = 'afloat';
  

  (function popBoard() {
    for (let i=0; i < height; i++) {
      let newRow = [];
      rows.push(newRow);
    }
    for (let row of rows) {
      for (let i = 0; i < width; i++) {
        let newColumn = 'open';
        row.push(newColumn);
      }
    }
  })()
  function checkIfAllSunk(lengthsArr, counter) {
    const shipSpaceTotal = lengthsArr.reduce(function(a, b) {
        return(a + b); 
      }, 0);
    if(shipSpaceTotal === counter) {
      return 'sunk';
    }
  }
  function getAllShipPositions(armadaArr) {
    const allPositions = [];
    for(let i = 0; i < armadaArr.length; i++) {
      const shipPositions = armadaArr[i].getPositions();
      for(const space in shipPositions) {
        allPositions.push(space);
      }
    }
    return allPositions;
  }
  function hitShip(coordinates, armadaArr) {
    for(let i = 0; i < armadaArr.length; i++) {
      const positionArray = armadaArr[i].getPositions();
      for(let x = 0; x < positionArray.length; x++) {
        if(positionArray[x].row === coordinates.row && positionArray[x].column === coordinates.column) {
          armadaArr[i].hit();
          hitCounter++;
        }
      }
    }
  }
  function receiveAttack(coordinates, armadaArr, counter) {
    // can I use a shorter version of the attackSpace??
    switch(rows[coordinates.row][coordinates.column]) {
      case 'open': rows[coordinates.row][coordinates.column] = 'miss';
        break;
      case 'ship': rows[coordinates.row][coordinates.column] = 'hit';
        hitShip(coordinates, armadaArr);
        break;
    }
  }

  function checkForDupes(arr) {
    for(let item of arr) {
      const dupes1 = arr.filter(newItem1 => newItem1.row === item.row);
      const dupes2 = dupes1.filter(newItem2 => newItem2.column === item.column);
      if(dupes2.length > 1) { return true }
    }
    return false;
  }
  function buildArmada(player, armadaArr) {
    const shipLengths = [2, 3, 3, 4, 5];
    let allPositions = [];

    for (let i = 0; i < shipLengths.length; i++) {
      const newShip = shipFactory(player, shipLengths[i]);
      newShip.positionShip();
      const dupeCheckArr = allPositions.concat(newShip.getPositions());
      let isDupe = checkForDupes(dupeCheckArr);
      // while(isDupe === true) {
      //   newShip.positionShip();
      //   const dupeCheckArr2 = allPositions.concat(newShip.getPositions());
      //   isDupe = checkForDupes(dupeCheckArr2);
      // }
      allPositions.push(newShip.getPositions())
      armadaArr.push(newShip);
    }
  }

  function placeShip(shipPositions) {
    for(let i = 0; i < shipPositions.length; i++) {
      const rowPos = shipPositions[i].row;
      const colPos = shipPositions[i].column;
      rows[rowPos][colPos] = 'ship';
    }
  }
  function placeArmada(armada) {
    for (let ship in armada) {
      placeShip(ship.getPositions());
    }
  }

  return { rows, buildArmada, placeShip, placeArmada, checkForDupes, receiveAttack, getAllShipPositions, hitShip, checkIfAllSunk }
}

export { boardFactory } 