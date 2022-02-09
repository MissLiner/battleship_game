import { shipFactory } from "./makeShips";

const playerFactory = (name, isComputer, oppBoard) => {
  const ships = [ { name: 'Destroyer', size: 2 }, { name: 'Submarine', size: 3 }, { name: 'Cruiser', size: 3 }, { name: 'Battleship', size: 4 }, {name: 'Carrier', size: 5 }];

  const armadaArr = [];
  const allShipPositions = [];

  let shipCounter = 0;
  let turnCounter = 0;
  let winCounter = 0;

  // AI FUNCTIONS (INTERNAL TO MODULE)
  function getRandomInt(maxNum) {
    return Math.floor(Math.random() * (maxNum + 1));
  }
  function pickDirection() {
    const directNum = getRandomInt(1);
    let direction;
    if (directNum === 1) {
      direction = 'Horizontal';
    } else {
      direction = 'Vertical';
    }
    return direction;
  }
  function pickFirstSpace(size, direction) {
    let rowIndex;
    let columnIndex;
    let adjustedMax = 9 - size;

    if (direction === 'Horizontal') {
      rowIndex = getRandomInt(9);
      columnIndex = getRandomInt(adjustedMax);
    } else {
      rowIndex = getRandomInt(adjustedMax);
      columnIndex = getRandomInt(9);
    }
    const position = { row: rowIndex, column: columnIndex };
    return position;
  }
  function autoPlaceShip(ship) {
    const direction = pickDirection();
    const firstSpace = pickFirstSpace(ship.size, direction);
    const newShip = shipFactory(ship.name, ship.size, firstSpace, direction);
    newShip.positionShip();
    return newShip;
  }
  function checkForDupes(arr) {
    for(let item of arr) {
      const dupes1 = arr.filter(newItem1 => newItem1.row === item.row);
      const dupes2 = dupes1.filter(newItem2 => newItem2.column === item.column);
      if(dupes2.length > 1) { return true };
    }
    return false;
  }
 
  function findOpenSpaces() {
    const allOpenSpaces = [];
    for(let i = 0; i < 10; i++) {
      for(let x = 0; x < 10; x++) {
        if(oppBoard.rows[i][x] !== 'miss' && oppBoard.rows[i][x] !== 'hit') {
          let position = { row: i, column: x };
          allOpenSpaces.push(position);
        }
      }
    }
    return allOpenSpaces;
  }
  function makeGuess() {
    const allOpenSpaces = findOpenSpaces();
    const maxNum = allOpenSpaces.length - 1;
    const guessIndex = getRandomInt(maxNum);
    const guess = allOpenSpaces[guessIndex];
    oppBoard.updateActiveSpace(guess);
  }

  // HUMAN FUNCTIONS
  const placeShip = (firstSpace, direction) => {
    const newShip = shipFactory(ships[shipCounter].name, ships[shipCounter].size, firstSpace, direction);
    newShip.positionShip();
    armadaArr.push(newShip);
    shipCounter++;
    return newShip;
  }

  // HUMAN/AI FUNCTIONS
  const setName = (div) => {
    div.textContent = name;
  }
  const autoBuildArmada = () => {
    for (let i = shipCounter; i < ships.length; i++) {
      let dupeCounter = 0;
      let dupeCheckArr = [];
      let isDupe = false;
      let newShip = autoPlaceShip(ships[i]);

      do {
        dupeCheckArr = allShipPositions.concat(newShip.getPositions());
        isDupe = checkForDupes(dupeCheckArr);
        if(isDupe === true) {
          dupeCounter++;
          newShip = autoPlaceShip(ships[i]);
        }
      } while(isDupe === true && dupeCounter < 40);
      if(isDupe === true) { throw 'DUPES' + dupeCounter };

      for(let position of newShip.getPositions()) {
        allShipPositions.push(position);
      }
      armadaArr.push(newShip);
      shipCounter++;
    }
  }
  if(isComputer === true) {
    autoBuildArmada();
  }
  const takeTurn = (oppPlayer) => {
    if(isComputer === true) {
      makeGuess();
    }
    oppBoard.receiveAttack(oppPlayer);
    turnCounter++;
  }
  function emptyArr(fullArr) {
    while(fullArr.length > 0) {
      fullArr.pop();
    }
  }
  const reset = () => {
    emptyArr(armadaArr);
    emptyArr(allShipPositions);
    shipCounter = 0;
    turnCounter = 0;
    if(isComputer === true) {
      autoBuildArmada();
    }
  }
  const addWin = () => {
    winCounter++;
  }

  // GETTERS
  function getArmada() { return armadaArr };
  function getAllShipPositions() { return allShipPositions };
  function getShips() { return ships };
  function getTurns() { return turnCounter };
  function getShipCounter() { return shipCounter };

  return { name, isComputer, getRandomInt, placeShip, checkForDupes, findOpenSpaces, pickDirection, takeTurn, setName, autoBuildArmada, reset, addWin, getArmada, getAllShipPositions, getShips, getTurns, getShipCounter };
}
export { playerFactory };