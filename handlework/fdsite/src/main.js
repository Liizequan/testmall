// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui';//使用element ui
import router from './router'//路由请求
import axios from 'axios'//axios数据请求
import moment from 'moment'//引入时间编译
import VueResource  from 'vue-resource'//跨域请求
import VueAMap from 'vue-amap';//使用地图插件
import VueQuillEditor from 'vue-quill-editor';//引入富文本  npm install vue-quill-editor --save  //官网https://bingkui.gitbooks.io/quill/content/
import 'element-ui/lib/theme-chalk/index.css';//引入element/css
import animate from 'animate.css'//引入animate.css动画


Vue.use(ElementUI);
// Vue.use(axios);
Vue.use(VueResource)
Vue.use(VueAMap);
Vue.use(VueQuillEditor)
Vue.use(animate);

//全局使用axios
Vue.prototype.$axios = axios
// 引入时间编译
Vue.prototype.$moment = moment

// 设置全局域名
import fudian from './api.js';
global.fudian = fudian;

//设置token
// axios.defaults.headers.common['token'] = "f4c902c9ae5a2a9d8f84868ad064e706"
// //设置请求头
axios.defaults.headers.post["Content-type"] = "application/json"
axios.defaults.headers.post["Access-Control-Allow-Headers"] = "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild";

// 设置路由跳转返回顶部
router.afterEach((to,from,next) => {
  window.scrollTo(0,0);
})

// Vue.http.options.emulateJSON = false;

VueAMap.initAMapApiLoader({
  key: 'c528a9d60e71d1b8bb95d4bd73b9fdf9',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
});

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router, 
  components: { App },
  template: '<App/>'
})
