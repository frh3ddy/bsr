var fake = require("./fake");
var createToolBar = require("./toolBar");
var ordersList = require("./orders_list");
ordersList();

var orderForm = require("./order_form");
orderForm();

var dashboardPage = tabris.create("Page", {
  title: "DashBoard",
  topLevel: true
});

var dashboardContainer = tabris.create("ScrollView", {
  layoutData: {left: 0, right: 0, top: 0, bottom: 49},
}).appendTo(dashboardPage);

tabris.create("PageSelector", {
  layoutData: {left: 0, top: 15, right: 0, bottom: 0}
}).appendTo(dashboardPage);

createToolBar({
  page: dashboardPage,
  container: dashboardContainer,
  dashboard: true,
  pages: {dashboard: dashboardPage}
});

dashboardPage.open();
