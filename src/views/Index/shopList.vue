<template>
  <div class="shopList-total">
    <h1>{{ $t("shopList.List of goods") }}</h1>
    <!-- 表格 -->
    <div class="shopList-table">
      <el-table
        :data="carLists"
        border
        style="width: 100%"
        v-if="this.IsDelay"
        :span-method="cellMerge"
      >
        <el-table-column
          prop="MainTitle"
          :label="$t('shopList.Name-of-commodity')"
          width="300"
          align="center"
        >
        </el-table-column>
        <!-- <el-table-column
          v-if="
            this.$route.query.SpecificationCode || this.carLists.Specification
          "
          prop="Specification"
          :label="$t('shopList.specifications')"
          width="200"
          align="center"
        > -->
        <el-table-column
          :label="$t('shopList.specifications')"
          width="250"
          align="center"
        >
          <template slot-scope="scope">
            <span>
              {{
                scope.row.Specification || this.$route.query.SpecificationCode
              }}
            </span>
          </template>
        </el-table-column>
        <!-- </el-table-column> -->
        <el-table-column
          prop="QTY"
          :label="$t('shopList.The-number-of')"
          align="center"
          width="80"
        ></el-table-column>
        <el-table-column
          prop="GoodsPrice"
          :label="$t('shopList.The-unit-price') + '(' + symbol + ')'"
          width="140"
          align="center"
        ></el-table-column>
        <!---中国运费--->
        <el-table-column
          prop="ChinaFreight"
          :label="$t('shopList.China-freight-money') + '(' + symbol + ')'"
          align="center"
          width="220"
        ></el-table-column>
        <!-- <el-table-column
          prop="BuyFee"
          :label="$t('shopList.Code-and-fees') + '(' + symbol + ')'"
          align="center"
          width="120"
        ></el-table-column> -->
        <!---增值服务费--->
        <el-table-column
          :label="$t('shopList.server')"
          align="left"
          header-align="center"
        >
          <!-- align="center" -->
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              class="shopList-pay-money"
              v-for="(item, index) in addedServices"
              :key="index"
            >
              <label>
                <el-checkbox
                  :name="scope.$index + item.AddServiceCode"
                  @change="
                    dialogCheck(
                      scope.$index,
                      scope.row,
                      item.AddServiceCode,
                      item.Formula
                    )
                  "
                ></el-checkbox>
                {{ item.AddServiceName }}
              </label>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 收件人信息 -->
    <div class="shopList-infor">
      <span>{{ $t("shopList.Recipient information") }}</span>
      <span @click="dialogAddress = true">{{
        $t("shopList.Add delivery address")
      }}</span>
    </div>

    <!-- 新增收货地址弹框 -->
    <div class="shopList-add-address">
      <el-dialog
        :title="$t('shopList.Add delivery address')"
        :visible.sync="dialogAddress"
        width="600px"
        :before-close="handleCloseAddress"
      >
        <p>
          <span>{{ $t("shopList.name") }}</span>
          <input
            type="text"
            v-model="inputRecipientName"
            :placeholder="$t('address.Please-enter-name')"
          />
        </p>

        <p>
          <span>{{ $t("shopList.phone") }}</span>
          <input
            type="text"
            v-model="inputMobileVal"
            :placeholder="$t('address.enter-telephone-number')"
          />
        </p>

        <p>
          <span>{{ $t("shopList.province") }}</span>
          <el-select
            v-model="inputProvinceVal"
            filterable
            :placeholder="$t('address.Please-select')"
            @change="handleProvinces(inputProvinceVal)"
          >
            <el-option
              v-for="item in provinces"
              :key="item.UID"
              :label="item.Name"
              :value="item.UID"
            ></el-option>
          </el-select>
        </p>

        <p>
          <span>{{ $t("shopList.city") }}</span>
          <el-select
            v-model="inputCityVal"
            filterable
            :placeholder="$t('address.Please-select')"
            @change="handleCitys(inputCityVal)"
          >
            <el-option
              v-for="item in citys"
              :key="item.UID"
              :label="item.Name"
              :value="item.UID"
            ></el-option>
          </el-select>
        </p>

        <p>
          <span>{{ $t("shopList.area") }}</span>
          <el-select
            v-model="inputAreaVal"
            filterable
            :placeholder="$t('address.Please-select')"
          >
            <el-option
              v-for="item in areas"
              :key="item.UID"
              :label="item.Name"
              :value="item.UID"
            ></el-option>
          </el-select>
        </p>
        <p>
          <span>{{ $t("shopList.Detailed address") }}</span>
          <input
            type="text"
            v-model="inputAddressVal"
            :placeholder="$t('address.enter-the-detailed-address')"
          />
        </p>
        <p>
          <span>{{ $t("shopList.Is it the default address") }}</span>
          <el-radio v-model="radioDefault" label="1">{{
            $t("shopList.default")
          }}</el-radio>
          <el-radio v-model="radioDefault" label="0">{{
            $t("shopList.nodefault")
          }}</el-radio>
        </p>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handlDdialogAddress">{{
            $t("shopList.Take away")
          }}</el-button>
          <el-button type="primary" @click="handleDetermine">{{
            $t("shopList.determine")
          }}</el-button>
        </span>
      </el-dialog>
    </div>

    <!-- 收件人信息具体信息 -->
    <div class="shopList-details-infor">
      <ul>
        <li
          v-for="(infor, index) in addressList"
          :key="index"
          @mouseenter="enter(index)"
          @mouseleave="leave()"
          @click="handleStyle(index, infor)"
        >
          <span
            :style="{
              'border-color':
                isBorderColor == index || (infor.IsDefault == '1' && isOther)
                  ? '#d33319'
                  : ''
            }"
          >
            {{ infor.Consignee }}
            <img
              src="@/img/hook.png"
              v-if="isIndex === index || (infor.IsDefault == '1' && isOther)"
            />
          </span>
          <span>{{ infor.Consignee }}</span>
          <span
            >{{ infor.Province }}&nbsp;&nbsp;&nbsp;{{
              infor.City
            }}&nbsp;&nbsp;&nbsp;{{ infor.Area }}&nbsp;&nbsp;&nbsp;{{
              infor.Address
            }}</span
          >
          <span>{{ infor.Mobile }}</span>
          <span
            @click="handleDefault(infor.UID, index)"
            v-show="infor.IsDefault == 0 && isOk == index"
            >{{ $t("shopList.Set as default address") }}</span
          >
          <span @click="handleEditAddress(infor)" v-show="isOk == index">{{
            $t("shopList.editor")
          }}</span>
          <span v-show="infor.IsDefault == 1 && isOk == index">{{
            $t("shopList.The default address")
          }}</span>
        </li>
      </ul>
    </div>

    <!-- 编辑收货地址弹框 -->
    <div class="shopList-edit-bounced">
      <el-dialog
        :title="$t('shopList.receiving_address')"
        :visible.sync="dialogEditor"
        width="600px"
        :before-close="handleCloseEditor"
      >
        <p>
          <span>{{ $t("shopList.name") }}</span>
          <input
            type="text"
            v-model="editorRecipientName"
            :placeholder="$t('address.Please-enter-name')"
          />
        </p>

        <p>
          <span>{{ $t("shopList.phone") }}</span>
          <input
            type="text"
            v-model="editorMobileVal"
            :placeholder="$t('address.enter-telephone-number')"
          />
        </p>

        <p>
          <span>{{ $t("shopList.province") }}</span>
          <el-select
            v-model="editorProvinceVal"
            filterable
            :placeholder="$t('address.Please-select')"
            @change="handleInputProvince(editorProvinceVal)"
          >
            <el-option
              v-for="item in provinces"
              :key="item.UID"
              :label="item.Name"
              :value="item.UID"
            ></el-option>
          </el-select>
        </p>

        <p>
          <span>{{ $t("shopList.city") }}</span>
          <el-select
            v-model="editorCityVal"
            filterable
            :placeholder="$t('address.Please-select')"
            @change="handleInputCity(editorCityVal)"
          >
            <el-option
              v-for="item in cityes"
              :key="item.UID"
              :label="item.Name"
              :value="item.UID"
            ></el-option>
          </el-select>
        </p>

        <p>
          <span>{{ $t("shopList.area") }}</span>
          <el-select
            v-model="editorAreaVal"
            filterable
            :placeholder="$t('address.Please-select')"
          >
            <el-option
              v-for="item in areaes"
              :key="item.UID"
              :label="item.Name"
              :value="item.UID"
            ></el-option>
          </el-select>
        </p>
        <p>
          <span>{{ $t("shopList.Detailed address") }}</span>
          <input
            type="text"
            v-model="editorAddressVal"
            :placeholder="$t('address.enter-the-detailed-address')"
          />
        </p>
        <p>
          <span>{{ $t("shopList.Is it the default address") }}</span>
          <el-radio v-model="editorDefault" label="1">{{
            $t("shopList.default")
          }}</el-radio>
          <el-radio v-model="editorDefault" label="0">{{
            $t("shopList.nodefault")
          }}</el-radio>
        </p>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogEditor = false">{{
            $t("shopList.Take away")
          }}</el-button>
          <el-button type="primary" @click="handleEditorDeter">{{
            $t("shopList.determine")
          }}</el-button>
        </span>
      </el-dialog>
    </div>

    <!-- 所有渠道 -->
    <div class="shopList-all-channel">
      <p>{{ $t("shopList.All channels") }}</p>
      <p>
        <span v-for="(item, index) in resNewList" :key="index">
          <el-radio
            v-model="isSelect"
            :label="item.LineName"
            @change="handleTradition(item.LineCode, item.LineName)"
          >
          </el-radio>
          <el-popover placement="top" width="300" trigger="hover">
            <p>
              {{ resNewListImg[index].aging }}
              <br />
              {{ resNewListImg[index].sun }}>
              <br />
              {{ resNewListImg[index].reliable }}
              <br />
              {{ resNewListImg[index].own }}
            </p>
            <img src="@/img/code-buy.png" alt slot="reference" />
          </el-popover>
        </span>
      </p>
    </div>

    <!-- 取件方式 -->
    <div class="shopList-take-way">
      <p>{{ $t("shopList.Pickup way") }}</p>
      <p>
        <el-radio v-model="radioWay" label="0" @change="handleChange">{{
          $t("shopList.Since the lift")
        }}</el-radio>
        <el-radio v-model="radioWay" label="1" @change="handleDelivery">{{
          $t("shopList.delivery")
        }}</el-radio>
      </p>
    </div>

    <!-- 仓库信息 -->
    <div class="shopList-house-infor" v-if="isShow == 1">
      <p>{{ $t("shopList.Warehouse information") }}</p>
      <p v-for="(list, index) in addressListStyle" :key="index">
        <el-radio v-model="radioWays" label="1">
          {{ list.AddressSimple }}({{ list.Address }})
        </el-radio>
      </p>
    </div>

    <!-- 商品总金额 -->
    <div class="shopList-money">
      <p>
        <span>{{ $t("shopList.Total amount of goods") }}:</span>
        <span>{{ goodsTotal }}{{ symbol }}</span>
      </p>
      <p>
        <span>{{ $t("shopList.The total amount of handling charge") }}:</span>
        <span>{{ codeLists }}{{ symbol }}</span>
      </p>
      <p>
        <span>{{ $t("shopList.Amount of value-added service fee") }}:</span>
        <span>{{ serverTotal ? serverTotal : zero }}{{ symbol }}</span>
      </p>
      <p>
        <span>{{ $t("shopList.Total amount of freight in China") }}:</span>
        <span>{{ chinaMoneys }}{{ symbol }}</span>
      </p>
      <p>
        <span>{{ $t("car.combined") }}:</span>
        <span>{{ moneys ? moneys : moneyTotals }}{{ symbol }}</span>
      </p>
      <button @click="handleSubmitOrders">{{ $t("car.Submit orders") }}</button>
    </div>
  </div>
