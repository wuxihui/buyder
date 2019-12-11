<template>
  <div class="outside-total">
    <div class="outside-total-amount">
      <span>{{ $t("outside.Total loan amount") }}:</span>
      <span>
        <span v-if="this.TotalAmt">{{ TotalAmt }}{{ symbol }}</span>
      </span>
    </div>

    <!-- 支付方式 -->
    <div class="outside-pay">
      <h1>{{ $t("outside.Method of payment") }}</h1>
      <div class="outside-pay-style">
        <span>{{ $t("outside.Method of payment") }}:</span>
        <ul>
          <li
            v-for="(list, index) in dataList"
            :style="{ 'border-color': isColors === index ? '#d33319' : '' }"
            @click="handlePay(index, list.id)"
            :key="list.id"
          >
            {{ list.name }}
            <img src="@/img/hook.png" v-if="isIndexs === index" />
          </li>
        </ul>
      </div>
    </div>

    <!-- 可用余额 -->
    <div class="outside-balance">
      <span>{{ $t("outside.Available balance") }}:</span>
      <span>{{ balanceMoney }}{{ symbol }}</span>
      <button @click="handleRecharge">{{$t("outside.topup")}}</button>
    </div>

    <!-- 收款信息 -->
    <div class="outside-get-infor" v-if="this.isId == 1">
      <h1>{{ $t("outside.Gathering information") }}</h1>
      <div class="outside-details-infor">
        <p>
          <span>{{ $t("outside.Payment account") }}:</span>
          <span>{{ account }}</span>
        </p>
        <p>
          <span>{{ $t("outside.Collecting bank") }}:</span>
          <span>{{ bank }}</span>
        </p>
        <p>
          <span>{{ $t("outside.Name of payee") }}:</span>
          <span>{{ accountName }}</span>
        </p>
      </div>
    </div>

    <!-- 转账回执 -->
    <div class="outside-bank-transfer" v-if="this.isId == 1">
      <h1>{{ $t("outside.Bank transfer receipt") }}</h1>
      <div class="outsi-dedetails-bank">
        <p>
          <span>{{ $t("outside.Day period") }}:</span>
          <el-date-picker
            v-model="inputDateVal"
            type="date"
            :placeholder="$t('order.select-date-time')"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </p>
        <p>
          <span>{{ $t("outside.Name of transferee") }}:</span>
          <input type="text" v-model="inputNameVal" />
        </p>
        <p>
          <span>{{ $t("outside.Transfer bank account") }}:</span>
          <input type="text" v-model="inputBankVal" />
        </p>
        <p>
          <span>{{ $t("outside.Transfer bank opening bank") }}:</span>
          <input type="text" v-model="inputWhereVal" />
        </p>
        <p>
          <span>{{ $t("outside.Transfer bank serial number") }}:</span>
          <input type="text" v-model="inputNumberVal" />
        </p>
      </div>
    </div>

    <!-- 保存 -->
    <div class="outside-save">
      <button @click="handlePayOrder">{{ $t("outside.submit") }}</button>
      <span>({{ $t("outside.Please pay for your purchase order") }})</span>
    </div>
  </div>
</template>

