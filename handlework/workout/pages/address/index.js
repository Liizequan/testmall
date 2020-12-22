// pages/address/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotList: [],
    iteList: [],
    fromWhere:null
  },
ok(e){
  if(this.data.fromWhere=='index'){
    app.config.location = e.currentTarget.dataset.res
    app.config.selLocat = e.currentTarget.dataset.res
    wx.navigateBack()
  }else if(this.data.fromWhere=='posi'){
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    prevPage.setData({location: e.currentTarget.dataset.res })
    wx.navigateBack()
  }else if(this.data.fromWhere == 'tab'){
    let region
    app.config.selLocat = e.currentTarget.dataset.res
    app.config.longitude = e.currentTarget.dataset.lng
    app.config.latitude = e.currentTarget.dataset.lat
    let pages = getCurrentPages()
    let obj = pages[pages.length - 2].selectComponent('#sel')
    app.get('api-work/updateregion', { city: e.currentTarget.dataset.id }, res => {
      region = res.data.region
      obj.setData({
        location: app.config.selLocat,
        region
      })
    })
    wx.navigateBack()
  }
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      fromWhere: options.str
    })
    this.getLocat()
  },
getLocat(){
  app.get('api-work/region',{},res=>{
    this.setData({
      iteList:res.data.region,
      hotList:res.data.hot
    })
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