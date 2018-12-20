// bit vector implementation influenced by
// http://the-coderok.azurewebsites.net/2015/09/22/Boolean-array-vs-Bit-vector-in-JavaScript/
let bitVector = function (size) {
  this.store = new Uint32Array(size);
};
bitVector.prototype.setBit = function (bit) {
  this.store[bit >> 5] |= 1 << (bit & 31);
};
bitVector.prototype.isSet = function (bit) {
  return (this.store[bit >> 5] & (1 << (bit & 31))) !== 0;
};

let maxCheck = 472882240; // make sufficiently high
let sieve = new bitVector((maxCheck >> 5) + 1);

function prep() {
  // find all multiples less than maxCheck at the start
  // no need to check even numbers
  for (let i = 3; i < 32000; i += 2) {
    if (sieve.isSet(i)) continue;
    for (let x = i + i; x <= maxCheck; x += i)
      sieve.setBit(x, true);
  }
}

// A simple Sieve of Eratosthenes with some general coding
// optimizations. Note that this code generates prime numbers
// under a maximal cutoff defined by maxCheck.
class Primes {
  static* stream() {
    yield 2;
    // no need to check even numbers
    for (let i = 3; i <= maxCheck; i += 2)
      if (!sieve.isSet(i))
        yield i;
  }
}

module.exports = {
  prep: prep,
  Primes: Primes
};
