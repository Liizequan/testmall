const app = getApp();
var horst = app.horst.url;
var host = horst + 'public';//图片地址
var shareId = '';
var token = '';

var timestamp = Date.parse(new Date());
//返回当前时间毫秒数
timestamp = timestamp / 1000;
//获取当前时间
var n = timestamp * 1000;
var date = new Date(n);
//年
var Y = date.getFullYear();
//月
var M = (date.getMonth()  + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
//日
var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
//时
var h = date.getHours();
//分
var m = date.getMinutes();
//秒
var s = date.getSeconds();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    login:true,
    useCard:'',
    userLogo:'',
    useNewsDataTime:'',
    useNewsData: "",
    economicList: [],
    useFineData: "",
    id:'',//需要分享出去的id
    title: '',
    cardId:'',//用户id
  },


  onLoad: function (options) {
    token = wx.getStorageSync('token');
    this.todayNews();
    this.jinxuan();
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
    shareId = wx.getStorageSync('id');
    console.log(shareId);

    
    token = wx.getStorageSync('token');
    var that = this;
    // 名片渲染区域
    // console.log(shareId)
    if (shareId == '') {
      //不是分享
      if (token == '') {
        //没有登录
        var that = this;
        wx.request({
          url: horst + 'api/index/card_data',
          method: 'GET',
          data: {
            id: 1
          },
          header: {//设置参数内容类型为x-www-form-urlencoded
            'content-type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
          },
          success: res => {

            var data = res.data.data
            var img = data.imgurl;
            that.setData({
              useCard: data,
              userLogo: horst + '/public' + img,
              userPhone: data.tel,
              id: data.id
            })
          }
        })
      } else {
        //已经登录
        var that = this;
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

            var data = res.data.data
            var img = data.imgurl;
            that.setData({
              useCard: data,
              userLogo: horst + '/public' + img,
              userPhone: data.tel,
              id: data.id
            })
          }
        })
      }



    } else {
      //通过分享进来
      var that = this;
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
          var img = data.imgurl;
          that.setData({
            useCard: data,
            userLogo: horst + '/public' + img,
            userPhone: data.tel,
            id: data.id
          })


          // console.log(data)
          //雷达区域 登录才算 // 谁进入到首页就记录阅读过官网
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
              status: 1,//1查看官网  2查看名片  3查看产品  4查看动态  5转发名片  6拨打电话  7复制邮箱 
              card_id: data.wxuser_id,//用户id
            },
            success: res => {
              // console.log(res)
            },
          })
        }
      })
    }
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
    console.log(this.data.id)
    return {
      title: '首页',
      path: 'pages/index/index?scene=' + this.data.id  // 路径，传递参数到指定页面。
    }
  },
  // 跳转到商城
  ecShopTap:function(){
    wx.switchTab({
      url: '../ecshop/ecshop',
    })
  },
  // 跳转到名片
  cardTap:function(){
    wx.switchTab({
      url: '/pages/card/card',
    })
  },
  // 查看产品
  orderTap:function(e){
    var id = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: './order/order?index='+ id,
    })
  },
  // 打电话
  callPhone:function(){
    var that = this;
    console.log(that.data.useCard)
    var userId = that.data.useCard.wxuser_id;
    wx.makePhoneCall({
      phoneNumber: that.data.useCard.tel,
      success() {
        wx.showToast({
          title: '请稍等...',
          icon: 'none',
          duration: 1000
        })
        // 雷达追踪功能拨打电话
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
            card_id: userId,//此处id表示理财师的用户id 也就是wxuser_id
          },
          success: res => {
            console.log('拨打成功')
          },
        })
      }
    })
  },
  // 邮箱复制
  copyEmail: function (){
    var that = this;
    wx.setClipboardData({
      data: that.data.useCard.email,
      success() {
        wx.showToast({
          title: '复制成功',
          icon: 'success',
          duration: 1000
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
            status: 7,//1查看官网  2查看名片  3查看产品  4查看分享  5转发名片  6拨打电话  7复制邮箱 
            card_id: that.data.id,//表示谁的名片
          },
          success: res => {

          },
        })
      }
     })
  },
  //公司名复制
  copyCompony:function(){
    wx.setClipboardData({
      data: this.data.userHeadOffice,
      success() {
        wx.showToast({
          title: '复制成功',
          icon: 'success',
          duration: 1000
        })
      }
    })
  },
  // 跳转到对应商品
  productDefault:function(e){
    var id = e.currentTarget.dataset.index;//获取对应数值

    wx.navigateTo({
      url: '../dynamic/content/content?index=' + id,
    })
  },
  // 跳转到制作小程序
  newWX:function(){
    wx.navigateTo({
      url: '/pages/mine/mineWxPlay/mineWxPlay',
    })
  },
  // 今日头条信息
  todayNews:function(){
    var that = this;
    wx.request({
      url: horst +'api/index/article_tt',
      method: 'POST',
      data: {num:1},
      header: {//设置参数内容类型为x-www-form-urlencoded
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      success: res => {
        // console.log(res)
        var data1 = res.data.data1
        var data2 = res.data.data2
        for (var i in data1) {
          //获取最新数据
          var time = data1[0].update_time.slice(0, 10).replace(RegExp('-', 'g'), '.')//时间
          that.setData({
          
            useNewsData: data1,
            economicList:data2
          })
        }
      },
      fail: res => {
       
      }
    }) 
  },
  // 精选推荐信息
  jinxuan:function(){
    var that = this;
    wx.request({
      url: horst +'api/index/product_mend',
      method: 'POST',
      data: {
      },
      header: {//设置参数内容类型为x-www-form-urlencoded
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      success: res => {
     
        var data = res.data.data
        var title = res.data.title

        that.setData({
          useFineData: data,
          title: title,
        })
      },
      fail: res => {
        
      }
    }) 
  },


})