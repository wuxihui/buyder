<template>
  <div class="ResetPwd-total">
    <div class="ResetPwd-content">
      <div class="ResetPwd-input">
        <el-input
          :placeholder="$t('headerTop.Please enter password')"
          v-model="inputAccount"
          show-password
        ></el-input>
        <el-input
          :placeholder="$t('headerTop.password_again')"
          v-model="inputPassowrd"
          show-password
        ></el-input>
      </div>
      <el-button @click="handleConfirm">{{$t("password.Confirm the change")}}</el-button>
    </div>
  </div>
</template>

<script>
import "@/md5/jQuery.md5";
import { CountryCode } from "@/entry/index";
export default {
  name: "ResetPwd",
  data() {
    return {
      inputAccount: "",
      inputPassowrd: ""
    };
  },
  methods: {
    //重置密码
    handleConfirm() {
      let params = {
        CountryCode: CountryCode, //国家编码
        UserCode: this.$route.query.UserCode, //会员号
        Key: this.$route.query.key, //密钥
        Password: $.md5(this.inputAccount), //加密后的密码
        SPassword: $.md5(this.inputPassowrd) //重复加密后的密码
      };
      if (this.inputAccount == "") {
        this.$message.warning(this.$t("headerTop.Please enter password"));
      } else if (this.inputPassowrd == "") {
        this.$message.warning(this.$t("headerTop.password_again"));
      } else if (this.inputAccount != this.inputPassowrd) {
        this.$message.warning(this.$t("headerTop.passwords-not-match"));
      } else {
        this.$api.resetPassword(params).then(res => {
          if (res.Data) {
            this.$message({
              message: this.$t("headerTop.Reset_success"),
              type: "success"
            });
          } else {
            this.$message({
              message: res.Msg,
              type: "warning"
            });
          }
        });
      }
    }
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/common/variable.less";
.ResetPwd-total {
  width: 1200px;
  margin: 0 auto;
  .ResetPwd-content {
    width: 470px;
    height: 350px;
    margin: 180px auto;
    border: 1px solid @ccc;
    border-radius: 5px;
    .ResetPwd-input {
      margin-top: 35px;
      /deep/.el-input {
        width: 360px;
        margin: 30px 0 0 55px;
      }
    }
    /deep/.el-button {
      width: 360px;
      margin: 30px 0 0 55px;
      background: @home-logo;
      color: @fff;
    }
  }
}
</style>
