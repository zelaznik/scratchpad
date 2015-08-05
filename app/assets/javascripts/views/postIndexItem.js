Journal.Views.PostIndexItem = Backbone.View.extend({
  template: JST["postIndexItem"],

  tagName: "li",

  events: {
    "click .delete-post" : "deletePost"
  },

  render: function () {
    var content = this.template({post: this.model});
    this.$el.html(content);
    return this;
  },

  deletePost: function () {
    this.model.destroy();
    //this.remove();  //Only necessary if a listenTo event has been added.
  }

});
