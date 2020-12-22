// pages/store/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iteList: [],
    startX: null,
    endX: null,
    parentW:null,
    parentH:null,
    delW:null
  },
  touchStart(e) {
    this.data.endX = e.changedTouches[0].clientX
  },
  touchEnd(e) {
    this.data.startX = e.changedTouches[0].clientX
    let tempList = this.data.iteList
    if (this.data.startX - this.data.endX < -50) { //左滑动
      for (let index in tempList) {
        if (tempList[index].id == e.currentTarget.dataset.id) {
          tempList[index].x = -160
          this.setData({
            iteList: tempList
          })
        }
      }
    } else if (this.data.startX - this.data.endX > 50) { //右滑动
      for (let index in tempList) {
        if (tempList[index].id == e.currentTarget.dataset.id) {
          tempList[index].x = 0
          this.setData({
            iteList: tempList
          })
        }
      }
    } else if (this.data.startX - this.data.endX > -50 && this.data.startX - this.data.endX<0){
      for (let index in tempList) {
        if (tempList[index].id == e.currentTarget.dataset.id) {
          // tempList[index].x = 0
          this.setData({
            iteList: tempList
          })
        }
      }
    } else if (this.data.startX - this.data.endX < 50 && this.data.startX - this.data.endX>0) {
      for (let index in tempList) {
        if (tempList[index].id == e.currentTarget.dataset.id) {
          // tempList[index].x = 0
          this.setData({
            iteList: tempList
          })
        }
      }
    }
  },
  delete(e) {
    wx.showModal({
      title: '删除',
      content: '是否确认删除?',
      success: res => {
        if (res.confirm) {
          app.post('api-collection/del', {
            token: wx.getStorageSync('token'),
            work_id: e.currentTarget.dataset.id
          }, res => {
            if (res.data.code == 1) {
              this.getList()
              wx.showToast({
                icon: 'none',
                title: '已取消收藏',
              })
            }
          })
        }
      }
    })
  },
  toPosiDetl(e) {
    app.navTo('posiDetail', {}, e.currentTarget.dataset.id)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
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
      parentW: wx.getSystemInfoSync().windowWidth,
      parentH:wx.getSystemInfoSync().windowHeight,
      delW: 100 / (750 / wx.getSystemInfoSync().windowWidth)
    })
    this.getList()
  },
  getList() {
    app.get('api-collection/index', {
      token: wx.getStorageSync('token')
    }, res => {
      if (res.statusCode == 200) {
        res.data.filter(item => {
          item.x = 0
        })
        this.setData({
          iteList: res.data
        })
        // wx.stopPullDownRefresh()
      }
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
    // this.getList()
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