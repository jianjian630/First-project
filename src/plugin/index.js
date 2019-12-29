// 基于 vue 扩展功能

// 封装 Vue 插件，必须定义一个js
import MyBread from '@/components/my-bread'
// 默认导出一个对象
export default {
  // 并且对象中必须有一个属性 install
  // install 必须指定一个函数，函数会有默认传参 Vue
  install: (Vue) => {
    //   在函数内基于 Vue 扩展函数的功能
    Vue.component(MyBread.name, MyBread)
  }
}
