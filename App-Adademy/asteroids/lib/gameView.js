// Stores a Game instance
// Stores a canvas context to draw the game into.
// Installs key listeners to move the ship and fire bullets.
// Installs a timer to call Game#step.

(function() {
  var Asteroids = window.Asteroids = window.Asteroids || {};

  var GameView = Asteroids.GameView = function(game, ctx) {
    this.game = game;
    this.ctx = ctx;
  };

  GameView.dt = 20.0/1000;

  GameView.prototype.start = function() {
    var thisGame = this.game;
    var thisCtx = this.ctx;
    setInterval(function() {
      thisGame.moveObjects();
      thisGame.removeCollissions();
      thisGame.draw(thisCtx);
    }, GameView.dt * 1000);
  };

})();
