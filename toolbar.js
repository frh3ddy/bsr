function createToolBar(options) {
  var page = options.page;
  var active = "#017bff";
  var inactive = "#8C8C8C";

  var iconContainerSize = window.screen.width/4;
  var topMargin = options.container;


  var toolBar = tabris.create("Composite", {
    layoutData: {left: 0, top: topMargin, bottom: 0, right: 0},
    background: "#F9F9F9"
  }).appendTo(page);

  tabris.create("Composite",{
    background: "rgba(0, 0, 0, .2)",
    layoutData: {left: 0, top: 0, bottom: 48.5,  right: 0},
  }).appendTo(toolBar);

  var dashboard = tabris.create("Composite",{
    layoutData: {left: 0, top: 8, bottom: 0},
    width: iconContainerSize,
    highlightOnTouch: true
  }).on("tap", function(){
    options.pages.dashboard.open()
  }).appendTo(toolBar);

  var dashboardIcon = tabris.create("ImageView", {
    centerX: 0,
    image: {src: "images/" + (options["dashboard"] ? "dashboardActive.png" : "dashboard.png"), scale: 3}
  }).appendTo(dashboard);

  var dashboardText = tabris.create("TextView", {
    text: "DashBoard",
    font: "10px",
    layoutData: {bottom: 0},
    centerX: 0,
    textColor: options["dashboard"] ? active : inactive
  }).appendTo(dashboard);

  var oxford = tabris.create("Composite",{
    layoutData: {left: [dashboard, 0], top: 8, bottom: 0},
    width: iconContainerSize
  }).appendTo(toolBar);

  var oxfordIcon = tabris.create("ImageView", {
    centerX: 0,
    image: {src: "images/" + (options["oxford"] ? "oxfordActive.png" : "oxford.png"), scale: 3}
  }).appendTo(oxford);

  var oxfordText = tabris.create("TextView", {
    text: "Oxford",
    font: "10px",
    layoutData: {bottom: 0},
    centerX: 0,
    textColor: options["oxford"] ? active : inactive
  }).appendTo(oxford);

  var edison = tabris.create("Composite",{
    layoutData: {left: [oxford, 0], top: 8, bottom: 0},
    width: iconContainerSize
  }).appendTo(toolBar);

  var edisonIcon = tabris.create("ImageView", {
    centerX: 0,
    image: {src: "images/" + (options["edison"] ? "edisonActive.png" : "edison.png"), scale: 3}
  }).appendTo(edison);

  var edisonText = tabris.create("TextView", {
    text: "Edison",
    font: "10px",
    layoutData: {bottom: 0},
    centerX: 0,
    textColor: options["edison"] ? active : inactive
  }).appendTo(edison);

  var mercer = tabris.create("Composite",{
    layoutData: {left: [edison, 0], top: 8, bottom: 0},
    width: iconContainerSize
  }).appendTo(toolBar);

  var mercerIcon = tabris.create("ImageView", {
    centerX: 0,
    image: {src: "images/" + (options["mercer"] ? "mercerActive.png" : "mercer.png"), scale: 3}
  }).appendTo(mercer);

  var mercerText = tabris.create("TextView", {
    text: "Mercer",
    font: "10px",
    layoutData: {bottom: 0},
    centerX: 0,
    textColor: options["mercer"] ? active : inactive
  }).appendTo(mercer);

  return toolBar;
};

module.exports = createToolBar;
