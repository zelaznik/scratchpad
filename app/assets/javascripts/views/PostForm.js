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
    e.preventDefault();

    var newAttrs = $(e.currentTarget).serializeJSON();

    this.model.save(newAttrs, {
      success: (function() {
        this.collection.add(this.model);
        var url = '#/posts/' + this.model.escape('id');
        Backbone.history.navigate(url, {trigger: true});
      }).bind(this)

    });

  }
});
