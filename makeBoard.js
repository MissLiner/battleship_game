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
  function chooseDirection () {
    const directNum = getRandomInt(3);
    if (directNum === 1) {
      return 'horizontal';
    } else {
      return 'vertical';
    }
  }
  function positionShip(size, direction) {
    let rowIndex;
    let columnIndex;
    if (direction === 'horizontal') {
      rowIndex = getRandomInt(11) - 1;
      columnIndex = (getRandomInt(11 - size)) - 1;
    } else {
      rowIndex = (getRandomInt(11 - size)) - 1;
      columnIndex = getRandomInt(11) - 1;
    }
    const position = [rowIndex, columnIndex];
    return position;
  }
  function buildArmada(player, armadaArr) {
    const shipLengths = [2, 3, 3, 4, 5];
    for (let i = 0; i < shipLengths.length; i++) {
      const direction = getRandomInt(2);
      const position = positionShip(shipLengths[i], direction);
      const newShip = shipFactory(player, shipLengths[i], position, direction);
      armadaArr.push(newShip);
    }
  }
  function checkIfOnBoard(position, edge) {
    if (position > 9) {
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
  return { positionShip, getRandomInt, rows, buildArmada, placeShip, placeArmada, checkIfOnBoard }
}

export { boardFactory }