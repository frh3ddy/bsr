
var fake = require("./fake")
var Syncano = require('./syncano');
var db = require('./localStorage')

module.exports = function () {
  if(db.object.tempFormData === undefined) {
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
  }).on('blur', function() {
    var oldValue = db('tempFormData').first().name
    db('tempFormData')
      .chain()
      .find({ name: oldValue })
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
  }).on('blur', function() {
    var oldValue = db('tempFormData').first().phone
    db('tempFormData')
      .chain()
      .find({ phone: oldValue })
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
  }).on('blur', function() {
    var oldValue = db('tempFormData').first().password
    db('tempFormData')
      .chain()
      .find({ password: oldValue })
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
  }).on('blur', function() {
    var oldValue = db('tempFormData').first().price
    db('tempFormData')
      .chain()
      .find({ price: oldValue })
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
  }).on('blur', function() {
    var oldValue = db('tempFormData').first().issues
    db('tempFormData')
      .chain()
      .find({ issues: oldValue })
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
  }).on('change:selection', function(widget, selection) {
    var oldValue = db('tempFormData').first().brand
    db('tempFormData')
      .chain()
      .find({ brand: oldValue })
      .assign({ brand: selection})
      .value()
  }).appendTo(container);

  tabris.create("TextView", {
    id: "hasChargerLabel",
    text: "With Charger:"
  }).appendTo(container);

  tabris.create("RadioButton", {
    id: "withCharger",
    text: "YES"
  }).on('change:selection', function(widget, selection) {
    var oldValue = db('tempFormData').first().charger
    db('tempFormData')
      .chain()
      .find({ charger: oldValue })
      .assign({ charger: selection})
      .value()
  }).appendTo(container);

  tabris.create("RadioButton", {
    id: "withOutCharger",
    text: "NO"
  }).appendTo(container);

  tabris.create("Button", {
    id: "sendButton",
    text: "Send Order",
  }).on("select", modalWindow).appendTo(container);


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

  function modalWindow() {
    var overlayBackGround = new tabris.Composite({
      height: window.screen.height,
      width: window.screen.width,
      background: '#000',
      opacity: 0
    }).appendTo(page)

    var modal = new tabris.Composite({
      layoutData: {left: '20%', right: '20%'},
      top: -200,
      cornerRadius: 5,
      height: 200,
      background: '#fff',
    }).appendTo(page)

    var dataObject = authenticate()
    var validOrder = isOrderValid()

    if(validOrder){
      var progressBar = initializeProgressBar(modal);
      initializeTemporaryData()
      showModal()
    }

    function showModal() {
      setTimeout(function() {
        submitOrder(progressBar, dataObject)
      }, 600)
      overlayBackGround.animate({
        opacity: .8
      },{
        duration: 400,
        easing: "ease-in-out",
      })

      overlayBackGround.on('animationstart',function(){
        tabris.ui.set({toolbarVisible: false})
      })

      modal.animate({
        transform: {
        translationY: window.screen.height/1.75,
        }
      },{
        delay: 400,
        duration: 200,
        easing: "ease-in-out",
      })

      // modal.on('animationend', function() {
      //   submitOrder(progressBar, dataObject)
      // })
    }

  }

  function authenticate() {
    var USER_KEY = db('userInfo').first().user_key;
    var connection = Syncano({ userKey: USER_KEY, apiKey: 'bae21c7ba933f99dcc2782b27f3676ffdb82b539'});
    var DataObject = connection.DataObject;

    return DataObject;
  }

  function initializeTemporaryData() {
    if(db.object.tempOderData === undefined) {
      db('tempOderData').push({
        order: null,
        tech: db('loggedUser').first().id,
        customer: null,
        device: null,
      });
    } else {
      //since there no need to have multiple data objects, need to remove
      //the only object that was created previously
      db('tempOderData').remove()

      db('tempOderData').push({
        order: null,
        tech: db('loggedUser').first().id,
        customer: null,
        device: null,
      });
    }

    return null
  }

  function initializeProgressBar(parent) {
    var buttonClose = new tabris.TextView({
      text: "X Close",
      alignment: 'center',
      textColor: '#fff',
      layoutData: {right: 0, left: 0},
      opacity: 0,
      bottom: -50,
      height: 50,
      background: '#3ac569'
    }).on('tap', function () {
      closePage()
    })

    var checkImage = new tabris.ImageView({
      image: {src: 'images/check.png', scale: 3},
      top:39,
      height: 72,
      width: 72,
      centerX: 0
    })

    var sendingOrder = tabris.create("TextView", {
      text: "Sending Order......",
      layoutData: {centerX: 0, centerY: -30},
    }).appendTo(parent);

    var progressBar = tabris.create("ProgressBar",{
      layoutData: {left: 15, right: 15, centerY: 0},
      maximum: 400,
      selection: 0
    }).on("change:selection", function(progressBar, selection) {
      if(selection === 400){
        var edison = tabris.ui.find("#edisonlist");
        setTimeout(showCloseButton, 600)
      }
    }).appendTo(parent);

    function showCloseButton() {
      sendingOrder.animate({
        transform: {
        translationY: -105,
        }
      },{
        duration: 400,
        easing: "ease-in-out",
      })

      progressBar.animate({
        transform: {
        translationY: 105,
        }
      },{
        duration: 400,
        easing: "ease-in-out",
      })

      sendingOrder.on('animationend', function(){
        checkImage.appendTo(parent)
        buttonClose.appendTo(parent)
        buttonClose.animate({
          opacity: 1,
          transform: {
          translationY: -50,
          }
        },{
          duration: 400,
          easing: "ease-in-out",
        })
      })
    }

    function closePage() {
      parent.animate({
        transform: {
        translationY: -(window.screen.height/1.75),
        }
      },{
        duration: 300,
        easing: "ease-in-out",
      })

      parent.on('animationend', function(){
        tabris.ui.set({toolbarVisible: true})
        setTimeout(function() {page.close()}, 150)
      })
    }

    return progressBar
  }

  function submitOrder(progressBar, DataObject) {
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
      brand: db('tempFormData').first().brand,
      password: db('tempFormData').first().password,
      issues: db('tempFormData').first().issues,
      status: 'Order Taken',
      with_charger: db('tempFormData').first().charger,
      instanceName: "bsrapp",
      className: "device"
    };

    DataObject.please().create(order)
      .then(function(order) {
        db('tempOderData')
          .chain()
          .find({ order: null })
          .assign({ order: order.id})
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
        var edison_store_order = db('tempOderData').first()
        edison_store_order.instanceName = 'bsrapp'
        edison_store_order.className = 'edison_store'
        return DataObject.please().create(edison_store_order).then(function(edison_store_order) {
          var currentSelection = progressBar.get("selection");
          progressBar.set("selection", currentSelection + 100)
        })
      }).catch(function(error) {
        console.log(error)
      })
  }

  page.open();
}
