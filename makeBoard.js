import { shipFactory } from './makeShips';

const boardFactory = () => {
  const board = [ 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o',
                  'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o',
                  'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o',
                  'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o',
                  'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o',
                  'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o',
                  'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o',
                  'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o',
                  'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o',
                  'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o']
  function getRandomInt(maxNum) {
    return Math.floor(Math.random() * maxNum);
  }
  function placeShip() {
    const firstIndex = getRandomInt(101);
    // mock this for test**************
    board[firstIndex-1] = 's';
  }
  //const newShip = shipFactory(length);
  return { placeShip, board, getRandomInt }
}
export { boardFactory }