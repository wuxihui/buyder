import http from '@/unilts/http'
export default {
    namespaced: true,
    state: {
        passwordList: []
    },
    mutations: {
        SETPASSWORDLIST(state, list) {
            state.passwordList = list
        }
    },
    actions: {
        getPasswordList({
            commit
        }, payLoad) {
            http.post('/api/BuyChina/EditPassword?', {
                UserCode: payLoad.UserCode,
                OldPassword: payLoad.OldPassword,
                NewPassword: payLoad.NewPassword,
                NewSPassword: payLoad.NewSPassword,
                CountryCode: payLoad.CountryCode
            }).then(res => {
                if (res.Data) {
                    commit("SETPASSWORDLIST", res)
                } else {
                    this.$message({
                        message: res.Msg,
                        type: "warning"
                      });
                }
            })
        }
    }
}