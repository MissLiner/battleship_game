import './style.css';
import { boardFactory } from './modules/makeBoard';
import { playerFactory } from './modules/makePlayer';
import { displayGame } from './modules/gameDisplay';
// import { shipFactory } from './makeShips';

const gameMessages = document.getElementById('game-messages');
const shipMessages = document.getElementById('ship-messages');
let board1 = boardFactory();
let board2 = boardFactory();

displayGame(board1, board1.rows, 'public');

// create human player
const nameForm = document.getElementById('name-form');
const nameInput = document.getElementById('name-input');
const nameInputBtn = document.getElementById('name-input-btn');

let player1;
const player2 = playerFactory('Hal', true, board1);

let attacker = player1;
let defender = player2;
let currentBoard = board1;
let phase = 'none';
let activeSpace;

// should i make value of name a promise, and create player when it is fulfilled?
const gameBoardContainer = document.getElementById('board-container');


// CREATE PLAYER 1
const positionForm = document.getElementById('position-form');

nameInputBtn.addEventListener('click', () => {
  const playerName = nameInput.value;
  if(attacker === player1) {
    player1 = playerFactory(playerName, false, board2);
    attacker = player1;
  }
  if(playerName !== null) {
    gameMessages.textContent = `Hi, ${playerName}, time to place your ships!`;
    shipMessages.textContent = `This ship is a ${attacker.ships[0].name}, and it's ${attacker.ships[0].size} spaces long. Pick a direction and the first space.`
    positionForm.classList.remove('hidden');
    nameForm.classList.add('hidden');
  } else {
    gameMessages.textContent = 'Please tell me, what should I call you?';
  }
})

// PLACE PLAYER 1 SHIPS

const directionInputs = document.getElementsByName('direction');
function radioValue() {
  for(let i = 0; i < directionInputs.length; i++) {
    if(directionInputs[i].checked) {
      return directionInputs[i].value;
    }
  }
} 

gameBoardContainer.addEventListener('click', (e) => {
  if(activeSpace) {
    activeSpace.classList.remove('active');
  }
  activeSpace = e.target;
  activeSpace.classList.add('active');
})

const submitBtn = document.getElementById('submit-btn');
let shipCounter = 0;

submitBtn.addEventListener('click', () => {
  const row = activeSpace.dataset.rowCoord;
  const column = activeSpace.dataset.columnCoord;
  const coord = { row: Number(row), column: Number(column)};

  if(phase = 'setup') {
    const direction = radioValue();
    if(activeSpace) {
      attacker.placeShip(coord, direction, shipCounter);
      shipCounter++;
      activeSpace.classList.remove('active');
      shipMessages.textContent = `This ship is a ${attacker.ships[shipCounter].name}, and it's ${attacker.ships[shipCounter].size} spaces long. Pick a direction and the first space.`;
      displayGame(currentBoard, currentBoard.rows, 'private');
    }
    if(shipCounter > 4) {
      phase = 'gameplay';
      shipMessages.classList.add('hidden');
      positionForm.classList.add('hidden');
      shipCounter = 0;
      gameMessages.textContent = `${attacker.name}, time for a battle at sea! Choose your first target.`;
      if(currentBoard === board1) {
        currentBoard = board2;
      } 
      else if(currentBoard === board2) {
        currentBoard = board1;
      }
      displayGame(currentBoard, currentBoard.rows, 'public');
    }
  } 
  // TAKE TURN
  else if(phase === 'gameplay') {
    currentBoard.receiveAttack(activeSpace);
    switchTurn();
    checkIfAITurn();
  }
})

function checkIfAITurn() {
  if(attacker.isComputer === true) {
    gameMessages.textContent = 'It\'s Hal\'s turn!'
    takeAITurn()
    .then(gameMessages.textContent = `Back to you, ${attacker.name}, choose wisely!`);
  } else {
    return;
  }
}

function takeAITurn() {
  setTimeout(() => {  attacker.makeGuess(); }, 2000);
  setTimeout(() => {  displayGame(currentBoard, currentBoard.rows, 'private'); }, 4000);
  setTimeout(() => { switchTurn(); }, 6000);
}

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
  }
  displayGame(currentBoard, currentBoard.rows, 'public');
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

   