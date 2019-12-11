<template>
  <div class="order-total">
    <div class="order-title">
      <ul>
        <li
          :style="!isPay ? 'color: #d33319; border-color:#DC143C' : ''"
          @click="isPay = false"
        >
          {{ $t("order.purchaseOrder") }}
        </li>
        <li style="color: #d33319; border-color:#DC143C" v-if="isPay">
          {{ $t("myparcel.payment") }}
        </li>
      </ul>
    </div>
    <!-- 采购订单 -->
    <div class="order-procur-order" v-show="!isPay">
      <div class="order-operation">
        <div class="order-all-orders">
          <el-select
            v-model="value"
            :placeholder="$t('box.AllOrders')"
            class="order-select"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>

        <div class="order-pay-time">
          <span>{{ $t("myparcel.Payment time") }}</span>
          <div class="order-pay-start">
            <el-date-picker
              v-model="startVal"
              type="date"
              :placeholder="$t('order.SelectAdate')"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </div>
          <p></p>
          <div class="order-pay-end">
            <el-date-picker
              v-model="endVal"
              type="date"
              :placeholder="$t('order.SelectAdate')"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </div>
        </div>
        <!-- 查询 -->
        <button class="order-search-button" @click="handleQuery">
          {{ $t("outside.query") }}
        </button>
      </div>
      <!-- 操作按钮 -->
      <div class="order-button">
        <button class="order-pay-loan" @click="handlePayCode">
          {{ $t("myparcel.Pay the loan") }}
        </button>
      </div>
      <!-- 表格 -->
      <div class="order-table">
        <el-table
          :data="PurchaseList"
          border
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="50"
            align="center"
            :selectable="setSelectAble"
          ></el-table-column>
          <el-table-column
            prop="PurchaseOrderCode"
            :label="$t('order.PurchaseOrder')"
            width="210"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="TotalAmt"
            :label="$t('order.TotalAmount') + '(' + symbol + ')'"
            width="165"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="Status"
            :label="$t('order.state')"
            width="140"
            align="center"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.Status == '0'">{{
                $t("order.Has been cancelled")
              }}</span>
              <span v-if="scope.row.Status == '1'">{{
                $t("order.To be paid")
              }}</span>
              <span v-if="scope.row.Status == '2'">{{
                $t("order.To purchase")
              }}</span>
              <span v-if="scope.row.Status == '3'">{{
                $t("order.Purchase failed")
              }}</span>
              <span v-if="scope.row.Status == '4'">{{
                $t("order.Purchasing success")
              }}</span>
              <span v-if="scope.row.Status == '5'">{{
                $t("order.To be put in storage")
              }}</span>
              <span v-if="scope.row.Status == '6'">{{
                $t("order.Has been put in storage")
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="PayDateTime"
            :label="$t('myparcel.Payment time')"
            align="center"
            width="155"
          ></el-table-column>
          <el-table-column align="center" :label="$t('box.Operation')">
            <template slot-scope="scope">
              <!-- 状态，-1:全部；0：已取消；1：待支付； 2：待采购；3：采购失败；4：采购成功；5：待入库；6：已入库 -->
              <!-- 已取消 -->
              <el-button
                @click="handleClick(scope.row, 'cancel')"
                type="text"
                size="small"
                v-if="scope.row.Status == '1'"
              >
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="$t('myparcel.cancel')"
                  placement="bottom"
                >
                  <img src="@/img/quxiao.png" />
                </el-tooltip>
              </el-button>
              <!-- {{ $t("myparcel.cancel") }} -->
              <!-- 支付货款 -->
              <el-button
                @click="handleClick(scope.row, 'pay')"
                type="text"
                size="small"
                v-if="scope.row.Status == '1'"
              >
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="$t('myparcel.payment')"
                  placement="bottom"
                >
                  <img src="@/img/zhifu.png" />
                </el-tooltip>
              </el-button>
              <!-- {{ $t("myparcel.payment") }} -->
              <!-- 异常 -->
              <el-button
                @click="handleClick(scope.row, 'abnormal')"
                type="text"
                size="small"
                v-if="scope.row.IsAbnormal"
              >
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="$t('myparcel.abnormal')"
                  placement="bottom"
                >
                  <img src="@/img/yichang.png" />
                </el-tooltip>
              </el-button>
              <!-- {{ $t("myparcel.abnormal") }} -->
              <!-- 详情 -->
              <el-button
                @click="handleClick(scope.row, 'detail')"
                type="text"
                size="small"
                class="order-details-button"
              >
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="$t('myparcel.details')"
                  placement="bottom"
                >
                  <img src="@/img/orderxq.png" />
                </el-tooltip>
              </el-button>
              <!-- {{ $t("myparcel.details") }} -->
              <!-- 包裹追踪 -->
              <el-button
                @click="handleClick(scope.row, 'logistics')"
                type="text"
                size="small"
                v-if="scope.row.Status == 6"
              >
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="$t('myparcel.Package tracking')"
                  placement="bottom"
                >
                  <img src="@/img/package.png" />
                </el-tooltip>
              </el-button>
              <!-- {{ $t("myparcel.Package tracking") }} -->
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <div class="order-paging" v-if="pageCount">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-size="searchParams.pageSize"
          :current-page="searchParams.pageIndex"
          :page-count="pageCount"
          layout="prev, pager, next"
          background
        ></el-pagination>
      </div>

      <!-- 订单详情弹框 -->
      <div class="order-details-dialog">
        <el-dialog
          :title="$t('order.The-order-details')"
          :visible.sync="dialogVisible"
          width="1000px"
        >
          <!-- 订单状态 -->
          <div class="order-status">
            <p>
              <!-- <span>{{ $t("myparcel.Current order status") }}:</span> -->
              <span
                v-if="purchaseOrderDetail.Status == 0"
                style="color: #cccccc"
              >
                <!-- {{$t("myparcel.Purchasing success")}} -->
                <!-- {{
                  (purchaseOrderDetail.Status ||
                    purchaseOrderDetail.Status == 0) &&
                    options[purchaseOrderDetail.Status + 1].label
                }} -->
                {{ $t("myparcel.Current order status") }}:
                {{ $t("order.Has been cancelled") }}
              </span>
              <span v-if="purchaseOrderDetail.Status == 1">
                {{ $t("myparcel.Current order status") }}:
                {{ $t("order.To be paid") }}
              </span>
              <span v-if="purchaseOrderDetail.Status == 2">
                {{ $t("myparcel.Current order status") }}:
                {{ $t("order.To purchase") }}
              </span>
              <span
                v-if="purchaseOrderDetail.Status == 3"
                style="color: #d33319"
              >
                {{ $t("myparcel.Current order status") }}:
                {{ $t("order.Purchase failed") }}
              </span>
              <span
                v-if="purchaseOrderDetail.Status == 4"
                style="color: #73BB57"
              >
                {{ $t("myparcel.Current order status") }}:
                {{ $t("order.Purchasing success") }}
              </span>
              <span v-if="purchaseOrderDetail.Status == 5">
                {{ $t("myparcel.Current order status") }}:
                {{ $t("order.To be put in storage") }}
              </span>
              <span v-if="purchaseOrderDetail.Status == 6">
                {{ $t("myparcel.Current order status") }}:
                {{ $t("order.Has been put in storage") }}
              </span>
              <!-- <img src="@/img/success.png" /> -->
            </p>
            <p v-if="purchaseOrderDetail.returnTotalAMT">
              <span>{{ $t("myparcel.Order refund status") }}:</span>
              <span>{{ symbol }}{{ purchaseOrderDetail.returnTotalAMT }}</span>
            </p>
            <!-- <p>
             {{$t("myparcel.Goods have been successfully purchased")}}
            </p>-->
          </div>

          <!-- 支付订单号 -->
          <div class="order-pay-number">
            <p v-if="purchaseOrderDetail.IsPayOrder">
              <span>{{ $t("myparcel.Payment order number") }}:</span>
              <span>{{ purchaseOrderDetail.PurchaseOrderCode }}</span>
            </p>
            <p>
              <span>{{ $t("myparcel.Pay the amount") }}:</span>
              <span style="color: #d33319"
                >{{
                  purchaseOrderDetail.PayMode == 0 ? balancePay : BankTran
                }}({{ symbol }}{{ purchaseOrderDetail.TotalAmt }})</span
              >
            </p>
            <p v-if="purchaseOrderDetail.IsPayOrder">
              <span>{{ $t("shopList.The total amount of handling charge") }}:</span>
              <span>{{ symbol+purchaseOrderDetail.BuyFeeTotalAmt }}</span>
            </p>
            <p v-if="purchaseOrderDetail.IsPayOrder">
              <span>{{ $t("myparcel.Payment time") }}:</span>
              <span>{{ purchaseOrderDetail.PayDateTime }}</span>
            </p>
          </div>

          <!-- 单号信息 -->
          <!-- <div class="order-number-infor">
           <p>
             <span>{{$t("myparcel.Purchase platform express number")}}:</span>
             <span>{{purchaseOrderDetail.PurchaseOrderCode}}</span>
           </p>
           <p>
             <span>{{$t("myparcel.note")}}:</span>
             <span>{{$t("myparcel.test")}} 2018/5/11 17:34:40</span>
           </p>
          </div>-->

          <!-- 采购商品信息 -->
          <div class="order-chase-infor">
            <h1>{{ $t("myparcel.Purchase information") }}</h1>
            <div class="order-shop-table">
              <el-table
                :data="purchaseOrderDetail.OrderDetail"
                border
                style="width:100%"
              >
                <el-table-column
                  prop="GoodsName"
                  :label="$t('car.Name of commodity')"
                  width="250"
                  align="center"
                >
                  <template slot-scope="scope">
                    <a :href="scope.row.GoodsURL" target="_blank">{{
                      scope.row.GoodsName
                    }}</a>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="Specification"
                  :label="$t('set.specifications')"
                  align="center"
                  width="150"
                ></el-table-column>
                <el-table-column
                  prop="Price"
                  :label="$t('shopList.The-unit-price') + '(' + symbol + ')'"
                  align="center"
                  width="100"
                ></el-table-column>
                <el-table-column
                  prop="QTY"
                  :label="$t('details.number')"
                  align="center"
                  width="80"
                ></el-table-column>
                <el-table-column
                  prop="CNFreightAmt"
                  :label="$t('order.FreightAmount') + '(' + symbol + ')'"
                  align="center"
                  width="150"
                ></el-table-column>
                <!-- <el-table-column
                  prop="BuyFeeAmt"
                  :label="$t('order.commissionAmount') + '(' + symbol + ')'"
                  align="center"
                  width="100"
                ></el-table-column> -->
                <el-table-column
                  prop="AddServiceAmt"
                  :label="$t('order.Value-added-service') + '(' + symbol + ')'"
                  align="center"
                  width="100"
                ></el-table-column>
                <el-table-column
                  prop="Subtotal"
                  :label="$t('order.Subtotal') + '(' + symbol + ')'"
                  align="center"
                ></el-table-column>
              </el-table>
            </div>
          </div>
        </el-dialog>
      </div>

      <!--异常详情-->
      <el-dialog
        :title="$t('order.Exception-details')"
        :visible.sync="isAbnormalDialogVisible"
        width="800px"
      >
        <!-- 商品异常信息 -->
        <el-table :data="abnormalDetail" border style="width:100%">
          <el-table-column
            prop="GoodsName"
            :label="$t('car.Name of commodity')"
            width="320"
            align="center"
          >
            <template slot-scope="scope">
              <a :href="scope.row.GoodsURL" target="_blank">{{
                scope.row.GoodsName
              }}</a>
            </template>
          </el-table-column>
          <el-table-column
            prop="ExceptionType"
            :label="$t('order.Exception-types')"
            align="center"
            width="160"
          ></el-table-column>
          <el-table-column
            prop="ExceptionRemark"
            :label="$t('order.Abnormal-note')"
            align="center"
          ></el-table-column>
        </el-table>
      </el-dialog>
    </div>
    <!--支付订单-->
    <div class="outside-total" v-show="isPay">
      <div class="outside-total-amount">
        <span>{{ $t("outside.Total loan amount") }}:</span>
        <span v-if="this.TotalAmt"> {{ TotalAmt }}{{ symbol }}</span>
      </div>

      <!-- 支付方式 -->
      <div class="outside-pay">
        <h1>{{ $t("outside.Method of payment") }}</h1>
        <div class="outside-pay-style">
          <span>{{ $t("outside.Method of payment") }}:</span>
          <ul>
            <li
              v-for="(list, index) in dataList"
              :style="{ 'border-color': isColor === index ? '#d33319' : '' }"
              @click="handlePay(index, list.id)"
              :key="list.id"
            >
              {{ list.name }}
              <img src="@/img/hook.png" v-if="isIndex === index" />
            </li>
          </ul>
        </div>
      </div>

      <!-- 可用余额 -->
      <div class="outside-balance">
        <span>{{ $t("outside.Available balance") }}:</span>
        <span>{{ balanceMoney }}{{ symbol }}</span>
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
            <!-- <input type="text" v-model="inputDateVal" /> -->
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
      </div>
    </div>
  </div>
</template>

<script>
import { getObtain } from "@/unilts/auth";
import { accAdd, accMul, accDiv } from "@/algo/index";
import {
  CountryCode,
  symbol,
  account,
  bank,
  accountName,
  rmbSymbol
} from "@/entry/index";
import { mapState, mapActions } from "vuex";
export default {
  name: "order",
  data() {
    return {
      rmbSymbol: "", //RMB符号
      account: "",
      bank: "",
      accountName: "",
      balancePay: this.$t("myparcel.The balance payment"),
      BankTran: this.$t("order.BankTransfer"),
      isPay: false,
      PurchaseList: [],
      multipleSelection: [],
      dialogVisible: false,
      purchaseOrderDetail: {},
      isAbnormalDialogVisible: false,
      abnormalDetail: [],
      //采购单号分页属性
      pageCount: 0,
      searchParams: {
        UserCode: JSON.parse(getObtain()).resNew,
        Type: -1,
        BeginTime: "",
        EndTime: "",
        PageIndex: 1, //当前多少页
        PageSize: 10 //本页多少条
      },
      startVal: "",
      endVal: "",
      options: [
        {
          value: -1,
          label: this.$t("headerTop.all")
        },
        {
          value: "0",
          label: this.$t("order.Has been cancelled")
        },
        {
          value: "1",
          label: this.$t("order.To be paid")
        },
        {
          value: "2",
          label: this.$t("order.To purchase")
        },
        {
          value: "3",
          label: this.$t("order.Purchase failed")
        },
        {
          value: "4",
          label: this.$t("myparcel.Purchasing success")
        },
        {
          value: "5",
          label: this.$t("order.To be put in storage")
        },
        {
          value: "6",
          label: this.$t("order.Has been put in storage")
        }
      ],
      value: -1,

      // 支付货款
      payPurchaseOrders: [], // 保存支付订单号
      TotalAmt: "",
      //balanceMoney: "",
      isId: 0,
      UserCode: "",
      isColor: 0,
      isIndex: 0,
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
    ...mapState("myBox", ["balanceMoney"])
  },
  methods: {
    ...mapActions("myBox", ["getUserBalance"]),
    //查询
    handleQuery() {
      let searchParams = this.searchParams;
      searchParams.PageIndex = 1;
      searchParams.Type = this.value;
      searchParams.BeginTime = this.startVal;
      searchParams.EndTime = this.endVal;

      if (!searchParams.EndTime) {
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

        searchParams.EndTime = dateFormat;
      }

      this.purchaseList();
    },
    //支付货款
    handlePayCode() {
      let multipleSelection = this.multipleSelection;

      if (multipleSelection.length == 0) {
        this.$message({
          message: this.$t("order.UncheckedOrder"),
          type: "warning"
        });
        return;
      }

      this.isPay = true;
      let payPurchaseOrders = [];
      let len = multipleSelection.length;
      for (let i = 0; i < len; i++) {
        payPurchaseOrders.push(multipleSelection[i].PurchaseOrderCode);
      }
      this.payPurchaseOrders = payPurchaseOrders;
      this.getTotalAmt();
    },
    //支付方式
    handleBorder(index) {
      this.isBorder = index;
    },
    //表格勾选
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //每页多少条
    handleSizeChange(pageSize) {},
    //当前多少页
    handleCurrentChange(pageIndex) {
      this.searchParams.PageIndex = pageIndex;
      this.purchaseList();
    },
    //表格操作
    handleClick(row, action) {
      let that = this;
      switch (action) {
        case "cancel":
          let OrderCodesArr = [];
          let params = {
            CountryCode: CountryCode,
            UserCode: JSON.parse(getObtain()).resNew
          };

          OrderCodesArr.push(row.PurchaseOrderCode);
          params.OrderCodes = OrderCodesArr;

          this.$api.CancelPurchaseOrder(params).then(res => {
            if (res.Data) {
              that.$message({
                message: this.$t("order.CancelSuccessful"),
                type: "success"
              });
              that.purchaseList();
            } else {
              that.$message({
                message: res.Msg,
                type: "warning"
              });
            }
          });
          break;
        case "pay":
          this.isPay = true;
          this.TotalAmt = row.TotalAmt;

          let payPurchaseOrders = [];
          payPurchaseOrders.push(row.PurchaseOrderCode);
          this.payPurchaseOrders = payPurchaseOrders;

          break;
        case "abnormal":
          this.isAbnormalDialogVisible = true;

          let abnormalDetail = [];

          let OrderDetail1 = row.OrderDetail;
          let len1 = OrderDetail1.length;
          for (let i = 0; i < len1; i++) {
            let item = OrderDetail1[i];
            if (item.IsAbnormal) {
              abnormalDetail.push(item);
            }
          }

          this.abnormalDetail = abnormalDetail;
          break;
        case "detail":
          let purchaseOrderDetail = row;
          let OrderDetail = row.OrderDetail;

          // 计算退款金额
          let returnTotalAMT = 0;
          let len = OrderDetail.length;
          for (let i = 0; i < len; i++) {
            let item = OrderDetail[i];
            if (item.IsReturn) {
              returnTotalAMT = accAdd(returnTotalAMT, item.ReturnTotalAmt);
            }
          }
          purchaseOrderDetail.returnTotalAMT = returnTotalAMT;

          this.purchaseOrderDetail = purchaseOrderDetail;
          this.dialogVisible = true;
          break;
        case "logistics":
          // console.log('物流');
          localStorage.setItem("PurchaseOrderCode", row.PurchaseOrderCode);
          this.$emit("changeIndex");
          break;
        default:
          break;
      }
    },
    // 判断是否可以勾选（只有状态为1，即待支付）
    setSelectAble(row) {
      return row.Status == 1;
    },
    // 获取订单列表
    purchaseList() {
      let searchParams = this.searchParams;
      let that = this;
      this.$api.purchaseList(searchParams).then(res => {
        let PurchaseOrderList = res.Data.PurchaseOrderList;
        let PageCount = res.Data.PageCount;

        // 添加异常字段
        let len = PurchaseOrderList.length;
        for (let i = 0; i < len; i++) {
          let OrderDetailInfo = PurchaseOrderList[i].OrderDetail;
          let lenz = OrderDetailInfo.length;
          for (let z = 0; z < lenz; z++) {
            let item = OrderDetailInfo[z];
            if (item.IsAbnormal) {
              PurchaseOrderList[i].IsAbnormal = 1;
              break;
            }
          }
        }

        that.PurchaseList = PurchaseOrderList;
        that.pageCount = PageCount;
      });
    },
    // 支付
    handlePay(index, id) {
      this.isColor = index;
      this.isIndex = index;
      this.isId = id;
    },
    // 计算支付总金额
    getTotalAmt() {
      let TotalAmt = 0;
      let multipleSelection = this.multipleSelection;

      let len = multipleSelection.length;
      for (let i = 0; i < len; i++) {
        TotalAmt = accAdd(TotalAmt, multipleSelection[i].TotalAmt);
      }

      this.TotalAmt = TotalAmt;
    },
    //订单支付保存
    handlePayOrder() {
      let params = {
        CountryCode: CountryCode, //国家编码
        UserCode: JSON.parse(getObtain()).resNew, //会员号
        PayMode: this.isId, //支付方式
        TotalAmt: this.TotalAmt, //总金额
        PurchaseOrders: this.payPurchaseOrders, //采购订单集
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
            return;
          } else {
            params.TransferDate = "";
            params.TransferName = "";
            params.TransferBankAccount = "";
            params.TransferBankBank = "";
            params.TransferSN = "";
          }
        } else if (this.isId == 1) {
        } else {
          return;
        }
        this.$api.paymentOrder(params).then(res => {
          if (res.Data) {
            let paras = {
              UserCode: JSON.parse(getObtain()).resNew
            };

            this.$message({
              message: this.$t("box.PaySuccess"),
              type: "success"
            });
            this.isPay = false;
            this.purchaseList();
            this.getUserBalance(paras);
          } else {
            this.$message({
              message: res.Msg,
              type: "warning"
            });
          }
        });
      }
    },
    // 获取用户余额
    getBalanceUser() {
      let params = {
        UserCode: JSON.parse(getObtain()).resNew
      };
      this.getUserBalance(params);
      // this.$api.getBalanceUser(params).then(res => {
      //   this.balanceMoney = res.Data;
      // });
    }
  },
  created() {
    this.purchaseList();
    //人民币符号
    this.rmbSymbol = rmbSymbol;
    // 获取用户余额
    this.getBalanceUser();
    this.symbol = symbol;
    //全局变量，如银行账号
    this.account = account;
    this.bank = bank;
    this.accountName = accountName;
  }
};
</script>

<style lang="less">
@import "~@/styles/common/variable.less";

.order-total {
  padding-bottom: 20px;
  //采购订单
  .order-procur-order {
    //所有订单
    .order-all-orders {
      .el-input__inner {
        width: 150px;
        height: 40px;
        text-align: center;
      }
      .el-input__icon {
        margin-right: 25px;
      }
    }
    //支付时间
    .order-pay-time {
      .el-input__inner {
        width: 140px;
        height: 40px;
      }
      .el-date-editor {
        width: 150px;
      }
    }
    //分页
    .order-paging {
      .active {
        background: @order-active !important;
      }
      .el-pagination.is-background .el-pager li:not(.disabled):hover {
        color: @home-p;
      }
    }
    //订单详情弹框
    .order-details-dialog {
      .el-dialog__header {
        padding: 5% 0 0 30%;
        .el-dialog__title {
          font-size: 18px;
          color: @home-logo;
          font-weight: 900;
          display: inline-block;
          height: 30px;
          width: 60%;
          border-bottom: 2px solid @home-logo;
          text-align: center;
        }
      }
    }
  }
}
</style>

<style scoped lang="less">
@import "~@/styles/common/variable.less";
.order-total {
  margin-top: 15px;
  min-width: 800px;
  //标题
  .order-title {
    ul {
      display: flex;
      margin-left: 20px;
      width: 910px;
      height: 50px;
      border-bottom: 1px solid rgba(232, 232, 232, 1);
      li {
        cursor: pointer;
        min-width: 64px;
        height: 50px;
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
  //支付运费
  .order-pay {
    margin: 35px 0 0 20px;
    //充值余额
    p:nth-child(1) {
      font-weight: 900;
      span:nth-child(1) {
        font-size: 16px;
        color: @home-p;
        margin-right: 10px;
      }
      span:nth-child(2) {
        color: @home-logo;
        font-size: 16px;
      }
    }
    //收款信息
    p:nth-child(2) {
      font-size: 16px;
      color: @home-p;
      font-weight: 900;
      margin-top: 50px;
    }
    //可用余额
    p:nth-child(3) {
      margin-top: 20px;
      font-size: 14px;
      span:nth-child(1) {
        color: @home-p;
        margin-right: 10px;
      }
      span:nth-child(2) {
        color: @home-logo;
      }
    }
    //支付方式
    p:nth-child(4) {
      margin-top: 15px;
      font-size: 14px;
      border-bottom: 1px solid @order-p;
      width: 900px;
      height: 50px;
      span {
        margin: 8px 10px 0 0;
        float: left;
      }
      ul {
        float: left;
        display: flex;
        li {
          width: 100px;
          height: 30px;
          line-height: 30px;
          display: flex;
          justify-content: center;
          border: 1px solid @order-li;
          margin-right: 10px;
          position: relative;
          img {
            width: 12px;
            height: 12px;
            position: absolute;
            bottom: 0;
            right: 0;
          }
        }
      }
    }
    //保存
    button {
      border: none;
      width: 100px;
      height: 40px;
      background: linear-gradient(to right, @home-logo, @order-button);
      border-radius: 6px;
      color: @fff;
      margin-top: 100px;
      outline: none;
    }
  }
  //采购订单
  .order-procur-order {
    margin: 20px 0 0 20px;
    .order-operation {
      min-width: 900px;
      display: flex;
      //支付时间
      .order-pay-time {
        display: flex;
        margin: 0 50px 0 20px;
        span {
          font-size: 14px;
          color: @order-six;
          margin: 13px 10px 0 0;
        }
        p {
          width: 31px;
          height: 1px;
          background: @ccc;
          margin: 20px 15px 0 5px;
        }
      }
      //查询
      .order-search-button {
        cursor: pointer;
        min-width: 99px;
        height: 40px;
        background: linear-gradient(
          to right,
          @order-search,
          @order-search-button
        );
        border: none;
        border-radius: 6px;
        color: @fff;
        margin-right: 10px;
      }
    }
    //操作按钮
    .order-button {
      margin-top: 15px;
      .order-pay-loan {
        cursor: pointer;
        min-width: 99px;
        height: 40px;
        border: none;
        color: @fff;
        border-radius: 6px;
        background: linear-gradient(
          to right,
          @order-search,
          @order-search-button
        );
      }
    }
    //表格
    .order-table {
      margin-top: 20px;
      // .order-details-button {
      img {
        width: 20px;
        height: 20px;
        position: relative;
        top: 3px;
      }
      //}
    }
    // //订单详情弹框
    .order-details-dialog {
      //状态
      .order-status {
        span {
          font-size: 14px;
        }
        //订单状态
        p:nth-child(1) {
          margin-bottom: 12px;
          span {
            color: @order-green;
          }
          span:nth-child(1) {
            margin-right: 10px;
          }
          img {
            width: 20px;
            height: 20px;
            margin-left: 10px;
            position: relative;
            top: 4px;
          }
        }
        //退费状态
        p:nth-child(2) {
          margin-bottom: 12px;
          span {
            color: @code-blue;
            font-size: 14px;
          }
          span:nth-child(1) {
            margin-right: 10px;
          }
        }
        //采购成功
        p:nth-child(3) {
          span {
            color: @personal-nine;
            font-size: 14px;
          }
          span:nth-child(1) {
            margin-right: 10px;
          }
        }
      }
      //采购单号
      .order-number-infor {
        margin-top: 49px;
        span {
          font-size: 14px;
        }
        //快件单号
        p:nth-child(1) {
          margin-bottom: 10px;
          span {
            color: @home-p;
          }
          span:nth-child(1) {
            margin-right: 10px;
          }
        }
        //备注
        p:nth-child(2) {
          span {
            color: @personal-nine;
          }
          span:nth-child(1) {
            margin-right: 10px;
          }
        }
      }
      //采购商品
      .order-chase-infor {
        margin-top: 51px;
        h1 {
          font-size: 16px;
          color: @home-p;
        }
        .order-shop-table {
          margin-top: 20px;
        }
      }
      //支付订单
      .order-pay-number {
        margin-top: 40px;
        span {
          font-size: 14px;
        }
        //支付订单号
        p:nth-child(1) {
          margin-bottom: 10px;
          span:nth-child(1) {
            color: @order-six;
            margin-right: 10px;
          }
          span:nth-child(2) {
            color: @code-blue;
          }
        }
        //支付金额
        p:nth-child(2) {
          margin-bottom: 10px;
          span:nth-child(1) {
            color: @order-six;
            margin-right: 10px;
          }
          span:nth-child(2) {
            color: @home-logo;
          }
        }
        //支付时间
        p:nth-child(3) {
          margin-bottom: 10px;
          span {
            color: @order-six;
          }
          span:nth-child(1) {
            margin-right: 10px;
          }
        }
      }
    }
    //分页
    .order-paging {
      margin: 80px 0 0 500px;
    }
  }
}
.outside-total {
  width: 1200px;
  margin: 0 auto;
  padding-bottom: 20px;
  //总金额
  .outside-total-amount {
    margin: 40px 0 0 40px;
    span {
      font-size: 16px;
      font-weight: 900;
    }
    span:nth-child(1) {
      color: @home-p;
      margin-right: 10px;
    }
    span:nth-child(2) {
      color: @home-logo;
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
      //转账日期
      p:nth-child(1) {
        margin-bottom: 20px;
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
        margin-bottom: 20px;
        span {
          font-size: 14px;
          color: @home-p;
          margin-right: 20px;
        }
        input {
          width: 200px;
          height: 35px;
          border-radius: 4px;
          border: 1px solid @ccc;
        }
      }
      //转账银行账号
      p:nth-child(3) {
        margin-bottom: 20px;
        span {
          font-size: 14px;
          color: @home-p;
          margin-right: 5px;
        }
        input {
          width: 200px;
          height: 35px;
          border-radius: 4px;
          border: 1px solid @ccc;
        }
      }
      //转账银行开户行
      p:nth-child(4) {
        margin-bottom: 20px;
        span {
          font-size: 14px;
          color: @home-p;
          margin-right: 5px;
        }
        input {
          width: 185px;
          height: 35px;
          border-radius: 4px;
          border: 1px solid @ccc;
        }
      }
      //转账银行流水号
      p:nth-child(5) {
        margin-bottom: 40px;
        span {
          font-size: 14px;
          color: @home-p;
          margin-right: 5px;
        }
        input {
          width: 185px;
          height: 35px;
          border-radius: 4px;
          border: 1px solid @ccc;
        }
      }
    }
  }
  //保存
  .outside-save {
    margin: 40px 0 0 20px;
    button {
      width: 136px;
      height: 40px;
      background: @home-logo;
      color: @fff;
      border-radius: 5px;
      border: none;
      font-weight: 900;
      cursor: pointer;
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
