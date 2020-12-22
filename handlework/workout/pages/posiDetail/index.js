// pages/posiDetail/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: ['周末双休', '五险一金', '年底双薪'],
    all:null,
    like:false,
    id:null
  },
  toDetail(e){
    app.navTo('introduce', {
      id: e.currentTarget.dataset.id
    })
  },
  guide(e){
        wx.openLocation({
          latitude: Number(e.currentTarget.dataset.lat),
          longitude: Number(e.currentTarget.dataset.lng),
          name: e.currentTarget.dataset.addr,
          scale: 28
        })
  },
  iLike(){
    if(!this.data.like){
      app.post('api-collection/add',{token:wx.getStorageSync('token'),work_id:this.data.id},res=>{
        if(res.data.code ==1){
          this.setData({
            like: !this.data.like
          })
          wx.showToast({
            title: '收藏成功',
          })
        }
      })
    }else{
      app.post('api-collection/del', { token: wx.getStorageSync('token'), work_id: this.data.id }, res => {
        if (res.data.code == 1) {
          this.setData({
            like: !this.data.like
          })
          wx.showToast({
            title: '已取消收藏',
          })
        }
      })
    }
  },
  goNow(){
    wx.showModal({
      title: '确认报名',
      content: '发送您的个人简历到该公司进行审核我们将尽快与您联系',
      success:(res)=>{
        if(res.confirm){
          app.post('api-work/deliver',{
            id:this.data.id,
            token:wx.getStorageSync('token')
          },result=>{
            if (result.data.code ==1){
              wx.showModal({
                content: '报名成功',
                showCancel: false
              })
            } else if (result.data.code == 0){
              wx.showModal({
                title: '报名失败',
                content: '完善简历即可报名',
                confirmText:'去完善',
                success:res=>{
                  if(res.confirm){
                    app.navTo('resume')
                  }
                }
              })
            }
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:options.str
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
  getDetail() {
    if(wx.getStorageSync('token')){
      app.get('api-work/look', {
        token: wx.getStorageSync('token'),
        id: this.data.id
      }, res => {
        if (res.statusCode == 200) {
          this.setData({
            all: res.data
          })
          this.setData({
            like:this.data.all.collection==10?true:false
          })
        }
      })
    }else {
      app.get('api-work/look', {
        id: this.data.id
      }, res => {
        if (res.statusCode == 200) {
          this.setData({
            all: res.data
          })
        }
      })
    }
  },
  onShow: function () {
    this.getDetail()
let info = wx.getSystemInfoSync()
this.setData({
  scrollH:info.windowHeight-98*info.windowWidth/750
})
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