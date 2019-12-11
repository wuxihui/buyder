<template>
  <div class="parcel-total">
    <div class="parcel-title">
      <ul>
        <li
          @click="handleTitle"
          :style="{
            color: isOrtherISOk == true ? '#d33319' : '',
            'border-color': isOrtherISOk == true ? '#DC143C' : ''
          }"
        >
          {{ $t("box.MyBox") }}
        </li>
        <li
          v-if="isOrtherOk == true"
          :style="{
            color: isOrtherOk == true ? '#d33319' : '',
            'border-color': isOrtherOk == true ? '#DC143C' : ''
          }"
        >
          {{ $t("box.PayFreight") }}
        </li>
        <!-- <li
          v-for="(list, index) in titleList"
          @click="handleTitle(index)"
          :key="list.id"
          :style="{'color': isColor === index ? '#d33319' : '' , 'border-color': isBorderColor === index ? '#DC143C' : '','display':index==1?'none':''}"
        >{{list.name}}</li> -->
      </ul>
    </div>
    <!-- 我的包裹 -->
    <div class="parcel-myparcel" v-if="isTitle === 0">
      <div class="parcel-operation">
        <!-- 所有订单 -->
        <div class="parcel-all">
          <el-select
            v-model="value"
            :placeholder="$t('box.AllOrders')"
            @change="handleType(value)"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <!-- 支付时间 -->
        <div class="parcel-pay-time">
          <span>{{ $t("box.CreateDate") }}</span>
          <div class="parcel-pay-start">
            <el-date-picker
              v-model="startVal"
              type="datetime"
              :placeholder="$t('box.BeginTime')"
            ></el-date-picker>
          </div>
          <p></p>
          <div class="parcel-pay-end">
            <el-date-picker
              v-model="endVal"
              type="datetime"
              :placeholder="$t('box.EndTime')"
            ></el-date-picker>
          </div>
        </div>
      </div>
      <!-- 操作按钮 -->
      <div class="parcel-operation-button">
        <div class="financial-related">
          <input
            type="text"
            v-model="RelatedOrder"
            :placeholder="$t('box.PleaseInput') + $t('box.RelatedOrder')"
          />
        </div>
        <button class="parcel-search-button" @click="QueryBoxList">
          {{ $t("outside.query") }}
        </button>
        <button class="parcel-pay-loan" @click="handlePayCode">
          {{ $t("myparcel.Pay the freight") }}
        </button>
      </div>
      <!-- 表格 -->
      <div class="parcel-table">
        <el-table
          v-loading="loading"
          :data="myBoxList"
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
            prop="BoxCode"
            :label="$t('box.BoxCode')"
            width="140"
            align="center"
          ></el-table-column>
          <el-table-column :label="$t('box.Weight')" width="100" align="center">
            <template slot-scope="scope">
              <el-tooltip placement="bottom">
                <div slot="content">
                  {{ scope.row.Length + centimeter }}&nbsp;&nbsp;&nbsp;{{
                    scope.row.Width + centimeter
                  }}&nbsp;&nbsp;&nbsp;{{ scope.row.Height + centimeter }}
                </div>
                <span>{{ scope.row.Weight }}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            prop="TotalAmt"
            :label="$t('box.TotalAmt') + '(' + symbol + ')'"
            width="120"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="CreateDate"
            :label="$t('box.CreateDate')"
            width="95"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="DataState"
            :label="$t('box.DataState')"
            width="99"
            :formatter="formatState"
            align="center"
          ></el-table-column>
          <el-table-column :label="$t('box.Image')" width="120" align="center">
            <template slot-scope="scope" prop="Photos">
              <el-image
                style="width: 96px; height: 54px"
                :src="
                  scope.row.Photos.length > 0
                    ? scope.row.Photos[0].SmallImg
                    : ''
                "
                :preview-src-list="getPhotoArr(scope.row.Photos)"
              >
                <div slot="error">
                  <i
                    class="el-icon-picture-outline"
                    style="width:90px;height:90px;font-size:90px;"
                  ></i>
                </div>
              </el-image>
            </template>
          </el-table-column>

          <el-table-column
            :label="$t('box.Operation')"
            width="120"
            align="center"
          >
            <template slot-scope="scope">
              <el-button
                @click="dialogCheck(scope.row)"
                type="text"
                size="small"
                v-show="scope.row.DataState == 0"
                class="parcel-payment"
              >
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="$t('myparcel.Pay the freight')"
                  placement="bottom"
                >
                  <img src="@/img/zhifu.png" />
                </el-tooltip>
              </el-button>
              <!-- {{ $t("myparcel.Pay the freight") }} -->
              <el-button
                @click="dialogPolice(scope.$index, scope.row)"
                size="small"
                type="text"
                class="parcel-logistics"
              >
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="$t('myparcel.Logistics query')"
                  placement="bottom"
                >
                  <img src="@/img/guiji.png" />
                </el-tooltip>
              </el-button>
              <!-- {{ $t("myparcel.Logistics query") }} -->
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 分页 -->
      <div class="parcel-pagesize">
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="list.pageIndex"
            :page-size="list.pageSize"
            :layout="list.layout"
            :total="DataCount"
            background
          ></el-pagination>
        </div>
      </div>
    </div>

    <!--- 物流轨迹--->
    <div class="home-modle">
      <el-dialog
        title
        :visible.sync="IsOrShow"
        :before-close="closeLogisticsTrack"
      >
        <!-- 表格 -->
        <div class="parcel-table">
          <el-table
            v-loading="loading"
            :data="BoxLogistics"
            border
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              prop="RouteText"
              :label="$t('box.RoutInfo')"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="Time"
              :label="$t('box.OperationTime')"
              align="center"
            ></el-table-column>
          </el-table>
        </div>
      </el-dialog>
    </div>

    <!-- 支付运费 -->
    <div class="parcel-pay" v-if="isTitle === 1">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column
          prop="BoxCode"
          :label="$t('box.BoxCode')"
          width="200"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="Weight"
          :label="$t('box.Weight')"
          width="100"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="ExportFreight"
          :label="$t('box.ExportFreight') + '(' + symbol + ')'"
          width="160"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="HomeFreight"
          :label="$t('box.HomeFreight') + '(' + symbol + ')'"
          width="220"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="TotalAmt"
          :label="$t('box.Subtotal') + '(' + symbol + ')'"
          width="150"
          align="center"
        >
        </el-table-column>
      </el-table>
      <!-- 国际物流运费 -->
      <div class="parcel-inter">
        <span>{{ $t("box.ExportFreight") }}:</span>
        <span>{{ TotalExportFreight + symbol }}</span>
      </div>
      <!-- 配送到家运费 -->
      <div class="parcel-inter-home">
        <span>{{ $t("box.HomeFreight") }}:</span>
        <span>{{ TotalHomeFreight + symbol }}</span>
      </div>
      <!-- 总金额 -->
      <div class="parcel-total-amount">
        <span>{{ $t("myparcel.The total amount") }}:</span>
        <span>{{ TotalAmtFreight + symbol }}</span>
      </div>
      <!-- 支付运费 -->
      <button class="parcel-button" @click="ConfirmPay">
        {{ $t("box.ConfirmPay") }}
      </button>
    </div>

    <!--支付订单-->
    <div class="outside-total" v-show="isPay">
      <div class="outside-total-amount">
        <span>{{ $t("outside.freight_amount") }}:</span>
        <span v-if="this.TotalAmtFreight">
          {{ TotalAmtFreight }}{{ symbol }}</span
        >
      </div>

      <!-- 支付方式 -->
      <div class="outside-pay">
        <h1>{{ $t("outside.Method of payment") }}</h1>
        <div class="outside-pay-style">
          <span>{{ $t("outside.Method of payment") }}:</span>
          <ul>
            <!-- <li
              v-for="(list, index) in payTitleList"
              :style="{ 'border-color': isPayMode === list.id ? '#d33319' : '' }"
              @click="handlePay(index, list.id)"
              :key="list.id"
            >
              {{ list.name }}
              <img src="@/img/hook.png" v-if="isIndex === index" />
            </li> -->
            <li
              :style="{ 'border-color': isPayMode === 0 ? '#d33319' : '' }"
              @click="handlePay"
            >
              {{ $t("box.Balance")
              }}<img src="@/img/hook.png" v-if="isPayMode === 0" />
            </li>
            <!-- 自提现金支付 -->
            <li
              :style="{
                'border-color': isPayMode === 2 ? '#d33319' : '',
                cursor: storageRow.IsZT == 1 ? 'no-drop' : ''
              }"
              @click="handlePayCash"
              v-if="storageRow.IsZT == 0"
            >
              {{ $t("myparcel.cash")
              }}<img src="@/img/hook.png" v-if="isPayMode === 2" />
            </li>
            <!-- 派送不能现金支付 -->
            <el-tooltip
              class="item"
              effect="dark"
              :content="$t('myparcel.supported_delivery')"
              placement="bottom"
              v-if="storageRow.IsZT == 1"
            >
              <li
                :style="{
                  'border-color': isPayMode === 2 ? '#d33319' : '',
                  cursor: storageRow.IsZT == 1 ? 'no-drop' : ''
                }"
                @click="handlePayCash"
              >
                {{ $t("myparcel.cash")
                }}<img src="@/img/hook.png" v-if="isPayMode === 2" />
              </li>
            </el-tooltip>
          </ul>
        </div>
      </div>

      <!-- 可用余额 -->
      <div class="outside-balance">
        <span>{{ $t("outside.Available balance") }}:</span>
        <span>{{ balanceMoney }}{{ symbol }}</span>
      </div>

      <!-- 收款信息 暂时注释 -->
      <!-- <div class="outside-get-infor" v-if="this.isId == 1">
        <h1>{{ $t("outside.Gathering information") }}</h1>
        <div class="outside-details-infor">
          <p>
            <span>{{ $t("outside.Payment account") }}:</span>
            <span>{{ this.account }}</span>
          </p>
          <p>
            <span>{{ $t("outside.Collecting bank") }}:</span>
            <span>{{ this.bank }}</span>
          </p>
          <p>
            <span>{{ $t("outside.Name of payee") }}:</span>
            <span>{{ this.accountName }}</span>
          </p>
        </div>
      </div> -->

      <!-- 转账回执 暂时注释-->
      <!-- <div class="outside-bank-transfer" v-if="this.isId == 1">
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
      </div> -->

      <!-- 保存 -->
      <div class="outside-save">
        <button @click="handlePayOrder">{{ $t("outside.submit") }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import { getObtain } from "@/unilts/auth";
import {
  symbol,
  CountryCode,
  account,
  bank,
  accountName,
  centimeter
} from "@/entry/index";
import { mapActions, mapState } from "vuex";
import { log } from "util";
export default {
  name: "parcel",
  data() {
    return {
      storageRow: "", //存储每一行的信息
      centimeter: "", //长宽高单位cm
      isOrtherOk: false, //控制财务信息第二个模块的显示与隐藏
      isOrtherISOk: true, //控制财务信息第一个模块的显示与隐藏
      account: "",
      bank: "",
      accountName: "",
      symbol: "", //越南盾符号
      BoxCodes: [], //箱子号数组
      TotalExportFreight: 0, //国际运费总数
      TotalHomeFreight: 0, //到家运费总数
      TotalAmtFreight: 0, //总运费
      loading: false,
      isPayMode: 0, //支付方式切换
      multipleSelection: [], //选择的数据
      //balanceMoney: 0,//可用余额
      inputDateVal: "",
      inputNameVal: "", //转账字段
      inputBankVal: "", //转账字段
      inputWhereVal: "", //转账字段
      inputNumberVal: "", //转账字段
      isPay: false,
      isId: 0,
      //我的包裹分页属性
      list: {
        //total: 0, // 总数
        pageIndex: 1, // 当前位于哪页
        pageSize: 10, // 1页显示多少条
        layout: "prev, pager, next, jumper" // 翻页属性
      },
      titleList: [
        { id: 1, name: this.$t("box.MyBox") },
        { id: 2, name: this.$t("box.PayFreight") }
      ],
      payTitleList: [
        { id: 0, name: this.$t("box.Balance") },
        { id: 2, name: this.$t("myparcel.cash") }
        // { id: 1, name: this.$t("box.Transfer") }
      ],
      isColor: 0,
      isBorderColor: 0,
      //isIndex: 0,暂时注释
      isTitle: 0, //标签切换
      startVal: "",
      value: "",
      endVal: "",
      RelatedOrder: "",
      tableData: [],
      options: [
        {
          value: "-1",
          label: this.$t("box.AllOrders")
        },
        {
          value: "0",
          label: this.$t("box.PendingPayment")
        },
        {
          value: "1",
          label: this.$t("box.Shipped")
        },
        {
          value: "2",
          label: this.$t("box.WaitingForReceipt")
        },
        {
          value: "3",
          label: this.$t("box.AlreadySigned")
        }
      ]
    };
  },
  computed: {
    ...mapState("myBox", [
      "myBoxList",
      "IsOrShow",
      "BoxLogistics",
      "balanceMoney",
      "DataCount" //总条数
    ])
  },
  methods: {
    ...mapActions("myBox", [
      "getMyBoxList",
      "getLogisticsTrack",
      "getUserBalance"
    ]),
    //每页多少条
    handleSizeChange(val) {
      //console.log(`每页 ${val} 条`);
    },
    //当前多少页
    handleCurrentChange(val) {
      let Type = this.value == "" || this.value == null ? -1 : this.value;
      let CreateDate = this.startVal;
      let CreateDateEnd = this.endVal;
      let RelatedOrder = this.RelatedOrder;
      let params = {
        UserCode: JSON.parse(getObtain()).resNew,
        Type: Type,
        RelatedOrder: RelatedOrder,
        BeginTime: CreateDate,
        EndTime: CreateDateEnd,
        PageIndex: val, //当前多少页
        PageSize: this.list.pageSize //1页显示多少条
      };

      this.getMyBoxList(params);
    },
    getPhotoArr(imageArr) {
      var newImgArr = [];
      for (let index = 0; index < imageArr.length; index++) {
        const element = imageArr[index];
        newImgArr.push(element.LargeImg);
      }
      return newImgArr;
    },
    //title
    handleTitle(index) {
      this.isOrtherOk = !this.isOrtherOk;
      this.isOrtherISOk = !this.isOrtherISOk;
      this.isPay = false;
      this.isTitle = 0;
      //默认余额支付
      this.isPayMode = 0;
      this.isId = 0;
    },
    //选择状态
    handleType(value) {
      this.value = value;
    },
    //表格勾选
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 判断是否可以勾选（只有状态为0，即待支付）
    setSelectAble(row) {
      return row.DataState == 0;
      //event事件对象, 函数不会在事件发生前被执行
      // if (event == undefined) {
      //   // let isSelect = false;
      //   // let isOkSelect = false;
      //   if (row.DataState == 0) {
      //     //   if (myBoxList[i].IsZT == 1) {
      //     //     isSelect = true;
      //     //     if (myBoxList[i].IsZT == 0) {
      //     //       isOkSelect = true;
      //     //       //console.log(2, isOkSelect);
      //     //     }
      //     //     //console.log(1, isSelect);
      //     //   }
      //     //   if (myBoxList[i].IsZT == 0) {
      //     //     isOkSelect = true;
      //     //     if (myBoxList[i].IsZT == 1) {
      //     //       isSelect = true;
      //     //       //console.log(2, isSelect);
      //     //     }
      //     //     //console.log(2, isOkSelect);
      //     //   }
      //     //   if (isSelect && isOkSelect) {
      //     //     this.$message({
      //     //       message: "bunnef",
      //     //       type: "warning"
      //     //     });
      //     //     return row.IsZT == 0;
      //     //   }
      //     // }
      //     // if(isSelect && !isOkSelect) {
      //     //   return true;
      //     // }
      //     // if(!isSelect && isOkSelect) {
      //     //   return true;
      //     // }
      //     return true;
      //   }
      // }
      //return row.DataState == 0;
    },
    //物流查询
    dialogPolice(index, row) {
      let params = {
        CountryCode: CountryCode,
        BoxCode: row.BoxCode
      };
      this.getLogisticsTrack(params);
      this.$store.commit("myBox/ShowLogisticsTrack", true);
    },
    formatState(row, column) {
      let State = row[column.property];
      switch (State) {
        case 0:
          return this.$t("box.PendingPayment");
          break;
        case 1:
          return this.$t("box.Shipped");
          break;
        case 2:
          return this.$t("box.WaitingForReceipt");
          break;
        case 3:
          return this.$t("box.AlreadySigned");
          break;
        default:
          break;
      }
    },
    QueryBoxList() {
      this.pageIndex = 1;
      let Type = this.value == "" || this.value == null ? -1 : this.value;
      let CreateDate = this.startVal;
      let CreateDateEnd = this.endVal;
      let RelatedOrder = this.RelatedOrder;
      let params = {
        UserCode: JSON.parse(getObtain()).resNew,
        Type: Type,
        RelatedOrder: RelatedOrder,
        BeginTime: CreateDate,
        EndTime: CreateDateEnd,
        PageIndex: this.list.pageIndex, //当前多少页
        PageSize: this.list.pageSize //1页显示多少条
      };

      this.getMyBoxList(params);
    },
    closeLogisticsTrack() {
      this.$store.commit("myBox/ShowLogisticsTrack", false);
    },
    //单行支付运费
    dialogCheck(row) {
      this.storageRow = row; //存储每一行的数据, 判断isZT是否可以现金支付
      this.tableData = [];
      this.BoxCodes = [];
      this.isOrtherISOk = !this.isOrtherISOk; //支付模块显示
      this.isOrtherOk = !this.isOrtherOk; //财务信息模块失去光标
      this.isTitle = 1;
      //this.isPay = !this.isPay;
      //this.handleTitle(1);
      let PayFreight = {
        BoxCode: row.BoxCode,
        Weight: row.Weight,
        ExportFreight: row.ExportFreight,
        HomeFreight: row.HomeFreight,
        TotalAmt: row.TotalAmt
      };
      this.tableData.push(PayFreight);
      this.TotalExportFreight = row.ExportFreight;
      this.TotalHomeFreight = row.HomeFreight;
      this.TotalAmtFreight = row.TotalAmt;
      this.BoxCodes.push(row.BoxCode);
    },
    handlePayCode() {
      //多行支付运费
      this.BoxCodes = [];
      let multipleSelection = this.multipleSelection;
      if (multipleSelection.length == 0) {
        this.$message({
          message: this.$t("box.Warning"),
          type: "warning"
        });
        return;
      }
      this.isOrtherISOk = !this.isOrtherISOk; //支付模块显示
      this.isOrtherOk = !this.isOrtherOk; //财务信息模块失去光标
      this.isTitle = 1;
      //this.handleTitle(1);
      this.tableData = multipleSelection;
      for (let index = 0; index < multipleSelection.length; index++) {
        const element = multipleSelection[index];
        this.TotalExportFreight += element.ExportFreight;
        this.TotalHomeFreight += element.HomeFreight;
        this.TotalAmtFreight += element.TotalAmt;
        this.BoxCodes.push(element.BoxCode);
      }
    },
    ConfirmPay() {
      //确认支付
      this.isPay = true;
      this.isTitle = 2;
    },
    // 支付方式切换
    handlePay() {
      this.isPayMode = 0;
      this.isId = 0;
      //this.isIndex = index;
    },
    handlePayCash() {
      if (this.storageRow.IsZT == 1) {
        return;
      }
      this.isPayMode = 2;
      this.isId = 2;
    },
    // 获取用户余额
    getBalanceUser() {
      let params = {
        UserCode: JSON.parse(getObtain()).resNew
      };
      this.getUserBalance(params);
    },
    //订单支付保存
    handlePayOrder() {
      let params = {
        UserCode: JSON.parse(getObtain()).resNew,
        Type: -1,
        RelatedOrder: "",
        BeginTime: "",
        EndTime: "",
        PageIndex: this.list.pageIndex, //当前多少页
        PageSize: this.list.pageSize //1页显示多少条
      };
      if (this.isPayMode != 0 && this.isPayMode != 2) {
        this.$message.warning(this.$t("box.PayWarning"));
      } else {
        if (this.isId == 0) {
          if (this.balanceMoney < this.TotalAmtFreight) {
            this.$message.warning(this.$t("box.BalanceWarning"));
            return;
          } else {
            let paras = {
              CountryCode: CountryCode, //国家编码
              UserCode: JSON.parse(getObtain()).resNew, //会员号
              PayMode: this.isPayMode, //支付方式
              BoxCodes: this.BoxCodes, //采购订单集
              ExportAmt: this.TotalExportFreight, //国际运费金额
              HomeAmt: this.TotalHomeFreight, //配送到家金额
              TotalAmt: this.TotalAmtFreight //总金额
            };
            this.$api.SubmitFreightPayOrder(paras).then(res => {
              if (res) {
                this.$message({
                  message: this.$t("box.PaySuccess"),
                  type: "success"
                });
                this.isOrtherISOk = true;
                this.isOrtherOk = false;
                this.isTitle = 0;
                this.isPay = false;

                this.getMyBoxList(params);
              }
            });
            //暂时注释
            // this.TransferDate = "";
            // this.TransferName = "";
            // this.TransferBankAccount = "";
            // this.TransferBankBank = "";
            // this.TransferSN = "";
          }
        } else if (this.isId == 2) {
          let paras = {
            CountryCode: CountryCode, //国家编码
            UserCode: JSON.parse(getObtain()).resNew, //会员号
            PayMode: this.isPayMode, //支付方式
            BoxCodes: this.BoxCodes, //采购订单集
            ExportAmt: this.TotalExportFreight, //国际运费金额
            HomeAmt: this.TotalHomeFreight, //配送到家金额
            TotalAmt: this.TotalAmtFreight //总金额
          };

          this.$api.SubmitFreightPayOrder(paras).then(res => {
            if (res) {
              this.$message({
                message: this.$t("box.PaySuccess"),
                type: "success"
              });
              this.isOrtherISOk = true;
              this.isOrtherOk = false;
              this.isTitle = 0;
              this.isPay = false;
              this.getMyBoxList(params);
            }
          });
          //暂时注释
          // if (
          //   this.inputDateVal == "" ||
          //   this.inputNameVal == "" ||
          //   this.inputBankVal == "" ||
          //   this.inputWhereVal == "" ||
          //   this.inputNumberVal == ""
          // ) {
          //   this.$message.warning(this.$t("box.BalanceWarning"));
          //   return;
          // }
        } else {
          return;
        }
        //暂时注释
        // let params = {
        //   CountryCode: CountryCode, //国家编码
        //   UserCode: JSON.parse(getObtain()).resNew, //会员号
        //   PayMode: this.isPayMode, //支付方式
        //   ExportAmt: this.TotalExportFreight, //国际运费金额
        //   HomeAmt: this.TotalHomeFreight, //配送到家金额
        //   TotalAmt: this.TotalAmtFreight, //总金额
        //   BoxCodes: this.BoxCodes,
        //   TransferDate: this.inputDateVal, //转账日期
        //   TransferName: this.inputNameVal, //转账人姓名
        //   TransferBankAccount: this.inputBankVal, //转账银行账号
        //   TransferBankBank: this.inputWhereVal, //转账银行开户行
        //   TransferSN: this.inputNumberVal //转账银行流水号
        // };
        //暂时注释
        // this.$api.SubmitFreightPayOrder(params).then(res => {
        //   if (res.Data) {
        //     this.$message({
        //       message: this.$t("box.PaySuccess"),
        //       type: "success"
        //     });

        //     this.isPay = false;
        //     this.isTitle = 0;
        //     this.isColor = 0;
        //     this.QueryBoxList();
        //     this.getBalanceUser();
        //   } else {
        //     this.$message({
        //       message: res.Msg,
        //       type: "warning"
        //     });
        //   }
        // });
      }
    }
  },
  created() {
    //长宽高单位cm
    (this.centimeter = centimeter),
      //越南盾符号
      (this.symbol = symbol);
    this.account = account;
    this.bank = bank;
    this.accountName = accountName;

    this.getBalanceUser();
    let params = {
      UserCode: JSON.parse(getObtain()).resNew,
      Type: -1,
      RelatedOrder: "",
      BeginTime: "",
      EndTime: "",
      PageIndex: this.list.pageIndex, //当前多少页
      PageSize: this.list.pageSize //1页显示多少条
    };
    // 判断是否是从采购订单列表-包裹追踪过来的
    let PurchaseOrderCode = localStorage.getItem("PurchaseOrderCode");
    if (PurchaseOrderCode) {
      params.RelatedOrder = PurchaseOrderCode;
      localStorage.removeItem("PurchaseOrderCode");
    }
    this.getMyBoxList(params);
  }
};
</script>

<style scoped lang="less">
@import "~@/styles/common/variable.less";

.parcel-total {
  margin-top: 15px;
  //标题
  .parcel-title {
    ul {
      display: flex;
      margin-left: 20px;
      min-width: 910px;
      min-height: 50px;
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
  .parcel-pay {
    margin: 35px 0 0 20px;
  }

  //国际物流运费
  .parcel-inter {
    font-size: 14px;
    color: @order-six;
    // margin-top: 20px;
    margin-top: 95px;
    // text-align: right;
    span:nth-child(1) {
      margin: 0 10px 0 418px;
    }
    span:nth-child(2) {
      color: @code-blue;
      font-size: 14px;
    }
  }
  //派送到家运费
  .parcel-inter-home {
    margin: 35px 0 0 545px;
    span {
      font-size: 14px;
    }
    span:nth-child(1) {
      margin-right: 10px;
    }
    span:nth-child(2) {
      color: @code-blue;
    }
  }
  //总金额
  .parcel-total-amount {
    margin: 35px 0 0 600px;

    span:nth-child(1) {
      font-size: 16px;
      margin-right: 10px;
    }

    span:nth-child(2) {
      font-size: 16px;
      font-weight: 900;
      color: @home-logo;
    }
  }

  //支付运费
  .parcel-button {
    min-width: 136px;
    min-height: 40px;
    font-size: 14px;
    border: none;
    border-radius: 5px;
    background: @home-logo;
    color: @fff;
    font-weight: 900;
    margin: 21px 0 0 650px;
    cursor: pointer;
    outline: none;
  }

  //相关单号
  .financial-related {
    input {
      padding-left: 10px;
      width: 230px;
      height: 37px;
      border-radius: 4px;
      border: 1px solid @ccc;
      color: @ccc;
      margin-right: 5px;
    }
  }

  //我的包裹
  .parcel-myparcel {
    margin: 20px 0 0 20px;

    //所有订单
    .parcel-all {
      /deep/.el-input__inner {
        width: 180px;
        height: 40px;
        text-align: center;
      }

      /deep/.el-input__icon {
        margin-right: 15px;
      }
    }

    .parcel-operation {
      display: flex;

      //支付时间
      .parcel-pay-time {
        display: flex;
        margin: 0 5px 0 20px;
        .parcel-pay-end {
          margin-left: 50px;
        }
        /deep/.el-input__inner {
          width: 210px;
          height: 40px;
        }

        /deep/.el-date-editor {
          width: 150px;
        }

        span {
          font-size: 14px;
          color: @order-six;
          margin: 13px 5px 0 0;
        }

        p {
          width: 15px;
          height: 1px;
          background: @ccc;
          margin: 20px 5px 0 5px;
        }
      }
    }

    //表格
    .parcel-table {
      margin-top: 35px;
      .parcel-payment {
        img {
          width: 20px;
          height: 20px;
          position: relative;
          top: 3px;
        }
      }
      .parcel-logistics {
        img {
          width: 20px;
          height: 20px;
          position: relative;
          top: 3px;
        }
      }
      .parcel-pay-money {
        min-width: 70px;
        min-height: 28px;
        background: @home-logo;
        color: @fff;
      }

      .parcel-query {
        min-width: 70px;
        min-height: 28px;
        background: @home-logo;
        color: @fff;
      }
    }

    //分页
    .parcel-pagesize {
      margin: 80px 0 0 400px;
      //分页组件样式

      /deep/.active {
        background: @order-active !important;
      }

      /deep/.el-pagination.is-background .el-pager li:not(.disabled):hover {
        color: @home-p;
      }
    }
  }
}

//操作按钮
.parcel-operation-button {
  margin-top: 15px;
  display: flex;

  .parcel-pay-loan {
    min-width: 99px;
    min-height: 40px;
    margin-left: 22px;
    border: none;
    color: @fff;
    border-radius: 6px;
    background: linear-gradient(to right, @order-search, @order-search-button);
  }

  .parcel-search-button {
    width: 99px;
    height: 40px;
    background: linear-gradient(to right, @order-search, @order-search-button);
    border: none;
    margin-left: 30px;
    border-radius: 6px;
    color: @fff;
    margin-right: 10px;
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
          cursor: pointer;
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
