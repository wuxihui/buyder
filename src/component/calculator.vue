<template>
  <!-- 计算器 -->
  <div class="calculator-total">
    <h1 @click="handleDialogVisible" :title="$t('serve.Shipping_Calculator')"><img src="@/img/jisuan.png" alt /></h1>
    <el-dialog
      title
      :visible.sync="dialogVisible"
      width="400px"
      :before-close="handleClose"
    >
      <div class="calculator-code-calculator">
        <p>
          <img src="@/img/jisuanqi.png" />
          <span>{{ $t("serve.Shipping_Calculator") }}</span>
        </p>
        <p>
          <span>{{ freight }}</span>
          <span>{{ symbol }}</span>
        </p>
        <p>
          <span>{{ $t("serve.channel_line") }}:</span>
          <span>
            <el-select
              v-model="channelValue"
              :placeholder="$t('shopList.select_channel')"
              @change="handleChannel(channelValue)"
            >
              <el-option
                v-for="item in channelArr"
                :key="item.LineCode"
                :label="item.LineName"
                :value="item.LineCode"
              >
              </el-option> </el-select
          ></span>
        </p>
        <p>
          <span>{{ $t("shopList.Pickup way") }}:</span>
          <span>
            <el-select
              v-model="wayValue"
              :placeholder="$t('shopList.method_pickup')"
              @change="handleTakeWay(wayValue)"
            >
              <el-option
                v-for="item in pickeArr"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option> </el-select
          ></span>
        </p>
        <div class="serve-code-province" v-show="self == 1">
          <span>{{ $t("shopList.province") }}:</span>
          <span>
            <el-select
              v-model="provinceValue"
              :placeholder="$t('address.select-province')"
              @change="handleProvince(provinceValue)"
            >
              <el-option
                v-for="item in provincesArr"
                :key="item.UID"
                :label="item.Name"
                :value="item.UID"
              >
              </el-option> </el-select
          ></span>
        </div>
        <div class="serve-code-warehouse" v-show="self == 0">
          <span>{{ $t("shopList.Warehouse information") }}:</span>
          <span>
            <el-select
              v-model="warehouseValue"
              :placeholder="$t('serve.select_warehouse')"
              @change="handleWarehouse(warehouseValue)"
            >
              <el-option
                v-for="item in warehouseArr"
                :key="item.CenterCode"
                :label="item.AddressSimple"
                :value="item.CenterCode"
              >
              </el-option>
            </el-select>
          </span>
        </div>
        <p>
          <span>{{ $t("serve.weight") }}:</span>
          <el-input
            v-model="weight"
            :placeholder="$t('serve.enter_weight')"
            onkeyup="value = value.replace(/[^\d^\.]+/g,'')"
          ></el-input>
          <span>
            kg
          </span>
        </p>
        <p>
          <el-button @click="handleFreight">{{
            $t("serve.computed_freight")
          }}</el-button>
        </p>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { CountryCode, symbol } from "@/entry/index";
