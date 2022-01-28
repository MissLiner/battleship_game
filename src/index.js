import './style.css';
import { boardFactory } from './modules/makeBoard';
import { playerFactory } from './modules/makePlayer';
import { displayGame } from './modules/gameDisplay';
// import { shipFactory } from './makeShips';

const player1 = playerFactory(true, 1);
const player2 = playerFactory(true, 2);

const board1 = boardFactory();
board1.buildArmada();
board1.placeArmada();
player2.makeGuess(board1);
console.log(board1.rows);
const board2 = boardFactory();

displayGame('player1-board', board1.rows, 'private');

   