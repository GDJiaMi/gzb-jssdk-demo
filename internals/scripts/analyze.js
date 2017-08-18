const shelljs = require('shelljs')
const chalk = require('chalk')

shelljs.exec(
  'webpack --config internals/webpack/webpack.config.prod.js --profile --json > build/stats.json',
  () => {
    console.log(
      `\n\n 在浏览器打开(CMD + double-click) \n${chalk.green(
        'http://webpack.github.io/analyse/'
      )} \n或 ${chalk.green(
        'https://chrisbateman.github.io/webpack-visualizer/'
      )}\n上传 ${chalk.blue('build/stats.json')} 进行分析.`
    )
  }
)
