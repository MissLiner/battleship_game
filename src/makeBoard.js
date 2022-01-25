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
    let adjustedMax = 10 - size;
    if (direction === 'horizontal') {
      rowIndex = getRandomInt(10);
      columnIndex = getRandomInt(adjustedMax);
    } else {
      rowIndex = getRandomInt(adjustedMax);
      columnIndex = getRandomInt(10);
    }
    const position = { row: rowIndex, column: columnIndex };
    return position;
  }
  function checkForDupes(arr, key1, key2) {
    for(let item of arr) {
      const dupes1 = arr.filter(newItem1 => newItem1[key1] === item[key1]);
      const dupes2 = dupes1.filter(newItem2 => newItem2[key2] === item[key2]);
      if(dupes2.length > 1) { return true }
    }
    return false;
  }
  function assignPosition(lengthsArr, direction, positionArr) {
    let position = positionShip(lengthsArr, direction);
    const dupeCheckArr = positionArr.concat(position);
    let isDupe = checkForDupes(dupeCheckArr, 'row', 'column');
    while(isDupe === true) {
      position = positionShip(lengthsArr, direction);
      const dupeCheckArr = positionArr.concat(position);
      isDupe = checkForDupes(dupeCheckArr, 'row', 'column');
    }
    return position;
  } 
  function buildArmada(player, armadaArr) {
    const shipLengths = [2, 3, 3, 4, 5];
    const allPositions = [];
    for (let i = 0; i < shipLengths.length; i++) {
      const direction = assignDirection();
      const position = assignPosition(shipLengths[i], direction, allPositions);
      allPositions.push(position);
      console.log(allPositions);
      const newShip = shipFactory(player, shipLengths[i], position, direction);
      armadaArr.push(newShip);
    }
    // should be a new separate function??
    const isDupe = checkForDupes(allPositions, 'row', 'column');
    if(isDupe === true) { 
      throw 'Ship positions are overlapping!'
    }
    console.log(armadaArr);
  }
  function checkIfOnBoard(coordinate, edge) {
    if (coordinate > 10) {
      throw 'ship fell off the ' + edge;
    }
  }
  // keep track of all positions
  // check if new position overlaps existing position
  // if it does, undo previous moves
  // flip direction
  // restart adding positions

  function addPositions(ship) {
    const rowPosition = ship.position[0];
    const columnPosition = ship.position[1];
    const positions = [ ship.position ];
    if (ship.direction === 'horizontal') {
      for (let i = 0; i < ship.size; i++) {
        const newColumn = columnPosition + i;
        const newPosition = { row: rowPosition, column: newColumn }
        checkIfOnBoard(newColumn, 'right edge');
        positions.push(newPosition);
      }
    } else {
      for (let i = 0; i < ship.size; i++) {
        const newRow = rowPosition + i;
        const newPosition = { row: newRow, column: columnPosition }
        checkIfOnBoard(newColumn, 'bottom');
        positions.push(newPosition);
      }
    }
    return positions;
  }
  function placeShip(ship, board) {
        // board.rows[rowPosition][newColumn] = 's';
  }
  
  function placeArmada(armada, board) {
    for (let ship in armada) {
      placeShip(ship, board);
    }
  }
  return { positionShip, getRandomInt, rows, buildArmada, placeShip, placeArmada, checkIfOnBoard, checkForDupes, addPositions }
}

export { boardFactory } 