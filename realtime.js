/* global tabris */

var Syncano = require('./syncano')
var db = require('./localStorage')
var poll = null
var Channel = null

function initPoll () {
  var USER_KEY = db('userInfo').first().user_key
  var group = db('userInfo').first().groups[0].label
  var API_KEY = '29dd175e36b211889ee4e794fbdb6994be305dfb'

  var query = {
    name: group,
    instanceName: 'laptopbsr'
  }

  var connection = Syncano({userKey: USER_KEY, apiKey: API_KEY, defaults: query})

  Channel = connection.Channel

  poll = Channel.please().poll(query)

  console.log('typeof::', typeof poll)

  poll.on('start', function () {
    console.log('poll::start')
  })
  //
  poll.on('stop', function () {
    console.log('poll::stop')
  })

  // poll.on('message', function (message) {
  //   console.log('poll::message', message)
  // })

  // poll.on('custom', function (message) {
  //   console.log('poll::custom', message)
  // })

  poll.on('create', function (data) {
    if (db('check').first() === undefined) {
      saveData(data.payload)
    } else {
      db('check').remove()
    }
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
}

function getPoll () {
  return poll
}

function getChannel () {
  return Channel
}

function saveData (data) {
  db('check').push({})
  var collectionView = tabris.ui.find('#edisonlist')[0]
  collectionView.insert([data], 0)
  collectionView.reveal(0)
}

module.exports = {
  getPoll: getPoll,
  initPoll: initPoll,
  Channel: getChannel
}
