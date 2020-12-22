// pages/dynamic/content/content.js
// var indexData = require("../../data/indexData.js");
var WxParse = require('../../../wxParse/wxParse.js')
const app = getApp();
var horst = app.horst.url;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indexProduct:'',
    time:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var index = options.index;//获取传递ID
    wx.getSetting({
      success: res => {

        if (res.authSetting['scope.userInfo']) {
          return
        } else {
          wx.navigateTo({
            url: '/pages/login/login',
          })
        }
      }
    })
    wx.request({
      url: horst +'api/index/article_data',
      method: 'POST',
      data:{id:index},
      header: {//设置参数内容类型为x-www-form-urlencoded
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      success: res => {
        console.log(res)
        var data = res.data.data//获取数据
        // var time = data.create_time.slice(0, 10).replace(RegExp('-', 'g'), '.')//时间
        this.setData({
          indexProduct: data,
          // time: time
        })
      },
      fail: res => {
        console.log('网络异常');
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

  },
  share:function(){
    console.log('分享我出去给朋友吧')
  }
})