/* global tabris */

function init (page) {
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
    text: 'Select Status',
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
  createStatus('Ready to be shipped to Edison', statusListContainer)
  createStatus('Ready to be shipped to Edison', statusListContainer)
  createStatus('Ready to be shipped to Edison', statusListContainer)
  createStatus('Ready to be shipped to Edison', statusListContainer)
  createStatus('Ready to be shipped to Edison', statusListContainer)
  createStatus('Arrived at edison', statusListContainer)
  createStatus('Ordered and waiting for part', statusListContainer)

  new tabris.TextView({
    background: '#dddfe6',
    layoutData: {bottom: 0, left: 0, right: 0, height: 0.5}
  }).appendTo(statusListContainer)

  new tabris.TextView({
    layoutData: {top: ['prev()', 20], left: 10},
    text: 'Custom Status',
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
    console.log('Cancelled')
  }).appendTo(scrollView)

  var updateButton = new tabris.Action({
    title: 'Update',
    placementPriority: 'high',
    enabled: false
  }).on('select', function () {
    if (checkmark.parent() === empty || checkmark.parent() === undefined) {
      console.log(input.get('text'))
    } else if (checkmark.parent()) {
      var markupText = checkmark.get('baseline').get('text')
      var markupRemoved = markupText.split(' ').filter(function (el) {
        return el !== '<br/>'
      })
      console.log(markupRemoved.join(' '))
    }
  })

  function createStatus (text, container, checkmark) {
    new tabris.TextView({
      text: '<br/> ' + text + ' <br/>',
      markupEnabled: true,
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
}

module.exports = init
