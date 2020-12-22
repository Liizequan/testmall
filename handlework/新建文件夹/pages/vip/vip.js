// pages/vip/vip.js
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList: [],
    page: 1,
    scrollHeight: '',
    searching: false,
    key:''
  },
  toVip() {
    wx.navigateTo({
      url: '/pages/dealer/index/index'
    })
  },
  search(e) {
    this.data.page = 1
    App._post_form('goods/search', {
      page: 1,
      sortType: 'all',
      sortPrice: 0,
      category_id: 0,
      wxapp_id: 10001,
      search: e.detail.value
    }, (res) => {
      if (res.code == 1) {
        this.data.searching = true
        this.data.key = e.detail.value
        this.data.goodsList = []
        this.setData({
          goodsList:res.data.list.data
        })
      }
    })
  },
  searchMore(page){
    App._post_form('goods/search', {
      page: page,
      sortType: 'all',
      sortPrice: 0,
      category_id: 0,
      wxapp_id: 10001,
      search: this.data.key
    }, (res) => {
      if (res.code == 1) {
        this.setData({
          goodsList: [...this.data.goodsList, ...res.data.list.data]
        })
        if(!res.data.list.data.length){
          wx.showToast({
            title: '没有更多数据!',
            icon:'none'
          })
        }
      }
    })
  },
  toDetail(e) {
    let goods_id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/goods/index?goods_id=' + goods_id,
    })
  },
  scrolltolower() {
    this.data.page++
    if(this.data.searching){
      this.searchMore(this.data.page)
    } else {
      this.getList(this.data.page)
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getList()
    let info = wx.getSystemInfoSync()
    this.setData({
      scrollHeight: info.windowHeight - 352 * (info.windowWidth / 750) - 100 * (info.windowWidth / 750)
    })
  },
  getList(page) {
    App._get('goods/member', {
      page: page || this.data.page
    }, (res) => {
      this.setData({
        goodsList: [...this.data.goodsList, ...res.data.list.data]
      })
      if (!res.data.list.data.length) {
        wx.showToast({
          title: '没有更多数据了!',
          icon: 'none'
        })
      }
    });
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