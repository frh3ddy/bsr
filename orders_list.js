/* global tabris */

var singleOrder = require('./single_order')
var moment = require('moment')
var h = require('./helpers')
var db = require('./localStorage')
var connection = require('./authenticate')
var MARGIN = 12

if (db('userInfo').first() !== undefined) {
  var DataObject = null
  if (connection.DataObject() !== null) {
    DataObject = connection.DataObject()
  } else {
    connection.init()
    DataObject = connection.DataObject()
  }

  var query = {
    instanceName: 'laptopbsr',
    className: 'edison_orders'
  }

  var saved = DataObject.please().list(query).then(function (data, rawData) {
    if (db('repairOrders').find()) {
      var orders = db('repairOrders').orderBy('id', 'desc')
      var recentUpdated = orders.map(function (el) {
        return el.unixDate
      })

      console.log(h.getMax(recentUpdated))
      // tete.forEach(function (el) {
      //   console.log('jju' , el)
      // })
      return rawData.objects
    } else {
      rawData.objects.map(function (el) {
        var order = el
        order.unixDate = parseInt(moment(el.updated_at).format('x'), 10)
        db('repairOrders').push(order)
      })

      return rawData.objects
    }
    // if (db('edisonPendingOrders').find()) {
    //   rawData.objects.forEach(function (el) {
    //     var findIt = db('edisonPendingOrders').find({id: el.id})
    //     if (findIt) {
    //       db('edisonPendingOrders')
    //         .chain()
    //         .find({id: el.id})
    //         .assign(el)
    //         .value()
    //     } else {
    //       db('edisonPendingOrders').push(el)
    //     }
    //   })
    // } else {
    //   rawData.objects.forEach(function (el) {
    //     db('edisonPendingOrders').push(el)
    //   })
    // }
  })
  .catch(function (error) {
    console.log(error)
  })
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
