
function addOne(target) {
  target += 1;
}

const shipFactory = (length) => {
  let hits = 0;
  const sunk = false;
  const hit = addOne(hits);
  function test() {
    return 1;
  }
  return { length, hits, sunk, hit }
}
export {
  addOne,
  shipFactory,
}