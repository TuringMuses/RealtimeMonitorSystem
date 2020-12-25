import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入全局css
import './assets/css/global.less'
import axios from 'axios'
import SocketService from '@/utils/socket_service'
// 对服务端进行websocket的连接
SocketService.Instance.connect()
// 其他组件通过this.$socket来使用
Vue.prototype.$socket = SocketService.Instance

// 请求基准路径配置i
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/'
// 将axios挂载到Vue的原型对象中
Vue.prototype.$http = axios

// 将全局的echarts对象挂载到Vue的原型对象上
// 在别的组件中通过this.$echarts来引用
Vue.prototype.$echarts = window.echarts

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
