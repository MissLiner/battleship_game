
const shipFactory = (length, positions) => {
  let status = 'afloat';
  let hits = 0;
  //const positions = positions;

  for (let position of positions) {
    position.status = 'safe';
  }
  
  function hit(space) {
    for (let position of positions) {
      if (space === position) {
        hits += 1;
        position.status = 'damaged';
      }
    }
    if (hits === length) {
      status = 'sunk';
    }
  }
  function getHits() { return hits };
  function getStatus() {
    return status;
  }
  return { length, hit, getHits, getStatus }
}
export {
  shipFactory,
}