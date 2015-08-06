
window.Journal = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var collection = new Journal.Collections.Posts();
    var indexView = new Journal.Views.PostIndex({
      collection: collection
    });
    $('.root .sidebar').html(indexView.render().$el);

    var options = {
      root: $('.root .content'), // some element of the DOM to render all its goodies into
      collection: collection, // a new instance of a collection
      indexView: indexView
    };
    new Journal.Routers.PostsRouter(options);
    Backbone.history.start();
  }
};

$(document).ready(function(){
  Journal.initialize();
});
