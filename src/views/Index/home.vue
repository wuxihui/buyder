<template>
  <div class="start-total">
    <el-dialog
      title
      :visible.sync="dialogVisible"
      width="650px"
      :before-close="handleClose"
    >
      <span>
        <img src="@/img/haituotong.png" />
      </span>
    </el-dialog>
    <!-- 轮播图 -->
    <el-carousel :height="bannerH + 'px'" :interval="3000" arrow="always">
      <el-carousel-item v-for="(item, index) in urls" :key="index">
        <img :src="item.BannerURL" :height="bannerH + 'px'" />
      </el-carousel-item>
    </el-carousel>

    <div class="start-buy-process">
      <h1>{{ $t("main.fast_process") }}</h1>
      <ul>
        <li v-for="item in process" :key="item.id">
          <img :src="item.img" />
          <p>{{ item.name }}</p>
        </li>
      </ul>
    </div>

    <div class="start-server">
      <div class="start-title">
        <h1>{{ $t("main.our_server") }}</h1>
        <img src="@/img/serve.png" />
        <p>{{ $t("main.preferential_price") }}</p>
      </div>

      <div class="start-serve-cation">
        <ul>
          <li v-for="items in serves" :key="items.id">
            <transition name="el-zoom-in-top">
              <div v-show="show" class="start-serve-show">
                <img :src="items.img" />
                <div class="start-serve-details">
                  <h2>{{ items.title }}</h2>
                  <p>{{ items.name }}</p>
                </div>
              </div>
            </transition>
          </li>
        </ul>
      </div>
    </div>

    <div class="start-process">
      <div class="start-content">
        <ol>
          <li v-for="items in worrys" :key="items.id">{{ items.name }}</li>
        </ol>
      </div>
    </div>

    <div class="start-price">
      <h1>{{ $t("main.Contact_us") }}</h1>
      <ul>
        <li>
          <img src="@/img/fuwuphone.jpg" />
          <div class="start-price-details">
            <p>{{ $t("main.Service_phone") }}</p>
            <p>
              <a href="tel:024 36414833">{{ mainPhone }}</a>
            </p>
          </div>
        </li>
        <li>
          <img src="@/img/hezuo.jpg" />
          <div class="start-price-details">
            <p>{{ $t("main.Market_cooperation") }}</p>
            <p>
              <a href="mailto:contact@buyder.com">{{ email }}</a>
            </p>
          </div>
        </li>
        <li>
          <img src="@/img/onlinekefu.jpg" />
          <div class="start-price-details">
            <p>{{ $t("main.Online_Service") }}</p>
          </div>
        </li>
        <li>
          <img src="@/img/facebook.jpg" />
          <div class="start-price-details">
            <p>{{ $t("main.Official_WeChat") }}</p>
            <p>
              <a
                href="http://www.facebook.com/buyderorderhangtrungquoc"
                target="_blank"
                >buyder</a
              >
            </p>
          </div>
        </li>
      </ul>
    </div>

    <div class="start-cooperation">
      <h1>{{ $t("main.Cooperative_partner") }}</h1>
      <div class="start-partners">
        <ul>
          <li @click="handleTaobao">
            <img src="@/img/taobao.png" alt />
          </li>
          <li @click="handleTianmao">
            <img src="@/img/tianmao.png" alt />
          </li>
          <li @click="handleOneSixEight">
            <img src="@/img/sixeight.png" alt />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mainPhone, email } from "@/entry/index";
export default {
  name: "Home",
  data() {
    return {
      dialogVisible: true,
      urls: "",
      bannerH: 200,
      bannerW: 200,
      mainPhone: "",
      show: false,
      worrys: [
        {
          id: 1,
          name: this.$t("main.save_money")
        },
        {
          id: 2,
          name: this.$t("main.Save_time")
        },
        {
          id: 3,
          name: this.$t("main.Labor_saving")
        }
      ],
      serves: [
        {
          id: 1,
          img: require("@/img/daigou.png"),
          title: this.$t("main.purchasing_service"),
          name: this.$t("main.dealing_with")
        },
        {
          id: 2,
          img: require("@/img/guoji.png"),
          title: this.$t("main.cargo_service"),
          name: this.$t("main.Chinese_transporter")
        },
        {
          id: 3,
          img: require("@/img/kuaidi.png"),
          title: this.$t("main.express_service"),
          name: this.$t("main.consumer_hands")
        },
        {
          id: 4,
          img: require("@/img/fuwu.png"),
          title: this.$t("main.fulfillment"),
          name: this.$t("main.package_service")
        }
      ],
      process: [
        {
          id: 1,
          img: require("@/img/dingdan.jpg"),
          name: this.$t("main.purchase_order")
        },
        {
          id: 2,
          img: require("@/img/caigouruku.jpg"),
          name: this.$t("main.Purchase_warehousing")
        },
        {
          id: 3,
          img: require("@/img/zhifuyunfei.jpg"),
          name: this.$t("main.Payment_of_freight")
        },
        {
          id: 4,
          img: require("@/img/shouquhuo.jpg"),
          name: this.$t("main.Receiving_goods")
        }
      ],
      imgUrls: [
        { id: 1, url: require("@/img/small-fourImg.jpg") },
        { id: 2, url: require("@/img/small-oneImg.jpg") }
      ]
    };
  },
  methods: {
    setBannerH() {
      let width =
        document.documentElement.clientWidth || document.body.clientWidth;
      this.bannerH = width / 3.2;
    },
    //淘宝
    handleTaobao() {
      window.open("https://www.taobao.com/");
    },
    //天猫
    handleTianmao() {
      window.open("https://www.tmall.com/");
    },
    //1688
    handleOneSixEight() {
      window.open("https://www.1688.com/");
    },
    //关闭弹框
    handleClose() {
      this.dialogVisible = false;
    },
    //链接跳转
    handleLink(url) {
      if (url.JumpURL != "#") {
        location.href = url.JumpURL;
      }
    },
    //滚动条事件
    handleScroll(e) {
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (scrollTop && scrollTop < 360) {
        this.show = false;
      }
      if (scrollTop && scrollTop > 360) {
        this.show = true;
      }
      if (scrollTop && scrollTop > 1440) {
        this.show = false;
      }
    }
  },
  created() {
    this.email = email;
    this.$api.getBanner().then(res => {
      let resNew = res.Data.BannerList;
      this.urls = resNew;
    });
    //监听滚动条事件
    window.addEventListener("scroll", this.handleScroll, true);
    this.mainPhone = mainPhone;
  },
  mounted() {
    this.setBannerH();
    window.addEventListener(
      "resize",
      () => {
        this.setBannerH();
      },
      false
    );
  }
};
</script>

