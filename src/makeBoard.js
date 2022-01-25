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
      const newShip = shipFactory(player, shipLengths[i], position, direction);
      newShip.positions = addPositions(newShip, allPositions);
      allPositions.push(newShip.positions);
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
  function flipDirection(ship) {
    if(ship.direction === 'horizontal') {
      ship.direction === 'vertical';
    } else if(ship.direction === 'horizontal') {
      ship.direction === 'vertical';
    }
  }

  function addPositions(ship, positionsArr) {
    let newPositions = [ ship.positions ];
    let hasFlipped = false;
    let isDupe;

    function suggestPosition() {
      const newColumn = ship.positions.column + 1 + i;
      const newRow = ship.positions.row + 1 + i;
      if(ship.direction === 'horizontal') {
        return { row: ship.positions.row, column: newColumn }
      } else if(ship.direction === 'vertical') {
        return { row: newRow, column: ship.positions.column }
      }
    }
    function popAllPositions() {
      for(let i = 0; i < ship.size - 1; i++) {
        const newPosition = suggestPosition();
        newPositions.push(newPosition);
      }
    }
    function checkOverlap() {
      const dupeCheckArr = positionsArr.concat(newPositions);
      isDupe = checkForDupes(dupeCheckArr, 'row', 'column');
    }
    popAllPositions();
    checkOverlap();
    if(isDupe === true && hasFlipped === false) {
      flipDirection(ship);
      hasFlipped = true;
      newPositions = [ ship.positions ];
      popAllPositions();
      checkOverlap();
      if(isDupe === true) {
        throw 'flipping ship did not help';
      }
    } 
  return newPositions;
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