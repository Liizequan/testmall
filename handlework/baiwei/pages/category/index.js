const App = getApp();

Page({
  data: {
    // 搜索框样式
    searchColor: "rgba(0,0,0,0.4)",
    searchSize: "15",
    searchName: "搜索商品",

    // 列表高度
    scrollHeight: 0,

    // 一级分类：指针
    curNav: true,
    curIndex: 0,

    // 分类列表
    list: [],

    // show
    notcont: false,
    phone:'',
    maskShow:false
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
  phone: function (e) {
    let _this = this;
    App._get('page/phone', {}, function (result) {
      wx.makePhoneCall({
        phoneNumber: result.data,
      })
    });
  },
  onLoad: function() {
    let _this = this;
    // 设置分类列表高度
    _this.setListHeight();
    // 获取分类列表
    this.getCategoryList();
    this.getPhone()
  },

  /**
   * 设置分类列表高度
   */
  setListHeight: function() {
    let _this = this;
    wx.getSystemInfo({
      success: function(res) {
        _this.setData({
          scrollHeight: res.windowHeight - 47,
        });
      }
    });
  },

  /**
   * 获取分类列表
   */
  getCategoryList: function() {
    let _this = this;
    App._get('category/index', {}, function(result) {
      let data = result.data;
      _this.setData({
        list: data.list,
        templet: data.templet,
        curNav: data.list.length > 0 ? data.list[0].category_id : true,
        notcont: !data.list.length
      });
    });
  },

  /**
   * 一级分类：选中分类
   */
  selectNav: function(t) {
    let curNav = t.target.dataset.id,
      curIndex = parseInt(t.target.dataset.index);
    this.setData({
      curNav,
      curIndex,
      scrollTop: 0
    });
  },

  /**
   * 设置分享内容
   */
  onShareAppMessage: function() {
    let templet = this.data.templet;
    return {
      title: templet.share_title,
      path: "/pages/category/index?referee_id=" + App.getUserId()
    };
  }

}); 