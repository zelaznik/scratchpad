function Yielder(block) {
  this.block = block;
}
Yielder.prototype = {
  call: function(value, k) {
    return this.block(value, k);
  }
};

function enumerate(src) {
  return new Enumerator( function(y) {
    for (var k in src) { y.call(src[k], k); }
  });
}

function Enumerator(generate) {
  this.generate = generate;
}

Enumerator.prototype = (function() {
  function each(block) {
    var y = new Yielder(block);
    this.generate(y);
    return this;
  }

  function map(transform) {
    return new Enumerator(function(y) {
      this.each(function(v,k) {
        y.call(transform(v,k), k);
      });
    }.bind(this));
  }

  function filter(match) {
    return new Enumerator(function(y) {
      this.each(function(v,k) {
        if (match(v,k)) { y.call(v,k); }
      });
    }.bind(this));
  }

  function reduce() {
    var n = arguments.length;
    var seed = arguments[n-2];
    var accumulator = arguments[n-1];

    var agg = seed;
    this.each(function(val, k) {
      if (agg === undefined) { agg = val; }
      else { agg = accumulator(agg, val, k); }
    });

    return agg;
  }

  function toArray() {
    var output = [];
    this.each(function(value, k) { output.push(value); });
    return output;
  }

  function toObject() {
    var output = {};
    this.each(function(value, k) {
      output[k] = value;
    });
    return output;
  }

  function add(agg, value) { return agg + value; }
  function plusOne(agg, value) { return agg + 1; }

  return {
    get each() { return each.bind(this); },
    get map() { return map.bind(this); },
    get filter() { return filter.bind(this); },
    get reduce() { return reduce.bind(this); },

    get sum() { return this.reduce(0, add); },
    get count() { return this.reduce(0, plusOne); },
    get max() { return this.reduce(Math.max); },
    get min() { return this.reduce(Math.min); },

    get toArray() { return toArray.bind(this); },
    get toObject() { return toObject.bind(this); },
  };
})();

var dbg = function(value, key) {
  var dct = {key: key, value: value};
  console.log(JSON.stringify(dct));
};

var arr = [3,1,4,1,5];
var e = enumerate(arr);
var m = e.map(function(v) { return 101*v; });
var v = m.filter(function(v) { return (v % 2) === 0; });
v.each(dbg);
