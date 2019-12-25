<template>
  <div class="foot-total">
    <div class="foot-about">
      <span>{{$t("foot.Office_address")}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "foot"
};
</script>

<style lang="less" scoped>
@import "~@/styles/common/variable.less";
.foot-total {
  display: flex;
  height: 40px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: @serve-six;
  z-index: 10;
  .foot-about {
     margin: 0 auto;
     width: 1200px;
     line-height: 40px;
     display: flex;
     justify-content: center;
     span {
       font-size: 14px;
       color: @fff;
     }
  }
}
</style>

