// pages/mine/mineInfo/mineInfo.js
const app = getApp();
var horst = app.horst.url;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',//姓名
    gender:1,
    phone:'',
    impactActive:false,
    impact: { name: '保本保息', value: 1 },
    impactList: [
      { name:'保本保息',value:1},
      { name: '保本+浮动收益',value:2}
    ],
    hazardActive:false,
    hazard: { name: '保守型', value: 4 },
    hazardList: [
      { name: '激进型', value: 1 },
      { name: '平衡型', value: 2 },
      { name: '稳健型', value: 3 }, 
      { name: '保守型', value: 4 }
    ]
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getStorage({
      key: 'token',
      success: function (res) {
        var token = res.data;
        wx.request({
          url: horst +'/api/user/user',
          method: 'POST',
          data: { 
            token:token
          },
          header: {//设置参数内容类型为x-www-form-urlencoded
            'content-type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
          },
          success: res => {
            var data = res.data.data
            // console.log(data)
            // 投资倾向
            var impactList = that.data.impactList
            for(var i in impactList){
              // console.log(impactList[i].value);
              if (impactList[i].value == data.investment){
                that.setData({
                  impact: impactList[i]
                })
              }
            }
            // 风险偏好
            var hazardList = that.data.hazardList
            for (var i in hazardList){
              if (hazardList[i].value == data.risk){
                that.setData({
                  hazard: hazardList[i]
                })
              }
            }
            console.log(data)
            that.setData({
              name: data.name,
              phone: data.tel,
              gender: data.gender
            })
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

  },
  // 姓名
  nameInput:function(e){
    console.log(e)
    this.setData({
      name:e.detail.value
    })
  },
  // 性别
  gender:function(e){
    console.log(e.currentTarget.dataset.index)
    this.setData({
      gender: e.currentTarget.dataset.index
    })
  },
  // 电话
  phoneInput:function(e){
    this.setData({
      phone: e.detail.value
    })
  },
  // 投资倾向
  impactTap:function(){
    this.setData({
      impactActive: !this.data.impactActive
    })
  },
  // 投资倾向数据先择
  impactListTap:function(e){
    var index = e.currentTarget.dataset.index;
    var impactList = this.data.impactList;
    var impact = impactList[index]
    this.setData({
      impact: impact,
      impactActive: !this.data.impactActive
    })
    console.log('投资影响内容修改')
  },
  // 风险偏好
  hazardTap:function(){
    this.setData({
      hazardActive: !this.data.hazardActive
    })
  },
  // 风险偏好数据选择
  hazardListTap:function(e){
    var index = e.currentTarget.dataset.index;
    var hazardList = this.data.hazardList;
    var hazard = hazardList[index]
    this.setData({
      hazard: hazard,
      hazardActive: !this.data.hazardActive
    })
    console.log('内容修改')
  },
  // 保存
  submit:function(e){
    // console.log('保存')
    // console.log(e)
    var that = this;
    wx.getStorage({
      key: 'token',
      success: function (res) {
        console.log(res)
        var token = res.data,
          name = that.data.name,
          gender = that.data.gender,
          phone = that.data.phone,
          investment = that.data.impact.value,
          risk = that.data.hazard.value;
        console.log(gender)
        // 请求预约接口
        var names = (/^[\u4E00-\u9FA5A-Za-z]+$/.test(name));//姓名正则
        var phones = (/^((13[0-9])|(14[0-9])|(15[0-9])|(17[0-9])|(18[0-9]))\d{8}$/.test(phone));//电话正则
        if (names && phones) {
          wx.request({  
            // 保存
            url: horst + 'api/user/user_edit',
            method: 'POST',
            data: {
              token: token,
              name: name,
              gender: gender,
              tel: phone,
              investment: investment,
              risk: risk
            },
            header: {//设置参数内容类型为x-www-form-urlencoded
              'content-type': 'application/x-www-form-urlencoded',
              'Accept': 'application/json'
            },
            success: res => {
              console.log(res)
              // 保存成功返回上一页
              setTimeout(function () {
                wx.navigateBack({
                  dalta: 1
                })
              }, 1500)
            },
            fail: res => {
              console.log('网络异常');
            }
          })
          wx.showToast({
            title: '保存成功'
          })
        } else {
          wx.showToast({
            title: '信息输入错误',
            icon:'none'
          })
        }
      }
    })
  }
})