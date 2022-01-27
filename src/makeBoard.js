import { shipFactory } from './makeShips';

const boardFactory = (height, width) => {
  const rows = [];
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
  function receiveAttack(coordinates) {
    // can I use a shorter version of the attackSpace??
    switch(rows[coordinates.row][coordinates.column]) {
      case 'open': rows[coordinates.row][coordinates.column] = 'miss';
        break;
      case 'ship': rows[coordinates.row][coordinates.column] = 'hit';
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

  function placeShip(ship, board) {
  }
  function placeArmada(armada, board) {
    for (let ship in armada) {
      placeShip(ship, board);
    }
  }

  return { rows, buildArmada, placeShip, placeArmada, checkForDupes, receiveAttack }
}

export { boardFactory } 