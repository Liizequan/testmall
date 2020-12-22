// pages/perInfo/index.js
const app = getApp()
const date = new Date()
const years = []
const months = []

for (let i = 1990; i <= date.getFullYear(); i++) {
  years.push(i)
}

for (let i = 1; i <= 12; i++) {
  months.push(i)
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    rest:0,
    sex: {
      index: 0,
      array: ['未知', '男', '女']
    },
    years: years,
    year: new Date().getFullYear(),
    months: months,
    month: 1,
    value: [9999, 0],
    pickShow: false,
    phShow: false,
    birth: '',
    pickWho: null,
    workTime: '',
    name: '',
    wechat: '',
    phone: '',
    inpWho: '',
    inpValue: '',
    avatarUrl: ''
  },
  getImg() {
    let _this = this
    wx.chooseImage({
      success: function(res) {
        wx.uploadFile({
          url: app.baseUrl + '?r=api-user/upload',
          filePath: res.tempFilePaths[0],
          name: 'file',
          formData: {
            token: wx.getStorageSync('token')
          },
          success(res) {
            _this.setData({
              avatarUrl: JSON.parse(res.data).url
            })
          }
        })
      },
    })
  },
  saveAll() {
    if (!this.data.birth) {
      app.toa('请选择出生年月') 
      return
    } else if (!this.data.phone) {
      app.toa('请输入联系电话')
      return
    } else if (!this.data.wechat) {
      app.toa('请输入微信/QQ')
      return
    } else if (!this.data.workTime) {
      app.toa('请选择参加工作时间')
      return
    }
    if (this.data.phone.length!=11){
      app.toa('手机号码应为11位')
      return
    }
    app.post('api-user/update', {
      token: wx.getStorageSync('token'),
      nickName: this.data.name,
      gender: this.data.sex.index,
      birthday: this.data.birth,
      phone: this.data.phone,
      wechat: this.data.wechat,
      work_time: this.data.workTime,
      avatarUrl: this.data.avatarUrl
    }, res => {

      if(res.data.code ==1){
        wx.showToast({
          title: '保存成功',
        })
        wx.navigateBack({

        })
      }
      
    })
  },
  del() {},
  saveInp() {
    if (this.data.inpWho == 'name') {
      this.setData({
        name: this.data.inpValue,
        phShow: false,
        inpValue: ''
      })
    } else if (this.data.inpWho == 'phone') {
      if(/^[1][3,4,5,7,8][0-9]{9}$/.test(this.data.inpValue)){
        this.setData({
          phone: this.data.inpValue,
          phShow: false,
          inpValue: ''
        })
      }else{
        wx.showToast({
          title: '手机号有误',
          icon:'none'
        })
      }
    } else if (this.data.inpWho == 'wechat') {
      this.setData({
        wechat: this.data.inpValue,
        phShow: false,
        inpValue: ''
      })
    }
  },
  inp(e) {
    this.setData({
      rest: e.detail.value.split('').length
    })
    this.data.inpValue = e.detail.value
  },
  keep() {},
  closePhone() {
    this.setData({
      phShow: false
    })
  },
  inpPhone(e) {
    this.setData({
      phShow: true,
      inpWho: e.currentTarget.dataset.inpwho
    })
  },
  cancel() {
    this.setData({
      pickShow: !this.data.pickShow
    })
  },
  confirm() {
    if (this.data.pickWho == 'bir') {
      this.setData({
        pickShow: !this.data.pickShow,
        birth: this.data.year + '-' + this.data.month
      })
    } else if (this.data.pickWho == 'work') {
      this.setData({
        pickShow: !this.data.pickShow,
        workTime: this.data.year + '-' + this.data.month
      })
    }

  },
  showDatePk(e) {
    this.setData({
      pickShow: !this.data.pickShow,
      pickWho: e.currentTarget.dataset.who
    })
  },
  bindChange: function(e) {
    const val = e.detail.value
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
      value:val
    })
  },
  sexChange(e) {
    this.setData({
      'sex.index': e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    app.get('api-user/info', {
      token: wx.getStorageSync('token')
    }, res => {
      if (res.statusCode == 200) {
        this.setData({
          avatarUrl: res.data.avatarUrl,
          name: res.data.nickName,
          'sex.index': res.data.gender,
          birth: res.data.birthday,
          phone: res.data.phone,
          wechat: res.data.wechat,
          workTime: res.data.work_time
        })
      } else {
        wx.showModal({
          title: '',
          content: '获取不到数据',
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})