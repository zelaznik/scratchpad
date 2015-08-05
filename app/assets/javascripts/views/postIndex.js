Journal.Views.PostIndex = Backbone.View.extend({
  template: JST["postIndex"],
  tagName: "ul",

  initialize: function() {
    this.collection = new Journal.Collections.Posts();
    this.collection.fetch({reset: true});
    this.listenTo(this.collection, "sync remove reset", this.render);
  },

  render: function () {
    var view = this;

    var content = this.template({posts: this.collection});
    this.$el.html(content);
    this.collection.each(function (post) {
      var postview = new Journal.Views.PostIndexItem({model: post});
      view.$el.append(postview.render().$el);
    });
    return this;
  }

});
