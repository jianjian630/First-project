// 导入
import VueRouter from 'vue-router'
import Vue from 'vue'
import Login from '@/views/login'

// 使用
Vue.use(VueRouter)
// 实例化
const router = new VueRouter({
  routes: [
    // 路由规则
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login }
  ]
})
// 导出实例
export default router
