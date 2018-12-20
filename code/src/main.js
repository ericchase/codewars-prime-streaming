// bit vector implementation influenced by
// http://the-coderok.azurewebsites.net/2015/09/22/Boolean-array-vs-Bit-vector-in-JavaScript/
let bitVector = function (size) {
  this.store = new Uint32Array(size);
};
bitVector.prototype.setBit = function (bit, set) {
  const index = bit >> 5;
  if (set) {
    this.store[index] = this.store[index] | (1 << (bit & 31));
  } else {
    this.store[index] = this.store[index] & ~(1 << (bit & 31));
  }
};
bitVector.prototype.isSet = function (bit) {
  return (this.store[bit >> 5] & (1 << (bit & 31))) !== 0;
};

let maxCheck = 472882240; // make sufficiently high
let sieve = new bitVector((maxCheck >> 5) + 1);

function prep() {
  for (let i = 3; i < 32000; i += 2) {
    if (sieve.isSet(i)) continue;
    if (i > maxCheck)
      throw new Error("'maxCheck' too small");
    for (let x = i + i; x <= maxCheck; x += i)
      sieve.setBit(x, true);
  }
}

class Primes {
  static* stream() {
    yield 2;
    for (let i = 3; i <= maxCheck; i += 2)
      if (!sieve.isSet(i))
        yield i;
  }
}

module.exports = {
  prep: prep,
  Primes: Primes
};
