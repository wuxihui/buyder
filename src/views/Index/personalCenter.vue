<template>
  <div class="personalCenter-total">
    <div class="personalCenter-members">{{$t("personalCenter.TheMemberCenter")}}</div>
    <!-- 重新激活账号弹框 -->
    <div class="personalCenter-bounced">
      <el-dialog title :visible.sync="dialogVisible" width="400px" :before-close="handleClose">
        <span>{{$t("personalCenter.Confirm_activation")}}</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">{{$t("shopList.Take away")}}</el-button>
          <el-button type="primary" @click="handleActivation">{{$t("shopList.determine")}}</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="personalCenter-content">
      <div class="personalCenter-member-center">
        <div class="personalCenter-data">
          <p>
            <span>{{$t("personalCenter.Membership no")}}:</span>
            <span>{{UserCode}}</span>
            <span @click="dialogVisible = true" v-if="IsActive == 0">{{$t("personalCenter.Reactivate_account")}}</span>
          </p>
          <div class="personalCenter-progress">
            <span>{{$t("personalCenter.The personal data")}}</span>
            <div class="personalCenter-process">
              <span :style="{width: health+'%'}"></span>
            </div>
            <span @click="handleIsIndex(4)">{{$t("personalCenter.perfect")}}</span>
          </div>
          <p>{{balanceMoney}}{{symbol}}</p>
          <p>{{$t("personalCenter.The account balance")}}</p>
        </div>

        <div class="personalCenter-module">
          <ul>
            <li v-for="(list, index) in lists" :key="index"
              :style="{'color': isColor === index ? '#ffffff' : '', 'background': isBackColor === index ? '#d33319' : ''}"
              @click="handleStyle(list.id, index)">
              <img v-if="controll[index]" :src="list.url" alt />
              <img v-if="!controll[index]" :src="imgList[index].url" alt />
              {{list.name}}
            </li>
          </ul>
        </div>
      </div>

      <Order v-if="isIndex === 1" @changeIndex="handleStyle(2, 1)" />
      <Parcel v-if="isIndex === 2" />
      <!-- <Paid v-if="isIndex === 3" /> -->
      <Financial v-if="isIndex === 3" />
      <Address v-if="isIndex === 4" />
      <Personal v-if="isIndex === 5" />
    </div>
  </div>
</template>

