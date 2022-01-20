import { shipFactory } from './makeShips';

const boardFactory = (height, width) => {
  // throw error if either is too big
  const rows = [];
  (function popBoard() {
    for (let i=0; i < height; i++) {
      const newRow = [];
      //String.fromCharCode(i + 95);
      rows.push(newRow);
    }
    for (let row of rows) {
      for (let i = 0; i < width; i++) {
        const newColumn = 'o';
        row.push(newColumn);
      }
    }
  })()
  // const board = [ 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o',
  //                 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o',
  //                 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o',
  //                 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o',
  //                 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o',
  //                 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o',
  //                 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o',
  //                 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o',
  //                 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o',
  //                 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o']
  function getRandomInt(maxNum) {
    return Math.floor(Math.random() * maxNum);
  }
  function placeShip() {
    const firstIndex = getRandomInt(101);
    board[firstIndex-1] = 's';
  }
  //const newShip = shipFactory(length);
  return { placeShip, getRandomInt, rows }
}
export { boardFactory }