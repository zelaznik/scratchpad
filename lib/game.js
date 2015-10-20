// Holds collections of the asteroids, bullets, and your ship.
// #step method calls #move on all the objects, and #checkCollisions checks for collisions.
// #draw(cts) draws the game.
// Keeps track of dimensions of the space; wraps objects around when they drift off the page.

(function() {
  var Asteroids = window.Asteroids = window.Asteroids || {};

  var Game = Asteroids.Game = function() {
    this.asteroids = [];
    this.addAsteroids(20);
    var params = {pos: Game.randomPosition()};
  };

  Game.DIM_X = 512;
  Game.DIM_Y = 480;

  Game.randomPosition = function() {
    var x0 = Math.random() * Game.DIM_X;
    var y0 = Math.random() * Game.DIM_Y;
    return [x0, y0];
  };

  Game.prototype.allObjects = function() {
    return this.asteroids.concat([this.ship]);
  }

  Game.prototype.addAsteroids = function(num) {
    for (var i = 0; i < num; i++) {
      var params = {};
      params.pos = Game.randomPosition();
      this.asteroids.push(new Asteroids.Asteroid(params));
    }
  };

  Game.prototype.draw = function(ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.asteroids.forEach(function(asteroid) {
      asteroid.draw(ctx);
    });
  };

  Game.prototype.moveObjects = function() {
    this.asteroids.forEach(function(asteroid) {
      asteroid.move();
    });
  };

  Game.prototype.checkCollissions = function() {
    var asteroids = this.asteroids;
    var i, k;
    var alive = [];
    for (i=0; i<asteroids.length; i++) {
      alive.push(true);
    }
    for (i=0; i<asteroids.length - 1; i++) {
      var firstObject = asteroids[i];
      for (k=i+1; k<asteroids.length; k++) {
        var secondObject = asteroids[k];
        if (firstObject.collideWith(secondObject)) {
          alive[i] = false;
          alive[k] = false;
        }
      }
    }
    return alive;
  };

  Game.prototype.removeCollissions = function() {
    var alive = this.checkCollissions();
    var survivors = [];
    for (var i=0; i< alive.length; i++) {
      if (alive[i]) {
        survivors.push(this.asteroids[i]);
      }
    }
    this.asteroids = survivors;
  };

})();
