/* global tabris*/

var connection = require('./authenticate')

function init (data, widget) {
  var page = new tabris.Page({
    title: data.customer.name,
    background: '#f4f5f9'
  })

  var scrollView = new tabris.ScrollView({
    layoutData: {top: 0, bottom: 0, left: 0, right: 0}
  }).appendTo(page)

  var checkmark = new tabris.ImageView({
    image: {src: 'images/checkmark.png', scale: 3},
    tintColor: '#6d819c',
    layoutData: {right: 15}
  })

  var statusText = new tabris.TextView({
    layoutData: {top: 10, left: 10},
    text: 'SELECT STATUS',
    font: '13px bold',
    textColor: '#6d819c'
  }).appendTo(scrollView)

  var statusListContainer = new tabris.Composite({
    layoutData: {top: [statusText, 10], left: 0, right: 0},
    background: '#ffffff'
  }).appendTo(scrollView)

  new tabris.TextView({
    background: '#dddfe6',
    layoutData: {top: 0, left: 0, right: 0, height: 0.5}
  }).appendTo(statusListContainer)

  createStatus('Ready to be shipped to Edison', statusListContainer)
  createStatus('Could not reach customer', statusListContainer)
  createStatus('Leave voicemail', statusListContainer)
  createStatus('Waiting for customer answer', statusListContainer)
  createStatus('Waiting for second opinion', statusListContainer)
  createStatus('Being lazy to work on it', statusListContainer)
  createStatus('Arrived at edison', statusListContainer)
  createStatus('Ordered and waiting for part', statusListContainer)

  new tabris.TextView({
    background: '#dddfe6',
    layoutData: {bottom: 0, left: 0, right: 0, height: 0.5}
  }).appendTo(statusListContainer)

  new tabris.TextView({
    layoutData: {top: ['prev()', 20], left: 10},
    text: 'CUSTOM STATUS',
    font: '13px bold',
    textColor: '#6d819c'
  }).appendTo(scrollView)

  var empty = new tabris.Composite({
    visible: false
  })

  var input = new tabris.TextInput({
    message: 'Enter custom status',
    autoCapitalize: true,
    autoCorrect: true,
    layoutData: {top: ['prev()', 10], left: '5', right: '5', height: 50}
  }).on('focus', function () {
    if (checkmark.parent()) {
      checkmark.appendTo(empty)
    }
    updateButton.set('enabled', true)
  }).appendTo(scrollView)

  new tabris.Button({
    text: 'Cancel',
    background: '#fff',
    top: ['prev()', 20],
    bottom: 20,
    left: 0,
    textColor: 'red',
    right: 0
  }).on('select', function () {
    updateButton.dispose()
    page.close()
  }).appendTo(scrollView)

  var updateButton = new tabris.Action({
    title: 'Update',
    placementPriority: 'high',
    enabled: false
  }).on('select', function () {
    if (checkmark.parent() === empty || checkmark.parent() === undefined) {
      updateStatus(input.get('text'))
    } else if (checkmark.parent()) {
      var markupText = checkmark.get('baseline').get('text')
      var markupRemoved = markupText.split(' ').filter(function (el) {
        return el !== '<br/>'
      })

      updateStatus(markupRemoved.join(' '))
    }
  })

  function createStatus (text, container) {
    new tabris.TextView({
      text: '<br/> ' + text + ' <br/>',
      markupEnabled: true,
      // background: 'blue',
      layoutData: {top: ['prev()', 5], right: 35, left: 15}
    }).on('tap', function (widget) {
      widget.animate({
        opacity: 0.2
      }, {
        repeat: 1,
        duration: 300,
        easing: 'ease-out',
        reverse: true
      })

      checkmark.appendTo(container)
      checkmark.set('baseline', widget)
      updateButton.set('enabled', true)
      input.set('text', '')
    }).appendTo(container)

    new tabris.TextView({
      background: '#dddfe6',
      layoutData: {top: ['prev()', 5], left: 15, right: 0, height: 0.5}
    }).appendTo(container)
  }

  function updateStatus (newStatus) {
    var query = {
      id: data.id,
      instanceName: 'laptopbsr',
      className: 'edison_orders'
    }

    var DataObject = null

    if (connection.DataObject() !== null) {
      DataObject = connection.DataObject()
    } else {
      connection.init()
      DataObject = connection.DataObject()
    }

    var updateObject = {
      status: newStatus
    }

    DataObject.please().update(query, updateObject).then(function (book, raw) {
      widget.set('text', newStatus)
      updateButton.dispose()
      page.close()
    })
  }

  page.on('disappear', function () {
    if (!updateButton.isDisposed()) {
      updateButton.dispose()
    }
  })

  page.open()
}

module.exports = init
