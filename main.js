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

function callApi(url, data, progress) {
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
      if(progress){
        var currentSelection = progress.get("selection");
        progress.set("selection", currentSelection + 100)

        if(progress.get("selection") > 400){
          resetOrderForm(); //Reset form only after the last promise resolves 
        }
      }
  }).catch(function (err) {
      console.log(err);
  });
}

function getOrdersList(url) {
  fetch(url, {
      method: "GET",
      headers: {
          'Accept': 'application/json',
          'Authorization': "Basic " + key
      }
  }).then(function (response) {
      console.log("Status:: " + response.status);
      return response.json();
  }).then(function(j) {
    j.forEach(function(el){
      console.log(el)
    }) 
  }).catch(function (err) {
      console.log(err);
  });
}

getOrdersList(ordersUrl);

function createSubmitStatusPage(){
  var page = tabris.create("Page", {
    title: "sending",
    topLevel: true,
    id: "statusPage"
  });


  if(isOrderValid()){
    page.open();

    var sendingOrder = tabris.create("TextView", {
      text: "Sending Order......",
      layoutData: {centerX: 0, centerY: -20},
    }).appendTo(page);

    var progressBar = tabris.create("ProgressBar",{
      layoutData: {left: 15, right: 15, centerY: 0},
      maximum: 500,
      selection: 0
    }).on("change:selection", function(progressBar, selection) {
      if(selection === 500){
        setTimeout(function(){
          page.close();
        }, 500);
      }
    }).appendTo(page);

    setTimeout(function(){
      progressBar.set("selection", 100)
    }, 500);

    //Need to create the initial data to optain an order id
    var data = initialOrderData();

      

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
        progressBar.set("selection", 200);
        return response.json();
    }).then(function(json){
     //Once the order has been created, now is time to add the rest of the order data
      addCustomerToOrder(json.id, progressBar);
      addDeviceToOrder(json.id, progressBar);
      addStatusToOrder(json.id, progressBar);
    }).catch(function (err) {
        console.log(err);
    });
  };
}

var page = tabris.create("Page", {
  title: "DashBoard",
  topLevel: true
});

var addToOrder =  tabris.create("Page", {
    title: "Add Order",
    topLevel: true
  });

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
  items: ["Select Brand", "Acer", "Apple", "Asus"]
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
}).on("select", createSubmitStatusPage).appendTo(scrollView);


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

function validateInput(selector, type, value) {
  var currentValue = scrollView.children(selector).get(type);
  if(currentValue === value){
    return false
  } else {
    return true
  }
}

function isOrderValid() {
  var inputValues = [];
  var valid = true;
  inputValues.push(validateInput("#customerNameInput", "text", ""));
  inputValues.push(validateInput("#phoneNumberInput", "text", ""));
  inputValues.push(validateInput("#devicePasswordInput", "text", ""));
  inputValues.push(validateInput("#quotedPriceInput", "text", ""));
  inputValues.push(validateInput("#deviceIssuesInput", "text", ""));
  inputValues.push(validateInput("#withCharger", "selection", false) || validateInput("#withOutCharger", "selection", false));
  inputValues.push(validateInput("#brandPicker", "selectionIndex", 0));

  inputValues.forEach(function (el) {
    if(!el){
      valid = false
    }
  });

  return valid;
}

function hasChargerSelection() {
  var check = scrollView.children("#withCharger").get("selection");
  if (check){
    return "Yes";
  }

  return "No"
}

function initialOrderData() {
  var data = {
    date: getDate(),
    price: scrollView.children("#quotedPriceInput").get("text"),
    stores: [{id: 1, store_name: "Iselin"}]
  }

  return data;
}

function addCustomerToOrder(orderId, progress) {
  var id = [{id: orderId}];
  var data = {
        order_id: id,
        name: scrollView.children("#customerNameInput").get("text"),
        phone_number: scrollView.children("#phoneNumberInput").get("text")
  };

  callApi(customerUrl, data, progress);
}

function addDeviceToOrder(orderId, progress) {
  var id = [{id: orderId}];
  var data = {
      order_id: id,
      brand: scrollView.children("#brandPicker").get("selection"),
      has_charger: hasChargerSelection(),
      password: scrollView.children("#devicePasswordInput").get("text"),
      device_issues: scrollView.children("#deviceIssuesInput").get("text")  
  };

  callApi(devicesUrl, data, progress);
}

function addStatusToOrder(orderId, progress) {
  var id = [{id: orderId}];
  var data = {
      order_id: id,
      // initial order status, not need to be dynamic. 
      status: "Order Taken", 
      date: getDate(),
  };

  callApi(statusesUrl, data, progress);
}



// var drawer = tabris.create("Drawer");


// tabris.create("PageSelector", {
//   layoutData: {left: 0, top: 15, right: 0, bottom: 0}
// }).appendTo(drawer);



tabris.create("PageSelector", {
  layoutData: {left: 0, top: 15, right: 0, bottom: 0}
}).appendTo(page);

page.open();