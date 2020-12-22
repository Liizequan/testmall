// pages/perInfo/index.js
const app = getApp()
const date = new Date()
const years = []
const months = []

for (let i = 2; i <= 20; i++) {
  years.push(i)
}

for (let i = 2; i <= 20; i++) {
  months.push(i)
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    sex: {
      index: 0,
      array: ['全职/长期', '兼职/短期']
    },
    years: years,
    year: 2,
    months: months,
    month: 2,
    value: [0, 0],
    pickShow: false,
    phShow: false,
    cash: '',
    action: null,
    posi: '',
    location: '',
    id: null,
    inpValue:null
  },
  toPosi() {
    // app.navTo('searchPosi')
    this.setData({
      phShow:true
    })
  },
  del() {
    wx.showModal({
      title: '删除',
      content: '确认删除吗？',
      success:res=>{
        if(res.confirm){
          app.post('api-hope/del', {
            token: wx.getStorageSync('token'),
            id: this.data.id
          }, res => {
            if (res.data.code == 1) {
              wx.showToast({
                title: '删除成功',
              })
              wx.navigateBack()
            }
          })
        }
      }
    })
    
  },
  save(){
    this.setData({
      posi:this.data.inpValue,
      phShow:false,
      inpValue:''
    })
  },
  saveAll() {
    if(!this.data.posi){
      app.toa('请输入职位')
      return
    } else if (!this.data.location){
      app.toa('请选择工作地点')
      return
    } else if (!this.data.cash) {
      app.toa('请选择期望薪资')
      return
    }
    let api, reqBody = {
      token: wx.getStorageSync('token'),
      name: this.data.posi,
      min_salary: this.data.year,
      max_salary: this.data.month,
      region: this.data.location,
      type: this.data.sex.index==0?10:20
    }
    if (this.data.action == 'view') {
      api = 'api-hope/edit'
      reqBody.id = this.data.id
    } else if (this.data.action == 'add') {
      api = "api-hope/add"
    }
    app.post(api, reqBody, res => {
      if(res.data.code ==1){
        wx.navigateBack()
      }
    })
  },
  toLocat() {
    app.navTo('address',{},'posi')
  },
  keep() {},
  closePhone() {
    this.setData({
      phShow: false
    })
  },
  inp(e){
    this.data.inpValue = e.detail.value
  },
  inpPhone() {
    this.setData({
      phShow: true
    })
  },
  cancel() {
    this.setData({
      pickShow: !this.data.pickShow
    })
  },
  confirm() {
    this.setData({
      pickShow: !this.data.pickShow,
      cash: this.data.year + 'k-' + this.data.month + 'k'
    })
  },
  showDatePk() {
    this.setData({
      pickShow: !this.data.pickShow
    })
  },
  bindChange: function(e) {
    const val = e.detail.value
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]] > this.data.years[val[0]] ? this.data.months[val[1]] : this.data.years[val[0]],
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
    // wx.onWindowResize(function(e){
    //   console.log(e)
    //   wx.showToast({
    //     title: e.size,
    //     icon:'none'
    //   })
    // })
    this.setData({
      action: JSON.parse(options.params).action,
      id: options.str
    })
    if (this.data.action == 'view') {
      app.get('api-hope/edit', {
        token: wx.getStorageSync('token'),
        id: options.str
      }, res => {
        if (res.statusCode == 200) {
          this.setData({
            posi: res.data.name,
            location: res.data.region,
            cash: res.data.min_salary + 'k-' + res.data.max_salary + 'k',
            'sex.index': res.data.type == 10 ? 0 : 1
          })
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function(options) {},

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