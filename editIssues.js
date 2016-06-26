/* global tabris*/

var connection = require('./authenticate')

function init (data) {
  var page = new tabris.Page({
    title: 'edit'
  })
  var input = new tabris.TextInput({
    type: 'multiline',
    text: data.device.issues,
    layoutData: {top: 20, left: '10%', right: '10%', height: 100}
  }).on('input', function (widget, text) {
    if (text.length <= 0) {
      clearButton.set('enabled', false)
      updateButton.set('enabled', false)
    } else {
      clearButton.set('enabled', true)
      updateButton.set('enabled', true)
    }
  }).appendTo(page)

  var clearButton = new tabris.Button({
    text: 'Clear',
    layoutData: {top: [input, 10], left: '60%', right: '10%'},
    enabled: true
  }).on('select', function () {
    input.set('text', '')
    this.set('enabled', false)
    updateButton.set('enabled', false)
  }).appendTo(page)

  var updateButton = new tabris.Button({
    text: 'Update',
    layoutData: {top: [input, 10], left: '10%', right: '55%'},
    enabled: false
  }).on('select', function () {
    updateOrder(data, input.get('text'))
  }).appendTo(page)

  page.open()
}

function updateOrder (data, updatedIssues) {
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
    console.log(raw)
  })
}

module.exports = init
