var merge = require('webpack-merge')  //合并配置文件
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, { //和prod.env.js进行合并，最后输出一个对象
  NODE_ENV: '"development"'
})
