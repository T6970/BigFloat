// BigSlash


// Internal function
// Highest common factor (a.k.a Greatest Common Divisor) of two BigInts
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

    if (["number","bigint"].includes(typeof value)) value = value.toString().trim();

    // Input validation
    if (typeof value === "string" && value.trim() === "")     throw new TypeError  ("Can't accept non-numeric values!"          );
    if (!["number","bigint","string"].includes(typeof value)) throw new TypeError  ("Can't accept non-numeric values!"          );
    if (value.split(".").length > 2)                          throw new SyntaxError("Numbers can't have multiple decimal point!");

    // Fractions
    if (value.includes("/")) {
      if (BigInt(value.split("/")[1]) === 0n) throw new  RangeError("Division by zero!"                                );
      if (value.includes("."))                throw new SyntaxError("Fractions cannot contain decimals!"               );
      if (value.split("/").length !== 2)      throw new SyntaxError("Fractions cannot contain multiple division signs!");

      // Parse fraction
      this.numerator   = value.split("/")[0];
      this.denominator = value.split("/")[1];

      // Simplify
      let divide = hcf(this.numerator, this.denominator);
      this.numerator   /= divide;
      this.denominator /= divide;

      // Make denominator positive
      if (this.denominator < 0n) {
        this.numerator   *= -1n;
        this.denominator *= -1n;
      }
      return;
    }
      
    this.denominator   = 1n;
    if (value.includes(".")) {
      this.denominator = 10n ** BigInt(value.split(".")[1].length);
    };
    this.numerator = BigInt(value.replace(/\./g, ""));

    // Simplify
    let divide = hcf(this.numerator, this.denominator);
    this.numerator   /= divide;
    this.denominator /= divide;

    // Make denominator positive
    if (this.denominator < 0n) {
      this.numerator   *= -1n;
      this.denominator *= -1n;
    }
  },

  toString() {
    if (this.denominator === 1n) return `${this.numerator}`;
    return `${this.numerator}/${this.denominator}`;
  },

}
