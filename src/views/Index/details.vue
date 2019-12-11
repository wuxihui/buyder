<template>
  <div class="details-total">
    <div class="details-content">
      <!-- 左边图片区 -->
      <div class="details-img">
        <div class="details-largeImg">
          <!-- 动画效果 -->
          <transition
            v-on:before-enter="beforeEnter"
            v-on:enter="enter"
            v-on:after-enter="afterEnter"
          >
            <img
              :src="bigImageUrl == '' ? imgBig : bigImageUrl"
              class="details-ball"
              v-show="flag"
              alt
            />
          </transition>
          <img :src="bigImageUrl == '' ? imgBig : bigImageUrl" alt />
        </div>
        <div class="details-arrow-left">
          <i
            class="el-icon-arrow-left"
            @click="goRight"
            :style="{
              cursor: left == 0 ? 'no-drop' : '',
              color: left == 0 ? '#C0C0C0' : ''
            }"
          ></i>
        </div>
        <div class="details-smallImg">
          <ul :class="imgList.length > 6 ? '' : 'center'">
            <li
              v-for="(img, index) in imgList"
              :key="index"
              @mouseleave="getLeave(img, index)"
              @mouseenter="getImg(img, index)"
              :style="{ 'border-color': isColor === index ? 'red' : '' }"
            >
              <img :src="img" alt />
            </li>
          </ul>
        </div>
        <div class="details-arrow-right">
          <i
            class="el-icon-arrow-right"
            @click="goLeft"
            :style="{
              cursor: mobile || imgList.length <= 6 ? 'no-drop' : '',
              color: mobile || imgList.length <= 6 ? '#C0C0C0' : ''
            }"
          ></i>
        </div>
      </div>

      <!-- 淘宝天猫详情区 -->
      <div class="details-right-content" v-show="!thousand">
        <p>{{ detailsList.title }}</p>
        <p>
          <span>{{ $t("details.The price") }}:</span>
          <span
            >{{ changePrice ? changePrice : priceYueNanDun }}{{ symbol }}</span
          >
          <span
            >({{ rmbSymbol
            }}{{ changeRMBPrice ? changeRMBPrice : prices }})</span
          >
        </p>
        <p>
          <span>{{ $t("details.Buying commission") }}:</span>
          <span>{{ procedure }}{{ symbol }}</span>
          <!-- <span>
            <img src="@/img/code-buy.png" alt />
            <span>图片说明</span>
          </span>-->
        </p>
        <p>
          <span>{{ $t("details.The freight") }}:</span>
          <span>{{ $t("details.China freight") }}</span>
          <span
            >{{ chinaMoney }}{{ symbol }}&nbsp;&nbsp;({{ rmbSymbol
            }}{{ friGhts }})</span
          >
          <span>+</span>
          <span>{{ $t("details.The international freight") }}</span>
          <el-popover placement="top" width="350" trigger="hover">
            <p>{{ $t("details.Tariff subsidy channel") }}</p>
            <p>
              {{ $t("details.Hanoi") }}: {{ symbol }}23000/kg{{
                $t("details.Less than calculated")
              }}{{ $t("details.For example counts counts") }}
            </p>
            <p>
              {{ $t("details.Ho chi minh") }}: {{ symbol }}40000/kg{{
                $t("details.Less than calculated")
              }}{{ $t("details.For example counts counts") }}
            </p>
            <p>{{ $t("details.Traditional channels") }}</p>
            <p>
              {{ $t("details.Hanoi") }}: {{ symbol }}19000/kg{{
                $t("details.Less than calculated")
              }}{{ $t("details.For example counts counts") }}
            </p>
            <p>
              {{ $t("details.Ho chi minh") }}: {{ symbol }}23000/kg{{
                $t("details.Less than calculated")
              }}{{ $t("details.For example counts counts") }}
            </p>
            <img src="@/img/code-buy.png" alt slot="reference" />
          </el-popover>
        </p>
        <p>
          <span>{{ $t("details.aging") }}:</span>
          <span>4-11{{ $t("details.days") }}</span>
          <el-popover placement="top" width="180" trigger="hover">
            <p>
              {{ $t("details.Home to the warehouse") }}1-3{{
                $t("details.days")
              }}
            </p>
            <p>
              {{ $t("details.International to the warehouse") }}2-4
              {{ $t("details.days") }}
            </p>
            <p>{{ $t("details.Home delivery") }}1-3 {{ $t("details.days") }}</p>
            <img src="@/img/code-buy.png" alt slot="reference" />
          </el-popover>
        </p>
        <ul>
          <li v-for="(item, index) in styleLists" :key="index">
            <h1>
              {{ item.name }}
            </h1>
            <div class="details-right-style">
              <span
                v-for="(infor, zIndex) in item.values"
                :key="zIndex"
                @click="handleSize(index, zIndex)"
                :style="{
                  'border-color': infor.isCheck == true ? '#d33319' : ''
                }"
                >{{ infor.name }}</span
              >
            </div>
          </li>
        </ul>
        <p>
          <span>{{ $t("details.number") }}:</span>
          <button @click="handleReduction">-</button>
          <input
            type="text"
            v-model="numberVal"
            onkeyup="this.value=this.value.replace(/^0/g,'')"
          />
          <button @click="handleAdd">+</button>
          <span>
            <span>{{ $t("details.inventory") }}</span>
            <span :style="{ color: endQuatys === 0 ? '#d33319' : '' }">{{
              endQuatys ? endQuatys : quaTayOne
            }}</span>
          </span>
        </p>
        <p>
          <button
            @click="handleBuyNow"
            :style="{
              background:
                (endQuatys ? endQuatys : quaTayOne) == 0 ? '#AAAAAA' : '',
              cursor: (endQuatys ? endQuatys : quaTayOne) == 0 ? 'no-drop' : ''
            }"
          >
            {{ $t("details.Buy now") }}
          </button>
          <button
            @click="handleCar"
            :style="{
              background:
                (endQuatys ? endQuatys : quaTayOne) == 0 ? '#AAAAAA' : '',
              cursor: (endQuatys ? endQuatys : quaTayOne) == 0 ? 'no-drop' : ''
            }"
          >
            {{ $t("details.Join the buying agent") }}
          </button>
        </p>
      </div>

      <!-- 1688详情区 -->
      <div class="details-thousand" v-show="thousand">
        <ul>
          <li>{{ detailsList.title }}</li>
          <li>
            <span>价格</span>
            <span
              v-for="(infor, index) in defaultYueNanDun"
              :key="index"
              style="margin: 0 10px; position: relative;
                     top: -10px"
            >
              <b
                style="font-weight: 900; font-size: 20px; color: #d33319; display: block"
              >
                {{ infor }}{{ symbol }}
              </b>
              <b>{{ rmbSymbol }}{{ defaultPrices[index].price }}</b>
            </span>
            <p>
              <b>{{ endPrice ? endPrice : batchPriceYueNanDun }}{{ symbol }}</b>
              &nbsp;&nbsp;
              {{ rmbSymbol }}{{ chinaEndPrice ? chinaEndPrice : batchPriceOne }}
            </p>
          </li>
          <li>
            <span>起批量</span>
            <span
              v-for="(item, index) in defaultPrices"
              :key="index"
              style="margin: 0 10px"
            >
              <i v-html="item.amount"></i>
              {{ detailsList.unit }}</span
            >
          </li>
          <li>
            <span>{{ $t("details.Buying commission") }}:</span>
            <span>{{ procedure }}{{ symbol }}</span>
          </li>
          <li>
            <span>{{ $t("details.The freight") }}:</span>
            <span>{{ $t("details.China freight") }}</span>
            <span
              >{{ chinaMoney }}{{ symbol }}&nbsp;&nbsp;({{ rmbSymbol
              }}{{ friGhts }})</span
            >
            <span>+</span>
            <span>{{ $t("details.The international freight") }}</span>
            <el-popover placement="top" width="350" trigger="hover">
              <p>{{ $t("details.Tariff subsidy channel") }}</p>
              <p>
                {{ $t("details.Hanoi") }}: {{ symbol }}23000/kg{{
                  $t("details.Less than calculated")
                }}{{ $t("details.For example counts counts") }}
              </p>
              <p>
                {{ $t("details.Ho chi minh") }}: {{ symbol }}40000/kg{{
                  $t("details.Less than calculated")
                }}{{ $t("details.For example counts counts") }}
              </p>
              <p>{{ $t("details.Traditional channels") }}</p>
              <p>
                {{ $t("details.Hanoi") }}: {{ symbol }}19000/kg{{
                  $t("details.Less than calculated")
                }}{{ $t("details.For example counts counts") }}
              </p>
              <p>
                {{ $t("details.Ho chi minh") }}: {{ symbol }}23000/kg{{
                  $t("details.Less than calculated")
                }}{{ $t("details.For example counts counts") }}
              </p>
              <img src="@/img/code-buy.png" alt slot="reference" />
            </el-popover>
          </li>
          <li>
            <span>{{ $t("details.aging") }}:</span>
            <span>4-11{{ $t("details.days") }}</span>
            <el-popover placement="top" width="180" trigger="hover">
              <p>
                {{ $t("details.Home to the warehouse") }}1-3{{
                  $t("details.days")
                }}
              </p>
              <p>
                {{ $t("details.International to the warehouse") }}2-4
                {{ $t("details.days") }}
              </p>
              <p>
                {{ $t("details.Home delivery") }}1-3 {{ $t("details.days") }}
              </p>
              <img src="@/img/code-buy.png" alt slot="reference" />
            </el-popover>
          </li>
          <li>
            <div
              class="details-thousand-stylesValue"
              v-for="(item, index) in stylesValue"
              :key="index"
            >
              <h2>
                {{ item.prop }}
              </h2>
              <div class="details-thousand-style">
                <span
                  v-for="(items, zindex) in item.value"
                  :key="zindex"
                  @click="handleThousand(index, zindex)"
                  :style="{
                    color: items.isCheck ? '#d33319' : '',
                    'border-color': items.isCheck ? '#d33319' : ''
                  }"
                >
                  {{ items.name }}
                </span>
              </div>
            </div>
          </li>
          <li>
            <span>{{ $t("details.number") }}:</span>
            <button @click="handleReduct">-</button>
            <input
              type="text"
              v-model="inputNum"
              onkeyup="this.value=this.value.replace(/^0/g,'')"
              @blur="handleFunNumber"
            />
            <button @click="handleIncrease">+</button>
            <span>{{ $t("details.inventory") }}</span>
            <span>{{ endQuatys ? endQuatys : quaTayOne }}</span>
          </li>
          <li>
            <button
              @click="handlePurchase"
              :style="{
                background:
                  (endQuatys ? endQuatys : quaTayOne) == 0 ? '#AAAAAA' : '',
                cursor:
                  (endQuatys ? endQuatys : quaTayOne) == 0 ? 'no-drop' : ''
              }"
            >
              {{ $t("details.Buy now") }}
            </button>
            <button
              @click="handleJoin"
              :style="{
                background:
                  (endQuatys ? endQuatys : quaTayOne) == 0 ? '#AAAAAA' : '',
                cursor:
                  (endQuatys ? endQuatys : quaTayOne) == 0 ? 'no-drop' : ''
              }"
            >
              {{ $t("details.Join the buying agent") }}
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { CountryCode, symbol, rmbSymbol } from "@/entry/index";
import { getObtain, setImgShops, getItems } from "@/unilts/auth";
import { accMul, accDiv, deepCopy, accSub, accAdd, format } from "@/algo/index";
export default {
  name: "Details",
  data() {
    return {
      inputNum: 1, //1688选择数量
      minNumber: 0, //最低起批量
      procedure: format(20000, 2), //手续费
      changePrice: 0, //变化后的价格展示越南盾
      changeRMBPrice: 0, //变化后的价格展示越南盾
      mobile: false, //控制向右滑动的颜色
      flag: false, //控制添加购物车的图片
      left: 0, //控制小图的移动
      disabled: false,
      price: "",
      isOtherOk: true,
      sellableQuantity: "",
      isNewPrice: "",
      isOne: "",
      valueList: [],
      isTwo: "",
      sizeColor: -1,
      isOrColor: -1,
      isNumber: 0,
      numberVal: 1,
      symbol: "",
      rmbSymbol: "",
      ImgUrl: "",
      emails: "",
      chinaPrice: 0
    };
  },
  computed: {
    ...mapState("car", ["carList"]),
    ...mapState("car", ["rate", "nameEmils"]),
    ...mapState("header", [
      "detailsList", //商品主体信息
      "imgList", //全部图片
      "friGhts", //中国运费
      "prices", //中国商品单价RMB
      "priceYueNanDun", //中国商品单价越南盾钱
      "styleLists", //商品类型分类
      "imgBig", //第一张大图
      "stylesValue", //商品类型的value值
      "valueIds", //取出value对应的id的值
      "quaTayOne", //默认数量
      "chinaMoney", //中国运费越南盾钱
      "urls", //头部链接
      "endQuatys", //最后变化的数量
      "textArr", //选中的类型名称
      "keyArr", //选中的类型编码
      "endPrice", //变化后的价格越南盾
      "chinaEndPrice", //变化后的价格的人民币
      "bigImageUrl", //变化的大图
      "isColor", //变化的小图边框颜色
      "thousand", //1688的显示与隐藏
      "defaultPrices", //默认价格和起批量
      "defaultYueNanDun", //默认越南盾钱
      "sizeMap", //所有商品的集合对应的价格和数量
      // "stylesValueOne", //1688商品规格
      // "stylesValueTwo", //1688商品规格
      "batchPriceOne", //1688默认第一个单价
      "batchPriceYueNanDun" //1688默认第一个越南盾单价
    ])
  },
  methods: {
    //代购车
    ...mapActions("car", ["getCarList"]),
    ...mapActions("header", ["getGenerationList"]),
    //1688客户增加或减少数量
    handleChangeNum(value) {
      console.log(value);
    },
    //向左边移动
    goLeft() {
      //控制箭头颜色
      if (
        accAdd(Math.abs(this.left), 383) >=
        Math.floor(accDiv(this.imgList.length, 6)) * 256
      ) {
        this.mobile = true;
      }

      //判断是否可点击
      if (
        accAdd(Math.abs(this.left), 100) >=
        Math.floor(accDiv(this.imgList.length, 6)) * 256
        // Math.abs(this.left) >=
        // accMul(Math.floor(accDiv(this.imgList.length, 6)), 256)
      ) {
        return;
      } else {
        this.left = this.left - 256;
        $(".details-smallImg ul").css("left", this.left + "px");
      }
    },
    //向右边移动
    goRight() {
      //判断是否可点击
      if (this.left == 0) {
        return;
      }
      //控制箭头颜色
      if (this.left <= 0) {
        this.mobile = false;
      }
      this.left = this.left + 256;
      $(".details-smallImg ul").css("left", this.left + "px");
    },
    //控制添加购物车的图片进入之前
    beforeEnter(el) {
      el.style.transform = "translate(0, 0)";
    },
    //控制添加购物车的图片进入途中
    enter(el, done) {
      el.offsetWidth;
      el.style.transform = "translate(600px, -140px)";
      // el.style.transition = "all 0.6s linear";
      el.style.transition = "all 0.6s ease-in";
      done();
    },
    //控制添加购物车的图片进入之后
    afterEnter(el) {
      this.flag = !this.flag;
    },
    //淘宝天猫加入代购车
    handleCar() {
      if (this.nameEmils ? this.nameEmils : this.emails) {
        let params = {
          UserCode: JSON.parse(getObtain()).resNew, //会员号
          CountryCode: CountryCode, //国家编码
          URL: this.urls, //商品URL
          MainTitle: this.detailsList.title, //主标题
          SubTitle:
            this.detailsList.title2 == undefined ? "" : this.detailsList.title2, //副标题
          GoodsPriceRMB: this.chinaEndPrice ? this.chinaEndPrice : this.prices, //商品单价RMB
          ChinaFreightRMB: this.friGhts, //中国运费
          Specification: this.textArr, //规格：尺码、颜色
          SpecificationCode: this.keyArr, //规格编码
          Qty: this.numberVal //数量
        };
        if (this.endQuatys) {
          if (this.endQuatys > 0) {
            //post，添加购物车
            this.$api.addCar(params).then(res => {
              if (res.Data) {
                this.flag = !this.flag;
              } else {
                this.$message({
                  message: res.Msg,
                  type: "warning"
                });
              }
            });
          } else if (this.endQuatys == 0) {
            this.$message({
              message: this.$t("details.stock_present"),
              type: "warning"
            });
          }
        } else if (!this.styleLists && this.quaTayOne > 0) {
          this.$api.addCar(params).then(res => {
            if (res.Data) {
              this.flag = !this.flag;
            } else {
              this.$message({
                message: res.Msg,
                type: "warning"
              });
            }
          });
        } else if (this.styleLists) {
          this.$message({
            message: this.$t("details.product_properties"),
            type: "warning"
          });
        }
      } else if (!this.nameEmils) {
        this.$message({
          message: this.$t("details.login_user_name"),
          type: "warning"
        });
      }
    },
    //淘宝天猫立即购买
    handleBuyNow() {
      if (this.nameEmils ? this.nameEmils : this.emails) {
        if (this.endQuatys) {
          if (this.endQuatys > 0) {
            this.$router.push({
              path: "shopList",
              query: {
                GoodsURL: this.urls,
                MainTitle: this.detailsList.title,
                SubTitle: this.detailsList.title2,
                GoodsPriceRMB: this.chinaEndPrice
                  ? this.chinaEndPrice
                  : this.prices,
                ChinaFreightRMB: this.friGhts,
                Specification: this.textArr,
                SpecificationCode: this.keyArr,
                QTY: this.numberVal
              }
            });
          } else if (this.endQuatys == 0) {
            this.$message({
              message: this.$t("details.stock_present"),
              type: "warning"
            });
          }
        } else if (!this.styleLists && this.quaTayOne > 0) {
          this.$router.push({
            path: "shopList",
            query: {
              GoodsURL: this.urls,
              MainTitle: this.detailsList.title,
              SubTitle: this.detailsList.title2,
              GoodsPriceRMB: this.chinaEndPrice
                ? this.chinaEndPrice
                : this.prices,
              ChinaFreightRMB: this.friGhts,
              Specification: this.textArr,
              SpecificationCode: this.keyArr,
              QTY: this.numberVal
            }
          });
        } else if (this.styleLists) {
          this.$message({
            message: this.$t("details.product_properties"),
            type: "warning"
          });
        }
      } else if (!this.nameEmils) {
        this.$message({
          message: this.$t("details.login_user_name"),
          type: "warning"
        });
      }
    },
    //移入图片变更
    getImg(imgUrl, index) {
      let bigImageUrl = this.bigImageUrl;
      let isColor = this.isColor;
      bigImageUrl = imgUrl;
      isColor = index;
      this.$store.commit("header/SETBIGIMAGGEURL", bigImageUrl);
      this.$store.commit("header/SETISCOLOR", isColor);
    },
    //移出图片变更
    getLeave(imgUrl, index) {
      let bigImageUrl = this.bigImageUrl;
      let isColor = this.isColor;
      bigImageUrl = imgUrl;
      isColor = index;
      this.$store.commit("header/SETBIGIMAGGEURL", bigImageUrl);
      this.$store.commit("header/SETISCOLOR", isColor);
    },
    //1688增加减少
    handleReduct() {
      if (this.inputNum > 1) {
        this.inputNum--;
        this.priceByQuatys();
      } else if (this.inputNum == 1) {
        return;
      }
    },
    //1688增加
    handleIncrease() {
      let accSubs = this.inputNum;
      let endQuatys = this.endQuatys ? this.endQuatys : this.quaTayOne;
      if (accSubs <= endQuatys) {
        this.inputNum++;
        this.priceByQuatys();
        if (accSubs == endQuatys) {
          return;
        }
      }
    },
    //判断起批量的单价
    priceByQuatys() {
      let totalQuatys = this.inputNum;
      let defaultPrices = this.defaultPrices;
      let chinaEndPrice = 0; //变动的人民币价格
      let endPrice = 0; //变动的越南盾价格
      let len = defaultPrices.length;
      if (len > 1) {
        for (let i = 0; i < len; i++) {
          let item = defaultPrices[i];
          let minQuaty = 0;
          let maxQuaty = 0;
          if (i == len - 1) {
            if (item.amount.indexOf(";") > -1) {
              minQuaty = item.amount.split(";")[0];
              maxQuaty = item.amount.split(";")[1];
              if (parseInt(totalQuatys) >= parseInt(maxQuaty)) {
                chinaEndPrice = item.price;
              }
            }
          } else {
            minQuaty = item.amount.split("-")[0];
            maxQuaty = item.amount.split("-")[1];
            if (
              parseInt(minQuaty) <= parseInt(totalQuatys) &&
              parseInt(maxQuaty) >= parseInt(totalQuatys)
            ) {
              chinaEndPrice = item.price;
              break;
            }
            if (i == 0 && parseInt(totalQuatys) < parseInt(minQuaty)) {
              chinaEndPrice = item.price;
              this.minNumber = minQuaty;
              break;
            }
          }
        }
      }

      if (len == 1) {
        for (let i = 0; i < defaultPrices.length; i++) {
          let item = defaultPrices[i];
          if (item.amount.indexOf(";") > -1) {
            minQuaty = item.amount.split(";")[0];
            maxQuaty = item.amount.split(";")[1];
            if (parseInt(totalQuatys) >= parseInt(maxQuaty)) {
              chinaEndPrice = item.price;
            }
          } else {
            if (item.price.indexOf("-") > -1) {
              if (this.chinaPrice) {
                chinaEndPrice = this.chinaPrice;
              } else {
                chinaEndPrice = item.price.split("-")[0];
              }
            } else {
              chinaEndPrice = item.price;
            }
            if (this.inputNum <= item.amount) {
              this.minNumber = item.amount;
            }
            // console.log("minNumber2", this.minNumber);
          }
        }
      }
      if (chinaEndPrice) {
        endPrice = accMul(chinaEndPrice, this.rate).toFixed(2);
        this.$store.commit("header/SETCHINAENDPRICE", chinaEndPrice);
        this.$store.commit("header/SETENDPRICES", endPrice);
      }
    },
    //1688input焦点事件
    handleFunNumber() {
      this.priceByQuatys();
    },
    //1688立即购买
    handlePurchase() {
      if (this.nameEmils ? this.nameEmils : this.emails) {
        if (this.endQuatys) {
          this.priceByQuatys();
          if (parseInt(this.inputNum) < parseInt(this.minNumber)) {
            this.$message({
              message: this.$t("details.starting_batch"),
              type: "warning"
            });
          } else {
            this.$router.push({
              path: "shopList",
              query: {
                GoodsURL: this.urls, //商品URL，需要URL编码
                MainTitle: this.detailsList.title, //主标题
                SubTitle: this.detailsList.title2, //副标题
                GoodsPriceRMB: this.chinaEndPrice, //商品单价RMB
                ChinaFreightRMB: this.friGhts, //中国运费（电商平台-中国仓）运费
                Specification: this.textArr, //规格：尺码、颜色等，用“,”隔开
                QTY: this.inputNum //数量
              }
            });
          }
        } else {
          this.$message({
            message: this.$t("details.stock_present"),
            type: "warning"
          });
        }
        if (!this.stylesValue && this.quaTayOne > 0) {
          this.$router.push({
            path: "shopList",
            query: {
              GoodsURL: this.urls, //商品URL，需要URL编码
              MainTitle: this.detailsList.title, //主标题
              SubTitle: this.detailsList.title2, //副标题
              GoodsPriceRMB: this.chinaEndPrice, //商品单价RMB
              ChinaFreightRMB: this.friGhts, //中国运费（电商平台-中国仓）运费
              Specification: this.textArr, //规格：尺码、颜色等，用“,”隔开
              QTY: this.inputNum //数量
            }
          });
        }
      } else if (!this.nameEmils) {
        this.$message({
          message: this.$t("details.login_user_name"),
          type: "warning"
        });
      }
    },
    //1688加入购物车
    handleJoin() {
      if (this.nameEmils ? this.nameEmils : this.emails) {
        let params = {
          UserCode: JSON.parse(getObtain()).resNew, //会员号
          CountryCode: CountryCode, //国家编码
          URL: this.urls, //商品URL
          MainTitle: this.detailsList.title, //主标题
          SubTitle:
            this.detailsList.title2 == undefined ? "" : this.detailsList.title2, //副标题
          GoodsPriceRMB: this.chinaEndPrice, //商品单价RMB
          ChinaFreightRMB: this.friGhts, //中国运费
          Specification: this.textArr, //规格：尺码、颜色
          // SpecificationCode: this.keyArr, //规格编码
          Qty: this.inputNum //数量
        };
        if (this.endQuatys) {
          this.priceByQuatys();
          if (parseInt(this.inputNum) < parseInt(this.minNumber)) {
            this.$message({
              message: this.$t("details.starting_batch"),
              type: "warning"
            });
          } else {
            //post，添加购物车
            this.$api.addCar(params).then(res => {
              if (res.Data) {
                this.flag = !this.flag;
              } else {
                this.$message({
                  message: res.Msg,
                  type: "warning"
                });
              }
            });
            if (!this.stylesValue && this.quaTayOne > 0) {
              //post，添加购物车
              this.$api.addCar(params).then(res => {
                if (res.Data) {
                  this.flag = !this.flag;
                } else {
                  this.$message({
                    message: res.Msg,
                    type: "warning"
                  });
                }
              });
            }
          }
        } else {
          this.$message({
            message: this.$t("details.stock_present"),
            type: "warning"
          });
        }
      } else if (!this.nameEmils) {
        this.$message({
          message: this.$t("details.login_user_name"),
          type: "warning"
        });
      }
    },
    //1688规格选择
    handleThousand(index, zindex) {
      let stylesList = deepCopy(this.stylesValue);
      let stylesArr = stylesList[index].value;
      let len = stylesArr.length;
      for (let i = 0; i < len; i++) {
        let item = stylesArr[i];
        if (i == zindex) {
          item.isCheck = true;
        } else {
          item.isCheck = false;
        }
      }
      //选中后得到的商品名称集合
      let keyArr = [];
      let textArr = [];
      let lenz = stylesList.length;
      if (lenz > 1) {
        for (let m = 0; m < lenz; m++) {
          let itemz = stylesList[m].value;
          let lenm = itemz.length;
          for (let j = 0; j < lenm; j++) {
            let itemm = itemz[j];
            if (itemm.isCheck) {
              keyArr.push(itemm.name);
            }
          }
        }
        this.$store.commit("header/SETSTYLEKEY", keyArr.join("&gt;"));
      }
      //选中后得到的商品名称集合
      if (lenz == 1) {
        for (let n = 0; n < lenz; n++) {
          let itemi = stylesList[n].value;
          let leni = itemi.length;
          for (let k = 0; k < leni; k++) {
            let itemk = itemi[k];
            if (itemk.isCheck) {
              keyArr.push(itemk.name);
            }
          }
        }
        this.$store.commit("header/SETSTYLEKEY", keyArr.join());
      }
      if (keyArr.length == stylesList.length) {
        let chinaEndPrice = 0; //变动的人民币价格
        let endPrice = 0; //变动的越南盾价格
        if (lenz > 1) {
          let key = keyArr.join("&gt;");
          console.log(keyArr.join(","));
          this.$store.commit("header/SETTEXTARR", keyArr.join(","));
          this.$store.commit(
            "header/SETENDQUATYS",
            this.sizeMap[key].canBookCount
          );
          if (this.sizeMap[key].price) {
            chinaEndPrice = this.sizeMap[key].price;
            this.chinaPrice = chinaEndPrice;
          }
          if (!this.sizeMap[key].price && this.sizeMap[key].discountPrice) {
            chinaEndPrice = this.sizeMap[key].discountPrice;
            this.chinaPrice = chinaEndPrice;
          }
          if (chinaEndPrice) {
            this.$store.commit("header/SETCHINAENDPRICE", chinaEndPrice);
            endPrice = accMul(chinaEndPrice, this.rate).toFixed(2);
            this.$store.commit("header/SETENDPRICES", endPrice);
          }
        }
        if (lenz == 1) {
          let key = keyArr.join();
          this.$store.commit("header/SETTEXTARR", key);
          this.$store.commit(
            "header/SETENDQUATYS",
            this.sizeMap[key].canBookCount
          );
          if (this.sizeMap[key].price) {
            chinaEndPrice = this.sizeMap[key].price;
            this.chinaPrice = chinaEndPrice;
          }
          if (!this.sizeMap[key].price && this.sizeMap[key].discountPrice) {
            chinaEndPrice = this.sizeMap[key].discountPrice;
            this.chinaPrice = chinaEndPrice;
          }
          if (chinaEndPrice) {
            this.$store.commit("header/SETCHINAENDPRICE", chinaEndPrice);
            endPrice = accMul(chinaEndPrice, this.rate).toFixed(2);
            this.$store.commit("header/SETENDPRICES", endPrice);
          }
        }
      }
      this.$store.commit("header/SETSTYLESVALUE", stylesList);
    },
    //淘宝天猫尺寸选择
    handleSize(index, zindex) {
      this.numberVal = 1;
      let colorList = deepCopy(this.styleLists);
      let colorArr = colorList[index].values;
      let len = colorArr.length;
      for (let i = 0; i < len; i++) {
        let item = colorArr[i];
        if (i == zindex) {
          item.isCheck = true;
        } else {
          item.isCheck = false;
        }
      }
      // 添加判断是否选择属性- isCheck 默认为false
      let keyArr = [];
      let textArr = [];
      len = colorList.length;
      for (let i = 0; i < len; i++) {
        let itemi = colorList[i];
        let lenz = itemi.values.length;
        for (let z = 0; z < lenz; z++) {
          let itemz = itemi.values[z];
          if (itemz.isCheck) {
            textArr.push(itemi.name + "," + itemz.name);
            keyArr.push(itemi.pid + ":" + itemz.vid);
            this.$store.commit("header/SETKEYARR", keyArr.join(";"));
            this.$store.commit("header/SETTEXTARR", textArr.join(","));
          }
        }
      }
      //判断key值的长度
      let lenz = this.stylesValue[0].propPath.split(";").length;
      let items = null;
      let valueIdes = null;
      let endValues = 0;
      if (lenz == this.keyArr.split(";").length) {
        for (let i = 0; i < this.stylesValue.length; i++) {
          if (this.stylesValue[i].propPath == this.keyArr) {
            items = this.stylesValue[i].skuId;
            let isPrice = this.valueIds[items].subPrice
              ? this.valueIds[items].subPrice.priceText
              : this.valueIds[items].price.priceText;
            if (items) {
              if (isPrice.indexOf("-") > -1) {
                valueIdes = isPrice.split("-");
                valueIdesOne = accMul(valueIdes[0].trim(), this.rate).toFixed(
                  2
                );
                valueIdesTwo = accMul(valueIdes[1].trim(), this.rate).toFixed(
                  2
                );
                endValues = valueIdesOne + "-" + valueIdesTwo;
              } else {
                endValues = accMul(isPrice, this.rate).toFixed(2);
                this.changePrice = format(accMul(isPrice, this.rate), 2);
              }
              this.$store.commit(
                "header/SETENDQUATYS",
                this.valueIds[items].quantity
              );
            }
            //展示RMB商品單價
            this.changeRMBPrice = format(isPrice, 2);
            this.$store.commit("header/SETENDPRICES", endValues);
            this.$store.commit(
              "header/SETCHINAENDPRICE",
              accMul(isPrice, 1).toFixed(2)
            );
          }
        }
      }
      this.$store.commit("header/SETSTYLELISTS", colorList);
    },
    //颜色选择
    handleColor(index) {
      this.isNumber = index;
    },
    //淘宝天猫减少商品数量
    handleReduction() {
      if (this.numberVal > 1) {
        this.numberVal--;
      } else if (this.numberVal <= 1) {
        return;
      }
    },
    //淘宝天猫增加商品数量
    handleAdd() {
      let accSubs = accAdd(this.numberVal, 1);
      let endQuatys = this.endQuatys ? this.endQuatys : this.quaTayOne;
      if (accSubs <= endQuatys) {
        this.numberVal++;
        if (accSubs == endQuatys) {
          return;
        }
      }
    }
  },
  created() {
    //越南盾符号
    this.symbol = symbol;
    this.rmbSymbol = rmbSymbol;
    // this.rate = JSON.parse(getItems());
    if (getObtain()) {
      this.emails = JSON.parse(getObtain()).resData;
    }
    //重置数据, 尺寸选择，清空vuex里面的数据
    let colorList = deepCopy(this.styleLists);
    let lenz = colorList.length;
    for (let z = 0; z < lenz; z++) {
      let itemz = colorList[z].values;
      let len = itemz.length;
      for (let i = 0; i < len; i++) {
        let item = itemz[i];
        item.isCheck = false;
      }
    }
    this.$store.commit("header/SETSTYLELISTS", colorList);
  }
};
</script>

