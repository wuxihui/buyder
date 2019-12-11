<template>
  <div class="personal-total">
    <h1>{{$t("personalCenter.The personal data")}}</h1>
    <div class="personal-details">
      <ul>
        <li>
          <span>{{$t("headerTop.emalis")}}:</span>
          <span>{{emails}}</span>
        </li>
        <li>
          <span>{{$t("headerTop.password")}}:</span>
          <span>********</span>
          <button @click="dialogVisible = true">{{$t("headerTop.Change the password")}}</button>
        </li>
        <li>
          <span>{{$t("shopList.name")}}:</span>
          <input type="text" v-model="inputNameVal" :placeholder="$t('personalCenter.fill-in-your-name')" />
        </li>
        <li>
          <span>{{$t("headerTop.birthday")}}:</span>
          <el-date-picker v-model="inputBirthdayVal" type="date"
            :placeholder="$t('personalCenter.fill-in-your-birthday')">
          </el-date-picker>
        </li>
        <li>
          <span>{{$t("headerTop.gender")}}:</span>
          <el-select v-model="valueName" :placeholder="$t('personalCenter.select-gender')">
            <el-option v-for="item in optionsName" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </li>
        <li>
          <span>{{$t("shopList.province")}}:</span>
          <el-select v-model="valueProvinces" filterable :placeholder="$t('address.Please-select')"
            @change="handleProvinces(valueProvinces)">
            <el-option v-for="item in optionsProvinces" :key="item.UID" :label="item.Name" :value="item.UID">
            </el-option>
          </el-select>
        </li>
        <li>
          <span>{{$t("shopList.city")}}:</span>
          <el-select v-model="valueCitys" filterable :placeholder="$t('address.Please-select')"
            @change="handleCitys(valueCitys)">
            <el-option v-for="item in optionsCitys" :key="item.UID" :label="item.Name" :value="item.UID"></el-option>
          </el-select>
        </li>
        <li>
          <span>{{$t("shopList.area")}}:</span>
          <el-select v-model="valueAears" filterable :placeholder="$t('address.Please-select')">
            <el-option v-for="item in optionsAears" :key="item.UID" :label="item.Name" :value="item.UID"></el-option>
          </el-select>
        </li>
        <li>
          <span>{{$t("shopList.address")}}:</span>
          <input type="text" v-model="inputAddressVal" />
        </li>
      </ul>
      <button @click="handlePersonalData">{{$t("shopList.Modification of personal particulars")}}</button>
    </div>
    <!-- 修改密码弹框 -->
    <div class="personal-dialog">
      <el-dialog title :visible.sync="dialogVisible" width="550px"
        :before-close="handleClose">
        <p>{{$t("headerTop.Change the password")}}</p>
        <ul>
          <li>
            <input type="password" v-model="inputOriginalVal" :placeholder="$t('headerTop.original-password')" />
          </li>
          <li>
            <input type="password" v-model="inputNewPassword" :placeholder="$t('headerTop.new-password')" />
          </li>
          <li>
            <input type="password" v-model="inputRepeatVal" :placeholder="$t('headerTop.new-password-again')" />
          </li>
        </ul>
        <span slot="footer" class="dialog-footer">
          <!-- <el-button @click="dialogVisible = false">{{$t('shopList.Take away')}}</el-button> -->
          <el-button type="primary" @click="handleDetermine">{{$t('shopList.determine')}}</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import { CountryCode } from "@/entry/index";
  import { getObtain, deleteRemove } from "@/unilts/auth";
  import { birDate } from "@/entry/index";
  import "@/md5/jQuery.md5";
  export default {
    name: "personal",
    data() {
      return {
        cityId: "",
        Uid: "",
        inputOriginalVal: "",
        inputNewPassword: "",
        inputRepeatVal: "",
        dialogVisible: false,
        newPassword: "",
        repeatVal: "",
        originalVal: "",
        emails: "",
        inputPassWord: "",
        valueCitys: "",
        valueAears: "",
        inputNameVal: "",
        inputAddressVal: "",
        inputBirthdayVal: "",
        numberSex: "",
        valueProvinces: "",
        valueName: "",
        optionsName: [
          {
            value: "1",
            label: this.$t("personalCenter.nan")
          },
          {
            value: "2",
            label: this.$t("personalCenter.nv")
          }
        ],
        optionsProvinces: [],
        optionsCitys: [],
        optionsAears: []
      };
    },
    methods: {
      handleDetermine() {
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
        let regPassWord = /^\d{6}$/;
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
                type: "warning"
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
      //关闭弹框
      handleClose() {
        this.dialogVisible = false;
      },
      //选择省
      handleProvinces(id) {
        let params = {
          Uid: id,
          AreaType: 1
        };
        if (id !== undefined) {
          this.$api.lveLinkage(params).then(res => {

            this.optionsCitys = res.Data.AreaList;
            this.valueCitys = res.Data.AreaList[0].UID;
            this.handleCitys(this.valueCitys);

          });
        }
      },
      //选择市
      handleCitys(id) {
        let params = {
          Uid: id,
          AreaType: 2
        };
        if (id !== undefined) {
          this.$api.lveLinkage(params).then(res => {

            this.optionsAears = res.Data.AreaList;
            this.valueAears = res.Data.AreaList[0].UID;

          });
        }
      },
      //保存
      handlePersonalData() {
        let params = {
          CountryCode: CountryCode,
          UserCode: JSON.parse(getObtain()).resNew,
          UserName: this.inputNameVal,
          Birthday: this.inputBirthdayVal,
          Sex: this.valueName,
          Province: this.valueProvinces,
          City: this.valueCitys,
          Area: this.valueAears,
          Address: this.inputAddressVal
        };
        if (this.inputNameVal === "") {
          this.$message({
            message: this.$t("address.Please-enter-name"),
            type: "warning"
          });
        } 
        else if (this.inputBirthdayVal === "") {
          this.$message.warning(this.$t("personalCenter.enter_date_birth"));
        } else if(this.valueName === "") {
          this.$message.warning(this.$t("personalCenter.Please_select_gender"));
        }
        else if (this.valueProvinces === "") {
          this.$message.warning(this.$t("personalCenter.choose_provinces"));
        } else if (this.valueCitys === "") {
          this.$message.warning(this.$t("personalCenter.select-the-city"));
        } else if (this.valueAears === "") {
          this.$message.warning(this.$t("personalCenter.select-region"));
        } else if (this.inputAddressVal === "") {
          this.$message.warning(this.$t("personalCenter.the_specific_date"));
        } 
        else {
          this.$api.changeData(params).then(res => {
            if (res.Data) {
              this.$message({
                message: this.$t("personalCenter.personal_information"),
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
    created() {
      this.emails = JSON.parse(getObtain()).resData;
      let params = {
        Uid: "",
        AreaType: 0
      };
      this.$api.lveLinkage(params).then(res => {

        this.optionsProvinces = res.Data.AreaList;

      });
    }
  };
</script>

<style lang="less">
  @import "~@/styles/common/variable.less";

  .personal-total {

    //修改密码弹框
    .personal-dialog {
        .el-dialog {
        height: 480px;
        border-radius: 0;
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
      .dialog-footer {
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
      
    }

    //具体个人资料
    .personal-details {

      //性别
      li:nth-child(5) {
        .el-input__inner {
          width: 282px;
          height: 35px;
          border: 1px solid @order-li;
          border-radius: 4px;
        }

        .el-input__icon {
          line-height: 0;
        }
      }

      //省市区
      li:nth-child(6) {
        .el-input__inner {
          width: 282px;
          height: 35px;
          border: 1px solid @order-li;
          border-radius: 4px;
        }

        .el-input__icon {
          line-height: 0;
        }
      }
    }
  }
</style>

<style scoped lang="less">
  @import "~@/styles/common/variable.less";

  .personal-total {
    margin: 20px 0 0 20px;

    //个人资料
    h1 {
      /* font-size: 16px;
      font-weight: 900;
      color: @home-p;
       */
      margin-bottom: 20px;
      width: 150px;
      height: 50px;
      border-bottom: 2px solid @home-logo;
      line-height: 50px;
      color: @home-logo;
    }

    //详情区
    .personal-details {

      //保存
      button {
        cursor: pointer;
        min-width: 100px;
        min-height: 35px;
        background: @home-logo;
        color: @fff;
        border: none;
        border-radius: 5px;
        font-weight: 900;
        outline: none;
      }

      //邮箱
      li:nth-child(1) {
        margin: 0 0 20px 57px;

        span {
          font-size: 14px;
          color: @home-p;
        }

        span:nth-child(1) {
          margin-right: 10px;
        }
      }

      //密码
      li:nth-child(2) {
        margin: 0 0 20px 53px;

        span:nth-child(1) {
          font-size: 14px;
          color: @home-p;
          margin-right: 10px;
        }

        span:nth-child(2) {
          font-size: 14px;
          color: @home-p;
        }

        button {
          font-size: 14px;
          color: @personal-nine;
          width: 180px;
          height: 30px;
          // min-width: 80px;
          // min-height: 25px;
          background: @fff;
          border: 1px solid @ccc;
          border-radius: 5px;
          margin-left: 10px;
          cursor: pointer;
        }
      }

      //姓名
      li:nth-child(3) {
        margin: 0 0 20px 69px;

        span {
          font-size: 14px;
          color: @home-p;
          margin-right: 10px;
        }

        input {
          width: 270px;
          height: 30px;
          border: 1px solid @order-li;
          border-radius: 4px;
          padding-left: 10px;
        }
      }

      //生日
      li:nth-child(4) {
        margin: 0 0 20px 50px;

        span {
          font-size: 14px;
          color: @home-p;
          margin-right: 10px;
        }

        /deep/.el-input__inner {
          width: 282px;
          height: 38px;
          border: 1px solid @order-li;
          border-radius: 4px;
        }
      }

      //性别
      li:nth-child(5) {
        margin: 0 0 20px 55px;

        span {
          font-size: 14px;
          color: @home-p;
          margin-right: 10px;
        }
      }

      //省
      li:nth-child(6) {
        margin: 0 0 20px 10px;

        span {
          font-size: 14px;
          color: @home-p;
          margin-right: 9px;
        }
      }

      //市
      li:nth-child(7) {
        margin: 0 0 20px 30px;

        span {
          font-size: 14px;
          color: @home-p;
          margin-right: 9px;
        }

        /deep/.el-input__inner {
          width: 282px;
          height: 35px;
        }
      }

      //区
      li:nth-child(8) {
        margin: 0 0 20px 36px;

        span {
          font-size: 14px;
          color: @home-p;
          margin-right: 10px;
        }

        /deep/.el-input__inner {
          width: 280px;
          height: 35px;
        }
      }

      //地址
      li:nth-child(9) {
        margin: 0 0 20px 66px;

        span {
          font-size: 14px;
          color: @home-p;
          margin-right: 10px;
        }

        input {
          width: 270px;
          height: 30px;
          border: 1px solid @order-li;
          border-radius: 4px;
          padding-left: 10px;
        }
      }
    }
  }
</style>