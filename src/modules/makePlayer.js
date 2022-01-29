import { boardFactory } from "./makeBoard"

const playerFactory = (turn, isComputer, playerBoard) => {
  const armadaArr = [];
  const ships = [ { name: 'Destroyer', size: 2 }, { name: 'Submarine', size: 3 }, { name: 'Cruiser', size: 3 }, { name: 'Battleship', size: 4 }, {name: 'Carrier', size: 5 }];

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
  function pickFirstSpace() {
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
  const autoBuildArmada = () => {
    for (let i = 0; i < ships.length; i++) {
      let isDupe = false;
      const direction = pickDirection();
      const firstSpace = pickFirstSpace();
      const newShip = shipFactory(ships[i].name, ships[i].size, firstSpace, direction);
      let dupeCounter = 0;
      let dupeCheckArr;
      do {
        dupeCounter++;
        newShip.positionShip();
        dupeCheckArr = allShipPositions.concat(newShip.getPositions());
        isDupe = checkForDupes(dupeCheckArr);
      } while(isDupe === true && dupeCounter < 10);
      if(isDupe === true) { throw dupeCheckArr };
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
        if(rows[i][x] === 'open' || rows[i][x] === 'ship') {
          let position = { row: i, column: x };
          allOpenSpaces.push(position);
        }
      }
    }
    return allOpenSpaces;
  }

  function makeGuess(board) {
    const allOpenSpaces = board.findOpenSpaces();
    const maxNum = allOpenSpaces.length;
    const guess = getRandomInt(maxNum);
    board.receiveAttack(allOpenSpaces[guess]);
  }

  return { playerBoard, turn, makeGuess };
}
export { playerFactory };