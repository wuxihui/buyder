import http from '@/unilts/http'

export default {
  namespaced: true,
  state: {
    noticeList: [], //
    FirstContent: "",
  },
  mutations: {
    SETNoticeList(state, list) {
      state.noticeList = list
    }, //
    SETFirstContent(state, Content) {
      state.FirstContent = Content
    }, //
  },
  actions: {
    GetNoticeList({
      commit
    }, payLoad) {
      http.get("/api/BuyChina/GetNoticeList?", {
        params: {
          CountryCode: payLoad.CountryCode
        }
      }).then(res => {
        if (res.Data) {
          let noticeList = res.Data;
          commit('SETNoticeList', noticeList);
          let Content = "";
          if (noticeList != null && noticeList.length > 0) {
            Content = noticeList[0]._Content;
          }
          commit('SETFirstContent', Content);
        } else {
          this.$message({
            message: res.Msg,
            type: "warning"
          });
        }
      })
    },

  },
  getters: {

  }

}