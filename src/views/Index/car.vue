<template>
  <div class="car-total">
    <h1>{{ $t("car.The shopping cart") }}</h1>

    <!-- 表格 -->
    <div class="car-table">
      <el-table
        ref="multipleTable"
        :data="goodList"
        border
        style="width: 100%"
        v-if="this.IsDelay"
        :span-method="cellMerge"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="MainTitle"
          :label="$t('car.Name of commodity')"
          width="300"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="Specification"
          :label="$t('set.specifications')"
          width="200"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="GoodsPrice"
          :label="$t('shopList.The-unit-price') + '(' + symbol + ')'"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="ChinaFreight"
          :label="$t('shopList.China-freight-money') + '(' + symbol + ')'"
          width="200"
          align="center"
        ></el-table-column>
        <!-- <el-table-column
          prop="BuyFee"
          :label="$t('shopList.Code-and-fees') + '(' + symbol + ')'"
          align="center"
        > -->
        <!-- </el-table-column> -->
        <el-table-column
          :label="$t('details.number')"
          width="180"
          align="center"
        >
          <template scope="scope">
            <el-input-number
              v-model="scope.row.QTY"
              @change="handleChange(scope.$index, scope.row)"
              :min="1"
              label
            ></el-input-number>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('box.Operation') + '(' + symbol + ')'"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              @click="handleDeleteShop(scope.$index, scope.row)"
              size="small"
              type="text"
              class="car-query"
            >
              <el-tooltip
                class="item"
                effect="dark"
                :content="$t('car.delete')"
                placement="bottom"
              >
                <i class="el-icon-delete"></i>
              </el-tooltip>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 批量删除 -->
    <div class="car-delete">
      <button @click="handleBatchDelete">
        <el-tooltip
          class="item"
          effect="dark"
          :content="$t('car.delete')"
          placement="bottom"
        >
          <i class="el-icon-delete"></i>
        </el-tooltip>
        <span>{{ $t("car.Delete selected item") }}</span>
      </button>
    </div>

    <!-- 合计 -->
    <div class="car-combined">
      <p class="f_r moneyColor">
        <span style="text-decoration:line-through"
          >{{ buyFee }}{{ symbol }}</span
        >
        —— {{ discountBuyFeeL }}{{ symbol }}
      </p>
      <p>{{ $t("shopList.The total amount of handling charge") }}:</p>
      <p class="f_r moneyColor">
        {{ TotalAmount }}{{ symbol }}
      </p>
      <p>{{ $t("car.combined") }}:</p>
    </div>

    <!-- 提交订单 -->
    <div class="car-submit">
      <button @click="handleSubmitOrder">{{ $t("car.Submit orders") }}</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { getImgShops, getObtain } from "@/unilts/auth";
