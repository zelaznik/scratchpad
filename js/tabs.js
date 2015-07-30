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

  // if (this.transitioning) {
  //   return;
  // } else {
  //   this.transitioning = true;
  // }

  // Switch active link
  var activeLink = $(e.currentTarget);
  activeLink.addClass("active");


  var clickedTab = this.$contentTabs.find(activeLink.attr("for"));

  var tabs = this;
  this.$activeTab.removeClass("active");
  this.$activeTab.addClass("transitioning");
  this.$activeTab.one("transitionend", function(e) {

    $transitionedTab = tabs.$activeTab;
    $transitionedTab.removeClass("transitioning");

    tabs.$activeTab = clickedTab;
    tabs.$activeTab.addClass("transitioning");

    setTimeout(function() {
      tabs.$activeTab.removeClass("transitioning");
      tabs.$activeTab.addClass("active");
    },0);
  });


  //this.$contentTabs.find(".tab-pane").removeClass('active');
  //this.$activeTab.removeClass("active");
  // this.$activeTab.addClass("transitioning");

  console.log("hi");
};

$.fn.tabs = function () {
  return this.each(function () {
    new $.Tabs(this);
  });

};
