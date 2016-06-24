/* global tabris */

var singleOrder = require('./single_order')
var moment = require('moment')
var db = require('./localStorage')
var connection = require('./authenticate')
var MARGIN = 12
var saved = null

var query = {
  instanceName: 'laptopbsr',
  className: 'edison_orders'
}

if (db('userInfo').first() !== undefined) {
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

    saved = DataObject.please().list(query).filter(filter).then(function (data, rawData) {
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

      return db('repairOrders').orderBy('unixDate', 'desc')
    })
    .catch(function (error) {
      console.log(error)
    })
  } else {
    saved = DataObject.please().list(query).then(function (data, rawData) {
      rawData.objects.map(function (el) {
        var order = el
        order.unixDate = parseInt(moment(el.updated_at).format('x'), 10)
        db('repairOrders').push(order)
      })
      return rawData.objects
    })
    .catch(function (error) {
      console.log(error)
    })
  }
}

function initCollectionList (items, page) {
  // console.log('inside itemco::', items)
  var data = items
  new tabris.CollectionView({
    id: 'edisonlist',
    layoutData: {left: 0, top: 0, right: 0, bottom: 0},
    items: data,
    refreshEnabled: false,
    itemHeight: 82,
    initializeCell: function (cell) {
      var divider = tabris.create('Composite', {
        background: '#d3d3d3'
      }).appendTo(cell)
      var brandImage = tabris.create('ImageView', {
        left: MARGIN, top: 6, width: 70, height: 70,
        scaleMode: 'fill'
      }).appendTo(cell)
      var customerName = tabris.create('TextView', {
        maxLines: 2,
        font: '16px',
        markupEnabled: true
      }).appendTo(cell)
      var deviceStatus = tabris.create('TextView', {
        textColor: '#234'
      }).appendTo(cell)
      var dateOrdered = tabris.create('TextView', {
        alignment: 'right',
        textColor: 'green'
      }).appendTo(cell)
      cell.on('change:item', function (widget, item) {
        brandImage.set('image', 'images/' + item.device.brand.toLowerCase() + '.png')
        customerName.set('text', '<strong>' + item.customer.name + '</strong>')
        dateOrdered.set('text', item.device.brand)
        deviceStatus.set('text', item.status)
      }).on('resize', function () {
        var cellWidth = cell.get('bounds').width
        var textWidth = 200
        customerName.set({left: 104, top: 6, width: cellWidth - 104})
        deviceStatus.set({top: 54, left: 104, height: 20, width: cellWidth - 104 - MARGIN})
        divider.set({top: 81, left: 104, height: 0.5, width: cellWidth - 104})
        dateOrdered.set({top: 20, left: cellWidth - textWidth - MARGIN, height: 20, width: textWidth})
      })
    }
  }).on('refresh', function () {

  }).on('select', function (target, value) {
    singleOrder(value)
  }).appendTo(page)
}

module.exports = function (page) {
  if (db('userInfo').first() !== undefined) {
    saved.then(function (data) {
      initCollectionList(data, page)
    })
  } else {
    initCollectionList([], page)
  }
}
