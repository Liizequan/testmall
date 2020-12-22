const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    location: '',
    swiperList: [],
    iteList: app.iteList,
    hotItems: [],
    reqList: [],
    positions: null
  },
  toPosi() {
    wx.switchTab({
      url: '/pages/position/index',
    })
  },
  toLocat() {
    app.navTo('address', {}, 'index')
  },
  toSearch() {
    app.navTo('search')
  },
  toIntrod(e) {
    app.navTo('introduce', {
      id: e.currentTarget.dataset.id
    })
  },
  toPosiDetl(e) {
    app.navTo('posiDetail', {}, e.currentTarget.dataset.id)
  },
  toHelp() {
    app.navTo('req')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // this.setData({
    //   location: app.config.location || '城市'
    // })
    // this.init()
    this.getLocat()
  },
  init() {
    app.get('api-index/index', {
        city: this.data.location == '城市' ? 0 : this.data.location
      }, (res) => {
        if (res.statusCode == 200) {
          this.setData({
            swiperList: res.data.banner,
            reqList: res.data.article,
            hotItems: res.data.company,
            positions: res.data.work
          })
          setTimeout(() => {
              wx.stopPullDownRefresh()
          }, 1000)
      }
    })
},
getLocat() {
  let _this = this
  wx.getLocation({
    success: function(res) {
      let latitude = res.latitude;
      let longitude = res.longitude;
      app.config.longitude = res.longitude
      app.config.latitude = res.latitude
      wx.request({
        url: 'https://apis.map.qq.com/ws/geocoder/v1/?location=' + latitude + ',' + longitude + '&key=' + app.config.locatKey,
        success: res => {
          app.config.location = res.data.result.address_component.city
          app.config.selLocat = res.data.result.address_component.city
          _this.setData({
            location: app.config.location
          })
        }
      })
    },
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
  this.setData({
    location: app.config.location || '城市'
  })
  this.init()
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
  // this.getLocat()
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