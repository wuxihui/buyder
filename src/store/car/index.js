import http from '@/unilts/http'
export default {
    namespaced: true,
    state: {
        rate: "", //汇率
        nameEmils: "", //用户名
    },
    mutations: {
        SETCARLIST(state, list) {
            state.rate = list
        },
        SETNAMEMILS(state, emils) {
            state.nameEmils = emils
        }, //用户名
    },
    actions: {
        getRate({
            commit
        }) {
            http.get('/api/BuyChina/GetRate?').then(res => {
                let resNew = res.Data
                commit("SETCARLIST", resNew)
            })
        }
    },
    getters: {

    }
}