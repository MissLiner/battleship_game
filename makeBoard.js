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
  function placeShip() {
    const rowIndex = (getRandomInt(10)) - 1;
    const columnIndex = (getRandomInt(10)) - 1;
    rows[rowIndex][columnIndex] = 's';
  }
  //const newShip = shipFactory(length);
  return { placeShip, getRandomInt, rows }
}
export { boardFactory }