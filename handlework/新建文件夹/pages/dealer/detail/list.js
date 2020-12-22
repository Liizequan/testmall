const App = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    swiperHeight:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 设置swiper的高度
    this.setSwiperHeight();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let _this = this;
    App._get('user.dealer.withdraw/detail', {

    }, function (result) {
      // 创建页面数据
      _this.setData({
        list: result.data.data
      });
 

    });
  },




  /**
   * 设置swiper的高度
   */
  setSwiperHeight: function() {
    // 获取系统信息(拿到屏幕宽度)
    let systemInfo = wx.getSystemInfoSync(),
      rpx = systemInfo.windowWidth / 750, // 计算rpx
      tapHeight = Math.floor(rpx * 82), // tap高度
      swiperHeight = systemInfo.windowHeight - tapHeight; // swiper高度
    this.setData({
      swiperHeight
    });
  },





})