// components/selTab/selTab.js
const app = getApp()
let pages
let cur
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    region: {
      type: Array
    },
    iShow:{
      type:Boolean
    },
    list:{
      type:Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    maskH:0,
    dates: ['今天发布', '三天内', '七天内', '两周内'],
    alls: ['全部', '1公里', '3公里', '5公里'],
    hookIndex: null,
    hooks: [{
        name: '从近到远',
      hook: '√'
      },
      {
        name: '从远到近',
        hook: '√'
      },
      {
        name: '薪资从高到低',
        hook: '√'
      },
      {
        name: '全职/长期',
        hook: '√'
      },
      {
        name: '兼职/短期',
        hook: '√'
      }
    ],
    maskShow: false,
    selWhat: null,
    btnsIndex: 3,
    allSel: 0,
    btns: [],
    areaSel: 0,
    cashList: ['2K以下', '2K-5K', '5K-10K', '10K-12K', '12K-15K'],
    rangeSel: null,
    location: null,
    minSal: '',
    maxSal: '',
    page:1
  },
  lifetimes: {
    attached: function() {
      let info = wx.getSystemInfoSync()
      this.setData({
        location: app.config.selLocat,
        maskH: info.windowHeight - 96 / 750 / info.windowWidth
      })
      pages = getCurrentPages()
      cur = pages[pages.length - 1]
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    minInp(e) {
      this.setData({
        minSal: e.detail.value
      })
    },
    maxInp(e) {
      this.setData({
        maxSal: e.detail.value
      })
    },
    define() {
      this.setData({
        rangeSel: null
      })
    },
    confirm() {
      if (Number(this.data.minSal) && !Number(this.data.maxSal)) {
        app.toa('请填最高月薪')
        return
      } else if (Number(this.data.maxSal) && !Number(this.data.minSal)) {
        app.toa('请填最低月薪')
        return
      } else if (!this.data.location){
        app.toa('请选择城市')
        return
      }
      if (Number(this.data.minSal) && Number(this.data.maxSal) && Number(this.data.maxSal) < Number(this.data.minSal)){
        app.toa('最高月薪不能低于最低月薪')
        return
      }
      this.setData({
        page:0,
        selWhat: null
      })
      cur.setData({
        iteList: []
      })
      this.getList()
    },
    getList(){
      app.get('api-work/index', {
        page:this.data.page,
        city: app.config.selLocat,
        lng: app.config.longitude,
        lat: app.config.latitude,
        create_time: this.data.btnsIndex != null ? (this.data.btnsIndex + 1) : '',
        salary: this.data.rangeSel != null ? (this.getRange(this.data.rangeSel)) : (this.data.minSal ? (this.data.minSal + '-' + this.data.maxSal) : ''),
        region: this.data.areaSel ? this.data.region[this.data.areaSel].id : '',
        distance: this.data.allSel ? this.data.alls[this.data.allSel] : '',
        type: this.data.hookIndex != null ? (this.data.hookIndex + 1) : ''
      }, res => {
        
        this.data.page++
        
        if (res.data.list.length == 0) {
          wx.showToast({
            icon: 'none',
            title: '没有更多了'
          })
          cur.setData({
            noMore:true
          })
          return
        }
        
        cur.setData({
          iteList: [...cur.data.iteList,...res.data.list]
        })
        this.setData({
          selWhat: null
        })
      })
    },
    getRange(index) {
      if (index == 0) {
        return '0-2'
      } else {
        let arr = this.data.cashList[index].split('-')
        let min = arr[0].match(/\d/g)
        let max = arr[1].match(/\d/g)
        return min + '-' + max
      }
    },
    changeLocat() {
      app.navTo('address', {}, 'tab')
    },
    rangeChange(e) {
      if (e.currentTarget.dataset.index==this.data.rangeSel) {
        this.setData({
          rangeSel:null
        })} else {
        this.setData({
          rangeSel: e.currentTarget.dataset.index,
          minSal: '',
          maxSal: ''
        })}
      
    },
    dateChange(e) {
      if (e.currentTarget.dataset.index==this.data.btnsIndex){
        this.setData({
          btnsIndex: null
        })
      }else{
        this.setData({
          btnsIndex: e.currentTarget.dataset.index
        })
      }
      
    },
    areaChange(e) {
      this.setData({
        areaSel: e.currentTarget.dataset.index
      })
    },
    chAll(e) {
      this.setData({
        allSel: e.currentTarget.dataset.index
      })
    },
    choosHook(e) {
      if (e.currentTarget.dataset.index==this.data.hookIndex){
        this.setData({
          hookIndex: null
        })
      }else{
        this.setData({
          hookIndex: e.currentTarget.dataset.index
        })
      }
      
    },
    closeMask() {
      this.setData({
        selWhat: null
      })
    },
    showMask(e) {
      if (this.data.selWhat == e.currentTarget.dataset.index){
        this.setData({
          selWhat:null
        })
      }else{
        this.setData({
          maskShow: true,
          selWhat: e.currentTarget.dataset.index
        })
      }
    }
  }
})