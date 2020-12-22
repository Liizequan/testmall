// pages/upResume/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    resList: null
  },
  upload() {
    let _this = this
    wx.chooseImage({
      success: function(res) {
        wx.showLoading()
        wx.uploadFile({
          url: app.baseUrl + '?r=' + 'api-user/annex',
          filePath: res.tempFilePaths[0],
          name: 'file',
          formData:{
            token: wx.getStorageSync('token')
          },
          success(res) {
            wx.hideLoading()
            if (JSON.parse(res.data).code == 1) {
              wx.showToast({
                title: '上传成功'
              })
              _this.getList()
            } else if (JSON.parse(res.data).code == 0) {
              wx.showToast({
                icon: 'none',
                title: JSON.parse(res.data).msg,
                duration: 1500
              })
            }
          }
        })
      },
    })
    // wx.chooseMessageFile({
    //   success(res) {
    //     if (res.tempFiles[0].type == 'image' || res.tempFiles[0].type=='file') {
          
    //     }
    //   }
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getList()
  },
  toDetail(e){
    if (e.currentTarget.dataset.type == 'doc' || e.currentTarget.dataset.type == 'docx'){
      wx.downloadFile({
        url: e.currentTarget.dataset.url,
        success: function (res) {
          const filePath = res.tempFilePath
          wx.openDocument({
            filePath: filePath
          })
        }
      })
    }else{
      wx.previewImage({
        urls: [e.currentTarget.dataset.url],
      })
    }
  },
  longTap(e) {
    wx.showModal({
      title: '删除',
      content: '确认删除吗?',
      success: res => {
        if (res.confirm) {
          app.post('api-user/annexdel', {
            token: wx.getStorageSync('token'),
            id: e.currentTarget.dataset.id
          }, res => {
            if (res.data.code == 1) {
              wx.showToast({
                title: '删除成功',
              })
              this.getList()
            }
          })
        }
      }
    })
  },
  getList() {
    app.get('api-user/annexlist', {
      token: wx.getStorageSync('token')
    }, res => {
      this.setData({
        resList: res.data
      })

      // wx.setStorageSync('', data)
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