import './style.css';
import { boardFactory } from './modules/makeBoard';
import { playerFactory } from './modules/makePlayer';
import { displayGame } from './modules/gameDisplay';
// import { shipFactory } from './makeShips';

const player1 = playerFactory(true, 1);
const player2 = playerFactory(true, 2);

const board1 = boardFactory(true);
const board2 = boardFactory(true);

const turnBtn = document.getElementById('turn-btn');
turnBtn.addEventListener('click', () => takeTurn());

displayGame(board2, board2.rows, 'public');
let turn = 1;


function takeTurn() {
  console.log(turn);
  let player;
  let board;

  if(turn === 1) {
    player = player1;
    board = board2;
  } else {
    player = player2;
    board = board1;
  }
  displayGame(board, board.rows, 'public');
  setTimeout(() => {  player.makeGuess(board); }, 2000);
  setTimeout(() => {  displayGame(board, board.rows, 'private'); }, 2500);
  
  if(turn === 1) { turn = 2; } else { turn = 1; };
  console.log(turn);
}
export { takeTurn };

   