var someData =  require("./data");
var singleOrderPage = require("./single_order");
var toolBar = require("./toolBar");

var MARGIN = 12;
var loading;

module.exports = function () {
  var page = tabris.create("Page", {
    title: "Orders",
    topLevel: true
  });
  var orderListContainer = tabris.create("Composite", {
    id: "container",
    layoutData: {left: 0, top: 0, bottom: 49, right: 0}
  }).appendTo(page);

  var ordersCollectionList = tabris.create("CollectionView", {
    layoutData: {left: 0, top: 0, right: 0, bottom: 0},
    items: someData,
    itemHeight: 82,
    initializeCell: function(cell) {
      var divider =  tabris.create("Composite", {
        background: "#d3d3d3"
      }).appendTo(cell);
      var brandImage = tabris.create("ImageView", {
        left: MARGIN, top: 6, width: 70, height: 70,
        scaleMode: "fill"
      }).appendTo(cell);
      var customerName = tabris.create("TextView", {
        maxLines: 2,
        font: "16px",
        markupEnabled: true
      }).appendTo(cell);
      var deviceStatus = tabris.create("TextView", {
        textColor: "#234"
      }).appendTo(cell);
      var dateOrdered = tabris.create("TextView", {
        alignment: "right",
        textColor: "green"
      }).appendTo(cell);
      cell.on("change:item", function(widget, item) {
        brandImage.set("image", "images/" + item.device.brand.toLowerCase()+ ".png");
        customerName.set("text", "<strong>" + item.customer.name + "</strong>");
        dateOrdered.set("text", item.device.brand);
        deviceStatus.set("text", item.status.status);
      }).on("resize", function() {
        var cellWidth = cell.get("bounds").width;
        var textWidth = 200;
        customerName.set({left: 104, top: 6, width: cellWidth - 104});
        deviceStatus.set({top: 54, left: 104, height: 20, width: cellWidth - 104 - MARGIN});
        divider.set({top: 81, left: 104, height: .5, width: cellWidth - 104});
        dateOrdered.set({top: 20, left: cellWidth - textWidth - MARGIN, height: 20, width: textWidth});
      });
    }
  }).on("select", function(target, value) {
      singleOrderPage(value);
  }).appendTo(orderListContainer);

  toolBar({page: page, container: orderListContainer});
}
