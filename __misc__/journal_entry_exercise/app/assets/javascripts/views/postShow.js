Journal.Views.PostShow = Backbone.View.extend({
  template: JST['postShow'],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function() {
    var content = this.template({post: this.model});
    this.$el.html(content);
    return this;
  }

});
