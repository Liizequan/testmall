const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    men: [],
    user_id: '',
    hasUserInfo:false
  },
  getuserinfo(e){
    console.log(e.detail.rawData!=undefined)
    if (e.detail.rawData != undefined){
      this.setData({
        hasUserInfo:true
      })
    }
  },
  toTalk(e) {
    console.log(e.currentTarget.dataset.sys)
    if (e.currentTarget.dataset.sys == 'true') { //系统消息
      wx.navigateTo({
        url: '/pages/speak/sysinfo/sysinfo',
      })
    } else {
      wx.navigateTo({
        url: '/pages/speak/man/man?fromId=' + e.currentTarget.dataset.fromid + '&name=' + e.currentTarget.dataset.name,
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.getSetting({
      success: (res) => {
        if (!res.authSetting['scope.userInfo']) {
          this.setData({
            hasUserInfo: false
          })
        } else {
          this.setData({
            hasUserInfo: true
          })
        }
      }
    })
  },
  getMen() {
    wx.request({
      url: 'https://qolaxin.gzfloat.com/?r=server/clientlist',
      data: {
        to: wx.getStorageSync('user_id')
      },
      success: (res) => {
        console.log(res.data.msg, 'rrrrrrrrrrrr')
        this.setData({
          men: res.data.msg
        })
      }
    })
  },
  getchairsmen() {
    wx.request({
      url: 'https://qolaxin.gzfloat.com?r=server/userlist',
      success: (res) => {
        console.log(res.data.msg, 'rrrrrrrrrrrr')
        this.setData({
          men: res.data.msg
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
    if (wx.getStorageSync('user_id')) {
      this.setData({
        user_id: wx.getStorageSync('user_id')
      })
      if (this.data.user_id == app.siteInfo.chairmanId) {
        this.getchairsmen()
      } else {
        this.getMen()
      }
    } else {
      wx.navigateTo({
        url: '/pages/login/index',
      })
    }
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