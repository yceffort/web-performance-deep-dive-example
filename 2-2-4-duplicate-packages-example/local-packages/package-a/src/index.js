const _ = require('lodash')

function getRandomItem(array) {
  // lodash 3.x uses _.sample
  return _.sample(array)
}

module.exports = {
  getRandomItem,
}
