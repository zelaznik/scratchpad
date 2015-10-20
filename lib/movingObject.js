// Base class for anything that moves.
// Most important methods are #move, #draw(cts), #iscollidedWith(otherMovingObject)

(function() {
  var Asteroids = window.Asteroids = window.Asteroids || {};
  var tau = 2 * Math.PI;

  function MovingObject(params) {
    this.posX = params.pos[0];
    this.posY = params.pos[1];
    this.velX = params.vel[0];
    this.velY = params.vel[1];
    this.radius = params.radius;
    this.color = params.color;
  }
  Asteroids.MovingObject = MovingObject;

  MovingObject.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(
      this.posX, this.posY, this.radius,
      0, tau, false
    );
    ctx.fill();
  };

  MovingObject.prototype.name = function() {
    var dt = Asteroids.GameView.dt;
    this.posX += this.velX * dt;
    this.posY += this.velY * dt;
  };

  MovingObject.prototype.distanceFrom = function(other) {
    return Asteroids.Util.distanceBetween(
      this.posX, this.posY, other.posX, other.posY
    );
  };

  MovingObject.prototype.collideWith = function(other) {
    return (this.distanceFrom(other) < (this.radius + other.radius));
  };

})();
