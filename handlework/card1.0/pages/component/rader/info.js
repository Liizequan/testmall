// pages/component/rader/info.js
const app = getApp();
var horst = app.horst.url;
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    client: {
      type: Array,
      value: ''
    },
    listUser:{
      type:Array,
      value:''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    tabbar:0,
    relaysub:false,//群发区域
    userId:'',//用户id，用来指定发信息给该用户
    userInfo:false,//默认客户隐藏
    newClient:[],//用来存储用户的数组
    array:[],//用来存储用户的下表
    photo:'',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tabTap:function(e){

      var index = e.currentTarget.dataset.tab;
      this.setData({
        tabbar: e.currentTarget.dataset.tab
      })

    },
    // 新增群发
    addUser:function(e){
      console.log('显示用户选择框');
      this.setData({
        userInfo:true,
        array: []
      })
      wx.showToast({
        title: '请选择需要群发的客户',
        icon:'none'
      })
    },
      // 如果选中，就将该下标保存，如果取消选中，从保存中的下标取消掉
    switchange:function(e){
      var that = this;
      var index = e.currentTarget.dataset.index;//下标
      var client = that.data.client;//数组
      var newClient = [];//空数组，用来存储渲染数组
      var newUserId = [];//空数组，用来存储用户id
      var array = that.data.array//空数组，用来存储数字

      if (e.detail.value) {
        // 当选中时，将其选中的下标放到空数组中，
        array.push(index)
        that.setData({
          array: array
        })
      } else {
        // 当取消选中时,获取其下标,就对应的下标删除
        var newIndex = array.indexOf(index)
        array.splice(newIndex,1);
        that.setData({
          array: array
        })
      }
      console.log('我是所有的值: ' + array);
      for(var i in array){
        for (var j in client) {
          if (array[i] == j) {//当数组里边的数字与渲染数组的数字对应时，打印数组
            // console.log(array[i])
            newClient.push(client[j])
            newUserId.push(client[j].token)
          }
        }
      }
      console.log(newClient)
      console.log(newUserId)
      that.setData({
        newClient: newClient,
        userId: newUserId
      })
    },
    // 取消选中的人
    deleteSubmit:function(e){
      this.setData({
        userInfo: false
      })

    },
    // 确定选中的人
    submits:function(e){
      this.setData({
        userInfo:false,
        relaysub:true
      })

    },
    // 取消重选
    cancat:function(){

    },
    // 图片添加
    addImg:function(){
      console.log('addimg')
      var that = this;

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
            } else {
              that.setData({
                photo: tempFilePaths
              })
            }
          } else {
            var newPhoto = photo.concat(tempFilePaths);
            if (newPhoto.length > 9) {
              wx.showToast({
                title: '最多发表9张',
                icon: 'none'
              })
            } else {
              that.setData({
                photo: newPhoto
              })
            }
          }
        }
      })
    },
    // 群发提交
    bindFormSubmit:function(e){
      console.log(e);
      var index = e.detail.target.dataset.index;//用来判断时取消还是确定
      var textarea = e.detail.value.textarea;//表示要群发的内容
      var userId = this.data.userId;//用户id

      this.setData({
        relaysub: false,
      })
      if(index == 1){
        console.log('群发')
        wx.showToast({
          title: '群发成功',
        })
       

        // 群发
        var that = this;
        wx.getStorage({
          key: 'token',
          success: function (res) {
            //获取本地token值
            var token = res.data;
            var tempFilePaths = that.data.photo;
            console.log(tempFilePaths)
            var array = [];
            // 发送请求
            var func = function(){
              wx.request({
                // 判断用户是否是理财师
                url: horst + 'api/make/send',
                method: 'POST',
                data: {
                  token: token,
                  content: textarea,
                  image: array,
                  user_id: userId
                },
                header: {
                  'content-type': 'application/x-www-form-urlencoded',
                  'Accept': 'application/json'
                },
                success: res => {
                  console.log(res)
                },
                fail: res => {
                  console.log('网络异常');
                }
              })
            }
            // 有图片
            if (tempFilePaths.length>0){
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
                    console.log('上传成功' + array)
                    if (array.length === tempFilePaths.length){
                      return func()
                    }
                  },
                  fail(res) {
                    console.log('上传失败')
                  }
                })
              }
            }
            else {// 可以没有图片
              return func()
            }
         
            
          }
        })
      }
    }
  }
})
