// 引入接口
const app = getApp();
const horst = app.horst.url;
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  onLoad: function () {
    
  },
  
  bindGetUserInfo: function (e) {
    console.log(e)
    if (e.detail.userInfo) {
    
      var that = this;
      wx.login({
        success: res => {
 
          wx.request({
            url: horst + 'api/user/login',
            method: 'POST',
            data: {
              nickName: e.detail.userInfo.nickName,//用户昵称
              avatarUrl: e.detail.userInfo.avatarUrl,//用户LOGO
              code: res.code,//code值
              gender:e.detail.userInfo.gender//性别
            },
            header: {//设置参数内容类型为x-www-form-urlencoded
              'content-type': 'application/x-www-form-urlencoded',
              'Accept': 'application/json'
            },
            success: res => {
         
              var token = res.data.token;
              console.log('登录成功')
         
              wx.setStorage({
                key: 'token',
                data: token,
              })
              wx.navigateBack({//返回
                delta: 1
              })
            },
            fail: res => {
              wx.showToast({
                title: res,
                icon: 'none'
              })
            }
          }) 
        }
      })
    } 
    else {
    //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法查看此页面，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回首页',
        success: function (res) {
          if (res.confirm) {
            wx.switchTab({
              url: '/pages/index/index'
            })
          }
        }
      })
    }
  },
  bindGetIndex:function(){
    setTimeout(function () {
      wx.switchTab({
        url: '/pages/index/index'
      })
    },1000)
  }, 
  onShareAppMessage: function () {
    console.log(this.data.id)
    return {
      title: '登录',
      path: 'pages/login/login'
    }
  },
})