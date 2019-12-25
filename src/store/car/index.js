import http from '@/unilts/http'
export default {
    namespaced: true,
    state: {
        rate: "", //汇率
        nameEmils: "", //用户名
        isIndex: 0,
        iscCourseIndex: 1,
        isColorProblem: 0,
        isColor: 1,
        isLink: true,
        dialogVisible: false, //计算运费弹框
        freight: "", //运费
    },
    mutations: {
        SETCARLIST(state, list) {
            state.rate = list
        },
        SETNAMEMILS(state, emils) {
            state.nameEmils = emils
        }, //用户名
        SETISINDEX(state, indexs) {
            state.isIndex = indexs
        },
        SETISCCOURSEINDEX(state, colors) {
            state.iscCourseIndex = colors
        },
        SETISCOLORPROBLEM(state, problem) {
            state.isColorProblem = problem
        },
        SETISCOLOR(state, cors) {
            state.isColor = cors
        },
        SETISLINK(state, link) {
            state.isLink = link
        },
        SETDIALOGVISIBLE(state, dialog) {
            state.dialogVisible = dialog
        },
        SETFREIGHT(state, freights) {
            state.freight = freights
        }
    },
    actions: {
        getRate({
            commit
        }) {
            http.get('/api/BuyChina/GetRate?').then(res => {
                let resNew = res.Data
                commit("SETCARLIST", resNew)
            })
        },
        //计算运费
        getFreight({ commit }, payLoad) {
            http.get("/api/BuyChina/CalFreight?", {
                params: {
                    LineCode: payLoad.LineCode,
                    IsZT: payLoad.IsZT,
                    CenterCode: payLoad.CenterCode,
                    Weight: payLoad.Weight,
                    Prov: payLoad.Prov
                }
            }).then(res => {
                let resNew = res.Data;
                commit("SETFREIGHT", resNew)
            })
        }
    },
    getters: {

    }
}