import Vue from 'vue'
import Router from 'vue-router'
import index from '@/fudian/index.vue'
import system from '@/fudian/system.vue'
import brank from  '@/fudian/brank.vue'
import science from '@/fudian/science.vue'
import about from '@/fudian/about.vue'
import careers from '@/fudian/careers.vue'
import auto from '@/fudian/auto.vue'
import example from '@/fudian/example'
import exampleChild from '@/fudian/example/example_child'



import Header from '@/components/Header'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect:'index',
    },
    {
      path: '/index',
      name: '首页',
      component: index
    },
    {
      path: '/auto',
      name: 'auto',
      component: auto
    },
    {
      path: '/system',
      name: '系统开发',
      component: system,
    },
    {
      path: '/brank',
      name: '品牌打造',
      component: brank,
    },
    {
      path: '/science',
      name: '科技项目申报',
      component: science,
    },
    {
      path: '/about',
      name: '关于我们',
      component: about,
    },
    {
      path: '/careers',
      name: '招贤纳士',
      component: careers,
    },
    {
      path: '/example',
      path: '/example/:id',
      name: 'example',
      component: example,
    },
    {
      path: '/example/child',
      path: '/example/child/:id',
      name: 'exampleChild',
      component: exampleChild
    },
    {
      path: '/header',
      name: 'Header',
      component: Header
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact
    },
    {
      path: '/footer',
      name: 'Footer',
      component: Footer
    },
  ]
})
