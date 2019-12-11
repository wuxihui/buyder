<template>
  <div class="set-total">
    <img src="@/img/jy.jpg" alt />
    <!-- <p>
      <span>{{$t("set.link")}}:</span>
      <span>http</span>
    </p>
    <p>
      <span>{{$t("set.commodity price")}}:</span>
      <input type="text" v-model="inputPrice" />
    </p>
    <p>
      <span>{{$t("set.Buying commission")}}:</span>
      <input type="text" v-model="inputFormal" />
    </p>
    <p>
      <span>{{$t("set.platform freight")}}:</span>
      <input type="text" v-model="inputPlatform" />
    </p>
    <p>
      <span>{{$t("set.specifications")}}:</span>
      <input type="text" v-model="inputRuler" :placeholder="$t('box.PleaseInput')" />
    </p>
    <p>
      <span>{{$t("details.number")}}:</span>
      <span>888</span>
    </p> -->
  </div>
</template>

<script>
export default {
  name: "set",
  data() {
    return {
      inputPrice: "",
      inputFormal: "",
      inputPlatform: "",
      inputRuler: ""
    };
  }
};
</script>

<style scoped lang="less">
@import "~@/styles/common/variable.less";
.set-total {
  width: 100%;
  // height: 770px;
  img {
    width: 100%;
    // height: 770px;
  }
  // width: 1200px;
  // margin: 0 auto;
  // display: flex;
  // flex-direction: column;
  // align-items: center;
  // justify-content: center;
  //链接
  // p:nth-child(1) {
  //   margin: 0 0 20px -155px;
  //   span {
  //     font-size: 20px;
  //     color: @home-p;
  //   }
  //   span:nth-child(1) {
  //     margin-right: 15px;
  //   }
  // }
  // //商品价格
  // p:nth-child(2) {
  //   margin-bottom: 20px;
  //   span {
  //     font-size: 20px;
  //     color: @home-p;
  //     margin-right: 15px;
  //   }
  //   input {
  //     width: 280px;
  //     height: 30px;
  //     border: 1px solid @order-li;
  //     border-radius: 4px;
  //   }
  // }
  // //代买手续费
  // p:nth-child(3) {
  //   margin: 0 0 20px 25px;
  //   span {
  //     font-size: 20px;
  //     color: @home-p;
  //     margin-right: 15px;
  //   }
  //   input {
  //     width: 280px;
  //     height: 30px;
  //     border: 1px solid @order-li;
  //     border-radius: 4px;
  //   }
  // }
  // //平台运费
  // p:nth-child(4) {
  //   margin-bottom: 20px;
  //   span {
  //     font-size: 20px;
  //     color: @home-p;
  //     margin-right: 15px;
  //   }
  //   input {
  //     width: 280px;
  //     height: 30px;
  //     border: 1px solid @order-li;
  //     border-radius: 4px;
  //   }
  // }
  // //规格
  // p:nth-child(5) {
  //   margin: 0 0 20px 85px;
  //   span {
  //     font-size: 20px;
  //     color: @home-p;
  //     margin-right: 15px;
  //   }
  //   input {
  //     width: 270px;
  //     height: 30px;
  //     border: 1px solid @order-li;
  //     border-radius: 4px;
  //     padding-left: 10px;
  //   }
  // }
  // //数量
  // p:nth-child(6) {
  //   margin: 0 0 20px -150px;
  //   span {
  //     font-size: 20px;
  //     color: @home-p;
  //     margin-right: 15px;
  //   }
  // }
}
</style>