<script>
  import Order from "@/component/order";
  import Parcel from "@/component/myparcel";
  import Paid from "@/component/paid";
  import Financial from "@/component/financial";
  import Address from "@/component/address";
  import Personal from "@/component/personal";
  import { getObtain } from "@/unilts/auth";
  import { mapActions, mapState } from "vuex";
  import { CountryCode, symbol, rmbSymbol, regPhone } from "@/entry/index";
  export default {
    name: "personalCenter",
    data() {
      return {
        IsActive: "", //是否激活
        UserCode: "",
        dialogVisible: false,
        //balanceMoney: "",
        health: "",
        //isColor: 0,
        //isBackColor: 0,
        flag: true,
        //isIndex: 1,
        imgList: [
          { id: 1, url: require("@/img/caigou.png") },
          { id: 2, url: require("@/img/wode.png") },
          //{ id: 3, name: "代付订单", url: require("@/img/icon-paid.png") },
          { id: 3, url: require("@/img/caiwu.png") },
          { id: 4, url: require("@/img/shouhuo.png") },
          { id: 5, url: require("@/img/geren.png") }
        ],
        lists: [
          {
            id: 1,
            name: this.$t("order.purchaseOrder"),
            url: require("@/img/icon-procur.png")
          },
          {
            id: 2,
            name: this.$t("box.MyBox"),
            url: require("@/img/icon-parcel.png")
          },
          //{ id: 3, name: "代付订单", url: require("@/img/icon-paid.png") },
          {
            id: 3,
            name: this.$t("outside.FinAncMatIon"),
            url: require("@/img/icon-financial.png")
          },
          {
            id: 4,
            name: this.$t("address.Shipping address"),
            url: require("@/img/icon-address.png")
          },
          {
            id: 5,
            name: this.$t("personalCenter.The personal data"),
            url: require("@/img/icon-private.png")
          }
        ],
        //controll: [false, true, true, true, true]
      };
    },
    computed: {
      ...mapState("myBox", ["balanceMoney", "isIndex", "isColor", "controll", "isBackColor"])
      // ...mapState("shopList", ['"isActive"'])
    },
    methods: {
      ...mapActions("myBox", ["getUserBalance"]),
      //关闭重新激活的窗口
      handleClose() {
        this.dialogVisible = false;
      },
      //完善资料显示个人资料
      handleIsIndex() {
        //this.isIndex = 5;
        this.$store.commit("myBox/SETISINDEX", 5);
        //this.isColor = 4; 
        this.$store.commit("myBox/SETISCOLOR", 4);
        //this.isBackColor = 4;
        this.$store.commit("myBox/SETISBACKCOLOR", 4);
        let controll = this.controll;
        controll = [true, true, true, true, false];
        this.$store.commit("myBox/SETCONTROLL", controll);  
        // this.controll[4] = false; 
        // this.controll[0] = true;
      },
      //确认激活按钮
      handleActivation() {
        let params = {
          UserCode: this.UserCode
        };
        this.$api.reacTivation(params).then(res => {
          if (res.Data) {
            this.dialogVisible = false;
          } else {
            this.$message({
              message: res.Msg,
              type: "warning"
            });
          }
        });
      },
      //左边列表区
      handleStyle(id, index) {
        this.controll[index] = !this.controll[index];
        for (let i = 0; i < this.controll.length; i++) {
          if (i == index) {
            this.controll[i] = false;
            this.$store.commit("myBox/SETISORTHEROK", true);
            this.$store.commit("myBox/SETISORTHERISOK", false);
          } else {
            this.controll[i] = true;
          }
        }
        //this.isColor = index;
        this.$store.commit("myBox/SETISCOLOR", index)
        //this.isBackColor = index;
        this.$store.commit("myBox/SETISBACKCOLOR", index)
        //this.isIndex = id;
        this.$store.commit("myBox/SETISINDEX", id);
      },
      // 获取用户余额
      getBalanceUser() {
        let params = {
          UserCode: JSON.parse(getObtain()).resNew
        };
        this.getUserBalance(params);
      }
    },
    created() {
      //进度条
      this.health = JSON.parse(getObtain()).resProcess;
      let tt = Math.round(new Date().getTime() / 1000);
      this.UserCode = JSON.parse(getObtain()).resNew;
      this.IsActive = JSON.parse(getObtain()).resIsActive;
      let params = {
        UserCode: this.UserCode
      };
      // 获取用户余额
      this.getBalanceUser();
      //符号
      this.symbol = symbol;
    },
    components: {
      Order,
      Parcel,
      Paid,
      Financial,
      Address,
      Personal
    }
  };
</script>


<style lang="less" scoped>
  @import "~@/styles/common/variable.less";

  .personalCenter-total {
    width: 1200px;
    margin: 0 auto;
    padding-bottom: 60px;
    overflow: hidden;

    .personalCenter-members {
      width: 1200px;
      margin-top: 10px;
      border-bottom: 2px solid @home-logo;
      font-size: 26px;
      font-weight: 400;
      color: @home-logo;
      height: 42px;
      line-height: 42px;
    }

    //重新激活账号
    .personalCenter-bounced {
      /deep/.el-dialog__body {
        font-size: 16px;
      }
    }

    .personalCenter-content {
      display: flex;
      min-width: 240px;

      .personalCenter-member-center {
        .personalCenter-data {
          margin-top: 15px;

          p {
            width: 240px;
            height: 50px;
            line-height: 50px;
            text-align: center;

            span:nth-child(3) {
              cursor: pointer;
              margin-left: 10px;
              font-size: 10px;
              color: @code-blue;
            }
          }

          .personalCenter-progress {
            display: flex;
            font-size: 14px;
            color: @code-p;

            span {
              min-width: 122px;
            }

            span:nth-of-type(2) {
              cursor: pointer;
            }

            .personalCenter-process {
              width: 88px;
              height: 10px;
              background: @code-process;
              border-radius: 5px;
              margin: 2px 9px;

              span {
                background: @code-progress;
                height: 9px;
                display: inline-block;
                border-radius: 5px;
                position: relative;
                top: -3px;
                left: 1px;
                min-width: 30px;
              }
            }
          }

          p:nth-of-type(2) {
            font-size: 22px;
            color: @code-red;
            margin-top: 29px;
          }

          p:nth-of-type(3) {
            font-size: 14px;
            color: @code-blue;
          }
        }
      }

      .personalCenter-module {
        li:hover {
          background: @home-logo;
          color: @fff;
        }

        li {
          cursor: pointer;
          width: 240px;
          height: 50px;
          line-height: 50px;

          //text-align: center;
          img {
            margin-left: 30px;
            width: 20px;
            height: 20px;
            position: relative;
            top: 3px;
            margin-right: 5px;
          }
        }
      }
    }
  }
</style>