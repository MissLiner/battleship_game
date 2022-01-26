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
  function assignPosition(positionArr) {
    let position = positionShip(size, direction);
    const dupeCheckArr = positionArr.concat(position);
    let isDupe = checkForDupes(dupeCheckArr, 'row', 'column');
    while(isDupe === true) {
      position = positionShip(size, direction);
      const dupeCheckArr2 = positionArr.concat(position);
      isDupe = checkForDupes(dupeCheckArr2, 'row', 'column');
    }
    return position;
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
  function checkIfOnBoard(coordinates) {
    if(coordinates.row > 10) {
      throw 'ship fell off the bottom edge!'
    }
    else if(coordinates.column > 10) {
      throw 'ship fell off the right side!';
    }
  }
  // function addPositions(ship, positionsArr) {
  //   let newPositions = [ ship.positions ];
  //   let isDupe;

  //   function popAllPositions(initPosition) {
  //     let rowPos = initPosition.row;
  //     let colPos = initPosition.column;
      
  //     for(let i = 0; i < ship.size - 1; i++) {
  //       let newColumn = colPos + 1 + i;
  //       let newRow = rowPos + 1 + i;
  //       let newPosition;
  //       if(ship.direction === 'horizontal') {
  //         newPosition = { row: rowPos, column: newColumn }
  //       } else if(ship.direction === 'vertical') {
  //         newPosition = { row: newRow, column: colPos }
  //       }
  //       checkIfOnBoard(newPosition);
  //       newPositions.push(newPosition); 
  //     }
  //   }
  //   function checkOverlap() {
  //     const dupeCheckArr = positionsArr.concat(newPositions);
  //     isDupe = checkForDupes(dupeCheckArr, 'row', 'column');
  //   }

  //   popAllPositions(ship.positions);
  //   checkOverlap();

  //   if(isDupe === true) {
  //     let flipCounter = 0;
  //     newPositions.length = 0;
  //     do {
  //       if(flipCounter > 5) {
  //         throw 'I\'m dizzy from too much flipping!!';
  //       }
  //       flipDirection(ship);
  //       flipCounter++;
  //       console.log(flipCounter);
  //       const resetPosition = assignPosition(ship.size, ship.direction, positionsArr);
  //       newPositions.push(resetPosition);
  //       console.log(newPositions);
  //       console.log(resetPosition);
  //       popAllPositions(ship.positions);
  //       checkOverlap();
  //     }
  //     while(isDupe === true); 
  //   } 
  // return newPositions;
  // }

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