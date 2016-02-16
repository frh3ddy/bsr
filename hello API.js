Promise = require("promise");
require("whatwg-fetch");
var btoa = require("./btoa");

var message;

var key = btoa('key-1:wqWw2pRzOIMqlAV7gCRP');
var bookId = "56bfaf8ff7535b0300f5277d";
var baseUrl = "https://api.fieldbook.com/v1/" + bookId;

var url = baseUrl + '/orders';

var page = tabris.create("Page", {
  title: "XMLHttpRequest via fetch()",
  topLevel: true
});

tabris.create("TextView", {
  id: "firstNameLabel",
  alignment: "left",
  text: "First Name:"
}).appendTo(page);

tabris.create("TextInput", {
  id: "firstNameInput",
  message: "First Name"
}).appendTo(page);

tabris.create("TextView", {
  id: "numberLabel",
  text: "Last Name:"
}).appendTo(page);

tabris.create("TextInput", {
  id: "numberInput",
  message: "Phone Number"
}).appendTo(page);


tabris.create("Button", {
  id: "done",
  text: "Place Reservation",
  background: "#8b0000",
  layoutData: {left: 12, right: 12, top: "prev() 12"},
  textColor: "white"
}).on("select", function() {
    createTextView(this);
    // fetch(url, {
    //     method: "POST",
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json',
    //         'Authorization': "Basic " + key
    //     },
    //     body: JSON.stringify({
    //         customer: [{name: createName(), phone_number: createNumber()}]
    //     })
    // }).then(function (response) {
    //     console.log(response.status)
    // }).catch(function (err) {
    //     console.log(err)
    // });
}, {test: createName}).appendTo(page);

// fetch(url, {
//     method: "POST",
//     headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//         'Authorization': "Basic " + key
//     },
//     body: JSON.stringify({
// 		customer: [{name: "new another custimer"}]
// 	})
// }).then(function (response) {
//     console.log(response.status)
// }).catch(function (err) {
//     console.log(err)
// });

page.apply({
  "#firstNameLabel": {layoutData: {left: 10, top: 18, width: 120}},
  "#firstNameInput": {layoutData: {left: "#firstNameLabel 10", right: 10, baseline: "#firstNameLabel"}},
  "#numberLabel": {layoutData: {left: 10, top: "#firstNameLabel 18", width: 120}},
  "#numberInput": {layoutData: {left: "#numberLabel 10", right: 10, baseline: "#numberLabel"}},
});

var createTextView = function(text) {
  if(message){
    message.dispose();
  }
  
  message = tabris.create("TextView", {
    text: text.test(),
    markupEnabled: true,
    layoutData: {left: 12, right: 12, top: "prev() 12"}
  }).appendTo(page);
};

function createName() {
  return page.children("#firstNameInput").get("text");
}

function createNumber() {
  return page.children("#numberInput").get("text");
}
page.open();