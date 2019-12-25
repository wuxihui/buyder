<template>
  <div class="address-total">
    <!-- 收货地址title -->
    <div class="address-shipping">{{ $t("address.Shipping address") }}</div>

    <!-- 操作内容 -->
    <div class="address-operation">
      <input
        type="text"
        v-model="inputNamePhoneVal"
        :placeholder="$t('address.enter-your-name')"
      />
      <button @click="handleSearch">{{ $t("address.search") }}</button>
      <button @click="handleReset">{{ $t("address.reset") }}</button>
      <button @click="dialogAddress = true">
        {{ $t("address.Add shipping address") }}
      </button>
    </div>

    <!-- 添加收货地址 -->
    <div class="address-goods">
      <el-dialog
        :title="$t('address.Add shipping address')"
        :visible.sync="dialogAddress"
        width="600px"
        :before-close="handleCloseAddress"
      >
        <p>
          <span>{{ $t("shopList.name") }}</span>
          <input
            type="text"
            v-model="inputRecipientNameVal"
            :placeholder="$t('address.Please-enter-name')"
          />
        </p>

        <p>
          <span>{{ $t("shopList.phone") }}</span>
          <input
            type="text"
            v-model="inputMobile"
            :placeholder="$t('address.enter-telephone-number')"
          />
        </p>

        <p>
          <span>{{ $t("shopList.province") }}</span>
          <el-select
            v-model="inputProvince"
            :placeholder="$t('address.Please-select')"
            @change="handleInputProvince(inputProvince)"
          >
            <el-option
              v-for="item in provincesVal"
              :key="item.UID"
              :label="item.Name"
              :value="item.UID"
            ></el-option>
          </el-select>
        </p>

        <p>
          <span>{{ $t("shopList.city") }}</span>
          <el-select
            v-model="inputCity"
            :placeholder="$t('address.Please-select')"
            @change="handleInputCity(inputCity)"
          >
            <el-option
              v-for="item in citysVal"
              :key="item.UID"
              :label="item.Name"
              :value="item.UID"
            ></el-option>
          </el-select>
        </p>

        <p>
          <span>{{ $t("shopList.area") }}</span>
          <el-select
            v-model="inputArea"
            :placeholder="$t('address.Please-select')"
          >
            <el-option
              v-for="item in areasVal"
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
            v-model="inputAddress"
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
          <el-button @click="handleDialogAddress">{{
            $t("shopList.Take away")
          }}</el-button>
          <el-button type="primary" @click="handleIsDefaultAddress">{{
            $t("shopList.determine")
          }}</el-button>
        </span>
      </el-dialog>
    </div>

    <!-- 表格 -->
    <div class="address-table">
      <el-table
        ref="multipleTable"
        :data="addressList"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="50"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="Consignee"
          :label="$t('shopList.name')"
          width="110"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="Mobile"
          :label="$t('address.Mobile-phone')"
          width="130"
          align="center"
        ></el-table-column>
        <el-table-column
          :label="$t('address.Provinces')"
          align="center"
          width="180"
        >
          <template slot-scope="scope">{{
            scope.row.Province + scope.row.City + scope.row.Area
          }}</template>
        </el-table-column>
        <el-table-column
          prop="Address"
          :label="$t('address.Detailed-address')"
          align="center"
          width="229"
        >
        </el-table-column>
        <el-table-column
          :label="$t('box.Operation')"
          align="center"
          width="145"
        >
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              :content="$t('shopList.editor')"
              placement="bottom"
            >
              <i
                class="el-icon-edit-outline"
                @click="handleEidot(scope.row)"
              ></i>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              :content="$t('car.delete')"
              placement="bottom"
            >
              <i class="el-icon-delete" @click="dialogCheck(scope.row)"></i>
            </el-tooltip>
            <el-button
              v-if="!scope.row.IsDefault"
              @click="dialogPolice(scope.$index, scope.row)"
              size="small"
              type="text"
              class="address-query"
            >
              <el-tooltip
                class="item"
                effect="dark"
                :content="$t('address.Set to the default')"
                placement="bottom"
              >
                <img src="@/img/setaddress.png" />
              </el-tooltip>
            </el-button>
            <!-- {{ $t("address.Set to the default") }} -->
            <!-- $t("shopList.The default address") -->
            <span v-if="scope.row.IsDefault">
              <el-tooltip
                class="item"
                effect="dark"
                :content="$t('shopList.The default address')"
                placement="bottom"
              >
                <img src="@/img/default.png" />
              </el-tooltip>
            </span>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 删除 -->
    <div class="address-delete">
      <button @click="handleBatchDelete">
        {{ $t("address.Batch delete") }}
      </button>
    </div>

    <!-- 编辑弹框 -->
    <div class="address-edioter">
      <el-dialog
        :title="$t('address.Edit-shipping-address')"
        :visible.sync="dialogEditor"
        width="600px"
        :before-close="handleCloseEditor"
      >
        <p>
          <span>{{ $t("shopList.name") }}</span>
          <input type="text" v-model="editorRecipientName" />
        </p>

        <p>
          <span>{{ $t("shopList.phone") }}</span>
          <input type="text" v-model="editorMobileVal" />
        </p>

        <p>
          <span>{{ $t("shopList.province") }}</span>
          <el-select
            v-model="editorProvinceVal"
            filterable
            @change="handleProvinces(editorProvinceVal)"
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
            @change="handleCitys(editorCityVal)"
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
          <el-select v-model="editorAreaVal" filterable>
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
          <input type="text" v-model="editorAddressVal" />
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
  </div>
