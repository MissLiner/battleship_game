import './style.css';
import { boardFactory } from './modules/makeBoard';
import { playerFactory } from './modules/makePlayer';
import { displayGame } from './modules/gameDisplay';
// import { shipFactory } from './makeShips';

const player1 = playerFactory(true, 1);
const player2 = playerFactory(true, 2);

const board1 = boardFactory();
const board2 = boardFactory();

displayGame('player1-board', board1.rows);

   