
const makeShips = require('./makeShips');

// jest.mock(makeShips, () => {
//   const mockMakeShips = { }
// })

test('shipFactory creates object', () => {
  const ship1 = makeShips.shipFactory(5);
  expect(ship1.length).toBe(5);
}) 
test.only('addOne() adds 1', () => {
  const testValue = 0;
  makeShips.addOne(testValue);
  expect(testValue).toBe(1);
})
test('shipFactory.hit() adds hits', () => {
  const ship2 = makeShips.shipFactory(3);
  ship2.hit();
  expect(ship2.hits).toBe(1);
})
test('shipFactory sinks', () => {

})
test('shipFactory function works', () => {
  const ship2 = makeShips.shipFactory(3);
  expect(ship2.test()).toBe(1);
})
