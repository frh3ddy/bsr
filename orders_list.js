/* global tabris */

var Syncano = require('./syncano')
var singleOrder = require('./single_order')
var db = require('./localStorage')
var MARGIN = 12

var connection = Syncano({apiKey: '5d8c314a9d3642d75466d780c433ef563a8cc98c'})
var DataObject = connection.DataObject

var query = {
  instanceName: 'laptopbsr',
  className: 'edison_orders'
}

var ready = DataObject.please().list(query).then(function (data, rawData) {
  if (db('edisonPendingOrders').find()) {
    rawData.objects.forEach(function (el) {
      var findIt = db('edisonPendingOrders').find({id: el.id})
      if (findIt) {
        db('edisonPendingOrders')
          .chain()
          .find({id: el.id})
          .assign(el)
          .value()
      } else {
        db('edisonPendingOrders').push(el)
      }
    })
    return true
  } else {
    rawData.objects.forEach(function (el) {
      db('edisonPendingOrders').push(el)
    })
  }

  return true
})
.catch(function (error) {
  console.log(error)
})

module.exports = function (page) {
  ready.then(function () {
    var data = db('edisonPendingOrders').orderBy('id', 'desc')
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
      // var widget = this
      // setTimeout(function () {
      //   widget.set('refreshIndicator', false)
      // }, 800)
    }).on('select', function (target, value) {
      singleOrder(value)
    }).appendTo(page)
  })
}
