/* global tabris */

function init (page) {
  var scrollView = new tabris.ScrollView({
    layoutData: {top: 0, bottom: 0, left: 0, right: 0}
  }).appendTo(page)

  new tabris.ImageView({
    image: {src: 'images/add.png', scale: 3},
    tintColor: '#274555',
    layoutData: {right: 20, top: 20}
  }).on('tap', function () {
    showRepairs()
  }).appendTo(scrollView)

  function showRepairs () {
    var container = new tabris.Composite({
      top: 80,
      right: 0,
      left: 0,
      background: '#3ac569',
      height: 200
    }).appendTo(page)
  }
}

module.exports = init
