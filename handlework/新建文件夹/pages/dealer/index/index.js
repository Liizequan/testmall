const App = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isData: false,
    userInfo: {},
    words: {},
    user: {},
    dealer: {},
    allmoney:'',
    endtime:'',
    radios: false,
    iconList: [
      { icon: '/images/icon1.png', title: '专属二维码', text: '专属的小程序分销二维码' },
      { icon: '/images/icon2.png', title: '会员特价', text: '会员专享商品优惠折扣' },
      { icon: '/images/icon3.png', title: '分享奖励', text: '分享好友下单消费即得奖励' },
      { icon: '/images/icon4.png', title: '积分兑换', text: '积分可兑换现金或实物礼品' },
    ]
  },
  toOne(e){
    wx.navigateTo({
      url: '/pages/user/look?who='+e.currentTarget.dataset.who,
    })
  },
  toTwo(e) {
    wx.navigateTo({
      url: '/pages/user/look?who=' + e.currentTarget.dataset.who,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // 获取分销商中心数据
    this.getDealerCenter();
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

  /**
   * 获取分销商中心数据
   */
  getDealerCenter: function() {
    let _this = this;
    App._get('user.dealer/center', {}, function(result) {
      let data = result.data;
      console.log(data)
      data.isData = true;
      // 设置当前页面标题
      wx.setNavigationBarTitle({
        title: data.words.index.title.value
      });
      _this.setData(data);
      _this.setData({
        allmoney: data.allmoney,
        endtime: data.endtime
      });
      
    });
  },

  /**
   * 跳转到提现页面
   */
  navigationToWithdraw: function() {
    wx.navigateTo({
      url: '../withdraw/apply/apply',
    })
  },

  duihuan: function () {
    wx.navigateTo({
      url: '../goods/goods',
    })
  },

  renew:function(e){
    let _this = this;
    wx.showModal({
      title: '提示',
      content: '确定会员续费吗？',
      success(res) {
        if (res.confirm) {
          App._get('user.dealer/renew', {}, function (result) {
            if (result.code == 1) {
              // 发起微信支付
              wx.requestPayment({
                timeStamp: result.data.timeStamp,
                nonceStr: result.data.nonceStr,
                package: 'prepay_id=' + result.data.prepay_id,
                signType: 'MD5',
                paySign: result.data.paySign,
                success: function (res) {
                 wx.showToast({
                   title: '续费成功',
                   success:function(){
                     App._get('user.dealer/center', {}, function (result) {
                       let data = result.data;
                       data.isData = true;
                       // 设置当前页面标题
                       wx.setNavigationBarTitle({
                         title: data.words.index.title.value
                       });
                       _this.setData(data);
                       _this.setData({
                         allmoney: data.allmoney,
                         endtime: data.endtime
                       });

                     });
                   }
                 })
                 
                },
                fail: function () {
                  App.showError('订单未成功支付');
                },
              });
            }
          });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })



    
  },

  /**
   * 跳转到明细页面
   */
  detail: function () {
    wx.navigateTo({
      url: '../detail/list',
    })
  },
  
  /**
   * 立即加入分销商
   */
  triggerApply: function(e) {
    // 记录formId
    App.saveFormId(e.detail.formId);
    wx.navigateTo({
      url: '../apply/apply',
    })
  },



  // 我以阅读
  radioChange: function (e) {
    console.log('点击')
    this.setData({
      radios: !this.data.radios
    })
  },
  opening: function () {
    var radios = this.data.radios;
    if (radios == true) {
      wx.navigateTo({
        url: '../apply/apply',
      })
      console.log('提交')
    } else {
      wx.navigateTo({
        url: '../apply/apply',
      })
      console.log('不要提交')
    }
  },

})