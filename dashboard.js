var rootAPI = require("./rootAPI");
var login = require('./login');

function initDashboard(tab) {
  var page = new tabris.ScrollView({
    left: 0, right: 0, top: 0, bottom: 0,
  }).appendTo(tab);

  var image = new tabris.ImageView({
    id: "tech",
    image: {src: "images/tech_profile.png", scale: 3},
    layoutData: {top: 8, left: 8 },
    width: 93
  }).appendTo(page);

  var userContainer = new tabris.Composite({
    id: 'user-info',
    opacity: 0,
    layoutData: {left: 109, right: 0, top: 8},
    height: 93,
  }).appendTo(page);

  new tabris.TextView({
    text: 'Fredy Mendez',
    alignment: 'center',
    layoutData: {top: 8, left: 25, right: 25},
    font: '16px'
  }).appendTo(userContainer);

  new tabris.TextView({
    text: 'Location: Edison',
    alignment: 'center',
    layoutData: {top: ["prev()", 8], left:25, right: 25},
    font: '16px'
  }).appendTo(userContainer);

  new tabris.Button({
    text: "LOGOUT",
    font: '12px',
    layoutData: {top: ['prev()', 8], bottom: 0, left: 25, right: 25}
  }).on('select', function() {
    this.parent().animate({
      opacity: 0
    }, {
      duration: 100,
      easing: "ease-out"
    });
    var headerContainer = tabris.ui.find("#Login");
    headerContainer.animate({
      transform: {
        translationX: 0
      }
    }, {
      duration: 200,
      easing: "ease-out"
    });
  }).appendTo(userContainer);

  var headerContainer = new tabris.Composite({
    id: 'Login',
    layoutData: {left: 109, right: 0, top: 8},
    height: 93,
    opacity: 1
  }).appendTo(page);

  new tabris.TextView({
    text: "LOGIN",
    textColor: "#fff",
    background: "#282C37",
    layoutData: {left: "10%", right: "10%", top: 20, bottom: 20},
    alignment: "center"
  }).on('tap', function(){
    login();
  }).appendTo(headerContainer);

  var orderContainer = new tabris.Composite({
    layoutData: {top: ['prev()', 30], left: 0, right: 0},
  }).appendTo(page);

  var orderContainerItemFirst = new tabris.Composite({
    layoutData: {top: 21, left: '5%', right: '53%'},
    background: '#03A6FF',
    height: 150,
    cornerRadius: 3
  }).appendTo(orderContainer);

  new tabris.ImageView({
    image: {src: "images/new_order.png", scale: 3},
    centerY: -10,
    centerX: 0
  }).appendTo(orderContainerItemFirst);

  new tabris.TextView({
    text: 'New Order',
    bottom: 6,
    centerX: 0,
    font: '17px',
    textColor: '#fff'
  }).appendTo(orderContainerItemFirst);

  var orderContainerItemSecond = new tabris.Composite({
    layoutData: {top: 21, left: '53%', right: '5%'},
    background: '#3AC569',
    height: 150,
    cornerRadius: 3
  }).appendTo(orderContainer);

  new tabris.TextView({
    text: '4',
    textColor: '#fff',
    backgroundImage: {
      src: 'images/badge.png',
      scale: 3
    },
    top: 0,
    right: '20%',
    width: 43,
    height: 43,
    alignment: "center",
    visible: true
  }).appendTo(orderContainer);

  new tabris.ImageView({
    image: {src: "images/ready.png", scale: 3},
    centerY: -10,
    centerX: 0
  }).appendTo(orderContainerItemSecond);

  new tabris.TextView({
    text: 'Pick up Ready',
    bottom: 6,
    centerX: 0,
    font: '17px',
    textColor: '#fff'
  }).appendTo(orderContainerItemSecond);

  var deliveryContainer = new tabris.Composite({
    layoutData: {top: ['prev()', 30], left: 0, right: 0},
  }).appendTo(page);

  var deliveryContainerItemFirst = new tabris.Composite({
    layoutData: {top: 21, left: '5%', right: '53%'},
    background: '#DDDFE6',
    height: 150,
    cornerRadius: 3
  }).appendTo(deliveryContainer);

  new tabris.ImageView({
    image: {src: "images/received.png", scale: 3},
    centerY: -10,
    centerX: 0
  }).appendTo(deliveryContainerItemFirst);

  new tabris.TextView({
    text: 'Received',
    bottom: 6,
    centerX: 0,
    font: '17px',
    textColor: '#000'
  }).appendTo(deliveryContainerItemFirst);

  var deliveryContainerItemSecond = new tabris.Composite({
    layoutData: {top: 21, left: '53%', right: '5%'},
    background: '#252C41',
    height: 150,
    cornerRadius: 3
  }).appendTo(deliveryContainer);

  new tabris.TextView({
    text: '1',
    textColor: '#fff',
    backgroundImage: {src: 'images/badge.png', scale: 3},
    top: 0,
    right: '20%',
    width: 43,
    height: 43,
    alignment: "center",
    visible: true
  }).appendTo(deliveryContainer);

  new tabris.ImageView({
    image: {src: "images/shipping.png", scale: 3},
    centerY: 0,
    centerX: 0
  }).appendTo(deliveryContainerItemSecond);

  new tabris.TextView({
    text: 'Shipping',
    bottom: 6,
    centerX: 0,
    font: '17px',
    textColor: '#fff'
  }).appendTo(deliveryContainerItemSecond);
}

module.exports = initDashboard;
