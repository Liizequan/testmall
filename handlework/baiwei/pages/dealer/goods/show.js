const App = getApp();
const wxParse = require("../../../wxParse/wxParse.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true, // 是否显示面板指示点
    autoplay: true, // 是否自动切换
    interval: 3000, // 自动切换时间间隔
    duration: 800, // 滑动动画时长

    currentIndex:1,

   detail:{},

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let goods_id = options.goods_id;
    let _this = this;
    App._get('user.order/show', {
      goods_id
    }, function (result) {
      _this.setData({
        detail: result.data.list
      })
  
      if (result.data.list.content.length > 0) {
     
        wxParse.wxParse('content', 'html', result.data.list.content, _this, 0);
      }
    });

  },

  onToggleTrade:function(e){
    let _this = this;
    let goods_id = e.currentTarget.dataset.goods_id;

    wx.showModal({
      title: '提示',
      content: '确定兑换该商品吗？',
      success(res) {
        if (res.confirm) {
          App._get('user.order/exchange', {
            goods_id
          }, function (result) {
            wx.showToast({
              title: result.data,
            })
          });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
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