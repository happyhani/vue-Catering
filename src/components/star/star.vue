<template>
	<div class="star" :class="starType">
		<span v-for="itemClass in itemClasses" :class="itemClass" class="star-item"> </span>
	</div>
</template>

<script type="text/ecmascript">
	const LENGTH = 5;  // 5颗星星
	let CLS_ON = 'on';
	let CLS_OFF = 'off';
	let CLS_HALF = 'half';
	
	export default {
	  // 星星的尺寸 和 类型
	  props: {
	  	size: {
	  	  type: Number
	  	},
	  	score: {
	      type: Number
	  	}
	  },
	  computed: {
	    starType () {
	      return 'star-' + this.size;
	    },
	    itemClasses () {
	      let result = [];
	      // 取值4 4.5 3.5等值
	      let score = Math.floor(this.score * 2) / 2;  
	      // 含有小数
	      let hasDecimal = score % 1!==0;
	      // 整颗星星的个数
	      let integer = Math.floor(score);
	      for (let i=0; i<integer; i++) {
	      	result.push(CLS_ON);
	      }
	      if (hasDecimal) {
	      	result.push(CLS_HALF);
	      }
	      while (result.length < LENGTH) {
	      	result.push(CLS_OFF);
	      }
	      return result;
	    }
	  },
	  data () {
	  	return {
	  	};
	  }
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
 @import '../../common/stylus/mixin.styl';
  .star
    font-size: 0
    .star-item
      display: inline-block
      background-repeat: no-repeat
      background-size: cover
    &.star-48
      .star-item
        width: 20px
        height: 20px
        margin-right: 22px
        &:last-of-type
          margin-right: 0
        &.on
          bg-image('star48_on')
        &.off
          bg-image('star48_off')
        &.half
          bg-image('star48_half')
    &.star-36
      .star-item
        width: 15px
        height: 15px
        margin-right: 6px
        &:last-of-type
          margin-right: 0
        &.on
          bg-image('star36_on')
        &.off
          bg-image('star36_off')
        &.half
          bg-image('star36_half')
    &.star-24
      .star-item
        width: 10px
        height: 10px
        margin-right: 3px
        &:last-of-type
          margin-right: 0
        &.on
          bg-image('star24_on')
        &.off
          bg-image('star24_off')
        &.half
          bg-image('star24_half')
</style>