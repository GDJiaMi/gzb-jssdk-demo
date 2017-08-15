const fs = require('fs')
const path = require('path')
const components = fs.readdirSync(path.resolve(process.cwd(), 'src/components'))
const containers = fs.readdirSync(path.resolve(process.cwd(), 'src/containers'))

exports.componentExists = function componentExists(comp) {
  return components.indexOf(comp) !== -1
}

exports.containerExists = function containerExists(comp) {
  return containers.indexOf(comp) !== -1
}
