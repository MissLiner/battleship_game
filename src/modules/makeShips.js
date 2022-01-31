
const shipFactory = (name, size, firstPosition, direction) => {
  let status = 'afloat';
  let hits = 0;
  const positions = [ firstPosition ];

  const hit = () => {
    hits++;
    if (hits === size) {
      status = 'sunk';
    }
  }

  const positionShip = () => {
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

  return { name, size, positions, getDirection, hit, getHits, getStatus, positionShip, getPositions }

}
export {
  shipFactory,
}