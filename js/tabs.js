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
  // body...
  this.$activeTab.removeClass("active");
  var dogList = $(e.delegateTarget);
  var link = $(e.currentTarget);

  var clickedTab = dogList.find(link.attr("for"));
  this.$activeTab = clickedTab.addClass("active");

  this.$el.find('a').removeClass('active');
  link.addClass("active");
};

$.fn.tabs = function () {
  return this.each(function () {
    new $.Tabs(this);
  });

};
