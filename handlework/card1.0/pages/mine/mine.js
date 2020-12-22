// pages/mine/mine.js
const app = getApp();
var horst = app.horst.url;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userLogo:'../image/mine/user.png',
    userName:'利好',
    orderHide: false,
    asFinancial:true,
    count:0,
    title:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    // 获取用户基本信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          return
        } else {
          wx.navigateTo({
            url: '/pages/login/login',
          })
        }
      }
    })
    


    // 判断用户是否是理财师
    wx.getStorage({
      key: 'token',
      success: function (res) {
        // console.log(res)
        var token = res.data;
        wx.request({
          url: horst + 'api/user/user',
          method: 'POST',
          data: {
            token: token,
          },
          header: {//设置参数内容类型为x-www-form-urlencoded
            'content-type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
          },
          success: res => {
            
            if(res.data.data.identity==1){
              that.setData({
                asFinancial:false
              })

            }else{
              that.setData({
                asFinancial: true
              })
            }
          },
          fail: res => {
            console.log('网络异常');
          }
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
    var that = this;
    wx.getUserInfo({
      success: res => {

        var that = this
        this.setData({
          userLogo: res.userInfo.avatarUrl,
          userName: res.userInfo.nickName
        })
      }
    })


    // 判断用户是否是理财师
    wx.getStorage({
      key: 'token',
      success: function (res) {
        // console.log(res)
        var token = res.data;
        wx.request({
          url: horst + 'api/make/infocount',
          method: 'POST',
          data: {
            token: token,
          },
          header: {//设置参数内容类型为x-www-form-urlencoded
            'content-type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
          },
          success: res => {
            console.log(res)
            that.setData({
              count:res.data.count,
               title: res.data.title
            })
          },
          fail: res => {
            console.log('网络异常');
          }
        })
      }
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
    return {
      title: '',
      path: 'pages/index/index'
    }
  },
  // 个人信息
  myInfo:function(){
    wx.navigateTo({
      url: './mineInfo/mineInfo',
    })
  },
  // 个人优惠券
  myVoucher:function(){
    wx.navigateTo({
      url: './mineVoucher/mineVoucher',
    })
  },
  // 我的预约
  myOrder: function () {
    wx.navigateTo({
      url: './mineOrder/mineOrder',
    })
  },
  // 制作微信
  myWxPlay:function(){
    wx.navigateTo({
    url: './mineWxPlay/mineWxPlay',
    })
  },
  // 是否成为理财师
  useFinancial:function(){
    this.setData({
      orderHide: true,
    })
  },
  // 关闭弹框
  closeTap:function(){
    this.setData({
      orderHide: false,
    })
  },
  // 提交是否成为理财师
  formSubmit:function(e){
    var that = this;
    // 判断用户是否是理财师
    wx.getStorage({
      key: 'token',
      success: function (res) {
        // console.log(res)
        var token = res.data;
        wx.request({
          url: horst + 'api/card/identity',
          method: 'POST',
          data: {
            token: token,
            name: e.detail.value.name,
            phone: e.detail.value.phone,
          },
          header: {//设置参数内容类型为x-www-form-urlencoded
            'content-type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
          },
          success: res => {
            if(res.data.code==1){
              that.closeTap();
            }else{
              wx.showToast({
                title:res.data.msg,
                icon:'none'
              })
            }
          },
          fail: res => {
            console.log('网络异常');
          }
        })
      }
    })
  }
})