const shelljs = require('shelljs')
const path = require('path')
const values = require('lodash/values')
const webpackDllConfig = require('../webpack/webpack.config.dll')
const chalk = require('chalk')

const outputPath = webpackDllConfig.output.path
if (process.env.NODE_ENV === 'production') {
  process.exit(0)
}

shelljs.mkdir('-p', outputPath)
shelljs.rm('-rf', path.join(outputPath, '*'))
console.log(`${chalk.green('DllPlugin')}: 正在打包Dll文件....`)
console.log(
  `${chalk.green('DllPlugin')}: 下列依赖将被打包进Dll文件中:\n ${chalk.cyan(
    values(webpackDllConfig.entry)[0].join('\n')
  )}`
)

shelljs.exec('cross-env BUILDING_DLL=true webpack --display-chunks --color --config internals/webpack/webpack.config.dll.js')

