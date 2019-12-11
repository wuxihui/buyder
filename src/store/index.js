import Vue from "vue";
import Vuex from "vuex";
import header from './header/index'
import car from './car/index'
import password from './password/index'
import shopList from './shopList/index'
import myParcel from './myparcel/index'
import topUpList from './topup/index'
import myBox from './myBox/index'
import notice from './notice/index'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    header,
    car,
    password,
    shopList,
    myParcel,
    topUpList,
    myBox,
    notice
  }
});
