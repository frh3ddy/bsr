var HORIZONTAL_MARGIN = 16
var VERTICAL_MARGIN = 8

var page = new tabris.Page({
  title: 'Swipe to dismiss',
  topLevel: true
})

var items = [
  {title: 'Up for lunch?', sender: 'John Smith', time: '11:35'},
  {title: 'JavaScript for mobile applications', sender: 'JavaScript Newsletter', time: '08:03'},
  {title: 'This is just a spam message', sender: 'Spammer', time: '04:32'},
  {title: 'CoolGrocery Discount Newsletter', sender: 'Local CoolGrocery', time: 'yesterday'},
  {title: 'Cinema this weekend?', sender: 'Robert J. Schmidt', time: 'yesterday'},
  {title: 'Coffee Club Newsletter', sender: 'Coffee Club', time: 'yesterday'},
  {title: 'Fraud mail', sender: 'Unsuspicious Jack', time: 'yesterday'}
]

var collectionView = new tabris.CollectionView({
  layoutData: {left: 0, right: 0, top: 0, bottom: 0},
  itemHeight: 64,
  items: items,
  initializeCell: function (cell) {
    cell.set('background', '#d0d0d0')
    var container = new tabris.Composite({
      background: 'white',
      layoutData: {left: 0, top: 0, bottom: 0, right: 0}
    }).on('pan:left', function (widget, event) {
      handlePan(event, container)
    }).on('pan:right', function (widget, event) {
      animateCancel(event, widget)
    }).on('tap', function (widget, event) {
      animateCancel(event, widget)
    }).appendTo(cell)
    var senderView = new tabris.TextView({
      font: 'bold 18px',
      layoutData: {top: VERTICAL_MARGIN, left: HORIZONTAL_MARGIN}
    }).appendTo(container)
    var titleView = new tabris.TextView({
      layoutData: {bottom: VERTICAL_MARGIN, left: HORIZONTAL_MARGIN}
    }).appendTo(container)
    var timeView = new tabris.TextView({
      textColor: '#b8b8b8',
      layoutData: {top: VERTICAL_MARGIN, right: HORIZONTAL_MARGIN}
    }).appendTo(container)
    new tabris.Composite({
      background: '#b8b8b8',
      layoutData: {left: 0, bottom: 0, right: 0, height: 1}
    }).appendTo(cell)
    cell.on('change:item', function (widget, message) {
      container.set({transform: {}, message: message})
      senderView.set('text', message.sender)
      titleView.set('text', message.title)
      timeView.set('text', message.time)
    })
  }
}).appendTo(page)

function handlePan (event, container) {
  // console.log(event.translation.x)
  var half = container.get('bounds').width / 2
  if (event.translation.x > -half) {
    container.set('transform', {translationX: event.translation.x})
  } else {
    container.set('transform', {translationX: event.translation.x + .60})
  }

  if (event.state === 'end') {
    handlePanFinished(event, container)
  }
}

function handlePanFinished (event, container) {
  var beyondCenter = Math.abs(event.translation.x) > container.get('bounds').width / 2
  var fling = Math.abs(event.velocity.x) > 200
  var sameDirection = sign(event.velocity.x) === sign(event.translation.x)
  // When swiped beyond the center, trigger dismiss if flinged in the same direction or let go.
  // Otherwise, detect a dismiss only if flinged in the same direction.
  var dismiss = beyondCenter ? sameDirection || !fling : sameDirection && fling
  if (dismiss) {
    animateDismiss(event, container)
  } else {
    animateCancel(event, container)
  }
}

function animateDismiss (event, container) {
  var bounds = container.get('bounds')
  container.once('animationend', function () {
    // collectionView.remove(container.parent().get('itemIndex'))
  }).animate({
    transform: {translationX: (-bounds.width / 2)}
  }, {
    duration: 200,
    easing: 'ease-out'
  })
}

function animateCancel (event, container) {
  container.animate({transform: {translationX: 0}}, {duration: 200, easing: 'ease-out'})
}

function sign (number) {
  return number ? number < 0 ? -1 : 1 : 0
}

page.open()

/* global tabris */

// var ordersList = require('./orders_list')
// var dashboard = require('./dashboard.js')
// var proto = require('./pricePrototype')

// var page = new tabris.Page({
//   title: 'Dashboard',
//   topLevel: true
// })
//
// var tabFolder = new tabris.TabFolder({
//   layoutData: {left: 0, top: 0, right: 0, bottom: 0},
//   paging: false
// }).appendTo(page)
//
// var createTab = function (title, image, content) {
//   var tab = new tabris.Tab({
//     id: title,
//     title: title,
//     image: {src: image, scale: 3}
//   }).appendTo(tabFolder)
//
//   if (content) {
  // the content needs an argument to be the container
//     content(tab)
//   }
// }

// createTab('Dashboard', 'images/dashboard.png', dashboard)
// createTab('Oxford', 'images/Oxford.png', ordersList)
// createTab('Edison', 'images/Edison.png', proto)
// createTab('Mercer', 'images/Mercer.png')
//
// page.open()
//
// tabFolder.on('change:selection', function (widget, tab) {
//   page.set('title', tab.get('title'))
// })
