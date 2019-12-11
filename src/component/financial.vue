<template>
  <div class="financial-total">
    <div class="financial-title">
      <ul>
        <li
          @click="handleTitle"
          :style="{
            color: isOrtherOk == true ? '#d33319' : '',
            'border-color': isOrtherOk === true ? '#DC143C' : ''
          }"
        >
          {{ $t("outside.FinAncMatIon") }}
        </li>
        <li
          v-if="isOrtherISOk == true"
          :style="{
            color: isOrtherISOk == true ? '#d33319' : '',
            'border-color': isOrtherISOk === true ? '#DC143C' : ''
          }"
        >
          {{ $t("outside.topup") }}
        </li>
      </ul>
    </div>

    <!-- 财务信息 -->
    <div class="financial-infor" v-if="isOrtherOk">
      <!-- 可用余额 -->
      <div class="financial-balance">
        <span>{{ $t("outside.Available balance") }}:</span>
        <span v-if="balanceMoney"> {{ balanceMoney }}{{ symbol }} </span>
        <button @click="handleBalanceRecharge">
          {{ $t("outside.topup") }}
        </button>
      </div>
      <!-- 订单操作 -->
      <div class="financial-operation">
        <!-- 相关单号 -->
        <div class="financial-related">
          <span class="label">{{ $t("box.RelatedOrder") }}:</span>
          <input
            type="text"
            v-model="inputOrder"
            :placeholder="$t('box.RelatedOrder')"
          />
        </div>

        <!-- 类型 -->
        <div class="financial-style">
          <span class="label">{{ $t("outside.type") }}:</span>
          <el-select v-model="inputStyle">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>

        <!-- 查询 -->
        <button class="financial-search" @click="searchFinanceDetailEvent">
          {{ $t("outside.query") }}
        </button>
      </div>
      <!-- 支付时间 -->
      <div class="financial-pay-time">
        <div class="financial-pay-start">
          <span class="label">{{ $t("outside.time") }}:</span>
          <el-date-picker
            v-model="startVal"
            type="date"
            :placeholder="$t('order.select-date-time')"
            value-format="yyyy-MM-dd"
          ></el-date-picker
          >-
          <!-- <div class="financial-pay-end"> -->
          <el-date-picker
            v-model="endVal"
            type="date"
            :placeholder="$t('order.select-date-time')"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
          <!-- </div> -->
        </div>
      </div>
      <!-- 表格 -->
      <div class="financial-table">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column
            prop="FinanceSN"
            :label="$t('outside.SerialNumber')"
            width="195"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="CreateDate"
            :label="$t('outside.time')"
            width="150"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="Amt"
            :label="$t('outside.Amount') + '(' + symbol + ')'"
            align="center"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="Type"
            :label="$t('outside.type') + '(' + symbol + ')'"
            align="center"
            width="199"
          >
            <template slot-scope="scope">
              <span>{{ options[scope.row.Type + 1].label }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="RelatedOrder"
            :label="$t('outside.Related-single')"
            width="185"
            align="center"
          ></el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <div class="order-paging" v-if="pageCount">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-size="pageSize"
          :current-page="pageIndex"
          :page-count="pageCount"
          layout="prev, pager, next"
          background
        ></el-pagination>
      </div>
    </div>

    <!-- 充值 -->
    <div class="financial-top-up" v-if="!isOrtherOk">
      <!-- 充值金额 -->
      <div class="financial-top-up-amount">
        <span>{{ $t("outside.Topup amount") }}:</span>
        <input type="text" v-model="totalAmt" @input="totalAmtInputEvent" />
        {{ symbol }}
      </div>

      <!-- 收款信息 -->
      <div class="financial-get-infor">
        <p>{{ $t("outside.Gathering information") }}</p>
        <p>
          <span>{{ $t("outside.Account number") }}:</span>
          <span>{{ bank }}</span>
        </p>
        <p>
          <span>{{ $t("outside.Collecting bank") }}:</span>
          <span>{{ account }}</span>
        </p>
        <p>
          <span>{{ $t("outside.Name of payee") }}:</span>
          <span>{{ accountName }}</span>
        </p>
      </div>

      <!-- 转账回执 -->
      <div class="financial-bank-transfer">
        <p>{{ $t("outside.Bank transfer receipt") }}</p>
        <p>
          <span>{{ $t("outside.Day period") }}:</span>
          <el-date-picker
            v-model="inputDateVal"
            type="date"
            :placeholder="$t('outside.Select-date-time')"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptions"
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

      <!-- 提交按钮 -->
      <div class="financial-submit-button" @click="SubmitRechargeEvent">
        {{ $t("outside.submit") }}
      </div>
    </div>
  </div>
</template>

<script>
import {
  ak,
  sk,
  CountryCode,
  symbol,
  account,
  bank,
  accountName
} from "@/entry/index";
import { mapState, mapActions } from "vuex";
import { getObtain } from "@/unilts/auth";
export default {
  name: "financial",
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6; //如果没有后面的-8.64e6就是不可以选择今天的
        }
      }, //日期时间选择器选择今天以及之前的
      account: "",
      bank: "",
      accountName: "",
      //isOrtherOk: true,
      //isOrtherISOk: false,
      pageCount: 0,
      totalAmt: "",
      pageSize: 10,
      pageIndex: 1,
      searchParams: null,
      symbol: "",
      inputOrder: "",
      startVal: "",
      inputDateVal: "",
      inputNumberVal: "",
      inputBankVal: "",
      inputNameVal: "",
      inputWhereVal: "",
      endVal: "",
      inputPaidVal: "",
      inputStyle: -1,
      tableData: [],
      options: [
        {
          value: -1,
          label: this.$t("headerTop.all")
        },
        {
          value: 0,
          label: this.$t("headerTop.User-top-up")
        },
        {
          value: 1,
          label: this.$t("headerTop.System-refund-recharge")
        },
        {
          value: 2,
          label: this.$t("headerTop.Charge-purchase-order")
        },
        {
          value: 3,
          label: this.$t("headerTop.Case-freight-deducted")
        },
        {
          value: 4,
          label: this.$t("headerTop.deduction-order")
        }
      ]
    };
  },
  computed: {
    ...mapState("myBox", ["balanceMoney", "isOrtherISOk", "isOrtherOk"])
  },
  methods: {
    //可用余额充值
    handleBalanceRecharge() {
      this.$store.commit("myBox/SETISORTHERISOK", true);
      //this.isOrtherISOk = true;
      //this.isOrtherOk = false;
      this.$store.commit("myBox/SETISORTHEROK", false);
    },
    //title
    handleTitle() {
      //this.isOrtherOk = true;
      this.$store.commit("myBox/SETISORTHEROK", true);
      //this.isOrtherISOk = false;
      this.$store.commit("myBox/SETISORTHERISOK", false)
    },
    // 获取财务信息列表
    getMyFinancialDetails() {
      let that = this;
      let pageIndex = this.pageIndex;
      let pageSize = this.pageSize;
      let searchParams = this.searchParams;

      searchParams.PageSize = pageSize;
      searchParams.PageIndex = pageIndex;
      searchParams.UserCode = JSON.parse(getObtain()).resNew;

      this.$api.getMyFinancialDetails(searchParams).then(res => {
        that.pageCount = res.Data.PageCount;
        that.tableData = res.Data.FinanceDetailList;
      });
    },
    // pageSize 改变时会触发
    handleSizeChange(pageSize) {
      //console.log(pageSize);
    },
    //currentPage 改变时会触发
    handleCurrentChange(currentPage) {
      this.pageIndex = currentPage;
      this.getMyFinancialDetails();
    },
    // 搜索财务信息事件
    searchFinanceDetailEvent() {
      this.pageIndex = 1;
      let inputOrder = this.inputOrder;
      let inputStyle = this.inputStyle;
      let startVal = this.startVal;
      let endVal = this.endVal;

      if (!endVal) {
        let formatDate = function(i) {
          return (i < 10 ? "0" : "") + i;
        };
        let now = new Date();
        let dateFormat =
          now.getFullYear() +
          "-" +
          (parseInt(formatDate(now.getMonth())) + 1) +
          "-" +
          formatDate(now.getDate() + 1);

        endVal = dateFormat;
      }

      this.searchParams = {
        RelatedOrder: inputOrder,
        Type: inputStyle,
        BeginTime: startVal,
        EndTime: endVal
      };

      this.getMyFinancialDetails();
    },
    // 提交充值事件
    SubmitRechargeEvent() {
      let totalAmt = this.totalAmt;
      let transferDate = this.inputDateVal;
      let transferName = this.inputNameVal;
      let transferBankAccount = this.inputBankVal;
      let transferBankBank = this.inputWhereVal;
      let transferSN = this.inputNumberVal;
      let date = new Date().getTime();
      let timeStamp = Date.parse(transferDate);
      if (parseFloat(totalAmt) <= 0 || this.totalAmt == "") {
        this.$message({
          type: "warning",
          message: this.$t("outside.recharge-amount-greater")
        });
        return;
      }

      let params = {
        CountryCode: CountryCode,
        UserCode: JSON.parse(getObtain()).resNew,
        TotalAmt: totalAmt,
        TransferDate: transferDate,
        TransferName: transferName,
        TransferBankAccount: transferBankAccount,
        TransferBankBank: transferBankBank,
        TransferSN: transferSN
      };
      if (timeStamp > date) {
        this.$message({
          message: this.$t("main.selected"),
          type: "warning"
        });
        return;
      }
      this.$api.submitRecharge(params).then(res => {
        if (res.Data) {
          this.$message({
            message: this.$t("main.top_success"),
            type: "success"
          });
          this.inputDateVal = "";
          this.inputNameVal = "";
          this.inputBankVal = "";
          this.inputWhereVal = "";
          this.inputNumberVal = "";
          this.totalAmt = "";
        } else {
          this.$message({
            message: res.Msg,
            type: "warning"
          });
        }
      });
    },
    // 获取用户余额
    // getBalanceUser() {
    //   let params = {
    //     UserCode: JSON.parse(getObtain()).resNew
    //   };

    //   this.$api.getBalanceUser(params).then(res => {
    //     this.balanceMoney = res.Data;
    //   });
    // },
    // 充值金额输入框
    totalAmtInputEvent() {
      let val = this.totalAmt + "";

      // 先把非数字的都替换掉，除了数字和.
      val = val.replace(/[^\d\.]/g, "");
      // 必须保证第一个为数字而不是.
      val = val.replace(/^\./g, "");
      //保证第一位只能有一个或0个0
      val = val.replace(/^0{2,}/, "0");
      // 以0开始的第二位只能为小数点
      val = val.replace(/^0[\d]/, "0");
      // 保证只有出现一个.而没有多个.
      val = val.replace(/\.{2,}/g, ".");
      //只能输入两个小数
      val = val.replace(/^(\-)*(\d+)\.(\d\d).*$/, "$1$2.$3");

      this.totalAmt = val;
    }
  },
  created() {
    // 获取用户余额
    //this.getBalanceUser();

    // 获取财务信息列表
    //符号
    this.symbol = symbol;
    this.searchFinanceDetailEvent();
    this.account = account;
    this.bank = bank;
    this.accountName = accountName;
  }
};
</script>

