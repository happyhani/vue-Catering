require('./check-versions')()

process.env.NODE_ENV = 'production'

var ora = require('ora') // 长时间运行异步任务的提示，例如：打包过程中，旋转的图案和文案
var rm = require('rimraf')
var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('../config')
var webpackConfig = require('./webpack.prod.conf')

var spinner = ora('building for production...')// 输出提示信息，提示文案
spinner.start()

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) { // 编译打包，结束后就将spinner结束掉
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({ // 打包信息，打包后的结果
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow( // 打包后的结果要用http server启动，不能打开区块文件。通过file的方式打开是不ok的。
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
