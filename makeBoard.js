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

  function placeShip(ship) {
    board[0] = 's';
  }
  //const newShip = shipFactory(length);
  return { placeShip, board }
}
export { boardFactory }