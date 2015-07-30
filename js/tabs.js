$.Tabs = function (el) {
  // This function is only called once.

  this.$el = $(el); // assume this is tab ul
  this.$contentTabs = $("#content-tabs");
  this.$activeTab = this.$contentTabs.find(".active");
  this.setupClickHandler();
};

$.Tabs.prototype.setupClickHandler = function() {
  var tabs = this;
  tabs.$el.on('click', 'a', function(e) {
    tabs.clickTab(e);
  });
}

$.Tabs.prototype.clickTab = function (e) {
  e.preventDefault();
  // var dogList = $(e.delegateTarget);
  var link = $(e.currentTarget);
  var clickedTab = this.$contentTabs.find(link.attr("for"));
  // body...

  var tabs = this;
  this.$activeTab.on("transitionend", function(e) {
    $transitionedTab = tabs.$activeTab;
    $transitionedTab.removeClass("transitioning");

    tabs.$activeTab = clickedTab;
    tabs.$activeTab.addClass("active");
    tabs.$activeTab.addClass("transitioning");

    setTimeout(function() {
      tabs.$activeTab.removeClass("transitioning");
    },0);
  });

  this.$activeTab.removeClass("active");
  this.$activeTab.addClass("transitioning");

  //
  // var tabPanes = $('.tab-pane');
  // tabPanes.removeClass('transitioning');

  var allLinks = this.$el.find('a');
  allLinks.removeClass('active');
  link.addClass("active");
};

$.fn.tabs = function () {
  return this.each(function () {
    new $.Tabs(this);
  });

};
