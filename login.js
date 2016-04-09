var btoa = require("./btoa");
var key = btoa('key-1:wqWw2pRzOIMqlAV7gCRP');
var rootAPI = require("./rootAPI");

module.exports = function () {
  var page = new tabris.Page({
    title: "Login"
  });

  new tabris.ImageView({
    image: {src: "images/logo.png", scale: 3},
    centerX: 0,
    centerY: -145
  }).appendTo(page);

  var container = new tabris.Composite({
    centerY: 0,
    left: '20%',
    right: '20%',
  }).appendTo(page);

  var user = new tabris.TextInput({
    layoutData: {left: 0, right: 0, top: 0},
    height: 35,
    message: "Enter your Username",
  }).appendTo(container);

  var password = new tabris.TextInput({
    layoutData: {left: 0, right: 0, top: ["prev()", 15]},
    message: "Enter your Password",
    height: 35,
    type: "password"
  }).appendTo(container);

  new tabris.Button({
    text: 'LOGIN',
    left: 0,
    right: 0,
    top: ['prev()', 15],
  }).on('select', function (){
    var input = {
      user: user.get('text'),
      password: password.get('text')
    }
    fetch(rootAPI.tech, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Authorization': "Basic " + key
        }
    }).then(function (response) {
        console.log("Status:: " + response.status);
        return response.json();
    }).then(function(json) {
      var credentials = json.filter(function(el) {
        var name = el.name.toLowerCase();
        var inputName = input.user.toLowerCase();
        var password = el.password.toString();
        var inputPassword = input.password;
        return name === inputName && password === inputPassword;
      })

      if(credentials.length){
        var headerContainer = tabris.ui.find("#Login");
        var userInfo = tabris.ui.find("#user-info");

        headerContainer.animate({
          transform: {
            translationX: window.screen.width - 109
          }
        }, {
          duration: 100,
          easing: "ease-out"
        });

        userInfo.set('opacity', 1)
        page.close();
      }
    }).catch(function (err) {
        console.log(err);
    });
  }).appendTo(container);

  page.open()
};
