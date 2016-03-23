var Tile = function (board, pos) {
  this.board = board;
  this.pos = pos;
  this.planted = false;
  this.explored = false;
  this.flagged = false;
};

Tile.DELTAS = [[-1, -1], [-1,  0], [-1,  1], [ 0, -1],
               [ 0,  1], [ 1, -1], [ 1,  0], [ 1,  1]];

Object.assign(Tile.prototype, {

  adjacentBombCount: function() {
    var bombCount = 0;
    this.neighbors().forEach(function(neighbor) {
      if (neighbor.planted) {
        bombCount++;
      }
    });
    return bombCount;
  },

  explore: function () {
    if (this.flagged || this.explored) {
      return this;
    }

    this.explored = true;
    if (!this.planted && this.adjacentBombCount() === 0) {
      this.neighbors().forEach(function(tile) {
        tile.explore();
      });
    }

  },

  neighbors: function() {
    var adjacentCoords = [];
    Tile.DELTAS.forEach(function(delta) {
      var newPos = [delta[0] + this.pos[0], delta[1] + this.pos[1]];
      if (this.board.onBoard(newPos)) {
        adjacentCoords.push(newPos);
      }
    }.bind(this));

    return adjacentCoords.map(function(coord) {
      return this.board.grid[coord[0]][coord[1]];
    }.bind(this));
  },

  plantBomb: function () {
    this.planted = true;
  },

  toggleFlag: function () {
    if (!this.explored) {
      this.flagged = !this.flagged;
      return true;
    }

    return false;
  },

  get wasBlownUp() {
    return this.planted && this.explored;
  },

});

var Board = function (rowCt, colCt, numBombs) {
  this.rowCt = rowCt;
  this.colCt = colCt;
  this.grid = [];
  this.numBombs = numBombs;
  this.generateBoard();
  this.plantBombs();
};

Board.prototype.generateBoard = function () {
  for (var i = 0; i < this.rowCt; i++) {
    this.grid.push([]);
    for (var j = 0; j < this.colCt; j++) {
      var tile = new Tile(this, [i, j]);
      this.grid[i].push(tile);
    }
  }
};

Board.prototype.onBoard = function (pos) {
  return (
    pos[0] >= 0 && pos[0] < this.rowCt &&
      pos[1] >= 0 && pos[1] < this.colCt
  );
};

Board.prototype.plantBombs = function () {
  var totalPlantedBombs = 0;
  while (totalPlantedBombs < this.numBombs) {
    var row = Math.floor(Math.random() * this.rowCt);
    var col = Math.floor(Math.random() * this.colCt);

    tile = this.grid[row][col];
    if (!tile.planted) {
      tile.plantBomb();
      totalPlantedBombs++;
    }
  }
};

Board.prototype.lost = function () {
  var lost = false;
  this.grid.forEach(function(row) {
    row.forEach(function(tile) {
      if (tile.wasBlownUp) {
        lost = true;
      }
    });
  });
  return lost;
};

Board.prototype.won = function () {
  var won = true;
  this.grid.forEach(function(row) {
    row.forEach(function(tile) {
      if (tile.flagged === tile.revealed || tile.flagged !== tile.planted) {
        won = false;
      }
    });
  });
  return won;
};

module.exports = {
  Board: Board,
  Tile: Tile
};
