import Vue from "vue"
import ElementUI from 'element-ui'
import i18n from './i18n/i18n'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from "./App.vue"
//解决同一路由跳转
import router from "./router/index"
import Router from 'vue-router'
import store from "./store/index"
import './styles/base.less'
import $ from 'jquery'
import api from './api/index'
import layer from 'vue-layer'
import 'vue-layer/lib/vue-layer.css'

Vue.prototype.$layer = layer(Vue);
//解决同一路由跳转
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.prototype.$ = $
Vue.prototype.$api = api
Vue.config.productionTip = false;

Vue.use(ElementUI)
Vue.use(i18n)
Vue.use(Element, { size: 'small', zIndex: 3000 });

new Vue({
  router,
  store,
   i18n,
  render: h => h(App)
}).$mount("#app");
