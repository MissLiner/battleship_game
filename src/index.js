//fix gameplay so the right board and previous attacks are showing, and AI takes the right amount of time and shows its work

import './style.css';
import { boardFactory } from './modules/makeBoard';
import { playerFactory } from './modules/makePlayer';
import { displayGame } from './modules/gameDisplay';
// import { shipFactory } from './makeShips';

const gameMessages = document.getElementById('game-messages');
const shipMessages = document.getElementById('ship-messages');
const nameForm = document.getElementById('name-form');
const nameInput = document.getElementById('name-input');
const nameInputBtn = document.getElementById('name-input-btn');
const gameBoardContainer = document.getElementById('board-container');
const positionForm = document.getElementById('position-form');
const directionInputs = document.getElementsByName('direction');
const submitBtn = document.getElementById('submit-btn');

let board1 = boardFactory();
let board2 = boardFactory();
let player1;
let player2;
let player1turn = true;
let phase = 'setup';
let activeSpace;
let shipCounter = 0;
let turnCounter1 = 0;
let turnCounter2 = 0;

function switchTurn() {
  if(player1turn === true) { 
    player1turn = false;
    turnCounter1++;
  } else {  
    player1turn = true;
    turnCounter2++;
  }
}

// = playerFactory('Hal', true, board1);
// board2.placeArmada(player2.getArmada());

displayGame(board1, board1.rows, 'public');

// should i make value of name a promise, and create player when it is fulfilled?


// CREATE PLAYER 1
function showPlacementDialog(player, shipNumber) {
  gameMessages.textContent = `Hi, ${player.name}, time to place your ships!`;
  shipMessages.textContent = `This ship is a ${player.getShips()[shipNumber].name}, and it's ${player.getShips()[shipNumber].size} spaces long. Pick a direction and the first space.`;
}

nameInputBtn.addEventListener('click', () => {
  if(nameInput.value === null) {
    gameMessages.textContent = 'Please tell me, what should I call you?';
    return;
  }
  else if(player1turn = true) {
    player1 = playerFactory(nameInput.value, false, board2);
    showPlacementDialog(player1, 0);
  } else {
    player2 = playerFactory(nameInput.value, false, board1);
    showPlacementDialog(player2, 0);
  }
  positionForm.classList.remove('hidden');
  nameForm.classList.add('hidden');
})

// PLACE PLAYER 1 SHIPS
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

submitBtn.addEventListener('click', () => {
  const row = activeSpace.dataset.rowCoord;
  const column = activeSpace.dataset.columnCoord;
  const coord = { row: Number(row), column: Number(column)};

  let currentPlayer;
  let otherPlayer;
  let myBoard;
  let yourBoard;

  function definePlayers() {
    if (player1turn === true) {
      currentPlayer = player1;
      otherPlayer = player2;
      myBoard = board1;
      yourBoard = board2;
    } else {
      currentPlayer = player2;
      otherPlayer = player1;
      myBoard = board2;
      yourBoard = board2;
    }
  }
  definePlayers();

  if(phase === 'setup' && shipCounter < 5) {
    const direction = radioValue();
    if(activeSpace) {
      const newShip = currentPlayer.placeShip(coord, direction, shipCounter);
      myBoard.drawShip(newShip.getPositions(), newShip.name);
      activeSpace.classList.remove('active');
      displayGame(myBoard, myBoard.rows, 'private');
      shipCounter++;
      if(shipCounter < 5) {
        showPlacementDialog(currentPlayer, shipCounter);
      } else {
        shipMessages.classList.add('hidden');
        positionForm.classList.add('hidden');
        gameMessages.textContent = 'Are you ready to play? Click Submit to lock in your choices.';
      }
    }
  }
  else if(phase === 'setup' && shipCounter > 4) {
    shipCounter = 0;
    phase = 'gameplay';
    gameMessages.textContent = `${currentPlayer.name}, time for a battle at sea! Choose your first target.`;
    displayGame(yourBoard, yourBoard.rows, 'public');
  }
  // TAKE TURN
  else if(phase === 'gameplay') {
    yourBoard.receiveAttack(activeSpace);
    displayGame(yourBoard, yourBoard.rows, 'public');
    switchTurn();
    definePlayers();
    displayGame(yourBoard, yourBoard.rows, 'public');
    checkIfAITurn(currentPlayer, otherPlayer, yourBoard);
    definePlayers();
  }
})

function checkIfAITurn(player, opponent, oppBoard) {
  if(player.isComputer === true) {
    gameMessages.textContent = 'It\'s Hal\'s turn!'
    takeAITurn(player, oppBoard);
    gameMessages.textContent = `Back to you, ${opponent.name}, choose wisely!`;
  } else {
    return;
  }
}
function takeAITurn(player, oppBoard) {
  setTimeout(() => {  player.makeGuess(); }, 2000);
  setTimeout(() => {  displayGame(oppBoard, oppBoard.rows, 'private'); }, 4000);
  setTimeout(() => { switchTurn(); }, 6000);
}




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

   