<style scoped lang="less">
@import "~@/styles/common/variable.less";
.start-total {
  z-index: 9;
  width: 100%;
  /deep/.el-dialog {
    height: 700px;
  }
  .el-carousel--horizontal {
    overflow: hidden;
  }
  /deep/.el-carousel__container {
    /deep/.el-carousel__item {
      img {
        width: 100%;
        cursor: pointer;
      }
    }
  }
  /deep/.el-dialog__close,
  .el-icon,
  .el-icon-close {
    color: @fff;
  }
  /deep/.el-dialog__body {
    padding: 0;
    img {
      width: 650px;
      height: 700px;
    }
  }
  /deep/.el-dialog__header {
    padding: 0;
  }
  .start-process {
    height: 500px;
    margin-top: 20px;
    background: @fff url("../../img/gaotie.jpg") no-repeat fixed;
    overflow: hidden;
    img {
      width: 100%;
      height: 500px;
    }
    .start-content {
      width: 1200px;
      margin: 0 auto;
      ol {
        margin-top: 145px;
        display: flex;
        li {
          width: 200px;
          height: 200px;
          background: @home-logo;
          opacity: 0.8;
          border-radius: 50%;
          line-height: 200px;
          text-align: center;
          color: @fff;
          font-size: 20px;
          margin: 0 100px;
        }
      }
    }
  }
  .start-buy-process {
    h1 {
      margin-top: 15px;
      // margin-top: 1%;
      text-align: center;
      font-size: 20px;
    }
    ul {
      display: flex;
      justify-content: center;
      li {
        margin: 0 5px;
        width: 250px;
        text-align: center;
        img {
          width: 38px;
          height: 40px;
          margin: 30px 0 10px 10px;
        }
        p {
          margin-left: 10px;
          font-size: 18px;
        }
      }
    }
  }
  .start-server {
    width: 1200px;
    margin: 0 auto;
    margin-top: 30px;
    .start-title {
      width: 100%;
      text-align: center;
      margin: 50px 0 10px 0;
      h1 {
        font-size: 20px;
      }
      img {
        width: 70px;
        height: 60px;
        margin: 20px 0;
      }
    }
    .start-serve-cation {
      ul {
        display: flex;
        flex-wrap: wrap;
        li {
          width: 550px;
          height: 150px;
          margin: 10px;
          border-radius: 5px;
          padding: 0 10px;
          .start-serve-show {
            display: flex;
            img {
              width: 100px;
              height: 100px;
              margin: 26px 10px 0 20px;
            }
            h2 {
              margin: 20px 0 5px 0;
              font-size: 18px;
              color: @home-logo;
            }
            p {
              font-size: 14px;
              line-height: 23px;
            }
          }
        }
        li:hover {
          background: @home-logo;
          h2 {
            color: @nav-tutorial;
          }
          p {
            color: @fff;
          }
        }
      }
    }
  }
  .start-price {
    width: 1200px;
    margin: 0 auto;
    h1 {
      text-align: center;
      font-size: 22px;
      // font-weight: 900;
      margin-top: 40px;
    }
    ul {
      display: flex;
      justify-content: center;
      margin-top: 30px;
      li {
        display: flex;
        margin: 0 20px;
        img {
          width: 50px;
          height: 50px;
          margin-right: 18px;
        }
        .start-price-details {
          p:nth-child(1) {
            font-size: 18px;
            margin-bottom: 10px;
            min-width: 150px;
          }
          p:nth-child(2) {
            a:hover {
              color: @home-logo;
            }
          }
        }
      }
      li:nth-child(1) {
        p:nth-child(2) {
          cursor: pointer;
        }
      }
    }
  }
  .start-cooperation {
    width: 1200px;
    margin: 0 auto;
    h1 {
      text-align: center;
      margin-bottom: 30px;
      font-size: 22px;
      margin-top: 45px;
    }
    .start-partners {
      ul {
        display: flex;
        justify-content: center;
        li {
          margin: 0 20px;
          width: 100px;
          height: 30px;
          border: 1px solid @ccc;
          padding: 10px;
          cursor: pointer;
          img {
            width: 100px;
            height: 38px;
          }
        }
        li:hover {
          color: @home-logo;
        }
        li:nth-child(2) {
          img {
            width: 120px;
            height: 50px;
            position: relative;
            top: -12px;
            right: 10px;
          }
        }
      }
    }
  }
}
</style>
