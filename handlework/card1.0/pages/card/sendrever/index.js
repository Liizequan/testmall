
const app = getApp();
var horst = app.horst.url;
var imgHorst = app.horst.imgUrl
Page({
  /**
   * 页面的初始数据
   */
  data: {
    newsList: [],
    imgHorst: imgHorst,
  },

  lookImg:function(e){

    var currentUrl = e.currentTarget.dataset.currenturl //当前图片
    var previewurl = e.currentTarget.dataset.previewurl //所有图片
    var newPreviewurl = [];
    for (var i in previewurl){
      // 使所有图片改为https格式
      var list = imgHorst + previewurl[i];
      newPreviewurl.push(list)
      if (newPreviewurl.length == previewurl.length){
     
        wx.previewImage({
          current: currentUrl,
          urls: newPreviewurl, 
        })
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'token',
      success: function (res) {
  
        var data = res.data;
   
        wx.request({
          url: horst + 'api/make/sendlist',
          method: 'POST',
          data: {
            token: data
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
          },
          success: res => {
            console.log(res.data.data)
            that.setData({
              newsList: res.data.data
            })
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
      path: '/pages/index/index'
    } 
  },
  // userCard: function (e) {
  //   console.log('跳转到对应名片')
  //   console.log(e.currentTarget.dataset.id)

  //   var id = e.currentTarget.dataset.id;
  //   wx.navigateTo({
  //     url: "/pages/card/lookcard/index?userInfoId=" + id,
  //   })
  // }
})