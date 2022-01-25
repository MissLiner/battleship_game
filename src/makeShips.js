
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
  return { player, size, positions, direction, hit, getHits, getStatus }
}
export {
  shipFactory,
}