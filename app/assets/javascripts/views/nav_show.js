var Progress = window.Progress;

Progress.Views.NavShow = Backbone.View.extend({
  template: JST['logged_in'],

  initialize: function (options) {
    this.router = options.router;
    this.listenTo(this.router, 'route', this.handleRoute);
  },

  handleRoute: function (routeName, params) {
    this.$el.find('.active').removeClass('active');
    this.$el.find('.' + routeName).addClass();
  },

  render: function() {
    var content = this.template({

    });
    this.$el.html(content);

    return this;
  }
});
