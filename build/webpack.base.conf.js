var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
  return path.join(__dirname, '..', dir)  // 根目录是上一级build
}

module.exports = {
  entry: {
    app: './src/main.js'   // webpack编译的入口文件
  },
  output: { // 输出配置
    path: config.build.assetsRoot, // 输出文件路径 config 的index.js中
    filename: '[name].js',   //输出文件的名称, [name]中的name的值是entry中的key值.页面的app.js就是这么得来的 
    publicPath: process.env.NODE_ENV === 'production' // 请求静态资源绝对路径
      ? config.build.assetsPublicPath  //一个'/' 代表根目录
      : config.dev.assetsPublicPath
  },
  resolve: {  // 通过export和import的模块的相关配置 
    extensions: ['.js', '.vue', '.json'], // require的模块中自动补全扩展名
    alias: {															// 使用别名，缩短路径的字符串长度
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'common': resolve('src/common'),
      'components': resolve('src/components') // 在任一页面使用，避免再使用../跳出目录
    }
  },
  module: {
    rules: [   //webpack的编译阶段就是loader对各种文件处理，编译
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',  //pre 会在loader之前处理
        include: [resolve('src'), resolve('test')], // include只检查他文件目录下的文件
        options: {
          formatter: require('eslint-friendly-formatter') // 语法错误提示
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000, // 小于10kb时会生成base64串，打包到编译后的js文件里  大于10kb就单独生成一个文件
          name: utils.assetsPath('img/[name].[hash:7].[ext]') // 生成文件名的规则，用这个方法 static/img/名字+7位哈希串.扩展名
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
