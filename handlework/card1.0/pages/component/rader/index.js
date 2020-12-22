// pages/component/rader/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Array,
      value: ''
    },
    lookCardData: {
      type: Object,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    topAction:0,//默认是时间显示
    index: 0,//表示时间切换信息
    array: ['7', '14', '30'],
    /*
    item:[
      { date:'2019/12/12',list:[
        { userImg: '../../image/tabbar01.png', userName: '林金鹏', time:'16:20', lookCard:'8'},
        { userImg: '../../image/tabbar02.png', userName: '林金鹏', time: '16:20', lookDynamic:'5'},
        { userImg: '../../image/tabbar03.png', userName: '林金鹏', time:'16:20', lookCard:'16'},
        { userImg: '../../image/tabbar04.png', userName: '林金鹏', time: '16:20',  lookDynamic:'10'},
        { userImg: '../../image/tabbar03.png', userName: '林金鹏', time: '16:20', lookOfficial: '16' },
        { userImg: '../../image/tabbar04.png', userName: '林金鹏', time: '16:20', lookProduct: '1' },
        
      ]},
      {
        date: '2019/12/13', list: [
          { userImg: '../../image/tabbar05.png', userName: '林金鹏', time: '16:25', lookCard: '24' },
          { userImg: '../../image/tabbar06.png', userName: '林金鹏', time: '16:25', lookDynamic: '15' },
          { userImg: '../../image/tabbar07.png', userName: '林金鹏', time: '16:25', lookCard: '30' },
          { userImg: '../../image/tabbar08.png', userName: '林金鹏', time: '16:25', lookDynamic: '20' },
        ]
      },

    ],
    */
    // 查看商品， 查看官网，查看名片，查看动态，转发名片，觉得靠谱，咨询产品，拨打电话，复制邮箱
    /*
    lookCardData: { 
      lookProduct: '0', 
      lookOfficial: '0', 
      lookCard: '0', 
      lookDynamic: '0',
      relatCard: '0', 
      proper:'0',
      consult:'0',
      call:'0',
      codeEmail:'0',
    }
    */
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 头部切换
    topTab:function(e){
      console.log(e)
      this.setData({
        topAction:e.currentTarget.dataset.index
      })
      console.log(this.properties.item)
    },
    bindPickerChange(e){
      console.log(e.detail.value)
      this.setData({
        index: e.detail.value
      })
    }
  }
})
