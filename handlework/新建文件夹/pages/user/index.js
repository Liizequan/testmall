let App = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    orderCount: {},
    phone:'',
    maskShow: false
  },
  phone: function (e) {
    let _this = this;
    App._get('page/phone', {}, function (result) {
      wx.makePhoneCall({
        phoneNumber: result.data,
      })
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.getPhone()
  }, 
  showPhone() {
    this.setData({
      maskShow: true
    })
  },
  getPhone() {
    App._get('page/phone', {}, (result) => {
      this.setData({
        phone: result.data
      })
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 获取当前用户信息
    this.getUserDetail();
  },

  /**
   * 获取当前用户信息
   */
  getUserDetail: function () {
    let _this = this;
    App._get('user.index/detail', {}, function (result) {
      _this.setData(result.data);
    });
  },


})