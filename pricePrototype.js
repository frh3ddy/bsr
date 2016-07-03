/* global tabris */

var IMAGE_PATH = 'images/'
var THUMB_SIZE = 48
var MARGIN = 12
var ANIMATION_START_DELAY = 200

function init (page) {
  var repairs = [
  ['LCD', 'Staudacher', 'apple.png'],
  ['Chargin Port', 'Bull', 'samsung.png'],
  ['Hard Drive', 'Krause', 'dell.png'],
  ['Virus Removal', 'Böhme López', 'sony.png'],
  ['Data Backup', 'Knauer', 'acer.png'],
  ['Graphic Card', 'Post', 'asus.png'],
  ['Motherboar Swap', 'Buschtöns', 'hp.png']
  ].map(function (element) {
    return {name: element[0], lastName: element[1], image: IMAGE_PATH + element[2]}
  })

  var scrollView = new tabris.ScrollView({
    background: '#252c41',
    layoutData: {top: 0, bottom: 0, left: 0, right: 0}
  }).appendTo(page)

  new tabris.ImageView({
    image: {src: 'images/add.png', scale: 3},
    tintColor: '#f4f5f9',
    layoutData: {right: 20, top: 20}
  }).on('tap', function () {
    if (this.get('tintColor') === 'rgba(255, 0, 0, 1)') {
      this.set('tintColor', '#f4f5f9')
      this.animate({
        transform: {
          rotation: Math.PI * 2
        }
      }, {
        duration: 200,
        easing: 'ease-in-out'
      })
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
      showRepairs()
    }
  }).appendTo(scrollView)

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
      image: {src: repair.image, width: thumbsize, height: thumbsize}
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
      logIt(input.get('text'))
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
    inside.children().dispose()
    inside.set('visible', false)
  }
}

module.exports = init
