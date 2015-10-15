var Progress = window.Progress;

// The JST function isn't working at the moment,
// so I'm passing the raw HTML instead.

var logged_in_html = '<nav class="navbar navbar-default">\n  <div class="container-fluid">\n    <!-- Brand and toggle get grouped for better mobile display -->\n    <div class="navbar-header">\n      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">\n        <span class="sr-only">Toggle navigation</span>\n        <span class="icon-bar"></span>\n        <span class="icon-bar"></span>\n        <span class="icon-bar"></span>\n      </button>\n      <a class="navbar-brand" href="#about">Progress Tracker</a>\n    </div>\n\n    <!-- Collect the nav links, forms, and other content for toggling -->\n    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">\n      <ul class="nav navbar-nav">\n        <li><a href="#users/index">Browse Matches</a></li>\n      </ul>\n\n      <ul class="nav navbar-nav navbar-right">\n        <li class="dropdown">\n          <a  href="#" class="dropdown-toggle"\n              data-toggle="dropdown" role="button"\n              aria-haspopup="true" aria-expanded="false">Visits<span class="caret"></span></a>\n          <ul class="dropdown-menu">\n            <li><a href="#/visits/sent">Visited Profiles</a></li>\n            <li><a href="#/visits/received">People Who Visited You</a></li>\n          </ul>\n        </li>\n\n        <li class="dropdown">\n          <a  href="#" class="dropdown-toggle"\n              data-toggle="dropdown" role="button"\n              aria-haspopup="true" aria-expanded="false">Likes<span class="caret"></span></a>\n          <ul class="dropdown-menu">\n            <li><a href="#/likes/crushes">Crushes</a></li>\n            <li><a href="#/likes/secret_admirers">Secret Admirers</a></li>\n            <li><a href="#/likes/soulmates">Soulmates</a></li>\n          </ul>\n        </li>\n\n        <li class="dropdown">\n          <a  href="#" class="dropdown-toggle"\n              data-toggle="dropdown" role="button"\n              aria-haspopup="true" aria-expanded="false">Messages<span class="caret"></span></a>\n          <ul class="dropdown-menu">\n            <li><a href="#/messages/sent">Sent</a></li>\n            <li><a href="#/messages/received">Received</a></li>\n          </ul>\n        </li>\n\n        <li class="dropdown">\n          <a  href="#" class="dropdown-toggle"\n              data-toggle="dropdown" role="button"\n              aria-haspopup="true" aria-expanded="false">\n              You<span class="caret"></span></a>\n          <ul class="dropdown-menu">\n            <li><a href="#">Profile</a></li>\n            <li><a href="#/sign_out">Sign Out</a></li>\n          </ul>\n        </li>\n\n\n      </ul>\n\n    </div><!-- /.navbar-collapse -->\n  </div><!-- /.container-fluid -->\n</nav>';

Progress.Views.NavShow = Backbone.View.extend({
  //template: JST['logged_in'],
  template: function() { return logged_in_html;},

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
