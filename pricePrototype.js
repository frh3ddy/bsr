/* global tabris */

var IMAGE_PATH = 'images/'
var THUMB_SIZE = 48
var MARGIN = 12
var ANIMATION_START_DELAY = 200

function init (page) {
  var people = [
  ['Holger', 'Staudacher', 'apple.png'],
  ['Ian', 'Bull', 'samsung.png'],
  ['Jochen', 'Krause', 'dell.png'],
  ['Jordi ', 'Böhme López', 'sony.png'],
  ['Markus ', 'Knauer', 'acer.png'],
  ['Moritz', 'Post', 'asus.png'],
  ['Tim', 'Buschtöns', 'hp.png']
  ].map(function (element) {
    return {firstName: element[0], lastName: element[1], image: IMAGE_PATH + element[2]}
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
    layoutData: {left: 0, top: 80, right: 0, height: 150}
  }).on('resize', function (widget, bounds) {
    this.children().dispose()
    var thumbsize = 80
    people.forEach(function (person, index) {
      animateInFromBottom(createPersonThumb(widget, person, thumbsize), index)
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

  function createPersonThumb (parent, person, thumbsize) {
    var font = (thumbsize < 48) ? '9px' : '12px'
    var composite = new tabris.Composite({
      layoutData: {left: ['prev()', MARGIN], top: 0}
    }).appendTo(parent)
    var personView = new tabris.ImageView({
      layoutData: {left: 0, top: 0, width: thumbsize, height: thumbsize},
      image: {src: person.image, width: thumbsize, height: thumbsize},
      highlightOnTouch: true
    }).on('tap', function () {

    }).appendTo(composite)

    new tabris.TextView({
      alignment: 'center',
      layoutData: {left: 0, top: [personView, 10], width: thumbsize},
      text: person.firstName,
      font: font,
      textColor: '#252c41'
    }).appendTo(composite)

    return composite
  }

  function showRepairs () {
    if (inside.parent()) {
      inside.set('visible', true)
      var thumbsize = 80
      people.forEach(function (person, index) {
        animateInFromBottom(createPersonThumb(inside, person, thumbsize), index)
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
