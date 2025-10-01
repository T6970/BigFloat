// BigSlash


// Internal function
// Highest common factor of two BigInts
function hcf(a, b) {
  var result = a
  var d = b
  while (d !== 0n) {
    let temp = d;
    d = result % d;
    result = temp;
  };
  return result;
};


export class bigSlash {
  constructor(value) {
    if (value.split(".").length > 2) throw new SyntaxError("Numbers can't have multiple decimal point!");
    
    if (value.contains(".")) {
    const den = 10n ** BigInt(value.split(".")[1].length);
    } else {
    const den = 1n
    };
    const num = BigInt(value.replace(/\./g, ""));
    
    let divide = hcf(num, den);
    
    this.numerator   = num / divide
    this.denominator = den / divide
  };
}

