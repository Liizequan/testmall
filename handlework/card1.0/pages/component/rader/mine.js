// pages/component/rader/mine.js
const app = getApp();
var horst = app.horst.url;
var host = horst + 'public';//图片地址
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    userCard: {
      type: Object,
      value: '',
      licaishi:'',
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    kuang:false,
    horst: horst,
    host: host,//图片地址
    // userCard:{
    //   userLogo: '../../image/tabbar01.png',//用户logo
    //   userName: 'kings',//用户姓名
    //   userPosition:'web前端',//用户职称
    //   userExtend:'../../image/promo.png',//用户推广码
    // },

    logoImg:[
      // { img: '../../image/tabbar01.png', text: '发名片'},
      // { img: '../../image/tabbar01.png', text: '名片预览' },
      // { img: '../../image/tabbar01.png', text: '发布动态' },
    ],
    aboutList:[

      // { img: '../../image/tabbar01.png', text: '发名片', direction: '../../image/index/right.png' },
      { img: '../../image/tabbar01.png', text: '名片预览', direction: '../../image/index/right.png', to:'/pages/card/lookcard/index' },
      // { img: '../../image/tabbar01.png', text: '立即分享', direction: '../../image/index/right.png',to:'/pages/dynamic/dynamic'},
      { img: '../../image/tabbar01.png', text: '收发信息', direction: '../../image/index/right.png', to:'/pages/card/sendrever/index'},
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showKuang:function(){
      this.setData({
        kuang:true
      })
    },
    hideKuang:function(){
      this.setData({
        kuang: false
      })
    },
    editInfo:function(){
      wx.navigateTo({
        url: '/pages/card/addCard/addCard',
      })
    }
  }
})
