var utils = require('./utils')  // 工具方法
var webpack = require('webpack')
var config = require('../config') 
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')  //
var HtmlWebpackPlugin = require('html-webpack-plugin')  // html插件
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// add hot-reload related code to entry chunks  热加载：在改变源码后，不刷新时也可以看到效果。
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({//引入的插件
      'process.env': config.dev.env //查看是生产环境还是开发环境
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),      //热加载插件
    new webpack.NoEmitOnErrorsPlugin(), // 编译发生错误时会跳过错误部分，使编译之后的包不会发生错误
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({ 	// 很重要
      filename: 'index.html', //最终编译生成的文件名
      template: 'index.html', //使用的模板，处理之后这里和最终编译的文件重名
      inject: true						// 打包输出的js路径注入到index.html里的body中，css加入到head标签里。(可以自行配置)
    }),
    new FriendlyErrorsPlugin()
  ]
})
