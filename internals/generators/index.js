'use strict'
const fs = require('fs')
const path = require('path')
const componentGenerator = require('./component')

module.exports = plop => {
  plop.addPrompt('recursive', require('inquirer-recursive'))
  plop.setGenerator('component', componentGenerator)
}