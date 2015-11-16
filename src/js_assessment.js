// TA: nice work!
(function() {

  // Make a namespace "JSA"
  window.JSA = window.JSA || {};

  // write inherits(ChildClass, ParentClass)
  window.JSA.inherits = Function.prototype.inherits = function(ParentClass) {
    var ChildClass = this;
    function Surrogate() {}
    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate();
    ChildClass.constructor = ChildClass;
  };

  window.JSA.json_prepare = function json_prepare(item) {
      // Handles a recursive structure of both arrays
      // and key-value stores.  The key-value stores
      // are sorted by key in order to ensure that two
      // JSON strings from equivalent objects compare equal.

      // Something of type "object" could be
      // either an array or key-value
      if (typeof(item) === "object") {
        if (item.length >= 0) {
          // Let's handle the case of an array
          var converted = [];
          for (var i=0; i<item.length; i++) {
            converted.push(json_prepare(item[i]));
          }

        } else {
          // Let's handle the case of an object aka "a hash"
          var converted = {};
          Object.keys(item).sort().forEach(function(k) {
            converted[k] = json_prepare(item[k]);
          });
        }

      } else {
        // Handle everything else such as string, numbers, undefined, etc
        // This is actually our base case, way at the bottom of the method
        converted = item;
      }

      return converted;
    }  // End json_prepare

    window.JSA.sorted_json = function sorted_json(item) {
      // Take the nested key-value and array structure
      // turn it into a JSON string.  Now we have a key
      // with which to memoize any generic function call
      return JSON.stringify(window.JSA.json_prepare(item));
    }

})();
