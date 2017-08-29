require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port  // 端口号可以在环境变量中取，也可以在config中去查看
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable  // 需要代理的接口

var app = express() //得到 app 对象  起一个服务器

//该文件是webpack打包的入口文件 
var appData = require('../data.json')
var seller = appData.seller
var goods = appData.goods
var ratings = appData.ratings

//定义路由
var apiRoutes = express.Router();
apiRoutes.get('/seller', function (req, res) {
	res.json({						//发送一个 JSON 格式的响应。
		errno: 0,          //表示请求正常（不同错误会制定不同的错误码）
		data:seller
	});
});

apiRoutes.get('/goods', function (req, res) {
	res.json({						//发送一个 JSON 格式的响应。
		errno: 0,          //表示请求正常（不同错误会制定不同的错误码）
		data: goods
	});
});

apiRoutes.get('/ratings', function (req, res) {
	res.json({					//发送一个 JSON 格式的响应。
		errno: 0,              //表示请求正常（不同错误会制定不同的错误码）
		data: ratings
	});
});
app.use('/api', apiRoutes);

var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, { // 将compiler给webpack的中间件
  publicPath: webpackConfig.output.publicPath, //指定 静态文件的访问目录
  quiet: true
})
// 中间件的功能强大，将编译好的文件存在内存中，例如app.js。实际项目目录中并没有这个文件。而是存在于内存中，这里是中间件做的工作
var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: false,
  heartbeat: 2000
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static')) // 设置静态文件路径

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
