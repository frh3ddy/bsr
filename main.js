var ordersList = require("./orders_list");
var orderForm = require("./order_form");
var dashboard = require("./dashboard.js");

var page = new tabris.Page({
  title: "Dashboard",
  topLevel: true
});

var tabFolder = new tabris.TabFolder({
  layoutData: {left: 0, top: 0, right: 0, bottom: 0},
  paging: false // enables swiping. To still be able to open the developer console in iOS, swipe from the bottom right.
}).appendTo(page);

var createTab = function(title, image, content) {
  var tab = new tabris.Tab({
    title: title, // converted to upper-case on Android
    image: {src: image, scale: 3}
  }).appendTo(tabFolder);

  if(content){
    content(tab);
  }
};

createTab("Dashboard", "images/dashboard.png", dashboard);
createTab("Oxford", "images/Oxford.png", ordersList);
createTab("Edison", "images/Edison.png");
createTab("Mercer", "images/Mercer.png");

page.open();

tabFolder.on("change:selection", function(widget, tab) {
  page.set("title", tab.get("title"));
});