<style scoped lang="less">
@import "~@/styles/common/variable.less";
.details-total {
  width: 1200px;
  margin: 30px auto;
  padding-bottom: 60px;
  .details-content {
    display: flex;

    .details-largeImg {
      width: 400px;
      height: 400px;
      border: 1px solid @ccc;
      margin: 0 20px 17px 17px;
      padding: 10px;
      display: flex;
      justify-content: center;

      .details-ball {
        width: 30px;
        height: 30px;
        position: absolute;
      }

      img {
        width: 400px;
        height: 400px;
      }
    }
    .details-arrow-left {
      float: left;
      height: 100%;
      z-index: 10;
      background: @fff;
      .el-icon-arrow-left {
        font-size: 25px;
        cursor: pointer;
        z-index: 10;
        margin: 16px 0 0 12px;
      }
      /* .el-icon-arrow-left:hover {
        color: @home-logo;
      } */
    }
    .details-arrow-right {
      float: left;
      height: 100%;
      z-index: 10;
      background: @fff;
      /* .el-icon-arrow-right:hover {
        color: @home-logo;
      } */
      .el-icon-arrow-right {
        font-size: 25px;
        cursor: pointer;
        z-index: 10;
        margin-top: 16px;
      }
    }
    .details-smallImg {
      float: left;
      width: 383px;
      position: relative;
      display: flex;
      overflow: hidden;
      height: 52px;
      justify-content: space-between;
      .center {
        left: 50% !important;
        transform: translateX(-50%);
      }
      ul {
        position: absolute;
        /* justify-content: center; */
        display: flex;
        z-index: 0;
        /* background: red; */
        li {
          width: 50px;
          height: 50px;
          margin: 0 6px;
          border: 1px solid @fff;
          //border: 2px solid @fff;
          img {
            cursor: pointer;
            width: 50px;
            height: 50px;
          }
        }
      }
    }
  }
  // 1688详情区
  .details-thousand {
    h2 {
      min-width: 70px;
      position: relative;
      top: 18px;
      font-size: 14px;
    }
    li:nth-of-type(1) {
      font-size: 16px;
      font-weight: 900;
      height: 40px;
    }
    li:nth-of-type(2) {
      font-size: 14px;
      margin-top: 22px;
      display: flex;
      span:nth-of-type(1) {
        margin-right: 20px;
      }
      p {
        margin-left: 10px;
        b {
          font-weight: 900;
          font-size: 16px;
          color: @home-logo;
        }
      }
    }
    li:nth-of-type(3) {
      font-size: 14px;
      margin-top: 22px;
      span:nth-of-type(1) {
        margin-right: 10px;
      }
    }
    li:nth-of-type(4) {
      font-size: 14px;
      margin-top: 22px;
      span:nth-of-type(1) {
        margin-right: 10px;
      }
    }
    li:nth-of-type(5) {
      font-size: 14px;
      margin-top: 22px;
      img {
        width: 20px;
        height: 20px;
        position: relative;
        top: 3px;
      }
      span:nth-of-type(1) {
        margin-right: 10px;
      }
      span:nth-of-type(2) {
        color: @home-logo;
        margin-right: 8px;
      }
      span:nth-of-type(3) {
        color: @details-p;
      }
      span:nth-of-type(4) {
        margin: 8px;
      }
      span:nth-of-type(5) {
        color: @code-blue;
        margin-right: 8px;
      }
    }
    li:nth-of-type(6) {
      font-size: 14px;
      margin-top: 22px;
      span:nth-of-type(1) {
        margin-right: 10px;
      }
      img {
        width: 20px;
        height: 20px;
        position: relative;
        top: 3px;
        left: 5px;
      }
    }
    li:nth-of-type(7) {
      font-size: 14px;
      margin-top: 22px;
      h2 {
        width: 25px;
      }
      .details-thousand-stylesValueTwo {
        display: flex;
        margin-top: 22px;
        h3 {
          margin-right: 45px;
        }
        input {
          width: 35px;
        }
      }
      .details-thousand-stylesValue {
        display: flex;
        flex-wrap: wrap;
        .details-thousand-style {
          width: 600px;
          span {
            cursor: pointer;
            font-size: 14px;
            padding: 5px;
            margin: 5px;
            border: 1px solid @ccc;
            line-height: 20px;
            text-align: center;
            display: inline-block;
          }
        }
      }
    }
    li:nth-of-type(8) {
      margin-top: 22px;
      span {
        margin: 0 5px 0 0;
      }
      input {
        width: 30px;
        outline: none;
        padding-left: 8px;
      }
      button {
        cursor: pointer;
        background: @fff;
        border: 1px solid @code-p;
        height: 21px;
      }
    }
    li:nth-of-type(9) {
      margin-top: 22px;
      button {
        cursor: pointer;
        width: 136px;
        height: 40px;
        background: @home-logo;
        border-radius: 5px;
        border: none;
        margin-right: 10px;
        color: @fff;
        outline: none;
      }
    }
  }
  // 淘宝天猫详情区
  .details-right-content {
    margin-top: 15px;

    p {
      span:nth-child(1) {
        margin-right: 10px;
      }
    }

    p:nth-child(1) {
      width: 480px;
      height: 40px;
      font-size: 16px;
      font-weight: 900;
    }

    p:nth-child(2) {
      font-size: 14px;
      margin-top: 22px;

      span:nth-child(2) {
        color: @home-logo;
        font-size: 20px;
        font-weight: 900;
        margin-right: 5px;
      }

      span:nth-child(3) {
        color: @code-blue;
        font-size: 14px;
      }
    }

    p:nth-child(3) {
      font-size: 14px;
      margin-top: 22px;
      span:nth-child(3) {
        position: relative;
        cursor: pointer;
        img {
          width: 16px;
          height: 16px;
          margin-left: 10px;
          position: relative;
          top: 2px;
        }

        span {
          position: absolute;
          top: 16px;
          left: -5px;
          width: 60px;
          font-size: 12px;
          color: @order-six;
          display: none;
        }
      }

      span:nth-child(3):hover span {
        display: block;
      }
    }

    p:nth-child(4) {
      font-size: 14px;
      margin-top: 22px;

      span:nth-child(2) {
        margin-right: 8px;
        color: @details-p;
        font-size: 14px;
      }

      span:nth-child(3) {
        color: @details-p;
        font-size: 14px;
      }

      span:nth-child(4) {
        font-size: 14px;
        color: @home-p;
        margin: 0 8px;
      }

      span:nth-child(5) {
        font-size: 14px;
        color: @code-blue;
      }

      span:nth-child(6) {
        img {
          width: 20px;
          height: 20px;
          position: relative;
          top: 5px;
        }

        margin-left: 10px;
        position: relative;
      }

      span:nth-child(6):hover span {
        display: block;
      }
    }

    p:nth-child(5) {
      font-size: 14px;
      margin-top: 22px;

      span:nth-child(3) {
        img {
          width: 20px;
          height: 20px;
          position: relative;
          top: 5px;
        }

        margin-left: 5px;
        color: @details-aging;
        position: relative;
      }
    }

    p:nth-of-type(6) {
      font-size: 14px;
      margin-top: 22px;

      span {
        margin: 0 5px 0 0;
      }

      button {
        cursor: pointer;
        width: 25px;
        height: 21px;
        border: 1px solid @ccc;
        background: @fff;
        outline: none;
      }

      input {
        width: 23px;
        outline: none;
        padding-left: 12px;
      }
    }

    p:nth-of-type(7) {
      font-size: 14px;
      margin-top: 45px;

      button {
        cursor: pointer;
        width: 136px;
        height: 40px;
        background: @home-logo;
        border-radius: 5px;
        border: none;
        margin-right: 10px;
        color: @fff;
        outline: none;
      }
    }

    ul {
      margin-top: 51px;

      li {
        margin: 30px 0;
        display: flex;

        h1 {
          min-width: 70px;
          position: relative;
          top: 15px;
          font-size: 14px;
        }

        .details-right-style {
          width: 600px;

          span {
            cursor: pointer;
            font-size: 14px;
            padding: 5px;
            margin: 5px;
            border: 1px solid @ccc;
            line-height: 20px;
            text-align: center;
            display: inline-block;
          }
        }
      }
    }
  }
}
</style>
