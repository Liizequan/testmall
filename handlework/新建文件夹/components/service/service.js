// components/service.js
const App = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    maskShow: {
      type: Boolean
    },
    phone: {
      type: String
    }
  },
  lifetimes: {
    attached: function() {
      this.setData({
        contact: wx.getStorageSync('contact')
      })
      wx.getSetting({
        success: (res) => {
          if (!res.authSetting['scope.userInfo']) {
            this.setData({
              btnshow: true
            })
          } else {
            this.setData({
              btnshow: false
            })
          }
        }
      })
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    contact: null,
    btnshow: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getUserInfo(e) {//真机上，这里的代码以前不会进来现在会
      console.log(e.detail.rawData != undefined, 'rrrrrrrr')
      // if (!e.detail.rawData) return
      // if(!wx.getStorageSync('token')){
      //   console.log('請先登錄')
      //   wx.showLoading()
      //   wx.navigateTo({
      //     url: '/pages/login/login',
      //   })
      // }
      // else {
      this.setData({
        maskShow:false
      })
      wx.setStorageSync('userinfo', e.detail.rawData)
      if (e.detail.rawData != undefined) {
        wx.showLoading()
        this.afterGetUserInfo()
      }
    },
    toChat() {
      wx.getSetting({
        success: (res) => {
          if (res.authSetting['scope.userInfo']) {
            this.setData({
              btnshow: false
            })
            this.afterGetUserInfo()
          }
        }
      })
      // wx.getSetting({
      //   success:(res)=>{
      //     console.log(res.authSetting)
      //     if(!res.authSetting['scope.userInfo']){
      //       wx.getUserInfo({
      //         success:(res)=>{
      //           console.log(res.userInfo)
      //           wx.setStorageSync('userinfo', res.userInfo)
      //           this.afterGetUserInfo()
      //         }
      //       })
      //     }else{
      //       wx.getUserInfo({
      //         success: (res) => {
      //           console.log(res.userInfo)
      //           wx.setStorageSync('userinfo', res.userInfo)
      //           this.afterGetUserInfo()
      //         }
      //       })
      //     }
      //   }
      // })
    },
    afterGetUserInfo() {
      this.setData({
        maskShow:false
      })
      let user_id = wx.getStorageSync('user_id')
      // if (!user_id) {
      //   wx.navigateTo({
      //     url: "/pages/login/login"
      //   });
      // } else 
      if (user_id == App.siteInfo.chairmanId) {
        wx.navigateTo({
          url: '/speak/msg/msg',
        })
      } else {
        wx.navigateTo({
          url: '/speak/man/man',
        })
      }
      wx.hideLoading()
    },
    closeMask() {
      this.setData({
        maskShow: false
      })
    },
    call(e) {
      // wx.makePhoneCall({
      //   phoneNumber: this.data.contact.phone,
      // })
      App._get('page/phone', {}, function(result) {
        wx.makePhoneCall({
          phoneNumber: result.data,
        })
      });
    },
  }
})