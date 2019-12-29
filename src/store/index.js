// 提供  操作本地用户信息的 工具函数
// 设置用户信息
// 获取用户信息
// 删除用户信息
// 示例代码  sessionStorage.setItem('数据名称','具体函数')
const KEY = 'hm-toutiao6-user'
export default {
  setUser (user) {
    window.sessionStorage.setItem(KEY, JSON.stringify(user))
  },
  getUser () {
    return JSON.parse(window.sessionStorage.getItem(KEY) || '{}')
  },
  delUser () {
    window.sessionStorage.removeItem(KEY)
  }
}
