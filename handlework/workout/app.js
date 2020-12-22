//app.js
let config = {
  windowHeight: null,
  windowWidth: null,
  location: '',
  locatKey:'KKDBZ-LEX6W-DAVRW-OMYPU-23GXH-4BFDE',
  longitude:null,
  latitude:null,
  selLocat:null
}
// let baseUrl = 'https://qolaxin.gzfloat.com/'
App({
  toa:function(msg){
    wx.showToast({
      icon:'none',
      title: msg,
    })
  },
  formatDate(date) {
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let seconds = date.getSeconds()
    return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
  },
  baseUrl: 'https://qolaxin.gzfloat.com/',
  config,
  siteInfo:{
    chairmanId:1
  },
  onLaunch: function() {},
  onShow() {
    let info = wx.getSystemInfoSync()
    config.windowHeight = info.windowHeight
    config.windowWidth = info.windowWidth
  },
  globalData: {
    userInfo: null
  },
  iteList: [1, 2, 3, 4, 5, 6],
  navTo(url, params = {}, str = "") {
    if (params) {
      params = JSON.stringify(params)
    }
    wx.navigateTo({
      url: '/pages/' + url + '/index?params=' + params + '&str=' + str,
    })
  },
  post(url,p,c) {
    wx.request({
      url: this.baseUrl +'?r='+url,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token':wx.getStorageSync('token')
      },
      data: p,
      method: 'POST',
      success: r => {
        if (r.data.code == -1) {
          wx.navigateTo({
            url: '/pages/login/index',
          })
        } else{
          c(r)
        }
      }
    })
  },
  get(url,p,c){
    wx.request({
      url: this.baseUrl + '?r=' + url,
      data: p,
      success: r => {
        if(r.data.code ==-1){
          wx.navigateTo({
            url: '/pages/login/index',
          })
        }else{
          c(r)
        }
      },
      fail:err=>{
      }
    })
  }
})