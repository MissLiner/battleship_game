import './style.css';
import { boardFactory } from './modules/makeBoard';
import { playerFactory } from './modules/makePlayer';
import { displayGame } from './modules/gameDisplay';
// import { shipFactory } from './makeShips';

const gameMessages = document.getElementById('game-messages');
const board1 = boardFactory();
const board2 = boardFactory();

displayGame(board1, board1.rows, 'public');

// create human player
const nameForm = document.getElementById('name-form');
const nameInput = document.getElementById('name-input');
const nameInputBtn = document.getElementById('name-input-btn');

let player1;
const player2 = playerFactory('Hal', true, board1);
// should i make value of name a promise, and create player when it is fulfilled?
nameInputBtn.addEventListener('click', () => {
  const playerName = nameInput.value;
  player1 = playerFactory(playerName, false, board2);
  nameForm.classList.add('hidden');
  gameMessages.textContent = `Hi, ${playerName}, time to place your ships!`
})
// take turn
const gameBoardContainer = document.getElementById('board-container');
let attacker = player1;
let defender = player2;
let currentBoard = board2;

function switchTurn() {
  if(attacker = player1) { 
    attacker = player2;
    defender = player1;
    currentBoard = board1;
  }
  else if(attacker = player2) {  
    attacker = player1;
    defender = player2;
    currentBoard = board2;
   };
}

gameBoardContainer.addEventListener('click', (e) => {
  const row = e.target.dataset.rowCoord;
  const column = e.target.dataset.columnCoord;
  const attackCoord = { row: row, column: column};
  if(phase === 'setup') {
    return;
  } else if(phase === 'gameplay') {
    playGame(currentBoard, attackCoord);
    player2.makeGuess();
    switchTurn();
  }

})

function playGame(board, space) {
  board.receiveAttack(space);
  switchTurn();
  displayGame(currentBoard, currentBoard.rows, 'private');
}


// USE TO RUN THROUGH AUTOMATED GAME

// const player1 = playerFactory('name', true, board2);
// const player2 = playerFactory('other name', true, board1);

// board1.placeArmada(player1.getArmada());
// board2.placeArmada(player2.getArmada());

// const turnBtn = document.getElementById('turn-btn');
// turnBtn.addEventListener('click', () => takeTurn());

// let turn = 1;
// let phase = 'setup';





// function takeTurn() {
//   console.log(turn);
//   let player;
//   let board;

//   if(turn === 1) {
//     player = player1;
//     board = board2;
//   } else {
//     player = player2;
//     board = board1;
//   }
//   displayGame(board, board.rows, 'public');
//   setTimeout(() => {  player.makeGuess(board); }, 2000);
//   setTimeout(() => {  displayGame(board, board.rows, 'private'); }, 2500);
  
//   if(turn === 1) { turn = 2; } else { turn = 1; };
//   console.log(turn);
// }
// export { takeTurn };

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

   