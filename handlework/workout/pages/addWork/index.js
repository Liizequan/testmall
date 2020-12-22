// pages/perInfo/index.js
const app = getApp()
const date = new Date()
const years = []
const months = []

for (let i = 1970; i <= 2019; i++) {
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
    sex: {
      index: 0,
      array: ['硕士', '本科', '大专']
    },
    years: years,
    year: new Date().getFullYear(),
    months: months,
    month: 1,
    value: [9999, 0],
    pickShow: false,
    phShow: false,
    staEnd: '',
    start: '',
    end: '',
    inpWho: '',
    company: '',
    depart: '',
    position: '',
    content: '',
    inpValue: '',
    action: null,
    id:null
  },
  toInput(){
    app.navTo('workContent',{action:this.data.action},this.data.content)
  },
  saveAll() {
    if (!this.data.company){
      app.toa('请输入公司名称')
      return
    } else if (!this.data.depart){
      app.toa('请输入所在部门')
      return
    }
    else if (!this.data.position){
      app.toa('请输入职位')
      return
    } else if (!this.data.content){
      app.toa('请输入工作内容')
      return
    } else if (!this.data.start){
      app.toa('请选择开始时间')
      return
    }else if(!this.data.end){
      app.toa('请选择结束时间')
      return
    } else if (!this.checkDate(this.data.start, this.data.end)) {
      app.toa('日期选择有误')
      return
    }
    let api, reqBody = {
      token: wx.getStorageSync('token'),
      company: this.data.company,
      department: this.data.depart,
      work: this.data.position,
      content: this.data.content,
      begin_time: this.data.start,
      end_time: this.data.end
    }
    if(this.data.action=='add'){
      api = 'api-experience/add'
    }else if(this.data.action=='edit'){
      api ='api-experience/edit'
      reqBody.id=this.data.id
    }
    app.post(api, reqBody, res => {
      if (res.data.code == 1) {
        wx.navigateBack({

        })
      }
    })
  },
  checkDate(start, end) {
    let staY, staM, endY, endM
    staY = start.split('-')[0]
    staM = start.split('-')[1]
    endY = end.split('-')[0]
    endM = end.split('-')[1]
    if (staY > endY || (staY == endY && staM > endM)) {
      return false
    } else {
      return true
    }
  },
  del() {
    wx.showModal({
      title: '删除',
      content: '确认删除吗？',
      success:res=>{
        if(res.confirm){
          app.post('api-experience/del',{
            token:wx.getStorageSync('token'),
            id:this.data.id
          },res=>{
            if(res.data.code == 1){
              wx.navigateBack({
                
              })
            }
          })
        }
      }
    })
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
  inpChang(e) {
    this.setData({
      inpValue: e.detail.value
    })
  },
  save() {
    if (this.data.inpWho == 'company') {
      this.setData({
        company: this.data.inpValue,
        inpValue: ''
      })
    } else if (this.data.inpWho == 'depart') {
      this.setData({
        depart: this.data.inpValue,
        inpValue: ''
      })
    } else if (this.data.inpWho == 'position') {
      this.setData({
        position: this.data.inpValue,
        inpValue: ''
      })
    } else if (this.data.inpWho == 'content') {
      this.setData({
        content: this.data.inpValue,
        inpValue: ''
      })
    }
    this.setData({
      phShow: false
    })
  },
  confirm() {
    if (this.data.staEnd == 'start') {
      this.setData({
        pickShow: !this.data.pickShow,
        start: this.data.year + '-' + this.data.month
      })
    } else if (this.data.staEnd == 'end') {
      this.setData({
        pickShow: !this.data.pickShow,
        // end: (this.data.year > this.data.start.split('-')[0] ? this.data.year : this.data.start.split('-')[0]) + '-' + this.data.month
        end: this.data.year + '-' + this.data.month
      })
    }
  },
  showDatePk(e) {
    this.setData({
      pickShow: !this.data.pickShow,
      staEnd: e.currentTarget.dataset.time
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
    this.setData({
      action: options.str,
      id: JSON.parse(options.params).id
    })
    if (this.data.action != 'add') {
      app.get('api-experience/edit', {
        token: wx.getStorageSync('token'),
        id: this.data.id
      }, res => {
        if(res.statusCode == 200){
          this.setData({
            company:res.data.company,
            depart:res.data.department,
            position:res.data.work,
            content:res.data.content,
            start:res.data.begin_time,
            end:res.data.end_time
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