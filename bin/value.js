(function() {
  window.Value = (function() {
    function Value(num) {
      this.num = num;
      this.currency = null;
      this.percentage = false;
    }

    Value.prototype.op = function(op, other) {
      switch (op) {
        case '':
          this.num = Number(this.num + '' + other.num);
          break;
        case 'PLUS':
          this.num += other.num;
          break;
        case 'MINUS':
          this.num -= other.num;
          break;
        case 'DIV':
          this.num /= other.num;
          break;
        case 'MUL':
          this.num *= other.num;
          break;
        case 'POW':
          this.num = Math.pow(this.num, other.num);
          break;
        case 'PCT_OFF':
          this.num = (1 - this.num / 100) * other.num;
      }
      return this;
    };

    Value.prototype.setUnit = function(unit) {
      if (unit === '%') {
        this.percentage = true;
      } else {
        this.currency = unit;
      }
      return this;
    };

    Value.prototype.toString = function() {
      var isDecimal, str;
      isDecimal = function(num) {
        if (num % 1) {
          return true;
        } else {
          return false;
        }
      };
      str = '';
      if (this.currency) {
        str += this.currency;
      }
      return str += isDecimal(this.num) ? this.num.toFixed(2) : parseInt(this.num);
    };

    return Value;

  })();

}).call(this);
