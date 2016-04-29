var orderForm = require('./order_form')
var Syncano = require('./syncano');
var low = require('./lowdb')
var db = low('db', { storage: low.localStorage })
var connection = Syncano({apiKey: "bae21c7ba933f99dcc2782b27f3676ffdb82b539"});

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
      username: user.get('text'),
      password: password.get('text')
    }

    connection.User.please().login({instanceName: 'bsrapp'}, {username: input.username, password: input.password})
      .then(function(response) {
        if(localStorage.getItem('userInfo')){
          localStorage.removeItem('userInfo')
        }

        localStorage.setItem('userInfo', JSON.stringify(input));

        db('loggedUser').push(response);

        var headerContainer = tabris.ui.find("#Login");
        var userInfo = tabris.ui.find("#user-info");
        var userName = tabris.ui.find("#user-name");
        var orderContainer = tabris.ui.find('#orderContainer')

        orderContainer.off().on('tap', function(){
            orderForm();
        })

        headerContainer.animate({
          transform: {
            translationX: window.screen.width - 109
          }
        }, {
          duration: 100,
          easing: "ease-out"
        });

        userInfo.set('opacity', 1)
        userName.set('text', 'Tech: ' + response.username)
        // tabris.app.reload()
        page.close();
      })
      .catch(function(error) {
        console.log(error);
      });
  }).appendTo(container);

  page.open()
};
