// pages/card/lookcard/index.js
// pages/card/card.js
const app = getApp();
var horst = app.horst.url;
var host = horst + 'public';//图片地址
Page({

  /**
   * 页面的初始数据
   */
  data: {
    clamp: true,//用来展开文本
    signClamp: true,
    signNumber: true,//个性签名
    number: true,//个人简历表示字数超出
    useUserCardData: '',
    userLogo: '',
    height: 0,
    width: 0,
    asFinancial: false,//如果自己是理财师就显示，如果不是就隐藏
    num: 1,
    shareId: '',//分享进来的id
    token: '',
    id: '',//需要分享出去id，也就是页面渲染的id
    options: '',
  },
  gezhangkai: function () {
    this.setData({
      signClamp: !this.data.signClamp
    })
  },
  zhangkai: function () {
    this.setData({
      clamp: !this.data.clamp
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
      options: options
    })
    var licaishi = options.licaishi;//理财师id

    var shareId = wx.getStorageSync('id');//分享进来的ID
    var token = wx.getStorageSync('token');
    if (token == '') {
      //没有登录  
      wx.navigateTo({
        url: '/pages/login/login',
      })
    } else {
      //登录了
      //分享进来的
      
      wx.request({
        url: horst + 'api/index/card_data',
        method: 'GET',
        data: {
          id: licaishi
        },
        header: {//设置参数内容类型为x-www-form-urlencoded
          'content-type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        success: res => {

          var data = res.data.data
          var img = host + data.imgurl;
          that.setData({
            useUserCardData: data,
            userLogo: img,
          })
        }
      })
    }




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
  onShareAppMessage: function (res) {
    var that = this;
    var options = that.data.options;
    var id = options.licaishi 

    wx.getStorage({
      key: 'token',
      success: function (res) {
        //获取本地token值
        var token = res.data;
        that.setData({
          token: token
        })
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
            card_id: id,//表示谁的名片id
          },
          success: res => {
            console.log(res.data)
          },
        })
      }
    })
    return {
      title: '名片预览',
      path: 'pages/index/index?id=' + id,
    }
  },
  callPhone: function () {
    var that = this;
    wx.makePhoneCall({
      phoneNumber: this.data.useUserCardData.tel,
      success() {
        var shareId = wx.getStorageSync('id');//分享进来的ID

        wx.getStorage({
          key: 'token',
          success: function (res) {
            //获取本地token值
            var token = res.data;
            var options = that.data.options;
            if (JSON.stringify(options) == "{}") {
              console.log('option为空')
              return
            } else if (shareId != '') {
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
            else {
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
                  card_id: id,//id表示谁的名片
                },
                success: res => {
                  console.log(res.data)
                },
              })
            }
          }
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

        var options = that.data.options;
        var shareId = wx.getStorageSync('id');//分享进来的ID
        var token = wx.getStorageSync('token');//token
        var id = that.data.useUserCardData.wxuser_id;//用户id
        if (JSON.stringify(options) == "{}") {
          console.log('option为空')
          return
        } else if (shareId != '') {
          console.log(id)
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
        } else {
          console.log('option不为空')
          var id = options.id;

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
              card_id: id,//表示谁的名片
            },
            success: res => {
              console.log(res.data)
            },
          })
        }
      }
    })
  },
  // 名片添加
  addCard: function () {

    wx.navigateTo({
      url: './addCard/addCard',
    })
  },
})