window.Journal = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    options = {
      root: $('.root'), // some element of the DOM to render all its goodies into
      collection: new Journal.Collections.Posts() // a new instance of a collection
    };
    new Journal.Routers.PostsRouter(options);
    Backbone.history.start();
  }
};

$(document).ready(function(){
  Journal.initialize();
});
