Promise = require("promise");
require("whatwg-fetch");
var btoa = require("./btoa");
var getDate = require("./getDate");
var fake = require("./fake");


var key = btoa('key-1:wqWw2pRzOIMqlAV7gCRP');
var bookId = "56bfaf8ff7535b0300f5277d";
var baseUrl = "https://api.fieldbook.com/v1/" + bookId;

var ordersUrl = baseUrl + '/orders';
var customerUrl = baseUrl + '/customer';
var devicesUrl = baseUrl + '/devices';
var techsUrl = baseUrl + '/techs';
var statusesUrl = baseUrl + '/statuses';
var storesUrl = baseUrl + '/stores';

function callApi(url, data) {
  fetch(url, {
      method: "POST",
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': "Basic " + key
      },
      body: JSON.stringify(data)
  }).then(function (response) {
      console.log("Status:: " + response.status);
      resetOrderForm();
  }).catch(function (err) {
      console.log(err);
  });
}

var page = tabris.create("Page", {
  title: "XMLHttpRequest via fetch()",
  topLevel: true
});

var addToOrder =  createPage("Add Order");

createPage("Order List");

var scrollView = tabris.create("ScrollView", {
  left: 0, right: 0, top: 0, bottom: 0
}).appendTo(addToOrder);

tabris.create("TextView", {
  id: "customerNameLabel",
  alignment: "left",
  text: "Customer Name:"
}).appendTo(scrollView);

tabris.create("TextInput", {
  id: "customerNameInput",
  text: fake.createName(),
  message: "Customer Name"
}).appendTo(scrollView);

tabris.create("TextView", {
  id: "phoneNumberLabel",
  text: "Phone #:"
}).appendTo(scrollView);

tabris.create("TextInput", {
  id: "phoneNumberInput",
  text: fake.createNumber(),
  message: "Phone #",
  keyboard: "phone"
}).appendTo(scrollView);

tabris.create("TextView", {
  id: "devicePasswordLabel",
  text: "Device Password"
}).appendTo(scrollView);

tabris.create("TextInput", {
  id: "devicePasswordInput",
  message: "Device Password",
  keyboard: "numbersAndPunctuation"
}).appendTo(scrollView);

tabris.create("TextView", {
  id: "quotedPriceLabel",
  text: "Quoted Price"
}).appendTo(scrollView);

tabris.create("TextInput", {
  id: "quotedPriceInput",
  message: "Quoted Price",
  keyboard: "number"
}).appendTo(scrollView);

tabris.create("TextView", {
  id: "deviceIssuesLabel",
  text: "Describe Issues"
}).appendTo(scrollView);

tabris.create("TextInput", {
  id: "deviceIssuesInput",
  message: "Describe Issues"
}).appendTo(scrollView);

tabris.create("TextView", {
  id: "brandLabel",
  text: "Brand:"
}).appendTo(scrollView);

tabris.create("Picker", {
  id: "brandPicker",
  items: ["Acer", "Apple", "Asus"]
}).appendTo(scrollView);

tabris.create("TextView", {
  id: "hasChargerLabel",
  text: "With Charger:"
}).appendTo(scrollView);

tabris.create("RadioButton", {
  id: "withCharger",
  text: "YES"
}).appendTo(scrollView);

tabris.create("RadioButton", {
  id: "withOutCharger",
  text: "NO"
}).appendTo(scrollView);

tabris.create("Button", {
  id: "sendButton",
  text: "Send Order",
}).on("select", function(){
  var data = createOrder();

  fetch(ordersUrl, {
      method: "POST",
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': "Basic " + key
      },
      body: JSON.stringify(data)
  }).then(function (response) {
      console.log(response.status);
      return response.json();
  }).then(function(json){
    addCustomerToOrder(json.id);
    addDeviceToOrder(json.id);
    addStatusToOrder(json.id);
  }).catch(function (err) {
      console.log(err);
  });

}).appendTo(scrollView);


