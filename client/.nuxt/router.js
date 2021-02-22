import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _3295e6cc = () => interopDefault(import('../pages/login/index.vue' /* webpackChunkName: "pages/login/index" */))
const _025a7649 = () => interopDefault(import('../pages/admin/login.vue' /* webpackChunkName: "pages/admin/login" */))
const _1ca94886 = () => interopDefault(import('../pages/faculty/home/index.vue' /* webpackChunkName: "pages/faculty/home/index" */))
const _5cdf95c4 = () => interopDefault(import('../pages/faculty/login.vue' /* webpackChunkName: "pages/faculty/login" */))
const _a9e229f4 = () => interopDefault(import('../pages/student/home/index.vue' /* webpackChunkName: "pages/student/home/index" */))
const _5d807c35 = () => interopDefault(import('../pages/student/login.vue' /* webpackChunkName: "pages/student/login" */))
const _98412fa4 = () => interopDefault(import('../pages/admin/home/list.vue' /* webpackChunkName: "pages/admin/home/list" */))
const _40c38a2d = () => interopDefault(import('../pages/admin/home/result.vue' /* webpackChunkName: "pages/admin/home/result" */))
const _157273e0 = () => interopDefault(import('../pages/admin/home/schedule/scheduleDetail.vue' /* webpackChunkName: "pages/admin/home/schedule/scheduleDetail" */))
const _7ff0ac58 = () => interopDefault(import('../pages/admin/home/schedule/schedules.vue' /* webpackChunkName: "pages/admin/home/schedule/schedules" */))
const _7e9de7f2 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/login",
    component: _3295e6cc,
    name: "login"
  }, {
    path: "/admin/login",
    component: _025a7649,
    name: "admin-login"
  }, {
    path: "/faculty/home",
    component: _1ca94886,
    name: "faculty-home"
  }, {
    path: "/faculty/login",
    component: _5cdf95c4,
    name: "faculty-login"
  }, {
    path: "/student/home",
    component: _a9e229f4,
    name: "student-home"
  }, {
    path: "/student/login",
    component: _5d807c35,
    name: "student-login"
  }, {
    path: "/admin/home/list",
    component: _98412fa4,
    name: "admin-home-list"
  }, {
    path: "/admin/home/result",
    component: _40c38a2d,
    name: "admin-home-result"
  }, {
    path: "/admin/home/schedule/scheduleDetail",
    component: _157273e0,
    name: "admin-home-schedule-scheduleDetail"
  }, {
    path: "/admin/home/schedule/schedules",
    component: _7ff0ac58,
    name: "admin-home-schedule-schedules"
  }, {
    path: "/",
    component: _7e9de7f2,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
