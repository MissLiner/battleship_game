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
  function suggestPosition(ship, i) {
    const newColumn = ship.positions.column + 1 + i;
    const newRow = ship.positions.row + 1 + i;
    if(ship.direction === 'horizontal') {
      return { row: ship.positions.row, column: newColumn }
    } else if(ship.direction === 'vertical') {
      return { row: newRow, column: ship.positions.column }
    }
  }
  function addPositions(ship, positionsArr) {
    const newPositions = [ ship.positions ];
    const rowPosition = ship.positions.row;
    const columnPosition = ship.positions.column;
    let draftPositions = [];
    
    
    if (ship.direction === 'horizontal') {
      // let horPositions = [];
      for (let i = 0; i < ship.size - 1; i++) {
        const newColumn = columnPosition + 1 + i;
        const newPosition = { row: rowPosition, column: newColumn }
        checkIfOnBoard(newColumn, 'right edge');
        let draftPositions = positionsArr.concat(newPosition);
        const isDupe = checkForDupes(draftPositions, 'row', 'column');
        if(isDupe === false) { 
          horPositions.push(newPosition); 
        } else {
          flipDirection(ship);
          horPositions = [];
          const newRow = rowPosition + i;
          const newPosition = { row: newRow, column: columnPosition };
          checkIfOnBoard(newRow, 'bottom');
          draftPositions = positionsArr.concat(newPosition);
          const isDupe = checkForDupes(draftPositions, 'row', 'column');
          if(isDupe === false) {
            horPositions.push(newPosition);
          } else {
            throw 'flipping ship did not help';
          }
        }
      }
      newPositions.push(horPositions);
    } 
    else if(ship.direction === 'vertical') {
      let vertPositions = [];
      for (let i = 0; i < ship.size; i++) {
        const newRow = rowPosition + i;
        const newPosition = { row: newRow, column: columnPosition }
        checkIfOnBoard(newRow, 'bottom');
        let draftPositions = positionsArr.concat(newPosition);
        const isDupe = checkForDupes(draftPositions, 'row', 'column');
        if(isDupe === false) {
          vertPositions.push(newPosition);
          } else {
            flipDirection(ship);
            vertPositions = [];
            const newRow = rowPosition + i;
            const newPosition = { row: newRow, column: columnPosition };
            checkIfOnBoard(newRow, 'bottom');
            draftPositions = positionsArr.concat(newPosition);
            const isDupe = checkForDupes(draftPositions, 'row', 'column');
            if(isDupe === false) {
              horPositions.push(newPosition);
            } else {
              throw 'flipping ship did not help';
            }
          }
      }
      newPositions.push(vertPositions);
    } else {
      throw 'ship has no direction';
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