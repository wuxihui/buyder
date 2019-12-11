<template>
  <div class="paid-total">
    <div class="paid-title">
      <ul>
        <li
          v-for="(list, index) in titleList"
          @click="handleTitle(index)"
          :key="list.id"
          :style="{'color': isColor === index ? '#d33319' : '' , 'border-color': isBorderColor === index ? '#DC143C' : ''}"
        >{{list.name}}</li>
      </ul>
    </div>
    <!-- 代付订单 -->
    <div class="paid-order" v-if="isIndex === 0">
      <div class="paid-operation">
        <!-- 所有订单 -->
        <div class="paid-all">
          <el-select v-model="inputAll" placeholder="所有订单">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <!-- 支付时间 -->
        <div class="paid-pay-time">
          <span>{{$t("myparcel.Payment time")}}</span>
          <div class="paid-pay-start">
            <el-date-picker v-model="startVal" type="datetime" :placeholder="$t('outside.Select-date-time')"></el-date-picker>
          </div>
          <p></p>
          <div class="paid-pay-end">
            <el-date-picker v-model="endVal" type="datetime" :placeholder="$t('outside.Select-date-time')"></el-date-picker>
          </div>
        </div>
        <!-- 操作按钮 -->
        <div class="paid-operation-button">
          <button class="paid-search-button">{{$t("outside.query")}}</button>
          <button class="paid-pay-loan">{{$t("paid.The new payment")}}</button>
        </div>
      </div>
      <!-- 表格 -->
      <div class="paid-table">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="date" :label="$t('paid.date')" width="200" align="center"></el-table-column>
          <el-table-column prop="name" :label="$t('shopList.name')" width="200" align="center"></el-table-column>
          <el-table-column prop="address" :label="$t('shopList.address')" align="center"></el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <div class="paid-paging">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage3"
          :page-size="100"
          layout="prev, pager, next"
          background
          :total="1000"
        ></el-pagination>
      </div>
    </div>
    <!-- 新增订单 -->
    <div class="paid-new-order" v-if="isIndex === 1">
      <p>
        <span>{{$t("paid.Payment account")}}:</span>
        <span>13800138001</span>
        <span>({{$t("paid.Support taobao")}})</span>
      </p>
      <p>
        <span>{{$t("paid.Paid amount")}}:</span>
        <input type="text" v-model="inputPaid" />
      </p>
      <p>
        <span>{{$t("shopList.name")}}:</span>
        <input type="text" v-model="inputName" />
      </p>
      <p>
        <span>{{$t("paid.Application date")}}:</span>
        <input type="text" v-model="inputTime" />
      </p>
      <p>
        <span>{{$t("paid.Paid amount")}}:</span>
        <input type="text" v-model="inputPaidOn" />
      </p>
      <p>{{$t("outside.Method of payment")}}</p>
      <p>
          <span>{{$t("outside.Method of payment")}}:</span>
          <ul>
              <li
                  v-for="(list, index) in balances"
                  :key="list.id"
                  :style="{'border-color' : isId === index ? '#d33319' : ''}"
                  @click="handlePay(index)">
                  {{list.name}}
               <img src="@/img/hook.png" v-if="isId === index" />
              </li>

          </ul>
     </p>
     <p>
         <span>{{$t("outside.Available balance")}}:</span>
         <span>888</span>
     </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "paid",
  data() {
    return {
      inputAll: "",
      startVal: "",
      endVal: "",
      inputPaid: "",
      inputTime: "",
      inputName: "",
      inputPaidOn: "",
      isId: 0,
      isColor: 0,
      currentPage3: 1,
      isIndex: 0,
      isBorderColor: 0,
      balances: [
          { id: 1, name: "余额" },
          { id: 2, name: "转账" },
      ],
      titleList: [{ id: 1, name: "代付订单" }, { id: 2, name: "新增订单" }],
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        }
      ],
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ]
    };
  },
  methods: {
    //title
    handleTitle(index) {
      this.isColor = index;
      this.isBorderColor = index;
      this.isIndex = index;
    },
    //每页多少条
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    //当前多少页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    //选择支付方式
    handlePay(index) {
        this.isId = index;
    }
  }
};
</script>

