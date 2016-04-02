var btoa = require("./btoa");
var key = btoa('key-1:wqWw2pRzOIMqlAV7gCRP');
var bookId = "56bfaf8ff7535b0300f5277d";
var baseUrl = "https://api.fieldbook.com/v1/" + bookId;

var ordersUrl = baseUrl + '/orders';
var customerUrl = baseUrl + '/customer';
var devicesUrl = baseUrl + '/devices';
var techsUrl = baseUrl + '/techs';
var statusesUrl = baseUrl + '/statuses';
var storesUrl = baseUrl + '/stores';

module.exports = {
  orders: ordersUrl,
  customer: customerUrl,
  device: devicesUrl,
  tech: techsUrl,
  store: storesUrl,
  status: statusesUrl
}
