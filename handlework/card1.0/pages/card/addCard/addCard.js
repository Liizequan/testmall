// pages/card/addCard/addCard.js
const app = getApp();
var horst = app.horst.url;
var cardData = horst + 'api/card/card_data'//读取
var cardUpdate = horst + '/api/card/card_update'//修改
var cardPost = horst + '/api/card/card_post'//增加
// var host = horst + 'public/';//图片地址
Page({

  /**
   * 页面的初始数据
   */
  data: {
    photo:'',//头像
    name: '', //姓名
    station:'',//岗位
    petName: '', //职称1
    petName2: '', //职称2
    petName3: '', //职称3
    petName4: '', //职称4
    phone: '',//电话
    weixin: '', //微信
    email: '', //邮箱
    component:'',//公司
    summary:'',//简介
    signature:'',//个性
    horst: horst +'public/',
    userCard:'',//名片
    token:'',//token值
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(this.data.horst)
    // 名片渲染
    var that = this;
    wx.getStorage({
      key: 'token',
      success: function (res) {
        var token = res.data;
        wx.request({
          url: cardData,
          method: 'POST',
          data: {
            token: token,
          },
          header: {//设置参数内容类型为x-www-form-urlencoded
            'content-type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
          },
          success: res => {
            // console.log(res.data.data)
            //如果该理财师名片是空的，那么临时存储的全局，在添加名片
            that.setData({
              userCard:res.data.data,
              token:token
            })
            // 如果名片为空，就渲染从接口进入的理财师名片
            if(res.data.data==null){
              wx.request({
                url: cardData,
                method: 'POST',
                data: {
                  token: token,
                  id: 1,//这里id是从哪里入口进的id
                },
                success: res => {
                  console.log(res)
                  that.setData({
                    photo: res.data.data.imgurl,//头像
                    name: res.data.data.name, //姓名
                    station: res.data.data.station,//岗位
                    petName: res.data.data.professional, //职称1
                    petName2: res.data.data.professional2, //职称2
                    petName3: res.data.data.professional3, //职称3
                    petName4: res.data.data.professional4, //职称4
                    phone: res.data.data.tel,//电话
                    weixin: res.data.data.weixin, //微信
                    email: res.data.data.email, //邮箱
                    component: res.data.data.userHeadOffice,//公司
                    summary: res.data.data.introduce,//简介
                    signature: res.data.data.signature,//个性
                  })
                }
              })
            } else {//否则直接读取该理财师名片
              that.setData({
                photo: res.data.data.imgurl,//头像
                name: res.data.data.name, //姓名
                station: res.data.data.station,//岗位
                petName: res.data.data.professional, //职称1
                petName2: res.data.data.professional2, //职称2
                petName3: res.data.data.professional3, //职称3
                petName4: res.data.data.professional4, //职称4
                phone: res.data.data.tel,//电话
                weixin: res.data.data.weixin, //微信
                email: res.data.data.email, //邮箱
                component: res.data.data.userHeadOffice,//公司
                summary: res.data.data.introduce,//简介
                signature: res.data.data.signature,//个性
              })
            }

          },
          fail: res => {
            console.log('网络异常');
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
  // 图片上传
  addLogo:function(){
    console.log('添加图片');
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths[0]
        that.setData({
          userHeaderImage: tempFilePaths
        })
        console.log(tempFilePaths)
        //上传图片
        wx.uploadFile({
          url: horst+'api/index/upload', 
          filePath: tempFilePaths,
          name: 'file',
          formData: {
            'userId': 10001
          },
          success(res) {
            console.log('上传成功')
            const data = res.data
            console.log(data);
            //do something
            that.setData({
              photo:data
            })
            console.log(that.data.photo);
          },
          fail(res){
            console.log('上传失败')
          }
        })
      }
    })




  },
  // 姓名
  nameInput:function(e){
    console.log(e.detail.value);
    this.setData({
      name: e.detail.value
    })
  },
  // 职称
  petNameInput:function(e){
    console.log(e.detail.value)
    this.setData({
      petName: e.detail.value
    })
  },
  // 修改或者添加名片
  formSubmit: function (e) {
    // console.log(e)
    var that = this;
    console.log(that.data.userCard)
    //理财师data有就修改，无数据就添加
    var userCard = that.data.userCard;
    if (Object.keys(userCard).length==1){
      console.log('增加')
      // 增加
      wx.request({
        url: cardPost,
        method: 'POST',
        data: {
          token: that.data.token,
          imgurl: that.data.photo,//头像
          name: e.detail.value.name, //姓名
          station: e.detail.value.station,//岗位
          professional: e.detail.value.petName, //职称1
          professional2: e.detail.value.petName2, //职称2
          professional3: e.detail.value.petName3, //职称3
          professional4: e.detail.value.petName4, //职称4
          tel: e.detail.value.phone,//电话
          weixin: e.detail.value.weixin, //微信
          email: e.detail.value.email, //邮箱
          userHeadOffice: e.detail.value.component,//公司
          introduce: e.detail.value.synopsis,//简介
          signature: e.detail.value.signature,//个性
        },
        header: {//设置参数内容类型为x-www-form-urlencoded
          'content-type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        success: res => {
          console.log(res)
          if (res.data.code == 1) {
            wx.showToast({
              title: res.data.msg,
              icon: 'none'
            })
            setTimeout(function () {
              var pages = getCurrentPages();//当前页面栈
              console.log(pages)
              if (pages.length > 1) {
                var beforePage = pages[pages.length - 2];//获取上一个页面实例对象
                console.log(beforePage)
                if (beforePage.route == 'pages/card/card') {
                  beforePage.setData({//如果需要传参，可直接修改A页面的数据，若不需要，则可省去这一步
                    id: res.data.data
                  })
                  // beforePage.changeData();//触发父页面中的方法
                  wx.reLaunch({
                    url: '/pages/card/card',
                  })
                } else {
                  wx.navigateTo({
                    url: '/' + beforePage.route,
                  })
                }
              }
            }, 1000)
          } else {
            wx.showToast({
              title: res.data.msg,
              icon:'none'
            })
          }
        },
        fail: res => {
          console.log('网络异常');
        }
      }) 
    }
    else{
      console.log('修改')
      // 修改
      console.log(that.data.token)//d59f447fcd86d4f2b4897e4f267f7d38
      wx.request({
        url: cardUpdate,
        method: 'POST',
        data: {
          token: that.data.token,
          imgurl: that.data.photo,//头像
          name: e.detail.value.name, //姓名
          station: e.detail.value.station,//岗位
          professional: e.detail.value.petName, //职称1
          professional2: e.detail.value.petName2, //职称2
          professional3: e.detail.value.petName3, //职称3
          professional4: e.detail.value.petName4, //职称4
          tel: e.detail.value.phone,//电话
          weixin: e.detail.value.weixin, //微信
          email: e.detail.value.email, //邮箱
          userHeadOffice: e.detail.value.component,//公司
          introduce: e.detail.value.synopsis,//简介
          signature: e.detail.value.signature,//个性
          id: that.data.userCard.id,
        },
        header: {//设置参数内容类型为x-www-form-urlencoded
          'content-type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        success: res => {
          console.log(res)
          // 添加成功
          if (res.data.code == 1) {
            wx.showToast({
              title: res.data.msg,
              icon: 'none'
            })
            setTimeout(function () {
              var pages = getCurrentPages();//当前页面栈
              console.log(pages)
              if (pages.length > 1) {
                var beforePage = pages[pages.length - 2];//获取上一个页面实例对象
                console.log(beforePage)
                if (beforePage.route == 'pages/card/card') {
                  // beforePage.setData({//如果需要传参，可直接修改A页面的数据，若不需要，则可省去这一步
                  //   id: res.data.data
                  // })
                  // beforePage.changeData();//触发父页面中的方法
                  wx.navigateBack({
                    delta: 1
                  })
                } else {
                  wx.navigateTo({
                    url: '/' + beforePage.route,
                  })
                }
              }
            }, 1000)
          } else {
            wx.showToast({
              title: res.data.msg,
              icon:'none'
            })
          }
        },
        fail: res => {
          console.log('网络异常');
        }
      }) 
    }
  },
})