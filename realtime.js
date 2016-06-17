/* global tabris */

var Syncano = require('./syncano')
var db = require('./localStorage')

var connection = Syncano({apiKey: '29dd175e36b211889ee4e794fbdb6994be305dfb'})
var DataEndpoint = connection.DataEndpoint

function getData (id) {
  db('check').push({})
  DataEndpoint.please().fetchData({name: 'realtime_edison_create', instanceName: 'bsrapp'})
  .then(function (dataObjects) {
    var data = dataObjects.objects.filter(function (el) {
      return el.id === id
    })
    var collectionView = tabris.ui.find('#edisonlist')[0]
    collectionView.insert(data, 0)
    collectionView.reveal(0)
  })
  .catch(function (error) {
    console.log('DataEndpoint::: fail', error)
  })
}

module.exports = function (userKey, apiKey, group) {
  var connection = Syncano({ userKey: userKey, apiKey: apiKey })
  var Channel = connection.Channel

  var query = {
    name: group,
    instanceName: 'laptopbsr'
  }

  var poll = Channel.please().poll(query)

  poll.on('start', function () {
    console.log('poll::start')
  })
  //
  // poll.on('stop', function () {
  //   console.log('poll::stop')
  // })

  // poll.on('message', function (message) {
  //   console.log('poll::message', message)
  // })

  // poll.on('custom', function (message) {
  //   console.log('poll::custom', message)
  // })

  poll.on('create', function (data) {
    console.log('realtime data::', data)
    // if (db('check').first() === undefined) {
    //   getData(data.payload.id)
    // } else {
    //   db('check').remove()
    // }
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
