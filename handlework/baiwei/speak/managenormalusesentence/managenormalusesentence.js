// speak/managenormalusesentence/managenormalusesentence.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollHeight: 0,
    normalList: ''
  },
  moveup(e) {
    let id = e.currentTarget.dataset.id
    wx.showLoading()
    wx.request({
      url:'https://51favlife.com/index.php?s=/server/index/dosort',
      data:{
        id:id
      },
      method:'POST',
      success:(res)=>{
        if(res.data.code == 1){
          this.getnormallanguage()
        }
      },
      complete:()=>{
        wx.hideLoading()
      }
    })
  },
  del(e) {
    wx.showModal({
      title: '删除',
      content: '是否确定删除',
      success: (res) => {
        let id = e.currentTarget.dataset.id
        console.log(res)
        if(res.confirm){
          wx.request({
            url: 'https://51favlife.com/index.php?s=/server/index/del',
            data: {
              id: id
            },
            method: 'POST',
            success: (res) => {
              if (res.data.code == 1) {
                wx.showToast({
                  title: res.data.msg
                })
                this.getnormallanguage()
              }
            }
          })
        }
      }
    })
  },
  edit(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/speak/new/new?id='+id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let info = wx.getSystemInfoSync()
    let height = info.windowHeight
    let width = info.windowWidth
    this.setData({
      scrollHeight: height - 140 * (width / 750)
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
    this.getnormallanguage()
  },
  back(){
    wx.navigateBack()
  },
  getnormallanguage() {
    wx.request({
      url: 'https://51favlife.com/index.php?s=/server/index/infolist',
      data: {
        user_id: wx.getStorageSync('user_id')
      },
      success: (res) => {
        if (res.data.code == 1) {
          this.setData({
            normalList: res.data.msg
          })
        }
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