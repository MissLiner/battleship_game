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
  function assignPosition(lengthsArr, direction, positionArr) {
    let position = positionShip(lengthsArr, direction);
    while (positionArr.includes(position)) {
      position = positionShip(lengthsArr, direction);
    }
    positionArr.push(position);
    return position;
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

  function checkForDupes(arr) {
    const noDupeSet = new Set(arr);
    if (noDupeSet.size !== arr.length) {
      throw 'Ship positions are overlapping!' + arr;
    }
  }
  function buildArmada(player, armadaArr) {
    const shipLengths = [2, 3, 3, 4, 5];
    const allPositions = [];
    for (let i = 0; i < shipLengths.length; i++) {
      const direction = getRandomInt(2);
      const position = assignPosition(shipLengths, direction, allPositions);
      const newShip = shipFactory(player, shipLengths[i], position, direction);
      armadaArr.push(newShip);
    }
    checkForDupes(allPositions);
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