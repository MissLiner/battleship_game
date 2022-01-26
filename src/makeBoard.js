import { shipFactory } from './makeShips';

const boardFactory = (height, width) => {
  // throw error if either is too big
  const rows = [];
  (function popBoard() {
    for (let i=0; i < height; i++) {
      const newRow = [];
      rows.push(newRow);
    }
    for (let row of rows) {
      for (let i = 0; i < width; i++) {
        const newColumn = 'o';
        row.push(newColumn);
      }
    }
  })()

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
      const dupeCheckArr = allPositions.concat(newShip.getPositions());
      isDupe = checkForDupes(dupeCheckArr);
      while(isDupe === true) {
        newShip.positionShip();
        const dupeCheckArr = allPositions.concat(newShip.getPositions());
        isDupe = checkForDupes(dupeCheckArr);
      }
      allPositions.push(newShip.getPositions())
      armadaArr.push(newShip);
    }
    console.log(armadaArr);
    console.log(allPositions);
  }


  function placeShip(ship, board) {
  }
  function placeArmada(armada, board) {
    for (let ship in armada) {
      placeShip(ship, board);
    }
  }
  
  return { positionShip, getRandomInt, rows, buildArmada, placeShip, placeArmada, checkIfOnBoard, checkForDupes }
}

export { boardFactory } 