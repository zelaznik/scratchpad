Trello.Collections.Lists = Backbone.Collection.extend({
  initialize: function(models, options) {
    this.board = options.board;
  },

  model: Trello.Models.List,

  url: function() {
    return this.board.url() + '/lists';
  },

  comparator: function(list) {
    return list.get('updated_at');
  },

  getOrFetch: function(id) {
    var list = this.get(id);
    if (!list) {
      list = new this.model({id: id});
      this.fetch({
        success: function() {
          this.add(list);
        }.bind(this)
      });
    } else {
      list.fetch();
    }

    return this;
  }

});