import { symbol, CountryCode } from "@/entry/index";
import { accAdd, accMul, accSub } from "@/algo/index";
export default {
  name: "car",
  data() {
    return {
      IsDelay:false,
      spanArr:[],
      buyFee: 0, //代买手续费原金额
      discountBuyFeeL: 0, //折扣代买手续费
      totalMoneys: "",
      userCode: "",
      symbol: "",
      multipleSelection: [],
      moneyPrices: 0,
      TotalAmount: 0, //合计总金额
      goodList: [] //购物车列表
    };
  },
  //暂时注释
  // computed: {
  //   ...mapState("shopList", [
  //     "carLists", //购物车列表
  //     "moneyTotals", //商品总价格
  //     "codeLists", //代买手续费金额
  //     "chinaMoneys" //中国运费总金额
  //   ])
  // },
  methods: {
    ...mapActions("shopList", ["getGoodsList"]),
    //数量增加或减少
    handleChange(index, item) {
      let goodList = this.goodList;
      let CalQty = accSub(item.QTY, item.originQTY);
      this.moneyPrices = accAdd(this.TotalAmount, item.QTY);
      let params = {
        UserCode: this.userCode,
        UID: item.UID,
        CalQty: CalQty
      };
      //增加或减少，get
      this.$api.getAddShopOrDeleteShop(params).then(res => {
        goodList[index].originQTY = goodList[index].QTY;
        let paraes = {
          UserCode: this.userCode,
          CarGoodsUid: ""
        };
        //获取代购车列表
        this.$api.getMyPurchaseCar(paraes).then(res => {
          //变化后的合计总金额计算
          let resGoods = 0; //单价乘以数量的价格
          let resChinaYun = 0; //国内运费总金额越南盾币
          let CalculationAmount = 0; //计算总额
          for (let i = 0; i < this.goodList.length; i++) {
            //单价乘以数量的价格
            resGoods = accMul(goodList[i].QTY, goodList[i].GoodsPrice);
            if (i > 0) {
              if (this.goodList[i].GoodsURL != this.goodList[i-1].GoodsURL) {
                resChinaYun = accAdd(this.goodList[i].ChinaFreight, resChinaYun).toFixed(2);
              }else{
                resChinaYun = 0;
              }
            }else{
              resChinaYun = accAdd(this.goodList[i].ChinaFreight, resChinaYun).toFixed(2);
            }
          
            CalculationAmount += parseFloat(accAdd(resChinaYun, resGoods).toFixed(2));
          }
          //商品总价，包括运费总金额, 加上折扣代买手续费
          this.TotalAmount = accAdd(CalculationAmount, this.discountBuyFeeL).toFixed(2);
        });
      });
      //暂时注释
      // let carList = this.carLists;
      // let CalQty = accSub(item.QTY, item.originQTY);
      // this.moneyPrices = accAdd(this.moneyTotals, item.QTY);
      // let params = {
      //   UserCode: this.userCode,
      //   UID: item.UID,
      //   CalQty: CalQty
      // };
      // //增加或减少，get
      // this.$api.getAddShopOrDeleteShop(params).then(res => {
      //   carList[index].originQTY = carList[index].QTY;
      //   this.$store.commit("shopList/SETCARLISTS", carList);
      //   let paraes = {
      //     UserCode: this.userCode,
      //     CarGoodsUid: ""
      //   };
      //   this.getGoodsList(paraes);
      //});
    },
    //删除
    handleDeleteShop(index, row) {
      let paraes = {
        UserCode: this.userCode,
        CarGoodsUid: ""
      };
      let uidArr = [];
      uidArr.push(row.UID);
      let params = {
        UserCode: this.userCode,
        CountryCode: CountryCode,
        Uids: uidArr
      };
      //删除
      this.$api.deleteShops(params).then(res => {
        if (res) {
          this.$api.getMyPurchaseCar(paraes).then(res => {
            this.goodList = res.Data.CarGoodsList;
            this.$nextTick(() => {
              this.spanArr = [];
              this.getSpanArr(this.goodList);//重新绑定数据合并行
              for (let i = 0; i < this.goodList.length; i++) {
                this.$refs.multipleTable.toggleRowSelection(
                  this.goodList[i],
                  true
                );
              }
            });
          });
        } else {
          this.$message({
            message: res.Msg,
            type: "warning"
          });
        }
      });
      
    },
    //批量删除
    handleBatchDelete() {
      let paraes = {
        UserCode: this.userCode,
        CarGoodsUid: ""
      };
      let uidArr = [];
      for (let i = 0; i < this.multipleSelection.length; i++) {
        uidArr.push(this.multipleSelection[i].UID);
      }
      let params = {
        UserCode: this.userCode,
        CountryCode: CountryCode,
        Uids: uidArr
      };
      if (this.multipleSelection.length === 0) {
        this.$message.warning(this.$t("car.selectDelete"));
      } else {
        //删除
        this.$api.deleteShops(params).then(res => {
          if (res.Data) {
            //获取所有商品,get请求
            this.$api.getMyPurchaseCar(paraes).then(res => {
              this.goodList = res.Data.CarGoodsList;
              this.$nextTick(() => {
                this.spanArr = [];
                this.getSpanArr(this.goodList);//重新绑定数据合并行
                for (let i = 0; i < this.goodList.length; i++) {
                  this.$refs.multipleTable.toggleRowSelection(
                    this.goodList[i],
                    true
                  );
                }
              });
            });
          } else {
            this.$message({
              message: res.Msg,
              type: "warning"
            });
          }
        });
      }
    },
    //表格勾选
    handleSelectionChange(val) {
      this.multipleSelection = val;
      let mulArr = this.multipleSelection;
      let rowArr = [];
      let moneys = 0;
      for (let i = 0; i < mulArr.length; i++) {
        let GoodsPrices = accMul(mulArr[i].GoodsPrice, mulArr[i].QTY);
        let ChinaFreight = parseFloat(mulArr[i].ChinaFreight);
        if (i > 0) {
          if (mulArr[i].GoodsURL != mulArr[i-1].GoodsURL) {
            //moneys += parseFloat(accAdd(GoodsPrices, ChinaFreight)).toFixed(2);
            moneys += GoodsPrices+ChinaFreight;
          }else{
            //moneys += parseFloat(accAdd(GoodsPrices, 0)).toFixed(2);
            moneys += GoodsPrices;
          }
        }else{
          //moneys += parseFloat(accAdd(GoodsPrices, ChinaFreight)).toFixed(2);
          moneys += GoodsPrices+ChinaFreight;
        }
        
      }
      // this.TotalAmount = rowArr.reduce((pre, item) => {
      //   return pre + item;
      // }, 0);
      //合计总金额, 加上折扣代买手续费
      this.TotalAmount = accAdd(moneys, this.discountBuyFeeL).toFixed(2);
    },
    //提交订单
    handleSubmitOrder() {
      if (this.multipleSelection.length === 0) {
        this.$message.warning(this.$t("car.goods_you_buy"));
      } else {
        let uidArr = [];
        let shopCodes = "";
        for (let i = 0; i < this.multipleSelection.length; i++) {
          uidArr.push(this.multipleSelection[i].UID);
        }
        shopCodes = uidArr.join(",");
        //获取所有商品
        this.$router.push({
          path: "shopList",
          query: { UIDArr: shopCodes }
        });
      }
    },

    getSpanArr(data) {　
      for (var i = 0; i < data.length; i++) {
        if (i === 0) {
              this.spanArr.push(1);
              this.pos = 0
        } else {
          // 判断当前元素与上一个元素是否相同
          if (data[i].GoodsURL === data[i - 1].GoodsURL) {
              this.spanArr[this.pos] += 1;
              this.spanArr.push(0);
            } else {
              this.spanArr.push(1);
              this.pos = i;
            }
        }
      }
      this.IsDelay = true;
    },
    cellMerge({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 1 || columnIndex === 4 ) {
        const _row = this.spanArr[rowIndex];
         const _col = _row > 0 ? 1 : 0;
        return {
              rowspan: _row,
               colspan: _col
        }
      }
    }

  },
  created() {
    this.userCode = JSON.parse(getObtain()).resNew;
    //获取所有商品
    let paraes = {
      UserCode: this.userCode,
      CarGoodsUid: ""
    };
    //获取代购车列表, 暂时注释
    //this.getGoodsList(paraes);
    let params = {
      CountryCode: CountryCode
    };
    //获取代买手续费
    this.$api.GetBuyFee(params).then(res => {
      if (res.Status == 200) {
        let result = res.Data;
        let arrResult = result.split(",");
        //代买手续费原金额
        this.buyFee = arrResult[0];
        //折扣代买手续费
        this.discountBuyFeeL = arrResult[1];
        //获取代购车列表
        this.$api.getMyPurchaseCar(paraes).then(res => {
          let resNew = res.Data.CarGoodsList; //购物车列表
          this.goodList = resNew; //购物车列表
          this.getSpanArr(this.goodList);
          let resShops = 0; //商品总价
          let resData = 0; //商品总价
          let resGoods = 0; //商品总价
          let resMoneyTotal = 0; //合计总金额,除去代买手续费
          let resChinaYun = 0; //中国运费总金额
          let CalculationAmount = 0; //合计总金额,加上代买手续费
          for (let i = 0; i < resNew.length; i++) {
            resNew[i].rowAddServicesCode = [];
            resNew[i].rowAddServicePrice = 0;
            //原来购买的数量先保存
            resNew[i].originQTY = resNew[i].QTY;
            //中国运费
            resNew[i].ChinaFreight = resNew[i].ChinaFreight.toFixed(2);
            
            //代买手续费
            //resNew[i].BuyFee = resNew[i].BuyFee.toFixed(2)
            //商品总金额
            resGoods = accMul(resNew[i].QTY, resNew[i].GoodsPrice);
            // resShops = accAdd(resGoods, resShops).toFixed(2);
            // resData = resShops;
            //中国运费总金额

            // resChinaYun = accAdd(resNew[i].ChinaFreight, resChinaYun).toFixed(2);

            resChinaYun = accAdd(resNew[i].ChinaFreight, resChinaYun).toFixed(
              2
            );

            if (i > 0) {
              if (resNew[i].GoodsURL != resNew[i-1].GoodsURL) {
                resChinaYun = accAdd(resNew[i].ChinaFreight, resChinaYun).toFixed(2);
              }else{
                resChinaYun = 0;
              }
            }else{
              resChinaYun = accAdd(resNew[i].ChinaFreight, resChinaYun).toFixed(2);
            }
            

            //合计总金额
            //resMoneyTotal = accAdd(0, resData).toFixed(2);
            CalculationAmount += parseFloat(accAdd(resChinaYun, resGoods).toFixed(2));
            
          }
          this.TotalAmount = accAdd(CalculationAmount, this.discountBuyFeeL).toFixed(2);

          this.$nextTick(() => {
            for (let i = 0; i < this.goodList.length; i++) {
              this.$refs.multipleTable.toggleRowSelection(
                this.goodList[i],
                true
              );
            }
          });
        });
      }
    });
    //符号
    this.symbol = symbol;
  }
};
</script>

