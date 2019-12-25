<template>
  <div class="home-head">
    <!-- logo  -->
    <div class="home-logo" @click="handleJump" :title="$t('main.Home')">
      <img src="@/img/logo.png" alt />
    </div>
    <div class="home-search">
      <el-input
        :placeholder="$t('headerTop.platform-automatic')"
        v-model="inputVal"
        class="home-txt"
        clearable
      >
      </el-input>
      <div class="home-go" @click="handleDetails">
        <img src="@/img/home-go.png" class="home-img-go" />
      </div>
    </div>
    <div class="home-state" @click="handleCar">
      <img src="@/img/cart.png" class="home-cart" />
      <p>{{ $t("headerTop.myCart") }}</p>
    </div>
    <div class="home-information">
      <!-- 登录 -->
      <div class="home-login">
        <el-button type="text" @click="loginEvent" v-if="emails === ''">{{
          $t("headerTop.login")
        }}</el-button>
        <el-dropdown v-if="emails !== ''" placement="bottom">
          <span class="el-dropdown-link">{{ emails }}</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="handlePersonal">{{
              $t("headerTop.Personal center")
            }}</el-dropdown-item>
            <el-dropdown-item @click.native="handlePassword">{{
              $t("headerTop.Change the password")
            }}</el-dropdown-item>
            <el-dropdown-item @click.native="handleExit">{{
              $t("headerTop.exit")
            }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <!-- 注册 -->
      <el-button
        type="text"
        @click="dialogVisibleRegist = true"
        v-if="emails === ''"
        >{{ $t("headerTop.registered") }}
      </el-button>

      <!-- 国旗 -->
      <div class="home-countries">
        <el-dropdown placement="bottom">
          <span class="el-dropdown-link">
            <img :src="imgUrlOne" alt />
          </span>
          <el-dropdown-menu slot="dropdown">
            <ul class="home-flags">
              <li @click="handleGuojia">
                <img src="@/img/Vietnam.png" />
                <span>{{ $t("headerTop.Vietnam") }}</span>
              </li>
            </ul>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <!-- 找回密码弹框 -->
    <div class="home-account-back">
      <el-dialog
        title
        :visible.sync="dialogVisibleAccount"
        width="550px"
        :before-close="handleCloseAccount"
      >
        <p @click="handleReturn">
          <i class="el-icon-arrow-left"></i>
          {{ $t("headerTop.return") }}
        </p>
        <h1>{{ $t("headerTop.account_retrieval") }}</h1>
        <div class="home-forget-content">
          <ul>
            <li>
              <input
                type="text"
                v-model="inputEmailsVal"
                :placeholder="$t('forget.enter_email')"
              />
            </li>
          </ul>
          <button @click="handleConfirm">{{ $t("forget.confirm") }}</button>
        </div>
      </el-dialog>
    </div>

    <!-- 修改密码弹框 -->
    <div class="home-eidioter-password">
      <el-dialog
        title
        :visible.sync="dialogVisible"
        width="550px"
        :before-close="handleClose"
      >
        <p>{{ $t("headerTop.Change the password") }}</p>
        <ul>
          <li>
            <input
              type="password"
              v-model="inputOriginalVal"
              :placeholder="$t('headerTop.original-password')"
            />
          </li>
          <li>
            <input
              type="password"
              v-model="inputNewPassword"
              :placeholder="$t('headerTop.new-password')"
            />
          </li>
          <li>
            <input
              type="password"
              v-model="inputRepeatVal"
              :placeholder="$t('headerTop.new-password-again')"
            />
          </li>
        </ul>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handleDetermine">{{
            $t("shopList.determine")
          }}</el-button>
        </span>
      </el-dialog>
    </div>

    <!-- 弹框 -->
    <div class="home-modle">
      <!-- 登录弹框 -->
      <div class="home-denglu">
        <el-dialog
          title
          :visible.sync="IsOrShow"
          width="550px"
          :before-close="closeLoginEvent"
        >
          <h1>{{ $t("headerTop.Buyer_count_login") }}</h1>
          <!--登录账号 -->
          <div class="home-login-account">
            <i class="el-icon-user"></i>
            <input
              type="text"
              :placeholder="$t('headerTop.Please enter email')"
              v-model="accountVal"
            />
          </div>
          <!-- 登录密码 -->
          <div class="home-login-password">
            <i class="el-icon-lock"></i>
            <input
              type="password"
              v-model="passwordVal"
              :placeholder="$t('headerTop.Please enter password')"
            />
          </div>
          <el-button
            type="primary"
            @click="handleLogin"
            @keyup.enter="handleLogin"
            >{{ $t("headerTop.login") }}
          </el-button>
          <div class="home-password-opera">
            <p @click="handleForget">{{ $t("headerTop.Forgot password") }}</p>
            <p @click="handleRegisterNow">{{ $t("headerTop.Register now") }}</p>
          </div>
          <!-- <span slot="footer" class="dialog-footer">
         
          </span>-->
        </el-dialog>
      </div>

      <!-- 注册弹框 -->
      <div class="home-zhuce">
        <el-dialog
          title
          :visible.sync="dialogVisibleRegist"
          width="550px" 
          :before-close="handleCloseRegin"
        >
          <p v-if="isReturn" @click="handleIsRereturn">
            <i class="el-icon-arrow-left"></i>
            {{ $t("headerTop.return") }}
          </p>
          <!-- <div class="home-resit-model"> -->
          <!--注册邮箱 -->
          <h1>{{ $t("headerTop.buyer_account") }}</h1>
          <div class="home-resign-account">
            <i class="el-icon-message"></i>
            <input
              type="text"
              :placeholder="$t('headerTop.register-email')"
              v-model="emailVal"
            />
            
          </div>
            
          <div class="home-enter-code">
            <i class="el-icon-message"></i>
            <input
              type="text"
              :placeholder="$t('headerTop.please_enter_verification_code')"
              v-model="VCode"
            />
          </div>
          <span class="get-vcode" >
            <el-button
              type="primary"
              @click="SendEmailVCode"
            >
              {{$t('headerTop.get_verification_code')}}
            </el-button>
          </span>

          <div style="clear:both"></div>

          <!--注册密码 -->
          <div class="home-resign-password">
            <i class="el-icon-lock"></i>
            <input
              type="password"
              v-model="passwordResitVal"
              :placeholder="$t('headerTop.new-password')"
            />
          </div>

          <!-- 确认密码 -->
          <div class="home-confirm-password">
            <i class="el-icon-lock"></i>
            <input
              type="password"
              v-model="passwordComfirm"
              :placeholder="$t('headerTop.enter-the-password-again')"
            />
          </div>

          <!-- 同意服务 -->
          <div class="home-server-agree">
            <input type="checkbox" v-model="inputCheckVal" />
            <span @click="handleRouter">{{
              $t("headerTop.Consent to service agreement")
            }}</span>
          </div>
          <span slot="footer" class="dialog-footer">
            <!-- 确认注册按钮 -->
            <el-button
              type="primary"
              @click="handleResit"
              @keyup.enter="handleResit"
            >
              {{ $t("headerTop.Confirm the registration") }}</el-button
            >
          </span>
          <!-- </div> -->
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { setAccess, deleteRemove, getObtain } from "@/unilts/auth";
import { CountryCode, buYer } from "@/entry/index";
import { deepCopy } from "@/algo/index";
import { mapState, mapActions } from "vuex";
import "@/md5/jQuery.md5";
import { log } from "util";
export default {
  name: "headerTop",
  data() {
    let emails = getObtain();
    if (emails) {
      emails = JSON.parse(emails).resData;
    } else {
      emails = "";
    }
    return {
      isReturn: false,
      inputEmailsVal: "", //找回密码input框
      inputOriginalVal: "",
      inputNewPassword: "",
      inputRepeatVal: "",
      dialogVisibleAccount: false,
      dialogVisible: false,
      //暂时注释
      // imgUrls: [
      //   { id: 1, url: require("@/img/china.png"), name: this.$t('headerTop.china') },
      //   { id: 2, url: require("@/img/Vietnam.png"), name: this.$t('headerTop.Vietnam') }
      // ],
      imgUrlOne: require("@/img/Vietnam.png"),
      inputVal: "",
      fullscreenLogin: false,
      emails: emails,
      accountVal: "",
      passwordVal: "",
      passwordResitVal: "",
      emailVal: "",
      VCode:"",
      passwordComfirm: "",
      inputCheckVal: false,
      dialogVisibleRegist: false
    };
  },
  computed: {
    ...mapState("header", [
      "detailsList",
      "imgList",
      "IsOrShow",
      "isActive",
      "thousand"
    ]),
    ...mapState("header", ["styleLists"]), //商品类型分类
    ...mapState("car", ["rate"])
  },
  methods: {
    ...mapActions("header", ["getDetailsList"]),
    //忘记密码弹框返回
    handleReturn() {
      this.$store.commit("header/SETISTANKUANG", true);
      this.dialogVisibleAccount = false;
    },
    //忘记密码弹框确认按钮
    handleConfirm() {
      let params = {
        Email: this.inputEmailsVal
      };
      if (this.inputEmailsVal == "") {
        this.$message({
          message: this.$t("forget.enter_email"),
          type: "warning"
        });
      } else {
        this.$api.forgetPassword(params).then(res => {
          if (res.Data) {
            this.$message({
              message: this.$t("forget.change_password"),
              type: "success"
            });
            this.dialogVisibleAccount = false;
            this.inputEmailsVal = "";
          } else {
            this.$message({
              message: res.Msg,
              type: "warning"
            });
          }
        });
      }
    },
    //logo
    handleJump() {
      this.$router.push("home");
    },
    //關閉找回密碼彈框
    handleCloseAccount() {
      this.accountVal = "";
      this.passwordVal = "";
      this.inputEmailsVal = "";
      this.dialogVisibleAccount = false;
    },
    //icon關閉注冊彈框
    handleCloseRegin() {
      this.isReturn = false;
      this.dialogVisibleRegist = false;
      this.inputCheckVal = false;
      this.passwordResitVal = "";
      this.passwordComfirm = "";
      this.emailVal = "";
      this.VCode = "";
    },
    //注冊返回
    handleIsRereturn() {
      this.$store.commit("header/SETISTANKUANG", true);
      this.dialogVisibleRegist = false;
      this.isReturn = false;
    },
    //国旗跳转
    handleGuojia() {
      //console.log(this.rate);
    },
    //改变国旗
    handleChangeImg(url) {
      this.imgUrlOne = url;
    },
    //语言切换
    handleSwitch(lang) {
      this.$i18n.locale = lang;
      localStorage.setItem("lang", lang);
    },
    //关闭弹框
    handleClose() {
      this.dialogVisible = false;
    },
    //修改密码
    handleDetermine(done) {
      let UserCode = JSON.parse(getObtain()).resNew;
      let emails = JSON.parse(getObtain()).resData;
      let params = {
        CountryCode: CountryCode,
        Email: emails,
        UserCode: UserCode,
        OldPassword: $.md5(this.inputOriginalVal),
        NewPassword: $.md5(this.inputNewPassword),
        NewSPassword: $.md5(this.inputRepeatVal)
      };
      let regPassWord = /^[\w]{6,12}$/;
      if (!regPassWord.test(this.inputNewPassword)) {
        this.$message({
          message: this.$t("headerTop.Minimum-six-digits"),
          type: "warning"
        });
      } else if (this.inputNewPassword !== this.inputRepeatVal) {
        this.$message({
          message: this.$t("headerTop.passwords-not-match"),
          type: "warning"
        });
      } else if (this.inputNewPassword === "") {
        this.$message({
          message: this.$t("headerTop.password-cannot-empty"),
          type: "warning"
        });
      } else if (this.inputRepeatVal === "") {
        this.$message({
          message: this.$t("headerTop.enter-the-password-again"),
          type: "warning"
        });
      } else if (this.inputOriginalVal === "") {
        this.$message({
          message: this.$t("headerTop.enter-the-original-password"),
          type: "warning"
        });
      } else {
        //修改密码,post
        this.$api.changePassword(params).then(res => {
          if (res.Data) {
            (this.inputOriginalVal = ""),
              (this.inputNewPassword = ""),
              (this.inputRepeatVal = "");
            this.$message({
              message: this.$t("headerTop.Modify-successfully"),
              type: "success"
            });
            deleteRemove();
            this.$router.replace("home");
            this.dialogVisible = false;
          } else {
            this.$message({
              message: res.Msg,
              type: "warning"
            });
          }
        });
      }
    },
    //获取details图, 暂时不全，还在增加中
    handleDetails() {
      let reg = /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+$/;
      if (this.inputVal == "") {
        this.$message({
          message: this.$t("headerTop.Please-link"),
          type: "warning"
        });
      } else {
        if (!reg.test(this.inputVal)) {
          this.$message({
            message: this.$t("headerTop.Please-enter-the-link"),
            type: "warning"
          });
        } else if (
          this.inputVal.indexOf("taobao.com") > -1 ||
          this.inputVal.indexOf("tmall.com") > -1
        ) {
          let params = {
            URL: this.inputVal,
            rate: this.rate
          };
          this.getDetailsList(params).then(() => {
            this.$router.push("/details");
          });
        } else if (this.inputVal.indexOf("1688.com") > -1) {
          let params = {
            URL: this.inputVal,
            rate: this.rate
          };
          //get
          this.getDetailsList(params).then(() => {
            this.$router.push("/details");
          });
        } else {
          this.$message({
            message: this.$t("headerTop.not-currently-supported"),
            type: "warning"
          });
        }
      }
    },
    //个人中心
    handlePersonal() {
      let UserCode = JSON.parse(getObtain()).resNew;
      if (UserCode) {
        this.$router.push("personalCenter");
      }
    },
    //修改密码
    handlePassword() {
      this.dialogVisible = true;
    },
    //忘记密码
    handleForget() {
      this.dialogVisibleAccount = true;
      this.$store.commit("header/SETISTANKUANG", false);
    },
    //立即注册
    handleRegisterNow() {
      this.dialogVisibleRegist = true;
      this.$store.commit("header/SETISTANKUANG", false);
      this.isReturn = true;
    },
    //退出登录
    handleExit() {
      deleteRemove();
      location.reload("home");
    },
    //我的购物车
    handleCar() {
      if (!getObtain()) {
        this.$store.commit("header/SETISTANKUANG", true);
      } else {
        this.$router.push("car");
      }
    },
    //modle登录
    handleLogin() {
      let params = {
        CountryCode: CountryCode,
        Email: this.accountVal,
        Password: $.md5(this.passwordVal)
      };
      if (this.accountVal === "") {
        this.$message({
          message: this.$t("headerTop.Please enter account number"),
          type: "warning"
        });
      } else if (this.passwordVal === "") {
        this.$message({
          message: this.$t("headerTop.Please enter password"),
          type: "warning"
        });
      } else {
        if (this.emails === "") {
          this.$api.login(params).then(res => {
            if (res) {
              let resNew = res.Data.UserCode;
              let resData = res.Data.Email;
              let resProcess = res.Data.ProgressBar;
              let resIsActive = res.Data.IsActive;
              let resNow = {
                resNew: resNew,
                resData: resData,
                resProcess: resProcess,
                resIsActive: resIsActive
              };
              let resJson = JSON.stringify(resNow);
              setAccess(resJson);
              this.$router.push("/personalCenter");
              this.$message({
                message: this.$t("headerTop.Login successful"),
                type: "success"
              });

              this.emails = res.Data.Email;
              this.accountVal = "";
              this.passwordVal = "";
              this.$store.commit("header/SETISTANKUANG", false);
              this.$store.commit("car/SETNAMEMILS", resData);
            }
          });
        }
      }
    },
    //modle注册按钮
    handleResit() {
      let reg = /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}$/;
      let regPassWord = /^[\w]{6,50}$/;
      let params = {
        CountryCode: CountryCode,
        Email: this.emailVal,
        VCode: this.VCode,
        Password: $.md5(this.passwordResitVal),
        SPassword: $.md5(this.passwordComfirm)
      };
      console.log(JSON.stringify(params));
      
      if (this.emailVal === "") {
        this.$message({
          message: this.$t("headerTop.Please enter email"),
          type: "warning"
        });
      } else if (this.passwordResitVal === "") {
        this.$message({
          message: this.$t("headerTop.Please enter password"),
          type: "warning"
        });
      } else if (this.inputCheckVal === false) {
        this.$message({
          message: this.$t("headerTop.Consent to service agreement"),
          type: "warning"
        });
      } else if (this.passwordComfirm === "") {
        this.$message({
          message: this.$t(
            "headerTop.Please fill in the confirmation password"
          ),
          type: "warning"
        });
      } else if (this.passwordResitVal !== this.passwordComfirm) {
        this.$message({
          message: this.$t("headerTop.The two passwords do not match"),
          type: "warning"
        });
      } else if (!reg.test(this.emailVal)) {
        this.$message({
          message: this.$t("headerTop.The email format is incorrect"),
          type: "warning"
        });
      } else if (!regPassWord.test(this.passwordResitVal)) {
        this.$message({
          message: this.$t("headerTop.Password cannot be less than 6 digits"),
          type: "warning"
        });
      } else {
        this.$api.resGeRd(params).then(res => {
          if (res.Data) {
            this.inputCheckVal = false;
            this.passwordResitVal = "";
            this.passwordComfirm = "";
            this.emailVal = "";
            this.VCode = "";
            this.dialogVisibleRegist = false;

            this.$message({
              message: res.Msg,
              type: "success"
            });
          } 
        });
      }
    },
    //同意服务协议
    handleRouter() {
      //测试环境
      //window.open("http://localhost:8080/#/agree");
      //正式环境
      window.open("http://www.buyder.com/#/agree");
      this.dialogVisibleRegist = false;
    },
    //打开登录弹框
    loginEvent() {
      this.$store.commit("header/SETISTANKUANG", true);
    },
    //关闭登录弹框
    closeLoginEvent() {
      //登录弹框清空
      this.accountVal = "";
      this.passwordVal = "";
      //忘记密码弹框清空在返回是关闭登录弹框清空
      this.inputEmailsVal = "";
      //注册弹框在返回是关闭登录弹框清空
      this.inputCheckVal = false;
      this.passwordResitVal = "";
      this.passwordComfirm = "";
      this.emailVal = "";
      this.$store.commit("header/SETISTANKUANG", false);
    },
    SendEmailVCode(){
      let reg = /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}$/;
      if (this.emailVal === "") {
        this.$message({
          message: this.$t("headerTop.Please enter email"),
          type: "warning"
        });
        return;
      }
      if (!reg.test(this.emailVal)) {
        this.$message({
          message: this.$t("headerTop.The email format is incorrect"),
          type: "warning"
        });
        return;
      }
      let params = {
        
        Email: this.emailVal,
        CountryCode: CountryCode
      }
      this.$api.SendEmailVCode(params).then(res =>{
        
        if (res.Data) {
          this.$message({
            message: this.$t(res.Msg),
            type: "success"
          });
        }else{
          this.$message({
            message: this.$t(res.Msg),
            type: "warning"
          });       
        }
        
      });
      
    }
  },
  created() {
    //enter回车登录事件
    document.onkeydown = (
      e = event ? event : window.event ? window.event : null
    ) => {
      let key = window.event.keyCode;
      if (key == 13 && this.dialogVisibleRegist == true) {
        this.handleResit();
      }
      if (key == 13 && this.IsOrShow == true) {
        this.handleLogin();
      }
    };
  }
};
</script>

