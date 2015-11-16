/*
  Memoizing is a pattern where the results of expensive function calls are cached.
  If the same function is called a second time with the same arguments, the result
  will be pulled from the cache.  Otherwise the original function is called directly.

  Write a function "memoize" that can wrap any arbitrary function in javascript.
  For example: var new_func = memoize(old_func);  // Don't worry about binding.
*/

    window.JSA.fib = function fib(n) {
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
