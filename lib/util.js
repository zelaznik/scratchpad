// Utility Code, especially vector math stuff
(function () {
  var Asteroids = window.Asteroids = window.Asteroids || {};
  Asteroids.Util = {};

  Asteroids.Util.inherits = function(Child, Parent) {
    function Surrogate() {}
    Surrogate.prototype = Parent.prototype;
    Child.prototype = new Surrogate();
    Child.prototype.constructor = Child;
  };

  Asteroids.Util.modNonNegative = function(numerator, denominator) {
    var remainder = numerator % denominator;
    if (remainder < 0) {
      return (remainder + denominator);
    } else {
      return remainder;
    }
  };

  Asteroids.Util.randomVec = function(length) {
    var theta = Math.random() * 2 * Math.PI;
    var x = length * Math.cos(theta);
    var y = length * Math.sin(theta);
    return [x,y];
  };

  Asteroids.Util.distanceBetween = function(x0, y0, x1, y1) {
    var dx = (x1 - x0);
    var dy = (y1 - y0);
    return Math.sqrt(dx*dx + dy*dy);
  };

})();
