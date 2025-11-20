const _ = require('lodash')

function debounceFunction(fn, wait) {
  // lodash 4.x debounce
  return _.debounce(fn, wait)
}

module.exports = {
  debounceFunction,
}
