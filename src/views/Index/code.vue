<template>
  <div class="code-total">
    <img src="@/img/daimaiye.jpg" />
  </div>
</template>

<script>
  export default {
    name: "Code"
  };
</script>

<style scoped lang="less">
  .code-total {
    //width: 100%;
    position: relative;
    //padding-bottom: 60px;
    img {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      //min-width: 1366px;
      width: 100%;
      margin-bottom: 80px;
    }
  }
</style>