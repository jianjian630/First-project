// 导入
import VueRouter from 'vue-router'
import Vue from 'vue'

import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import Article from '@/views/article'
import NotFound from '@/views/404'
import store from '@/store'

// 使用
Vue.use(VueRouter)
// 实例化
const router = new VueRouter({
  routes: [
    // 路由规则
    // 登录
    { path: '/login', component: Login },
    // 首页
    // { path: '/', redirect: 'home' },
    {
      path: '/',
      component: Home,
      children: [
        { path: '/', component: Welcome },
        { path: '/article', component: Article }
      ]
    },
    { path: '*', component: NotFound }
  ]
})

// 前置导航守卫
router.beforeEach((to, form, next) => {
  if (to.path !== '/login' && !store.getUser().token) return next('/login')
  next()
})
// 导出实例
export default router
