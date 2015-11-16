/*
  Memoizing is a pattern where the results of expensive function calls are cached.
  If the same function is called a second time with the same arguments, the result
  will be pulled from the cache.  Otherwise the original function is called directly.

  Write a function "memoize" that can wrap any arbitrary function in javascript.
  For example: var new_func = memoize(old_func);  // Don't worry about binding.
*/

    Function.prototype.inherits = function(Parent) {
      var Child = this;
      function Surrogate() {}
      Surrogate.prototype = Parent.prototype;
      Child.prototype = new Surrogate();
      Child.prototype.constructor = Child;
      Child.constructor = Child;
    }



    function sorted_json(item) {
      // Take the nested key-value and array structure
      // turn it into a JSON string.  Now we have a key
      // with which to memoize any generic function call
      return JSON.stringify(json_prepare(item));
    }

    function memoize(func) {
      var cache = {};
      return function() {
        var args = Array.prototype.slice.call(arguments);
        var key = sorted_json([this, args]);
        if (key in cache) {
          return cache[key];
        }
        var value = func.apply(this, args);
        cache[key] = value;
        return value;
      };
    }

    function fib(n) {
      console.log("Calculating fib for: " + n);

      if (Math.abs(n) !== Math.floor(n) || n < 1) {
        throw "Invalid entry: " + n;
      }
      if (n === 1) {
        return 0;
      } else if (n === 2) {
        return 1;
      } else {
        return fib(n-2) + fib(n-1);
      }
    };
    fib = memoize(fib);

    function Point(x, y) {
      this.x = x;
      this.y = y;
    }

    Point.prototype.abs = memoize(function(z) {
      var z = z || 0;
      var x = this.x;
      var y = this.y;
      return Math.sqrt(x*x + y*y + z*z);
    });

    function Origin() {
      Point.call(this, 0, 0);
    }
    Origin.inherits(Point);

    function Dog(name, breed) {
      this.name = name;
      this.breed = breed;
    }

    function DogWithAge(name, breed, age) {
      Dog.call(this, name, breed);
      this.age = age;
    }
    DogWithAge.inherits(Dog);

    var tess = new DogWithAge('Tess', 'Golden Retriever', 14);
