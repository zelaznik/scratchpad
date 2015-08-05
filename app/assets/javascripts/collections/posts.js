Journal.Collections.Posts = Backbone.Collection.extend({
  url: "api/posts",
  model: Journal.Models.Post,

  getOrFetch: function(id) {
    var post = this.get(id);
    if (!post) {
      post = new this.model({id: id});
      this.add(post);
    }
  }

});
