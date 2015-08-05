Journal.Routers.PostsRouter = Backbone.Router.extend({
  routes: {
    "": "posts",
    "posts/:id": "displaySinglePost"
  },

  initialize: function(options) {
    this.collection = options.collection;
    this.$rootEl = options.root;
  },

  posts: function() {
    var collection = this.collection.fetch();
    var postIndexView = new Journal.Views.PostIndex({
      collection: collection
    });
    this._swapView(postIndexView);
  },

  displaySinglePost: function(id) {
    var model = this.collection.getOrFetch(id);
    var postView = new Journal.Views.PostShow({model: model});
    this._swapView(postView);
  },

  _swapView: function (newView) {
    this._currentView && this._currentView.remove();
    this._currentView = newView;
    this.$rootEl.html(newView.$el);
    newView.render();
  }


});
