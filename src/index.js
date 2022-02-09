import "./style.css";
import { boardFactory } from "./modules/makeBoard";
import { playerFactory } from "./modules/makePlayer";
import { displayGame } from "./modules/gameDisplay";

//DOM CONSTANTS
const gameMessages = document.getElementById("game-messages");
const nameForm = document.getElementById("name-form");
const nameInput = document.getElementById("name-input");
const nameInputBtn = document.getElementById("name-input-btn");
const positionForm = document.getElementById("position-form");
const submitBtn = document.getElementById("submit-btn");
const armadaBtn = document.getElementById("armada-btn");
const player1Name = document.getElementById("player1-name");
const player2Name = document.getElementById("player2-name");
const boardBox1 = document.getElementById("board-box-1");
const boardBox2 = document.getElementById("board-box-2");
const shipName = document.getElementById("ship-name");
const shipLength = document.getElementById("ship-length");
const directionInput = document.getElementById("direction-input");
const shipPosition = document.getElementById("ship-position");
const placeshipBtn = document.getElementById("placeship-btn");
const halGIF = document.getElementById("hal-gif");
const resetBtn = document.getElementById("reset-btn");
const rematchBtn = document.getElementById("rematch-btn");
const gameOverBox = document.getElementById("game-over-box");
const box2 = document.getElementById("box-2");
const gameboardBoxes = document.querySelectorAll(".gameboard-box");

// GAMEPLAY VARIABLES
let board1 = boardFactory("board1");
let board2 = boardFactory("board2");
let player1;
let player2;

let phase = "name";
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
function transformSpace(space) {
  let rowNum = space.dataset.rowCoord;
  rowNum = Number(rowNum);
  let colNum = space.dataset.columnCoord;
  colNum = Number(colNum);
  const coord = { row: rowNum, column: colNum };
  return coord;
}
function switchTurn() {
  const gameOver = yourBoard.checkIfAllSunk();
  if (gameOver === true) {
    endGame(currentPlayer);
    return;
  } else {
    if (player1turn === true) {
      player1turn = false;
    } else {
      player1turn = true;
    }
  }
  definePlayers();
  writeGameMessage();
  board1.updateStatus(yourBoard);
  board2.updateStatus(yourBoard);
  displayGame(board1, board2);
}

// DIALOG FUNCTIONS
function showPlacementDialog(player) {
  const shipNumber = player.getShipCounter();
  let order;
  switch (shipNumber) {
    case 0:
      order = "first";
      break;
    case 1:
      order = "second";
      break;
    case 2:
      order = "third";
      break;
    case 3:
      order = "fourth";
      break;
    case 4:
      order = "fifth and final";
      break;
  }
  gameMessages.textContent = `${player.name}, please place your ${order} ship (or I can do for you ->)`;
  shipName.textContent = `${player.getShips()[shipNumber].name}`;
  shipLength.textContent = `${player.getShips()[shipNumber].size} spaces`;
}
function writeAdminMessage(purpose) {
  const adminMessages = {
    confirmArmada:
      "Are you ready to play? Click Submit to lock in your choices.",
    firstGuess: `${currentPlayer.name}, time for a battle at sea! Choose your first target.`,
    winningHuman: `You've got ${otherPlayer.name} on the ropes now!`,
    losingHuman: `Focus, ${currentPlayer.name}, your armada is in trouble!`,
    winQuick: `YOU WON, ${
      currentPlayer.name
    }!!! And it only took you ${currentPlayer.getTurns()} turns to annihilate ${
      otherPlayer.name
    }`,
    winSlow: `I was worried for a minute there, but YOU WON, ${
      currentPlayer.name
    }! Way to hang in there, it took ${otherPlayer.getTurns()} turns.`,
    loseQuick: `${currentPlayer.name} won! They slayed ${
      otherPlayer.name
    } in only ${currentPlayer.getTurns()} turns.`,
    loseSlow: `You almost had it, ${otherPlayer.name}, but ${
      currentPlayer.name
    } WON in ${currentPlayer.getTurns()} turns.`,
  };
  gameMessages.textContent = adminMessages[purpose];
}
function writeGameMessage() {
  const humanMessages = [
    `Your turn, ${currentPlayer.name}.`,
    `Are you gonna let a computer beat you?!?`,
    `You got this, ${currentPlayer.name}!`,
    `Back to you, ${currentPlayer.name}, choose wisely!`,
  ];
  const AIMessages = [
    `It\'s ${currentPlayer.name}\'s turn.`,
    `${currentPlayer.name} is thinking hard right now . . .`,
    `I hope ${currentPlayer.name} isn't using this game to plan the robot revolution!`,
  ];
  let messArr;
  currentPlayer.isComputer === true
    ? (messArr = AIMessages)
    : (messArr = humanMessages);
  const messIndex = currentPlayer.getRandomInt(messArr.length - 1);
  gameMessages.textContent = messArr[messIndex];
}
function writeErrMessage(err) {
  const errMessages = {
    name: "Please tell me, what should I call you?",
    direction: "Please add a direction for your ship",
    coord: "Please choose your ships's starting position",
    dupe: "No need to attack there, you already did! Please choose another space.",
    noguess: `You must choose a coordinate to attack before submitting.`,
  };
  alert(errMessages[err]);
}

// GAME FUNCTIONS

