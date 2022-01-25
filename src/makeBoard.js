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

  function getRandomInt(maxNum) {
    return Math.floor(Math.random() * (maxNum + 1));
  }
  function assignDirection() {
    const directNum = getRandomInt(3);
    let direction;
    if (directNum === 1) {
      direction = 'horizontal';
    } else {
      direction = 'vertical';
    }
    return direction;
  }
  function positionShip(size, direction) {
    let rowIndex;
    let columnIndex;
    // DO THIS - factor size back in
    if (direction === 'horizontal') {
      rowIndex = getRandomInt(10);
      columnIndex = getRandomInt(10);
    } else {
      rowIndex = getRandomInt(10);
      columnIndex = getRandomInt(10);
    }
    const position = { row: rowIndex, column: columnIndex };
    return position;
  }
  function assignPosition(lengthsArr, direction, positionArr) {
    let position = positionShip(lengthsArr, direction);
    while (positionArr.indexOf(position) !== -1) {
      position = positionShip(lengthsArr, direction);
    }
    return position;
  } 
  // function checkForDupes(arr) {
  //   const stringifiedArr = JSON.stringify(arr);
  //   const noDupeSet = new Set(stringifiedArr);
  //   if (noDupeSet.size !== stringifiedArr.length) {
  //     throw 'Ship positions are overlapping!' + stringifiedArr;
  //   }
  // }
  // const shallowEqual = (previousValue, currentValue) => {
  //   console.log(previousValue);
  //   console.log(currentValue);
  //   const keys1 = Object.keys(currentValue);
  //   const keys2 = Object.keys(previousValue);
  //   let results = 0;
  //   // console.log(previousValue.row);
  //   // console.log(currentValue.row);
  //   for (let key of keys1) {
  //     if (currentValue[key] === previousValue[key]) {
  //       console.log(currentValue[key]);
  //       results += 1;
  //     }
  //   }
  //   console.log(results);
  //   if (results >= keys1.length) {
  //     return true;
  //   } 
  // }
  function checkForDupes(arr, key1, key2) {
    const dupeItems = [];
    for(let item of arr) {
      const dupes1 = arr.filter(newItem1 => newItem1[key1] === item[key1]);
      const dupes2 = dupes1.filter(newItem2 => newItem2[key2] === item[key2]);
      if(dupes2.length > 1) { dupeItems.push(dupes2); }
    }
    console.log(dupeItems);
    if(dupeItems.length !== 0) {
        throw 'Ship positions are overlapping!' + dupeItems;
    }
  }
  function buildArmada(player, armadaArr) {
    const shipLengths = [2, 3, 3, 4, 5];
    const allPositions = [];
    for (let i = 0; i < shipLengths.length; i++) {
      const direction = assignDirection();
      const position = assignPosition(shipLengths, direction, allPositions);
      allPositions.push(position);
      console.log(allPositions);
      const newShip = shipFactory(player, shipLengths[i], position, direction);
      armadaArr.push(newShip);
    }
    checkForDupes(allPositions, 'row', 'column');
  }
  function checkIfOnBoard(position, edge) {
    if (position.length > 2) {
      throw 'ship fell off the ' + edge + ' edge!';
    }
  }
  function placeShip(ship, board) {
    const rowPosition = ship.position[0];
    const columnPosition = ship.position[1];
    if (ship.direction === 'horizontal') {
      for (let i = 0; i < ship.size; i++) {
        const newColumn = columnPosition + i;
        checkIfOnBoard(newColumn, 'right');
        board.rows[rowPosition][newColumn] = 's';
      }
    } else {
      for (let i = 0; i < ship.size; i++) {
        const newColumn = columnPosition + i;
        checkIfOnBoard(newColumn, 'bottom');
        board.rows[rowPosition][newColumn] = 's';
      }
    }
  }
  
  function placeArmada(armada, board) {
    for (let ship in armada) {
      placeShip(ship, board);
    }
  }
  return { positionShip, getRandomInt, rows, buildArmada, placeShip, placeArmada, checkIfOnBoard, checkForDupes }
}

export { boardFactory } 