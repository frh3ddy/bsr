Promise = require("promise");
require("whatwg-fetch");

// var btoa = require('btoa');

var bookId = '567392ee6acfd703006d8bd0';
var baseUrl = 'https://api.fieldbook.com/v1/' + bookId;

var url = baseUrl + '/clients';

// console.log(btoa('key-3:iDXxhqL7EmE-n2UVeyJw'));

var page = tabris.create("Page", {
  title: "Hello, World!",
  topLevel: true
});

var createTextView = function(text) {
  tabris.create("TextView", {
    text: text,
    markupEnabled: true,
    layoutData: {left: 12, right: 12, top: "prev() 12"}
  }).appendTo(page);
};

fetch(url, {
  headers: {
    'accept': 'application/json',
    'Authorization': 'Basic ' + 'a2V5LTM6aURYeGhxTDdFbUUtbjJVVmV5Snc='
  }
}).then(function(response) {
  return response.json();
}).then(function(json) {
  json.forEach(function(el) {
      createTextView("brand: " + el.name);
  })
});


page.open();
