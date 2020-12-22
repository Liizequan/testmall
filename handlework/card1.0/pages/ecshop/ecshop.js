// pages/ecshop/ecshop.js

const app = getApp();
var horst = app.horst.url;

Page({ 

  /**
   * 页面的初始数据
   */
  data: {
    fineData: "",// 精品推荐
    productList: "",//全部产品
    lookOrder:false,//是否显示查看详情
    banner: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 精选推荐
    var url = horst + 'api/index/product_mend';
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
    wx.request({
      url: url,
      method: 'POST',
      data: { num: 1 },
      header: {//设置参数内容类型为x-www-form-urlencoded
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      success: res => {
        var data = res.data.data//获取数据
        this.setData({
          fineData: data
        })
     
      },
      fail: res => {
 
      }
    }) 

    // benner图
    this.setData({
      banner: horst + 'public/static/images/banner01.png'
    })
    // 全部产品
    wx.request({
      url: horst +'api/index/product_list',
      method: 'POST',
      data: { num: 1 },
      header: {//设置参数内容类型为x-www-form-urlencoded
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      success: res => {
        var data = res.data.data//获取数据
        this.setData({
          productList:data
        })
     
      },
      fail: res => {
    
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

  },
  // 轮播图禁止滚动
  stopTouchMove:function(e){
    return true
  },
  // 详情
  orderTap:function(e){

    if (e.currentTarget.dataset.name == 0) {
    
      var index = e.currentTarget.dataset.index
    
      var id = this.data.fineData[index].id;

      wx.navigateTo({
        url: '../index/order/order?index=' + id
      })
    } else {
    
      var index = e.currentTarget.dataset.index
      var id = this.data.productList[index].id;
      wx.navigateTo({
        url: '../index/order/order?index=' + id
      })
    }
  }
})