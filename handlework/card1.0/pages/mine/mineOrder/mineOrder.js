// pages/mine/order/order.js
const app = getApp();
var horst = app.horst.url;
var subscribeUrl = horst+'api/make/make_list';//预约
var deleteUrl = horst+'api/make/make_put';//取消预约
Page({
  /**
   * 页面的初始数据
   */
  data: {
    myOrderData: "",// 我的预约
    noFine: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'token',
      success: function (res) {
        var token = res.data;
        // 请求预约接口
        wx.request({
          url: subscribeUrl,
          method: 'POST',
          data: {
            token: token,
            id: 1,
          },
          header: {//设置参数内容类型为x-www-form-urlencoded
            'content-type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
          },
          success: res => {
            var data = res.data.data;//获取数据库数据
            console.log(data.length)
            if(data.length>0){
              that.setData({
                myOrderData: data,
                noFine:true
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
  // 跳转到商城
  ecshop:function(){
    wx.switchTab({
      url: '/pages/ecshop/ecshop',
    })
  },
  // 取消预约
  remove: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;//获取需要删除数据的索引
    var id = e.currentTarget.dataset.id;//获取需要数据库删除的数据
    var userName = that.data.myOrderData[index].product.name;///获取取消对象名
    var myOrderData = that.data.myOrderData;
    console.log(userName)
    
    wx.showModal({//判断是否需要删除改对象
      title: '确认取消',
      content: '确认取消对' + userName + '的预约？',
      success: function (res) {
        if (res.confirm) {
          wx.getStorage({
            key: 'token',
            success: function (res) {
              var token = res.data;
              wx.request({
                url: deleteUrl,// 请求取消预约接口
                method: 'POST',
                data: {
                  token:token,
                  id: id,
                },
                header: {//设置参数内容类型为x-www-form-urlencoded
                  'content-type': 'application/x-www-form-urlencoded',
                  'Accept': 'application/json'
                },
                success: res => {
                  console.log(res)
                  myOrderData.splice(index, 1);
                  that.setData({
                    myOrderData: myOrderData
                  })
                  if (myOrderData.length == 0) {
                    that.setData({
                      noFine: false
                    })
                  }
                },
                fail: res => {
                  console.log('网络异常');
                }
              })
            }
          })

          
        } else {
          console.log('用户点击取消')
        }
      }
    })
  }
})