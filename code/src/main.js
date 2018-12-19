// bit vector implementation influenced by
// http://the-coderok.azurewebsites.net/2015/09/22/Boolean-array-vs-Bit-vector-in-JavaScript/
let bitVector = function (size) {
  this.store = new Uint32Array(size);
};
bitVector.prototype.setBit = function (bit, set) {
  if (set) {
    this.store[(bit >> 5)] = this.store[(bit >> 5)] | (1 << (bit & 31));
  } else {
    this.store[(bit >> 5)] = this.store[(bit >> 5)] & ~(1 << (bit & 31));
  }
};
bitVector.prototype.isSet = function (bit) {
  return (this.store[(bit >> 5)] & (1 << (bit & 31))) !== 0;
};

let maxCheck = 472882050; // make sufficiently high
let sieve = new bitVector((maxCheck >> 5) + 1);
let prime = new bitVector((maxCheck >> 5) + 1);

module.exports = class Primes {
  static* stream() {
    for (let i = 2; ; ++i) {
      if (!prime.isSet(i)) {
        if (sieve.isSet(i)) continue;
        if (i > maxCheck)
          throw new Error("'maxCheck' too small");
        for (let x = i + i; x < maxCheck; x += i)
          if (!sieve.isSet(x))
            sieve.setBit(x, true);
        prime.setBit(i, true);
      }
      yield i;
    }
  }
};
