import http from '@/unilts/http'
export default {
    namespaced: true,
    state: {
        topUpList: [], //充值
    },
    mutations: {
        SETTOPUPLIST(state, list) { state.addressList = list }, //充值
    },
    actions: {
        getTopUpList({commit}, payLoad) {
            http.post('/api/BuyChina/SubmitRecharge?', {
                CountryCode:　payLoad.CountryCode,
                UserCode: payLoad.UserCode,
                TotalAmt: payLoad.TotalAmt,
                TransferDate: payLoad.TransferDate,
                TransferName: payLoad.TransferName,
                TransferBankAccount: payLoad.TransferBankAccount,
                TransferBankBank: payLoad.TransferBankBank,
                TransferSN: payLoad.TransferSN
            }).then(res => {
               // console.log(res);
            })
        }
    }
}