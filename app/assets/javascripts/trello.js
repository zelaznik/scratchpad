window.Trello = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var $rootEl = $('.content');
    var $sidebar = $('.sidebar');
    var boards = new Trello.Collections.Boards();
    boards.fetch();

  }
};

$(document).ready(function(){
  Trello.initialize();
});