<script>
import { getObtain } from "@/unilts/auth";
import { CountryCode, symbol, account, bank, accountName } from "@/entry/index";
import { mapState, mapActions } from "vuex";
export default {
  name: "outside",
  data() {
    return {
      account: "",
      bank: "",
      accountName: "",
      TotalAmt: "",
      isId: 0,
      UserCode: "",
      isColors: 0,
      isIndexs: 0,
      inputDateVal: "",
      inputNameVal: "",
      inputBankVal: "",
      inputWhereVal: "",
      inputNumberVal: "",
      dataList: [
        { id: 0, name: this.$t("order.TheBalanceOf") }
        // { id: 1, name: this.$t("order.transfer") }
      ]
    };
  },
  computed: {
    ...mapState("myBox", ["balanceMoney", "isIndex", "isColor", "controll", "isBackColor", "isOrtherOk"])
  },
  methods: {
    ...mapActions("myBox", ["getUserBalance"]),
    //充值
    handleRecharge() {
      this.$router.push("personalCenter");
      this.$store.commit("myBox/SETISINDEX", 3);
      this.$store.commit("myBox/SETISORTHERISOK", true);
      this.$store.commit("myBox/SETISCOLOR", 2);
      this.$store.commit("myBox/SETISBACKCOLOR", 2);
      this.$store.commit("myBox/SETISORTHEROK", false);
      let controll = this.controll;
      controll = [true, true, false, true, true];
      this.$store.commit("myBox/SETCONTROLL", controll);
    },
    //支付方式
    handlePay(index, id) {
      this.isColors = index;
      this.isIndexs = index;
      this.isId = id;
      //console.log(this.isId);
    },
    //订单支付保存
    handlePayOrder() {
      let codeArr = [];
      codeArr.push(this.$route.query.PurchaseOrderCode);
      let params = {
        CountryCode: CountryCode, //国家编码
        UserCode: JSON.parse(getObtain()).resNew, //会员号
        PayMode: this.isId, //支付方式
        TotalAmt: this.$route.query.TotalAmt, //总金额
        PurchaseOrders: codeArr, //采购订单集
        TransferDate: this.inputDateVal, //转账日期
        TransferName: this.inputNameVal, //转账人姓名
        TransferBankAccount: this.inputBankVal, //转账银行账号
        TransferBankBank: this.inputWhereVal, //转账银行开户行
        TransferSN: this.inputNumberVal //转账银行流水号
      };
      if (this.isId != 0 && this.isId != 1) {
        this.$message.warning(this.$t("order.select-payment-method"));
      } else {
        if (this.isId == 0) {
          if (this.balanceMoney < this.TotalAmt) {
            this.$message.warning(this.$t("order.LackOfBalance"));
          } else {
            this.$api.paymentOrder(params).then(res => {
              if (res.Data) {
                this.$router.push("personalCenter");
              } else {
                this.$message({
                  message: res.Msg,
                  type: "warning"
                });
              }
            });
          }
        } else if (this.isId == 1) {
          this.$api.paymentOrder(params).then(res => {
            if (res.Data) {
              this.$router.push("personalCenter");
            } else {
              this.$message({
                message: res.Msg,
                type: "warning"
              });
            }
          });
        } else {
        }
      }
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
    // 获取用户余额
    this.getBalanceUser();
    this.TotalAmt = this.$route.query.TotalAmt;
    this.symbol = symbol;
    this.account = account;
    this.bank = bank;
    this.accountName = accountName;
  }
};
</script>

<style scoped lang="less">
@import "~@/styles/common/variable.less";
.outside-total {
  width: 1200px;
  margin: 0 auto;
  padding-bottom: 60px;
  //总金额
  .outside-total-amount {
    margin: 40px 0 0 40px;
    span {
      font-size: 16px;
      font-weight: 900;
      color: @home-logo;
      margin-left: 10px;
    }
  }
  //支付方式
  .outside-pay {
    margin: 50px 0 0 20px;
    h1 {
      font-size: 16px;
      font-weight: 900;
      color: @home-p;
    }
    .outside-pay-style {
      display: flex;
      margin: 21px 0;
      span {
        margin-top: 8px;
        font-size: 14px;
      }
      ul {
        display: flex;
        margin-left: 10px;
        li {
          cursor: pointer;
          width: 100px;
          height: 30px;
          border: 1px solid @order-li;
          line-height: 30px;
          text-align: center;
          margin-right: 7px;
          font-size: 14px;
          position: relative;
          img {
            position: absolute;
            right: 0;
            bottom: 0;
          }
        }
      }
    }
  }
  //可用余额
  .outside-balance {
    margin-left: 20px;
    span {
      font-size: 14px;
    }
    span:nth-child(1) {
      color: @home-p;
      margin-right: 10px;
    }
    span:nth-child(2) {
      color: @home-logo;
      font-weight: 900;
    }
    button {
      cursor: pointer;
      min-width: 50px;
      min-height: 28px;
      background: @home-logo;
      color: @fff;
      border-radius: 5px;
      border: none;
      font-weight: 900;
      margin-left: 10px;
    }
  }
  //收款信息
  .outside-get-infor {
    margin: 50px 0 0 20px;
    h1 {
      font-size: 16px;
      font-weight: 900;
      color: @home-p;
    }
    .outside-details-infor {
      margin-top: 20px;
      span {
        font-size: 14px;
      }
      //收款账号
      p:nth-child(1) {
        margin-bottom: 20px;
        span:nth-child(1) {
          margin-right: 10px;
          color: @home-p;
        }
        span:nth-child(2) {
          margin-right: 10px;
          color: @code-blue;
        }
      }
      //收款银行
      p:nth-child(2) {
        margin-bottom: 20px;
        span:nth-child(1) {
          margin-right: 10px;
          color: @home-p;
        }
        span:nth-child(2) {
          margin-right: 10px;
          color: @code-blue;
        }
      }
      //收款人姓名
      p:nth-child(3) {
        margin-bottom: 20px;
        span:nth-child(1) {
          margin-right: 10px;
          color: @home-p;
        }
        span:nth-child(2) {
          margin-right: 10px;
          color: @code-blue;
        }
      }
    }
  }
  //转账回执
  .outside-bank-transfer {
    margin: 50px 0 0 20px;
    h1 {
      font-size: 16px;
      font-weight: 900;
      color: @home-p;
    }
    .outsi-dedetails-bank {
      margin-top: 20px;
      input {
        width: 200px;
        height: 35px;
        border-radius: 4px;
        border: 1px solid @ccc;
      }
      //转账日期
      p:nth-child(1) {
        margin: 0 0 20px 142px;
        span {
          font-size: 14px;
          color: @home-p;
          margin-right: 20px;
        }
        /deep/.el-input__inner {
          width: 205px;
          height: 40px;
          border-radius: 4px;
          border: 1px solid @ccc;
          padding: 0;
        }
        /deep/.el-input__icon {
          display: none;
        }
      }
      //转账姓名
      p:nth-child(2) {
        margin: 0 0 20px 136px;
        span {
          font-size: 14px;
          color: @home-p;
          margin-right: 20px;
        }
      }
      //转账银行账号
      p:nth-child(3) {
        margin: 0 0 20px 113px;
        span {
          font-size: 14px;
          color: @home-p;
          margin-right: 18px;
        }
      }
      //转账银行开户行
      p:nth-child(4) {
        margin-bottom: 20px;
        span {
          font-size: 14px;
          color: @home-p;
          margin-right: 17px;
        }
      }
      //转账银行流水号
      p:nth-child(5) {
        margin: 0 0 20px 115px;
        span {
          font-size: 14px;
          color: @home-p;
          margin-right: 16px;
        }
      }
    }
  }
  //保存
  .outside-save {
    margin: 40px 0 0 20px;
    button {
      cursor: pointer;
      width: 136px;
      height: 40px;
      background: @home-logo;
      color: @fff;
      border-radius: 5px;
      border: none;
      font-weight: 900;
    }
    span {
      font-size: 14px;
      color: @code-p;
      position: relative;
      bottom: -10px;
    }
  }
}
</style>
