const App = getApp();
var timer;
Page({

  data: {
    // 页面元素
    items: {},
    skell: {},
    phone:'',
    scrollTop: 0,
    maskShow:false,
    h: '',
    m: '',
    s: '',
    btn: false,
    changeShow: true
  },
  getPhone(){
    App._get('page/phone', {},  (result)=> {
      let one = result.data.split('').splice(0, 3).join('')
      let two = result.data.split('').splice(3, 4).join('')
      let three = result.data.split('').splice(7, 4).join('')
   
      this.setData({
        phone:one+' '+two+' '+three
      })
    });
  },
  showPhone(){
    this.setData({
      maskShow:true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    this.getPhone()
    // 加载页面数据
    this.getPageData();
  },

  /**
   * 加载页面数据
   */
  getPageData: function(callback) {
    let _this = this;

    App._get('page/home', {}, function(result) {
      // 设置顶部导航栏栏
      _this.setPageBar(result.data.items.page);
      _this.setData(result.data);
      
      if (result.data.skell!=null){
        var time = result.data.skell.sekll_time;
        timer = setInterval(function () {
          var h = parseInt(time / 3600) < 10 ? '0' + parseInt(time / 3600) : parseInt(time / 3600);
          var m = parseInt(time % (60 * 60 * 24) % 3600 / 60) < 10 ? '0' + parseInt(time % (60 * 60 * 24) % 3600 / 60) : parseInt(time % (60 * 60 * 24) % 3600 / 60);
          var s = parseInt(time % (60 * 60 * 24) % 3600 % 60) < 10 ? '0' + parseInt(time % (60 * 60 * 24) % 3600 % 60) : parseInt(time % (60 * 60 * 24) % 3600 % 60);
          _this.setData({
            btn: true,
            h: h,
            m: m,
            s: s,
          })
         
          time--;
          if (time <= 0) {
            _this.setData({
              btn: false,
              h: '00',
              m: '00',
              s: '00',
            })
            clearInterval(timer);
          }
        }, 1000);
      }else{
        _this.setData({
          btn: false
        })
      }

      // 回调函数
      typeof callback === 'function' && callback();
    });
  },

  /**
   * 设置顶部导航栏
   */
  setPageBar: function(page) {
    // 设置页面标题
    wx.setNavigationBarTitle({
      title: page.params.title
    });
    // 设置navbar标题、颜色
    //wx.setNavigationBarColor({
    //frontColor: page.style.titleTextColor === 'white' ? '#ffffff' : '#000000',
    //backgroundColor: page.style.titleBackgroundColor
    //})
  },

  /**
   * 分享当前页面
   */
  onShareAppMessage: function() {
    let params = this.data.items.page.params;
    return {
      title: params.share_title,
      path: "/pages/index/index?referee_id=" + App.getUserId()
    };
  },

  /**
   * 下拉刷新
   */
  onPullDownRefresh: function() {
    clearInterval(timer);
    // 获取首页数据
    this.getPageData(function() {
      wx.stopPullDownRefresh();
    });
  },


  phone: function(e) {
    let _this = this;
    App._get('page/phone', {}, function(result) {
      wx.makePhoneCall({
        phoneNumber: result.data,
      })
    });
  },

  // /**
  //  * 返回顶部
  //  */
  // goTop: function(t) {
  //   this.setData({
  //     scrollTop: 0
  //   });
  // },

  // scroll: function(t) {
  //   this.setData({
  //     indexSearch: t.detail.scrollTop
  //   }), t.detail.scrollTop > 300 ? this.setData({
  //     floorstatus: !0
  //   }) : this.setData({
  //     floorstatus: !1
  //   });
  // },

});