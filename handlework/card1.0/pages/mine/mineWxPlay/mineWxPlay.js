// pages/user/wxPlay/wxPlay.js
const app = getApp();
var horst = app.horst.url;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    phone: '',
    trade: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
  // //姓名
  // nameInput: function (e) {
  //   this.setData({
  //     name: e.detail.value
  //   })
  // },
  // //电话
  // phoneInput: function (e) {
  //   this.setData({
  //     phone: e.detail.value
  //   })
  // },
  // //行业
  // tradeInput: function (e) {
  //   this.setData({
  //     trade: e.detail.value
  //   })
  // },
  //提交
  formSubmit: function (e) {
    console.log(e.detail.value)
    wx.request({
      //获取接口
      url: horst + 'api/user/contact',
      method: 'POST',
      // 传递数据后台
      data: {
        username: e.detail.value.name,
        mobile: e.detail.value.phone,
        industry: e.detail.value.trade
      },
      header: {//设置参数内容类型为x-www-form-urlencoded
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      success: res => {
        var data = res
        console.log(data);
        if(res.data.code==1){
          wx.navigateBack({ changed: true });//返回上一页  
        }else{
          wx.showToast({
            title: res.data.msg,
            icon:'none'
          })
        }
      },
      fail: res => {
        console.log('网络异常');
      }
    }) 
  }
})