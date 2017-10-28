import Vue from 'vue'
import App from './App'
import resize from './js/resize.js'
//import './css/share.css'
/* eslint-disable no-new */
//require('./css/share.css')
resize()
require('swiper/dist/css/swiper.css')
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
