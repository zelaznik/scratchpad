$.Tabs = function (el) {
  // This function is only called once.

  this.$el = $(el); // assume this is tab ul
  this.$contentTabs = this.$el.find("#content-tabs");
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
  var dogList = $(e.delegateTarget);
  var link = $(e.currentTarget);
  var clickedTab = dogList.find(link.attr("for"));
  // body...

  this.$activeTab.removeClass("active");
  
  var tabs = this;
  this.$activeTab.on("transitionend", function(e) {
    $transitionedTab = tabs.$activeTab;
    $transitionedTab.removeClass("transitioning");
    tabs.$activeTab = clickedTab;
    tabs.$activeTab.addClass("active");
  });
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
