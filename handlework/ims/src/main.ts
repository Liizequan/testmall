import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "./plugins/element";
import regExp from './regExp'
import "babel-polyfill"
Vue.prototype.$re = regExp
// 引入树形
//import qs from 'qs';
//import axios from 'axios';
// import axios from 'axios'//axios数据请求

import http from './http';
Vue.config.productionTip = false;
// Vue.prototype.$axios = axios//全局使用axios

import apiUrl from './api'
Vue.prototype.apiUrl = apiUrl.apiUrl;
//Vue.prototype.$axios = axios
//Vue.prototype.$qs = qs

import 'tui-calendar/dist/tui-calendar.min.css'
Vue.prototype.back = () => router.go(-1);//返回上一步
// //设置请求头
// axios.defaults.headers.post["Content-type"] = "application/json"
// axios.defaults.headers.post["Access-Control-Allow-Headers"] = "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild";
Vue.prototype.$baseURL = http.baseURL
Vue.prototype.$http = http
Vue.prototype.$bus = new Vue()
// setInterval(function(){
//   const token = localStorage.getItem("token");
//   Vue.prototype.$token = token
// },1000)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
