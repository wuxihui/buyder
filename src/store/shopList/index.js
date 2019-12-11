import http from '@/unilts/http'
import { CountryCode } from "@/entry/index";
import { format } from '@/algo/index'
import {
  accAdd,
  accMul
} from '@/algo/index';
export default {
  namespaced: true,
  state: {
    IsDelay: false,
    spanArr: [],//合并行集合
    addressList: [], //获取收货地址，
    carLists: [], //代购车列表
    goodsTotal: 0, //商品总金额
    codeLists: 0, //代买手续费金额
    moneyTotals: 0, //商品总金额
    chinaMoneys: 0, //中国运费总金额
  },
  mutations: {
    SETADDRESSLIST(state, list) {
      state.addressList = list
    }, //获取收货地址
    SETCARLISTS(state, carList) {
      state.carLists = carList
    }, //代购车列表
    SETGOODSTOTAL(state, goods) {
      state.goodsTotal = goods
    }, //商品总金额
    SETCODELISTS(state, codes) {
      state.codeLists = codes
    }, //代买手续费金额
    SETMONEYTOTALS(state, moneys) {
      state.moneyTotals = moneys
    }, //商品总价格
    SETCHINAYUNFEI(state, chinas) {
      state.chinaMoneys = chinas
    }, //中国运费总金额
    SETISDELAY(state, IsDelay) {
      state.IsDelay = IsDelay
    },
    SETSPANARR(state, spanArr) {
      state.spanArr = spanArr
    },
  },
  actions: {
    //获取收货地址
    getAddressList({
      commit
    }, payLoad) {
      http
        .get("/api/BuyChina/MyAddress?", {
          params: {
            UserCode: payLoad.UserCode,
            SearchText: payLoad.SearchText,
            PageIndex: payLoad.PageIndex,
            PageSize: payLoad.PageSize
          }
        })
        .then(res => {
          // if (res) {
          let resNew = res.Data.AddressList
          commit('SETADDRESSLIST', resNew)
          // }
        });
    },

    //立即购买
    getLijiBuy({
      commit
    }, resNew) {
      console.log(resNew);
      let resShops = 0; //商品总价
      let resData = 0; //商品总价
      let resGoods = 0; //商品总价
      let resCodes = 0; //代买手续费总金额
      let resMoneyTotal = 0; //合计总金额
      let resChinaYun = 0; //中国运费总金额
      let TotalAmount = 0; //合计总金额
      for (let i = 0; i < resNew.length; i++) {
        resNew[i].rowAddServicesCode = [];
        resNew[i].rowAddServicePrice = 0;
        //原来购买的数量先保存
        resNew[i].originQTY = resNew[i].QTY
        //中国运费
        //resNew[i].ChinaFreight = resNew[i].ChinaFreight
        //代买手续费
        //resNew[i].BuyFee = accMul(resNew[i].BuyFee, 1).toFixed(2)
        //商品总金额
        resGoods = accMul(resNew[i].QTY, resNew[i].GoodsPrice)
        resShops = accAdd(resGoods, resShops).toFixed(2)
        resData = resShops

        //中国运费总金额
        resChinaYun = accAdd(resNew[i].ChinaFreight, resChinaYun).toFixed(2)
        //合计总金额
        resMoneyTotal = accAdd(resCodes, resData).toFixed(2)
        TotalAmount = accAdd(resChinaYun, resMoneyTotal).toFixed(2)
      }


      http.get("/api/BuyChina/GetBuyFee?", {
        params: {
          CountryCode: CountryCode
        }
      }).then(res => {
        if (res.Status == 200) {
          let result = res.Data;
          let arrResult = result.split(',');
          resCodes = arrResult[1];
          TotalAmount = accAdd(TotalAmount, resCodes).toFixed(2)
          commit("SETCARLISTS", resNew) //代购车列表
          commit("SETGOODSTOTAL", resShops) //商品总金额
          commit("SETCODELISTS", resCodes) //代买手续费总金额
          commit("SETMONEYTOTALS", TotalAmount) //合计
          commit("SETCHINAYUNFEI", resChinaYun) //中国运费总金额
        }
      })
    },

    //代购车列表
    getGoodsList({
      commit
    }, payLoad) {
      let resCodes = 0; //代买手续费总金额
      http.get("/api/BuyChina/GetBuyFee?", {
        params: {
          CountryCode: CountryCode
        }
      }).then(res => {
        if (res.Status == 200) {
          let result = res.Data;
          let arrResult = result.split(',');
          resCodes = arrResult[1];
        }
      })

      http.get("/api/BuyChina/MyPurchaseCar?", {
        params: {
          UserCode: payLoad.UserCode,
          CarGoodsUid: payLoad.CarGoodsUid
        }
      }).then(res => {
        let resNew = res.Data.CarGoodsList; //购物车列表
        let newSpanArr = [];
        let pos = 0;
        for (var i = 0; i < resNew.length; i++) {
          if (i === 0) {
            newSpanArr.push(1);
            pos = 0
          } else {
            // 判断当前元素与上一个元素是否相同
            if (resNew[i].GoodsURL === resNew[i - 1].GoodsURL) {
              newSpanArr[pos] += 1;
              newSpanArr.push(0);
            } else {
              newSpanArr.push(1);
              pos = i;
            }
          }
        }

        commit("SETISDELAY", true)
        commit("SETSPANARR", newSpanArr)

        let resShops = 0; //商品总价
        let resData = 0; //商品总价
        let resGoods = 0; //商品总价

        let resMoneyTotal = 0; //合计总金额
        let resChinaYun = 0; //中国运费总金额
        let CalculationAmount = 0; //合计总金额

        for (let i = 0; i < resNew.length; i++) {
          resNew[i].rowAddServicesCode = [];
          resNew[i].rowAddServicePrice = 0;
          //原来购买的数量先保存
          resNew[i].originQTY = resNew[i].QTY
          //中国运费
          resNew[i].ChinaFreight = resNew[i].ChinaFreight.toFixed(2)

          //商品总金额
          resGoods = accMul(resNew[i].QTY, resNew[i].GoodsPrice)
          resShops = accAdd(resShops, accMul(resNew[i].QTY, resNew[i].GoodsPrice)).toFixed(2)
  
          if (i > 0) {
            if (resNew[i].GoodsURL != resNew[i-1].GoodsURL) {
              resChinaYun = accAdd(resNew[i].ChinaFreight, resChinaYun).toFixed(2);
            }
          }else{
            resChinaYun = accAdd(resNew[i].ChinaFreight, resChinaYun).toFixed(2);
          }
          
        }
        CalculationAmount = accAdd(resChinaYun, resShops).toFixed(2);
        CalculationAmount = accAdd(CalculationAmount, resCodes).toFixed(2)

        commit("SETCARLISTS", resNew) //代购车列表
        commit("SETGOODSTOTAL", resShops) //商品总金额
        commit("SETCODELISTS", resCodes) //代买手续费总金额
        commit("SETMONEYTOTALS", CalculationAmount) //合计
        commit("SETCHINAYUNFEI", resChinaYun) //中国运费总金额
      })
    },

  }
}