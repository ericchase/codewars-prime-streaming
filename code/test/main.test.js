const expect = require('chai').expect;
const Primes = require('../src/main.js');

const verify = (n, ...a) => function () {
  const stream = Primes.stream();
  for (let i = 0; i < n; ++i) stream.next();
  for (const v of a)
    expect(stream.next().value)
      .to.equal(v);
};
describe('Small numbers.', () => {
  it('0 - 10', verify(0, 2, 3, 5, 7, 11, 13, 17, 19, 23, 29));
  it('10 - 20', verify(10, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71));
  it('100 - 110', verify(100, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601));
  it('1000 - 1010', verify(1000, 7927, 7933, 7937, 7949, 7951, 7963, 7993, 8009, 8011, 8017));
});
describe('Large numbers.', () => {
  it('25e6 - 25e6', verify(25e6));
});
