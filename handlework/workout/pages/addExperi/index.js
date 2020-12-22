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
    start: '',
    end: '',
    staEnd: '',
    sex: {
      index: null,
      array: []
    },
    tempArr:[],
    years: years,
    year: new Date().getFullYear(),
    months: months,
    month: 1,
    value: [9999, 0],
    pickShow: false,
    phShow: false,
    major: '',
    school: '',
    who: null,
    inpValue: null,
    action: null,
    id: null
  },
  showDatePk(e) {
    this.setData({
      pickShow: !this.data.pickShow,
      staEnd: e.currentTarget.dataset.time
    })
  },
  confirm() {
    if (this.data.staEnd == 'start') {
      // if (this.data.year <= this.data.end.split('-')[0]) {
      //   if (this.data.month<= this.data.end.split('-')[1]) {

      //   }else{
      //     wx.showToast({
      //       title: '月份太大',
      //     })
      //   }
      // }else{
      //   wx.showToast({
      //     title: '年份太大',
      //   })
      // }
      this.setData({
        pickShow: !this.data.pickShow,
        start: this.data.year + '-' + this.data.month
      })
    } else if (this.data.staEnd == 'end') {
      // if(this.data.year < this.data.start.split('-')[0]){//结束年份小于开始年份
      //   wx.showToast({
      //     icon: 'none',
      //     title: '年份太小',
      //   })
      //   return
      // } else if (this.data.year == this.data.start.split('-')[0] && this.data.month < this.data.start.split('-')[1]) {//结束月份小于开始月份
      //   wx.showToast({
      //     icon:'none',
      //     title: '月份太小',
      //   })
      //   return
      // }
      this.setData({
        pickShow: !this.data.pickShow,
        // end: (this.data.year > this.data.start.split('-')[0] ? this.data.year : this.data.start.split('-')[0]) + '-' + this.data.month
        end: this.data.year + '-' + this.data.month
      })
    }
  },
  del() {
    wx.showModal({
      title: '删除',
      content: '确认删除吗？',
      success: res => {
        if (res.confirm) {
          app.post('api-education/del', {
            token: wx.getStorageSync('token'),
            id: this.data.id
          }, res => {
            if (res.statusCode == 200) {
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
  saveAll() {
    if (!this.data.school) {
      app.toa('请输入学校名称')
      return
    } else if (!this.data.major) {
      app.toa('请输入专业名称')
      return
    } else if (!this.data.start) {
      app.toa('请选择开始时间')
      return
    } else if (!this.data.end) {
      app.toa('请选择结束时间')
      return
    }else if (!this.checkDate(this.data.start, this.data.end)) {
      app.toa('日期选择有误')
      return
    }
    let api
    let reqBody = {
      token: wx.getStorageSync('token'),
      school: this.data.school,
      education: this.data.tempArr[this.data.sex.index].id,
      major: this.data.major,
      // time: this.data.staEnd
      start_time:this.data.start,
      end_time:this.data.end
    }
    if (this.data.action == 'edit') {
      api = 'api-education/edit'
      reqBody.id = this.data.id

    } else {
      api = 'api-education/add'
    }
    app.post(api, reqBody, res => {
      if (res.data.code == 1) {
        wx.showToast({
          title: '保存成功',
        })
        wx.navigateBack({

        })
      }
    })

  },
  save() {
    if (this.data.who == 'school') {
      this.setData({
        school: this.data.inpValue,
        phShow: false,
        inpValue:''
      })
    } else if (this.data.who == 'major') {
      this.setData({
        major: this.data.inpValue,
        phShow: false,
        inpValue: ''
      })
    }

  },
  inping(e) {
    this.setData({
      inpValue: e.detail.value
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
      who: e.currentTarget.dataset.who
    })
  },
  cancel() {
    this.setData({
      pickShow: !this.data.pickShow
    })
  },
  // confirm() {
  //   this.setData({
  //     pickShow: !this.data.pickShow,
  //     staEnd: this.data.year + '-' + (this.data.month > this.data.year ? this.data.month : this.data.year)
  //   })
  // },
  // showDatePk() {
  //   this.setData({
  //     pickShow: !this.data.pickShow
  //   })
  // },
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
    app.get('api-education/education',{
      token:wx.getStorageSync('token')
    },res=>{
      let sex = this.data.sex
        for(let i in res.data){
         sex.array.push(res.data[i].name)
        }
        this.setData({
          sex:sex,
          tempArr:res.data
        })
    })
    this.setData({
      action: options.str,
      id: JSON.parse(options.params).id
    })
    let title
    if (this.data.action == 'view') {
      title = '教育经历'
    } else if (this.data.action == 'edit') {
      title = '编辑教育经历'
    } else if (this.data.action == 'add') {
      title = '添加教育经历'
      this.setData({
        'sex.index':0
      })
    }
    wx.setNavigationBarTitle({
      title: title
    })
    if (this.data.action == 'edit' || this.data.action == 'view') {
      app.get('api-education/edit', {
        token: wx.getStorageSync('token'),
        id: this.data.id
      }, res => {
        if (res.statusCode == 200) {
          let index
          for(let i in this.data.tempArr){
            if (this.data.tempArr[i].id == res.data.education){
              index = i
              break
            }
          }
          this.setData({
            school: res.data.school,
            major: res.data.major,
            // staEnd: res.data.time,
            start:res.data.start_time,
            end:res.data.end_time,
            'sex.index': index
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