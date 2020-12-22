// pages/index/order/order.js
const app = getApp();
var horst = app.horst.url;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderHide:false,
    useorderData:'',
    cardId: '',
    productId:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    var id = options.index;
    this.setData({
      cardId: id,
      productId:id
    })
    var that = this;
    // 数据请求
    wx.request({
      url: horst +'api/index/product_data',
      method: 'POST',
      data: {
        id: id
      },
      header: {//设置参数内容类型为x-www-form-urlencoded
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      success: res => {

        var data = res.data.data
        this.setData({
          useorderData: data
        })
      },
      fail: res => {
        console.log('网络异常');
      }
    }) 

    var shareId = wx.getStorageSync('id');//本地存储的id
    var token = wx.getStorageSync('token');//本地存储的id
    // 当入口不是自己的入口时，就将客户浏览过的信息发送给客户的理财师
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
        var cardId = data.wxuser_id;
        wx.request({
          // 此处接口是用来表示保存用户进入官网的次数
          url: horst + 'api/make/addleida',
          method: 'POST',
          data: {
            token: token,
            status: 3,//1查看官网  2查看名片  3查看产品  4查看分享  5转发名片  6拨打电话  7复制邮箱 
            card_id: cardId,
            product_id: id,
          },
          success: res => {
            console.log(res)
          },
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (option) {
  
    
    /**/
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

  },
  //提交信息
  formSubmit:function(e){

    var name = e.detail.value.name
    var phone = e.detail.value.phone
    var _this = this;
    var token = ''
    //中英文姓名验证(没有长度限制，考虑到少数名族和外国人名字很长) ：
    var names = /^[\u4E00-\u9FA5A-Za-z]+$/.test(name),
       phones =  /^((13[0-9])|(14[0-9])|(15[0-9])|(17[0-9])|(18[0-9]))\d{8}$/.test(phone);
    if (!names) {
      wx.showToast({
        title: '姓名有误',
        duration: 2000,
        icon: 'none'
      });
    }
    //姓名为英文或者中文 电话为正则表达式
    else if (!phones) {
      wx.showToast({
        title: '手机号码有误',
        duration: 2000,
        icon: 'none'
      });
    } else if (names && phones){
      //获取客户token值
      //product_id为1时才会有预约
      wx.getStorage({
        key: 'token',
        success: function (res) {
          token = res.data;
          // 请求预约接口
          wx.request({
            url: horst +'api/make/make_add',
            method: 'POST',
            data: {
              token: token,
              wxcard_id: 0,
              product_id: 1,
              name: name,
              tel: phone
            },
            header: {//设置参数内容类型为x-www-form-urlencoded
              'content-type': 'application/x-www-form-urlencoded',
              'Accept': 'application/json'
            },
            success: res => {
        
              wx.showToast({
                title: '预约成功',
                icon: 'none'
              })
              _this.closeTap();
            },
            fail: res => {
              console.log('网络异常');
            }
          })
        }
      })

      
      // 预约成功关闭改弹出框
    }
  },
  // 预约
  btnTap:function(){
    this.setData({
      orderHide:true
    })
  },
  //关闭弹框
  closeTap:function(){
    this.setData({
      orderHide: false
    })
  }
})