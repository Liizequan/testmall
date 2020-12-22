// speak/new/new.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    areavalue:'',
    id:''
  },
  submit(){
    if(!this.data.areavalue){
      wx.showToast({
        title: '请输入常用语',
        icon:'none'
      })
      return
    }
    let url
    if(this.data.id){//edit
      url = 'https://qolaxin.gzfloat.com?r=server/edit'
    }else{
      url = 'https://qolaxin.gzfloat.com?r=server/add'
    }
    wx.request({
      url: url,
      data:{
        info:this.data.areavalue,
        id:this.data.id||'',
        user_id:wx.getStorageSync('user_id')
      },
      method:'POST',
      header:{
        'Content-Type':'application/x-www-form-urlencoded'
      },
      success:(res)=>{
        if(res.data.code == 1){
          let timer = setTimeout(() => {
            wx.navigateBack()
            this.data.id = ''
            clearTimeout(timer)
          },500)
          wx.showToast({
            title: res.data.msg
          })
        }else{
          wx.showToast({
            title: res.data.msg,
            icon:'none'
          })
        }
        
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.id = options.id
    console.log(this.data.id)
    if (this.data.id) {
      this.getdetail()
    }
  },
  getdetail(){
    wx.request({
      url: 'https://qolaxin.gzfloat.com?r=server/look',
      data:{
        id:this.data.id
      },
      success:(res)=>{
        if(res.data.code == 1){
          this.setData({
            areavalue: res.data.msg.info
          })
        }
      }
    })
  },
  getareavalue(e){
    this.data.areavalue = e.detail.value
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