export default {
  name: "calculator",
  data() {
    return {
      symbol: "", //越南盾符号
      weight: "", //重量
      channelValue: "", //渠道线路
      wayValue: "", //取货方式
      provinceValue: "", //省
      channelArr: [], //选择的渠道线路
      provincesArr: [], //获取省集合
      warehouseArr: [], //仓库信息
      self: 0, //自提或者派送
      warehouseValue: "", //选择的仓库
      channelPreser: "", //选择的渠道保存
      warehousePreser: "", //选择的仓库保存
      provincePreser: "", //选择的省保存
      pickeArr: [
        {
          value: "0",
          label: this.$t("shopList.Since the lift")
        },
        {
          value: "1",
          label: this.$t("shopList.delivery")
        }
      ] //取件方式选择
    };
  },
  computed: {
    ...mapState("car", ["dialogVisible", "freight"])
  },
  methods: {
    ...mapActions("car", ["getFreight"]),
    //关闭弹框
    handleClose() {
      this.$store.commit("car/SETDIALOGVISIBLE", false);
    },
    //打开弹框
    handleDialogVisible() {
      this.$store.commit("car/SETDIALOGVISIBLE", true);
    },
    //选择渠道
    handleChannel(value) {
      this.channelPreser = value;
    },
    //选择仓库
    handleWarehouse(value) {
      //console.log(value);
      this.warehousePreser = value;
    },
    //就算运费
    handleFreight() {
      let params = {
        LineCode: this.channelPreser, //渠道线路编码
        IsZT: this.self, //取货方式，0：自提；1：派送
        CenterCode: this.warehousePreser ? this.warehousePreser : "", //仓库中心编码
        Weight: this.weight, //重量
        Prov: this.provincePreser ? this.provincePreser : "" //省名
      };
      if (this.channelValue == "") {
        this.$message.warning(this.$t("shopList.select_channel"));
      } else if (this.wayValue == "") {
        this.$message.warning(this.$t("shopList.method_pickup"));
      } else if (this.wayValue == "0" && this.warehouseValue == "") {
        this.$message.warning(this.$t("address.select-province"));
      } else if (this.wayValue == "1" && this.provinceValue == "") {
        this.$message.warning(this.$t("serve.select_warehouse"));
      } else if (this.weight == "") {
        this.$message.warning(this.$t("serve.enter_weight"));
      } else {
        this.getFreight(params);
      }
    },
    //取货方式
    handleTakeWay(value) {
      this.self = value;
    },
    //选择省
    handleProvince(value) {
      // console.log(value);
      this.provincePreser = value;
    }
  },
  created() {
    //越南盾符号
    this.symbol = symbol;
    //获取渠道
    this.$api.getAllChannel().then(res => {
      let resNew = res.Data.LineList;
      this.channelArr = resNew;
    });
    //选择省
    let selectPara = {
      Uid: "",
      AreaType: 0
    };
    this.$api.lveLinkage(selectPara).then(res => {
      this.provincesArr = res.Data.AreaList;
    });
    //仓库信息
    this.$api.getWareHouseInfo().then(res => {
      let resNew = res.Data;
      this.warehouseArr = resNew;
      console.log(this.warehouseArr);
    });
  }
};
</script>

<style scoped lang="less">
@import "~@/styles/common/variable.less";
.calculator-total {
  h1 {
    position: fixed;
    right: 20px;
    bottom: 90px;
    width: 60px;
    height: 60px;
    background: @calculator-h;
    border-radius: 50%;
    line-height: 80px;
    text-align: center;
    cursor: pointer;
    z-index: 10;
    img {
      width: 30px;
      height: 30px;
    }
  }
  /deep/.el-dialog {
    height: 455px;
    /deep/.el-dialog__header {
      padding: 0;
    }
    /deep/.el-dialog__body {
      padding: 20px;
    }
  }
  //计算器
  .calculator-code-calculator {
    /deep/.el-input__inner {
      width: 200px;
      height: 38px;
    }
    p:nth-of-type(1) {
      img {
        position: relative;
        top: 6px;
        margin-right: 10px;
      }
    }
    p:nth-of-type(2) {
      display: flex;
      span:nth-child(1) {
        display: inline-block;
        width: 316px;
        height: 50px;
        box-shadow: 0 0 15px @ccc inset;
        border-radius: 5px;
        margin-top: 15px;
        line-height: 50px;
        padding-left: 10px;
        // margin-right: 20px;
      }
      span:nth-child(2) {
        font-size: 40px;
        color: @home-logo;
        position: relative;
        top: 20px;
        left: 10px;
      }
    }
    p:nth-of-type(3) {
      margin-top: 25px;
      span:nth-child(1) {
        margin-right: 44px;
      }
    }
    p:nth-of-type(4) {
      margin-top: 25px;
      span:nth-child(1) {
        margin-right: 10px;
      }
    }
    .serve-code-province {
      margin-top: 25px;
      span:nth-child(1) {
        margin-right: 48px;
      }
    }
    .serve-code-warehouse {
      margin-top: 25px;
      span:nth-child(1) {
        margin-right: 64px;
      }
    }
    p:nth-of-type(5) {
      display: flex;
      margin-top: 25px;
      /deep/.el-input__inner {
        width: 145px;
        height: 38px;
      }
      span:nth-child(1) {
        margin-right: 62px;
        display: inline-block;
        min-width: 90px;
        min-height: 20px;
      }
      span {
        margin-top: 10px;
      }
      span:nth-of-type(2) {
        min-width: 40px;
        min-height: 20px;
      }
    }
    p:nth-of-type(6) {
      margin-top: 25px;
      text-align: center;
      /deep/.el-button {
        width: 160px;
        height: 40px;
        background: @home-logo;
        color: @fff;
        border-radius: 5px;
      }
    }
  }
}
</style>
