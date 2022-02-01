import './style.css';
import { boardFactory } from './modules/makeBoard';
import { playerFactory } from './modules/makePlayer';
import { displayGame } from './modules/gameDisplay';
// import { shipFactory } from './makeShips';

const gameMessages = document.getElementById('game-messages');
const shipMessages = document.getElementById('ship-messages');
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
const gameBoardContainer = document.getElementById('board-container');


// CREATE PLAYER 1
const positionForm = document.getElementById('position-form');

nameInputBtn.addEventListener('click', () => {
  const playerName = nameInput.value;
  player1 = playerFactory(playerName, false, board2);
  nameForm.classList.add('hidden');
  gameMessages.textContent = `Hi, ${playerName}, time to place your ships!`
  shipMessages.textContent = `This ship is a ${player1.ships[0].name}, and it's ${player1.ships[0].size} spaces long. Pick a direction and the first space.`
  positionForm.classList.remove('hidden');
})

// PLACE PLAYER 1 SHIPS
let attacker = player1;
let defender = player2;
let currentBoard = board2;
let phase = 'none';
let activeSpace;

board1.placeArmada(player1.getArmada());
displayGame(board1, board1.rows, 'private');
shipMessages.textContent = `This ship is a ${player1.ships[shipCounter].name}, and it's ${player1.ships[shipCounter].size} spaces long. Pick a direction and the first space.`

gameBoardContainer.addEventListener('click', (e) => {
  if(activeSpace) {
    activeSpace.classList.remove('active');
  }
  activeSpace = e.target;
  activeSpace.classList.add('active');
})

const directionInputs = document.getElementsByName('direction');
function radioValue() {
  for(let i = 0; i < directionInputs.length; i++) {
    if(directionInputs[i].checked) {
      return directionInputs[i].value;
    }
  }
}

const submitShipBtn = document.getElementById('submit-ship-btn');
let shipCounter = 0;
submitShipBtn.addEventListener('click', () => {
  const direction = radioValue();
  if(activeSpace) {
    const row = activeSpace.dataset.rowCoord;
    const column = activeSpace.dataset.columnCoord;
    const coord = { row: Number(row), column: Number(column)};
    player1.placeShip(coord, direction, shipCounter);
    shipCounter++;
    activeSpace.classList.remove('active');
  }
  if(shipCounter > 4) {
    phase = 'gameplay';
    shipMessages.classList.add('hidden');
    positionForm.classList.add('hidden');
    shipCounter = 0;
    gameMessages.textContent = `${attacker.name}, time for a battle at sea! Choose your first target.`;
  }
})

// TAKE TURN

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

   