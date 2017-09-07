<template>
	<div class="header">
		<div class="content-wrapper">
			<div class="avatar">
				<img width="64" height="64" v-bind:src="seller.avatar"/>
			</div>
			<div class="content">
				<div class="title">
					<span class="brand"></span>
					<span class="name">{{seller.name}}</span>
				</div>
				<div class="description">
					{{seller.description}}/{{seller.deliveryTime}}分钟送达
				</div>
				<div class="support" v-if="seller.supports">
					<!--不同的type值对应不同的icon 这里叫映射-->
					<span class="icon" :class="classMap[seller.supports[0].type]"></span>
					<span class="text">{{seller.supports[0].description}}</span>
					
				</div>
			</div>
			<div v-if="seller.supports" class="support-count"  @click="detailShow=true">
				<div class="count">{{seller.supports.length}}个</div>
				<i class="icon-keyboard_arrow_right"></i>
			</div>
		</div>
		<div class="bulletin-wrapper"  @click="detailShow=true">
			<span class="bulletin-title"></span> <span class="bulletin-text">{{seller.bulletin}}</span>
			<i class="icon-keyboard_arrow_right"></i>
		</div>
		<div class="background">
			<img :src="seller.avatar"/>
		</div>
		<!--浮层 经典的css Sticky footer布局-->
		<transition name="fade">
	    <div v-show="detailShow" class="detail">
				<div class="detail-wrapper clearfix"> <!--设置最小高度是屏幕高，不然关闭按钮无法定位在最底部-->
					<div class="detail-main">         <!--设置下padding，为了给关闭按钮留下空间，否则按钮会遮盖住内容-->
						<h1 class="name">{{seller.name}}</h1>
						<div class="star-wrapper">
							<v-star :size="48" :score="seller.score"></v-star>
						</div>
						<!--也可以封装成组件-->
						<div class="title">
							<div class="line"></div>
							<div class="text">优惠信息</div>
							<div class="line"></div>
						</div>
						<ul v-if="seller.supports" class="supports">
							<li v-for="item in seller.supports" class="support-item">
								<span class="icon" :class="classMap[item.type]"></span>
								<span class="text">{{item.description}}</span>
							</li>
						</ul>
						<div class="title">
							<div class="line"></div>
							<div class="text">商家公告</div>
							<div class="line"></div>
						</div>
						<div class="bulletin">
							<p class="content">{{seller.bulletin}}</p>
						</div>
					</div>
				</div>
				<div class="detail-close" @click="detailShow=false">
				    <i class="icon-close"></i>
				</div>
		  </div>
		</transition>
	</div>
</template>

