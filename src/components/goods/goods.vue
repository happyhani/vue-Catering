<template>
  <div class="goods">
    <!--左侧菜单-->
  	<div class="menu-wrapper">
  	  <ul >
  	    <li v-for="item in goods" class="menu-item">
  	      <span class="text border-1px">
  	        <v-icon :item="item"></v-icon>
  	        <!--<v-icon  v-show="item.type>0" class="icon" :class="classMap[item.type]"></v-icon>-->
  	        <!--<span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>-->
  	        {{item.name}}
  	      </span>
  	    </li>
  	  </ul>
  	</div> 
  	<!--右侧商品-->
  	<div class="foods-wrapper">
  	  
  	</div>
    
  </div>
</template>

<script type="text/ecmascript-6">
  import icon from '../icon/icon';
  const ERR_OK = 0;
  
	export default {
	  props: {
	    seller: {
	      type: Object
	    }
	  },
	  data () {
	    return {
	      goods: [] // created中获取的数据
	    };
	  },
	  created () {
	    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
	    this.$http.get('/api/goods').then((response) => {
	      response = response.data;
	      if (response.errno === ERR_OK) { // 如果成功了
	      	this.goods = response.data;
	      	console.log(this.goods);
	      };
	    });
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
        margin: 0 auto
        text-align: center
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
</style>