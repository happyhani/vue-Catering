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
## 8.2 (9/8/2017)
父组件可以调用子组件方法，子组件不能调用父组件方法。
如果方法可以被父组件调用的，命名方法时就用show(),如果是私有方法就用_show()前面加下划线。
思考：food组件中，图片的高度是和屏幕宽度一样，是一个正方形，这里不能写死高度。如果不设置高度，加载图片时会闪动。这里需要怎么解决
## 8.3 (9/18/2017)
解决：正方形图片，如果不设置宽高，加载出来时会闪。
```
.image-header
  position: relative
  width: 100%
  height: 0
  padding-top: 100%  /*这里的关键*/
  img
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
```
上方代码.imager-header的样式放在动画的上面，否则动画执行完，左上角的返回按钮会出现在图片下方。
点击cartcontrol减少组件的添加和减少时，需要阻止冒泡
## 8.4 (9/27/2017)
写好图片下第一格的样式，页面的内容会超出一屏，需要加上batter-scroll,且并不希望出现右侧的滚动条。
· 一、
```
import BScroll from 'better-scroll';
```
· 二、绑定到相应元素上
绑定到父级上，这个元素是视口的固定高度。内层子元素是滚动的.(这里一定要用$nextTick())
## 8.5 (9/28/2017)
```
// 不传参数时，默认的就是event
addFirst (event) {
  if (!event._constructed) {
    return;
  }
}
```

在cartcontrol组件中,$dispatch已经弃用，使用$emit
```
//this.$dispatch('cart.add', event.target); // 传递给父组件
this.$emit('cart', event.target);
```
小球动画有问题：点击加入购物车后，该元素隐藏，小球找不到正确的位置。
解决：购物车的消失也做成一个动画。这样他不是立马隐藏，他的位置就能被进行计算。

shopcart组件中的小球动画需要再看。
cartcontrol组件中的增加减少需要阻止冒泡，food组件的‘加入购物车’也做好加上阻止冒泡
## 8.6 (10/9/2017)
组件split：
将一样的部分抽象成组件split，分割的组件。

分割线和商品信息需要判断，如果没有info这个字段，就不显示。
```
v-show="food.info"
```
## 8.7 (10/9/2017)
组件ratingselect：
商品评价区块
思考:需要一个变量去控制是否显示只看内容，一个变量去控制选择的类型，选择了全部还是推荐还是吐槽。
还要去维护一个评价树的数组。还要维护一个描述，可以动态的传入配置（配置全部推荐吐槽，也可以是评价页的全部满意不满意）。
代码：一、先设置几个props。1、ratings数组2、selectType选择类型3、onlyContent内容4、desc描述
定义3个常量，如此可读性更高。
二、html部分
## 8.8 (10/9/2017)
在food组件中准备好数据，传递给子组件。
在data中设置好数据，再在show方法中初始化一下。因为这个组件是被多个商品所使用，当我们传入不同的商品的时候，我们希望这个状态保持一个初始化状态。所以在每次show的时候将this.selectType = ALL;this.onlyContent = true;
样式：商品评价不能全padding，因为下方有一个贯穿横轴的横线。下方3个选项可以看成一个区块，所以不用再设置margin和padding等。
3个选项都有2种状态，有公共样式，还有各自的背景色，切换2种状态就是positive和negative。
## 8.9 8.10(10/10/2017)
3个选择区块：active的时候字体是白色，背景颜色深。
小对勾：switch有一个on的状态，当onlyContent为true时，显示为绿色。
## 8.11 (10/10/2017)
添加事件：1、按钮2、switch
@click="select(2,$event)"这里子组件改变了，但是父组件并不知道，需要通知父组件的selectType发生变化。派发一个事件。this.$emit('ratingtype.select', type);
onlyContent也是个基础类型，他的改变也不会影响到父组件。
修改商品评价数量，之前是写死的假数据，这里修改为{{ratings.length}}
正面评价和负面评价的数据用computed做筛选。
```
positives() {
  return this.ratings.filter((rating) => {
    return rating.rateType === POSITIVE;
  });
}
```
## 8.12 (10/10/2017)
评价列表和列表数据联动。如果评价列表没有数据就会显示暂无数据的文案。
判断当有评价数组且评价数组不为空时，渲染列表。
## 8.13 (10/10/2017)
评价列表样式.
.rating-item使用了padding，设置.user的定位时。不设置top值时，padding值会影响他的位置。所以设置top，right值
## 8.14 (10/10/2017)
将选项和列表数据对应起来，rating这个字段代表了要渲染的数据，这个用一个小技巧：v-show的值设置为函数needShow(rating.rateType, rating.text)
type关联3种类型，text关联下方小图标，只看有内容的列表。
```
needShow (type, text) {
  if (this.onlyContent && !text) {
    // 如果要只显示内容而且你没有内容，text字段没有数据。就直接过了
    return false;
  }
  if (this.selectType === ALL) {
    return true;
  } else {
    return type === this.selectType;
  }
}
```
此时点击类型和只显示内容的时候不起作用，之前子组件中使用了$emit，这里在父组件中添加监听事件。
切换全部和优差评内容时，列表数据多时，页面并没有滚动。

 this.$nextTick异步更新，改变数据的时候vue的DOM更新是异步的，放在一个更新队列里，在下一个更新周期，他的DOM才会更新

## 8.15 (10/12/2017)
当没有数据的时候，显示没有更多数据的文案。
将日期时间戳改成日期，使用filter。这个格式化日期，可能会在很多地方使用，所以抽成一个date.js。
思路：使用正则

## 8.17 (10/12/2017)
// 小技巧
function padLeftZero (str) {
  return ('00'+str).substr(str.length);
}
如果str是9,009从第一位开始截取就是09,
如果str是12,0012从第二位开始截取就是12。

总结：
ratingselect组件中,不能this.selectType=type这么写。子组件不能修改父组件中的数据，这里使用了解决方法一，定义data数据。这是vue组件中的单向数据流:
```
data() {
  return {
    chooseType: this.selectType,
    chooseContents: this.onlyContent
  };
}
```

```
methods: {
  select(type, event) {
    if(!event._constructed) {
      return;
    }
    
    this.chooseType = type;
    this.$emit('ratingtypeSelect', this.chooseType);
  },
  toggleContent(event) {
    if(!event._constructed) {
      return;
    }
    this.chooseContents = !this.onlyContent;
    this.$emit('contentToggle', this.chooseContents);
  }
}
```
## 9.1 (10/13/2017)
用到better-scroll，最外层有一个容器，内层容器高度超过外层高度时，会滚动。