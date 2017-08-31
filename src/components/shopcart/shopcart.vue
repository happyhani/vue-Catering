<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo">
            <span class="icon-shopping_cart"></span>
          </div>
        </div>
        <div class="price">
          
        </div>
        <div class="desc"></div>
      </div>
      <div class="content-right">
                        ￥{{}}起送
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript">
  export default { 
    data () {
      return {
        goods: {}
      }
    },
    created () {
      this.$http.get('/api/goods').then((response) => {
        this.goods = response.data.data;
        console.log(this.goods);
      });
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl';
  .shopcart
    position: fixed
    left: 0
    bottom: 0
    z-index: 999
    width: 100%
    height: 48px
    .content
      display: flex
      background: #141d27
      font-size: 0
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
            .icon-shopping_cart
              font-size: 24px
              line-height: 44px
              color: #80858a
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
        .desc  
          display: inline-block
      .content-right
        flex: 0 0 105px
        width: 105px
</style>