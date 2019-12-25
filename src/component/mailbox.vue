<template>
  <div class="mailbox-content">
    <a href="tel:024 36414833" :title="$t('main.Service_phone')">
      <img src="@/img/dianhua.png" slot="reference" alt />
    </a>
    <a href="mailto:contact@buyder.com" :title="$t('headerTop.emalis')"
      ><img src="@/img/youxiang.png" alt
    /></a>
    <a
      href="http://www.facebook.com/buyderorderhangtrungquoc"
      target="_blank"
      :title="$t('main.Official_WeChat')"
      ><img src="@/img/face.png" alt
    /></a>
  </div>
</template>

<script>
export default {
  name: "mailbox"
};
</script>

<style scoped lang="less">
@import "~@/styles/common/variable.less";
.mailbox-content {
  position: fixed;
  bottom: 155px;
  right: 20px;
  display: flex;
  flex-direction: column;
  z-index: 10;
  a {
    cursor: pointer;
    width: 60px;
    margin: 5px 0;
    height: 60px;
    background: @calculator-h;
    border-radius: 50%;
    text-align: center;
    line-height: 80px;
    display: inline-block;
    img {
      width: 30px;
      height: 30px;
    }
  }
}
</style>
