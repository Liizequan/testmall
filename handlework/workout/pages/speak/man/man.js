// speak/man/man.js
import emotions from './emotions.js'
const recorderManager = wx.getRecorderManager()
const options = {
  sampleRate: 44100,
  numberOfChannels: 1,
  encodeBitRate: 192000,
  format: 'aac',
  frameSize: 50
}
let tempFilePath
let app = getApp();
let audioCtx
Page({
  /**
   * 页面的初始数据
   */
  closeMask() {
    this.setData({
      viewMaskShow: false
    })
  },
  data: {
    onlyforyou:false,
    options: '',
    viewPicUrl: '',
    viewMaskShow: false,
    askshow: true,
    beFocus: false,
    screenHeight: '',
    speakHeight: '',
    emotionHeight: '',
    huishiHeight: '',
    normalHeight: '',
    speakingHeight: '',
    audiosrc: '',
    currentsecond: 0,
    timer: '',
    tempCurrentone: 0,
    tempCurrenttwo: 0,
    currentprogress: 0,
    touching: false,
    fucshow: false,
    huishishow: false,
    caoshow: false,
    emotions: '',
    emotionshow: false,
    inputshow: true,
    scrollHeight: 0,
    value: '',
    //nodes: '<img src="http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/e3/2018new_weixioa02_org.png"></img>',
    nodes: '<img src="https://51favlife.com/file/20200324/0e051ac59adcf5c28c50a2000cefc874.png" style="width:100rpx;height:260px;"/>',
    voice: '<img src="http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/8f/2018new_haha_thumb.png"></img>',
    fromId: '', //用户本人
    toId: '', //聊天对方
    userInfo: '',
    chatlist: '',
    bottom: '',
    normalList: [],
    testnodes: [{
      name: 'img',
      attrs: {
        class: 'div_class',
        style: 'height: 160px;',
        src: "http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/8f/2018new_haha_thumb.png"
      }
    }],
    tempFilePath: '',
    backfromlogin:false
  },
  voicenow(e) {
    audioCtx.setSrc(e.currentTarget.dataset.voiceurl)
    audioCtx.play()
    console.log(e.currentTarget.dataset.voiceurl)
  },
  getitem(e) {
    console.log(e.currentTarget.dataset.url.indexOf('img'))
    if (e.currentTarget.dataset.url.indexOf('img') != -1) {
      if (e.currentTarget.dataset.url.match(/https:\/\/.+\"/)) {
        let imgurl = e.currentTarget.dataset.url.match(/https:\/\/.+\"/)[0].split('"')[0]
        console.log(imgurl)
        this.setData({
          viewPicUrl: imgurl,
          viewMaskShow: true
        })
      }
    }
  },
  getcamera() {
    wx.chooseImage({
      count: 1,
      sourceType: ['camera'],
      success: (res) => {
        wx.showLoading()
        const tempFilePaths = res.tempFilePaths
        this.myuploadfile(tempFilePaths[0], (res) => {
          if (JSON.parse(res).code == 1) {
            // let message = '<img src="' + JSON.parse(res).url + '" style="max-width:100px;max-height:100px;"/>'
            // let message = [{
            //   name: 'img',
            //   attrs: {
            //     style: 'width:100rpx;height:100rpx;',
            //     src: JSON.parse(res).url
            //   }
            // }]
            // return
            let reqBody = {
              type: 'photo',
              message: JSON.parse(res).url
            }
            this.sendmessage(reqBody, (res) => {
              wx.hideLoading()
              if (res.data.code == 1) {
                let forMyList = {
                  create_time: app.formatDate(new Date()),
                  from: this.data.fromId,
                  head: this.data.userInfo.avatarUrl,
                  message: '<img src="' + reqBody.message + '" style="max-width:100px;max-height:100px;"/>',
                  name: this.data.userInfo.nickName,
                  to: this.data.toId,
                  type: "photo"
                }
                this.data.chatlist.push(forMyList)
                this.setData({
                  chatlist: this.data.chatlist
                })
                this.forBottom()
              }
            })
          }
        })
      },
    })
  },
  reverse(text) {
    // create
  },
  getphoto() {
    wx.chooseImage({
      count: 1,
      sourceType: ['album'],
      success: (res) => {
        wx.showLoading()
        const tempFiles = res.tempFiles
        this.myuploadfile(tempFiles[0].path, (res) => {
          if (JSON.parse(res).code == 1) {
            let reqBody = {
              type: 'photo',
              message: JSON.parse(res).url
            }
            this.sendmessage(reqBody, (res) => {
              wx.hideLoading()
              if (res.data.code == 1) {
                let forMyList = {
                  create_time: app.formatDate(new Date()),
                  from: this.data.fromId,
                  head: this.data.userInfo.avatarUrl,
                  message: '<img src="' + reqBody.message + '" style="max-width:100px;max-height:100px;"/>',
                  name: this.data.userInfo.nickName,
                  to: this.data.toId,
                  type: "photo"
                }
                this.data.chatlist.push(forMyList)
                this.setData({
                  chatlist: this.data.chatlist
                })
                this.forBottom()
              }
            })
          }
        })
      },
    })
  },
  myuploadfile(file, callback, errcb = null) {
    // wx.uploadFile({
    //   url: 'http://51favlife.com/index.php?s=/server/index/upload',
    //   filePath: file,
    //   name: 'file',
    //   success(resp) {
    //   }
    // })
    wx.uploadFile({
      url: 'https://qolaxin.gzfloat.com?r=server/upload',
      name: 'file',
      filePath: file,
      header: {
        'content-type': 'multipart/form-data'
      },
      method: 'POST',
      success: (res) => {
        callback(res.data)
        // if(res.data.code==1){
        //   res.data.url
        // }
      },
      fail: (err) => {
        if (errcb) {
          errcb(err)
        }
      }
    })
  },
  fasong(e) {
    this.forBottom()
    if (!e.detail.value) {
      wx.showToast({
        title: '不能发送空信息',
        icon: 'none'
      })
      return
    }
    wx.showLoading()
    let reqBody = {
      type: 'word',
      message: e.detail.value
    }
    this.sendmessage(reqBody, (res) => {
      console.log('word:', res, res.data)
      if (res.data.code == 1) {
        wx.hideLoading()
        this.setData({
          value: '',
          huishishow:false,
          scrollHeight:this.data.screenHeight-this.data.normalHeight
        })
        let forMyList = {
          create_time: app.formatDate(new Date()),
          from: this.data.fromId,
          head: this.data.userInfo.avatarUrl,
          message: reqBody.message,
          name: this.data.userInfo.nickName,
          to: this.data.toId,
          type: "word"
        }
        this.data.chatlist.push(forMyList)
        this.setData({
          chatlist: this.data.chatlist
        })
        this.forBottom()
      }
    })
  },
  inputing(e) {
    this.data.value = e.detail.value
  },
  selectemotion(e) {
    console.log(e.currentTarget.dataset.emotion.url)
    let reqBody = {
      type: 'photo',
      message: e.currentTarget.dataset.emotion.url
    }
    wx.showLoading()
    this.sendmessage(reqBody, (res) => {
      if (res.data.code == 1) {
        let forMyList = {
          create_time: app.formatDate(new Date()),
          from: this.data.fromId,
          head: this.data.userInfo.avatarUrl,
          message: '<img src="' + reqBody.message + '" style="max-width:100px;max-height:100px;"/>',
          name: this.data.userInfo.nickName,
          to: this.data.toId,
          type: "photo"
        }
        this.data.chatlist.push(forMyList)
        this.setData({
          chatlist: this.data.chatlist
        })
        this.forBottom()
        wx.hideLoading()
      }
    })
    // this.setData({
    //   value: this.data.value + e.currentTarget.dataset.emotion.value
    // })
  },
  selectnormal(e) {
    this.setData({
      value: e.currentTarget.dataset.info,
      beFocus: true
    })
  },
  tomanage() {
    wx.navigateTo({
      url: '/pages/speak/managenormalusesentence/managenormalusesentence',
    })
  },
  toaddnormal() {
    wx.navigateTo({
      url: '/pages/speak/new/new',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  masktap() {
    this.setData({
      fucshow: false,
      emotionshow: false,
      huishishow: false,
      scrollHeight: this.data.screenHeight - this.data.normalHeight
    })
    this.forBottom()
  },
  focusing() {
    // wx.onKeyboardHeightChange(res => {
    //   console.log(res.height)
    // })
    // this.setData({
    //   scrollHeight:this.data.screenHeight-this.data.normalHeight
    // })
  },
  shownormal() {
    this.setData({
      fucshow: false,
      emotionshow: false,
      huishishow: !this.data.huishishow
    })
    if(!this.data.huishishow){
      this.setData({
        scrollHeight: this.data.screenHeight - this.data.normalHeight
      })
    }else{
      this.setData({
        scrollHeight: this.data.screenHeight - this.data.huishiHeight
      })
    }
    this.forBottom()
  },
  showfuc() {
    this.setData({
      fucshow: true,
      emotionshow: false,
      huishishow: false,
      scrollHeight: this.data.screenHeight - this.data.speakHeight
    })
    this.forBottom()
    // wx.createSelectorQuery().select('.scrollcon').boundingClientRect(function(rect){
    //   wx.pageScrollTo({
    //     scrollTop: rect.bottom+5000
    //   })
    // }).exec()
  },
  closespeak() {
    this.setData({
      caoshow: false,
      inputshow: true,
      scrollHeight: this.data.screenHeight - this.data.normalHeight
    })
  },
  tospeak() {
    this.setData({
      fucshow: false,
      caoshow: true,
      inputshow: false,
      scrollHeight: this.data.screenHeight - this.data.speakingHeight
    })
    this.forBottom()
  },
  showemotion() {
    this.setData({
      fucshow: false,
      emotionshow: true,
      huishishow: false,
      scrollHeight: this.data.screenHeight - this.data.emotionHeight
    })
    this.forBottom()
  },
  forBottom() {
    this.setData({
      bottom: 'bottom'
    })
  },
  getList() {
    wx.request({
      url: 'https://qolaxin.gzfloat.com?r=server/chatlog',
      data: {
        from: this.data.fromId,
        to: this.data.toId
      },
      method:'POST',
      header:{
        'Content-Type':'application/x-www-form-urlencoded'
      },
      success: (res) => {
        console.log(res, 'ccccccccc')
        if (res.data.code == 1) {
          for (let i in res.data.msg) {
            if (res.data.msg[i].type == 'photo') {
              res.data.msg[i].message = '<img src="' + res.data.msg[i].message + '" style="max-width:100px;max-height:100px;"/>'
            }
          }
          this.setData({
            chatlist: res.data.msg
          })
          this.forBottom()
          console.log(res.data.msg.length)
          wx.hideLoading()
        }
      },
      complete: () => {}
    })
  },
  askforrecord() {
    wx.authorize({
      scope: 'scope.record',
      success: (res) => {
        console.log(res, 22222)
        this.setData({
          askshow: false
        })
      },
      fail: (err) => {
        console.log(err, 1111111)
        this.setData({
          askshow: true
        })
        if (err.errMsg != 'authorize:fail auth deny') {
          wx.showToast({
            title: '你已拒绝此权限',
            icon: 'none'
          })
        }
      }
    })
  },
  onLoad: function(options) {
    this.askforrecord()
    this.data.options = options
    audioCtx = wx.createAudioContext('myAudio')
    wx.getSetting({
      success: (res) => {
        if (!res.authSetting['scope.record']) {
          this.setData({
            askshow: true
          })
        } else {
          this.setData({
            askshow: false
          })
        }
      }
    })
    let user_id = wx.getStorageSync('user_id')
    if (!user_id) {
      wx.navigateTo({
        url: "/pages/login/index"
      })
      this.setData({
        backfromlogin:true
      })
      wx.setStorageSync('frommantologin',true)
    } else {
      this.getDataAfterLogin(this.data.options)
    }
    let info = wx.getSystemInfoSync()
    let height = info.windowHeight
    let width = info.windowWidth
    this.setData({
      emotions: emotions,
      scrollHeight: height - 100 * (width / 750),
      screenHeight: height
    })
    this.data.normalHeight = 100 * (width / 750)
    this.data.speakHeight = (100 + 272) * (width / 750)
    this.data.emotionHeight = (100 + 300) * (width / 750)
    this.data.huishiHeight = (100 + 120 * 4) * (width / 750)
    this.data.speakingHeight = 452 * (width / 750)
  },
  getDataAfterLogin(options) {
    this.setData({
      backfromlogin:false
    })
    //登录后执行代码start
    wx.showLoading()
    let user_id = wx.getStorageSync('user_id')
    console.log(user_id,'iiiiiiiiiiii')
    if (user_id == app.siteInfo.chairmanId) { //客服人员本人
      this.setData({
        fromId: app.siteInfo.chairmanId,
        toId: options.fromId
      })
      console.log(this.data.fromId,this.data.toId,'fffffffff333tttttttt')
      wx.setNavigationBarTitle({
        title: options.name,
      })
      console.log(options, 'ooooooooo')
    } else {
      this.setData({
        fromId: user_id,
        toId: app.siteInfo.chairmanId
      })
      console.log(this.data.fromId, this.data.toId, 'ffffffffftttttttt')
      wx.setNavigationBarTitle({
        title: '客服',
      })
    }
    this.getList()
    this.data.userInfo = wx.getStorageSync('userInfo')
    console.log(this.data.userInfo,'uuuuuuuuu')
    console.log(this.data.userInfo.avatarUrl, 'uuuuuuuuuu')
    this.forws()
    //登录后执行代码end
  },
  forws(){
    app.wsobj = wx.connectSocket({
      url: 'wss://qolaxin.gzfloat.com/wss?user_id=' + wx.getStorageSync('user_id'),
      success: (res) => {
        console.log('链接websocket:' + res)
      },
      fail: (err) => {
        console.log('fail:' + err)
      }
    })
    app.wsobj.onOpen((res) => {
      console.log('打开websocket')
    })
    app.wsobj.onMessage((res) => {
      console.log('新消息：', JSON.parse(res.data).from, this.data.toId, res.from == this.data.toId, JSON.parse(res.data))
      res = JSON.parse(res.data)
      console.log(res.from, this.data.toId)
      if (res.from == this.data.toId) {
        if (res.type == 'word') {
          this.data.chatlist.push(res)
          this.setData({
            chatlist: this.data.chatlist
          })
        } else if (res.type == 'photo') {
          res.message = '<img src="' + res.message + '"style="max-width:100px;max-height:100px;"/>'
          this.data.chatlist.push(res)
          this.setData({
            chatlist: this.data.chatlist
          })
        } else if (res.type == 'voice') {
          this.data.chatlist.push(res)
          this.setData({
            chatlist: this.data.chatlist
          })
        }
        if (res.type != 'ping') {
          this.forBottom()
        }
      }
    })

    app.wsobj.onClose((res) => {
      this.forws()
    })
  },
  shutup() {
    console.log('松手')
    // wx.stopRecord()
    // wx.stopRecord({//stoprecord无法获取临时路径
    //   success(res){
    //     console.log(res,'111111')
    //     wx.uploadFile({
    //       url: 'http://51favlife.com/index.php?s=/server/index/upload',
    //       filePath: res,
    //       name: 'file',
    //       header: {
    //         "Content-Type": "multipart/form-data"
    //       },
    //       formData: {
    //         'user': 'test'
    //       },
    //       success(res) {
    //         console.log(res)
    //       }
    //     })
    //   },
    //   fail:(err)=>{
    // console.log('2222222222', this.data.fromId)
    //   }
    // })
    // // wx.stopRecord()
    // // console.log(this.data.tempFilePath)
    // // clearInterval(this.data.timer)
    // // this.setData({
    // //   currentsecond: 0,
    // //   currentprogress: 0,
    // //   tempCurrentone: 0,
    // //   tempCurrenttwo: 0,
    // //   touching: false
    // // })
    // // wx.uploadFile({
    // //   url: 'https://51favlife.com/index.php?s=/server/index/upload',
    // //   filePath: this.data.tempFilePath,
    // //   name: 'file',
    // //   header: {
    // //     "Content-Type": "multipart/form-data"
    // //   },
    // //   formData: {
    // //     'user': 'test'
    // //   },
    // //   success: (res) => {
    // //     console.log('上传结果', res)
    // //     res = JSON.parse(res.data)
    // //     console.log('上传结果', res, this.data.fromId)
    // //     if (res.code == 1) {
    // //       let data = {
    // //         type: 'voice',
    // //         message: res.url
    // //       }
    // //       let forMyList = {
    // //         create_time: app.formatDate(new Date()),
    // //         from: this.data.fromId,
    // //         head: this.data.userInfo.avatarUrl,
    // //         message: res.url,
    // //         name: this.data.userInfo.nickName,
    // //         to: this.data.toId,
    // //         type: "voice"
    // //       }
    // //       this.sendmessage(data, (res) => {
    // //         console.log(forMyList)
    // //         this.data.chatlist.push(forMyList)
    // //         this.setData({
    // //           chatlist: this.data.chatlist
    // //         })
    // //       })
    // //     }
    // //   }
    // })
    recorderManager.stop()
    clearInterval(this.data.timer)
    this.setData({
      currentsecond: 0,
      currentprogress: 0,
      tempCurrentone: 0,
      tempCurrenttwo: 0,
      touching: false,
      timer:''
    })
    recorderManager.onStop((res) => {
      wx.showLoading()
      this.data.onlyforyou = false
      let timer = setInterval(()=>{
        if (this.data.onlyforyou) {
          wx.hideLoading()
          clearInterval(timer)
        }
      },1000)
      // wx.uploadFile({
      //   url: 'https://51favlife.com/index.php?s=/server/index/upload',
      //   filePath: res.tempFilePath,
      //   name: 'file',
      //   header: {
      //     "Content-Type": "multipart/form-data"
      //   },
      //   formData: {
      //     'user': 'test'
      //   },
      //   success: (res) => {
      //     console.log('上传结果', res)
      //     res = JSON.parse(res.data)
      //     console.log('上传结果', res, this.data.fromId)
      //     if (res.code == 1) {
      //       let data = {
      //         type: 'voice',
      //         message: res.url
      //       }
      //       let forMyList = {
      //         create_time:app.formatDate(new Date()),
      //         from: this.data.fromId,
      //         head: this.data.userInfo.avatarUrl,
      //         message: res.url,
      //         name: this.data.userInfo.nickName,
      //         to: this.data.toId,
      //         type: "voice"
      //       }
      //       this.sendmessage(data, (res) => {
      //         console.log(forMyList)
      //         this.data.chatlist.push(forMyList)
      //         this.setData({
      //           chatlist:this.data.chatlist
      //         })
      //       })
      //     }
      //   }
      // })
      wx.uploadFile({
        url: 'https://qolaxin.gzfloat.com?r=server/upload',
        filePath: res.tempFilePath,
        name: 'file',
        header: {
          "Content-Type": "multipart/form-data"
        },
        formData: {
          'user': 'test'
        },
        success: (res) => {
          res = JSON.parse(res.data)
          if (res.code == 1) {
            let data = {
              type: 'voice',
              message: res.url
            }
            let forMyList = {
              create_time: app.formatDate(new Date()),
              from: this.data.fromId,
              head: this.data.userInfo.avatarUrl,
              message: res.url,
              name: this.data.userInfo.nickName,
              to: this.data.toId,
              type: "voice"
            }
            this.sendmessage(data, (res) => {
              this.data.chatlist.push(forMyList)
              this.setData({
                chatlist: this.data.chatlist
              })
              this.forBottom()
            })
          }
        },
        complete:()=>{
          this.data.onlyforyou = true
        }
      })
    })

  },
  sendmessage(data, success = null) {
    let reqBody = {
      type: data.type,
      from: this.data.fromId,
      to:this.data.toId,
      message: data.message,
      head: this.data.userInfo.avatarUrl,
      name: this.data.userInfo.nickName
    }
    wx.request({
      url: 'https://qolaxin.gzfloat.com?r=server/send',
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: reqBody,
      success: (res) => {
        if (success) {
          success(res)
        }
      }
    })
  },
  touch() {
    if(this.data.timer){
      return
    }
    this.setData({
      touching: true
    })
    recorderManager.start()
    this.startTime()
    // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
    // wx.startRecord({
    //   success: (res) => {
    //     this.data.tempFilePath = res.tempFilePath
    //     console.log(this.data.tempFilePath)
    //     clearInterval(this.data.timer)
    //     this.setData({
    //       currentsecond: 0,
    //       currentprogress: 0,
    //       tempCurrentone: 0,
    //       tempCurrenttwo: 0,
    //       touching: false
    //     })
    //     wx.uploadFile({
    //       url: 'https://51favlife.com/index.php?s=/server/index/upload',
    //       filePath: this.data.tempFilePath,
    //       name: 'file',
    //       header: {
    //         "Content-Type": "multipart/form-data"
    //       },
    //       formData: {
    //         'user': 'test'
    //       },
    //       success: (res) => {
    //         console.log('上传结果', res)
    //         res = JSON.parse(res.data)
    //         console.log('上传结果', res, this.data.fromId)
    //         if (res.code == 1) {
    //           let data = {
    //             type: 'voice',
    //             message: res.url
    //           }
    //           let forMyList = {
    //             create_time: app.formatDate(new Date()),
    //             from: this.data.fromId,
    //             head: this.data.userInfo.avatarUrl,
    //             message: res.url,
    //             name: this.data.userInfo.nickName,
    //             to: this.data.toId,
    //             type: "voice"
    //           }
    //           this.sendmessage(data, (res) => {
    //             console.log(forMyList)
    //             this.data.chatlist.push(forMyList)
    //             this.setData({
    //               chatlist: this.data.chatlist
    //             })
    //           })
    //         }
    //       }
    //     })
    //   }
    // })
  },
  startTime() {
    console.log('222222222')
    this.data.timer = setInterval(() => {
      this.data.tempCurrentone = Number(this.data.tempCurrentone + 1 / 1)
      this.data.tempCurrenttwo = this.data.tempCurrentone
      this.setData({
        currentsecond: (Number(this.data.tempCurrenttwo)).toFixed(),
        currentprogress: this.data.tempCurrentone / 60 * 686
      })
    }, 1000)
  },
  speaking() {
    // recorderManager.start()
    // this.data.timer = setInterval(() => {
    //   this.data.tempCurrentone = Number(this.data.tempCurrentone + 1 / 1)
    //   this.data.tempCurrenttwo = this.data.tempCurrentone
    //   this.setData({
    //     currentsecond: (Number(this.data.tempCurrenttwo)).toFixed(),
    //     currentprogress: this.data.tempCurrentone / 60 * 686
    //   })
    // }, 1000)
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
    this.getnormallanguage()
    if (this.data.backfromlogin&&wx.getStorageSync('user_id')) {
      this.getDataAfterLogin(this.data.options)
    }
  },
  getnormallanguage() {
    wx.request({
      url: 'https://qolaxin.gzfloat.com?r=server/infolist',
      data:{
        user_id:wx.getStorageSync('user_id')
      },
      success: (res) => {
        if (res.data.code == 1) {
          this.setData({
            normalList: res.data.msg
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    app.wsobj.close()
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