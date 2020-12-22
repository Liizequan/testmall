// pages/dynamic/dynamic.js
// var indexData = require("../data/indexData.js");
const app = getApp();
var horst = app.horst.url;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 滚动
    toView: 'red',
    scrollTop: 100, 
    cardId:'',//用户id
    zhangkai:false,//展开
    zhangIndex:null,

    zanid:'',
    formComment:'',
    comment:null,//表示是否显示
    inputValue:false,
    addShare:false,
    newUrl:false,//新网页
    useDynamicData:[],
    token:'',

    // 组件
    textareas:'',//描述
    photo: '',//头像
    horst: horst,
    horstPublic: horst+'public',
    countPic: 9,//上传图片最大数量
    showImgUrl: "", //路径拼接，一般上传返回的都是文件名，
    uploadImgUrl: horst+'api/make/upimg',//图片的上传的路径
    startNo:true,//点赞或取消
    userId:'',
    licai:false,//判断是否是理财师



  },
  zhangkai:function(e){
    console.log(e)
    var id = e.currentTarget.dataset.id
    var index = e.currentTarget.dataset.index;
    if(index==0){
      // 展开
      this.setData({
        zhangIndex: id,
      })
    }else{
      // 收回
      this.setData({
        zhangIndex: null,
      })
    }
    // this.setData({
    //   zhangIndex:id,
    //   zhangkai: !this.data.zhangkai
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;
  
    that.showData()
    var token = wx.getStorageSync('token');//分享进来的ID
    // 某某查看几次动态
    wx.request({
      // 判断用户是否是理财师
      url: horst + 'api/user/user',
      method: 'POST',
      data: {
        token: token,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      success: res => {
        console.log(res)
        var cardId = res.data.data.id;
        var identity = res.data.data.identity;
        if (identity == 1) {
          that.setData({
            licai: true,
            cardId: cardId
          })
        }
        wx.request({
          // 此处接口是用来表示保存用户进入官网的次数
          url: horst + 'api/make/addleida',
          method: 'POST',
          data: {
            token: token,
            status: 4,//1查看官网  2查看名片  3查看产品  4查看分享  5转发名片  6拨打电话  7复制邮箱 
            card_id: cardId,
          },
          success: res => {
            console.log(res.data)
          },
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
    // this.onLoad();
    var that = this;
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 登录
          that.showData()
          return
        } else {
          // 没登录
          wx.navigateTo({
            url: '/pages/login/login',
          })
        }
      }
    })
    var token = wx.getStorageSync('token');//分享进来的ID
    // 某某查看几次动态
    wx.request({
      // 判断用户是否是理财师
      url: horst + 'api/user/user',
      method: 'POST',
      data: {
        token: token,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      success: res => {
        console.log(res)
        var cardId = res.data.data.id;
        var identity = res.data.data.identity;
        if (identity == 1) {
          that.setData({
            licai: true
          })
        }
      }
    })
  },
  inputTap:function(e){
    console.log('快来发表')
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
    
  },
  // 滚动
  // 滚动到顶部/左边时触发
  upper: function (e) {

  },
  // 滚动到底部/右边时触发	
  lower: function (e) {

  },
  // 滚动时触发
  scroll: function (e) {
    // 滚动高度

  },

  // 使添加动态弹框出现
  shareText:function(e){

    this.setData({
      addShare:true
    })
  },
  // 关闭上传弹框
  close: function () {
    this.setData({
      addShare: false
    })
    console.log(this.data.array)
  },
  think:function(e){
    console.log('阻止冒泡')
  },
  // 文本框
  thinkTap: function (e) {
    this.setData({
      textareas: e.detail.value
    })
    console.log(e);
  },
  // 查看产品详情
  lookBook: function (e) {
   
    this.setData({
      newUrl: true
    })
  },
  // 显示点赞或者评论按钮
  showComment:function(e){

    var id = e.currentTarget.dataset.id
 
    if(this.data.comment == id){
      this.setData({
        comment: null
      })
    } else {
      this.setData({
        comment: id
      })
    }
  },
  // 评论
  commentTap: function () {

    var that = this;
    var formComment = that.data.comment;

    // 评论输入框显示，评论弹框隐藏
    that.setData({
      inputValue: true,
      comment:null,
      formComment: formComment,
    })
  },


  // 评论发表
  formSubmit:function(e){

    var that = this;
    var token = that.data.token
    var comment = that.data.formComment
   
    // 提交内容
    var name = e.detail.value.input;
    // 发表成功就隐藏
    that.setData({
      inputValue: false,
    })
    wx.request({
      url: horst + 'api/make/comment',
      method: 'POST',
      data: {
        token: token,
        share_id: comment,
        content: name
      },
      header: {//设置参数内容类型为x-www-form-urlencoded
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      success: res => {
      
        wx.showToast({
          title: res.data.msg
        })
        that.showData();
      },
      fail: res => {
        console.log('网络异常');
      }
    })

  },
  // 点赞
  goodTap:function(e){
    console.log(e)
    var that = this;
    var token = that.data.token
    var comment = that.data.comment;
    var startNo = that.data.startNo;
    var useDynamicData = that.data.useDynamicData;
    // 点赞获取点赞人的信息，信息有名称，下标 且跟踪页面的变化
    var i = e.currentTarget.dataset.index;
    var zan = { dianzan: true };
    var Dynamics = useDynamicData[i];
    var obj = Object.assign(Dynamics, zan);
    var mText = 'useDynamicData[' + i + ']';
    that.setData({
      [mText]: obj
    })
    console.log(useDynamicData)

    wx.request({
      url: horst + 'api/make/support',
      method: 'POST',
      data: {
        token: token,
        share_id: comment,
      },
      header: {//设置参数内容类型为x-www-form-urlencoded
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      success: res => {
     
        wx.showToast({
          title: '点赞成功'
        })
        that.showData()
        that.setData({
          comment: null,
          startNo: !startNo
        })
      },
      fail: res => {
        console.log('网络异常');
      }
    })
  },
  // 取消点赞
  goodDelete:function(e){
    console.log('取消点赞')
    var that = this;
    var token = that.data.token
    var comment = that.data.comment;
    var useDynamicData = that.data.useDynamicData;
    var startNo = that.data.startNo;
    var cardId = that.data.cardId;
    var id = '';
    var i = e.currentTarget.dataset.index;
    var zan = { dianzan: false };
    var Dynamics = useDynamicData[i];
    var obj = Object.assign(Dynamics, zan);
    var mText = 'useDynamicData[' + i + ']';
    that.setData({
      [mText]: obj
    })
    console.log(useDynamicData)
    // 获取对应的评论
    for (var i in useDynamicData){
      if (useDynamicData[i].id==comment){
        var support = useDynamicData[i].support;
        for(var j in support){
          // 如果是当前用户点过赞就可以取消该点赞过的
          if (cardId === support[j].user_id) {
            // 如果是点过赞的用户就可以取消点赞，如果不点过赞，就显示点赞
            
            var id = support[j].id
            console.log(id)
            wx.request({
              url: horst + 'api/index/delsupport',
              method: 'POST',
              data: {
                token: token,
                id: id,
              },
              header: {//设置参数内容类型为x-www-form-urlencoded
                'content-type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
              },
              success: res => {
                wx.showToast({
                  title: '取消成功',
                  icon:'none'
                })
                that.showData()
                that.setData({
                  comment: null,
                  startNo: !startNo
                })
              },
              fail: res => {
                console.log('网络异常');
              }
            })
          }
        }
      }
    }

    
    
    // 点赞获取点赞人的信息，信息有名称，下标 且跟踪页面的变化
    
    
    /**/
  },
  // 图片上传
  addLogo: function () {

    var that = this;
    // var newPhoto = [];
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        var photo = that.data.photo;
        if (photo.length == 0) {
          if (tempFilePaths.length > 9) {
            wx.showToast({
              title: '最多发表9张',
              icon: 'none'
            })
          }else{
            that.setData({
              photo: tempFilePaths
            })
          }
        }else{
          var newPhoto = photo.concat(tempFilePaths);
          if (newPhoto.length>9){
            wx.showToast({
              title: '最多发表9张',
              icon:'none'
            })
          }else{
            that.setData({
              photo: newPhoto
            })
          }
        }
      }
    })
    // ---------------------
    //   作者：smartsmile2012
    // 来源：CSDN
    // 原文：https://blog.csdn.net/smartsmile2012/article/details/83574529 
    // 版权声明：本文为博主原创文章，转载请附上博文链接！

  },
  // 删除图片
  deleteImg:function(e){

    var that = this;
    var index = e.currentTarget.dataset.index;
    var photo = that.data.photo;
    photo.splice(index,1);
    wx.showModal({
      title: '温馨提示',
      content: '您确定要删除该图片吗？',
      cancelColor: '#999', //取消文字的颜色
      confirmColor: '#333', //确定文字的颜色
      success: function (res) {
        if (res.cancel) {
      
        } else if (res.confirm) {
          that.setData({
            photo: photo
          })
        }
      }
    })
  },
  // 添加立即分享
  allShare:function(){

    var that = this;
    var token = that.data.token;
    var tempFilePaths = that.data.photo;
    var array = [];

    for (var i in tempFilePaths) {
      // 图片上传
      wx.uploadFile({
        url: horst + 'api/index/upimg',
        filePath: tempFilePaths[i],
        name: 'file',
        formData: {
          'userId': 10001
        },
        success(res) {
          const data = res.data
          array.push(data);
          console.log(array)
        },
        fail(res) {
          console.log('上传失败')
        }
      })
    }
    setTimeout(function(){
      console.log(array)
      wx.request({
        // 判断用户是否是理财师
        url: horst + 'api/make/addshare',
        method: 'POST',
        data: {
          token: token,
          content: that.data.textareas,
          image: array
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        success: res => {

          that.setData({
            addShare: false
          })
          wx.showToast({
            title: '分享成功，等待审核...',
            icon:'none'
          })
          that.showData();
        },
        fail: res => {
          console.log('网络异常');
        }
      })
    },2000)
    
    /**/

          // 立即分享
          /*
         
          */

    /*
    if(array == ''){
      console.log('数据不能为空')
      wx.showToast({
        title: '以上不能为空，请重新输入',
        icon:'none'
      })
    }
    */
    /**/
    /*
    wx.request({
      // 判断用户是否是理财师
      url: horst + 'api/make/addshare',
      method: 'POST',
      data: {
        token: token,
        content: that.data.textareas,
        image: that.data.array
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      success: res => {
        console.log(res)
        that.setData({
          addShare: false
        })
      },
      fail: res => {
        console.log('网络异常');
      }
    })
    */
  },
  // 
  closefa:function(){
    this.setData({
      inputValue:false,
      comment:null
    })
  },
  // 删除评论
  deleteComment:function(e){

    var that = this;
    var index = e.currentTarget.dataset.index;
    var cardId = that.data.cardId;
    var id = e.currentTarget.dataset.id;
    console.log(index)
    if (cardId == index) {
      wx.showModal({
        content: '确定删除该评论么？',
        success: res => {
          if (res.cancel) {

          } else if (res.confirm) {

            wx.request({
              url: horst + 'api/index/delcomment',
              method: 'POST',
              data: {
                id: id
              },
              header: {//设置参数内容类型为x-www-form-urlencoded
                'content-type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
              },
              success: res => {

                if (res.data.code == 1) {
                  wx.showToast({
                    title: '删除成功',
                    icon: 'none'
                  })
                  that.showData();
                } else {
                  wx.showToast({
                    title: '删除失败',
                  })
                }
              },
              fail: res => {
                console.log('网络异常');
              }
            })
          }
        },
        fail: res => {
        }
      })
    }
  },
  deleteList:function(e){
    var that = this;
    var id = e.currentTarget.dataset.id;
    // 如果是评论的人才有权限删除
    var cardId = that.data.cardId;

    wx.showModal({
      title: '温馨提示',
      content: '您确定要删除该分享吗？',
      cancelColor: '#999', //取消文字的颜色
      confirmColor: '#333', //确定文字的颜色
      success: function (res) {
        if (res.cancel) {
          //点击取消

        } else if (res.confirm) {
          //点击确定
          wx.request({
            url: horst + 'api/index/delshare',
            method: 'POST',
            data: { id: id },
            header: {//设置参数内容类型为x-www-form-urlencoded
              'content-type': 'application/x-www-form-urlencoded',
              'Accept': 'application/json'
            },
            success: res => {
              console.log(res)

              that.showData();
            },
            fail: res => {
              console.log('网络异常');
            }
          })
        }
      }
    })
  },



  // 页面加载函数
  showData:function(){
    var that = this;
    wx.getStorage({
      key: 'token',
      success: function (res) {
        //获取本地token值
        var token = res.data;
        that.setData({
          token: res.data
        })
        wx.request({
          url: horst + 'api/make/getShare',
          method: 'POST',
          data: { token: token },
          header: {//设置参数内容类型为x-www-form-urlencoded
            'content-type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
          },
          success: res => {
            that.setData({
              useDynamicData: res.data.data
            })
            var cardId = that.data.cardId;
            var useDynamicData = res.data.data
            for (var i in useDynamicData) {
              var support = useDynamicData[i].support;
              for (var j in support){
                // console.log(support[j])
                // 如果含有点赞，就显示
                if (cardId === support[j].user_id) {
                  console.log('点赞')
                  var zan = {dianzan:true};
                  var Dynamics = useDynamicData[i];
                  var obj = Object.assign(Dynamics, zan);
                  // console.log(obj)
                  // that.setData({
                  //   zanid:j,
                  //   [useDynamicData[i]]: obj
                  // })
                  var mText = 'useDynamicData[' + i + ']';
                  that.setData({
                    [mText]: obj
                  })
                }else{
                  console.log('取消点赞')
                  var zan = { dianzan: false };
                  var Dynamics = useDynamicData[i];
                  var obj = Object.assign(Dynamics, zan);
                  // console.log(obj)
                  // that.setData({
                  //   zanid: j,
                  //   [useDynamicData[i]]: obj
                  // })
                  var mText = 'useDynamicData[' + i + ']';
                  that.setData({
                    [mText]: obj
                  })
                }
              }
            }
            console.log(that.data.useDynamicData)
          },
          fail: res => {
            console.log('网络异常');
          }
        })

        // api / make / getShare 参数token
        


      }
    })
  },
})