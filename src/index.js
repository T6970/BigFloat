// BigFloat

class bigFloat = {
  constructor(value) {
    if ((value.math(/\./g) || []).length > 1) throw new SyntaxError("Numbers cannot have multiple decimal points!")

    this.negative = value.startsWith("-"); // Check negative
    this.mantissa = val.replace(/\./g, ""); // mantissa (significand)

    let trailingZeros = 0;
    const matchZeros = val.match(/0+$/);
    if (matchZeros) trailingZeros = matchZeros[0].length;

    // Exponent
    if (val.includes(".")) {
      this.exponent = val.indexOf(".") + trailingZeros;
    } else {
      this.exponent = val.length;
    }
  }

