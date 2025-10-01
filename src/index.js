// Fraction

// Internal function
// Highest common factor (a.k.a Greatest Common Divisor) of two BigInts
function hcf(a, b) {
    return b === 0n ? a : hcf(b, a % b);
}
  
  return result;
};

function lcm(a, b) {
    return (a * b) / hcf(a, b);
}

function lcd(denominators) {
    if (denominators.length === 0) throw new Error("No denominators!")
    return denominators.reduce((acc, curr) => lcm(acc, curr));
}

export class fraction {
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
      this.numerator   = BigInt(value.split("/")[0]);
      this.denominator = BigInt(value.split("/")[1]);
      
      this.simplify();
      return;
    };
      
    this.denominator   = 1n;
    if (value.includes(".")) {
      this.denominator = 10n ** BigInt(value.split(".")[1].length);
    };
    this.numerator = BigInt(value.replace(/\./g, ""));

    this.simplify();
  }

  toString() {
    if (this.denominator === 1n) return `${this.numerator}`;
    return `${this.numerator}/${this.denominator}`;
  }

  // Add with another fraction
  add(other) {
    const common = lcd([this.denominator, other.denominator]);
    const newNumerator = this.numerator * (common / this.denominator) + other.numerator * (common / other.denominator);
    return new fraction(`${newNumerator}/${common}`);
  }

  // Subtract with another fraction
  sub(other) {
    const common = lcd([this.denominator, other.denominator]);
    const newNumerator = this.numerator * (common / this.denominator) - other.numerator * (common / other.denominator);
    return new fraction(`${newNumerator}/${common}`);
  }

  // Multiply with other fraction
  mul(other) {
    return new fraction(`${this.numerator * other.numerator}/${this.denominator * other.denominator}`);
  }

  // Divide with other fraction
  div(other) {
    if (other.numerator === 0n) throw new RangeError("Division by zero!")
    return new fraction(`${this.numerator * other.denominator}/${this.denominator * other.numerator}`);
  }

  simplify() {
    let divide = hcf(this.numerator, this.denominator);
    this.numerator   /= divide;
    this.denominator /= divide;

    // Make denominator positive
    if (this.denominator < 0n) {
      this.numerator   *= -1n;
      this.denominator *= -1n;
    }
  }
  

}
