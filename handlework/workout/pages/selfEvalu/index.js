// pages/selfEvalu/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: '',
    rest:0
  },
  inp(e){
      this.setData({
        rest: e.detail.value.split('').length
      })
      this.data.text = e.detail.value
  },
  save() {
    if(!this.data.text){
      app.toa('请输入内容')
      return
    }
    app.post('api-user/evaluate', {
      token: wx.getStorageSync('token'),
      content: this.data.text
    }, res => {
      if (res.data.code == 1) {
        wx.showToast({
          title: '保存成功',
        })
        wx.navigateBack({
          
        })
      }else{
        wx.showToast({
          icon:'none',
          title:res.data.msg,
        })
      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    app.get('api-user/evaluate', {
      token: wx.getStorageSync('token')
    }, res => {
      if (res.statusCode == 200) {
        this.setData({
          text: res.data.content
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

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