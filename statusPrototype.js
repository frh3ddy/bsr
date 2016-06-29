
function init (page) {

  var scrollView = new tabris.ScrollView({
    layoutData: {top: 0, bottom: 0, left: 0, right: 0}
  }).appendTo(page)

  var checkmark = new tabris.ImageView({
    image: {src: 'images/checkmark.png', scale: 3},
    tintColor: '#6d819c',
    layoutData: {right: 15, centerY: 0}
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

  createStatus('Ready to be shipped to Edison', statusListContainer, checkmark)
  createStatus('Ready to be shipped to Edison', statusListContainer, checkmark)
  createStatus('Ready to be shipped to Edison', statusListContainer, checkmark)
  createStatus('Ready to be shipped to Edison', statusListContainer, checkmark)
  createStatus('Ready to be shipped to Edison', statusListContainer, checkmark)
  createStatus('Ready to be shipped to Edison', statusListContainer, checkmark)
  createStatus('Arrived at edison', statusListContainer, checkmark)
  createStatus('Ordered and waiting for part', statusListContainer, checkmark)

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

  var cancelButton = new tabris.Button({
    text: 'Cancel',
    background: '#fff',
    top: ['prev()', 20],
    bottom: 20,
    left: 0,
    textColor: 'red',
    right: 0,
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
      console.log(checkmark.parent().children()[0].get('text'))
    }
  })

  function createStatus (text, container, checkmark) {
    var status = new tabris.Composite({
      layoutData: {top: "prev()", right: 0, left: 15}
    }).on('tap', function (widget) {
      widget.animate({
        opacity: 0.2
      }, {
        repeat: 1,
        duration: 300,
        easing: 'ease-out',
        reverse: true
      })
      checkmark.appendTo(widget)
      input.set('text', '')
    }).on('addchild', function (widget, child) {
      if (updateButton && child.type === 'ImageView') {
        updateButton.set('enabled', true)
      }
    }).appendTo(container)

    new tabris.TextView({
      text: text,
      layoutData: {top: 15, right: 35, left: 0}
    }).appendTo(status)

    new tabris.TextView({
      background: '#dddfe6',
      layoutData: {top: ["prev()", 15], left: 0, right: 0, height: 0.5}
    }).appendTo(status)
  }
}

module.exports = init
