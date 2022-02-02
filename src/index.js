//fix gameplay so the right board and previous attacks are showing, and AI takes the right amount of time and shows its work
// should i make value of name a promise, and create player when it is fulfilled?
// TO DO
// -Set up game over
// -Show your own board while hitting other
// -Show whose turn it is

// -Change colors as ships sink / are sunk
// -Have AI guess near spaces to hit
// -display both boards

import './style.css';
import { boardFactory } from './modules/makeBoard';
import { playerFactory } from './modules/makePlayer';
import { displayGame } from './modules/gameDisplay';

//DOM CONSTANTS
const gameMessages = document.getElementById('game-messages');
const shipMessages = document.getElementById('ship-messages');
const nameForm = document.getElementById('name-form');
const nameInput = document.getElementById('name-input');
const nameInputBtn = document.getElementById('name-input-btn');
const gameDisplayBox = document.getElementById('game-display-box');
const positionForm = document.getElementById('position-form');
const directionInputs = document.getElementsByName('direction');
const submitBtn = document.getElementById('submit-btn');

//GAMEPLAY VARIABLES
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

//BASIC FUNCTIONS
function hide(elem) {
  elem.classList.add('hidden');
}
function show(elem) {
  elem.classList.remove('hidden');
}
function toggleActive(newSpace) {
  if(activeSpace) {
    activeSpace.classList.remove('active');
  }
  activeSpace = newSpace;
  activeSpace.classList.add('active');
}
function radioValue() {
  for(let i = 0; i < directionInputs.length; i++) {
    if(directionInputs[i].checked) {
      return directionInputs[i].value;
    }
  }
} 
function switchTurn() {
  if(player1turn === true) { 
    player1turn = false;
    turnCounter1++;
  } else {  
    player1turn = true;
    turnCounter2++;
  }
}
function checkIfAITurn(player, opponent) {
  if(player.isComputer === true) {
    gameMessages.textContent = `It\'s ${player.name}\'s turn!`
    takeAITurn();
    gameMessages.textContent = `Back to you, ${opponent.name}, choose wisely!`;
  } else {
    return;
  }
}
function showPlacementDialog(player, shipNumber) {
  let order;
  switch(shipNumber) {
    case '0': order = 'first';
    break;
    case '1': order = 'second';
    break;
    case '2': order = 'third';
    break;
    case '3': order = 'fourth';
    break;
    case '4': order = 'fifth and final';
    break;
  }
  gameMessages.textContent = `${player.name}, please place your ${order} ship.`;
  shipMessages.textContent = `This ship is a ${player.getShips()[shipNumber].name}, and it's ${player.getShips()[shipNumber].size} spaces long. Pick a direction and the first space.`;
}

//CREATE COMPUTER PLAYER2
player2 = playerFactory('Hal', true, board1);
board2.placeArmada(player2.getArmada());

displayGame(board1, board2);

// CREATE HUMAN PLAYER1


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
  hide(positionForm);
  hide(nameForm);
})

// PLACE PLAYER1 SHIPS
gameDisplayBox.addEventListener('click', (e) => {
  toggleActive(e.target);
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
      displayGame(board1, board2);
      shipCounter++;
      if(shipCounter < 5) {
        showPlacementDialog(currentPlayer, shipCounter);
      } else {
        gameMessages.textContent = 'Are you ready to play? Click Submit to lock in your choices.';
        hide(shipMessages);
        hide(positionForm);
      }
    }
  }
  else if(phase === 'setup' && shipCounter > 4) {
    shipCounter = 0;
    phase = 'gameplay';
    gameMessages.textContent = `${currentPlayer.name}, time for a battle at sea! Choose your first target.`;
    displayGame(board1, board2);
  }
  // TAKE TURN
  else if(phase === 'gameplay') {
    yourBoard.receiveAttack(activeSpace);
    displayGame(board1, board2);
    switchTurn();
    definePlayers();
    displayGame(board1, board2);
    checkIfAITurn(currentPlayer, otherPlayer);
    definePlayers();
  }
})