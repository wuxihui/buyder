import Vue from "vue";
import Router from "vue-router";
import {
  getObtain
} from '@/unilts/auth';
Vue.use(Router);

const router = new Router({
  routes: [{
    path: "/",
    component: () => import("../views/Index/index.vue"),
    children: [{
        path: "/",
        redirect: "/home"
      },
      {
        path: 'regActive',
        name: 'regActive',
        component: () => import('../views/Index/RegActive.vue')
      },
      {
        path: 'home',
        name: 'home',
        component: () => import('../views/Index/home.vue')
      },
      {
        path: 'code',
        name: 'code',
        component: () => import('../views/Index/code.vue')
      },
      //暂时注释
      // {
      //   path: 'set',
      //   name: 'set',
      //   component: () => import('../views/Index/set.vue')
      // },
      {
        path: 'serve',
        name: 'serve',
        component: () => import('../views/Index/serve.vue')
      },
      {
        path: 'nav',
        name: 'nav',
        component: () => import('../views/Index/nav.vue')
      },
      {
        path: 'car',
        name: 'car',
        component: () => import('../views/Index/car.vue')
      },
      {
        path: 'outside',
        name: 'outside',
        component: () => import('../views/Index/outside.vue')
      },
      {
        path: 'shopList',
        name: 'shopList',
        component: () => import('../views/Index/shopList.vue')
      },
      {
        path: 'details',
        name: 'details',
        component: () => import('../views/Index/details.vue')
      },
      {
        path: 'personalCenter',
        name: 'personalCenter',
        component: () => import('../views/Index/personalCenter.vue')
      },
      {
        path: 'agree',
        name: 'agree',
        component: () => import('../views/Index/agree.vue')
      },
      {
        path: 'ResetPwd',
        name: 'ResetPwd',
        component: () => import('../views/Index/ResetPwd.vue')
      },
      {
        path: 'standby',
        name: 'standby',
        component: () => import('../views/Index/standby.vue')
      },
      {
        path: "notFound",
        name: "notFound",
        component: () => import('../views/Index/notFound.vue')
      },
      {
        path: "notice",
        name: "notice",
        component: () => import('../views/Index/notice.vue')
      },
      {
        path: '*',
        redirect: 'notFound'
      }
    ]
  }, ]
});


//全局路由守卫
router.beforeEach((to, from, next) => {
  let isToken = getObtain() //唯一标识
  let isFlag = true
  if (to.path === '/password' && !isToken) {
    next('home')
    isFlag = false
  }
  if (to.path === '/shopList' && !isToken) {
    next('home')
    isFlag = false
  }

  if (to.path === '/personalCenter' && !isToken) {
    next('home')
    isFlag = false
  }

  if (to.path === '/car' && !isToken) {
    next('home')
    isFlag = false
  }

  if (to.path === '/outside' && !isToken) {
    next('home')
    isFlag = false
  }

  if (isFlag) {
    next()
  }
})

export default router