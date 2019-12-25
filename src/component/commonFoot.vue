<template>
  <div class="commonFoot-total">
    <div class="commonFoot-customer-service">
      <div class="commonFoot-customer-company">
        <img src="@/img/logo.png" />
        <div class="commonFoot-customer-p">
          {{ $t("main.enterprise") }}
        </div>
      </div>

      <div class="commonFoot-customer-center">
        <div class="commonFoot-customer-help">
          <h1>{{ $t("main.Help_center") }}</h1>
          <ul>
            <li @click="handleNovice">
              {{ $t("main.Novice_guides") }}
            </li>
            <li @click="handleOrderIssue">
              {{ $t("nav.OrderIssue") }}
            </li>
            <li @click="handleCommon">
              {{ $t("main.Common_problem") }}
            </li>
            <li @click="handleProhibited">
              {{ $t("main.Prohibited_products") }}
            </li>
          </ul>
        </div>
        <div class="commonFoot-customer-aboutus">
          <h1>{{ $t("main.About_us") }}</h1>
          <ul>
            <li @click="handleAboutBuyder">
              {{ $t("main.Company_profile") }}
            </li>
            <li>
              <router-link to="notice" tag="li">
                {{ $t("main.Journalism") }}</router-link
              >
            </li>
            <li @click="handleAboutBuyder">{{ $t("main.Contact_us") }}</li>
            <li @click="handlePrivacy">
              {{ $t("main.Confidentiality_policy") }}
            </li>
          </ul>
        </div>
        <div class="commonFoot-customer-contact">
          <h1>{{ $t("main.Contact_us") }}</h1>
          <div class="commonFoot-customer-details">
            <ul>
              <li>
                <p>{{ $t("main.office_main_address") }}</p>
                <p>{{ $t("main.mainAddress") }}</p>
                <p></p>
              </li>
              <li>
                <span>{{ $t("shopList.phone") }}:</span>
                <span
                  ><a href="tel:024 36414833">{{ mainPhone }}</a></span
                >
              </li>
              <li>
                <span>{{ $t("main.e_mail") }}:</span>
                <span
                  ><a href="mailto:contact@buyder.com">{{ email }}</a></span
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mainPhone, email } from "@/entry/index";
import { mapState, mapActions } from "vuex";
export default {
  name: "commonFoot",
  data() {
    return {
      mainPhone: "",
      email: ""
    };
  },
  computed: {
    ...mapState("car", ["isIndex", "iscCourseIndex"])
  },
  methods: {
    handleAboutBuyder() {
      //正式环境
      window.open("http://www.buyder.com/#/aboutBuyer");
      //测试环境
      //window.open("http://localhost:8080/#/aboutBuyer");
    },
    handleCompaTible() {
      document.body.scrollTop = 0;
      // firefox
      document.documentElement.scrollTop = 0;
      // safari
      window.pageYOffset = 0;
    },
    handleNovice() {
      this.$router.push("/nav");
      this.handleCompaTible();
      this.$store.commit("car/SETISCCOURSEINDEX", 1);
      this.$store.commit("car/SETISCOLOR", 1);
      this.$store.commit("car/SETISLINK", true);
      this.$store.commit("car/SETISCOLORPROBLEM", null);
      this.$store.commit("car/SETISINDEX", null);
    },
    handleOrderIssue() {
      this.$router.push("/nav");
      this.handleCompaTible();
      this.$store.commit("car/SETISCOLORPROBLEM", 1);
      this.$store.commit("car/SETISCOLOR", null);
      this.$store.commit("car/SETISINDEX", 1);
      this.$store.commit("car/SETISCCOURSEINDEX", null);
      this.$store.commit("car/SETISLINK", false);
    },
    handleCommon() {
      this.$router.push("/nav");
      this.handleCompaTible();
      this.$store.commit("car/SETISCOLORPROBLEM", 2);
      this.$store.commit("car/SETISCOLOR", null);
      this.$store.commit("car/SETISINDEX", 2);
      this.$store.commit("car/SETISCCOURSEINDEX", null);
      this.$store.commit("car/SETISLINK", false);
    },
    handleProhibited() {
      this.$router.push("/nav");
      this.handleCompaTible();
      this.$store.commit("car/SETISCCOURSEINDEX", 2);
      this.$store.commit("car/SETISCOLOR", 2);
      this.$store.commit("car/SETISCOLORPROBLEM", null);
      this.$store.commit("car/SETISINDEX", null);
      this.$store.commit("car/SETISLINK", true);
    },
    //隐秘协议
    handlePrivacy() {
      //正式环境
      window.open("http://www.buyder.com/#/privacy");
      //测试环境
      //window.open("http://localhost:8080/#/privacy");
    }
  },
  created() {
    this.mainPhone = mainPhone;
    this.email = email;
  }
};
</script>

<style scoped lang="less">
@import "~@/styles/common/variable.less";
.commonFoot-total {
  border-top: 1px solid @ccc;
  margin-top: 40px;
  .commonFoot-customer-service {
    width: 1200px;
    margin: 20px auto 60px auto;
    display: flex;
    .commonFoot-customer-company {
      margin-right: 30px;
      width: 450px;
      img {
        width: 164px;
        height: 90px;
      }
      .commonFoot-customer-p {
        line-height: 29px;
      }
    }
    .commonFoot-customer-center {
      display: flex;
      margin-top: 90px;
      .commonFoot-customer-help {
        h1 {
          font-size: 20px;
          line-height: 40px;
          border-bottom: 2px solid @home-logo;
          width: 165px;
        }
        ul {
          margin-top: 20px;
          li {
            cursor: pointer;
            font-size: 14px;
            line-height: 26px;
          }
          li:hover {
            color: @home-logo;
          }
        }
      }
      .commonFoot-customer-aboutus {
        margin-left: 60px;
        h1 {
          font-size: 20px;
          line-height: 40px;
          border-bottom: 2px solid @home-logo;
          width: 112px;
        }
        ul {
          margin-top: 20px;
          li {
            font-size: 14px;
            line-height: 26px;
            cursor: pointer;
          }
          li:hover {
            color: @home-logo;
          }
        }
      }
      .commonFoot-customer-contact {
        margin-left: 60px;
        h1 {
          width: 153px;
          font-size: 20px;
          line-height: 40px;
          border-bottom: 2px solid @home-logo;
        }
        ul {
          margin-top: 18px;
          li {
            width: 250px;
            line-height: 25px;
            font-size: 14px;
            a:hover {
              color: @home-logo;
            }
            p:nth-child(2) {
              color: @order-six;
            }
          }
          li:nth-child(2) {
            span:nth-child(2) {
              margin-left: 10px;
              cursor: pointer;
            }
          }
          li:nth-child(3) {
            span:nth-child(2) {
              margin-left: 10px;
            }
          }
          li:nth-child(1) {
            p:nth-child(3) {
              width: 210px;
              height: 2px;
              background: @order-six;
              margin: 10px 0;
            }
          }
        }
      }
    }
  }
}
</style>
