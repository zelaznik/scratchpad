var Progress = window.Progress = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var router = new Progress.Routers.Router({
      $rootEl: $('#content')
    });

    var nav = new Progress.Views.NavShow({
      router: router
    });

    $('#navbar').html(nav.render().$el);
    Backbone.history.start();
  }
};

$(document).ready(function() {
  Progress.initialize();
});
