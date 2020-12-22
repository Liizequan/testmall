// pages/mine/voucher/voucher.js
const app = getApp();
var horst = app.horst.url;
var voucher = horst + 'api/user/coupon';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    voucherList:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;
    wx.getStorage({
      key: 'token',
      success: function (res) {
        wx.request({
          url: voucher,//请求路径
          method: 'POST',//请求方式
          data: {//获取数据
            token: res.data
          },
          header: {//设置参数内容类型为x-www-form-urlencoded
            'content-type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
          },
          success: res => {//成功请求
            var data = res.data.data
            console.log(data);
            that.setData({
              voucherList:data
            })
          },
          fail: res => {//请求失败
            console.log('网络异常');
          }
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
    return {
      title: '',
      path: 'pages/index/index'
    }
  }
})