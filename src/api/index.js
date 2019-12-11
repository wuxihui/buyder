import http from '@/unilts/http'
import {
  stringify
} from 'querystring'

const Api = {

  //获取banner图
  getBanner(params) {
    return http.get('/api/BuyChina/GetBanner?' + stringify(params))
  },

 //获取汇率
  getRates(params) {
    return http.get('/api/BuyChina/GetRate?' + stringify(params))
  },

  //删除收货地址
  getDeleteAddress(params) {
    return http.get('/api/BuyChina/BatchDeleteAddress?' + stringify(params))
  },

  //获取仓库信息
  getWareHouseInfo(params) {
    return http.get('/api/BuyChina/GetCenterInfo?' + stringify(params))
  },

  //获取增值服务
  getAddedServices(params) {
    return http.get('/api/BuyChina/GetAddServices?' + stringify(params))
  },

  //获取所有渠道
  getAllChannel(params) {
    return http.get('/api/BuyChina/GetLineInfo?' + stringify(params))
  },

  //选中未选中
  getSelectShop(params) {
    return http.get("/api/BuyChina/CheckCarGoods?" + stringify(params))
  },

  //增加或减少购物车数量
  getAddShopOrDeleteShop(params) {
    return http.get("/api/BuyChina/AddOrSubtractQty?" + stringify(params))
  },

  //采购单列表
  getPurchaseOrderList(params) {
    return http.get("/api/BuyChina/MyPurchaseOrder?" + stringify(params))
  },

  //获取用户余额
  // getBalanceUser(params) {
  //   return http.get('/api/BuyChina/GetUserBalance?' + stringify(params))
  // },

  // 获取财务明细列表
  getMyFinancialDetails(params) {
    return http.get('/api/BuyChina/MyFinancialDetails?' + stringify(params))
  },

  // 充值
  submitRecharge(params) {
    return http.post('/api/BuyChina/SubmitRecharge?', params)
  },

  // 登录
  login(params) {
    return http.post('/api/BuyChina/Login?', params)
  },

  //注册
  resGeRd(params) {
    return http.post('/api/BuyChina/Register?', params)
  },

  //删除产品
  deleteShops(params) {
    return http.post('/api/BuyChina/DelCarGoods?', params)
  },

  //编辑收货地址
  editorAddress(params) {
    return http.post('/api/BuyChina/EditAddress?', params)
  },

  //新增收货地址
  newAddress(params) {
    return http.post('/api/BuyChina/AddAddress?', params)
  },

  //设为默认地址
  defaultAddress(params) {
    return http.get('/api/BuyChina/CheckAddress?' + stringify(params))
  },

  //添加购物车
  addCar(params) {
    return http.post('/api/BuyChina/AddPurchaseCar?', params)
  },

  //忘记密码
  forgetPassword(params) {
    return http.get('/api/BuyChina/ResetPwdSendEmail?' + stringify(params))
  },

  //重置密码
  resetPassword(params) {
    return http.post('api/BuyChina/ResetPwd?', params)
  },

  //修改密码
  changePassword(params) {
    return http.post('/api/BuyChina/EditPassword?', params)
  },

  //修改个人资料
  changeData(params) {
    return http.post('/api/BuyChina/EditPersonalInfo?', params)
  },

  //获取汇率
  getRate(params) {
    return http.get('/api/BuyChina/GetRate?' + stringify(params))
  },

  //shopList提交订单
  SubmitOrders(params) {
    return http.post('/api/BuyChina/SubmitPurchaseOrder?', params)
  },

  //注册激活
  regActions(params) {
    return http.get('/api/BuyChina/RegActive?' + stringify(params))
  },

  //支付订单
  paymentOrder(params) {
    return http.post('/api/BuyChina/SubmitPurchasePayOrder?', params)
  },

  //采购单列表
  purchaseList(params) {
    return http.get('/api/BuyChina/MyPurchaseOrder?' + stringify(params))
  },

  //请选择省, 三级联动
  lveLinkage(params) {
    return http.get('/api/BuyChina/GetAreaInfo?' + stringify(params))
  },

  //取消采购单
  CancelPurchaseOrder(params) {
    return http.post('/api/BuyChina/CancelPurchaseOrder?', params)
  },
  //提交运费支付订单
  SubmitFreightPayOrder(params) {
    return http.post('/api/BuyChina/SubmitFreightPayOrder?', params)
  },

  //重新发送注册激活邮件
  reacTivation(params) {
    return http.get('/api/BuyChina/ReSendRegEmail?' + stringify(params))
  },
   //代买手续费总金额
  GetBuyFee(params) {
    return http.get('/api/BuyChina/GetBuyFee?' + stringify(params))
  },
  
  //购物车
  getMyPurchaseCar(params) {
    return http.get("/api/BuyChina/MyPurchaseCar?" + stringify(params))
  },
  
}

export default Api