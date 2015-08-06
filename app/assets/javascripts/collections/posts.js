Journal.Collections.Posts = Backbone.Collection.extend({
  url: "api/posts",
  model: Journal.Models.Post,

  getOrFetch: function(id) {
    var post = this.get(id);
    if (!post) {
      post = new this.model({id: id});
      post.fetch({
        success: function () {
          this.add(post);
        }.bind(this)
      });
      // this.add(post);
    } else {
      post.fetch();
    }
    return post;
  }

});
