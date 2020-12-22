// pages/card/card.js
const app = getApp();
var horst = app.horst.url;
var host = horst+'public';//图片地址
var shareId = '';//本地存储的id
var token = '';//本地存储的个人token

Page({

  /**
   * 页面的初始数据
   */
  data: {
    clamp:true,//用来展开文本
    signClamp:true,
    signNumber:true,//个性签名
    number:true,//个人简历表示字数超出
    useUserCardData:'',
    userLogo:'',
    height:0,
    width:0,
    asFinancial:false,//如果自己是理财师就显示，如果不是就隐藏
    num:1,
    id:'',//需要分享出去id，也就是页面渲染的id
  },
  gezhangkai:function(){
    this.setData({
      signClamp: !this.data.signClamp
    })
  },
  zhangkai:function(){
    this.setData({
      clamp:!this.data.clamp
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    var that = this;
    // 滑块
    that.setData({
      height: wx.getSystemInfoSync().windowHeight,
      width: wx.getSystemInfoSync().windowWidth,
    })

    shareId = wx.getStorageSync('id');//本地存储的id
    token = wx.getStorageSync('token');//本地存储的个人token

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  look:function(){
    wx.redirectTo({
      url: '/pages/card/look',
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    console.log(token)
    shareId = wx.getStorageSync('id');//本地存储的id
    token = wx.getStorageSync('token');//本地存储的个人token

    if (token == '') {
      //没有登录  
      console.log('没有登录')
      wx.navigateTo({
        url: '/pages/login/login',
      })
    } else {
      //有登录
      if (shareId == '') {
        //不是分享
        wx.request({
          url: horst + 'api/card/card_data',
          method: 'GET',
          data: {
            token: token
          },
          header: {//设置参数内容类型为x-www-form-urlencoded
            'content-type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
          },
          success: res => {
            if (Object.keys(res.data.data).length == 1) {
              wx.showToast({
                title: '名片有所欠缺，请补充',
                icon: 'none'
              })
              setTimeout(function () {
                wx.redirectTo({
                  url: '/pages/card/addCard/addCard',
                })
              }, 500)
            }

            var data = res.data.data
            var img = host + data.imgurl;
            var introduce = res.data.data.introduce
            var signature = res.data.data.signature;

            if (introduce != undefined && introduce.length > 40) {
              that.setData({
                number: false
              })
            } else {
              that.setData({
                number: true
              })
            }
            if (introduce != undefined && signature.length > 40) {
              that.setData({
                signNumber: false
              })
            } else {
              that.setData({
                signNumber: true
              })
            }

            that.setData({
              useUserCardData: data,
              userLogo: img,
              id: data.id
            })
            wx.request({
              url: horst + 'api/user/user',
              method: 'GET',
              data: {
                token: token
              },
              success: function (res) {


                if (res.data.data.identity == 1) {

                  //理财师
                  that.setData({
                    asFinancial: true
                  })



                } else {
                  //不是理财师
                }
              }
            })


          }
        }) 
      } else {
        //分享进来的
        //修改用户信息
        wx.request({
          url: horst + 'api/index/card_data',
          method: 'GET',
          data: {
            id: shareId
          },
          header: {//设置参数内容类型为x-www-form-urlencoded
            'content-type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
          },
          success: res => {
            var data = res.data.data
            console.log(data)
            var id = data.id
            var img = host + data.imgurl;
            that.setData({
              useUserCardData: data,
              userLogo: img,
              id: data.id
            })
            // 查看分享进来的理财师名片
            var id = that.data.useUserCardData.wxuser_id;
            wx.request({
              // 此处接口是用来表示保存用户进入官网的次数
              url: horst + 'api/make/addleida',
              method: 'POST',
              header: {
                'content-type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
              },
              data: {
                token: token,
                status: 2,//1查看官网  2查看名片  3查看产品  4查看分享  5转发名片  6拨打电话  7复制邮箱 
                card_id: id,//用户id
              },
              success: res => {
                console.log(res.data)
              },
            })
            // 添加为理财师的客户
            wx.request({
              // 
              url: horst + 'api/make/bind',
              method: 'POST',
              data: {
                token: token,
                user_id: id//名片下用户的user_id
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
              },
              success: res => {
                console.log(res)
              },
            })
          }
        })
        // 添加为我的客户

      }
    }


    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function (e) {
    console.log(e)
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
  onShareAppMessage: function (res) {
    var that = this;
    var id = that.data.useUserCardData.wxuser_id;

    wx.request({
      // 此处接口是用来表示保存用户进入官网的次数
      url: horst + 'api/make/addleida',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      data: {
        token: token,
        status: 5,//1查看官网  2查看名片  3查看产品  4查看分享  5转发名片  6拨打电话  7复制邮箱 
        card_id: id,//表示理财师的名片id
      },
      success: res => {
        console.log(res.data)
      },
    })
    var onShare = that.data.useUserCardData.id;
    
    return {
      title: '个人名片',
      path: 'pages/index/index?scene=' + onShare,  
    } 
  },
  callPhone: function () {
    var that = this;
    wx.makePhoneCall({
      phoneNumber: this.data.useUserCardData.tel,
      success() {
        var id = that.data.useUserCardData.wxuser_id;
        wx.request({
          // 此处接口是用来表示保存用户进入官网的次数
          url: horst + 'api/make/addleida',
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
          },
          data: {
            token: token,
            status: 6,//1查看官网  2查看名片  3查看产品  4查看分享  5转发名片  6拨打电话  7复制邮箱 
            card_id: id,//用户id
          },
          success: res => {
            console.log(res.data)
          },
        })
      }
    })
  },
  copyEmail: function () {
    var that = this;
    wx.setClipboardData({
      data: this.data.useUserCardData.email,
      success() {
        wx.showToast({
          title: '复制成功',
          icon: 'success',
          duration: 1000
        })
        var id = that.data.useUserCardData.wxuser_id;//用户id
        wx.request({
          // 此处接口是用来表示保存用户进入官网的次数
          url: horst + 'api/make/addleida',
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
          },
          data: {
            token: token,
            status: 7,//1查看官网  2查看名片  3查看产品  4查看分享  5转发名片  6拨打电话  7复制邮箱 
            card_id: id,//用户id
          },
          success: res => {
            console.log(res.data)
          },
        })
      }
    })
  },
  // 名片添加
  addCard:function(){
   
    wx.navigateTo({
      url: './addCard/addCard',
    })
  },
})