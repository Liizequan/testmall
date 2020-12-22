// pages/resume/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lastTime:'',
    all:null,
    forList: [],
    eduList: [],
    experList: [],
    aye:null
  },
  getInfo() {
    app.get('api-user/desc', { token: wx.getStorageSync('token') }, res => {
      this.setData({
        aye: res.data
      })
    })
  },
  toWorkExper(e){
    app.navTo('addWork', { id: e.currentTarget.dataset.id},e.currentTarget.dataset.action)
  },
  viewEduExp(e){
    app.navTo('addExperi', { id: e.currentTarget.dataset.id }, e.currentTarget.dataset.action)
  },
  addEduExper(e){
    app.navTo('addExperi', {}, e.currentTarget.dataset.action)
  },
  toEduExper(e){
    app.navTo('addExperi',{id:e.currentTarget.dataset.id},e.currentTarget.dataset.action)
  },
  toAdd(e){
    app.navTo('ideaPosi', { action: e.currentTarget.dataset.action},e.currentTarget.dataset.id)
  },
  editPer(){
    app.navTo('perInfo')
  },
  editEvalu(){
    app.navTo('selfEvalu')
  },
  toIdeaPosi(e){
    app.navTo('ideaPosi',{action:e.currentTarget.dataset.action},e.currentTarget.dataset.id)
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
    this.getInfo()
    app.get('api-user/index', { token: wx.getStorageSync("token") }, res => {
      if (res.statusCode == 200) {
        this.setData({
          all: res.data
        })
      }
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