<script type="text/ecmascript">
  import star from '../star/star';
  export default {
  	props: { // 可以接收从外层传来的prop
  	  seller: {
  	    type: Object
  	  }
  	},
  	data () { // 实例化vue时，会遍历data中的变量，并添加getter和setter，当数据改变就会控制dom的显示隐藏
  	  return {
  		detailShow: false
  	  };
  	},
  	created () {
  	  this.classMap = ['decrease','discount','special','invoice','guarantee'];
  	},
  	components: {
  		'v-star': star
  	}
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl'
  
  .header
    position: relative
    overflow: hidden
    color: #fff
    background: rgba(7,17,27,0.5)
    .content-wrapper
      position: relative
      padding: 24px 12px 18px 24px
      font-size: 0 /*父元素设置该属性值为0， .avatar和.content中间不会有空隙*/
      .avatar
        display: inline-block
        vertical-align: top
        img
          border-radius: 2px
      .content
        display: inline-block
        margin-left: 16px
        .title
          margin: 2px 0 8px 0
          .brand
            display: inline-block
            vertical-align: top
            width: 30px
            height: 18px
            bg-image('brand')
            background-size: cover
            background-repeat: no-repeat
          .name
            margin-left: 6px
            font-size: 16px  
            font-weight: bold
            line-height: 18px
        .description
          margin-top: 8px
          font-size: 12px  
          line-height: 12px
        .support
          margin-top: 10px
          margin-bottom: 2px
          .icon
            display: inline-block
            vertical-align: top
            width: 12px
            height: 12px
            margin-right: 4px
            background-size: cover
            background-repeat: no-repeat
            &.decrease
              bg-image('decrease_1')
            &.discount
              bg-image('discount_1')
            &.guarantee
              bg-image('guarantee_1')
            &.invoice
              bg-image('invoice_1')
            &.special
              bg-image('special_1')
          .text
            font-size: 10px  
            line-height: 12px
      .support-count
        position: absolute
        bottom: 18px
        right: 12px
        padding: 0 8px
        height: 24px
        line-height: 24px
        border-radius: 14px
        background-color: rgba(0,0,0,0.2)
        text-align: center
        .count
          display: inline-block
          font-size: 10px
        .icon-keyboard_arrow_right
          margin-left: 2px
          line-height: 24px
          font-size: 10px
    .bulletin-wrapper
      position: relative
      height: 28px
      line-height: 28px
      padding: 0 22px 0 12px
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
      background: rgba(7, 17, 27, 0.2)
      .bulletin-title
        display: inline-block
        vertical-align: middle
        width: 22px
        height: 12px
        bg-image('bulletin')
        background-size: cover
        background-repeat: no-repeat
      .bulletin-text
        font-size: 10px
        margin: 0 4px
      .icon-keyboard_arrow_right
        position: absolute
        right: 12px
        top: 10px
        font-size: 10px
    .background
      position: absolute
      top: 0
      left: 0
      z-index: -1
      width: 100%
      height: 100%
      filter: blur(10px)  /*模糊效果*/
      img
        width: 100%
        height: 100%
    /*进入时：元素的类名 detail fade-enter-active fade-enter-to*/
    /*关闭时 detail fade-leave-active fade-leave-to*/
    .fade-enter-active, .fade-leave-active
      transition: opacity .5s 
	  .fade-enter-to, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */
	    opacity: 0
	  	.detail 
	      position: fixed
	      z-index: 100
	      top: 0
	      left: 0
	      width: 100%
	      height: 100%
	      overflow: auto
	      background: rgba(7, 17, 27, 0.8)
	      backdrop-filter: blur(10px)  /*蒙层下方的内容模糊，只有ios上*/
	      .detail-wrapper
	        width: 100%
	        min-height: 100%
	        .detail-main
	          margin-top: 64px
	          padding-bottom: 64px /*定位在最下方的close按钮*/
	          .name
	            line-height: 16px
	            text-align: center
	            font-size: 16px
	            font-weight: 700
	          .star-wrapper
	            margin-top: 18px
	            padding: 2px 0
	            text-align: center
	          .title
	            display: flex /*父级使用*/
	            width: 80%
	            margin: 28px auto 24px
	            .line
	              flex: 1
	              position: relative
	              top: -6px
	              border-bottom: 1px solid rgba(255, 255, 255, 0.2)
	            .text
	              /*flex: 0.7
	              text-align: center*/
	              padding: 0 12px
	              font-size: 14px
	              font-weight: 700
	          .supports
	            width: 80%
	            margin:0 auto
	            .support-item
	              padding: 0 12px
	              margin-bottom: 12px
	              font-size: 0
	              &:last-of-type
	                margin-bottom: 0
	              .icon
	                display: inline-block
	                vertical-align: top
	                width: 16px
	                height: 16px
	                margin-right: 6px
	                background-size: cover
	                background-repeat: no-repeat
	                &.decrease
	              	  bg-image('decrease_2')
	            	&.discount
	                  bg-image('discount_2')
	                &.guarantee
	                  bg-image('guarantee_2')
	                &.invoice
	                  bg-image('invoice_2')
	                &.special
	                  bg-image('special_2')
	              .text
	                line-height: 16px
	                font-size: 12px
	          .bulletin
	            width: 80%
	            margin: 0 auto
	            .content
	              padding: 0 12px
	              line-height: 24px
	              font-size: 12px
	      .detail-close
	        position: relative
	        width: 32px
	        height: 32px
	        margin: -64px auto 0
	        clear: both
	        font-size: 32px
</style>