
var fake = require("./fake")
var Syncano = require('./syncano');
var db = require('./localStorage')

module.exports = function () {
  if(db.object.tempOderData === undefined) {
    db('tempFormData').push({
      name: '',
      phone: '',
      password: '',
      price: '',
      issues: '',
      brand: '',
      charger: false
    });
  } else {
    db('tempFormData').remove()

    db('tempFormData').push({
      name: '',
      phone: '',
      password: '',
      price: '',
      issues: '',
      brand: '',
      charger: false
    });
  }

  var page = new tabris.Page({
    title: "Order"
  });

  var container = tabris.create("ScrollView", {
    id: '#formContainer',
    layoutData: {left: 0, right: 0, top: 0, bottom: 49},
  }).appendTo(page);

  tabris.create("TextView", {
    id: "customerNameLabel",
    alignment: "left",
    text: "Customer Name:"
  }).appendTo(container);

  tabris.create("TextInput", {
    id: "customerNameInput",
    text: '',
    message: "Customer Name"
  }).on('focus', function() {
    db('tempFormData')
      .chain()
      .find({ name: this.get('text') })
      .assign({ name: ''})
      .value()
  }).on('blur', function() {
    db('tempFormData')
      .chain()
      .find({ name: '' })
      .assign({ name: this.get('text')})
      .value()
  }).appendTo(container);

  tabris.create("TextView", {
    id: "phoneNumberLabel",
    text: "Phone #:"
  }).appendTo(container);

  tabris.create("TextInput", {
    id: "phoneNumberInput",
    text: fake.createNumber(),
    keyboard: "phone"
  }).on('focus', function() {
    db('tempFormData')
      .chain()
      .find({ phone: this.get('text') })
      .assign({phone: ''})
      .value()
  }).on('blur', function() {
    db('tempFormData')
      .chain()
      .find({ phone: '' })
      .assign({ phone: this.get('text')})
      .value()
  }).appendTo(container);

  tabris.create("TextView", {
    id: "devicePasswordLabel",
    text: "Device Password"
  }).appendTo(container);

  tabris.create("TextInput", {
    id: "devicePasswordInput",
    message: "Device Password",
    keyboard: "numbersAndPunctuation"
  }).on('focus', function() {
    db('tempFormData')
      .chain()
      .find({ password: this.get('text') })
      .assign({ password: ''})
      .value()
  }).on('blur', function() {
    db('tempFormData')
      .chain()
      .find({ password: '' })
      .assign({ password: this.get('text')})
      .value()
  }).appendTo(container);

  tabris.create("TextView", {
    id: "quotedPriceLabel",
    text: "Quoted Price"
  }).appendTo(container);

  tabris.create("TextInput", {
    id: "quotedPriceInput",
    message: "Quoted Price",
    keyboard: "number"
  }).on('focus', function() {
    db('tempFormData')
      .chain()
      .find({ price: this.get('text') })
      .assign({ price: ''})
      .value()
  }).on('blur', function() {
    db('tempFormData')
      .chain()
      .find({ price: '' })
      .assign({ price: this.get('text')})
      .value()
  }).appendTo(container);

  tabris.create("TextView", {
    id: "deviceIssuesLabel",
    text: "Describe Issues"
  }).appendTo(container);

  tabris.create("TextInput", {
    id: "deviceIssuesInput",
    message: "Describe Issues"
  }).on('focus', function() {
    db('tempFormData')
      .chain()
      .find({ issues: this.get('text') })
      .assign({ issues: ''})
      .value()
  }).on('blur', function() {
    db('tempFormData')
      .chain()
      .find({ issues: '' })
      .assign({ issues: this.get('text')})
      .value()
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

  var orderData = function(){

    var data = {
      quoted_price: parseInt(container.children("#quotedPriceInput").get("text")),
      instanceName: "bsrapp",
      className: "order"
    }

    return data
  }

  function createSubmitStatusPage(){
    console.log(db('tempFormData').first().name)
    var isLogged = false;

    if(db('loggedUser').find()){
      var USER_KEY = db('loggedUser').first().user_key;
      var connection = Syncano({ userKey: USER_KEY, apiKey: 'bae21c7ba933f99dcc2782b27f3676ffdb82b539'});
      var DataObject = connection.DataObject;
      isLogged = true
    }

    if(isOrderValid() && isLogged){
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
        maximum: 300,
        selection: 0
      }).on("change:selection", function(progressBar, selection) {
        if(selection === 300){
          isLogged = false
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
          tech: db('loggedUser').first().id,
          customer: null,
          device: null,
        });
      } else {
        db('tempOderData').remove()

        db('tempOderData').push({
          id: null,
          order: null,
          tech: db('loggedUser').first().id,
          customer: null,
          device: null,
        });
      }

      var order = {
        quoted_price: parseInt(db('tempFormData').first().price),
        instanceName: "bsrapp",
        className: "order"
      }

      var customer = {
        name: db('tempFormData').first().name,
        phone_number: db('tempFormData').first().phone,
        instanceName: "bsrapp",
        className: "customer"
      };

      var device = {
        type: "laptop",
        brand: container.children("#brandPicker").get("selection"),
        password: db('tempFormData').first().password,
        charger: container.children("#withCharger").get("selection"),
        instanceName: "bsrapp",
        className: "device"
      };

      DataObject.please().create(order)
        .then(function(order) {
          db('tempOderData')
            .chain()
            .find({ id: null })
            .assign({ id: order.id})
            .value()
            var currentSelection = progressBar.get("selection");
            progressBar.set("selection", currentSelection + 100)
        })
        .then(function() {
          return DataObject.please().create(device).then(function(device) {
            db('tempOderData')
              .chain()
              .find({ device: null })
              .assign({ device: device.id})
              .value()
              var currentSelection = progressBar.get("selection");
              progressBar.set("selection", currentSelection + 100)
          })
        })
        .then(function() {
          return DataObject.please().create(customer).then(function(customer) {
            db('tempOderData')
              .chain()
              .find({ customer: null })
              .assign({ customer: customer.id})
              .value()
              var currentSelection = progressBar.get("selection");
              progressBar.set("selection", currentSelection + 100)
          })
        }).then(function() {
          console.log(db('tempOderData').first());
        }).catch(function(error) {
          console.log(error)
        })

    };
  }

  page.open();
}
