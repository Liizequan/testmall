// pages/workContent/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rest: 0,
    textValue: null,
    action:null
  },
  areaInp(e) {
    this.setData({
      rest: e.detail.value.split('').length
    })
    this.data.textValue = e.detail.value
  },
  submit() {
    let pages = getCurrentPages()
    let pre = pages[pages.length - 2]
    pre.setData({
      content: this.data.textValue
    })
    wx.navigateBack({

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      textValue: options.str,
      action:JSON.parse(options.params).action
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