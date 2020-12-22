// pages/suggest/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    textValue: '',
    name:'',
    phone: '',
    rest:0
  },
  areaInp(e) {
    this.setData({
      rest: e.detail.value.split('').length
    })
    this.data.textValue = e.detail.value
  },
  nameInp(e) {
    this.data.name = e.detail.value
  },
  phoneInp(e) {
    this.data.phone = e.detail.value
  },
  submit() {
    if (!this.data.textValue){
      app.toa('请输入内容')
      return
    } else if (!this.data.name) {
      app.toa('请输入姓名')
      return
    } else if (!this.data.phone) {
      app.toa('请输入电话')
      return
    }
    app.post('api-index/opinion', {
      question: this.data.textValue,
      username: this.data.name,
      phone: this.data.phone
    }, res => {
      if (res.data.code == 1) {
        wx.showModal({
          content: '提交成功',
          cancelText: '重新填写',
          success: res => {
            if (res.confirm) {
              wx.navigateBack()
            }
          }
        })
      }else if(res.data.code ==0){
        wx.showToast({
          icon:'none',
          title: '1分钟内只可提交1次',
        })
      }
    })

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