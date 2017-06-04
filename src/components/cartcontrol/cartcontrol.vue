<template>
  <!-- template只能有一个根节点目录 -->
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease" v-show="food.count>0" @click="decreaseCart">
        <span class="icon-remove_circle_outline inner"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add" @click="addCart">
      <span class="icon-add_circle"></span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'cartcontrol',
    props: {
      food: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      addCart(event) {
        if (!event._constructed) {
          return
        }
        if (!this.food.count) {
          this.$set(this.food, 'count', 1)
        } else {
          this.food.count++
        }
        this.$emit('cart-add', event.target)
      },
      decreaseCart(event) {
        /* 防止多次点击   */
        if (!event._constructed) {
          return
        }
        if (this.food.count) {
          this.food.count--
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .cartcontrol
    font-size: 0
    .cart-decrease
      display: inline-block
      padding: 6px
      transition: all 0.4s linear
      opacity: 1
      transform: translate3D(0, 0, 0)
      .inner
        display: inline-block
        line-height: 24px
        font-size: 24px
        color: rgb(0, 160, 220)
        transition: all 0.4s linear
        transform: rotate(0)
      /* 插入dom之前和移除dom之后 平移和滚动效果 */
      &.move-enter, &.move-leave-active
        opacity: 0
        transform: translate3D(24px, 0, 0)
        .inner
          transform: rotate(180deg)
    .cart-count
      display: inline-block
      vertical-align: top
      width: 12px
      padding-top: 6px
      line-height: 24px
      text-align: center
      font-size: 10px
      color: rgb(147, 153, 159)
    .cart-add
      display: inline-block
      line-height: 24px
      font-size: 24px
      padding: 6px
      color: rgb(0, 160, 220)
</style>
