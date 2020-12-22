
App({
  onLaunch: function (e) {
    var shareid = e.query.scene;
    console.log(shareid);
    if (shareid == undefined) {
      wx.setStorageSync('id', '');
    } else {
      wx.setStorageSync('id', shareid);
    } 

  },
  onHide: function () {
    wx.setStorageSync('id', '');
  },
  onShow: function (e) {
    var shareid = e.query.scene;
    if (shareid == undefined) {
      wx.setStorageSync('id', '');
    } else {
      wx.setStorageSync('id', shareid);

    } 
  },
  globalData: {
    userInfo: null
  },
  horst: {
    url:'https://li.lihope88.com/',
    imgUrl:'https://li.lihope88.com'
  },
  
  onUnload: function () { 
    wx.removeStorage('id');
  }, 

})