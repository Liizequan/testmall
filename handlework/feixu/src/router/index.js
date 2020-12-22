import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views'
// import pageIndex from '@/components/da.vue'
import pageIndex from '@/views/page/index'
import userLogin from '@/views/user/login'
import addOrder from '@/views/order/addOrder'
import detailOrder from '@/views/order/detailOrder'
import allOrder from '@/views/order/allOrder'
import delOrder from '@/views/order/delOrder'


import paymentFinance from '@/views/finance/payment'
import detailPay from '@/views/finance/detailPay'
import receivaFinance from '@/views/finance/receiva'
import detailRec from '@/views/finance/detailRec'
import approvaFinance from '@/views/finance/approva'

import approvaMonthly from '@/views/monthly/approva'
import detailMon from '@/views/monthly/detailMon'
import approvaShouMonthly from '@/views/monthly/approvaShou'
import detailMonShou from '@/views/monthly/detailMonShou'


import deliverReceive from '@/views/deliver/receive'
import addCustom from '@/views/custom/addCustom'
import listCustom from '@/views/custom/listCustom'
import detailCustom from '@/views/custom/detailCustom'
import addCarrier from '@/views/carrier/addCarrier'
import listCarrier from '@/views/carrier/listCarrier'
import detailCarrier from '@/views/carrier/detailCarrier'
import dataAnalysis from '@/views/analysis/data'
import indexAdmin from '@/views/admin/index'
import roleAdmin from '@/views/admin/role'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: "/index",
      component: index,
      children:[
        // 首页
        {
          path: '/index',
          name: 'pageIndex',
          component: pageIndex
        },
        // 订单中心
        {
          path: '/add/order',
          name: 'addOrder',
          component: addOrder
        },
        {
          path: '/all/order',
          name: 'allOrder',
          component: allOrder
        },
        {
          path: '/del/order',
          name: 'delOrder',
          component: delOrder
        },
        {
          path: '/order/detail',
          name: 'detailOrder',
          component: detailOrder
        },
        // 财务中心
        {
          path: '/payment/finance',
          name: 'paymentFinance',
          component: paymentFinance
        },
        {
          path: '/payment/detail',
          name: 'detailPay',
          component: detailPay
        },
        {
          path: '/receiva/finance',
          name: 'receivaFinance',
          component: receivaFinance
        },
        {
          path: '/receiva/detail',
          name: 'detailRec',
          component: detailRec
        },
        {
          path: '/approva/finance',
          name: 'approvaFinance',
          component: approvaFinance
        },
        {
          path: '/approva/monthly',
          name: 'approvaMonthly',
          component: approvaMonthly
        },
        {
          path: '/approva/detailMon',
          name: 'detailMon',
          component: detailMon
        },
        {
          path: '/approvaShou/monthly',
          name: 'approvaShouMonthly',
          component: approvaShouMonthly
        },
        {
          path: '/approva/detailMonShou',
          name: 'detailMonShou',
          component: detailMonShou
        },
        // 客户中心
        {
          path:'/deliver/receive',
          name:'deliverReceive',
          component: deliverReceive
        },
        {
          path: '/add/custom',
          name: 'addCustom',
          component: addCustom
        },
        {
          path: '/list/custom',
          name: 'listCustom',
          component: listCustom
        },
        {
          path: '/custom/detail',
          name: 'detailCustom',
          component: detailCustom
        },
        {
          path: '/add/carrier',
          name: 'addCarrier',
          component: addCarrier
        },
        {
          path: '/list/carrier',
          name: 'listCarrier',
          component: listCarrier
        },
        {
          path: '/carrier/detail',
          name: 'detailCarrier',
          component: detailCarrier
        },
        // 数据分析dataAnalysis
        {
          path: '/data/analysis',
          name: 'dataAnalysis',
          component: dataAnalysis
        },
        // 管理员
        
        {
          path: '/index/admin',
          name: 'indexAdmin',
          component: indexAdmin
        },
        {
          path: '/role/admin',
          name: 'roleAdmin',
          component: roleAdmin
        },
      ]
    },
    {
      path: '/login',
      name: 'userLogin',
      component: userLogin
    },
  ]
})
