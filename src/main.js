import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// router 文件夹 ，默认会加载文件下的index.js
// index  的含义是索引文件

// @ 是 vue-cli 提供的一个绝对路径的别名
import router from '@/router'
import MyBread from '@/components/my-bread'

// 使用自己的插件
import plugin from '@/plugin'
// import axios from 'axios'
import axios from '@/api'
Vue.use(plugin)
Vue.component('my-bread', MyBread)
Vue.prototype.$http = axios

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
