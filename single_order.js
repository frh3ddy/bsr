function orderPage(order) {
  var MARGINLEFT = 10

var page = tabris.create("Page", {
  title: "Order " + order.id,
  topLevel: true
});

var orderInfoContainer = tabris.create("ScrollView", {
  layoutData: {left: 0, right: 0, top: 0, bottom: 0},
  background: "#f4f5f9"
}).appendTo(page);


var customerHeaderText = tabris.create("TextView", {
  text: "CUSTOMER INFORMATION",
  font: "13px bold",
  textColor: "#6d819c",
  layoutData: {left: MARGINLEFT, top: 20},
  markupEnabled: true
}).appendTo(orderInfoContainer);

var customerInfoSection = tabris.create("Composite", {
  background: "#fff",
  layoutData: {top: [customerHeaderText, 5], left: 0, right: 0}
}).appendTo(orderInfoContainer);

createLine({parent: customerInfoSection, alignment: "top"});

var customerNameLabel = tabris.create("TextView", {
  text: "Name",
  font: "11px",
  textColor: "#6E7783",
  layoutData: {top: 6, left: MARGINLEFT, right: 0}
}).appendTo(customerInfoSection);

var customerNameText = tabris.create("TextView", {
  font: "16px",
  textColor: "#252c41",
  text: order.customer.name,
  layoutData: {top: [customerNameLabel, 6], left: MARGINLEFT, right: 0}
}).appendTo(customerInfoSection);

createLine({parent: customerInfoSection});

var smsIcon = tabris.create("ImageView", {
  image: {src: 'http://www.5dollarperfume.com/images/menGiftSets/smsIcon.png', scale: 3},
  highlightOnTouch: true,
  layoutData: {top: [customerNameText, 16], right: 16}
}).appendTo(customerInfoSection);

var iconCall = tabris.create("ImageView", {
  highlightOnTouch: true,
  image: {src: 'http://www.5dollarperfume.com/images/menGiftSets/iconCall.png', scale: 3},
  layoutData: {top: [customerNameText, 16], right: [smsIcon, 25]}
}).appendTo(customerInfoSection);

var customerPhoneLabel = tabris.create("TextView", {
  text: "Phone #",
  font: "11px",
  textColor: "#6E7783",
  layoutData: {top: [customerNameText, 12], left: MARGINLEFT, right: 0}
}).appendTo(customerInfoSection);

var customerPhoneText = tabris.create("TextView", {
  font: "16px",
  textColor: "#252c41",
  text: order.customer.phone_number,
  layoutData: {top: [customerPhoneLabel, 6], left: MARGINLEFT, right: 0}
}).appendTo(customerInfoSection);

createLine({parent: customerInfoSection});

// Device info section
var deviceHeaderText = tabris.create("TextView", {
  text: "DEVICE INFORMATION",
  font: "13px bold",
  textColor: "#6d819c",
  layoutData: {left: 10, top: [customerInfoSection ,20]},
  markupEnabled: true
}).appendTo(orderInfoContainer);

var deviceInfoSection = tabris.create("Composite", {
  background: "#fff",
  layoutData: {top: [deviceHeaderText, 5], left: 0, right: 0}
}).appendTo(orderInfoContainer);

createLine({parent: deviceInfoSection, alignment: "top"});

var deviceBrandLabel = tabris.create("TextView", {
  text: "Brand",
  font: "11px",
  textColor: "#6E7783",
  layoutData: {top: 6, left: MARGINLEFT, right: 0}
}).appendTo(deviceInfoSection);


var deviceBrandText = tabris.create("TextView", {
  font: "16px",
  textColor: "#252c41",
  text: order.device.brand,
  layoutData: {top: [deviceBrandLabel, 6], left: MARGINLEFT, right: 0}
}).appendTo(deviceInfoSection);


createLine({parent: deviceInfoSection});

var devicePasswordLabel = tabris.create("TextView", {
  text: "Password",
  font: "11px",
  textColor: "#6E7783",
  layoutData: {top: [deviceBrandText, 12], left: MARGINLEFT, right: 0}
}).appendTo(deviceInfoSection);

var devicePasswordText = tabris.create("TextView", {
  font: "16px",
  textColor: "#252c41",
  text: order.device.password,
  layoutData: {top: [devicePasswordLabel, 6], left: MARGINLEFT, right: 0}
}).appendTo(deviceInfoSection);

createLine({parent: deviceInfoSection});

addEditableGroup({
  parent: deviceInfoSection,
  label: "Device Issues",
  bodyText: order.device.device_issues
});

createLine({parent: deviceInfoSection});

addEditableGroup({
  parent: deviceInfoSection,
  label: "Current Status",
  bodyText: order.status.status
});

createLine({parent: deviceInfoSection});

// Order info section
var orderHeaderText = tabris.create("TextView", {
  text: "ORDER DETAILS",
  font: "13px bold",
  textColor: "#6d819c",
  layoutData: {left: 10, top: [deviceInfoSection ,20]},
  markupEnabled: true
}).appendTo(orderInfoContainer);

var orderDetailsSection = tabris.create("Composite", {
  background: "#fff",
  layoutData: {top: [orderHeaderText, 5], left: 0, right: 0}
}).appendTo(orderInfoContainer);

createLine({parent: orderDetailsSection, alignment: "top"});

var orderDateLabel = tabris.create("TextView", {
  text: "Order was Taken:",
  font: "11px",
  textColor: "#6E7783",
  layoutData: {top: 6, left: MARGINLEFT, right: 0}
}).appendTo(orderDetailsSection);


var orderDateText = tabris.create("TextView", {
  font: "16px",
  textColor: "#252c41",
  text: order.date,
  layoutData: {top: [orderDateLabel, 6], left: MARGINLEFT, right: 0}
}).appendTo(orderDetailsSection);


createLine({parent: orderDetailsSection});

var orderQuotedPriceLabel = tabris.create("TextView", {
  text: "Quoted Price",
  font: "11px",
  textColor: "#3ac569",
  layoutData: {top: [orderDateText, 12], left: MARGINLEFT, right: 0}
}).appendTo(orderDetailsSection);

var orderQuotedPriceText = tabris.create("TextView", {
  font: "16px",
  textColor: "#252c41",
  text: "$" + order.price + ".00",
  layoutData: {top: [orderQuotedPriceLabel, 6], left: MARGINLEFT, right: 0}
}).appendTo(orderDetailsSection);

createLine({parent: orderDetailsSection});

function addEditableGroup(props) {
  var container = tabris.create("Composite", {
    layoutData: {top: ["prev()", 0], left: 0, right: 0},
    highlightOnTouch: true
  }).on("tap", function(){
    var page = tabris.create("Page", {
      title: "Edit " + props.label
    });
    page.open()
  }).appendTo(props.parent);

  tabris.create("TextView", {
    text: props.label,
    font: "11px",
    textColor: "#6E7783",
    layoutData: {top: 6, left: MARGINLEFT, right: 0}
  }).appendTo(container);

  tabris.create("TextView", {
    font: "16px",
    textColor: "#252c41",
    text: props.bodyText,
    layoutData: {top: ["prev()", 6], left: MARGINLEFT, right: 40}
  }).appendTo(container);

  tabris.create("ImageView",{
    image: {src: "http://www.5dollarperfume.com/images/menGiftSets/view_more.png", scale: 3},
    layoutData: {right: 20},
    centerY: 0
  }).appendTo(container);

  return null;
}

function createLine(props) {
  var alignment;
  var margin;

  if(props.alignment === "top"){
    alignment = {top: 0, bottom: .5, left: 0, right: 0};
    margin = 0;
  } else {
    alignment = {top: .5, bottom: 0, left: 0, right: 0}
    margin = ["prev()", 6]
  }

  var dividerContainer = tabris.create("Composite", {
    layoutData: {top: margin, left: 0, right: 0},
    height: 1,
  }).appendTo(props.parent);;

  var divider = tabris.create("TextView", {
    background: "#dddfe6",
    layoutData: alignment,
  }).appendTo(dividerContainer);

  return null;
}



  page.open()
}

module.exports = orderPage;