</template>

<script>
import { getObtain } from "@/unilts/auth";
import { ak, sk, CountryCode, regPhone } from "@/entry/index";
import { mapState, mapActions } from "vuex";
import http from "../unilts/http";
import "@/md5/jQuery.md5";
export default {
  name: "Address",
  data() {
    return {
      citysVal: "",
      areasVal: "",
      provincesVal: "",
      indexNumber: "",
      editorRecipientName: "",
      editorDefault: "1",
      editorMobileVal: "",
      editorProvinceVal: "",
      editorCityVal: "",
      editorAreaVal: "",
      editorAddressVal: "",
      dialogEditor: false,
      inputVal: false,
      inputRecipientNameVal: "",
      inputMobile: "",
      inputProvince: "",
      inputCity: "",
      inputArea: "",
      inputAddress: "",
      radioDefault: "1",
      dialogAddress: false,
      inputNamePhoneVal: "",
      multipleSelection: [],
      provinces: [],
      citys: [],
      areas: [],
      ProvinceUID: "", //省的uid
      CityUID: "", //市的uid
      AreaUID: "" //区的uid
    };
  },
  computed: {
    ...mapState("shopList", ["addressList"])
  },
  methods: {
    ...mapActions("shopList", ["getAddressList"]),
    //关闭编辑弹框
    handleCloseEditor() {
      this.dialogEditor = false;
    },
    //表格勾选
    handleSelectionChange(val) {
      this.multipleSelection = val.map(item => {
        return item.UID;
      });
    },
    //关闭窗口
    handleCloseAddress() {
      this.dialogAddress = false;
      this.inputRecipientNameVal = "";
      this.inputMobile = "";
      this.inputProvince = "";
      this.inputCity = "";
      this.inputArea = "";
      this.inputAddress = "";
      this.radioDefault = "1";
    },
    //收货地址选择省
    handleInputProvince(id) {
      let params = {
        Uid: id,
        AreaType: 1
      };
      if (id !== undefined) {
        this.$api.lveLinkage(params).then(res => {
          this.citysVal = res.Data.AreaList;
          this.inputCity = res.Data.AreaList[0].UID;
          this.handleInputCity(this.inputCity);
        });
      }
    },
    //收货地址选择市
    handleInputCity(id) {
      let params = {
        Uid: id,
        AreaType: 2
      };
      if (id !== undefined) {
        this.$api.lveLinkage(params).then(res => {
          this.areasVal = res.Data.AreaList;
          this.inputArea = res.Data.AreaList[0].UID;
        });
      }
    },
    //编辑选择省
    handleProvinces(id) {
      let params = {
        Uid: id,
        AreaType: 1
      };
      if (id !== undefined) {
        this.$api.lveLinkage(params).then(res => {
          this.citys = res.Data.AreaList;
          this.editorCityVal = res.Data.AreaList[0].UID;
          this.handleCitys(this.editorCityVal);
        });
      }
    },
    //编辑选择市
    handleCitys(id) {
      let params = {
        Uid: id,
        AreaType: 2
      };
      if (id !== undefined) {
        this.$api.lveLinkage(params).then(res => {
          if (res.Data) {
            this.areas = res.Data.AreaList;
            this.editorAreaVal = res.Data.AreaList[0].UID;
          } else {
            this.$message({
              message: res.Msg,
              type: "warning"
            });
          }
        });
      }
    },
    //取消添加收货地址
    handleDialogAddress() {
      this.dialogAddress = false;
      this.inputRecipientNameVal = "";
      this.inputMobile = "";
      this.inputProvince = "";
      this.inputCity = "";
      this.inputArea = "";
      this.inputAddress = "";
      this.radioDefault = "1";
    },
    //添加收货地址
    handleIsDefaultAddress() {
      let params = {
        UserCode: JSON.parse(getObtain()).resNew,
        CountryCode: CountryCode,
        Consignee: this.inputRecipientNameVal,
        Mobile: this.inputMobile,
        ProvinceUID: this.inputProvince,
        CityUID: this.inputCity,
        AreaUID: this.inputArea,
        Address: this.inputAddress,
        IsDefault: this.radioDefault
      };
      if (this.inputRecipientNameVal === "") {
        this.$message({
          message: this.$t("address.Please-enter-name"),
          type: "warning"
        });
      } else if (this.inputMobile === "") {
        this.$message({
          message: this.$t("address.enter-telephone-number"),
          type: "warning"
        });
      } else if (this.inputProvince === "") {
        this.$message({
          message: this.$t("address.Please-enter-the-province"),
          type: "warning"
        });
      } else if (this.inputCity === "") {
        this.$message({
          message: this.$t("address.Please-enter-the-province"),
          type: "warning"
        });
        this.$message.warning(this.$t("address.Please-enter-the-city"));
      } else if (this.inputArea === "") {
        this.$message.warning(this.$t("address.Please-enter-the-area"));
      } else if (this.inputAddress === "") {
        this.$message.warning(this.$t("address.enter-the-specific-address"));
      } else {
        this.dialogAddress = false;
        let paras = {
          UserCode: JSON.parse(getObtain()).resNew,
          CountryCode: CountryCode,
          SearchText: "",
          PageIndex: 1,
          PageSize: 30
        };
        //新增收货地址
        this.$api.newAddress(params).then(res => {
          this.getAddressList(paras);
          this.$message({
            message: this.$t("address.NewSuccess"),
            type: "success"
          });
        });
        this.inputRecipientNameVal = "";
        this.inputMobile = "";
        this.inputProvince = "";
        this.inputCity = "";
        this.inputArea = "";
        this.inputAddress = "";
        this.radioDefault = "1";
      }
    },
    //批量删除
    handleBatchDelete() {
      let params = {
        UserCode: JSON.parse(getObtain()).resNew,
        Uids: this.multipleSelection.join(",")
      };
      let para = {
        UserCode: JSON.parse(getObtain()).resNew,
        SearchText: "",
        PageIndex: 1,
        PageSize: 30
      };
      this.$api.getDeleteAddress(params).then(res => {
        if (res.Data) {
          this.inputVal = false;
          //获取收货地址，get
          this.getAddressList(para);
        } else {
          this.$message({
            message: res.Msg,
            type: "warning"
          });
        }
      });
    },
    //重置按钮
    handleReset() {
      this.inputNamePhoneVal = "";
      let params = {
        UserCode: JSON.parse(getObtain()).resNew,
        SearchText: this.inputNamePhoneVal,
        PageIndex: 1,
        PageSize: 30
      };
      //获取收货地址，get
      this.getAddressList(params);
    },
    //搜索
    handleSearch() {
      let params = {
        UserCode: JSON.parse(getObtain()).resNew,
        SearchText: this.inputNamePhoneVal,
        PageIndex: 1,
        PageSize: 30
      };
      if (this.inputNamePhoneVal === "") {
        this.$message({
          message: this.$t("address.enter-the-search-content"),
          type: "warning"
        });
      } else {
        //获取收货地址，get
        this.getAddressList(params);
      }
    },
    //删除
    dialogCheck(row) {
      let params = {
        UserCode: JSON.parse(getObtain()).resNew,
        Uids: row.UID
      };
      //删除地址，get
      this.$api.getDeleteAddress(params).then(res => {
        if (res.Data) {
          let para = {
            UserCode: JSON.parse(getObtain()).resNew,
            SearchText: "",
            PageIndex: 1,
            PageSize: 30
          };
          //获取收货地址，get
          this.getAddressList(para);
          this.$message({
            message: this.$t("address.Delete-the-success"),
            type: "success"
          });
        }
      });
    },
    //编辑
    handleEidot(row) {
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
    //确认修改编辑窗口
    handleEditorDeter() {
      let UserCode = JSON.parse(getObtain()).resNew;
      let params = {
        UserCode: UserCode,
        CountryCode: CountryCode,
        Consignee: this.editorRecipientName,
        Mobile: this.editorMobileVal,
        ProvinceUID: this.ProvinceUID,
        CityUID: this.CityUID,
        AreaUID: this.AreaUID,
        Address: this.editorAddressVal,
        IsDefault: this.editorDefault,
        UID: this.indexNumber
      };
      if (this.editorMobileVal === "") {
        this.$message({
          message: this.$t("address.number-cannot-empty"),
          type: "warning"
        });
      } else if (this.editorRecipientName === "") {
        this.$message({
          message: this.$t("address.name-cannot-empty"),
          type: "warning"
        });
      } else if (this.editorProvinceVal === "") {
        this.$message({
          message: this.$t("address.elect-province"),
          type: "warning"
        });
      } else if (this.editorCityVal === "") {
        this.$message({
          message: this.$t("address.select-the-city"),
          type: "warning"
        });
      } else if (this.editorAreaVal === "") {
        this.$message({
          message: this.$t("address.select-region"),
          type: "warning"
        });
      } else if (this.editorAddressVal === "") {
        this.$message({
          message: this.$t("address.fill-detailed-address"),
          type: "warning"
        });
      } else if (this.editorDefault !== "1" && this.editorDefault !== "0") {
        this.$message({
          message: this.$t("shopList.Is it the default address"),
          type: "warning"
        });
      } else {
        this.dialogEditor = false;
        let para = {
          UserCode: JSON.parse(getObtain()).resNew,
          SearchText: "",
          PageIndex: 1,
          PageSize: 30
        };
        this.$api.editorAddress(params).then(res => {
          if (res.Data) {
            //获取地址，get请求
            this.getAddressList(para);
            this.$message({
              message: this.$t("address.Modify-the-success"),
              type: "success"
            });
          }
        });
      }
    },
    //设为默认
    dialogPolice(index, row) {
      let params = {
        UserCode: JSON.parse(getObtain()).resNew,
        Uid: row.UID
      };
      this.$api.defaultAddress(params).then(res => {
        if (res.Data) {
          this.$message({
            message: this.$t("address.set-default-address"),
            type: "success"
          });
          let params = {
            UserCode: JSON.parse(getObtain()).resNew,
            SearchText: "",
            PageIndex: 1,
            PageSize: 30
          };
          //获取收货地址，get
          this.getAddressList(params);
        } else {
          let para = {
            UserCode: JSON.parse(getObtain()).resNew,
            SearchText: "",
            PageIndex: 1,
            PageSize: 30
          };
          //获取收货地址，get
          this.getAddressList(para);
          this.$message({
            message: this.$t("address.Delete-the-success"),
            type: "success"
          });
        }
      });
    }
  },
  created() {
    //收货地址选择省
    let para = {
      Uid: "",
      AreaType: 0
    };
    this.$api.lveLinkage(para).then(res => {
      this.provincesVal = res.Data.AreaList;
    });
    //编辑选择省
    let param = {
      Uid: "",
      AreaType: 0
    };
    this.$api.lveLinkage(param).then(res => {
      this.provinces = res.Data.AreaList;
    });
    let params = {
      UserCode: JSON.parse(getObtain()).resNew,
      SearchText: "",
      PageIndex: 1,
      PageSize: 30
    };
    //获取收货地址，get
    this.getAddressList(params);
  }
};
</script>

<style scoped lang="less">
@import "~@/styles/common/variable.less";

.address-total {
  margin-top: 15px;

  //收货地址
  .address-shipping {
    cursor: pointer;
    margin-left: 20px;
    width: 150px;
    height: 50px;
    border-bottom: 2px solid @home-logo;
    line-height: 50px;
    color: @home-logo;
  }

  //操作内容
  .address-operation {
    margin: 16px 0 0 20px;

    input {
      width: 300px;
      height: 30px;
      border-radius: 4px;
      border: 1px solid @ccc;
      margin-right: 10px;
      padding-left: 20px;
    }

    button:nth-of-type(1) {
      cursor: pointer;
      width: 79px;
      height: 33px;
      border: 1px solid @ccc;
      background: @fff;
      border-radius: 4px;
      margin-right: 10px;
    }

    button:nth-of-type(2) {
      cursor: pointer;
      width: 79px;
      height: 33px;
      border: 1px solid @ccc;
      background: @fff;
      border-radius: 4px;
      margin-right: 10px;
    }

    button:nth-of-type(3) {
      cursor: pointer;
      width: 166px;
      height: 33px;
      border: 1px solid @ccc;
      background: @home-logo;
      color: @fff;
      border-radius: 4px;
      margin-right: 10px;
    }
  }

  //添加收货地址
  .address-goods {
    /deep/.el-dialog {
      height: 500px;
    }

    /deep/.el-dialog__body {
      padding: 0;
    }

    p:nth-child(1) {
      font-size: 14px;
      margin: 25px 0 10px 173px;

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
      margin: 0 0 10px 112px;

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
      margin: 0 0 10px 134px;

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
      margin: 0 0 10px 144px;

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
      margin: 20px 0 13px 10px;

      span {
        margin-right: 15px;
      }
    }
  }

  //编辑收货地址
  .address-edioter {
    /deep/.el-dialog {
      height: 500px;
    }

    /deep/.el-dialog__body {
      padding: 0;
    }

    p:nth-child(1) {
      font-size: 14px;
      margin: 25px 0 10px 173px;

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
      margin: 0 0 10px 112px;

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
      margin: 0 0 10px 134px;

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
      margin: 0 0 10px 144px;

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
      margin: 20px 0 13px 10px;

      span {
        margin-right: 15px;
      }
    }
  }

  //删除
  .address-delete {
    margin: 16px 0 0 20px;

    button {
      cursor: pointer;
      min-width: 76px;
      min-height: 20px;
      border-radius: 3px;
      border: 1px solid @order-button;
      background: @fff;
      color: @order-button;
      outline: none;
    }
  }

  //表格
  .address-table {
    margin: 16px 0 0 20px;
    width: 908px;
    // .address-query {
    img {
      width: 18px;
      height: 18px;
      position: relative;
      top: 3px;
      //}
    }
    .el-icon-edit-outline {
      cursor: pointer;
    }

    .el-icon-delete {
      margin: 0 5px;
      cursor: pointer;
    }
  }
}
</style>
