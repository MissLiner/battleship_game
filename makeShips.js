
const shipFactory = (length) => {
  let hits = 0;
  let sunk = false;
  function hit() {
    hits += 1;
    if (hits == length) {
      sunk = true;
    }
  }
  function getHits() { return hits };
  function getSunk() {
    return sunk;
  }
  return { length, hit, getHits, sunk, getSunk }
}
export {
  shipFactory,
}