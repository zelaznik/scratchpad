(function () {
  if (typeof Hanoi === 'undefined') {
   window.Hanoi = {};
  }

  var View = Hanoi.View = function(game, $el) {
    this.game = game;
    this.$el = $el;

    this.setupTowers();
    this.render();
    this.clickTower();
  };


  View.prototype.clickTower = function () {
    var $squares = $("li");
    var view = this;

    $squares.on("click", function (event) {
      if (!view.startTowerIdx) {
        var startTower = event.currentTarget;
        console.log(event.currentTarget);
        view.startTowerIdx = $(startTower).attr("column");
      }
      else {
        console.log(view.startTowerIdx);
        var endTower = event.currentTarget;
        view.endTowerIdx = $(endTower).attr("column");
        if (!view.game.move(view.startTowerIdx, view.endTowerIdx)) {
          alert("Invalid move");
        }
        view.startTowerIdx = null;
      }
      if (view.game.isWon()) {
        $("h2").text("You've won!");
      }
      view.render();
  });
};


  View.prototype.setupTowers = function() {
    var $ul = $('<ul></ul>');
    $ul.addClass("group");
    for (var i=0; i<9; i++) {
        var $li = $('<li></li>');
        var colIdx = i % 3;
        var rowIdx = 2 - Math.floor(i/3);
        $li.attr("column", colIdx);
        $li.attr("row", rowIdx);
        $ul.append($li);
    }
    this.$el.append($ul);
  };


  View.prototype.render = function() {
    var towers = this.game.towers;
    for (var i=0; i < 9; i++) {
      var colIdx = 2 - Math.floor(i/3);
      var rowIdx = i % 3;
      var cell = towers[rowIdx][colIdx];
      var $currentCell = $("li").eq(i);
      $currentCell.text(cell || "");
    }
  };





})();
