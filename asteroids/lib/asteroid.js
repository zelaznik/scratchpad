// Spacerock.  It inherits from MovingObject
(function () {
  var Asteroids = window.Asteroids = window.Asteroids || {};
  var Mod = Asteroids.Util.modNonNegative;
  var Game = Asteroids.Game;

  var Asteroid = Asteroids.Asteroid = function(params) {
    params.color = params.color || '#8E71F9';
    params.radius = params.radius || 10;
    params.vel = Asteroids.Util.randomVec(100);
    Asteroids.MovingObject.call(this, params);
  };
  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.move = function() {
    var Mod = Asteroids.Util.modNonNegative;
    var Game = Asteroids.Game;
    Asteroids.MovingObject.prototype.move.call(this);
    this.posX = Mod(this.posX, Game.DIM_X);
    this.posY = Mod(this.posY, Game.DIM_Y);
  };

})();
