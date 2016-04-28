var ordersList = require("./orders_list");
var orderForm = require("./order_form");
var dashboard = require("./dashboard.js");
var Syncano = require('./syncano');
var connection = Syncano({ apiKey: '5d8c314a9d3642d75466d780c433ef563a8cc98c'});
var DataEndpoint = connection.DataEndpoint;

DataEndpoint.please().fetchData({name: 'edison_orders', instanceName: 'bsrapp'})
.then(function(dataObjects) {
  dataObjects.objects.forEach(function (el) {
  });
})
.catch(function(error) {
  console.log(error)
});
var low = require('./lowdb')

var db = low('db', { storage: low.localStorage })
// db('users').push({ name: 'typicode' })

// console.log(db('user').find({ name: 'typicode' }))

var page = new tabris.Page({
  title: "Dashboard",
  topLevel: true
});

var tabFolder = new tabris.TabFolder({
  layoutData: {left: 0, top: 0, right: 0, bottom: 0},
  paging: false
}).appendTo(page);

var createTab = function(title, image, content) {
  var tab = new tabris.Tab({
    id: title,
    title: title,
    image: {src: image, scale: 3}
  }).appendTo(tabFolder);

  if(content){
    //the content need an argument to be the container
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
