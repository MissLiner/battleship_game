import { boardFactory } from "./makeBoard"
import { shipFactory } from "./makeShips";

const playerFactory = (name, isComputer, oppBoard) => {
  const armadaArr = [];
  const allShipPositions = [];
  const ships = [ { name: 'Destroyer', size: 2 }, { name: 'Submarine', size: 3 }, { name: 'Cruiser', size: 3 }, { name: 'Battleship', size: 4 }, {name: 'Carrier', size: 5 }];

  // HUMAN FUNCTIONS
  


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
    for (let i = 0; i < ships.length; i++) {
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
    }
  }

  if(isComputer === true) {
    autoBuildArmada();
  }

  const findOpenSpaces = () => {
    const allOpenSpaces = [];
    for(let i = 0; i < 10; i++) {
      for(let x = 0; x < 10; x++) {
        if(oppBoard.rows[i][x] === 'open' || oppBoard.rows[i][x] === 'ship') {
          let position = { row: i, column: x };
          allOpenSpaces.push(position);
        }
      }
    }
    return allOpenSpaces;
  }

  const makeGuess = () => {
    const allOpenSpaces = findOpenSpaces();
    const maxNum = allOpenSpaces.length;
    const guess = getRandomInt(maxNum);
    oppBoard.receiveAttack(allOpenSpaces[guess]);
  }

  //GETTERS
  function getArmada() { return armadaArr };
  function getAllShipPositions() { return allShipPositions };

  return { name, getArmada, makeGuess, checkForDupes, findOpenSpaces, getAllShipPositions };
}
export { playerFactory };