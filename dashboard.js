function initDashboard(page) {
  new tabris.ImageView({
    image: {src: "images/tech.png", scale: 3},
    layoutData: {top: 8, left: 8}
  }).appendTo(page);

  new tabris.Composite({
    background: "#282C37",
    layoutData: {left: ["prev()", 0], right: 0, top: 8},
    height: 93
  }).appendTo(page);
}

module.exports = initDashboard;
