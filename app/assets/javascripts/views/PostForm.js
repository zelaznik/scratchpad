Journal.Views.PostForm = Backbone.View.extend({
  template: JST['post_form'],

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
  },

  events: {
    "click .submit" : "updatePost"
  },

  render: function() {
    var content = this.template({post: this.model});
    this.$el.html(content);
    return this;
  },

  updatePost: function () {
    throw "NotImplemented";
  }
});
