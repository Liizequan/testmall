// pages/card/card.js
const app = getApp();
var horst = app.horst.url;
var host = horst + 'public';//图片地址
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: 1,
    width: 0,
    look:0,//显示导航
    tarBar:[
      { title: '雷达', img: '../image/leida.png', imgActive: '../image/leidaActive.png'},
      { title: '消息', img: '../image/tabbar01.png', imgActive: '../image/tabbar05.png' },
      { title: '理财师', img: '../image/tabbar04.png', imgActive: '../image/tabbar08.png' },
    ],
    asFinancial: true,//显示隐藏
    // 雷达数据库数据
    item: [],
    // 名片行为
    lookCardData: {
      lookProduct: '0',
      lookOfficial: '0',
      lookCard: '0',
      lookDynamic: '0',
      relatCard: '0',
      call: '0',
      codeEmail: '0',
    },
    // 消息
    client: [
      {
        userLogo: '../../image/tabbar04.png',//用户头像
        userName: 'kuangkuang',//用户名
        time: '2019.6.13',//用户访问时间
        num: 1,//用户访问次数
      },
    ],
    // 客户
    listUser:[],
    // 我的
    userCard: {
      userLogo: '../../image/tabbar01.png',//用户logo
      userName: 'kings',//用户姓名
      userPosition: 'web前端',//用户职称
      userExtend: '../../image/promo.png',//用户推广码
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 滑块
    that.setData({
      height: wx.getSystemInfoSync().windowHeight-20,
      width: wx.getSystemInfoSync().windowWidth,
    })

    wx.setNavigationBarTitle({
      title: '雷达'
    })

    
    wx.getStorage({
      key: 'token',
      success: function(res) {
        //获取本地token值
        var data = res.data;
        console.log(data)
        // 雷达
        wx.request({
          url: horst + 'api/make/leida',
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
            
            var data = res.data.data;
            var lookProduct = [],
                lookOfficial = [],
                lookCard = [],
                lookDynamic = [],
                relatCard = [],
                call = [],
                codeEmail = [];
            for (var i in data){
              for(var j in data[i]){
                if (data[i][j].status == '查看官网') {
                  lookOfficial.push('1')
                  that.setData({
                    'lookCardData.lookOfficial': lookOfficial.length
                  })
                }
                if (data[i][j].status == '查看产品') {
                  
                  lookProduct.push('1')
                  that.setData({
                    'lookCardData.lookProduct': lookProduct.length
                  })
                }
                if (data[i][j].status == '查看名片') {

                  lookCard.push('1')
                  that.setData({
                    'lookCardData.lookCard': lookCard.length
                  })
                }
                if (data[i][j].status == '查看分享') {
                  
                  lookDynamic.push('1')
                  that.setData({
                    'lookCardData.lookDynamic': lookDynamic.length
                  })
                }
                if (data[i][j].status == '转发名片') {
                  
                  relatCard.push('1')
                  that.setData({
                    'lookCardData.relatCard': relatCard.length
                  })
                }
                if (data[i][j].status == '拨打电话') {
                  lookDynamic.push('1')
                  that.setData({
                    'lookCardData.call': call.length
                  })
                } 
                if (data[i][j].status == '复制邮箱') {
                  codeEmail.push('1')
                  that.setData({
                    'lookCardData.codeEmail': codeEmail.length
                  })
                } 
              }
            }
 
            that.setData({
              item:res.data.data
            })
          }
        })

        // 消息
        wx.request({
          url: horst + 'api/make/bindlist',
          method: 'POST',
          data: {
            token: data
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
          },
          success: res => {
            var data = res.data.data;

            that.setData({
              listUser: data,
              client: data
            })
          }
        })


      },
    })

    wx.getStorage({
      key: 'token',
      success: function (res) {
        //获取本地token值
        var token = res.data;
        // 名片
        wx.request({
          url: horst + 'api/card/card_data',
          method: 'POST',
          data: {
            token: token
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
          },
          success: res => {
            var data = res.data.data
            that.setData({
              userCard:data
            })
          }
        })
      },
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // console.log('页面初次渲染完成')call
  },

  look: function () {
    wx.navigateTo({
      url: '/pages/card/look',
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {

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
  onShareAppMessage: function (res) {
    return {
      title: '',
      path: '/pages/index/index'
    } 
  },


  // 名片添加
  back: function () {
    wx.switchTab({
      url: '/pages/card/card'
    })
  },
  // 导航切换
  switchBar: function (e) {
    console.log(e.currentTarget.dataset.index)
    var index = e.currentTarget.dataset.index ;
    this.setData({
      look:index
    })
    if(index==0){
      wx.setNavigationBarTitle({
        title: '雷达'
      })
    }else if (index == 1) {
      wx.setNavigationBarTitle({
        title: '消息'
      })
    }else{
      wx.setNavigationBarTitle({
        title: '理财师'
      })
    }
  }
})