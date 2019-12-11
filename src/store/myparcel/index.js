import http from '@/unilts/http'
export default {
    namespaced: true,
    state: {
        myParceList: [], //我的包裹
    },
    mutations: {
        SETMYPARCELIST(state, list) {
            state.myParceList = list
        }, //我的包裹
    },
    actions: {
        getMyParcel({
            commit
        }) {
            http.get('/api/BuyChina/MyBox?').then(res => {
                
                    commit("SETMYPARCELIST", res)
                

            })
        }
    }
}