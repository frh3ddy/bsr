var Syncano = require('./syncano')
var db = require('./localStorage')

var DataObject = null

function init () {
  var USER_KEY = db('userInfo').first().user_key
  var API_KEY = '29dd175e36b211889ee4e794fbdb6994be305dfb'
  var connection = Syncano({ userKey: USER_KEY, apiKey: API_KEY })
  DataObject = connection.DataObject
}

function getDataObject () {
  return DataObject
}

module.exports = {
  init: init,
  DataObject: getDataObject
}
