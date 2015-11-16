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
  it ("sorts the key value pairs", function() {
    var as_obj = {z:5, y:4, x:3, a: [3,1,4]};
    as_str = '{"a":[3,1,4],"x":3,"y":4,"z":5}';
    expect(JSA.sorted_json(as_obj)).toEqual(as_str);
  });

  it ("makes integers compare equal with equiavalent floats", function() {
    var w_float = JSA.sorted_json({z:5, y:4, x:3, a: [3.0,1,4]});
    var w_int   = JSA.sorted_json({z:5, y:4, x:3, a:   [3,1,4]});
    expect(w_float).toEqual(w_int);
  });

});


if (false) {
  describe("longestSymmetricSubstring", function () {
    it("handles a simple example", function () {
      expect(JSA.longestSymmetricSubstring("aba")).toEqual("aba");
    });

    it("handles two equal substrings", function () {
      expect(JSA.longestSymmetricSubstring("aba1cdc")).toEqual("aba");
    });

    it("handles nested substrings", function () {
      expect(JSA.longestSymmetricSubstring("xabax")).toEqual("xabax");
    });
  });

  describe("myEach", function () {
    var originalArray = null;
    var spy = {
      callback: function (el) { return el; }
    };

    it("calls the callback passed to it", function () {
      spyOn(spy, "callback");
      [1, 2, 3].myEach(spy.callback);
      expect(spy.callback).toHaveBeenCalled();
    });

    it("yields each element to the callback", function () {
      spyOn(spy, "callback");
      [1, 2].myEach(spy.callback);
      expect(spy.callback).toHaveBeenCalledWith(1);
      expect(spy.callback).toHaveBeenCalledWith(2);
    });

    it("does NOT call the built-in Array#forEach method", function () {
      originalArray = ["original array"];
      spyOn(originalArray, "forEach");
      originalArray.myEach(spy.callback);
      expect(originalArray.forEach).not.toHaveBeenCalled();
    });

    it("is chainable and returns the original array", function () {
      originalArray = ["original array"];
      expect(originalArray.myEach(spy.callback)).toBe(originalArray);
    });
  });

  describe("mergeSort", function () {
    var array =  [1, 5, 2, 4, 3];

    it("works with an empty array", function () {
      expect([].mergeSort()).toEqual([]);
    });

    it("works with an array of one item", function () {
      expect([1].mergeSort()).toEqual([1]);
    });

    it("sorts numbers", function () {
      expect(array.mergeSort()).toEqual(array.slice(0).sort());
    });

    it("sorts arrays with duplicates", function () {
      expect([5, 4, 3, 3, 2, 1].mergeSort()).toEqual([1, 2, 3, 3, 4, 5]);
    });

    it("uses a comparator function if passed in", function () {
      var reversed = array.mergeSort(function (x, y) {
        if (x == y) {
          return 0;
        } else if (x < y) {
          return 1;
        } else {
          return -1;
        }
      });
      expect(reversed).toEqual([5, 4, 3, 2, 1]);
    });

    it("does not modify original", function (){
      dupedArray = [1, 5, 2, 4, 3];
      dupedArray.mergeSort();
      expect(dupedArray).toEqual(array);
    });

    it("calls the merge helper method", function () {
      spyOn(JSA, 'merge');
      array.mergeSort();
      expect(JSA.merge).toHaveBeenCalled();
    });
  });

  describe("Function.prototype.myBind", function () {
    var Cat;
    var sally, markov, curie;

    beforeEach(function () {

      Cat = function Cat (name) {
        this.name = name;
      };

      Cat.prototype.sayHello = function () {
        return this.name + " says hello!";
      };

      Cat.prototype.greetOne = function (otherCat) {
        return this.name + " says hello to " + otherCat.name;
      };

      Cat.prototype.greetTwo = function (otherCat1, otherCat2) {
        return this.name + " says hello to " + otherCat1.name + " and " +
        otherCat2.name;
      };

      sally = new Cat("Sally");
      markov = new Cat("Markov");
      curie = new Cat("Curie");
    });

    it("sets the context and returns a function which can be called function style", function () {
      spyOn(Cat.prototype.sayHello, 'bind');
      expect(sally.sayHello.myBind(sally)()).toEqual("Sally says hello!");
      expect(Cat.prototype.sayHello.bind).not.toHaveBeenCalled();
    });

    it("should pass in bind-time argument to the method", function () {
      spyOn(Cat.prototype.greetOne, 'bind');
      expect(sally.greetOne.myBind(sally, markov)())
      .toEqual("Sally says hello to Markov");
      expect(Cat.prototype.greetOne.bind).not.toHaveBeenCalled();
    });

    it("should pass in two bind-time arguments to the method", function () {
      spyOn(Cat.prototype.greetTwo, 'bind');
      expect(sally.greetTwo.myBind(sally, markov, curie)())
      .toEqual("Sally says hello to Markov and Curie");
      expect(Cat.prototype.greetTwo.bind).not.toHaveBeenCalled();
    });

    it("takes multiple call-time arguments", function () {
      spyOn(Cat.prototype.greetTwo, 'bind');
      expect(sally.greetTwo.myBind(sally)(markov, curie))
      .toEqual("Sally says hello to Markov and Curie");
      expect(Cat.prototype.greetTwo.bind).not.toHaveBeenCalled();
    });

    it("should combine bind-time and call-time arguments", function () {
      spyOn(Cat.prototype.greetTwo, 'bind');
      expect(sally.greetTwo.myBind(sally, markov)(curie))
      .toEqual("Sally says hello to Markov and Curie");
      expect(Cat.prototype.greetTwo.bind).not.toHaveBeenCalled();
    });

    it("doesn't pass the call-time arguments to future calls", function () {
      spyOn(Cat.prototype.greetOne, 'bind');
      var boundFn = sally.greetOne.myBind(sally);
      expect(boundFn(markov)).toEqual("Sally says hello to Markov");
      expect(boundFn(curie)).toEqual("Sally says hello to Curie");
      expect(Cat.prototype.greetOne.bind).not.toHaveBeenCalled();
    });
  });



  describe("myCurry", function () {
    beforeEach(function () {
      this.myObj = {
        count: 10
      };
    });

    it("should take a function, object, and curry if 1 is passed", function () {
      var echo = function (arg) {
        return arg;
      };

      var first = JSA.myCurry(echo, this.myObj, 1);
      expect(first("one")).toMatch(/one/);
    });

    it("binds to obj if passed in", function () {
      var count = function () {
        return this.count;
      };

      var first = JSA.myCurry(count, this.myObj, 1);
      expect(first("")).toEqual(10);
    });

    it("currys arguments and calls function after called with total num args", function () {
      var sum = function(a, b, c) {
        return this.count + a + b + c;
      };
      var curriedSum = JSA.myCurry(sum, this.myObj, 3);
      var result = curriedSum(1)(2)(3);
      expect(result).toEqual(16);
    });
  });

}