</template>

<script>
import {
  getObtain,
  setAddress,
  getAddress,
  deleteAddress,
  getItems
} from "@/unilts/auth";
import {
  CountryCode,
  symbol,
  rmbSymbol,
  regPhone,
  ak,
  sk
} from "@/entry/index";
import { mapState, mapActions } from "vuex";
import { accAdd, accMul, accSub, format } from "@/algo/index";
import { log } from "util";
export default {
  name: "shopList",
  data() {
    return {
      resNewListImg: [
        {
          id: 2,
          aging: this.$t("serve.nalService"),
          sun: this.$t("serve.priceLow")
        },
        {
          id: 1,
          aging: this.$t("serve.aging"),
          sun: this.$t("serve.sun"),
          reliable: this.$t("serve.reliable"),
          own: this.$t("serve.own")
        }
      ], //图片触发展示
      //ways: true, //控制取件方式
      radioWays: "1", //默认选择仓库
      isOther: true,
      areaes: [],
      cityes: [],
      shopLists: [],
      UIDArr: this.$route.query.UIDArr,
      aotalAmounts: "",
      resCode: "",
      OneLineService: "",
      moneys: 0,
      zero: "",
      checked: false,
      symbol: "",
      serverTotal: 0,
      isSelect: "",
      isOkSelect: "",
      resNewList: [],
      isShow: 0,
      addressListStyle: [],
      addedServices: [],
      isOk: -1,
      indexNumber: "",
      dialogEditor: false,
      editorDefault: "1",
      radioWay: -1,
      radioDefault: "1",
      editorRecipientName: "",
      editorMobileVal: "",
      editorProvinceVal: "",
      editorCityVal: "",
      editorAreaVal: "",
      editorAddressVal: "",
      inputRecipientName: "",
      inputMobileVal: "",
      inputProvinceVal: "",
      inputCityVal: "",
      inputAreaVal: "",
      inputAddressVal: "",
      dialogAddress: false,
      isBorderColor: -1,
      provinces: [],
      citys: [],
      areas: [],
      isIndex: -1,
      radio: "1",
      inforList: [],
      serverObj: {},
      code: [],
      addressInfor: "",
      houseCode: "",
      ProvinceUID: "", //编辑收货地址省uid
      CityUID: "", //编辑收货地址市uid
      AreaUID: "", //编辑收货地址区uid
      ID: "" //收货地址id
    };
  },
  computed: {
    ...mapState("car", ["rate"]),
    ...mapState("shopList", [
      "addressList",
      "carLists",
      "goodsTotal",
      "codeLists",
      "moneyTotals",
      "urls",
      "chinaMoneys",
      "IsDelay",
      "spanArr"
    ])
  },
  methods: {
    ...mapActions("shopList", ["getAddressList", "getGoodsList", "getLijiBuy"]),
    //选择渠道
    handleTradition(id, index) {
      this.isSelect = index;
      this.isOkSelect = id;
      this.resCode = id;
    },
    //自提
    handleChange() {
      this.isShow = 1;
    },

    //编辑选择省
    handleInputProvince(id) {
      let params = {
        Uid: id,
        AreaType: 1
      };
      if (id !== undefined) {
        this.$api.lveLinkage(params).then(res => {
          this.cityes = res.Data.AreaList;
          this.editorCityVal = res.Data.AreaList[0].UID;
          this.handleInputCity(this.editorCityVal);
        });
      }
    },
    //编辑选择市
    handleInputCity(id) {
      let params = {
        Uid: id,
        AreaType: 2
      };
      if (id !== undefined) {
        this.$api.lveLinkage(params).then(res => {
          this.areaes = res.Data.AreaList;
          this.editorAreaVal = res.Data.AreaList[0].UID;
        });
      }
    },
    //收货地址选择省
    handleProvinces(id) {
      let params = {
        Uid: id,
        AreaType: 1
      };
      if (id !== undefined) {
        this.$api.lveLinkage(params).then(res => {
          this.citys = res.Data.AreaList;
          this.inputCityVal = res.Data.AreaList[0].UID;
          this.handleCitys(this.inputCityVal);
        });
      }
    },
    //收货地址选择市
    handleCitys(id) {
      let params = {
        Uid: id,
        AreaType: 2
      };
      if (id !== undefined) {
        this.$api.lveLinkage(params).then(res => {
          this.areas = res.Data.AreaList;
          this.inputAreaVal = res.Data.AreaList[0].UID;
        });
      }
    },
    //提交订单
    handleSubmitOrders() {
      for (let i = 0; i < this.addressList.length; i++) {
        if (this.addressList[i].IsDefault == 1) {
          this.ID = this.addressList[i].UID;
        }
      }
      if (this.addressInfor == "" && !this.ID) {
        this.$message.warning(this.$t("shopList.select_receiving_address"));
      } else if (this.isSelect == "") {
        this.$message.warning(this.$t("shopList.select_channel"));
      } else if (this.radioWay != 0 && this.radioWay != 1) {
        this.$message.warning(this.$t("shopList.method_pickup"));
      } else {
        //商品明细
        let GoodsList = [];
        //中国运费总金额
        let ChinaFreight = [];
        let resultTotal = 0;
        let result = 0;
        let forIndex = 0;
        this.carLists.forEach(item => {
          item.AddServices = 0;
          let ObjGoods = {};
          //购物车中唯一标识
          ObjGoods["CarGoodsUid"] = item.UID;

          //商品数量
          ObjGoods["QTY"] = item.QTY;
          //商品名称
          ObjGoods["GoodsName"] = item.MainTitle;
          //商品规格
          ObjGoods["Specification"] = item.Specification;
          //规格编码
          ObjGoods["SpecificationCode"] = item.SpecificationCode;
          //单价RMB
          ObjGoods["GoodsPriceRMB"] = item.GoodsPriceRMB;
          
          //ChinaFreightRMB;
          //单价
          ObjGoods["GoodsPrice"] = item.GoodsPrice;
          
          if (forIndex > 0) {
            if (item.GoodsURL == this.carLists[forIndex - 1].GoodsURL) {
              item.rowAddServicesCode = [];
              item.rowAddServicePrice = 0;
              item.ChinaFreight = 0;
              item.ChinaFreightRMB= 0;
            }
          }
          //中国运费RMB
          ObjGoods["CNFreightRMB"] = item.ChinaFreightRMB;
          //中国运费VN
          ObjGoods["CNFreight"] = item.ChinaFreight;
          //勾选的增值服务编码集合
          ObjGoods["AddServices"] = item.rowAddServicesCode;
          //增值服务金额
          ObjGoods["AddServicesAmt"] = item.rowAddServicePrice;

          //代买手续费
          ObjGoods["BuyFee"] = item.BuyFee;
          //url链接
          ObjGoods["URL"] = item.GoodsURL;
          //商品明细
          GoodsList.push(ObjGoods);
          //中国运费总金额
          ChinaFreight.push(item.ChinaFreight);
          result = eval(ChinaFreight.join("+"));
          resultTotal = result.toFixed(2);
          forIndex++;
        });
        let params = {
          UserCode: JSON.parse(getObtain()).resNew, //会员号
          CountryCode: CountryCode, //国家编码
          Rate: this.rate, //汇率
          // JSON.parse(getItems())
          GoodsList: GoodsList, //商品明细
          TotalGoodsAmt: this.goodsTotal, //商品总金额
          TotalCNFreight: resultTotal, //中国运费总金额
          TotalBuyFee: this.codeLists, //代买手续费总金额
          TotalAddServicesAmt: this.serverTotal, //增值服务费总金额
          AddressUID:
            this.addressInfor.UID == undefined
              ? this.ID
              : this.addressInfor.UID, //收件人信息UID
          LineCode: this.resCode, //渠道线路编码
          IsZT: this.radioWay, //是否自提，0：自提；1：派送
          ZTCenterCode: this.radioWay == 0 ? this.houseCode : "", //自提仓库编码，自提时不可为空
          TotalAmt:
            parseFloat(this.moneys) > parseFloat(this.moneyTotals)
              ? this.moneys
              : this.moneyTotals
        }; //总金额（合计）
        this.$api.SubmitOrders(params).then(res => {
          let resNew = res.Data;
          if (resNew != undefined) {
            this.$router.push({
              path: "outside",
              query: {
                TotalAmt:
                  parseFloat(this.moneys) > parseFloat(this.moneyTotals)
                    ? this.moneys
                    : this.moneyTotals,
                PurchaseOrderCode: resNew
              }
            });
          }
        });
      }
    },
    //送货上门
    handleDelivery() {
      this.isShow = null;
    },
    //移入事件
    enter(index) {
      this.isOk = index;
    },
    //移出事件
    leave() {
      this.isOk = null;
    },
    //编辑收货地址
    handleCloseEditor() {
      this.dialogEditor = false;
    },
    //设为默认地址
    handleDefault(id, index) {
      let UserCode = JSON.parse(getObtain()).resNew;
      let params = {
        UserCode: UserCode,
        Uid: id
      };
      this.$api.defaultAddress(params).then(res => {
        if (res.Data) {
          this.isOk = index;
          let params = {
            UserCode: JSON.parse(getObtain()).resNew,
            SearchText: "",
            PageIndex: 1,
            PageSize: 30
          };
          //获取地址，get请求
          this.getAddressList(params);
        } else {
          this.$message({
            message: res.Msg,
            type: "warning"
          });
        }
      });
    },
    //编辑地址
    handleEditAddress(row) {
      this.dialogEditor = true;
      this.indexNumber = row.UID;
      this.editorRecipientName = row.Consignee;
      this.editorMobileVal = row.Mobile;
      this.editorProvinceVal = row.Province;
      this.editorCityVal = row.City;
      this.editorAreaVal = row.Area;
      this.editorAddressVal = row.Address;
      this.editorDefault = row.IsDefault.toString();
      this.ProvinceUID = row.ProvinceUID;
      this.CityUID = row.CityUID;
      this.AreaUID = row.AreaUID;
    },
    //确认关闭编辑窗口
    handleEditorDeter() {
      let UserCode = JSON.parse(getObtain()).resNew;
      let params = {
        UserCode: UserCode, //会员号
        CountryCode: CountryCode, //国家编码
        Consignee: this.editorRecipientName, //收件人姓名
        Mobile: this.editorMobileVal, //电话
        ProvinceUID: this.ProvinceUID, //省唯一标识
        CityUID: this.CityUID, //市唯一标识
        AreaUID: this.AreaUID, //区唯一标识
        Address: this.editorAddressVal, //详细地址
        IsDefault: this.editorDefault, //是否默认，0：不默认；1：默认；
        UID: this.indexNumber //唯一标识
      };
      if (this.editorMobileVal === "") {
        this.$message.warning(this.$t("address.number-cannot-empty"));
      } else if (this.editorRecipientName === "") {
        this.$message.warning(this.$t("address.name-cannot-empty"));
      } else if (this.editorProvinceVal === "") {
        this.$message.warning(this.$t("address.select-province"));
      } else if (this.editorCityVal === "") {
        this.$message.warning(this.$t("address.select-the-city"));
      } else if (this.editorAreaVal === "") {
        this.$message.warning(this.$t("address.select-region"));
      } else if (this.editorAddressVal === "") {
        this.$message.warning(this.$t("address.fill-detailed-address"));
      } else if (this.editorDefault !== "1" && this.editorDefault !== "0") {
        this.$message.warning(this.$t("shopList.Is it the default address"));
      } else {
        this.dialogEditor = false;
        let para = {
          UserCode: JSON.parse(getObtain()).resNew,
          SearchText: "",
          PageIndex: 1,
          PageSize: 30
        };
        //post
        this.$api.editorAddress(params).then(res => {
          if (res.Data) {
            //获取地址，get请求
            this.getAddressList(para);
            this.$message({
              message: this.$t("address.Modify-the-success"),
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
    },
    //关闭新增收货地址弹框
    handleCloseAddress() {
      this.dialogAddress = false;
      this.dialogAddress = false;
      this.inputRecipientName = "";
      this.inputMobileVal = "";
      this.inputProvinceVal = "";
      this.inputCityVal = "";
      this.inputAreaVal = "";
      this.inputAddressVal = "";
      this.radioDefault = "1";
    },
    //取消新增收货地址弹框
    handlDdialogAddress() {
      this.dialogAddress = false;
      this.inputRecipientName = "";
      this.inputMobileVal = "";
      this.inputProvinceVal = "";
      this.inputCityVal = "";
      this.inputAreaVal = "";
      this.inputAddressVal = "";
      this.radioDefault = "1";
    },
    //去小票, 清点+拍照, 加固, 增值服务费
    dialogCheck(index, row, id, formula) {
      let selName = index + id;
      let isSelect = $("input[name='" + selName + "']").is(":checked");
      let serverObj = this.serverObj;
      let A = row.QTY;
      let B = row.GoodsPrice;
      let C = accMul(row.QTY, row.GoodsPrice);
      let D = 1;
      formula = formula
        .replace("A", A)
        .replace("B", B)
        .replace("C", C)
        .replace("D", D);
      let result = eval(formula);
      if (isSelect) {
        let time = Math.round(new Date().getTime() / 1000);
        let paraRes = {
          tt: time,
          ak: ak,
          sk: $.md5(ak + time + sk),
          Type: 0,
          CountryCode: CountryCode
        };
        //每一行的增值服务费
        row.rowAddServicePrice = accAdd(row.rowAddServicePrice, result);
        //全部的增值服务费
        this.serverTotal = accAdd(this.serverTotal, result);
        row.rowAddServicesCode.push(id);
      } else {
        //每一行的增值服务费
        row.rowAddServicePrice = accSub(row.rowAddServicePrice, result);
        //全部的增值服务费
        this.serverTotal = accSub(this.serverTotal, result);
        let arrindex = row.rowAddServicesCode.indexOf(id);
        if (arrindex > -1) {
          row.rowAddServicesCode.splice(arrindex, 1);
        }
      }
      // let serverTotal = 0;
      // let code = [];
      //合计总金额
      this.moneys = accAdd(this.moneyTotals, this.serverTotal).toFixed(2);
    },
    //改变边框颜色
    handleStyle(index, infor) {
      this.isBorderColor = index;
      this.isIndex = index;
      this.addressInfor = infor;
      this.isOther = false;
    },
    //确定新增收货地址
    handleDetermine() {
      let UserCode = JSON.parse(getObtain()).resNew;
      let params = {
        UserCode: UserCode, //国家编码
        CountryCode: CountryCode,
        Consignee: this.inputRecipientName,
        Mobile: this.inputMobileVal,
        ProvinceUID: this.inputProvinceVal,
        CityUID: this.inputCityVal,
        AreaUID: this.inputAreaVal,
        Address: this.inputAddressVal,
        IsDefault: this.radioDefault
      };
      if (this.inputMobileVal === "") {
        this.$message.warning(this.$t("address.number-cannot-empty"));
      } else if (this.inputRecipientName === "") {
        this.$message.warning(this.$t("address.name-cannot-empty"));
      } else if (this.inputProvinceVal === "") {
        this.$message.warning(this.$t("address.select-province"));
      } else if (this.inputCityVal === "") {
        this.$message.warning(this.$t("address.select-the-city"));
      } else if (this.inputAreaVal === "") {
        this.$message.warning(this.$t("address.select-region"));
      } else if (this.inputAddressVal === "") {
        this.$message.warning(this.$t("address.fill-detailed-address"));
      } else if (this.radioDefault !== "1" && this.radioDefault !== "0") {
        this.$message.warning(this.$t("shopList.Is it the default address"));
      } else {
        this.dialogAddress = false;
        let paras = {
          UserCode: JSON.parse(getObtain()).resNew,
          SearchText: "",
          PageIndex: 1,
          PageSize: 30
        };
        this.$api.newAddress(params).then(res => {
          //获取地址，get请求
          this.getAddressList(paras);
          this.$message({
            message: this.$t("address.NewSuccess"),
            type: "success"
          });
          //清空input里面的值
          this.inputRecipientName = "";
          this.inputMobileVal = "";
          this.inputProvinceVal = "";
          this.inputCityVal = "";
          this.inputAreaVal = "";
          this.inputAddressVal = "";
          this.radioDefault = "1";
        });
      }
    },

    cellMerge({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0 || columnIndex === 4 || columnIndex === 5) {
        const _row = this.spanArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col
        };
      }
    }
  },
  created() {
    //选择省
    let selectPara = {
      Uid: "",
      AreaType: 0
    };
    this.$api.lveLinkage(selectPara).then(res => {
      this.provinces = res.Data.AreaList;
    });
    let zero = 0;
    this.zero = zero.toFixed(2);
    let params = {
      UserCode: JSON.parse(getObtain()).resNew,
      SearchText: "",
      PageIndex: 1,
      PageSize: 30
    };
    //获取地址，get请求
    this.getAddressList(params);

    //仓库信息
    this.$api.getWareHouseInfo().then(res => {
      let resNew = res.Data;
      this.addressListStyle = resNew;
      this.houseCode = this.addressListStyle[0].CenterCode;
    });
    let paraRes = {
      Type: 0
    };
    //增值服务
    this.$api.getAddedServices(paraRes).then(res => {
      let resNew = res.Data.AddServiceList;
      this.addedServices = resNew;
    });
    //获取所有渠道
    this.$api.getAllChannel().then(res => {
      let resNew = res.Data.LineList;
      this.resNewList = resNew;
    });
    let paraes = {
      UserCode: JSON.parse(getObtain()).resNew,
      CarGoodsUid: this.UIDArr
    };
    if (this.UIDArr) {
      //获取所有商品,get请求
      this.getGoodsList(paraes);
    } else {
      //解决异步汇率问题
      this.$api.getRates().then(res => {
        let resNew = res.Data;
        //淘宝天猫立即购买
        let object = {
          GoodsURL: this.$route.query.GoodsURL,
          Rate: resNew, //this.rate,
          MainTitle: this.$route.query.MainTitle,
          SubTitle: this.$route.query.SubTitle,
          GoodsPriceRMB: this.$route.query.GoodsPriceRMB,
          GoodsPrice: accMul(
            this.$route.query.GoodsPriceRMB,
            resNew // this.rate
          ).toFixed(2),
          ChinaFreightRMB: parseFloat(this.$route.query.ChinaFreightRMB),
          ChinaFreight: accMul(
            parseFloat(this.$route.query.ChinaFreightRMB),
            resNew //this.rate
          ).toFixed(2),
          BuyFee: 20000.0,
          Specification: this.$route.query.Specification,
          SpecificationCode: this.$route.query.SpecificationCode,

          totalAmount: this.$route.query.totalAmount,
          codeTotal: this.$route.query.codeTotal,
          ChinaFreightTotal: this.$route.query.ChinaFreightTotal,

          QTY: this.$route.query.QTY
        };
        let carList = [];
        carList.push(object);
        this.getLijiBuy(carList);
        //1688立即购买
        let objectBuy = {
          GoodsURL: this.$route.query.GoodsURL,
          Rate: resNew, //this.rate,
          MainTitle: this.$route.query.MainTitle,
          SubTitle: this.$route.query.SubTitle,
          GoodsPriceRMB: this.$route.query.GoodsPriceRMB,
          GoodsPrice: accMul(
            this.$route.query.GoodsPriceRMB,
            resNew // this.rate
          ).toFixed(2),
          ChinaFreightRMB: parseFloat(this.$route.query.ChinaFreightRMB),
          ChinaFreight: accMul(
            parseFloat(this.$route.query.ChinaFreightRMB),
            resNew //this.rate
          ).toFixed(2),
          BuyFee: 20000.0,
          Specification: this.$route.query.Specification,
          totalAmount: this.$route.query.totalAmount,
          codeTotal: this.$route.query.codeTotal,
          ChinaFreightTotal: this.$route.query.ChinaFreightTotal,
          QTY: this.$route.query.QTY
        }
        let goodList = [];
        goodList.push(objectBuy);
        this.getLijiBuy(goodList);
      });
    }
    //符号
    this.symbol = symbol;
  }
};
</script>

<style lang="less">
@import "~@/styles/common/variable.less";
.shopList-total {
  //表格
  .shopList-table {
    .shopList-pay-money {
      display: block;
      margin-left: 10px;
    }
    .el-checkbox {
      margin-right: 5px;
    }
    /deep/.el-button--small {
      padding: 4px 15px;
    }
  }
}
</style>

<style scoped lang="less">
@import "~@/styles/common/variable.less";

.shopList-total {
  padding-bottom: 60px;
  width: 1200px;
  margin: 0 auto;
  h1 {
    margin: 25px 0;
    font-size: 16px;
    color: @home-p;
    font-weight: 900;
  }

  //收件人信息
  .shopList-infor {
    margin-top: 66px;

    span:nth-child(1) {
      font-size: 16px;
      display: inline-block;
      font-weight: 900;
      color: @home-p;
    }

    span:nth-child(2) {
      font-size: 14px;
      color: @code-blue;
      margin-left: 1035px;
      cursor: pointer;
    }
  }

  //新增收货地址弹框
  .shopList-add-address {
    /deep/.el-dialog {
      height: 500px;
    }

    /deep/.el-dialog__body {
      padding: 0;
    }

    p:nth-child(1) {
      font-size: 14px;
      margin: 25px 0 10px 174px;

      input {
        width: 210px;
        height: 36px;
        border: 1px solid @order-li;
        border-radius: 4px;
        margin-left: 10px;
        padding-left: 10px;
      }
    }

    p:nth-child(2) {
      font-size: 14px;
      margin: 0 0 10px 150px;

      input {
        width: 212px;
        height: 36px;
        border: 1px solid @order-li;
        border-radius: 4px;
        margin-left: 10px;
        padding-left: 10px;
      }
    }

    p:nth-child(3) {
      font-size: 14px;
      margin: 0 0 10px 113px;

      /deep/.el-input__inner {
        width: 224px;
        height: 40px;
        border: 1px solid @order-li;
        border-radius: 4px;
        margin-left: 10px;
        padding-left: 10px;
      }
    }

    p:nth-child(4) {
      font-size: 14px;
      margin: 0 0 10px 133px;

      /deep/.el-input__inner {
        width: 224px;
        height: 40px;
        border: 1px solid @order-li;
        border-radius: 4px;
        margin-left: 10px;
        padding-left: 10px;
      }
    }

    p:nth-child(5) {
      font-size: 14px;
      margin: 0 0 10px 140px;

      /deep/.el-input__inner {
        width: 224px;
        height: 40px;
        border: 1px solid @order-li;
        border-radius: 4px;
        margin-left: 10px;
        padding-left: 10px;
      }
    }

    p:nth-child(6) {
      font-size: 14px;
      margin: 0 0 0 128px;

      input {
        width: 210px;
        height: 36px;
        border: 1px solid @order-li;
        border-radius: 4px;
        margin-left: 10px;
        padding-left: 10px;
      }
    }

    p:nth-child(7) {
      font-size: 14px;
      margin: 20px 0 10px 10px;

      span {
        margin-right: 15px;
      }
    }
  }

  //编辑收货地址弹框
  .shopList-edit-bounced {
    /deep/.el-dialog {
      height: 500px;
    }

    /deep/.el-dialog__body {
      padding: 0;
    }

    p:nth-child(1) {
      font-size: 14px;
      margin: 25px 0 10px 174px;

      input {
        width: 210px;
        height: 36px;
        border: 1px solid @order-li;
        border-radius: 4px;
        margin-left: 10px;
        padding-left: 10px;
      }
    }

    p:nth-child(2) {
      font-size: 14px;
      margin: 0 0 10px 150px;

      input {
        width: 210px;
        height: 36px;
        border: 1px solid @order-li;
        border-radius: 4px;
        margin-left: 10px;
        padding-left: 10px;
      }
    }

    p:nth-child(3) {
      font-size: 14px;
      margin: 0 0 10px 113px;

      /deep/.el-input__inner {
        width: 221px;
        height: 40px;
        border: 1px solid @order-li;
        border-radius: 4px;
        margin-left: 10px;
        padding-left: 10px;
      }
    }

    p:nth-child(4) {
      font-size: 14px;
      margin: 0 0 10px 133px;

      /deep/.el-input__inner {
        width: 221px;
        height: 40px;
        border: 1px solid @order-li;
        border-radius: 4px;
        margin-left: 10px;
        padding-left: 10px;
      }
    }

    p:nth-child(5) {
      font-size: 14px;
      margin: 0 0 10px 143px;

      /deep/.el-input__inner {
        width: 221px;
        height: 40px;
        border: 1px solid @order-li;
        border-radius: 4px;
        margin-left: 10px;
        padding-left: 10px;
      }
    }

    p:nth-child(6) {
      font-size: 14px;
      margin: 0 0 0 128px;

      input {
        width: 210px;
        height: 36px;
        border: 1px solid @order-li;
        border-radius: 4px;
        margin-left: 10px;
        padding-left: 10px;
      }
    }

    p:nth-child(7) {
      font-size: 14px;
      margin: 20px 0 10px 10px;

      span {
        margin-right: 15px;
      }
    }
  }

  //收件人具体信息
  .shopList-details-infor {
    border: 1px solid @ccc;
    margin-top: 32px;
    height: 132px;
    overflow-y: auto;

    li {
      // cursor: pointer;
      margin: 5px 0 0 5px;
      position: relative;

      span {
        margin-right: 20px;
        font-size: 14px;
      }

      span:nth-child(1) {
        min-width: 130px;
        padding: 0 10px;
        height: 30px;
        display: inline-block;
        border: 1px solid @order-li;
        text-align: center;
        line-height: 30px;
        margin-bottom: 15px;
        position: relative;
        cursor: pointer;

        img {
          position: absolute;
          bottom: 0;
          right: 0;
        }
      }

      span:nth-child(5) {
        color: @code-blue;
        margin-left: 283px;
        cursor: pointer;
        position: absolute;
        top: 8px;
        right: 100px;
      }

      span:nth-child(6) {
        color: @code-blue;
        cursor: pointer;
        position: absolute;
        top: 5px;
        right: 50px;
      }

      span:nth-child(7) {
        position: absolute;
        top: 5px;
        right: 110px;
        color: @code-blue;
        border: 1px solid @home-login-btn;
        border-radius: 5px;
        padding: 3px;
      }
    }

    // li:hover span:nth-child(5) {
    //   display: block;
    // }
    // li:hover span:nth-child(6) {
    //   display: block;
    // }
  }

  //所有渠道
  .shopList-all-channel {
    width: 1180px;
    height: 68px;
    border: 1px solid @ccc;
    margin-top: 56px;
    padding: 20px 0 0 20px;

    p {
      font-size: 15px;
      margin-bottom: 10px;
    }

    p:nth-child(2) {
      display: flex;
      img {
        width: 20px;
        height: 20px;
        position: relative;
        top: 5px;
        left: -50px;
      }
      span {
        font-size: 14px;
        color: gray;
      }

      span:nth-child(2) {
        margin-left: 30px;
      }
    }
  }

  //取货方式
  .shopList-take-way {
    width: 1180px;
    height: 68px;
    border: 1px solid @ccc;
    margin-top: 56px;
    padding: 20px 0 0 20px;

    p {
      font-size: 15px;
    }

    p:nth-child(2) {
      margin-top: 10px;
    }
  }

  //仓库信息
  .shopList-house-infor {
    margin-top: 29px;
    width: 1180px;
    height: 132px;
    border: 1px solid @ccc;
    padding: 20px 0 0 20px;

    p:nth-child(2) {
      margin-top: 10px;

      span {
        font-size: 14px;
      }
    }
  }

  //商品总金额
  .shopList-money {
    margin-top: 42px;

    //商品总额度
    p:nth-child(1) {
      margin: 0 0 20px 855px;

      span {
        font-size: 14px;
      }

      span:nth-child(1) {
        color: @home-p;
        margin-right: 50px;
      }

      span:nth-child(2) {
        color: @code-blue;
      }
    }

    //代买手续费
    p:nth-child(2) {
      margin: 0 0 20px 839px;

      span {
        font-size: 14px;
      }

      span:nth-child(1) {
        color: @home-p;
        margin-right: 50px;
      }

      span:nth-child(2) {
        color: @code-blue;
      }
    }

    //增值服务费
    p:nth-child(3) {
      margin-left: 822px;

      span {
        font-size: 14px;
      }

      span:nth-child(1) {
        color: @home-p;
        margin-right: 50px;
      }

      span:nth-child(2) {
        color: @code-blue;
      }
    }

    //中国运费
    p:nth-child(4) {
      margin: 20px 0 0 704px;

      span {
        font-size: 14px;
      }

      span:nth-child(1) {
        color: @home-p;
        margin-right: 50px;
      }

      span:nth-child(2) {
        color: @code-blue;
      }
    }

    //合计
    p:nth-child(5) {
      margin: 50px 0 0 925px;

      span {
        font-size: 16px;
      }

      span:nth-child(1) {
        color: @home-p;
        margin-right: 5px;
      }

      span:nth-child(2) {
        color: @home-logo;
        font-weight: 900;
      }
    }

    //提交
    button {
      cursor: pointer;
      margin-top: 21px;
      width: 136px;
      height: 40px;
      background: @home-logo;
      border-radius: 5px;
      color: @fff;
      font-size: 900;
      border: none;
      margin-left: 1005px;
    }
  }
}
</style>
