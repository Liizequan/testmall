// pages/mine/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: { name: '陈独秀', old: '25岁', edu: '本科', year:'3年'},
    logged:false,
    aye:null
  },
  getInfo(){
    app.get('api-user/desc',{token:wx.getStorageSync('token')},res=>{
      this.setData({
        aye:res.data
      })
    })
  },
  logout(){
    wx.showModal({
      title: '退出登录',
      content: '是否确认退出登录？',
      success:(res)=>{
        if(res.confirm){
          wx.setStorageSync('token', '')
          wx.showToast({
            title: '退出成功',
          })
          this.setData({
            logged:false
          })
        }
      }
    })
  },
  getUserInfo(e){
    if (/ok/.test(e.detail.errMsg)) {
      let info = JSON.parse(e.detail.rawData)
      wx.setStorageSync('userInfo', info)
      this.setData({
        logged:true,
        info
      })
      wx.login({
        success:(res)=>{
          app.post('api-login/login', { code: res.code, nickName: info.nickName, avatarUrl: info.avatarUrl, gender: info.gender},res=>{
            wx.setStorageSync('token', res.data.token)
            wx.setStorageSync('user_id', res.data.user_id)
          })
        }
      })
    }
  },
  toSuggest(){
    app.navTo('suggest')
  },
  toResume() {
    app.navTo('resume')
  },
  uploadResm() {
    app.navTo('upResume')
  },
  toRecord() {
    app.navTo('record')
  },
  toStore() {
    // wx.switchTab({
    //   url: '/pages/store/index',
    // })
    wx.navigateTo({
      url: '/pages/store/index',
    })
  },
  toEvalu() {
    app.navTo('suggest')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if(wx.getStorageSync('token')){
      this.setData({
        logged:true
      })
    }else{
      this.setData({
        logged: false
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getInfo()
    if(wx.getStorageSync('token')){
      this.setData({
        logged:true,
        info:wx.getStorageSync('userInfo')
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})