addToOrder.apply({
  "#customerNameLabel": {layoutData: {left: 10, top: 18, width: 120}},
  "#customerNameInput": {layoutData: {left: "#customerNameLabel 10", right: 10, baseline: "#customerNameLabel"}},
  "#phoneNumberLabel": {layoutData: {left: 10, top: "#customerNameLabel 25", width: 120}},
  "#phoneNumberInput": {layoutData: {left: "#phoneNumberLabel 10", right: 10, baseline: "#phoneNumberLabel"}},
  "#devicePasswordLabel": {layoutData: {left: 10, top: "#phoneNumberLabel 25", width: 120}},
  "#devicePasswordInput": {layoutData: {left: "#devicePasswordLabel 10", right: 10, baseline: "#devicePasswordLabel"}},
  "#quotedPriceLabel": {layoutData: {left: 10, top: "#devicePasswordLabel 25", width: 120}},
  "#quotedPriceInput": {layoutData: {left: "#quotedPriceLabel 10", right: 10, baseline: "#quotedPriceLabel"}},
  "#deviceIssuesLabel": {layoutData: {left: 10, top: "#quotedPriceLabel 25", width: 120}},
  "#deviceIssuesInput": {layoutData: {left: "#deviceIssuesLabel 10", right: 10, baseline: "#deviceIssuesLabel"}},
  "#hasChargerLabel": {layoutData: {left: 10, top: "#brandLabel 25", width: 120}},
  "#withCharger": {layoutData: {left: "#hasChargerLabel 10", right: 10, baseline: "#hasChargerLabel"}},
  "#withOutCharger": {layoutData: {left: "#hasChargerLabel 10", right: 10, top: "#hasChargerLabel 10"}},
  "#brandLabel": {layoutData: {left: 10, top: "#deviceIssuesLabel 25", width: 120}},
  "#brandPicker": {layoutData: {left: "#brandLabel 10", right: 10, baseline: "#brandLabel"}},
  "#sendButton": {layoutData: {left: "20%", top: "#withOutCharger 25" , right: "20%"}}
});

function resetOrderForm() {
  addToOrder.apply({
  "#customerNameInput": {text: ""},
  "#phoneNumberInput": {text: ""},
  "#devicePasswordInput": {text: ""},
  "#quotedPriceInput": {text: ""},
  "#deviceIssuesInput": {text: ""},
  "#withCharger": {selection: false},
  "#withOutCharger": {selection: false},
  "#brandPicker": {selectionIndex: 0}
});
}

function hasChargerSelection() {
  var check = scrollView.children("#withCharger").get("selection");
  if (check){
    return "Yes";
  }

  return "No"
}

function createOrder() {
  var data = {
    date: getDate(),
    price: scrollView.children("#quotedPriceInput").get("text"),
    stores: [{id: 1, store_name: "Iselin"}]
  }

  return data;
}

function addCustomerToOrder(orderId) {
  var id = [{id: orderId}];
  var data = {
        order_id: id,
        name: scrollView.children("#customerNameInput").get("text"),
        phone_number: scrollView.children("#phoneNumberInput").get("text")
  };

  callApi(customerUrl, data);
}

function addDeviceToOrder(orderId) {
  var id = [{id: orderId}];
  var data = {
      order_id: id,
      brand: scrollView.children("#brandPicker").get("selection"),
      has_charger: hasChargerSelection(),
      password: scrollView.children("#devicePasswordInput").get("text"),
      device_issues: scrollView.children("#deviceIssuesInput").get("text")  
  };

  callApi(devicesUrl, data);
}

function addStatusToOrder(orderId) {
  var id = [{id: orderId}];
  var data = {
      order_id: id,
      status: "Order Taken",
      date: getDate(),
  };

  callApi(statusesUrl, data);
}



var drawer = tabris.create("Drawer");


tabris.create("PageSelector", {
  layoutData: {left: 0, top: 15, right: 0, bottom: 0}
}).appendTo(drawer);

tabris.create("PageSelector", {
  layoutData: {left: 0, top: 15, right: 0, bottom: 0}
}).appendTo(page);

function createPage(title) {
  var page = tabris.create("Page", {
    title: title,
    topLevel: true
  });

  return page;
}

page.open();