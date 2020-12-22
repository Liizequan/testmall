// pages/introduce/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selected:0,
    list: ['周末双休', '五险一金', '年底双薪'],
    all:null,
    someInfo:null,
    hasMore:false
  },
  toWeb(e){
    // app.navTo('webView', { name: this.data.all.name},e.currentTarget.dataset.url)
    wx.setClipboardData({
      data: e.currentTarget.dataset.url,
      success:res=>{
        wx.showToast({
          title: '网址复制成功',
        })
      }
    })
  },
  toDetail(e){
    app.navTo('posiDetail', {}, e.currentTarget.dataset.id)
  },
  openMap(e){
    wx.openLocation({
      latitude: Number(e.currentTarget.dataset.lat),
      longitude: Number(e.currentTarget.dataset.lng),
      address: e.currentTarget.dataset.addr,
      success: function(res) {},
    })
  },
  getMore(){
    this.setData({
      someInfo:this.data.all.desc,
      hasMore: false
    })
  },
  selTab(e){
    this.setData({
      selected: e.currentTarget.dataset.index
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.get('api-company/index',{id:JSON.parse(options.params).id},res=>{
      if(res.statusCode == 200){
        let info = res.data.desc.split('')
        let some
        if(info.length>100){
          some = res.data.desc.split('').slice(0, 100).join('') + '...'
          this.setData({
            hasMore:true
          })
        }else{
          some = res.data.desc
        }
        this.setData({
          all:res.data,
          someInfo:some
        })
      }
    })
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