function startSetup() {
  hide(boardBox2);
  hide(nameForm);
  hide(submitBtn);
  show(positionForm);
  show(armadaBtn);

  phase = 'setup';
  definePlayers();
  showPlacementDialog(currentPlayer);

  board1.updateStatus(myBoard);
  board2.updateStatus(myBoard);
  displayGame(board1, board2);
}
function confirmShips() {
  writeAdminMessage("confirmArmada");
  hide(box2);
  hide(positionForm);
  hide(armadaBtn);
  show(submitBtn);
}
function startGame() {
  phase = "gameplay";
  writeAdminMessage("firstGuess");
  definePlayers();
  board1.updateStatus(yourBoard);
  board2.updateStatus(yourBoard);
  show(box2);
  show(boardBox2);
  show(gameOverBox);
  boardBox2.appendChild(submitBtn);
  displayGame(board1, board2);
}
function loopGame() {
  currentPlayer.takeTurn(otherPlayer, yourBoard.getActiveSpace()); //rewrite
  yourBoard.updateActiveSpace('');
  if (currentPlayer.isComputer === true) {
    hide(submitBtn);
    show(halGIF);
    setTimeout(() => {
      displayGame(board1, board2);
    }, 2000);
    setTimeout(() => {
      switchTurn();
      writeGameMessage();
      show(submitBtn);
      hide(halGIF);
    }, 2500);
  } else {
    switchTurn();
  }
}
function endGame(player) {
  player.addWin();
  displayGame(board1, board2);
  if (player.isComputer === false) {
    if (player.getTurns() < 66) {
      writeAdminMessage("winQuick");
    } else {
      writeAdminMessage("winSlow");
    }
  } else {
    if (player.getTurns() < 66) {
      writeAdminMessage("loseQuick");
    } else {
      writeAdminMessage("loseSlow");
    }
  }
  show(submitBtn);
  boardBox1.appendChild(submitBtn);
  hide(submitBtn);
}

// CREATE COMPUTER PLAYER2
function createPlayerAI(turn) {
  if (turn === 1) {
    player1 = playerFactory("Hal 9000", true, board2);
    board1.placeArmada(player1.getArmada());
    player1.setName(player1Name);
  } else {
    player2 = playerFactory("Hal 9000", true, board1);
    board2.placeArmada(player2.getArmada());
    player2.setName(player2Name);
  }
  displayGame(board1, board2);
}
createPlayerAI(2);

// CREATE HUMAN PLAYER1
nameInputBtn.addEventListener("click", () => {
  if (!nameInput.value) {
    writeErrMessage("name");
    return;
  } else if ((player1turn = true)) {
    player1 = playerFactory(nameInput.value, false, board2);
    player1Name.textContent = player1.name;
  } else {
    player2 = playerFactory(nameInput.value, false, board1);
    player2Name.textContent = player2.name;
  }
  startSetup();
});

// PLACE PLAYER1 SHIPS
armadaBtn.addEventListener("click", () => {
  currentPlayer.autoBuildArmada();
  myBoard.placeArmada(currentPlayer.getArmada());
  displayGame(board1, board2);
  confirmShips();
});

placeshipBtn.addEventListener("click", () => {
  const direction = directionInput.value;
  if (direction === false) {
    writeErrMessage("direction");
    return;
  }
  if (myBoard.getActiveSpace()) {
    const newShip = currentPlayer.placeShip(
      myBoard.getActiveSpace(),
      direction
    );
    myBoard.placeShip(newShip.getPositions(), newShip.name);
    myBoard.updateActiveSpace("");
    displayGame(board1, board2);
    if (currentPlayer.getShipCounter() < 5) {
      showPlacementDialog(currentPlayer);
    } else {
      confirmShips();
    }
  } else {
    alert(writeErrMessage("coord"));
  }
});

gameboardBoxes.forEach((box) => {
  box.addEventListener("click", (e) => {
    if (box.classList.contains("active-board")) {
      const spaces = document.querySelectorAll(".space");
      for (let space of spaces) {
        if (space.classList.contains("active-space")) {
          space.classList.remove("active-space");
        }
      }
      e.target.classList.add("active-space");

      const coord = transformSpace(e.target);
      if (phase === "setup") {
        const row = coord.row + 1;
        const column = String.fromCharCode(coord.column + 65);
        shipPosition.value = `${column}-${row}`;
        myBoard.updateActiveSpace(coord);
      } else if (phase === "gameplay") {
        yourBoard.updateActiveSpace(coord);
      }
    }
  });
});

submitBtn.addEventListener("click", () => {
  if (phase === "setup") {
    startGame();
  }
  // TAKE TURN
  else if (phase === "gameplay") {
    if (yourBoard.getActiveSpace() === "") {
      writeErrMessage("noguess");
      return;
    }
    loopGame();
    if (currentPlayer.isComputer === true) {
      loopGame();
    }
  }
});

rematchBtn.addEventListener("click", () => {
  board1.reset();
  board2.reset();
  player1.reset();
  player2.reset();
  board2.placeArmada(player2.getArmada());
  player1turn = true;
  startSetup();
  hide(gameOverBox);
  boardBox1.appendChild(submitBtn);
});

resetBtn.addEventListener("click", () => {
  phase = "setup";
  player1turn = true;
  board1.reset();
  board2.reset();
  player2.reset();
  displayGame(board1, board2);
  gameMessages.textContent = "";
  show(nameForm);
  hide(gameOverBox);
  boardBox1.appendChild(submitBtn);
  hide(submitBtn);
});

// TO DO
// -Add sunk ships display
// -Fix up game over
// -Have AI guess near spaces to hit
// -Enable two human players

// FUNCTIONS ONLY EXTERNAL FOR TESTING

//  MAKEPLAYER
//  -checkForDupes
//  -findOpenSpaces (NOT TESTED EITHER)
//  -pickDirection
//  MAKEBOARD
//  -hitShip