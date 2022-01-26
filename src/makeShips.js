
const shipFactory = (player, size) => {
  let status = 'afloat';
  let hits = 0;

  function hit() {
    hits += 1;
    if (hits === size) {
      status = 'sunk';
    }
  }
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
  
  // const flip = () => {
  //   if(direction === 'horizontal') {
  //     direction = 'vertical';
  //   } 
  //   else if(direction === 'vertical') {
  //     direction = 'horizontal';
  //   }
  // }
  function pickFirstSpace() {
    let rowIndex;
    let columnIndex;
    let adjustedMax = 10 - size;
    if (direction === 'horizontal') {
      rowIndex = getRandomInt(10);
      columnIndex = getRandomInt(adjustedMax);
    } else {
      rowIndex = getRandomInt(adjustedMax);
      columnIndex = getRandomInt(10);
    }
    const position = { row: rowIndex, column: columnIndex };
    return position;
  }
  let positions;
  let direction;
  const positionShip = () => {
    direction = pickDirection();
    const firstPosition = pickFirstSpace();
    positions = [ firstPosition ];
    let rowPos = firstPosition.row;
    let colPos = firstPosition.column;
      
    for(let i = 0; i < size - 1; i++) {
      let newColumn = colPos + 1 + i;
      let newRow = rowPos + 1 + i;
      let newPosition;
      if(direction === 'horizontal') {
        newPosition = { row: rowPos, column: newColumn }
      } else if(direction === 'vertical') {
        newPosition = { row: newRow, column: colPos }
      }
      positions.push(newPosition); 
    }
  }
  function getHits() { return hits };
  function getStatus() { return status };
  function getDirection() { return direction };
  function getPositions() { return positions };

  return { player, size, positions, direction, getDirection, hit, getHits, getStatus, positionShip, getPositions, getRandomInt }

}
export {
  shipFactory,
}