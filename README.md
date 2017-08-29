# my-vue

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


# css的预编译 stylus
# 前6章 header组件中一像素边框 背景模糊属性 使用axios获取数据 props组件间数据传递  评分star组件  弹窗蒙层
# 8/29/2017 第7章 goods组件  左右俩栏 底部的购物车功能
## 7.1 
内容会超出视口，可以向下滚动，但右侧没有滚动条
classMap type的值对应的图标也可以抽象成一个组件，虽然只是一个span标签，可以对这个进行优化
定义样式尽量用class，因为用标签的查找速度比不上class，尤其是多层嵌套时，能用class的尽量用class
tips：display：table 不管一行还是多行都可以垂直居中
## 7.2
左侧菜单布局  抽象icon组件
## 7.3
点击左侧菜单，右侧内容联动