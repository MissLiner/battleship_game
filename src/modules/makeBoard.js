import { shipFactory } from '../makeShips';
// refactor position ship to allow players to do it manually
const boardFactory = () => {
  const rows = [];
  let hitCounter = 0;
  let armadaStatus = 'afloat';
  const shipLengths = [2, 3, 3, 4, 5];
  const armadaArr = [];
  const allShipPositions = [];

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
  function throwErr() {
    throw 'gotcha!';
  }
  const findOpenSpaces = () => {
    const allOpenSpaces = [];
    for(let i = 0; i < 10; i++) {
      for(let x = 0; x < 10; x++) {
        if(rows[i][x] === 'open') {
          let position = { row: i, column: x };
          allOpenSpaces.push(position);
        }
      }
    }
    return allOpenSpaces;
  }
  function checkIfAllSunk(lengthsArr, counter) {
    const shipSpaceTotal = lengthsArr.reduce(function(a, b) {
        return(a + b); 
      }, 0);
    if(shipSpaceTotal === counter) {
      return 'sunk';
    }
  }
  function hitShip(coordinates) {
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
  function receiveAttack(coordinates) {
    // can I use a shorter version of the attackSpace??
    const row = coordinates.row;
    const column = coordinates.column;

    switch(rows[row][column]) {
      case 'open': rows[row][column] = 'miss';
        break;
      case 'ship': rows[row][column] = 'hit';
        hitShip(coordinates);
        break;
    }
  }

  function checkForDupes(arr) {
    for(let item of arr) {
      const dupes1 = arr.filter(newItem1 => newItem1.row === item.row);
      const dupes2 = dupes1.filter(newItem2 => newItem2.column === item.column);
      if(dupes2.length > 1) { return true };
    }
    return false;
  }
  const buildArmada = () => {
    for (let i = 0; i < shipLengths.length; i++) {
      let isDupe = false;
      const newShip = shipFactory(shipLengths[i]);
      let dupeCounter = 0;
      let dupeCheckArr;
      do {
        dupeCounter++;
        newShip.positionShip();
        dupeCheckArr = allShipPositions.concat(newShip.getPositions());
        isDupe = checkForDupes(dupeCheckArr);
      } while(isDupe === true && dupeCounter < 10);
      if(isDupe === true) { throw dupeCheckArr };
      for(let position of newShip.getPositions()) {
        allShipPositions.push(position);
      }
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
  function checkIfShipOffBoard() {
    const allSpaces = [];
    for(let i = 0; i < allShipPositions.length; i++) {
      allSpaces.push(allShipPositions[i].row);
      allSpaces.push(allShipPositions[i].column);
    }
    const offBoard = allSpaces.filter(value => value > 9);
    if(offBoard.length > 0) {
      throw 'ship is off board' + offBoard.length;
    }
  }
  const placeArmada = () => {
    for (let ship of armadaArr) {
      placeShip(ship.getPositions());
    }
    let spaces = checkIfShipOffBoard();
    return spaces;
  }
  function getArmada() { return armadaArr };
  function getAllShipPositions() { return allShipPositions };

  return { rows, buildArmada, placeShip, placeArmada, checkForDupes, receiveAttack, hitShip, checkIfAllSunk, getArmada, getAllShipPositions, findOpenSpaces, throwErr }
}

export { boardFactory } 