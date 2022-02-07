// TO DO

// -Separate submit buttons
// -Add ship tally on screen for each player
// -Fix up game over
// -set up reset game
// -Show whose turn it is or label boards
// -Clean up code, functions to modules where possible
// -Change colors as ships sink / are sunk
// -Have AI guess near spaces to hit
// -Enable two human players

// FUNCTIONS ONLY EXTERNAL FOR TESTING

//  MAKEPLAYER
//  -checkForDupes
//  -findOpenSpaces (NOT TESTED EITHER)
//  -pickDirection
//  MAKEBOARD
//  -hitShip

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
const gameboardBox1 = document.getElementById('gameboard-box-1');
const gameboardBox2 = document.getElementById('gameboard-box-2');

// GAMEPLAY VARIABLES
let board1 = boardFactory('board1');
let board2 = boardFactory('board2');
let player1;
let player2;

let phase = 'setup';
let player1turn = true;

let currentPlayer;
let otherPlayer;
let myBoard;
let yourBoard;

// BASIC FUNCTIONS
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
    yourBoard = board1;
  }
}
function hide(elem) {
  elem.classList.add('hidden');
}
function show(elem) {
  elem.classList.remove('hidden');
}

function radioValue() {
  for(let i = 0; i < directionInputs.length; i++) {
    if(directionInputs[i].checked) {
      return directionInputs[i].value;
    }
  }
  return false;
} 
function switchTurn() {
  const gameOver = myBoard.checkIfAllSunk();
  if(gameOver === true) {
    alert(`GAME OVER: ${otherPlayer.name} won!`);
  } else {
    if(player1turn === true) { 
      player1turn = false;
    } else {  
      player1turn = true;
    }
  }
  definePlayers();
  board1.updateStatus(yourBoard);
  board2.updateStatus(yourBoard);
  displayGame(board1, board2);
}

// DIALOG FUNCTIONS
function showPlacementDialog(player) {
  const shipNumber = player.getShipCounter();
  let order;
  switch(shipNumber) {
    case 0: order = 'first';
    break;
    case 1: order = 'second';
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
  writeAdminMessage('confirmArmada');
  hide(shipMessages);
  hide(positionForm);
}
// GAME FUNCTIONS
function startGame() {
  phase = 'gameplay';
  writeAdminMessage('firstGuess');
  definePlayers();
  board1.updateStatus(yourBoard);
  board2.updateStatus(yourBoard);
  displayGame(board1, board2);
}
function loopGame() {
  currentPlayer.takeTurn(otherPlayer, yourBoard.getActiveSpace()); //rewrite
  yourBoard.updateActiveSpace('');
  if(currentPlayer.isComputer === true) {
    setTimeout(() => { displayGame(board1, board2); }, 2000);
    setTimeout(() => { switchTurn() }, 4000);
    setTimeout(() => { writeGameMessage() }, 4000);
  } else {
    switchTurn();
    writeGameMessage();
  }
}

// CREATE COMPUTER PLAYER2
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
    showPlacementDialog(player1);
  } else {
    player2 = playerFactory(nameInput.value, false, board1);
    showPlacementDialog(player2);
  }
  definePlayers();
  board1.updateStatus(myBoard);
  board2.updateStatus(myBoard);
  displayGame(board1, board2);
  show(positionForm);
  hide(nameForm);
})

// PLACE PLAYER1 SHIPS
armadaBtn.addEventListener('click', () => {
  currentPlayer.autoBuildArmada();
  myBoard.placeArmada(currentPlayer.getArmada());
  displayGame(board1, board2);
  confirmShips();
})

const gameboardBoxes = document.querySelectorAll('.gameboard-box');
function transformSpace(space) {
  let rowNum = space.dataset.rowCoord;
  rowNum = Number(rowNum);
  let colNum = space.dataset.columnCoord;
  colNum = Number(colNum);
  const coord = { row: rowNum, column: colNum };
  return coord;
}
gameboardBoxes.forEach(box => {
  box.addEventListener('click', (e) => {
    if(box.classList.contains('active')) {
      const spaces = document.querySelectorAll('.space');
      for(let space of spaces) {
        if(space.classList.contains('active-space')) {
          space.classList.remove('active-space');
        }
      }
      e.target.classList.add('active-space');

      const coord = transformSpace(e.target);
      if(phase === 'setup') {
        myBoard.updateActiveSpace(coord);
      } 
      else if(phase === 'gameplay') {
        yourBoard.updateActiveSpace(coord);
      }
    }
  })
})

submitBtn.addEventListener('click', () => {
  if(phase === 'setup' && currentPlayer.getShipCounter() < 5) {
    const direction = radioValue();
    if(direction === false) {
      writeErrMessage('direction');
      return;
    }

    if(myBoard.getActiveSpace()) {
      const newShip = currentPlayer.placeShip(myBoard.getActiveSpace(), direction);
      myBoard.placeShip(newShip.getPositions(), newShip.name);
      myBoard.updateActiveSpace('');
      displayGame(board1, board2);
      if(currentPlayer.getShipCounter() < 5) {
        showPlacementDialog(currentPlayer);
      } else {
        confirmShips();
      }
    } else {
      alert(writeErrMessage('coord'));
    }
  }
  else if(phase === 'setup' && currentPlayer.getShipCounter() > 4) {
    startGame();
  }
  // TAKE TURN
  else if(phase === 'gameplay') {
    if(yourBoard.getActiveSpace() === '') {
      writeErrMessage('noguess');
      return;
    }
    loopGame();
    if(currentPlayer.isComputer === true) {
      loopGame();
    }
  }
})