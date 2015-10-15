var Progress = window.Progress;

Progress.Routers.Router = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
    'sign_out': 'destroySession'
  },

  destroySession: function() {
    $.ajax({
      type: 'DELETE',
      url: '/session',
      success: function() {
        window.location.replace('/session/new');
      }.bind(this)
    });
  }

});
