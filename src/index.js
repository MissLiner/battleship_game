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
const armadaBtn = document.getElementById('armada-btn');

//GAMEPLAY VARIABLES
let board1 = boardFactory('board1');
let board2 = boardFactory('board2');
let player1;
let player2;

let phase = 'setup';
let activeSpace;
let shipCounter = 0;
let player1turn = true;
let turnCounter1 = 0; //DOTHIS
let turnCounter2 = 0;

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

//BASIC FUNCTIONS
function hide(elem) {
  elem.classList.add('hidden');
}
function show(elem) {
  elem.classList.remove('hidden');
}
function toggleActiveSpace(newSpace) {
  if(activeSpace) {
    activeSpace.classList.remove('active');
  }
  activeSpace = newSpace;
  activeSpace.classList.add('active');
}
function clearActiveSpace() {
  activeSpace = '';
}
function radioValue() {
  for(let i = 0; i < directionInputs.length; i++) {
    if(directionInputs[i].checked) {
      return directionInputs[i].value;
    } else {
      return false;
    }
  }
} 
function switchTurn() {
  const gameOver = myBoard.checkIfAllSunk();
  if(gameOver === true) {
    alert(`GAME OVER: ${otherPlayer.name} won!`);
  } else {
    if(player1turn === true) { 
      player1turn = false;
      turnCounter1++;
    } else {  
      player1turn = true;
      turnCounter2++;
    }
  }
  definePlayers();
  board1.updateStatus(myBoard);
  board2.updateStatus(myBoard);
}

function showPlacementDialog(player, shipNumber) {
  let order;
  switch(shipNumber) {
    case 0: order = 'first';
    break;
    case 1: order = 'second';
      hide(armadaBtn);
    break;
    case 2: order = 'third';
    break;
    case 3: order = 'fourth';
    break;
    case 4: order = 'fifth and final';
    break;
  }
  gameMessages.textContent = `${player.name}, please place your ${order} ship.`;
  shipMessages.textContent = `This ship is a ${player.getShips()[shipNumber].name}, and it's ${player.getShips()[shipNumber].size} spaces long. Pick a direction and the first space.`;
}
function writeAdminMessage(purpose) {
  const adminMessages = {
    confirmArmada: 'Are you ready to play? Click Submit to lock in your choices.',
    firstGuess: `${currentPlayer.name}, time for a battle at sea! Choose your first target.`,
    winningHuman: `You've got ${otherPlayer.name} on the ropes now!`,
    losingHuman: `Focus, ${currentPlayer.name}, your armada is in trouble!`,
    winQuick: `YOU WON, ${currentPlayer.name}!!! And it only took you ${currentPlayer.getTurns()} turns to annihilate ${otherPlayer.name}`,
    winSlow: `I was worried for a minute there, but YOU WON, ${currentPlayer.name}! Way to hang in there, it took ${otherPlayer.getTurns()} turns.`,
    loseQuick: `${currentPlayer.name} won! They slayed ${otherPlayer.name} in only ${currentPlayer.getTurns()} turns.`,
    loseSlow: `You almost had it, ${otherPlayer.name}, but ${currentPlayer.name} WON in ${currentPlayer.getTurns()} turns.`,
  }
  gameMessages.textContent = adminMessages[purpose];
}
function writeGameMessage() {
  const humanMessages = [
    `Your turn, ${currentPlayer.name}.`,
    `Are you gonna let a computer beat you?!?`,
    `You got this, ${currentPlayer.name}!`,
    `Back to you, ${currentPlayer.name}, choose wisely!`,
  ]
  const AIMessages = [
    `It\'s ${currentPlayer.name}\'s turn.`,
    `${currentPlayer.name} is thinking hard right now . . .`,
    `I hope ${currentPlayer.name} isn't using this game to plan the robot revolution!`,
  ]
  let messArr;
  currentPlayer.isComputer === true ? messArr = AIMessages : messArr = humanMessages;
  const messIndex = currentPlayer.getRandomInt(messArr.length - 1);
  gameMessages.textContent = messArr[messIndex];
}
function writeErrMessage(err) {
  const errMessages = {
    name: 'Please tell me, what should I call you?',
    direction: 'Please add a direction for your ship',
    coord: 'Please choose your ships\'s starting position',
    dupe: 'No need to attack there, you already did! Please choose another space.',
    noguess: `You must choose a coordinate to attack before submitting.`,
  }
  alert(errMessages[err]);
}
function confirmShips() {
  writeAdminMessage(confirmArmada);
  hide(shipMessages);
  hide(positionForm);
}
function startGame() {
  shipCounter = 0;
  phase = 'gameplay';
  writeAdminMessage('firstGuess');
  displayGame(board1, board2);
}
function loopGame() {
  currentPlayer.takeTurn(otherPlayer, activeSpace);
  clearActiveSpace();
  displayGame(board1, board2);
  switchTurn();
  definePlayers();
  displayGame(board1, board2);
  writeGameMessage(currentPlayer, activeSpace);
}

//CREATE COMPUTER PLAYER2
player2 = playerFactory('Hal', true, board1);
board2.placeArmada(player2.getArmada());

displayGame(board1, board2);

// CREATE HUMAN PLAYER1
nameInputBtn.addEventListener('click', () => {
  if(!nameInput.value) {
    writeErrMessage('name');
    return;
  }
  else if(player1turn = true) {
    player1 = playerFactory(nameInput.value, false, board2);
    showPlacementDialog(player1, 0);
  } else {
    player2 = playerFactory(nameInput.value, false, board1);
    showPlacementDialog(player2, 0);
  }
  definePlayers();
  show(positionForm);
  hide(nameForm);
})

// PLACE PLAYER1 SHIPS
armadaBtn.addEventListener('click', () => {
  currentPlayer.autoBuildArmada();
  myBoard.placeArmada(currentPlayer.getArmada());
  shipCounter = 5;
  displayGame(board1, board2);
  confirmShips();
})

gameDisplayBox.addEventListener('click', (e) => {
  if(e.target.classList.contains('space')) {
    if(!e.target.classList.contains('miss') && !e.target.classList.contains('hit')) {
      toggleActiveSpace(e.target);
    } else {
      alert(writeErrMessage('dupe'));
    }
  }
})

submitBtn.addEventListener('click', () => {
  let row;
  let column;
  let coord;

  if(activeSpace) {
    row = activeSpace.dataset.rowCoord;
    row = Number(row);
    column = activeSpace.dataset.columnCoord;
    column = Number(column);
    coord = { row: row, column: column};
  }
  // DO THIS - clean up code below
  if(phase === 'setup' && shipCounter < 5) {
    if(radioValue() === false) {
      writeErrMessage('direction');
      return;
    }

    const direction = radioValue();
    if(activeSpace) {
      const newShip = currentPlayer.placeShip(coord, direction, shipCounter);
      myBoard.drawShip(newShip.getPositions(), newShip.name);
      activeSpace.classList.remove('active');
      displayGame(board1, board2);
      shipCounter++;
      clearActiveSpace();
      if(shipCounter < 5) {
        showPlacementDialog(currentPlayer, shipCounter);
      } else {
        confirmShips();
      }
    } else {
      alert(writeErrMessage('coord'));
    }
  }
  else if(phase === 'setup' && shipCounter > 4) {
    startGame();
  }
  // TAKE TURN
  else if(phase === 'gameplay') {
    if(activeSpace === '') {
      writeErrMessage('noguess');
      return;
    }
    loopGame();
    if(currentPlayer.isComputer === true) {
      loopGame();
    }
  }
})