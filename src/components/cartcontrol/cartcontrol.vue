<template>
  <div class="cartcontrol">
    <transition name="roll">
      <div class="cart-decrease" v-show="food.count>0" @click="decrCart($event)">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click="addCart($event)"></div>
  </div>
</template>

<script type="text/ecmascript">
  export default {
    props: {
      food: {
        type: Object
      }
    },
    created () {
//    console.log(this.food);        
    },
    methods: {
      addCart (event) {
        if (!event._constructed) {
        	return;
        }
        if (!this.food.count) {
//      	this.food.count = 1; 
        	this.$set(this.food, 'count', 1);
        }else {
          this.food.count++;
        }
        console.log('cli//ck');
        //this.$dispatch('cart.add', event.target); // 传递给父组件
        this.$emit('cart', event.target);
      },
      decrCart (event) {
        if (!event._constructed) {
          return;
        }
        if (this.food.count) {
          this.food.count--;
        }
      }
    },
    computed: {
    }  
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl';
  .cartcontrol
    font-size: 0
    .cart-decrease
      display: inline-block
      padding: 6px
      transition: all .5s linear
      .inner
        display: inline-block
        line-height: 24px
        font-size: 24px
        color: rgb(0,160,220)
        transition: all .5s linear
    .roll-enter-active, .roll-leave-to
      opacity: 0
      transform: translate3d(24px, 0, 0)
      .inner
        transform: rotateZ(180deg)
    .roll-enter-to
      opacity: 1
      transform: translate3d(0, 0, 0)
      .inner
        transform: rotateZ(0)
    .cart-count
      display: inline-block
      vertical-align: top
      padding-top: 6px
      width: 12px
      line-height: 24px
      text-align: center
      font-size: 10px
      color: rgb(147,153,159)   
    .cart-add
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color: rgb(0,160,220) 
</style>