// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css'
import echarts from 'echarts'
import Http from './api/index.js';
import Api from './api/api.js';
import Reg from './assets/js/Reg.js'
import Print from 'vue-print-nb'
import htmlToPdf from './assets/js/htmlToPdf.js'

Vue.prototype.$http = Http;
Vue.prototype.$api = Api;
Vue.prototype.$reg = Reg;
Vue.prototype.back = () => router.go(-1);
Vue.prototype.$echarts = echarts;


Vue.use(ElementUI);
Vue.use(htmlToPdf);
Vue.use(Print);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
