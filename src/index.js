import './style.css';
import { boardFactory } from './modules/makeBoard';
// import { shipFactory } from './makeShips';

const testBoard = boardFactory(10, 10);
const armada1 = [];
testBoard.buildArmada('player1', armada1);
   