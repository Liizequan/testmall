// pages/position/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iteList: [],
    scrollH: 0,
    positions:null,
    hasRes:false,
    hotList:null,
    list:null,
    condit:null,
    noMore:false
  },
  inpBlur(){
    // this.setData({
    //   hasRes:true
    // })
  },
  toSearch(e) {
    this.setData({
      condit: e.currentTarget.dataset.item
    })
    this.search()
  },
  search() {
    app.post('api-work/search', { keyword: this.data.condit }, res => {
      this.setData({
        iteList:res.data,
        hasRes: true
      })
    })
  },
  inpFocus(){
   this.setData({
     hasRes:false
   })
    app.get('api-work/hotsearch', {}, res => {
      this.setData({
        list: res.data
      })
    })
  },
  toPosiDetl(e) {
    app.navTo('posiDetail',{},e.currentTarget.dataset.id)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.init()
    
  },
  init() {
    app.get('api-work/index', {
      lng: app.config.longitude,//经度
      lat: app.config.latitude,//纬度
      city: app.config.location ? app.config.location:null,
      page:0
    }, res => {
      if (res.statusCode == 200) {
        this.data.page++
        this.setData({
          iteList: res.data.list,
          hasRes: true,
          hotList: res.data.region
        })
        wx.stopPullDownRefresh()
      }
    })},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.setData({
      scrollH: wx.getSystemInfoSync().windowHeight - 196 * wx.getSystemInfoSync().windowWidth/750
    })
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
    this.init()
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

  },
  bottomHere(){
    // this.selectComponent('#sel').getList()
  },
  scrolling(e){
    // console.log(e.detail.scrollHeight - e.detail.scrollTop)
    if(this.data.scrollH == e.detail.scrollHeight - e.detail.scrollTop){
      this.selectComponent('#sel').getList()
    }
  },
  scrolltolower(){
    this.selectComponent('#sel').getList()
  }
})