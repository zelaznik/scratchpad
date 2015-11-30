Journal.Routers.PostsRouter = Backbone.Router.extend({
  routes: {
    "": "createNewPost",
    "posts/:id": "displaySinglePost",
    "posts/:id/edit": "editSinglePost"
  },

  initialize: function(options) {
    this.collection = options.collection;
    this.$rootEl = options.root;
  },

  // posts: function() {
  //   var collection = this.collection.fetch();
  //   var postIndexView = new Journal.Views.PostIndex({
  //     collection: collection
  //   });
  //   this._swapView(postIndexView);
  // },

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
  },

  editSinglePost: function (id) {
    var collection = this.collection;
    var model = this.collection.getOrFetch(id);
    var editView = new Journal.Views.PostForm({model: model, collection: collection});
    this._swapView(editView);
  },

  createNewPost: function () {
    var collection = this.collection;
    var model = new Journal.Models.Post();
    var newView = new Journal.Views.PostForm({model: model, collection: collection});
    this._swapView(newView);
  }
});