<style  lang="less">
@import "~@/styles/common/variable.less";
.paid-total {
  //代付订单
  .paid-order {
    //所有订单
    .paid-all {
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
    .paid-pay-time {
      .el-input__inner {
        width: 150px;
        height: 40px;
      }
      .el-date-editor {
        width: 150px;
      }
    }
    //分页
    .paid-paging {
      .active {
        background: @order-active !important;
      }
      .el-pagination.is-background .el-pager li:not(.disabled):hover {
       color: @home-p;
      }
    }
  }
}
</style>

<style scoped lang="less">
@import "~@/styles/common/variable.less";
.paid-total {
  margin-top: 15px;
  //标题
  .paid-title {
    ul {
      display: flex;
      margin-left: 20px;
      width: 910px;
      height: 50px;
      border-bottom: 1px solid rgba(232, 232, 232, 1);
      li {
        width: 64px;
        height: 50px;
        font-size: 16px;
        line-height: 50px;
        text-align: center;
        border-bottom: 2px solid rgba(232, 232, 232, 1);
      }
      li:nth-child(2) {
        margin-left: 20px;
      }
    }
  }
  //待付订单
  .paid-order {
    margin: 20px 0 0 20px;
    .paid-operation {
      display: flex;
      //支付时间
      .paid-pay-time {
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
          margin: 20px 5px 0 5px;
        }
      }
    }
    //操作按钮
    .paid-operation-button {
      display: flex;
      .paid-search-button {
        width: 99px;
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
      .paid-pay-loan {
        width: 99px;
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
    .paid-table {
      margin-top: 20px;
    }
    //分页
    .paid-paging {
      margin: 80px 0 0 500px;
    }
  }
  //新增订单
  .paid-new-order {
      margin: 20px 0 0 20px;
      //代付账号
      p:nth-child(1) {
          span:nth-child(1) {
            font-size: 14px;
            font-weight: 900;
            color: @home-p;
            margin-right: 10px;
          }
          span:nth-child(2) {
            font-size: 14px;
            font-weight: 900;
            color: @home-p;
            margin-right: 15px;
          }
          span:nth-child(3) {
            font-size: 14px;
            color: @paid-a;
          }
      }
      //代付金额
       p:nth-child(2) {
           margin-top: 20px;
          span {
            font-size: 14px;
            color: @home-p;
            margin-right: 10px;
          }
          input {
            width: 280px;
            height: 30px;
            border:1px solid @order-li;
            border-radius:4px;
          }
      }
      //姓名
       p:nth-child(3) {
           margin-top: 20px;
          span {
            font-size: 14px;
            color: @home-p;
            margin: 0 10px 0 28px;
          }
          input {
            width: 280px;
            height: 30px;
            border:1px solid @order-li;
            border-radius:4px;
          }
      }
      //申请日期
       p:nth-child(4) {
           margin-top: 20px;
          span {
            font-size: 14px;
            color: @home-p;
            margin: 0 10px 0 0;
          }
          input {
            width: 280px;
            height: 30px;
            border:1px solid @order-li;
            border-radius:4px;
          }
      }
      //代付金额
       p:nth-child(5) {
           margin-top: 20px;
          span {
            font-size: 14px;
            color: @home-p;
            margin: 0 10px 0 0;
          }
          input {
            width: 280px;
            height: 30px;
            border:1px solid @order-li;
            border-radius:4px;
          }
      }
      //支付方式
       p:nth-child(6) {
           margin-top: 30px;
           font-weight: 900;
           font-size: 16px;
      }
       //支付方式选择
       p:nth-child(7) {
           margin-top: 20px;
           font-size: 14px;
           display: flex;
           span {
               margin: 8px 10px 0 0;
           }
           ul {
               display: flex;
               li {
                   width: 100px;
                   height: 30px;
                   text-align: center;
                   border: 1px solid @order-li;
                   line-height: 30px;
                   margin-right: 10px;
                   position: relative;
                   img {
                       position:absolute;
                       right: 0;
                       bottom: 0;
                   }
               }
           }
      }
      //可用余额
        p:nth-child(8) {
           margin-top: 20px;
           span {
               font-size: 14px;
           }
           span:nth-child(1) {
               margin-right: 10px;
           }
           span:nth-child(2) {
               font-weight: 900;
               color: @home-logo;
           }
      }
  }
}
</style>