<style scoped lang="less">
@import "~@/styles/common/variable.less";

.car-total {
  margin: 0 auto;
  width: 1200px;
  margin-top: 20px;
  padding-bottom: 60px;

  //代购车
  h1 {
    font-size: 16px;
    font-weight: 900;
    color: @home-p;
  }

  //表格
  .car-table {
    margin-top: 20px;
    z-index: 9;

    /deep/.el-input-number {
      width: 150px;
    }

    .el-icon-delete {
      font-size: 20px;
    }

    .car-query {
      color: @order-six;

      .el-icon-delete {
        margin-right: 5px;
      }
    }
  }

  //删除
  .car-delete {
    button {
      cursor: pointer;
      min-width: 130px;
      min-height: 30px;
      border: 1px solid @financial-p;
      border-radius: 5px;
      background: @fff;
      margin-top: 31px;

      .el-icon-delete {
        width: 16px;
        height: 16px;
      }

      span {
        font-size: 14px;
        color: @order-six;
        font-weight: 900;
      }
    }
  }

  //合计
  .car-combined {
    margin: 49px 0 0 850px;
    p {
      margin-bottom: 15px;
    }
    span {
      font-size: 16px;
    }
  }
  .moneyColor {
    color: @home-logo;
    font-weight: 900;
  }
  .f_r {
    float: right;
  }
  .f_l {
    float: left;
  }

  //提交
  .car-submit {
    margin: 21px 0 0 1046px;

    button {
      cursor: pointer;
      width: 136px;
      height: 40px;
      border-radius: 5px;
      color: @fff;
      background: @home-logo;
      border: none;
      outline: none;
    }
  }
}
</style>
