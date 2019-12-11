const TokenKey = "Admin-Token"
const TaBer = "Admin-TaBer"
const Shops = "Shops-Token"
const Address = "Address-Token"
import Cookies from 'js-cookie'
let millIseCode = new Date().getTime();
let exprsTime = new Date(millIseCode + 30*24*60*60*1000)
//登录信息存储
// export function setAccess(token) {
//   return localStorage.setItem(TokenKey, token)
// }

// //登录信息删除
// export function deleteRemove() {
//   return localStorage.removeItem(TokenKey)
// }

// //登录信息获取
// export function getObtain() {
//   return localStorage.getItem(TokenKey)
// }

 //设置cookie
export function setAccess(token) {
  return Cookies.set(TokenKey, token, {
    expires: exprsTime
  })
}

//获取cookie
export function getObtain() {
  return Cookies.get(TokenKey) || ''
}

//删除cookie
export function deleteRemove() { 
  return Cookies.remove(TokenKey)
}



//汇率存储
export function setItems(token) {
  return sessionStorage.setItem(TaBer, token)
}

//汇率获取
export function getItems() {
  return sessionStorage.getItem(TaBer)
}

//商品信息获取
export function getImgShops() {
  return localStorage.getItem(Shops)
}

//商品信息存储
export function setImgShops(token) {
  return localStorage.setItem(Shops, token)
}

//收货地址存储
export function setAddress(token) {
  return localStorage.setItem(Address, token)
}

//收货地址删除
export function deleteAddress() {
  return localStorage.removeItem(Address)
}

//收货地址获取
export function getAddress() {
  return localStorage.getItem(Address)
}


