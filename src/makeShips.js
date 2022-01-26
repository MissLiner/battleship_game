
const shipFactory = (player, size, positions, direction) => {
  let status = 'afloat';
  let hits = 0;

  function hit() {
    hits += 1;
    if (hits === size) {
      status = 'sunk';
    }
  }
  function getHits() { return hits };
  function getStatus() { return status };
  function getDirection() { return direction };
  
  const flip = () => {
    if(direction === 'horizontal') {
      direction = 'vertical';
    } 
    else if(direction === 'vertical') {
      direction = 'horizontal';
    }
  }
  return { player, size, positions, getDirection, hit, getHits, getStatus, flip }
}
export {
  shipFactory,
}