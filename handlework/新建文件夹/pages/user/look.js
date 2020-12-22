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
  onLoad: function (options) {
    if(options.who=='隐私政策'){
      wx.setNavigationBarTitle({
        title: options.who,
      })
      App._get('wxapp/look', {
        help_id: 10004,
        wxapp_id: 10001
      }, (res) => {
        if(res.code ==1){
          this.setData({
            list:res.data.list
          })
        }
      });
    } else if (options.who == '分销及积分奖励'){
      wx.setNavigationBarTitle({
        title: options.who,
      })
      App._get('wxapp/look', {
        help_id: 10005,
        wxapp_id: 10001
      }, (res) => {
        if (res.code == 1) {
          this.setData({
            list: res.data.list
          })
        }
      });
    }else{
      var help_id = options.help_id;
      let _this = this;
      App._get('wxapp/look', { help_id: help_id }, function (result) {
        _this.setData(result.data);
        wx.setNavigationBarTitle({
          title: result.data.list[0].title
        })

      });
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
  onShareAppMessage: function () {

  }
})