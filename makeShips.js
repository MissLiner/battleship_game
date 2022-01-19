
const shipFactory = (length) => {
  let hits = 0;
  let status = 'afloat';
  function hit() {
    hits += 1;
    if (hits == length) {
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