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
  
  if (this.denominator < 0n) {
    this.numerator   *= -1n;
    this.denominator *= -1n;
  }
  
  return result;
};


export class bigSlash {
  constructor(value) {
    if (typeof value === "string" && value.trim() === "")     throw new TypeError  ("Can't accept non-numeric values!"          );
    if (!["number","bigint","string"].includes(typeof value)) throw new TypeError  ("Can't accept non-numeric values!"          );
    if (value.split(".").length > 2)                          throw new SyntaxError("Numbers can't have multiple decimal point!");
    
    if (["number","bigint"].includes(typeof value)) value = value.toString();

    this.denominator   = 1n;
    if (value.includes(".")) {
      this.denominator = 10n ** BigInt(value.split(".")[1].length);
    };
    this.numerator = BigInt(value.replace(/\./g, ""));
    
    let divide = hcf(this.numerator, this.denominator);
    
    this.numerator   = this.numerator   / divide
    this.denominator = this.denominator / divide
  },

  toString() {
    if (this.denominator === 1) {eturn `${this.numerator};
    return `${this.numerator}/${this.denominator}`;
  },

}

