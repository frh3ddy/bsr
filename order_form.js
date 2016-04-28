var btoa = require("./btoa");
var key = btoa('key-1:wqWw2pRzOIMqlAV7gCRP');

var rootAPI = require("./rootAPI");
var getDate = require("./getDate");
var fake = require("./fake")
var Syncano = require('./syncano');
var low = require('./lowdb')
var db = low('db', { storage: low.localStorage })


var isLogged = false;
var USER_KEY = null;
if(db.object.user.length){
  USER_KEY = db.object.user[0].user_key;
  isLogged = true
}

var connection = Syncano({ userKey: USER_KEY, apiKey: 'bae21c7ba933f99dcc2782b27f3676ffdb82b539'});
var DataObject = connection.DataObject;

module.exports = function () {
  var page = new tabris.Page({
    title: "Dashboard"
  });

  var container = tabris.create("ScrollView", {
    layoutData: {left: 0, right: 0, top: 0, bottom: 49},
  }).appendTo(page);

  tabris.create("TextView", {
    id: "customerNameLabel",
    alignment: "left",
    text: "Customer Name:"
  }).appendTo(container);

  tabris.create("TextInput", {
    id: "customerNameInput",
    text: fake.createName(),
    message: "Customer Name"
  }).appendTo(container);

  tabris.create("TextView", {
    id: "phoneNumberLabel",
    text: "Phone #:"
  }).appendTo(container);

  tabris.create("TextInput", {
    id: "phoneNumberInput",
    text: fake.createNumber(),
    message: "Phone #",
    keyboard: "phone"
  }).appendTo(container);

  tabris.create("TextView", {
    id: "devicePasswordLabel",
    text: "Device Password"
  }).appendTo(container);

  tabris.create("TextInput", {
    id: "devicePasswordInput",
    message: "Device Password",
    keyboard: "numbersAndPunctuation"
  }).appendTo(container);

  tabris.create("TextView", {
    id: "quotedPriceLabel",
    text: "Quoted Price"
  }).appendTo(container);

  tabris.create("TextInput", {
    id: "quotedPriceInput",
    message: "Quoted Price",
    keyboard: "number"
  }).appendTo(container);

  tabris.create("TextView", {
    id: "deviceIssuesLabel",
    text: "Describe Issues"
  }).appendTo(container);

  tabris.create("TextInput", {
    id: "deviceIssuesInput",
    message: "Describe Issues"
  }).appendTo(container);

  tabris.create("TextView", {
    id: "brandLabel",
    text: "Brand:"
  }).appendTo(container);

  tabris.create("Picker", {
    id: "brandPicker",
    items: ["Select Brand", "Acer", "Apple", "Asus"]
  }).appendTo(container);

  tabris.create("TextView", {
    id: "hasChargerLabel",
    text: "With Charger:"
  }).appendTo(container);

  tabris.create("RadioButton", {
    id: "withCharger",
    text: "YES"
  }).appendTo(container);

  tabris.create("RadioButton", {
    id: "withOutCharger",
    text: "NO"
  }).appendTo(container);

  tabris.create("Button", {
    id: "sendButton",
    text: "Send Order",
  }).on("select", createSubmitStatusPage).appendTo(container);


  page.apply({
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

  // toolBar({
  //   page: page,
  //   container: container
  // });

  function resetOrderForm() {
    page.apply({
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
    var currentValue = container.children(selector).get(type);
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
    var check = container.children("#withCharger").get("selection");
    if (check){
      return "Yes";
    }

    return "No"
  }

  function initialOrderData() {
    var data = {
      date: getDate(),
      price: container.children("#quotedPriceInput").get("text"),
      stores: [{id: 1, store_name: "Iselin"}]
    }

    return data;
  }

  function addCustomerToOrder(orderId, progress) {
    var id = [{id: orderId}];
    var data = {
          order_id: id,
          name: container.children("#customerNameInput").get("text"),
          phone_number: container.children("#phoneNumberInput").get("text")
    };

    callApi(rootAPI.customer, data, progress);
  }

  function addDeviceToOrder(orderId, progress) {
    var id = [{id: orderId}];
    var data = {
        order_id: id,
        brand: container.children("#brandPicker").get("selection"),
        has_charger: hasChargerSelection(),
        password: container.children("#devicePasswordInput").get("text"),
        device_issues: container.children("#deviceIssuesInput").get("text")
    };

    callApi(rootAPI.device, data, progress);
  }

  function addStatusToOrder(orderId, progress) {
    var id = [{id: orderId}];
    var data = {
        order_id: id,
        // initial order status, not need to be dynamic.
        status: "Order Taken",
        date: getDate(),
    };

    callApi(rootAPI.status, data, progress);
  }

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

  function createSubmitStatusPage(){
    if(isOrderValid()){
      var page = tabris.create("Page", {
        title: "sending",
        topLevel: true,
        id: "statusPage"
      });

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

      // setTimeout(function(){
      //   progressBar.set("selection", 100)
      // }, 500);

      //Need to create the initial data to optain an order id
      // var data = initialOrderData();

      if(db.object.tempOderData === undefined) {
        db('tempOderData').push({
          id: null,
          order: null,
          tech: null,
          customer: null,
          device: null,
        });
      } else {
        db('tempOderData').remove()

        db('tempOderData').push({
          id: null,
          order: null,
          tech: isLogged ? db.object.user[0].id : null,
          customer: null,
          device: null,
        });
      }

      var order = {
        quoted_price: 99,
        instanceName: "bsrapp",
        className: "customer"
      };

      var customer = {
        name: "test customer",
        phone_number: "123456789",
        instanceName: "bsrapp",
        className: "customer"
      };

      var device = {
        type: "laptop",
        brand: "apple",
        password: "customer",
        charger: true,
        instanceName: "bsrapp",
        className: "customer"
      };

      DataObject.please().create(customer).then(function(customer) {
        db('tempOderData')
          .chain()
          .find({ customer: null })
          .assign({ customer: customer.id})
          .value()
          progressBar.set("selection", 100)
      }).catch(function(error){
        console.log(error);
      });

      DataObject.please().create(device).then(function(device) {
        db('tempOderData')
          .chain()
          .find({ device: null })
          .assign({ device: device.id})
          .value()
          progressBar.set("selection", 100)
      }).catch(function(error){
        console.log(error);
      });

      DataObject.please().create(order).then(function(order) {
        db('tempOderData')
          .chain()
          .find({ order: null })
          .assign({ order: order.id})
          .value()
          progressBar.set("selection", 200)
      }).catch(function(error){
        console.log(error);
      });

      setTimeout(function(){
        console.log(db.object.tempOderData[0])
      }, 500)

      // fetch(rootAPI.orders, {
      //     method: "POST",
      //     headers: {
      //         'Accept': 'application/json',
      //         'Content-Type': 'application/json',
      //         'Authorization': "Basic " + key
      //     },
      //     body: JSON.stringify(data)
      // }).then(function (response) {
      //     console.log(response.status);
      //     progressBar.set("selection", 200);
      //     return response.json();
      // }).then(function(json){
      //  //Once the order has been created, now is time to add the rest of the order data
      //   addCustomerToOrder(json.id, progressBar);
      //   addDeviceToOrder(json.id, progressBar);
      //   addStatusToOrder(json.id, progressBar);
      // }).catch(function (err) {
      //     console.log(err);
      // });
    };
  }

  page.open();
}
