import './style.css';
import { boardFactory } from './modules/makeBoard';
import { playerFactory } from './modules/makePlayer';
import { displayGame } from './modules/gameDisplay';
// import { shipFactory } from './makeShips';

const board1 = boardFactory();
const board2 = boardFactory();

const player1 = playerFactory('name', true, board2);
const player2 = playerFactory('other name', true, board1);

let turn = 1;
let phase = 'setup';

const turnBtn = document.getElementById('turn-btn');
turnBtn.addEventListener('click', () => takeTurn());

displayGame(board2, board2.rows, 'public');

const gameBoardContainer = document.getElementById('gameboard-container');
gameBoardContainer.addEventListener('click', (e) => {
  const row = e.target.dataset.rowCoord;
  const column = e.target.dataset.columnCoord;
  if(phase === 'setup') {

  }

})

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

// TO DO
// -Allow manual ship placement
// -Set up game over
// -Show your own board while hitting other
// -Show whose turn it is

// -Make ships looks better
// -Change colors as ships sink / are sunk
// -Have AI guess near spaces to hit
// -Create ship classes
// -Add numbers and letters to board

   