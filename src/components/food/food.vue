<template>
  <transition name="move">
    <div v-show="showFlag" class="food">
      
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      food: {
        type: Object
      }
    },
    data () {
      return {
        showFlag: false
      };
    },
    methods: {
      show () {
        this.showFlag = true;
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .food
    position: fixed
    top: 0
    left: 0
    bottom: 48px /*底部有购物车组件*/ 
    z-index: 30 /*需要在购物车和购物列表底下*/
    width: 100%
    background: #fff
    transition: all .5s linear
  .move-enter-active, .move-leave-active
    transform: translate3d(100%, 0, 0)
  .move-enter-to, .move-leave-to
    transform: translate3d(0, 0, 0)
</style>