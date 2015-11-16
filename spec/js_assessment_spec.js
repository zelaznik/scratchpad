describe("inherits", function() {
  var Animal, Dog, dog;

  beforeEach(function() {
    Animal = function() {
      this.name = "Yogi";
    };

    Animal.prototype.makeNoise = function() { return "Hi!"; };

    Dog = function() {
      this.age = 7;
    };
    Dog.inherits(Animal);

    Dog.prototype.bark = function() { return "Woof!"; };

    dog = new Dog();
  });

  it("should properly set up the prototype chain between a child and parent", function() {
    expect(dog.bark()).toBe("Woof!");
    expect(dog.makeNoise()).toBe("Hi!");
  });

  it("should not call the parent's constructor function", function() {
    expect(dog.name).toBeUndefined();
  });

  it("should maintain separation of parent and child prototypes", function() {
    Dog.prototype.someProperty = 42;
    var animal = new Animal();
    expect(animal.someProperty).toBeUndefined();
    expect(animal.makeNoise()).toBe("Hi!");
  });

  it("should properly work for longer inheritance chains", function() {
    var Poodle = function() { this.name = "Bill"; };
    Poodle.inherits(Dog);

    Poodle.prototype.shave = function() { return "Brrr."; };

    var poodle = new Poodle();
    expect(poodle.name).toBe("Bill");
    expect(poodle.shave()).toBe("Brrr.");
    expect(poodle.makeNoise()).toBe("Hi!");
    expect(poodle.bark()).toBe("Woof!");
  });
});

describe("sorted_json", function() {
  it ("is case sensitive", function() {
    var as_obj_z = JSA.sorted_json({z:5, y:4, x:3, a: [3,1,4]});
    var as_obj_Z = JSA.sorted_json({Z:5, y:4, x:3, a: [3,1,4]});
    expect(as_obj_z).not.toEqual(as_obj_Z);
  });

  it ("sorts the key value pairs", function() {
    var as_obj = {z:5, y:4, x:3, a: [3,1,4]};
    var as_str = '{"a":[3,1,4],"x":3,"y":4,"z":5}';
    expect(JSA.sorted_json(as_obj)).toEqual(as_str);
  });

  it ("makes integers compare equal with equiavalent floats", function() {
    var w_float = JSA.sorted_json({z:5, y:4, x:3, a: [3.0,1,4]});
    var w_int   = JSA.sorted_json({z:5, y:4, x:3, a:   [3,1,4]});
    expect(w_float).toEqual(w_int);
  });

  it ("handles nested mixtures of kv pairs and arrays", function() {
    var as_obj = {z:5, y:4, x:3, a: [3,1,[4,[1,{5:[9]}]]]};
    var as_str = '{"a":[3,1,[4,[1,{"5":[9]}]]],"x":3,"y":4,"z":5}';
    expect(JSA.sorted_json(as_obj)).toEqual(as_str);
  });

});

describe("memoize", function () {
  function fib(n) {
    var a = 0; var b = 1; var tmp = 0;
    for (var i = 1; i < n; i++) {
      tmp = b + a; a=b; b=tmp;
    }
    return a;
  }
  var memoFib = window.JSA.memoize(fib);

  var Vector;
  function abs(z) {
    z = z || 0;
    var x = this.x;
    var y = this.y;
    return Math.sqrt(x*x + y*y + z*z);
  }
  var memoAbs = window.JSA.memoize(abs);

  function Vector(x, y) {
    this.x = x;
    this.y = y;
  }
  Vector.prototype.origAbs = abs;
  Vector.prototype.memoAbs = memoAbs;

  var funcCounter;
  beforeEach(function() {
    funcCounter = {};
    var returnArgs = window.JSA.returnArgs = function() {
      var args = [].slice(arguments);
      var key = {}
      key.this = this;
      key.args = [].slice.call(arguments);
      key = JSON.stringify(key);
      if (key in funcCounter) {
        funcCounter[key] += 1;
      } else {
        funcCounter[key] = 1;
      }
      return key;
    }
    window.JSA.memoArgs = window.JSA.memoize(returnArgs);
    Vector.prototype.memoArgs = window.JSA.memoArgs;
    Vector.prototype.returnArgs = window.JSA.returnArgs;
  });

  it("returns same fibinacci results as original function for 1-10", function () {
    for (var i=1; i<= 10; i++) {
      expect(fib(i)).toEqual(memoFib(i));
    }

  });

  it ("returns the same result for regular and memoized '*args' functions", function () {
    var orig = window.JSA.returnArgs(3,1,4,'a',5);
    var memo = window.JSA.memoArgs(3,1,4,'a',5);
    expect(orig).toEqual(memo);
  });

  it ("expect orig func to have been called once after 3 identical memoized calls", function () {
    var key = window.JSA.memoArgs(3,1,4);
    window.JSA.memoArgs(3,1,4);
    window.JSA.memoArgs(3,1,4);
    expect(funcCounter[key]).toEqual(1);
  });

  it ("expect orig func to have been called three times after 3 direct function calls", function () {
    var key = window.JSA.returnArgs(3,1,4);
    window.JSA.returnArgs(3,1,4);
    window.JSA.returnArgs(3,1,4);
    expect(funcCounter[key]).toEqual(3);
  });

  it ("returns the same result for regular and memoized '*args' functions", function () {
    var orig = window.JSA.returnArgs(3,1,4,'a',5);
    var memo = window.JSA.memoArgs(3,1,4,'a',5);
    expect(orig).toEqual(memo);
  });

  it ("uses and stores the context variable in the function call", function () {
    var v_3_4 = new Vector(3, 4);
    var v_5_12 = new Vector(5, 12);
    expect(v_3_4.memoAbs()).toEqual(5);
    expect(v_5_12.memoAbs()).toEqual(13);
  });

  it ("uses NOT only context but input arguments as well", function () {
    var v_3_4 = new Vector(3, 4);
    var v_7_24 = new Vector(7, 24);
    expect(v_3_4.memoAbs(12)).toEqual(13);
    expect(v_7_24.memoAbs(312)).toEqual(313);
  });

  it ("binding to override the context", function () {
    var v_3_4 = new Vector(3, 4);
    var v_7_24 = new Vector(7, 24);
    expect(v_3_4.memoAbs.bind(v_7_24)()).toEqual(25);
    expect(v_7_24.memoAbs.bind(v_3_4)()).toEqual(5);
  });

  it ("binding to account for additional arguments", function () {
    var v_3_4 = new Vector(3, 4);
    var v_7_24 = new Vector(7, 24);
    expect(v_3_4.memoAbs.bind(v_7_24)(312)).toEqual(313);
    expect(v_7_24.memoAbs.bind(v_3_4)(12)).toEqual(13);
  });

  it ("binding to cause duplicate calls to original function", function () {
    var v_3_4 = new Vector(3, 4);
    var v_7_24 = new Vector(7, 24);
    var origFunc = v_3_4.returnArgs.bind(v_7_24);
    var key = origFunc();
    origFunc();
    origFunc();
    expect(funcCounter[key]).toEqual(3);
  });

  it ("binding NOT to cause duplicate calls to memoized function", function () {
    var v_3_4 = new Vector(3, 4);
    var v_7_24 = new Vector(7, 24);
    var memoFunc = v_3_4.memoArgs.bind(v_7_24);
    var key = memoFunc();
    memoFunc();
    memoFunc();
    expect(funcCounter[key]).toEqual(1);
  });

});
