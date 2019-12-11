import http from '@/unilts/http'

export default {
  namespaced: true,
  state: {
    myBoxList: [], //我的包裹
    IsOrShow: false, //弹框
    BoxLogistics: [],
    balanceMoney: 0, //余额
    DataCount: 0, //总条数
    isOrtherISOk: false, //充值页面显示与隐藏
    isIndex: 1, //个人中心页面
    isColor: 0, //充值个人中心左边的颜色
    isBackColor: 0,//控制左边个人中心的背景颜色
    isOrtherOk: true, //控制财务信息的显示与隐藏
    controll: [false, true, true, true, true], //控制左边个人中心的图标
  },
  mutations: {
    SETMYBOXLIST(state, list) {
      state.myBoxList = list
    }, //我的包裹
    SETBoxLogistics(state, list) {
      state.BoxLogistics = list
    }, //我的包裹
    ShowLogisticsTrack(state, bounces) {
      state.IsOrShow = bounces
    }, //弹框
    SETBALANCCEMONEY(state, moneys) {
      state.balanceMoney = moneys
    }, //余额
    SETDATACURRENT(state, total) {
      state.DataCount = total
    }, //总条数
    SETISORTHERISOK(state, isOk) {
      state.isOrtherISOk = isOk
    }, //充值页面显示与隐藏
    SETISINDEX(state, index) {
      state.isIndex = index
    }, //个人中心页面
    SETISCOLOR(state, color) {
      state.isColor = color
    }, //充值个人中心左边的颜色
    SETCONTROLL(state, croll) {
      state.controll = croll
    }, //控制左边个人中心的图标
    SETISBACKCOLOR(state, backs) {
      state.isBackColor = backs
    }, //控制左边个人中心的背景颜色
    SETISORTHEROK(state, other) {
      state.isOrtherOk = other
    }, //控制财务信息的显示与隐藏
  },
  actions: {
    getMyBoxList({
      commit
    }, payLoad) {
      http.get("/api/BuyChina/MyBox?", {
        params: {
          UserCode: payLoad.UserCode,
          Type: payLoad.Type,
          RelatedOrder: payLoad.RelatedOrder,
          BeginTime: payLoad.BeginTime,
          EndTime: payLoad.EndTime,
          PageIndex: payLoad.PageIndex,
          PageSize: payLoad.PageSize
        }
      }).then(res => {
          let resTotal = res.Data.DataCount
          let boxList = res.Data.BoxList
          commit('SETMYBOXLIST', boxList)
          commit("SETDATACURRENT", resTotal)
      })
    },
    getLogisticsTrack({
      commit
    }, payLoad) { //获取物流轨迹

      http.get("/api/BuyChina/GetLogistics?", {
        params: {
          BoxCode: payLoad.BoxCode,
          CountryCode: payLoad.CountryCode,
          DataType: "JSON"
        }
      }).then(res => {
        if (res.Data) {
          let BoxLogistics = res.Data
          commit('SETBoxLogistics', BoxLogistics)
        } else {
          this.$message({
            message: res.Msg,
            type: "warning"
          });
        }
      })
    },

    //获取余额
    getUserBalance({
      commit
    }, payLoad) {
      http.get('/api/BuyChina/GetUserBalance?', {
        params: {
          UserCode: payLoad.UserCode
        }
      }).then(res => {
        // if (res.Data) {
          let resNew = res.Data
          commit("SETBALANCCEMONEY", resNew)
        // } else {
        //   this.$message({
        //     message: res.Msg,
        //     type: "warning"
        //   });
        // }
      })
    },

  },
  getters: {

  }

}