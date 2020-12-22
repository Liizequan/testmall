// pages/searchPosi/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rankOne:['人力资源','行政','财务','法务','其他'],
    rankTwo: ['人事主管', '招聘专员', '人事助理', '人事经理','培训专员'],
    maskShow:false,
    scrollH:0,
    leftSel:0
  },
  getPosi(e){
    let pages = getCurrentPages(); 
    let prevPage = pages[pages.length - 2];
    prevPage.setData({posi:e.currentTarget.dataset.item})
    wx.navigateBack()
  },
  selLeft(e){
    this.setData({
      leftSel:e.currentTarget.dataset.index
    })
  },
  showMask(){
    this.setData({
      maskShow:true
    })
  },
  closeMask(){
    this.setData({
      maskShow:false
    })
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
    let info = wx.getSystemInfoSync()
    this.setData({
      scrollH:info.windowHeight-96*info.windowWidth/750
    })
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