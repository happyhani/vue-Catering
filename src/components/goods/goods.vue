<template>
  <div class="goods">
    <!--左侧菜单-->
  	<div class="menu-wrapper" ref="menuWrapper">
  	  <ul >
  	    <li v-for="(item, index) in goods" class="menu-item" :class="{'current':currentIndex===index}" @click="selectMenu(index,$event)">
  	      <span class="text border-1px">
  	        <v-icon :item="item"></v-icon>
  	        <!--抽象成组件之前：<span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>-->
  	        {{item.name}}
  	      </span>
  	    </li>
  	  </ul>
  	</div> 
  	<!--右侧商品-->
  	<div class="foods-wrapper" ref="foodsWrapper">
  	  <ul>
  	  	<li v-for="item in goods" class="food-list food-list-hook">
  	  	  <h1 class="title">{{item.name}}</h1>
  	  	  <ul>
  	  	  	<li v-for="food in item.foods" class="food-item border-1px">
  	  	  	  <div class="icon">
  	  	  	    <img width="57" height="57" :src="food.icon"/>
  	  	  	  </div>
  	  	  	  <div class="content">
  	  	  	  	<h2 class="name">{{food.name}}</h2>
  	  	  	  	<p class="desc">{{food.description}}</p>
  	  	  	  	<div class="extra">
  	  	  	  		<span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
  	  	  	  	</div>
  	  	  	  	<div class="price">
  	  	  	  		<span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
  	  	  	  		<!--不是所有商品都有降价的，需要判断-->
  	  	  	  	</div>
  	  	  	  </div>
  	  	  	</li>
  	  	  </ul>
  	  	</li>
  	  </ul>
  	</div>
    
  </div>
</template>

<script type="text/ecmascript-6">
  import icon from '../icon/icon';
  import BScroll from 'better-scroll';
  
  const ERR_OK = 0;
  
	export default {
	  props: {
	    seller: {
	      type: Object
	    }
	  },
	  data () {
	    return {
	      goods: [], // created中获取的数据
	      listHeight: [], // 商品区块距顶部的高度
	      scrollY: 0
	    };
	  },
	  computed: {
	    currentIndex () {
	      for (let i = 0; i < this.listHeight.length; i++) {
	        let height1 = this.listHeight[i],
	            height2 = this.listHeight[i + 1];
	      	if (!height2 || (this.scrollY < height2 && this.scrollY >= height1)) {
	      		// 如果已经在最后一个或者scrollY在两者之间时
	      		return i;
	      	}
	      }
	      return 0;
	    }
	  },
	  created () {
	    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
	    this.$http.get('/api/goods').then((response) => {
	      response = response.data;
	      if (response.errno === ERR_OK) { // 如果成功了
	      	this.goods = response.data;
//	      	console.log(this.goods);
          // 异步更新DOM，数据改变的时候，DOM并没有变化，这里scroll计算的高度就有问题
          this.$nextTick(() => {
            // 回调中更新DOM
            this._initScroll();
            this._calculateHeight();
          });
	      }
	    });
	  },
	  methods: {
	    selectMenu (index, event) {
	      if (!event._constructed) {
	      	return;
	      }
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook'),
            el = foodList[index];
        this.foodsScroll.scrollToElement(el, 300);
      },
	    _initScroll () {
	      // 第一个参数是dom，第二个参数是json
	      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
	        click: true  // 设置后可以点击，默认派发了一个点击事件
	      });
	      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
	        probeType: 3  // 实时监听位置
	      });
	      this.foodsScroll.on('scroll', (pos) => {
	        this.scrollY = Math.abs(Math.round(pos.y)); // pos一个对象，里边包含xy的位置。小数
	      });
	    },
	    _calculateHeight () {
	      let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook'),
	          height = 0;
	      this.listHeight.push(height);
	      for (let i = 0; i < foodList.length; i++) {
	      	// 遍历每一个区块的高度
	      	height += foodList[i].clientHeight;
	      	this.listHeight.push(height);
	      }
	      // console.log(this.listHeight);
	    }
	  },
	  components: {
	    'v-icon': icon
	  }
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl';

  .goods
    display: flex
    position: absolute
    top: 174px
    bottom: 46px
    width: 100%
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px /* 不写的话安卓会有问题 ，占位80px */
      background: #f3f5f7 
      .menu-item
        display: table
        width: 56px
        height: 54px
        line-height: 14px
        padding: 0 12px
        text-align: center
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          font-weight: 700
          .text
            border-none() /* 去掉下边框 */
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        padding: 18px
        &:not(:last-of-type)
          border-1px(rgba(7, 17, 27, 0.1))
        .icon
          flex: 0 0 57px
          width: 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
</style>