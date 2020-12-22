// pages/reqDetail/index.js
var WxParse = require('../../wxParse/wxParse.js');
const app =getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cover:'',
    views:'',
    author:'',
    date:'',
    content:'',
    reqList: [{
      url: '/assets/index/pic31.png',
      title: 'XX 快速找工作，既专业又靠谱。',
      detail: '所有职位，实地认证，时刻关注，机会就在指尖。'
    },
    {
      url: '/assets/index/pic21.png',
      title: '深受喜爱的职业发展平台',
      detail: '深耕行业10多年，持续为企业输送各类人才'
    },
    {
      url: '/assets/index/pic11.png',
      title: '高薪名企深度合作，好工作等你来',
      detail: '多个明星企业达成合作关系，搭建快速入职通道'
    }
    ],
    title:null,
    last:null,
    next:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.get('api-article/look', { id: JSON.parse(options.params).id }, res => {
      if(res.statusCode==200){
        this.setData({
          author: res.data.author,
          date: res.data.create_time,
          cover: res.data.cover,
          views: res.data.view,
          content: res.data.content,
          title:res.data.title,
          next:res.data.next,
          last:res.data.last
        })
        WxParse.wxParse('article', 'html', this.data.content, this, 5);
      }
    })
  },
getAnother(e){
  app.get('api-article/look', { id: e.currentTarget.dataset.id }, res => {
    if (res.statusCode == 200) {
      this.setData({
        author: res.data.author,
        date: res.data.create_time,
        cover: res.data.cover,
        views: res.data.view,
        content: res.data.content,
        title: res.data.title,
        next: res.data.next,
        last: res.data.last
      })
      WxParse.wxParse('article', 'html', this.data.content, this, 5);
      wx.pageScrollTo({
        scrollTop: 0,
      })
    }
  })
},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})