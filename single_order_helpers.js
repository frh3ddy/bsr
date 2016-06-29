/* global tabris */

var editIssues = require('./editIssues')
var updateStatus = require('./updateStatus')

var MARGINLEFT = 10

function createEditableGroup (props) {
  var container = tabris.create('Composite', {
    layoutData: {top: ['prev()', 0], left: 0, right: 0},
    highlightOnTouch: true
  }).on('tap', function () {
    switch (props.case) {
      case 'issues':
          editIssues(props.data, editableText)
          break;
      case 'status':
          updateStatus(props.data, editableText)
          break;
      default:
          console.log('something when wrong')
    }
  }).appendTo(props.parent)

  tabris.create('TextView', {
    text: props.label,
    font: '11px',
    textColor: '#6E7783',
    layoutData: {top: 6, left: MARGINLEFT, right: 0}
  }).appendTo(container)

  var editableText = tabris.create('TextView', {
    text: props.bodyText,
    font: '16px',
    textColor: '#252c41',
    layoutData: {top: ['prev()', 6], left: MARGINLEFT, right: 40}
  }).appendTo(container)

  tabris.create('ImageView', {
    image: {src: 'images/view_more.png', scale: 3},
    layoutData: {right: 20},
    centerY: 0
  }).appendTo(container)

  return null
}

function createLine (props) {
  var alignment
  var margin

  if (props.alignment === 'top') {
    // alignment is require to be specific because is using a fraction
    // and there will be a gap depending on its position.
    alignment = {top: 0, bottom: 0.5, left: 0, right: 0}
    margin = 0
  } else {
    alignment = {top: 0.5, bottom: 0, left: 0, right: 0}
    margin = ['prev()', 6]
  }

  var dividerContainer = tabris.create('Composite', {
    layoutData: {top: margin, left: 0, right: 0},
    height: 1
  }).appendTo(props.parent)

  tabris.create('TextView', {
    background: '#dddfe6',
    layoutData: alignment
  }).appendTo(dividerContainer)

  return null
}

module.exports = {
  editableGroup: createEditableGroup,
  line: createLine
}
