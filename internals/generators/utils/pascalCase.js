const _ = require('lodash')

module.exports = function pascalcase(value) {
  return _.upperFirst(_.camelCase(value))
}