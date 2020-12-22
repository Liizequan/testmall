let App = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
 
    list: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let _this = this;
    App._get('user.order/yet', {
    }, function (result) {
      _this.setData({
        list: result.data.list
      });

    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  

});