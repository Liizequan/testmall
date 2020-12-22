Page({

  /**
   * 页面的初始数据
   */
  data: {
    men: []
  },
  toTalk(e) {
    console.log(e.currentTarget.dataset.fromid)
    wx.navigateTo({
      url: '/speak/man/man?fromId=' + e.currentTarget.dataset.fromid + '&name=' + e.currentTarget.dataset.name,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  getMen() {
    wx.request({
      url: 'https://51favlife.com/index.php?s=/server/index/userlist',
      success: (res) => {
        console.log(res.data.data, 'rrrrrrrrrrrr')
        this.setData({
          men: res.data.data
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
    this.getMen()
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
    console.log('加载更多...')
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})