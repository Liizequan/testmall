// pages/search/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iteList: app.iteList,
    list: [],
    hasResult: false,
    condit: '',
    scrollH: null,
    region:null
  },
  toPosiDetl(e){
    app.navTo('posiDetail', {}, e.currentTarget.dataset.id)
  },
  toSearch(e) {
    this.setData({
      condit: e.currentTarget.dataset.item
    })
    this.search()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getHot()
    app.get('api-work/index', {
      lng: app.config.longitude,//经度
      lat: app.config.latitude,//纬度 
      city: app.config.location
    }, res => {
      if (res.statusCode == 200) {
        this.setData({
          iteList: res.data.list,
          hasResult: true,
          region: res.data.region
        })
      }
    })
  },
  inpFocus(){
    this.setData({
      hasResult:false
    })
  },
  inpBlur(){
    // this.setData({
    //   hasResult:true
    // })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  inp(e){
    this.setData({
      condit:e.detail.value
    })
  },
  search(){
    app.post('api-work/search', { keyword: this.data.condit},res=>{
      this.setData({
        iteList:res.data,
        hasResult:true
      })
    })
  },
  getHot(){
    app.get('api-work/hotsearch',{},res=>{
      this.setData({
        list:res.data
      })
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let info = wx.getSystemInfoSync()
    this.setData({
      scrollH: info.windowHeight - 196 * info.windowWidth / 750
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