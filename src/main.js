// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import { router } from './router.js'
import App from './App'
import Axios from 'axios'

FastClick.attach(document.body)

Vue.config.productionTip = false;

Axios.defaults.timeout = 5000;
Axios.defaults.headers.common['Auth-Token'] = window.android.getToken();
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
Axios.defaults.baseURL = 'http://192.168.0.149:8080/video/service/r';
Vue.prototype.baseURL = 'http://192.168.0.149:8080/video/service/r';
Vue.prototype.uploadServerURL = 'http://192.168.0.149:8088';
Vue.prototype.playServerURL = 'http://192.168.0.149';
Vue.prototype.$axios = Axios;

Vue.prototype.android = window.android;

// 时间戳转日期+时间格式
Vue.prototype.getTime = function (timestamp) {
  var date = new Date(timestamp);
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var D = date.getDate() + ' ';
  var h = date.getHours() + ':';
  var m = date.getMinutes() + ':';
  var s = date.getSeconds();
  return Y + M + D + h + m + s;
}

// 时间戳转日期格式
Vue.prototype.getDate = function (timestamp) {
  var date = new Date(timestamp);
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var D = date.getDate() + ' ';
  return Y + M + D;
}

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
