// BigFloat

class bigFloat = {
  constructor(value) {
    if (value.split(".").length > 2) throw new SyntaxError("Numbers cannot have multiple decimal points!");

    let val = value.startsWith("-") ? value.slice(1) : value;
    this.mantissa = value.replace(/\./g, "");
    this.exponent = value.includes(".") ? value.indexOf(".") : value.length;
    };
  }
}
