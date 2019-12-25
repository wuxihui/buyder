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
    position: relative;
    padding-bottom: 2000px;
    
    img {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      width: 100%;
      margin-bottom: 80px;
    }
  }
</style>