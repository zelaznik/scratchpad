Trello.Collections.Cards = Backbone.Collection.extend({
  initialize: function(models, options) {
    this.list = options.list;
  },

  model: Trello.Models.Card,

  url: function() {
    return this.list.url() + '/cards';
  },

  comparator: function(card) {
    return card.get('updated_at');
  },

  getOrFetch: function(id) {
    var card = this.get(id);
    if (!card) {
      card = new this.model({id: id});
      this.fetch({
        success: function() {
          this.add(card);
        }.bind(this)
      });
    } else {
      card.fetch();
    }

    return this;
  }

});
