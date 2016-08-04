/* global tabris */
var connection = require('./authenticate')

var IMAGE_PATH = 'images/computer-parts/'
var THUMB_SIZE = 48
var MARGIN = 12
var ANIMATION_START_DELAY = 200
var HORIZONTAL_MARGIN = 16
var VERTICAL_MARGIN = 20

function init (data, widget) {
  var page = new tabris.Page({
    title: 'test',
    background: '#252c41'
  })

  console.log(data)

  var repairs = [
  ['LCD', 'lcd.png'],
  ['Power Supply', 'power-supply.png'],
  ['GraphicCard', 'video-card.png'],
  ['Memory Ram', 'memory-ram.png'],
  ['Charging Port', 'charging-port.png'],
  ['Battery', 'battery.png'],
  ['Hard Drive', 'hard-drive.png'],
  ['Virus Removal', 'virus.png'],
  ['Data Recovery', 'data-recovery.png'],
  ['DVD Drive', 'optical-drive.png'],
  ['Heat Sink', 'heat-sink.png'],
  ['Motherboard Swap', 'motherboard.png']
  ].map(function (element) {
    return {name: element[0], image: IMAGE_PATH + element[1]}
  })

  // var scrollView = new tabris.ScrollView({
  //   layoutData: {top: 0, bottom: 0, left: 0, right: 0}
  // }).appendTo(page)

  var addButton = new tabris.ImageView({
    image: {src: 'images/add.png', scale: 3},
    tintColor: '#f4f5f9',
    layoutData: {right: 20, top: 20}
  }).on('tap', function () {
    if (this.get('tintColor') === 'rgba(255, 0, 0, 1)') {
      hideRepairs()
    } else {
      this.set('tintColor', 'red')
      this.animate({
        transform: {
          rotation: Math.PI * 0.77
        }
      }, {
        duration: 200,
        easing: 'ease-in-out'
      })
      showRepairs(this)
    }
  }).appendTo(page)

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
    layoutData: {left: 0, right: 0, top: 80, height: screen.height - 80},
    itemHeight: 64,
    items: data,
    initializeCell: function (cell) {
      //global this
      var cellWidth = this.screen.width
      cell.set('background', '#d0d0d0')

      var options = new tabris.Composite({
        background: 'blue',
        layoutData: {right: 0, width: cellWidth / 2, top: 0, bottom: 0}
      }).appendTo(cell)

      new tabris.TextView({
        text: 'Delete',
        alignment: 'center',
        textColor: '#fff',
        background: '#E53A40',
        layoutData: {right: '50%', left: 0, top: 0, bottom: 0}
      }).on('tap', function () {
        collectionView.remove(container.parent().get("itemIndex"));
      }).appendTo(options)

      new tabris.TextView({
        text: 'Edit',
        textColor: '#fff',
        alignment: 'center',
        background: '#566270',
        layoutData: {right: '0', left: '50%', top: 0, bottom: 0}
      }).appendTo(options)

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

      // var titleView = new tabris.TextView({
      //   layoutData: {bottom: VERTICAL_MARGIN, left: HORIZONTAL_MARGIN}
      // }).appendTo(container)

      var timeView = new tabris.TextView({
        textColor: '#b8b8b8',
        layoutData: {top: VERTICAL_MARGIN, right: HORIZONTAL_MARGIN}
      }).appendTo(container)

      new tabris.Composite({
        background: '#b8b8b8',
        layoutData: {left: 0, bottom: 0, right: 0, height: 0.5}
      }).appendTo(cell)

      cell.on('change:item', function (widget, message) {
        container.set({transform: {}, message: message})
        senderView.set('text', message[0])
        // titleView.set('text', message.title)
        timeView.set('text', '$'+ message[1])
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

  //---------------------------------

  // var editContainer = new tabris.Composite({
  //   layoutData: {top: 20, left: 0, right: 0}
  // }).appendTo(scrollView)
  //
  // new tabris.TextView({
  //   text: 'test'
  // }).appendTo(editContainer)

  var inside = new tabris.ScrollView({
    direction: 'horizontal',
    background: '#dddfe6',
    layoutData: {left: 0, top: 80, right: 0, height: 200}
  }).on('resize', function (widget, bounds) {
    this.children().dispose()
    var thumbsize = 120
    repairs.forEach(function (repair, index) {
      animateInFromBottom(createRepairThumb(widget, repair, thumbsize), index)
    })
  })

  function animateInFromBottom (widget, index) {
    widget.set({
      opacity: 0.0,
      transform: {translationY: THUMB_SIZE / 2}
    })
    widget.animate({
      opacity: 1.0,
      transform: {translationY: 0}
    }, {
      delay: index * 50 + ANIMATION_START_DELAY,
      duration: 200,
      easing: 'ease-in-out'
    })
  }

  function createRepairThumb (parent, repair, thumbsize) {
    var font = (thumbsize < 48) ? '9px' : '12px'
    var composite = new tabris.Composite({
      layoutData: {left: ['prev()', MARGIN], top: 0}
    }).appendTo(parent)
    var repairView = new tabris.ImageView({
      layoutData: {left: 0, top: 0, width: thumbsize, height: thumbsize},
      image: {src: repair.image, scale: 3}
    }).appendTo(composite)

    new tabris.TextView({
      alignment: 'center',
      layoutData: {left: 0, top: [repairView, 10], width: thumbsize},
      text: repair.name,
      font: font,
      textColor: '#252c41'
    }).appendTo(composite)

    new tabris.TextInput({
      keyboard: 'decimal',
      opacity: 0.3,
      class: 'inactive',
      layoutData: {left: 0, top: ['prev()', 10], width: thumbsize},
      message: '$Price'
    }).on('focus', function () {
      clearPreviusSelection()
      this.set('opacity', 1)
      showComfirmAddButton(composite.children().first(), this)
      this.set('class', 'active')
      // dissableNonSelected()
    }).on('blur', function () {
      if (this.get('text').length === 0) {
        clearHighlighted()
        this.set('class', 'inactive')
        composite.find('Button').dispose()
      }
    }).appendTo(composite)

    return composite
  }

  function clearPreviusSelection () {
    var input = inside.find('.active')
    if (input.length !== 0) {
      input[0].set('opacity', 0.3)
      input[0].set('text', '')
      input[0].set('class', 'inactive')
      input[0].siblings('Button').dispose()
    }
  }

  function clearHighlighted () {
    inside.apply({
      '.active': {opacity: 0.3}
    })
  }

  function logIt (price) {
    console.log(price)
  }

  function showComfirmAddButton (widget, input) {
    new tabris.Button({
      text: 'ADD',
      layoutData: {centerX: 0, centerY: -20, width: 100}
    }).on('select', function () {
      input.siblings('TextView')[0].get('text')
      logIt([input.get('text'), input.siblings('TextView')[0].get('text')])
      hideRepairs()
    }).insertBefore(widget)
  }

  function showRepairs () {
    if (inside.parent()) {
      inside.set('visible', true)
      var thumbsize = 120
      repairs.forEach(function (repair, index) {
        animateInFromBottom(createRepairThumb(inside, repair, thumbsize), index)
      })
    } else {
      inside.appendTo(page)
    }
  }

  function hideRepairs () {
    addButton.set('tintColor', '#f4f5f9')
    addButton.animate({
      transform: {
        rotation: Math.PI * 2
      }
    }, {
      duration: 200,
      easing: 'ease-in-out'
    })

    inside.children().dispose()
    inside.set('visible', false)
  }

  page.open()
}

module.exports = init
