Journal.Views.PostForm = Backbone.View.extend({
  template: JST['post_form'],

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
  },

  events: {
    "submit form" : "updatePost"
  },

  render: function() {
    var content = this.template({post: this.model});
    this.$el.html(content);
    return this;
  },

  updatePost: function (e) {
    var form = $(e.currentTarget).serializeJSON();
    this.model.set(form);
    var url = '#/posts/' + this.model.escape('id');
    debugger;
    this.model.save({
      success: Backbone.history.navigate(url, {trigger: true})
    });

  }
});
