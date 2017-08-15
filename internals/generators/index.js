'use strict'
const fs = require('fs')
const path = require('path')
const componentGenerator = require('./component')
const containerGenerator = require('./containers')

module.exports = plop => {
  plop.addPrompt('recursive', require('inquirer-recursive'))
  plop.addPrompt('autocomplete', require('inquirer-autocomplete-prompt'))

  plop.setGenerator('Component', componentGenerator)
  plop.setGenerator('Container', containerGenerator)
}