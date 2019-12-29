// 提供配置好的axios , 然后导出，在main.js中使用
import axios from 'axios'
import store from '@/store'
import router from '@/router'

axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
axios.defaults.headers.Authorization = `Bearer ${store.getUser().token}`
export default axios

// 请求拦截器  【第三天讲的】
axios.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${store.getUser().token}`
  return config
}, err => Promise.reject(err))

// 响应拦截器
axios.interceptors.response.use(res => res, err => {
  if (err.reponse.status === 401) {
    router.push('/login')
  }
  return Promise.reject(err)
})
