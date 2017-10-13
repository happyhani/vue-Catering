<template>
  <div>
    <div class="shopcart">
      <div class="content" @click="toggleList">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo" :class="{highlight:totalCount>0}">
              <i class="icon-shopping_cart" :class="{highlight:totalCount>0}"></i>
            </div>
            <div class="num" v-show="totalCount>0">{{totalCount}}</div>
          </div>
          <div class="price" :class="{highlight:totalPrice>0}">￥{{totalPrice}}</div>
          <div class="desc">另需配送费￥{{deliveryPrice}}</div>
        </div>
        <div class="content-right" @click.stop="pay">
          <div class="pay" :class="payClass">{{payDesc}}</div>
        </div>
      </div>
      <transition-group name="drop" tag="div" class="ball-container">
        <div v-for="ball in balls" v-show="ball.show" class="ball" :key="ball.id" v-bind:css="false"  v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:after-enter="afterEnter">
          <div class="inner inner-hook"></div>
        </div>
      </transition-group>
      <!--购物车列表-->
      <transition name="fold">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="empty">清空</span>
          </div>
          <div class="list-content" ref="cartListWrapper">
            <ul>
            	<li class="food" v-for="food in selectFoods">
            	  <span class="name">{{food.name}}</span>
            	  <div class="price">
            	  	<span>￥{{food.price*food.count}}</span>
            	  </div>
            	  <div class="cartcontrol-wrapper">
            	    <v-cartcontrol :food="food"></v-cartcontrol>
            	  </div>
            	</li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="fade">
      <div class="list-mask" @click="fold = true" v-show="listShow"></div>
    </transition>
  </div>
</template>

