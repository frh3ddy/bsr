var fetch = require('node-fetch');
var btoa = require("./btoa");


var key = btoa('key-1:wqWw2pRzOIMqlAV7gCRP');
var bookId = "56bfaf8ff7535b0300f5277d";
var baseUrl = "https://api.fieldbook.com/v1/" + bookId;

var ordersUrl = baseUrl + '/orders/';
var customerUrl = baseUrl + '/customer/';
var devicesUrl = baseUrl + '/devices/';
var techsUrl = baseUrl + '/techs/';
var statusesUrl = baseUrl + '/statuses/';
var storesUrl = baseUrl + '/stores/';


// var orders = [];

var orders = {
	orderList: [],
	details: {
		customers: null,
		status: false,
		devices: false,
	}
};


var iselinOrders = {}

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
  }).then(function(json) {
  	orders.orderList = json;
    // json.forEach(function(el){
    // 	var customerId = el.customer[0].id;
    // 	var deviceId = el.device[0].id;
    // 	var statusId = el.status[0].id;

    // 	el.customer = customerId;
    // 	el.device = deviceId;
    // 	el.status = statusId;

    // 	orders.orderList.push(el);
    // });
    getData(customerUrl, "customers");
	getData(statusesUrl, "status");
	getData(devicesUrl, "devices");
  }).catch(function (err) {
      console.log(err);
  });
}


function getData(endPoint, property) {
	var url = endPoint;
	  fetch(url, {
	      method: "GET",
	      headers: {
	          'Accept': 'application/json',
	          'Authorization': "Basic " + key
	      }
	  }).then(function (response) {
	      console.log("Status:: " + response.status);
	      return response.json();
	  }).then(function(json) {
	    orders.details[property] = json;
	    if(orders.details["customers"] && orders.details["status"] && orders.details["devices"]){
	    	console.log("works")
	    }
	  }).catch(function (err) {
	      console.log(err);
	  });
}

getOrdersList(ordersUrl);
