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


### css的预编译 stylus
### 前6章 header组件中一像素边框 背景模糊属性 使用axios获取数据 props组件间数据传递  评分star组件  弹窗蒙层
# 第7章 goods组件  左右俩栏 底部的购物车功能 (8/29/2017)
## 7.1 
内容会超出视口，可以向下滚动，但右侧没有滚动条
classMap type的值对应的图标也可以抽象成一个组件，虽然只是一个span标签，可以对这个进行优化
定义样式尽量用class，因为用标签的查找速度比不上class，尤其是多层嵌套时，能用class的尽量用class
tips：display：table 不管一行还是多行都可以垂直居中
## 7.2
左侧菜单布局  抽象icon组件
## 7.3 (8/30/2017)
右侧食品布局
点击左侧菜单，右侧内容联动
## 7.4
商品图片固定大小，右侧名称描述是自适应，用到flex布局
## 7.6
better-scroll
rel特殊属性：vue中获取DOM
## 7.7
计算右侧每一部分的高度，计算滚动距离，当某一部分显示时，对应左侧的index值的menu设置高亮
tips：设置class时，如：food-list-hook,(添加hook)不是为了设置样式，是为了js获取DOM使用
## 7.8
左侧高亮效果实现。点击左侧menu右侧商品显示对应的位置
better-scroll监听了touchstart和touchend这些，prevent default 取消默认事件了，在this.menuScroll的第二个参数{}中设置click:true。
存在问题：在移动端设置click：true后只派发一次click，但是在pc端，最开始的点击并没有给取消默认事件掉，所以pc端这里会触发2次click事件。 
解决：在点击的时候调用方法传入$event，在better-scroll中派发的事件和原生的有一个区别，插件中有event._constructed值为true，而原生的没有。
tips:1、通过ref="element",this.$refs.element 来获取原生DOM 2、在操作改变DOM后，使用this.$nextTick的回调来更新。
## 7.9 (8/31/2017)
购物车有很多状态，将他封装一个组件，先写最简单的初始状态。