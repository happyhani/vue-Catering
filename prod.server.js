var express = require('express');
var config = require('./config/index');

var port = process.env.PORT || config.build.port; // 当前环境变量下的port或者在config/index下定义一个

var app = express(); // 启动express 

var router = express.Router(); // 定义一个router 

// 定义前端路由。 在根目录的时候返回一个function
router.get('/', (req, res, next) => {
  req.url = '/index.html';
  next();
});

app.use(router); // 使用这个router

// 定义一些关于 异步接口的router，之前在dev.server中已经定义过了

//该文件是webpack打包的入口文件 
var appData = require('./data.json')
var seller = appData.seller
var goods = appData.goods
var ratings = appData.ratings

//定义路由
var apiRoutes = express.Router();
apiRoutes.get('/seller', function (req, res) {
  res.json({            //发送一个 JSON 格式的响应。
    errno: 0,          //表示请求正常（不同错误会制定不同的错误码）
    data:seller
  });
});

apiRoutes.get('/goods', function (req, res) {
  res.json({            //发送一个 JSON 格式的响应。
    errno: 0,          //表示请求正常（不同错误会制定不同的错误码）
    data: goods
  });
});

apiRoutes.get('/ratings', function (req, res) {
  res.json({          //发送一个 JSON 格式的响应。
    errno: 0,         //表示请求正常（不同错误会制定不同的错误码）
    data: ratings
  });
});

app.use('/api', apiRoutes);

// 定义static目录
app.use(express.static('./dist'));

// 将 启动 拷贝dev-server中的代码

var server = app.listen(port)

//module.exports = app.listen(port, () => {
//console.log('Listening at 9000');
//});
app.listen(port);