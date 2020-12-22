// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios' //引入axios
/*引入资源请求插件*/
import VueResource from 'vue-resource'
/*使用VueResource插件*/
Vue.use(VueResource)
// import $ from 'jquery'
// 引入index.css
import '../static/index.css' /*引入公共样式*/

//全局使用axios
Vue.prototype.$axios = axios
//设置token
axios.defaults.headers.common['token'] = "f4c902c9ae5a2a9d8f84868ad064e706"
//设置请求头
axios.defaults.headers.post["Content-type"] = "application/json"
// axios.defaults.headers.post["Access-Control-Allow-Headers"] = "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild";





// 路由跳转时跳到顶部 
router.afterEach((to,from,next) => {
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = document.body.scrollTop = 0;
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
