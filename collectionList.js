/* global tabris */

var moment = require('moment')
var db = require('./localStorage')
var connection = require('./authenticate')

var query = {
  instanceName: 'laptopbsr',
  className: 'edison_orders'
}

function initCollectionData () {
  var DataObject = null
  if (connection.DataObject() !== null) {
    DataObject = connection.DataObject()
  } else {
    connection.init()
    DataObject = connection.DataObject()
  }

  if (db('repairOrders').find() && db('repairOrders').size() > 0) {
    // Need just the last one
    var order = db('repairOrders').orderBy('unixDate', 'asc').pop()

    var filter = {'updated_at': {'_gt': order.updated_at}}

    DataObject.please().list(query).filter(filter).then(function (data, rawData) {
      if (rawData.objects.length > 0) {
        rawData.objects.forEach(function (el) {
          var findIt = db('repairOrders').find({id: el.id})
          if (findIt) {
            db('repairOrders')
            .chain()
            .find({id: el.id})
            .assign(el)
            .value()
          } else {
            db('repairOrders').push(el)
          }
        })
      }
      var items = db('repairOrders').orderBy('unixDate', 'desc')
      var collectionView = tabris.ui.find('#edisonlist')[0]
      collectionView.set('items', items)

      return null
    })
    .catch(function (error) {
      console.log(error)
    })
  } else {
    DataObject.please().list(query).then(function (data, rawData) {
      rawData.objects.map(function (el) {
        var order = el
        order.unixDate = parseInt(moment(el.updated_at).format('x'), 10)
        db('repairOrders').push(order)
      })

      var items = db('repairOrders').orderBy('unixDate', 'desc')
      var collectionView = tabris.ui.find('#edisonlist')[0]
      collectionView.set('items', items)

      return null
    })
    .catch(function (error) {
      console.log(error)
    })
  }
}

module.exports = initCollectionData
