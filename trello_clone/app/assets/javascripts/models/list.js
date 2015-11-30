Trello.Models.List = Backbone.Model.extend({
  urlRoot: 'api/lists',

  initialize: function(options) {
    this.board = options.board;
  },

  parse: function(response) {
    if (response.cards) {
      this.cards().set(response.cards);
      delete response.cards;
    }

    return response;
  },

  cards: function() {
    if (!this._cards) {
      this._cards = new Trello.Collections.Cards([], {list: this});
    }

    return this._cards;
  }

});
