// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'lib-flexible'
import axios from 'axios'
import VueLazyLoad from 'vue-lazyload'
import { HOST } from '../config/config.js';
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import './assets/style/style.css';
Vue.use(VueLazyLoad)
Vue.use(VueAwesomeSwiper)

axios.defaults.baseURL = HOST

Vue.prototype.$http = axios

Vue.prototype.globalData = {
  login: false
}

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
