Trello.Collections.Boards = Backbone.Collection.extend({
  url: 'api/boards',
  model: Trello.Models.Board,

  getOrFetch: function(id) {
    var board = this.get(id);
    if (!board) {
      board = new this.model({id: id});
      board.fetch({
        success: function() {
          this.add(board);
        }.bind(this)
      });

    } else {
      board.fetch();
    }

    return board;
  }

});
