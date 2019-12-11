<template>
  <div class="start-total">
    <el-carousel :interval="3000" arrow="always">
      <el-carousel-item
        v-for="(item, index) in urls"
        :key="index"
        @click.native="handleLink(item)"
      >
        <img :src="item.BannerURL" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      urls: "",
      imgUrls: [
        { id: 1, url: require("@/img/small-fourImg.jpg") },
        { id: 2, url: require("@/img/small-oneImg.jpg") }
      ]
    };
  },
  methods: {
    //链接跳转
    handleLink(url) {
      if (url.JumpURL != "#") {
        location.href = url.JumpURL;
      }
    }
  },
  created() {
    this.$api.getBanner().then(res => {
      let resNew = res.Data.BannerList;
      //排序方法
      // for (let i = 0; i < resNew.length - 1; i++) {
      //   if (resNew[i].Sort < resNew[i + 1].Sort) {
      //     let tmp = resNew[i + 1];
      //     resNew[i + 1] = resNew[i];
      //     resNew[i] = tmp;
      //   }
      // }
      this.urls = resNew;
    });
  }
};
</script>

<style scoped lang="less">
.start-total {
  z-index: 9;
  width: 100%;
  max-height: 780px;

  .el-carousel--horizontal {
    overflow: hidden;
  }

  /deep/.el-carousel__container {
    width: 100%;
    min-height: 780px;

    /deep/.el-carousel__item {
      width: 100%;
      max-height: 780px;

      img {
        width: 100%;
        max-height: 780px;
        cursor: pointer;
      }
    }
  }
}
</style>