<style scoped lang="less">
@import "~@/styles/common/variable.less";

//dropdown hover样式
/deep/.el-dropdown-menu__item:not(.is-disabled):hover {
  color: @home-logo;
  background: @fff;
}

//dropdown 下拉菜单国旗样式
.home-flags {
  width: 300px;
  height: 300px;

  li {
    margin-left: 10px;
    cursor: pointer;
    width: 100px;
    height: 30px;

    img {
      width: 20px;
      height: 20px;
      margin-right: 10px;
      position: relative;
      top: 3px;
    }
  }
}

//home头部样式
.home-head {
  display: flex;
  width: 1200px;
  margin: 0 auto;
  height: 106px;

  //头部弹框的公共高度
  /deep/.el-dialog {
    height: 480px;
  }

  //logo样式
  .home-logo {
    cursor: pointer;
    width: 164px;
    height: 90px;
    //background: @home-logo;
    margin-top: 16px;

    img {
      width: 164px;
      height: 90px;
    }
  }

  //搜索框样式
  .home-search {
    display: flex;
    border: 1px solid @home-logo;
    width: 520px;
    height: 40px;
    margin: 40px 68px 0 76px;
    margin-right: 68px;
    margin-top: 40px;

    /deep/.el-input {
      border: none;

      /deep/.el-input__inner {
        width: 425px;
        height: 40px;
        outline: none;
        border-radius: 0;
        background: @fff;
        padding: 0 25px 0 8px;
      }

      /deep/.el-input__inner:focus {
        border-color: @fff;
      }
    }

    .home-go {
      background: @home-logo;
      height: 40px;
      width: 121px;
      cursor: pointer;

      .home-img-go {
        width: 64px;
        height: 34px;
        margin: 3px 0 0 15px;
      }
    }
  }

  //购物车样式
  .home-state {
    display: flex;

    .home-cart {
      cursor: pointer;
      width: 20px;
      height: 20px;
      margin-top: 53px;
    }

    p:hover {
      color: @home-logo;
    }

    p {
      cursor: pointer;
      font-size: 12px;
      color: @home-p;
      margin-left: 9px;
      margin-top: 59px;
      font-weight: 900;
    }
  }

  //登录注册样式
  .home-information {
    display: flex;
    margin-left: 10px;
    font-size: 12px;
    margin-top: 60px;

    /deep/.el-button--text {
      color: @home-p;
      font-size: 12px;
      position: relative;
      top: -17px;
    }

    /deep/.el-button--text:hover {
      color: @home-logo;
    }

    .home-login {
      /deep/.el-button {
        position: relative;
        top: -13px;
        margin-right: 10px;
        font-weight: 900;
      }

      /deep/.el-button:hover {
        color: @home-logo;
      }

      /deep/.el-dropdown-link {
        color: @home-logo;
        cursor: pointer;
      }

      /deep/.el-dropdown {
        height: 10px;
        font-size: 10px;
      }
    }
    /deep/.el-button {
      font-weight: 900;
    }

    //国旗，dropdowm下拉框
    .home-countries {
      position: relative;
      margin: 0 0 10px 10px;
      cursor: pointer;

      .el-dropdown-link {
        img {
          width: 20px;
          height: 20px;
          position: relative;
          top: -5px;
        }
      }
    }
  }

  //修改密码弹框
  .home-eidioter-password {
    p {
      font-size: 20px;
      font-weight: 900;
      margin: 0 0 0 100px;
    }

    ul {
      margin: 50px 0 0 100px;

      input {
        margin-bottom: 30px;
        width: 290px;
        height: 40px;
        border: 1px solid @order-li;
        border-radius: 4px;
        padding-left: 20px;
      }
    }
    /deep/.dialog-footer {
      margin: 0 100px 0 0;
      position: relative;
      top: -30px;
      .el-button--primary {
        background: @home-logo;
        width: 310px;
        height: 43px;
        border: none;
      }
    }
  }

  //修改账号弹框
  .home-account-back {
    position: relative;

    /deep/.el-dialog__title {
      cursor: pointer;
      font-size: 16px;
    }

    p {
      position: absolute;
      top: 25px;
      left: 30px;
      font-size: 16px;
      cursor: pointer;
    }

    // /deep/.el-dialog__close {
    //   font-size: 0;
    // }
    h1 {
      font-size: 20px;
      font-weight: 900;
      margin: 0 0 0 100px;
    }

    ul {
      margin: 70px 0 0 100px;

      input {
        width: 300px;
        height: 40px;
        border: 1px solid @order-li;
        border-radius: 4px;
        padding-left: 20px;
      }
    }

    button {
      cursor: pointer;
      margin: 40px 0 0 100px;
      width: 320px;
      background: @home-logo;
      height: 40px;
      border: 1px solid @home-logo;
      border-radius: 5px;
      color: @fff;
      font-size: 14px;
      font-weight: 900;
    }
  }

  //model框
  .home-modle {
    .home-denglu {
      //登录框
      /deep/.el-dialog {
        height: 500px;
        border-radius: 0;

        h1 {
          font-size: 20px;
          font-weight: 900;
          margin: 0 0 0 100px;
        }

        //登录框登录
        /deep/.home-login-btn {
          width: 200px;
          margin: 0 26% 0 0;
          outline: none;
        }
      }

      //修改密码,忘记密码
      .home-password-opera {
        display: flex;
        margin: 25px 0 0 97px;

        p {
          color: @home-login-btn;
          font-size: 14px;
          cursor: pointer;
        }

        p:nth-child(1) {
          margin-right: 135px;
        }

        // p:nth-child(2) {
        //   margin-right: 30px;
        // }
      }

      //登录按钮
      .home-login-btn {
        background: @home-login-btn;
        border: none;
        color: @fff;
        height: 30px;
        border-radius: 5px;
      }

      //登录框账号
      .home-login-account {
        margin: 10% 0 5% 19%;
        width: 343px;
        height: 45px;
        border: 1px solid @order-li;
        border-radius: 4px;
        .el-icon-user {
          font-size: 25px;
          position: relative;
          top: 5px;
          left: 8px;
        }

        input {
          width: 295px;
          height: 40px;
          border: none;
          border-radius: 4px;
          padding-left: 8px;
          outline: none;
          position: relative;
          top: 2px;
          margin-left: 10px;
        }
      }

      //登录框密码
      .home-login-password {
        margin-left: 19%;
        width: 343px;
        height: 45px;
        border: 1px solid @order-li;
        border-radius: 4px;
        .el-icon-lock {
          font-size: 25px;
          position: relative;
          top: 5px;
          left: 8px;
        }

        input {
          width: 295px;
          height: 40px;
          border: none;
          border-radius: 4px;
          padding-left: 8px;
          outline: none;

          position: relative;
          top: 2px;
          margin-left: 10px;
        }
      }

      /deep/.el-button {
        width: 344px;
        position: relative;
        right: -19%;
        margin-top: 5%;
        height: 45px;
        background: @home-logo;
        border: 1px solid @home-logo;
      }
    }

    .home-zhuce {
      position: relative;

      p {
        position: absolute;
        top: 25px;
        left: 35px;
        font-size: 16px;
        cursor: pointer;
      }

      h1 {
        font-size: 20px;
        font-weight: 900;
        margin: 0 0 0 100px;
      }

      //注册框确认注册
      /deep/.el-button {
        width: 344px;
        position: relative;
        right: 13%;
        // margin-top: 5%;
        height: 45px;
        background: @home-logo;
        border: 1px solid @home-logo;
      }
      /deep/.el-dialog {
        height: auto;
      }

      //注册邮箱
      .home-resign-account {
        margin: 10% 0 0 19%;
        width: 343px;
        height: 45px;
        border: 1px solid @order-li;
        border-radius: 4px;

        .el-icon-message {
          font-size: 25px;
          position: relative;
          top: 5px;
          left: 8px;
        }

        input {
          width: 295px;
          height: 40px;

          border: none;
          border-radius: 4px;
          padding-left: 8px;
          outline: none;

          position: relative;
          top: 2px;
          margin-left: 10px;
        }
      }

      .get-vcode{
        float: left;
        padding: 0px;
        margin: 5% 0 0 1%;
        width: 126px;
        height: 45px;
        line-height: 45px;
        cursor:pointer;
   
        .el-button{
          width: 100%;
          right: 0;
          padding-left: 2px;
          text-align: center;
     
        }
      }
      .home-enter-code{
        float: left;
        margin: 5% 0 0 19%;
        width: 210px;
        height: 45px;
        border: 1px solid @order-li;
        padding: 0px;
        border-radius: 4px;

        .el-icon-message {
          font-size: 25px;
          position: relative;
          top: 5px;
          left: 8px;
        }
        input {
          width: 160px;
          height: 40px;

          border: none;
          border-radius: 4px;
          padding-left: 8px;
          outline: none;

          position: relative;
          top: 2px;
          margin-left: 10px;
         
        }
        
      }

      //注册密码
      .home-resign-password {
        margin: 5% 0 0 19%;
        width: 343px;
        height: 45px;
        border: 1px solid @order-li;
        border-radius: 4px;

        .el-icon-lock {
          font-size: 25px;
          position: relative;
          top: 5px;
          left: 8px;
        }

        input {
          width: 295px;
          height: 40px;

          border: none;
          border-radius: 4px;
          padding-left: 8px;
          outline: none;

          position: relative;
          top: 2px;
          margin-left: 10px;
        }
      }

      //确认密码
      .home-confirm-password {
        margin: 5% 0 0 19%;
        width: 343px;
        height: 45px;
        border: 1px solid @order-li;
        border-radius: 4px;

        .el-icon-lock {
          font-size: 25px;
          position: relative;
          top: 5px;
          left: 8px;
        }

        input {
          width: 295px;
          height: 40px;

          border: none;
          border-radius: 4px;
          padding-left: 8px;
          outline: none;

          position: relative;
          top: 2px;
          margin-left: 10px;
        }
      }

      //同意服务协议
      .home-server-agree {
        margin: 2% 0 0 34%;

        input {
          width: 16px;
          height: 16px;
          position: relative;
          top: 2px;
        }

        span {
          cursor: pointer;
        }
      }
    }
  }
}
</style>
