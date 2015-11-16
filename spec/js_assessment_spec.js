describe("Function.prototype.inherits", function() {
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

describe("Memoize Function Decorator", function () {
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

  describe("sorted_json", function() {
    it ("is case sensitive", function() {
      var as_obj_z = JSA.sorted_json({z:5, y:4, x:3, a: [3,1,4]});
      var as_obj_Z = JSA.sorted_json({Z:5, y:4, x:3, a: [3,1,4]});
      expect(as_obj_z).not.toEqual(as_obj_Z);
    });

    it ("turns objects into key value pairs in json", function() {
      function Point(x, y) {
        this.x = x;
        this.y = y;
      }
      var j_4_3 = JSA.sorted_json(new Point(4, 3));
      var j_12_5 = JSA.sorted_json(new Point(12, 5));
      j_12_5.z = 

      expect(j_4_3).toEqual('{"x":4,"y":3}');
      expect(j_12_5).toEqual('{"x":12,"y":5}');
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

  describe("Consistency with original func", function() {
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
  });

  describe("Verification of actual caching", function() {
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
  });

  describe("Context management", function() {
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
  });

  describe("Binding:", function() {
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


});

describe("LRUCache", function() {
  var LRUCache = window.JSA.LRUCache;

  function keyOrder(cache) {
    var keys = [];
    var node = cache.back;
    while (node) {
      if (node.key) {
        keys.push(node.key);
      }
      node = node.next;
    }
    return keys;
  }

  var c;
  beforeEach(function() {
    // Make an LRU Cache of size four.
    // insert five items into it.
    c = new LRUCache(4);
    c.set('x', 3);
    c.set('y', 4);
    c.set('z', 5);
    c.set('a', 0);
    c.set('b', 1);
  });

  describe("Consistent sizing", function() {
    it ("maintains its maximum size", function() {
      c.set('steve', 'awesome');
      expect(c.length).toEqual(4);
    });
    it("enforces a minimum size of two", function() {
      expect(function() {
        return new LRUCache(0);
      }).toThrow('Minimum size of LRU Cache is 2');
    });
    it("front.next has no key or value", function() {
      expect(c.front.next).toBeUndefined();
    });
    it("back.prev has no key or value", function() {
      expect(c.back.prev).toBeUndefined();
    });
  });

  describe("Consistent iteration", function() {

    it ("iteration order reflects push order", function() {
      var node = c.back;
      expect(node.key).toEqual('y'); node = node.next;
      expect(node.key).toEqual('z'); node = node.next;
      expect(node.key).toEqual('a'); node = node.next;
      expect(node.key).toEqual('b');
    });

    it("updated values move to the front", function() {
      c.set('z', 26);
      expect(c.front.key).toEqual('z');
      expect(c.front.value).toEqual(26);
    });

    it("node.next.prev is node for all nodes", function() {
      var node = c.back;
      expect(node.next.prev).toEqual(node); node = node.next;
      expect(node.next.prev).toEqual(node); node = node.next;
      expect(node.next.prev).toEqual(node); node = node.next;
    });

    it("node.prev.next is node for all nodes", function() {
      var node = c.front;
      expect(node.prev.next).toEqual(node); node = node.prev;
      expect(node.prev.next).toEqual(node); node = node.prev;
      expect(node.prev.next).toEqual(node); node = node.prev;
    });
  });

  describe("Consistent updating", function() {
    it("sets the correct value to blank cache", function() {
      var c = new LRUCache(4);
      c.set('x', 3);
      expect(c.get('x').key).toEqual('x');
      expect(c.get('x').value).toEqual(3);
    });

    it("updates the front after only one insert", function() {
      var c = new LRUCache(4);
      c.set('x', 3);
      expect(c.front.key).toEqual('x');
      expect(c.front.value).toEqual(3);
    });

    it("does NOT update the back after only one insert", function() {
      var c = new LRUCache(4);
      c.set('x', 3);
      expect(c.back.key).toBeUndefined();
    });

    it("updated cache moves up to the top", function() {
      var c = new LRUCache(4);
      c.set('x', 3);
      c.set('y', 4);
      c.set('z', 5);
      c.set('a', 0);
      c.set('b', 1);
      expect(keyOrder(c)).toEqual(['y','z','a','b']);
    });
  });
});
