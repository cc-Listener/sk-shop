// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'lib-flexible'
import axios from 'axios'
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad)
// Vue.use(VueLazyLoad,{
//     error:'./static/error.jpg',
//     loading:'./assets/images/timg.gif'
// })

axios.defaults.baseURL = '/api'

Vue.prototype.$http = axios

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
