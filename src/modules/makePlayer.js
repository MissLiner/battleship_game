import { boardFactory } from "./makeBoard"
import { shipFactory } from "./makeShips";

const playerFactory = (name, isComputer, oppBoard) => {
  const armadaArr = [];
  const allShipPositions = [];
  const ships = [ { name: 'Destroyer', size: 2 }, { name: 'Submarine', size: 3 }, { name: 'Cruiser', size: 3 }, { name: 'Battleship', size: 4 }, {name: 'Carrier', size: 5 }];
  let shipCounter = 0;
  let turnCounter = 0;

  // HUMAN FUNCTIONS
  function placeShip(firstSpace, direction) {
    const newShip = shipFactory(ships[shipCounter].name, ships[shipCounter].size, firstSpace, direction);
    newShip.positionShip();
    armadaArr.push(newShip);
    shipCounter++;
    return newShip;
  }

  // AI FUNCTIONS
  function getRandomInt(maxNum) {
    return Math.floor(Math.random() * (maxNum + 1));
  }
  function pickDirection() {
    const directNum = getRandomInt(1);
    let direction;
    if (directNum === 1) {
      direction = 'horizontal';
    } else {
      direction = 'vertical';
    }
    return direction;
  }

  function pickFirstSpace(size, direction) {
    let rowIndex;
    let columnIndex;
    let adjustedMax = 9 - size;

    if (direction === 'horizontal') {
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

  const findOpenSpaces = () => {
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

  function makeGuess(oppPlayer) {
    const allOpenSpaces = findOpenSpaces();
    const maxNum = allOpenSpaces.length;
    const guess = getRandomInt(maxNum);
    oppBoard.updateActiveSpace(guess);
  }

  function takeTurn(oppPlayer) {
        if(isComputer === true) {
          makeGuess(oppPlayer);
        } else {
          oppBoard.receiveAttack(oppPlayer);
        }
        turnCounter++;
  }

  //GETTERS
  function getArmada() { return armadaArr };
  function getAllShipPositions() { return allShipPositions };
  function getShips() { return ships };
  function getTurns() { return turnCounter };
  function getShipCounter() { return shipCounter };

  return { name, isComputer, getShips, placeShip, checkForDupes, findOpenSpaces, pickDirection, takeTurn, autoBuildArmada, getArmada, getAllShipPositions, getRandomInt, getTurns, getShipCounter };
}
export { playerFactory };