<script type="text/ecmascript">
  import cartcontrol from '../cartcontrol/cartcontrol';
  import BScroll from 'better-scroll';
  
  export default {
    props: {
      selectFoods: {
        type: Array,
        default() { // type是array或者obj，这个default是一个函数
          return [
            {
              price: 10,
              count: 2 
            }
          ];
        } 
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        balls: [
          {
            show: false,
            id: 0
          },
          {
            show: false,
            id: 1
          },
          {
            show: false,
            id: 2
          },
          {
            show: false,
            id: 3
          },
          {
            show: false,
            id: 4
          }
        ],
        dropBalls: [ ],
        fold: true // 指示当前是折叠的还是展开
      };
    },
    computed: {
      totalPrice () {
        let total = 0;
        this.selectFoods.forEach((food) => {
          total += food.price * food.count;
        });
        return total;
      },
      totalCount () {
        let count = 0;
        this.selectFoods.forEach((food) => {
          count += food.count;
        });
        return count;
      },
      payDesc () {
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`;
        }else if(this.totalPrice < this.minPrice){
          let diff = this.minPrice-this.totalPrice;
          return `还差￥${diff}元起送`;
        }else {
          return '去结算';
        }
      },
      payClass () {
        if(this.totalPrice < this.minPrice){
          return 'not-enough';
        }else {
          return 'enough';
        }
      },
      listShow () {
        if (!this.totalCount) {
          this.fold = true; // 不买任何商品的时候，是折叠状态
          return false;
        }
        let show = !this.fold; 
        if (show) {
         // better-scroll 是依赖的DOM 
          this.$nextTick(() => {
            if (!this.cartScroll) {
              this.cartScroll = new BScroll(this.$refs.cartListWrapper, {
                click: true
              });
            }else {
              this.cartScroll.refresh();
            }
          });
        }
        return show;
      }
    },
    methods: {
      // 去购物 需要处理冒泡
      pay () {
        if (this.totalPrice < this.minPrice) {
          return;
        }else if (this.totalPrice >= this.minPrice) {
          alert(`支付￥${this.totalPrice}`); 
        }
      },
      // qingkong购物车
      empty () {
        this.selectFoods.forEach((food) => {
          food.count = 0;
        });
      },
      toggleList () { // 购物车列表
        if (!this.totalCount) {
          return;
        }else {
          this.fold = !this.fold; 
        }
      },
      drop (el) {
        // 在balls中找一个小球做动画，保存当前元素el，并将小球放在dropBalls中（已经降落小球）
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i];
          if (!ball.show) {
            ball.show = true;
            ball.el = el;
            this.dropBalls.push(ball); // 掉下来的小球
            return;
          }
        }
      },
      beforeEnter: function (el) {
        // 设置动画 所有设置为true的小球都要有动画
        let count = this.balls.length;
//      el = ball.el;
        while (count--) {
          let ball = this.balls[count];
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect(); // 获取小球当前位置
            let x = rect.left-32;
            let y = -(window.innerHeight - rect.top - 22);
            el.style.display=''; // 先让他显示,外层元素做y轴的偏移
            el.style.webkitTransform = `translate3d(0,${y}px,0)`;
            el.style.transform = `translate3d(0,${y}px,0)`;
            let inner = el.getElementsByClassName('inner-hook')[0];
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
            inner.style.transform = `translate3d(${x}px,0,0)`;
          }
        }
      },
      // 此回调函数是可选项的设置
      // 与 CSS 结合时使用
      enter: function (el, done) {
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight; // 重绘，主动触发浏览器重绘以后设置transform才有用
//      el = ball.el;
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0,0,0)';
          el.style.transform = 'translate3d(0,0,0)';
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.webkitTransform = 'translate3d(0,0,0)';
          inner.style.transform = 'translate3d(0,0,0)';
        });
        done();
      },
      afterEnter: function (el) {
        // 动画做完的时候
        let ball = this.dropBalls.shift();
//      el = ball.el;
        if (ball) {
          ball.show = false; // 做完一个动画再将他设为false
          el.style.display='none';
        }
      }
    },
    components: {
      'v-cartcontrol': cartcontrol
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl';
  .shopcart
    position: fixed
    left: 0
    bottom: 0
    z-index: 500
    width: 100%
    height: 48px
    .content
      display: flex
      background: #141d27
      font-size: 0
      color: rgba(255,255,255,0.4)
      .content-left
        flex: 1
        .logo-wrapper
          display: inline-block
          position: relative
          top: -10px
          width: 56px
          height: 56px
          margin: 0 12px
          padding: 6px
          box-sizing: border-box
          vertical-align: top
          border-radius: 50%
          background: #141d27
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            background: #2b343c
            text-align: center
            &.highlight
              background: rgb(0,160,220)
            .icon-shopping_cart
              font-size: 24px
              line-height: 44px
              color: #80858a
              &.highlight
                color: #fff
          .num
            position: absolute
            top: 0
            right: 0
            width: 24px
            height: 16px
            line-height: 16px
            text-align: center
            border-radius: 16px
            font-weight: 700
            font-size: 10px
            background: rgb(240,20,20)
            color: #fff
            box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4)
        .price
          display: inline-block
          vertical-align: top
          margin-top: 12px 
          line-height: 24px
          padding-right: 12px 
          box-sizing: border-box
          border-right: 1px solid rgba(255,255,255,0.1)
          font-size: 16px
          font-weight: 700
          color: rgba(255,255,255,0.4)
          &.highlight
            color: #fff
        .desc  
          display: inline-block
          vertical-align: top
          margin: 12px 0 0 12px
          line-height: 24px
          font-size: 10px
          color: rgba(255,255,255,0.4)
      .content-right
        flex: 0 0 105px
        width: 105px
        .pay
          line-height: 48px
          text-align: center
          font-size: 12px
          font-weight: 700
          background: #2b333b
          &.not-enough
            background: #2b333b
          &.enough
            background: #00b43c
            color: #fff
    .ball-container
      .ball
        position: fixed /*相对于视口 */
        left: 32px
        bottom: 22px
        z-index: 1000
        transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
        .inner 
          width: 16px
          height: 16px
          border-radius: 50%
          background: rgb(0, 160, 220)
          transition: all 0.4s linear
    .shopcart-list
      position: absolute
      top: 0
      left: 0
      z-index: -1
      width: 100%
      transition: all .5s linear
      transform: translate3d(0, -100%, 0)
      /*max-height: 300px*/
    /*.fold-enter-active, .fold-leave-to*/
      /*transform: translate3d(0, 0, 0)*/
    /*.fold-enter-to*/
      /*transform: translate3d(0, -100%, 0)*/
      .list-header
        height: 40px
        line-height: 40px
        padding: 0 18px
        background: #f3f5f7
        border-bottom:1px solid rgba(7, 17, 27, 0.1)
        .title
          float: left
          font-size: 14px
          color: rgb(7, 17, 27)
        .empty
          float: right 
          font-size: 12px
          color: rgb(0, 160, 220)
      .list-content  
        padding: 0 18px
        max-height: 217px /* 超过这个结构不再增高，较长部分进行隐藏  */
        overflow: hidden
        background: #fff
        .food
          position: relative
          padding: 12px 0
          box-sizing: border-box
          border-1px(rgba(7,17,27,0.1)) 
          .name
            line-height: 24px
            font-size: 14px   
            color: rgb(7,17,27)
          .price
            position: absolute
            right: 90px
            bottom: 12px
            line-height: 24px
            font-size: 14px   
            font-weight: 700   
            color: rgb(240,20,20)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 6px
    .list-mask
      position: fixed
      top: 0
      left: 0
      width: 100%
      height: 100%
      z-index: 40
      background-filter: blur(10px)
      transition: all .5s linear
    .fade-enter-active, .fade-leave-active
      opacity:0
      background: rgba(7,17,27,0)
    .fade-enter-to, .fade-leave-to
      opacity: 1
      background: rgba(7,17,27,0.6)
</style>