/* global tabris */

// var ordersList = require('./orders_list')
// var dashboard = require('./dashboard.js')
var proto = require('./pricePrototype')

var page = new tabris.Page({
  title: 'Dashboard',
  topLevel: true
})

var tabFolder = new tabris.TabFolder({
  layoutData: {left: 0, top: 0, right: 0, bottom: 0},
  paging: false
}).appendTo(page)

var createTab = function (title, image, content) {
  var tab = new tabris.Tab({
    id: title,
    title: title,
    image: {src: image, scale: 3}
  }).appendTo(tabFolder)

  if (content) {
  // the content needs an argument to be the container
    content(tab)
  }
}

// createTab('Dashboard', 'images/dashboard.png', dashboard)
// createTab('Oxford', 'images/Oxford.png', ordersList)
createTab('Edison', 'images/Edison.png', proto)
createTab('Mercer', 'images/Mercer.png')

page.open()

tabFolder.on('change:selection', function (widget, tab) {
  page.set('title', tab.get('title'))
})
