(function () {
  if (typeof TTT === "undefined") {
    window.TTT = {};
  }
  // var TTT = window.TTT;
  var View = TTT.View = function (game, $el) {
    this.game = game;
    this.$el = $el;

    this.setupBoard();
    this.bindEvents();
  };

  View.prototype.bindEvents = function () {
    var $squares = $("li");
    var view = this;
    var $h2 = $('h2');

    $squares.on("click", function (event) {
      var currentTarget = event.currentTarget;
      var $currentTarget = $(currentTarget);
      var pos = $currentTarget.data("pos");

      if (view.game.isOver()) {
        alert("Game is already over!");
      } else if ($currentTarget.hasClass('checked')) {
        alert("Invalid move!");
      } else {
        var currentPlayer = view.game.currentPlayer;
        view.game.playMove(pos, view.game.currentPlayer);
        view.makeMove($currentTarget, currentPlayer);
        if (view.game.isOver()) {
          var winner = view.game.winner();
          if (winner) {
            $h2.text('"' + winner + '" Wins!');
            $('.' + currentPlayer).addClass('win');
          } else {
            $h2.text('The game is a tie!');
          }
        }
      }
    });
  };

  View.prototype.makeMove = function (square, player) {
    square.addClass("checked").addClass(player);
    square.append(player);
  };

  View.prototype.setupBoard = function () {
    var $ul = $('<ul></ul>');
    $ul.addClass("group");

    for (var rowIdx = 0; rowIdx < 3; rowIdx++) {
      for (var colIdx = 0; colIdx < 3; colIdx++) {
          var $li = $('<li></li>').data("pos", [rowIdx, colIdx]);
          $ul.append($li);
      }
    }
    this.$el.append($ul);
  };
})();
