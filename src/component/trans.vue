<template>
  <div class="trans-total">
    <div class="trans-account">
      <!-- 账号 -->
      <div class="trans-circle">
        <!-- 主题 -->
        <div class="trans-title">
          <p></p>
        </div>
        <h1>1.{{$t("trans.Register a haidaibao account")}}</h1>
      </div>
      <div class="trans-registered">{{$t("trans.Register with your phone number")}}</div>

      <img src="@/img/small-fourImg.jpg" />
    </div>
  </div>
</template>

<script>
export default {
  name: "trans"
};
</script>

<style scoped lang="less">
.trans-total {
  margin: -65px 0 0 100px;
  .trans-account {
    //账号
    .trans-circle {
      display: flex;
      h1 {
        font-size: 20px;
        font-weight: 900;
        color: #1e90ff;
        margin: 1px 0 0 10px;
      }
      //主题
      .trans-title {
        width: 25px;
        height: 25px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: red;
        border-radius: 50%;
        p {
          width: 10px;
          height: 10px;
          background: green;
          border-radius: 50%;
        }
      }
    }
    //注册
    .trans-registered {
      margin: 10px 0 0 40px;
      font-size: 14px;
    }
    img {
      width: 800px;
      height: 400px;
      margin: 40px 0 0 40px;
    }
  }
}
</style>