function capitalizeFirstLetter (string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

function getMaxOfArray (numArray) {
  return Math.max.apply(null, numArray)
}

module.exports = {
  capitalize: capitalizeFirstLetter,
  getMax: getMaxOfArray
}
