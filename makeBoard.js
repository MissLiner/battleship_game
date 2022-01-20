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
  function placeShip(size, direction) {
    let rowIndex = (getRandomInt(10)) - 1;
    let columnIndex = (getRandomInt(10)) - 1;
    if (direction === 0) {
      columnIndex -= size;
    } else {
      rowIndex -= size;
    }
    const position = [rowIndex, columnIndex];
    return position;
  }
  function buildArmada(player, armadaArr) {
    const shipLengths = [2, 3, 3, 4, 5];
    for (let i = 0; i < shipLengths.length; i++) {
      const direction = getRandomInt(2);
      const position = placeShip(shipLengths[i], direction);
      const newShip = shipFactory(player, shipLengths[i], position, direction);
      armadaArr.push(newShip);
    }
  }
  function placeArmada(armada, board) {
    for (let ship in armada) {
      const rowPosition = ship.position[0];
      const columnPostion = ship.position[1];
      if (ship.direction = 0) {
        for (let i = 0; i < ship.size; i++) {
          board.rows[rowPosition][columnPostion + i] = 's';
        }
      } else {
        for (let i = 0; i < ship.size; i++) {
          board.rows[rowPosition + 1][columnPostion] = 's';
        }
      }
    }
  }
  return { placeShip, getRandomInt, rows, buildArmada }
}

export { boardFactory }