
const shipFactory = (player, size, positions) => {
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
  function assignDirection() {
    const directNum = getRandomInt(1);
    let direction;
    if (directNum === 1) {
      direction = 'horizontal';
    } else {
      direction = 'vertical';
    }
    return direction;
  }
  let direction = assignDirection();
  
  const flip = () => {
    if(direction === 'horizontal') {
      direction = 'vertical';
    } 
    else if(direction === 'vertical') {
      direction = 'horizontal';
    }
  }
  return { player, size, positions, direction, getDirection, hit, getHits, getStatus, flip }
  function getHits() { return hits };
  function getStatus() { return status };
  function getDirection() { return direction };
}
export {
  shipFactory,
}