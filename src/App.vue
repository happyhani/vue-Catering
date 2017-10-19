<template>
  <div>
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
      	<router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
      	<router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
      	<router-link to="/seller">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript">
//	(function (doc, win) {
//	    var docEl = doc.documentElement,
//	        clientWidth = docEl.clientWidth;
//	    docEl.style.fontSize = clientWidth / 7.5 + 'px';
//	})(document, window);
  import {urlParse} from './common/js/util';
	import header from './components/header/header.vue';
	
	const ERR_OK = 0;
	
	export default {
		data () {  // 不能定义为一个对象，因为组件会复用，如果修改了，每个引用组件都会被修改，所以定义为方法
			return {
				seller: {
				  id: (() => {
				    let queryParam = urlParse();
				    console.log(queryParam.id);
				    return queryParam.id;
				  })()
				}
			};
		},
		created () {
			this.$http.get('/api/seller?id=' + this.seller.id).then((response) => {
				response = response.data;
				if (response.errno === ERR_OK) {
					// this.seller = response.data; 不能直接赋值，这样会把this.seller.id给干掉。
					// 参数一：最终接受的数据，最后返回的结果用空的{}. response.data中是不包含参数id的值的。这里是vue推荐的给数据增加属性的方法
					this.seller = Object.assign({}, this.seller, response.data);
					console.log(this.seller.id);
					// __ob__:Observer 是vue自动加的监听，如果数据修改了，他的修改能自动映射到dom上
//					console.log(this.seller);
				}
			});
		},
		components: {
			'v-header': header
		}
	};
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import './common/stylus/mixin.styl'
  .tab
    display: flex
    width: 100%
    height: 40px
    line-height: 40px /*字体16px*/
    border-1px(rgba(7,17,27,0.1))
    .tab-item
      flex: 1
      text-align: center
      & > a
        display: block
        font-size: 14px
        color: rgb(77,85,93)
        &.active
          color: rgb(240,20,20)
</style>
<style type="text/css">
	.a {
		transform: scaleY(0.5);
		-webkit-transform: scaleY(0.5);
		/*position: relative;*/
	}
	
</style>