<style lang="less" scoped>
@import "~@/styles/common/variable.less";
.financial-total {
  margin-top: 15px;
  //标题
  .financial-title {
    ul {
      display: flex;
      margin-left: 20px;
      width: 910px;
      height: 50px;
      border-bottom: 1px solid rgba(232, 232, 232, 1);
      li {
        cursor: pointer;
        font-size: 16px;
        line-height: 50px;
        text-align: center;
        border-bottom: 2px solid rgba(232, 232, 232, 1);
      }
      li:hover {
        color: @home-logo;
        border-color: @home-logo;
      }
      li:nth-child(2) {
        margin-left: 20px;
      }
    }
  }
  //财务信息
  .financial-infor {
    margin: 20px 0 0 20px;
    //可用余额
    .financial-balance {
      span {
        font-size: 16px;
        font-weight: 900;
      }
      span:nth-child(1) {
        margin-right: 10px;
      }
      span:nth-child(2) {
        color: @home-logo;
        margin-right: 10px;
      }
      button {
        min-width: 50px;
        min-height: 28px;
        background: @financial-button;
        color: @fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }
    }
    //支付时间
    .financial-pay-time {
      // // display: flex;
      // min-width: 500px;
      margin-top: 15px;
      /deep/ .el-input__inner {
        margin-left: 10px;
        width: 200px;
        height: 40px;
      }
      //日期时间选择器
      /deep/.el-input__icon {
        line-height: 0;
        margin-left: 10px;
      }
      .el-date-editor {
        width: 200px;
      }
      // .label {
      //   margin: 7px 10px 0 10px;
      // }
      p {
        color: @ccc;
        margin: 0 5px;
        line-height: 30px;
      }
    }
    //操作类型
    .financial-operation {
      display: flex;
      margin-top: 30px;
      //类型
      .financial-style {
        span {
          margin: 0 10px;
        }
        /deep/ .el-input__inner {
          width: 130px;
          height: 40px;
        }
        //日期时间选择器
        /deep/ .el-input__icon {
          line-height: 0;
        }
      }
      //相关单号
      .financial-related {
        input {
          width: 160px;
          height: 35px;
          margin-left: 10px;
          border-radius: 4px;
          border: 1px solid @ccc;
          padding: 0 5px;
        }
      }
      //查询
      .financial-search {
        cursor: pointer;
        margin-left: 52px;
        width: 70px;
        height: 40px;
        background: linear-gradient(
          to right,
          @order-search,
          @order-search-button
        );
        border: none;
        border-radius: 3px;
        color: @fff;
      }
    }
    //表格
    .financial-table {
      margin-top: 20px;
    }
    //分页
    .order-paging {
      margin: 80px 0 0 500px;
      /deep/.active {
        background: @order-active !important;
      }
      /deep/.el-pagination.is-background .el-pager li:not(.disabled):hover {
        color: @home-p;
      }
    }
  }
  //账户余额
  .financial-account {
    margin: 20px 0 0 20px;
    //账户余额具体值
    .financial-account-balance {
      span {
        font-size: 16px;
        font-weight: 900;
      }
      span:nth-child(1) {
        margin-right: 10px;
      }
      span:nth-child(2) {
        color: @home-logo;
        margin-right: 10px;
      }
      button {
        width: 50px;
        height: 18px;
        background: @financial-button;
        color: @fff;
        border: none;
        border-radius: 4px;
      }
    }
  }
  //充值
  .financial-top-up {
    margin: 20px 0 0 20px;
    input:not(.el-input__inner) {
      padding: 0 5px;
    }
    //充值余额
    .financial-top-up-amount {
      width: 902px;
      height: 38px;
      border-bottom: 1px solid @financial-p;
      font-size: 16px;
      font-weight: 900;
      span:nth-child(1) {
        color: @home-p;
        margin-right: 10px;
      }
      span:nth-child(2) {
        color: @home-logo;
      }
      input {
        width: 185px;
        height: 25px;
        border-radius: 4px;
        border: 1px solid @ccc;
        padding: 0 5px;
      }
    }
    //收款信息
    .financial-get-infor {
      margin-top: 28px;
      //收款具体信息
      p:nth-child(1) {
        font-size: 16px;
        font-weight: 900;
        color: @home-p;
        margin-bottom: 20px;
      }
      //收款账号
      p:nth-child(2) {
        span {
          font-size: 14px;
        }
        span:nth-child(1) {
          color: @home-p;
          margin-right: 10px;
        }
        span:nth-child(2) {
          color: @code-blue;
        }
      }
      //收款银行
      p:nth-child(3) {
        margin-top: 20px;
        span {
          font-size: 14px;
        }
        span:nth-child(1) {
          color: @home-p;
          margin-right: 10px;
        }
        span:nth-child(2) {
          color: @code-blue;
        }
      }
      //收款人姓名
      p:nth-child(4) {
        margin-top: 20px;
        span {
          font-size: 14px;
        }
        span:nth-child(1) {
          color: @home-p;
          margin-right: 10px;
        }
        span:nth-child(2) {
          color: @code-blue;
        }
      }
    }
    //转账回执
    .financial-bank-transfer {
      margin-top: 50px;
      //具体转账回执
      p:nth-child(1) {
        font-size: 16px;
        font-weight: 900;
        color: @home-p;
        margin-bottom: 20px;
      }
      //转账日期
      p:nth-child(2) {
        margin: 0 0 20px 135px;
        /deep/.el-input__icon {
          margin-right: 15px;
        }
        span {
          font-size: 14px;
          color: @home-p;
          margin-right: 20px;
        }
        //日期时间选择器
        /deep/ .el-input__inner {
          width: 205px;
          height: 40px;
          border-radius: 4px;
          border: 1px solid @ccc;
        }
        /deep/.el-input__inner {
          line-height: 0;
        }
      }
      //转账姓名
      p:nth-child(3) {
        margin: 0 0 20px 128px;
        span {
          font-size: 14px;
          color: @home-p;
          margin-right: 20px;
        }
        input {
          width: 194px;
          height: 36px;
          border-radius: 4px;
          border: 1px solid @ccc;
        }
      }
      //转账银行账号
      p:nth-child(4) {
        margin: 0 0 20px 104px;
        span {
          font-size: 14px;
          color: @home-p;
          margin-right: 20px;
        }
        input {
          width: 194px;
          height: 36px;
          border-radius: 4px;
          border: 1px solid @ccc;
        }
      }
      //转账银行开户行
      p:nth-child(5) {
        margin: 0 0 20px -9px;
        span {
          font-size: 14px;
          color: @home-p;
          margin-right: 19px;
        }
        input {
          width: 194px;
          height: 36px;
          border-radius: 4px;
          border: 1px solid @ccc;
        }
      }
      //转账银行流水号
      p:nth-child(6) {
        margin: 0 0 20px 106px;
        span {
          font-size: 14px;
          color: @home-p;
          margin-right: 19px;
        }
        input {
          width: 194px;
          height: 36px;
          border-radius: 4px;
          border: 1px solid @ccc;
        }
      }
    }
    //提交
    .financial-submit-button {
      width: 136px;
      height: 40px;
      border-radius: 5px;
      background: @home-logo;
      color: @fff;
      line-height: 40px;
      text-align: center;
      font-weight: 900;
      cursor: pointer;
    }
  }
}
</style>
