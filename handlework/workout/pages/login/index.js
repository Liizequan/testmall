// pages/login/index.js
const App = getApp();
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    that=this;
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow(){
    
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },
  /**
   * 授权登录
   */
  getUserInfo(e) {
    if (e.detail.userInfo) {
      let info = e.detail.userInfo
      wx.setStorageSync('userInfo',info)
      wx.login({
        success: function (res) {
          // wx.request({
          //   url: 'http://127.0.0.1/?r=api-login/login',
          //   method: 'POST',
          //   dataType: "json",
          //   header: {
          //     'content-type': 'application/x-www-form-urlencoded'
          //   },
          //   data: {
          //     code: res.code,
          //     nickName: e.detail.userInfo.nickName,
          //     avatarUrl: e.detail.userInfo.avatarUrl,
          //     gender: e.detail.userInfo.gender,
          //   },
          // })
          App.post('api-login/login', { code: res.code, nickName: info.nickName, avatarUrl: info.avatarUrl, gender: info.gender }, res => {
            wx.setStorageSync('token', res.data.token)
            wx.setStorageSync('user_id', res.data.user_id)
            wx.navigateBack({
              
            })
          })
        }
      }
   
      );
    }
  },

  /**
   * 暂不登录
   */
  onNotLogin() {
    wx.navigateBack()
  },

})