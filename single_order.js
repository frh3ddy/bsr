/* global tabris */

var add = require('./single_order_helpers')
var moment = require('moment')
var MARGINLEFT = 10

function orderPage (order) {
  var page = tabris.create('Page', {
    title: 'Order ' + order.id
  })

  var orderInfoContainer = tabris.create('ScrollView', {
    layoutData: {left: 0, right: 0, top: 0, bottom: 0},
    background: '#f4f5f9'
  }).appendTo(page)

  var customerHeaderText = tabris.create('TextView', {
    text: 'CUSTOMER INFORMATION',
    font: '13px bold',
    textColor: '#6d819c',
    layoutData: {left: MARGINLEFT, top: 20},
    markupEnabled: true
  }).appendTo(orderInfoContainer)

  var customerInfoSection = tabris.create('Composite', {
    background: '#fff',
    layoutData: {top: [customerHeaderText, 5], left: 0, right: 0}
  }).appendTo(orderInfoContainer)

  add.line({parent: customerInfoSection, alignment: 'top'})

  var customerNameLabel = tabris.create('TextView', {
    text: 'Name',
    font: '11px',
    textColor: '#6E7783',
    layoutData: {top: 6, left: MARGINLEFT, right: 0}
  }).appendTo(customerInfoSection)

  var customerNameText = tabris.create('TextView', {
    font: '16px',
    textColor: '#252c41',
    text: order.customer.name,
    layoutData: {top: [customerNameLabel, 6], left: MARGINLEFT, right: 0}
  }).appendTo(customerInfoSection)

  add.line({parent: customerInfoSection})

  var smsIcon = tabris.create('ImageView', {
    image: {src: 'images/smsIcon.png', scale: 3},
    highlightOnTouch: true,
    layoutData: {top: [customerNameText, 16], right: 16}
  }).appendTo(customerInfoSection)

  tabris.create('ImageView', {
    highlightOnTouch: true,
    image: {src: 'images/iconCall.png', scale: 3},
    layoutData: {top: [customerNameText, 16], right: [smsIcon, 25]}
  }).appendTo(customerInfoSection)

  var customerPhoneLabel = tabris.create('TextView', {
    text: 'Phone #',
    font: '11px',
    textColor: '#6E7783',
    layoutData: {top: [customerNameText, 12], left: MARGINLEFT, right: 0}
  }).appendTo(customerInfoSection)

  tabris.create('TextView', {
    font: '16px',
    textColor: '#252c41',
    text: order.customer.phone_number,
    layoutData: {top: [customerPhoneLabel, 6], left: MARGINLEFT, right: 0}
  }).appendTo(customerInfoSection)

  add.line({parent: customerInfoSection})

  // Device info section
  var deviceHeaderText = tabris.create('TextView', {
    text: 'DEVICE INFORMATION',
    font: '13px bold',
    textColor: '#6d819c',
    layoutData: {left: 10, top: [customerInfoSection, 20]},
    markupEnabled: true
  }).appendTo(orderInfoContainer)

  var deviceInfoSection = tabris.create('Composite', {
    background: '#fff',
    layoutData: {top: [deviceHeaderText, 5], left: 0, right: 0}
  }).appendTo(orderInfoContainer)

  add.line({parent: deviceInfoSection, alignment: 'top'})

  var deviceBrandLabel = tabris.create('TextView', {
    text: 'Brand',
    font: '11px',
    textColor: '#6E7783',
    layoutData: {top: 6, left: MARGINLEFT, right: 0}
  }).appendTo(deviceInfoSection)

  var deviceBrandText = tabris.create('TextView', {
    font: '16px',
    textColor: '#252c41',
    text: order.device.brand,
    layoutData: {top: [deviceBrandLabel, 6], left: MARGINLEFT, right: 0}
  }).appendTo(deviceInfoSection)

  add.line({parent: deviceInfoSection})

  var devicePasswordLabel = tabris.create('TextView', {
    text: 'Password',
    font: '11px',
    textColor: '#6E7783',
    layoutData: {top: [deviceBrandText, 12], left: MARGINLEFT, right: 0}
  }).appendTo(deviceInfoSection)

  tabris.create('TextView', {
    font: '16px',
    textColor: '#252c41',
    text: order.device.password,
    layoutData: {top: [devicePasswordLabel, 6], left: MARGINLEFT, right: 0}
  }).appendTo(deviceInfoSection)

  add.line({parent: deviceInfoSection})

  add.editableGroup({
    parent: deviceInfoSection,
    label: 'Device Issues',
    bodyText: order.device.issues,
    data: order,
    case: 'issues'
  })

  add.line({parent: deviceInfoSection})

  add.editableGroup({
    parent: deviceInfoSection,
    label: 'Current Status',
    bodyText: order.status,
    data: order,
    case: 'status'
  })

  add.line({parent: deviceInfoSection})

  // Order info section
  var orderHeaderText = tabris.create('TextView', {
    text: 'ORDER DETAILS',
    font: '13px bold',
    textColor: '#6d819c',
    layoutData: {left: 10, top: [deviceInfoSection, 20]},
    markupEnabled: true
  }).appendTo(orderInfoContainer)

  var orderDetailsSection = tabris.create('Composite', {
    background: '#fff',
    layoutData: {top: [orderHeaderText, 5], left: 0, right: 0}
  }).appendTo(orderInfoContainer)

  add.line({parent: orderDetailsSection, alignment: 'top'})

  var orderDateLabel = tabris.create('TextView', {
    text: 'Order was Taken:',
    font: '11px',
    textColor: '#6E7783',
    layoutData: {top: 6, left: MARGINLEFT, right: 0}
  }).appendTo(orderDetailsSection)

  var orderDateText = tabris.create('TextView', {
    font: '16px',
    textColor: '#252c41',
    text: moment(order.created_at).fromNow(),
    layoutData: {top: [orderDateLabel, 6], left: MARGINLEFT, right: 0}
  }).appendTo(orderDetailsSection)

  add.line({parent: orderDetailsSection})

  var orderQuotedPriceLabel = tabris.create('TextView', {
    text: 'Quoted Price',
    font: '11px',
    textColor: '#3ac569',
    layoutData: {top: [orderDateText, 12], left: MARGINLEFT, right: 0}
  }).appendTo(orderDetailsSection)

  tabris.create('TextView', {
    font: '16px',
    textColor: '#252c41',
    text: '$' + order.quoted_price + '.00',
    layoutData: {top: [orderQuotedPriceLabel, 6], left: MARGINLEFT, right: 0}
  }).appendTo(orderDetailsSection)

  add.line({parent: orderDetailsSection})

  tabris.create('TextView', {
    layoutData: {top: ['prev()', 6], left: MARGINLEFT, right: 0},
    height: 20
  }).appendTo(orderInfoContainer)

  page.open()
}

module.exports = orderPage
