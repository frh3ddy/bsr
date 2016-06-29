/* global tabris*/

var connection = require('./authenticate')

function init (data, widget) {
  var page = new tabris.Page({
    title: data.customer.name
  })
  var input = new tabris.TextInput({
    type: 'multiline',
    autoCapitalize: true,
    autoCorrect: true,
    text: data.device.issues,
    layoutData: {top: 20, left: '5%', right: '20%', height: 100}
  }).on('input', function (widget, text) {
    if (text.length <= 0) {
      clearButton.set('enabled', false)
      clearButton.set('tintColor', '#d3e0f7')
      saveButton.set('enabled', false)
    } else {
      clearButton.set('enabled', true)
      saveButton.set('enabled', true)
      clearButton.set('tintColor', '#282c37')
    }
  }).appendTo(page)

  var clearButton = new tabris.ImageView({
    image: {src: 'images/clear.png', scale: 3},
    layoutData: {top: 90, left: [input, 10], right: 10},
    enabled: true,
    tintColor: '#282c37'
  }).on('tap', function () {
    input.set('text', '')
    this.set('enabled', false)
    clearButton.set('tintColor', '#d3e0f7')
    saveButton.set('enabled', false)
  }).appendTo(page)

  var saveButton = new tabris.Button({
    text: 'Save Changes',
    layoutData: {top: [input, 10], left: '10%', right: '25%'},
    enabled: false
  }).on('select', function () {
    updateOrder(data, input.get('text'), widget, page)
  }).appendTo(page)

  page.open()
}

function updateOrder (data, updatedIssues, widget, page) {
  var query = {
    id: data.id,
    instanceName: 'laptopbsr',
    className: 'edison_orders'
  }

  data.device.issues = updatedIssues

  var DataObject = null

  if (connection.DataObject() !== null) {
    DataObject = connection.DataObject()
  } else {
    connection.init()
    DataObject = connection.DataObject()
  }

  var updateObject = {
    device: data.device
  }

  DataObject.please().update(query, updateObject).then(function (book, raw) {
    widget.set('text', updatedIssues)
    page.close()
  })
}

module.exports = init
