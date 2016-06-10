/* global tabris */

var Syncano = require('./syncano')

module.exports = function (userKey, apiKey, group) {
  var connection = Syncano({ userKey: userKey, apiKey: apiKey })
  var Channel = connection.Channel

  var query = {
    name: group,
    instanceName: 'bsrapp'
  }

  var poll = Channel.please().poll(query)

  poll.on('start', function () {
    console.log('poll::start')
  })

  poll.on('stop', function () {
    console.log('poll::stop')
  })

  poll.on('message', function (message) {
    console.log('poll::message', message)
  })

  poll.on('custom', function (message) {
    console.log('poll::custom', message)
  })

  poll.on('create', function (data) {
    console.log('poll::create', data)
  })

  poll.on('delete', function (data) {
    console.log('poll::delete', data)
  })

  poll.on('update', function (data) {
    console.log('update::', data)
    // var items = tabris.ui.find('#edisonlist')[0].get('items')
    // var Collection = {
    //   update: function (i) {
    //     items[1] = data
    //   }
    // }
  })

  poll.on('error', function (error) {
    console.log('poll::error', error)
  })

  return poll
}
