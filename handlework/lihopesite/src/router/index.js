import Vue from 'vue'
import Router from 'vue-router'
import axios from "axios";
import Ensure from '@/components/Ensure'
import Footer from '@/components/Footer'
import index from '@/lihao/index'
import affairs from '@/lihao/affairs'
import business from '@/lihao/business'
import finance from '@/lihao/finance'
import government from '@/lihao/government'
import market from '@/lihao/market'
import login from '@/lihao/login'

Vue.use(Router,axios)

export default new Router({
  routes: [
    // 主页
    {
      path:'/',
      redirect:'index',
    },
    {
      path:'/index',
      name:'index',
      component:index,
      meta:{
        // 页面标题title
        title: '首页'
      }
    },
    {
      path:'/affairs',
      name:'affairs',
      component:affairs,
      meta: {
        title: '商务办公'
      }
    },
    {
      path:'/business',
      name:'business',
      component:business,
      meta: {
        title: '工商代理'
      }
    },
    {
      path:'/finance',
      name:'finance',
      component:finance,
      meta: {
        title: '财税服务'
      }
    },
    {
      path:'/government',
      name:'government',
      component:government,
      meta: {
        title: '政府补贴'
      }
    },
    {
      path:'/market',
      name:'market',
      component:market,
      meta: {
        title: '上市辅导'
      }
    },
    {
      path:'/login',
      name:'login',
      component:login,
      meta: {
        title: '金融服务登录'
      }
    },
    // 子组件
    {
      path:'/footer',
      name:'Footer',
      component:Footer,
    },
    {
      path:'/ensure',
      name:'Ensure',
      component:Ensure,
    },
  ]
})
