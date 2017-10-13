<template>
  <transition name="move">
    <div v-show="showFlag" class="food" ref="food">
      <div class="food-content">
        <!--图片-->
        <div class="image-header">
          <img :src="food.image" width="100%"/>
          <div class="back" @click="showFlag=false">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <!--内容-->
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="details">
            <span class="sell-count">月售{{food.sellCount}}份 </span>
            <span class="rating">好评率{{food.rating}}</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <!--加入购物车-->
          <div class="cartcontrol-wrapper">
          	<v-cartcontrol :food="food"></v-cartcontrol>
          </div>
          <transition name="fade">
            <div @click.stop="addFirst" class="buy" v-show="!food.count || food.count===0">加入购物车</div>
          </transition>
        </div>
        <!--分割区-->
        <v-split v-show="food.info"></v-split>
        <div class="info" v-show="food.info">
          <h1 class="title">商品信息</h1>
          <p class="text">{{food.info}}</p>
        </div>
        <v-split></v-split>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <v-ratingselect :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="food.ratings" v-on:ratingtypeSelect="ratingtypeSelect" v-on:contentToggle="contentToggle"></v-ratingselect>
          <div class="rating-wrapper">
            <ul v-show="food.ratings && food.ratings.length">
            	<li v-show="needShow(rating.rateType, rating.text)" v-for="rating in food.ratings" class="rating-item border-1px">
            	  <div class="user">
            	    <span class="name">{{rating.username}}</span>
            	    <img class="avatar" width="12" height="12" :src="rating.avatar" alt="" />
            	  </div>
            	  <div class="time">{{rating.rateTime | formatDate}}</div>
            	  <p class="text">
            	    <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>{{rating.text}}
            	  </p>
            	</li>
            </ul>
            <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无更多内容</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import {formatDate} from 'common/js/date'; // 因为使用的是export ，暴露出一个function，还可以暴露多个function。{formatDate, abc}
  import cartcontrol from 'components/cartcontrol/cartcontrol';
  import ratingselect from 'components/ratingselect/ratingselect';
  import split from 'components/split/split';
  
  // const POSITIVE = 0; // 正面评价
  // const NEGATIVE = 1; // 负面评价
  const ALL = 2;  // 所有评价
  
  export default {
    props: {
      food: {
        type: Object
      }
    },
    data () {
      return {
        showFlag: false,
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      };
    },
    methods: {
      show () {
        this.showFlag = true;
        this.selectType = ALL;
        this.onlyContent = true;
        this.$nextTick(() => {
          // 这个组件可能会多次show，所以判断下
          if (!this.scroll) {
          	this.scroll = new BScroll(this.$refs.food, {
          	  click: true
          	});
          } else {
            this.scroll.refresh();
          }
        });
      },
      // 不传参数时，默认的就是event
      addFirst (event) {
        if (!event._constructed) {
        	return;
        }
        this.$emit('cart', event.target);
        this.$set(this.food, 'count', 1); // 第一次点击还没有count的数据
      },
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
      },
      ratingtypeSelect (type) {
        this.selectType = type;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      contentToggle (content) {
        this.onlyContent = content;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      }
    },
    filters: {
      formatDate (time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    components: {
      'v-cartcontrol': cartcontrol,
      'v-split': split,
      'v-ratingselect': ratingselect
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl';
  
  .food
    position: fixed
    top: 0
    left: 0
    bottom: 48px /*底部有购物车组件*/ 
    z-index: 30 /*需要在购物车和购物列表底下*/
    width: 100%
    background: #fff
    transition: all .5s linear
    .image-header
      position: relative
      width: 100%
      height: 0
      padding-top: 100%
      img
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
      .back
        position: absolute
        top: 10px
        left: 0
        .icon-arrow_lift
          display: block
          padding: 10px /* 点击区域变大点 */
          font-size: 20px
          color: #fff
    .content
      position: relative
      padding: 18px
      .title
        margin-bottom: 8px
        line-height: 14px
        font-size: 14px
        font-weight: 700
        color: rgb(7, 17, 27)
      .details
        height: 10px
        margin-bottom: 18px
        line-height: 10px
        font-size: 0
        .sell-count, .rating
          font-size: 10px
          color: rgb(147, 153, 159)
        .sell-count
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
      .cartcontrol-wrapper
        position: absolute
        right: 12px
        bottom: 12px
      .buy
        position: absolute
        right: 18px
        bottom: 18px
        z-index: 10
        height: 24px
        line-height: 24px
        padding: 0 12px
        box-sizing: border-box
        border-radius: 12px
        font-size: 10px
        color: #fff
        background: rgb(0, 160, 220)
        transition: all 0.2s
        &.fade-enter-to, &.fade-leave-to
          opacity: 1
        &.fade-enter-active, &.fade-leave-active
          opacity: 0
    .info
      padding: 18px
      .title
        line-height: 14px
        margin-bottom: 6px
        font-size: 14px
        color: rgb(7, 17, 27)
      .text
        line-height: 24px
        padding: 0 8px
        font-size: 12px
        font-weight: 200
        color: rgb(77, 85, 93)
    .rating
      padding-top: 18px
      .title
        line-height: 14px
        margin-left: 18px
        font-size: 14px
        color: rgb(7, 17, 27)
      .rating-wrapper
        padding: 0 18px
        .rating-item
          position: relative
          padding: 16px 0 
          border-1px(rgba(7,17,27,0.1))
          .user
            position: absolute
            top: 16px
            right: 0
            line-height: 12px
            font-size: 0
            .name
              display: inline-block
              margin-right: 6px
              vertical-align: top
              font-size: 10px
              color: rgb(147, 153, 159)
            .avatar
              border-radius: 50%    
          .time
            margin-bottom: 6px
            line-height: 12px
            font-size: 10px
            color: rgb(147, 153, 159)
          .text
            line-height: 16px
            font-size: 12px
            color: rgb(7, 17, 27)
            .icon-thumb_up, .icon-thumb_down
              margin-right: 4px
              line-height: 16px
              font-size: 12px
            .icon-thumb_up
              color: rgb(0, 160, 220)
            .icon-thumb_down
              color: rgb(147, 153, 159)
        .no-rating
          padding: 16px 0
          font-size: 12px
          color: rgb(147, 153, 159)
  .move-enter-active, .move-leave-active
    transform: translate3d(100%, 0, 0)
  .move-enter-to, .move-leave-to
    transform: translate3d(0, 0, 0)
        
        
</style>