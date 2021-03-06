let App = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataType: '10',
    list: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.data.dataType = options.type || '10';
    this.setData({
      dataType: this.data.dataType
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // 获取订单列表
    this.getOrderList(this.data.dataType);
  },

  /**
   * 获取订单列表
   */
  getOrderList: function(dataType) {
    let _this = this;
    App._get('user.order/duihuan', {
      dataType
    }, function(result) {
      _this.setData({
        list: result.data.list
      });
      result.data.list.length && wx.pageScrollTo({
        scrollTop: 0
      });
    });
  },

  /**
   * 切换标签
   */
  bindHeaderTap: function(e) {
    this.setData({
      dataType: e.currentTarget.dataset.type
    });
    // 获取订单列表
    this.getOrderList(e.currentTarget.dataset.type);
  },
   
  exchange:function(e){
    let goods_id = e.currentTarget.dataset.goods_id;
     wx.navigateTo({
       url: '../goods/show?goods_id=' + goods_id,
     })
  },
  
  /**
   * 取消订单
   */
  cancelOrder: function(e) {
    let _this = this;
    let order_id = e.currentTarget.dataset.id;
    wx.showModal({
      title: "友情提示",
      content: "确认要取消该订单吗？",
      success: function(o) {
        if (o.confirm) {
          App._post_form('user.order/cancel', {
            order_id
          }, function(result) {
            _this.getOrderList(_this.data.dataType);
          });
        }
      }
    });
  },

  /**
   * 确认收货
   */
  receipt: function(e) {
    let _this = this;
    let order_id = e.currentTarget.dataset.id;
    wx.showModal({
      title: "提示",
      content: "确认收到商品？",
      success: function(o) {
        if (o.confirm) {
          App._post_form('user.order/receipt', {
            order_id
          }, function(result) {
            _this.getOrderList(_this.data.dataType);
          });
        }
      }
    });
  },

  /**
   * 发起付款
   */
  payOrder: function(e) {
    let _this = this;
    let order_id = e.currentTarget.dataset.id;

    // 显示loading
    wx.showLoading({
      title: '正在处理...',
    });
    App._post_form('user.order/pay', {
      order_id
    }, function(result) {
      if (result.code === -10) {
        App.showError(result.msg);
        return false;
      }
      // 发起微信支付
      wx.requestPayment({
        timeStamp: result.data.timeStamp,
        nonceStr: result.data.nonceStr,
        package: 'prepay_id=' + result.data.prepay_id,
        signType: 'MD5',
        paySign: result.data.paySign,
        success: function(res) {
          // 跳转到已付款订单
          wx.navigateTo({
            url: '../order/detail?order_id=' + order_id
          });
        },
        fail: function() {
          App.showError('订单未支付');
        },
      });
    }, null, function() {
      wx.hideLoading();
    });
  },

  /**
   * 订单评价
   */
  comment: function(e) {
    let _this = this;
    let order_id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: './comment/comment?order_id=' + order_id,
    })
    console.log(order_id);
  },

  /**
   * 跳转订单详情页
   */
  navigateToDetail: function(e) {
    let order_id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../order/detail?order_id=' + order_id
    });
  },

  onPullDownRefresh: function() {
    wx.stopPullDownRefresh();
  }


});