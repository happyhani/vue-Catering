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
## 7.11
tips：底部购物车（高度56px）的价格右边的border，为了让价格是垂直居中的还要让右边的border不能充满整个容器的高度，所以line-height：24px就可以。
## 7.12 
goods组件要告诉购物车组件，一共选了多少件商品
## 7.13 
数组selectFoods：数组中包含{}，有所有商品的单价和数量，由该数组中的数据来计算总价，和购物数量，并控制高亮样式。
## 7.14 
右侧： 多少元起送，根据当前所选商品的价格来显示 ‘还差多少元起送’或‘去结算’。
这里都是根据selectFoods的数量来进行计算，控制显示数据和样式。这也是vue数据驱动的好处。
## 7.15 (9/1/2017)
开始添加 商品增加按钮来获取真实的selectFoods数据。
## 7.16
对检测对象this.food.count = 1;添加一个不存在的字段，直接这么赋值是不可以的，vue中的defineProperty检测不到这个属性变化。
当删除和添加一个属性时需要Vue.set（全局）或者this.$set
## 7.17
增加减少按钮的动画不太好。
修改了购物车里food的属性，因为food是父组件传给购物车组件的，当food的值改变时也会影响父组件。在父组件中将选中商品的数组传给shopcart
## 7.18 (9/4/2017)
购物车小球动画。抛物线。点击加号有动画，反向不需要。动画开始：y轴先向上，后向下。难点：获取小球的位置
## 7.19 (9/5/2017)
子组件向父组件传递数据 用 自定义事件 子组件中使用this.$emit('zidingyi', '参数等'), 父组件中在使用该子组件处添加v-on:zidingyi="方法"
过渡：只有进入的动画，没有离开的动画，这里使用javascript钩子。获取当前点击的元素，所有设为true的元素，都需要有动画。
## 7.20 (9/6/2017)
小球动画的javascript钩子，不知道怎么获取点击小球的位置。beforeEnter enter afterEnter
## 7.21 (9/6/2017)
需求：列表高度最大611，如果超过这个高度里面的内容是滚动。如果内容高度不足611，就让内容去撑高这个容器。
## 7.22 (9/6/2017)
totalCount大于0，这个点开收起的状态才有效。需要有一个变量去存储他当前是收起还是展开状态。这里用fold: true。控制它显示隐藏的listShow用computed去计算。
## 7.23 (9/6/2017)
购物车列表，布局写好以后发现点击添加不能实现，因为他也需要better-scroll。
在listShow ()中添加，如果已经有初始化插件就直接刷新
## 7.24 (9/6/2017)
清空功能：将购物车food数量都置为0.还有购物车背景。设置好购物车动画后，点击蒙层部分也收缩起购物车。
点击去结算，这里我们弹出alert，发现购物车还是会展开，这是因为冒泡。解决：使用修饰符,取消事件冒泡  @click.stop
问题：设置的动画会闪，并不是很好的效果。