
const makeShips = require('./makeShips');

test.skip('shipFactory creates object', () => {
  const ship1 = makeShips.shipFactory(5);
  expect(ship1.length).toBe(5);
}) 
test.skip('shipFactory.hit() adds hits', () => {
  const ship2 = makeShips.shipFactory(5);
  ship2.hit();
  expect(ship2.getHits()).toBe(1);
})
test.skip('shipFactory sinks', () => {
  const ship3 = makeShips.shipFactory(1);
  ship3.hit();
  expect(ship3.getStatus()).toBe('sunk');
})
