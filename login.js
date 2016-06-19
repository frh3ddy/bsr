/* global tabris */
var realTime = require('./realtime')
var h = require('./helpers')
var Syncano = require('./syncano')
var db = require('./localStorage')
var connection = Syncano({apiKey: '29dd175e36b211889ee4e794fbdb6994be305dfb'})

module.exports = function () {
  var page = new tabris.Page({
    title: 'Login'
  })

  new tabris.ImageView({
    image: {src: 'images/logo.png', scale: 3},
    centerX: 0,
    centerY: -145
  }).appendTo(page)

  var container = new tabris.Composite({
    centerY: 0,
    left: '20%',
    right: '20%'
  }).appendTo(page)

  var user = new tabris.TextInput({
    layoutData: {left: 0, right: 0, top: 0},
    height: 35,
    message: 'Enter your Username'
  }).appendTo(container)

  var password = new tabris.TextInput({
    layoutData: {left: 0, right: 0, top: ['prev()', 15]},
    message: 'Enter your Password',
    height: 35,
    type: 'password'
  }).on('accept', login).appendTo(container)

  new tabris.Button({
    text: 'LOGIN',
    left: 0,
    right: 0,
    top: ['prev()', 15]
  }).on('select', login).appendTo(container)

  function login () {
    var credentials = {
      username: user.get('text'),
      password: password.get('text')
    }

    connection.User.please().login({instanceName: 'laptopbsr'}, credentials)
      .then(function (response) {
        if (db.object.userInfo === undefined) {
          response.password = credentials.password
          db('userInfo').push(response)
        } else {
          // since there is no need to have multiple data objects, remove
          // the only object that was created previously
          response.password = credentials.password
          db('userInfo').remove()
          db('userInfo').push(response)
        }

        realTime.initPoll()
        realTime.getPoll().start()

        var headerContainer = tabris.ui.find('#Login')
        var userInfo = tabris.ui.find('#user-info')
        var userName = tabris.ui.find('#user-name')
        var userLocation = tabris.ui.find('#user-location')

        headerContainer.set('opacity', 0)
        userInfo.set('opacity', 1)
        userName.set('text', 'Tech: ' + h.capitalize(response.username))
        userLocation.set('text', 'Location: ' + response.groups[0].label)
        page.close()
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  page.open()
}
