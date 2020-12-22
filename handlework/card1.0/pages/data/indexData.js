//index 顶部名片信息
// var userPostData = {
//     userLogo: '../image/index/userLogo.png',
//     userInvestor: '金牌投资人',
//     userComponent:'利好财务',
//     userPosition: '总经理',
//     userName:'陈顺好',
//     userExperience: '有多年金融行业经验，具有丰富的理财业务知识,有多年金融行业经验，具有丰富的理财业务知识,',
//     userPhone: '135 3506 5918',
//     userEmail:'261884421@qq.com',
//     userHeadOffice:'利好财务策划（广州）有限公司',
// }


//index 精选推荐列表

// index order 预约产品
var orderData = [
  {
    id:'1',
    userName: '瑞嘉一号',
    startThrow: '30',//起投金额
    rate: 9.2,//基准利率
    quota: '1120',//额度
    type:'交易所',//类型
    deadline:6,//期限
    method:'季度付息',//付款方式
    administer:'财富金交中心（贵州场外）',//管理人
    turn:'用于补充企业流动资金',//投向
    explain:'市场稀缺短期收益权转让类；发行人经营状况良好；底层资产优质还款来源明确；担保方实力强。',//其他说明
  },
  {
    id: '2',
    userName: '瑞嘉二号',
    startThrow: '30',//起投金额
    rate: 9.2,//基准利率
    quota: '1120',//额度
    type: '交易所',//类型
    deadline: 6,//期限
    method: '季度付息',//付款方式
    administer: '财富金交中心（贵州场外）',//管理人
    turn: '用于补充企业流动资金',//投向
    explain: '市场稀缺短期收益权转让类；发行人经营状况良好；底层资产优质还款来源明确；担保方实力强。',//其他说明
  }
]

// dynamic content 商品详情
var newsProudctData = [
  {//第一条商品详情
    id: 1,
    newsTitle: '“688XXX”将成为最终的科创板股票代将成为最终的科创板股票代码',
    newsAuthor: '利好财务策划有限公司',
    newsTime: '2019.6.5',
    newsAll: '&emsp;&emsp; 据上证报记者获悉，上交所日前发布《关于开展科创板业务第一次全网测试的通知》，对科创板业务第一次全网测试方案进行详细部署，内容包括了参测单位、测试内容、测试数据等多个方面。\n\n &emsp;&emsp; 引人关注的是，在上交所此次公布的测试方案中，对科创板股票代码、申购代码、配号代码均有详细描述。',
    newsSontent: [
      {
        newsId: 1,
        newsSubTitle: '具体来看，以上交所此次新增的两款测试产品为例:\n\n科创板代码',
        newsSubText: '&emsp;&emsp;业内人士表示，全网测试是在真实的生产环境下进行的，理论上说，本轮及以后的测试跟真实的交易环境不应该有明显区别了。\n\n&emsp;&emsp;事实上，不光是在本轮全网测试中演练的产品代码是688打头，在此前的多轮测试中，交易所对测试的产品参数中的产品代码同样沿用的也是688开头。',
        newsSubImg: ''
      },
      {
        newsId: 2,
        newsSubTitle: '上交所证券代码是如何确定的？',
        newsSubText: '&emsp;&emsp;根据《上海证券交易所证券代码分配规则(2009年)》，上交所证券代码采用六位阿拉伯数字编码，取值范围为000000-999999。\n\n&emsp;&emsp;六位代码的前三位为证券种类标识区，其中第一位为证券产品标识，第二位至第三位为证券业务标识，六位代码的后三位为顺序编码区。',
        newsSubImg: '../../image/dynamic/textImg01.png'
      },
      {
        newsId: 3,
        newsSubTitle: '六位阿拉伯数字编码',
        newsSubText: '&emsp;&emsp;除了常见的6开头的A股、9开头的B股之外，上交所国债、指数、回购等均有各自专用的首位代码，具体分配规则如下：',
        newsSubImg: '../../image/dynamic/textImg02.png'
      },
      {
        newsId: 4,
        newsSubTitle: '首位代码',
        newsSubText: '&emsp;&emsp;科创板股票属于A股，首位代码自然确定为“6”。在当前实行的分配规则中，仅有“600XXX”与“601XXX”正在被使用。',
        newsSubImg: ''
      },
      {
        newsId: 5,
        newsSubTitle: '6开头',
        newsSubText: '&emsp;&emsp;申购、配号均属于非交易业务，首位代码确定为“7”。在当前实行的分配规则中，“787”与“789”未被使用。',
        newsSubImg: '../../image/dynamic/textImg03.png',
      }
    ]
  },
  {//第二条商品详情
    id: 2,
    newsTitle: '“688XXX”将成为最终的科创板股票代将成为最终的科创板股票代码',
    newsAuthor: '利好财务策划有限公司',
    newsTime: '2019.6.5',
    newsAll: '&emsp;&emsp;据上证报记者获悉，上交所日前发布《关于开展科创板业务第一次全网测试的通知》，对科创板业务第一次全网测试方案进行详细部署，内容包括了参测单位、测试内容、测试数据等多个方面。\n\n&emsp;&emsp;引人关注的是，在上交所此次公布的测试方案中，对科创板股票代码、申购代码、配号代码均有详细描述。',
    newsSontent: [
      {
        newsId: 1,
        newsSubTitle: '具体来看，以上交所此次新增的两款测试产品为例:\n\n科创板代码',
        newsSubText: '&emsp;&emsp;业内人士表示，全网测试是在真实的生产环境下进行的，理论上说，本轮及以后的测试跟真实的交易环境不应该有明显区别了。\n\n&emsp;&emsp;事实上，不光是在本轮全网测试中演练的产品代码是688打头，在此前的多轮测试中，交易所对测试的产品参数中的产品代码同样沿用的也是688开头。',
        newsSubImg: ''
      },
      {
        newsId: 2,
        newsSubTitle: '上交所证券代码是如何确定的？',
        newsSubText: '&emsp;&emsp;根据《上海证券交易所证券代码分配规则(2009年)》，上交所证券代码采用六位阿拉伯数字编码，取值范围为000000-999999。\n\n&emsp;&emsp;六位代码的前三位为证券种类标识区，其中第一位为证券产品标识，第二位至第三位为证券业务标识，六位代码的后三位为顺序编码区。',
        newsSubImg: '../../image/dynamic/textImg01.png'
      },
      {
        newsId: 3,
        newsSubTitle: '六位阿拉伯数字编码',
        newsSubText: '&emsp;&emsp;除了常见的6开头的A股、9开头的B股之外，上交所国债、指数、回购等均有各自专用的首位代码，具体分配规则如下：',
        newsSubImg: '../../image/dynamic/textImg02.png'
      },
      {
        newsId: 4,
        newsSubTitle: '首位代码',
        newsSubText: '&emsp;&emsp;科创板股票属于A股，首位代码自然确定为“6”。在当前实行的分配规则中，仅有“600XXX”与“601XXX”正在被使用。',
        newsSubImg: ''
      },
      {
        newsId: 5,
        newsSubTitle: '6开头',
        newsSubText: '&emsp;&emsp;申购、配号均属于非交易业务，首位代码确定为“7”。在当前实行的分配规则中，“787”与“789”未被使用。',
        newsSubImg: '../../image/dynamic/textImg03.png',
      }
    ]
  }
]

//ecshop 全部产品列表
var allFineData = [
  {
    userName: '瑞嘉一号',
    degree: 0,//0季度或者1月度
    timeLimit: 12,//产品期限
    seasons: '季度付息',//付息方式
    startThrow: '30',//起投金额
    rate: 9.1,
    quota: '1120',//额度
    redNum: 60, //占有比例60%
  },
  {
    userName: '瑞嘉二号',
    degree: 1,//季度或者月度
    timeLimit: 6,
    seasons: '月度付息',
    startThrow: '10',
    rate: 9.1,
    quota: '120',
    redNum: 40, //占有比例40%
  }, 
  {
    userName: '瑞嘉三号',
    degree: 1,//季度或者月度
    timeLimit: 8,
    seasons: '月度付息',
    startThrow: '25',
    rate: 9.1,
    quota: '820',
    redNum: 45, //占有比例40%
  },
]

//card个人名片
var userCardData = {
  userBg:'../image/card/bg.png',
  userLogo: '../image/index/userLogo.png',
  userName: '陈顺好',
  userInvestor: '金牌投资人',
  userComponent: '利好财务',
  userPosition: '总经理',
  userPosition2:'广东互联网经济执行秘书',
  
  userPosition3:'利众财富金牌理财师',
  userPosition4:'广州浮点科技创始人',
  userPhone: '135 3506 5918',
  userEmail: '261884421@qq.com',
  userHeadOffice: '利好财务策划（广州）有限公司',
  userExperience: '有多年金融行业经验，具有丰富的理财业务知识，熟知各项理财产品，能根据市场变化，和客户个人情况，为其提供个性化服务。\n\n 有多年金融行业经验，具有丰富的理财业务知识，熟知各项理财产品，能根据市场变化，和客户个人情况，为其提供个性化服务。',
}

// dynamic 动态数据
var dynamicData = [
  {
    dynamicTitle:'一边是规模暴增，一边是佣金费率直降，ETF指数...',
    dynamicComponent:'利好财务策划有限公司',
    dynamictime:'2019-05-22'
  },
  {
    dynamicTitle: '中国经济的信心来自哪里',
    dynamicComponent: '利好财务策划有限公司',
    dynamictime: '2019-05-22'
  },
  {
    dynamicTitle: '美股盘中暴跌700点“血流成河”,黄金原油暴涨...',
    dynamicComponent: '利好财务策划有限公司',
    dynamictime: '2019-05-22'
  }, 
  {
    dynamicTitle: '待挖掘的万亿市场',
    dynamicComponent: '利好财务策划有限公司',
    dynamictime: '2019-05-22'
  },
  {
    dynamicTitle: '房产投资热土遭遇严重打击',
    dynamicComponent: '利好财务策划有限公司',
    dynamictime: '2019-05-22'
  },
  {
    dynamicTitle: '一边是规模暴增，一边是佣金费率直降，ETF指数...',
    dynamicComponent: '利好财务策划有限公司',
    dynamictime: '2019-05-22'
  },
  {
    dynamicTitle: '一边是规模暴增，一边是佣金费率直降，ETF指数...',
    dynamicComponent: '利好财务策划有限公司',
    dynamictime: '2019-05-22'
  },
  {
    dynamicTitle: '一边是规模暴增，一边是佣金费率直降，ETF指数...',
    dynamicComponent: '利好财务策划有限公司',
    dynamictime: '2019-05-22'
  }
]




//index 中的今日头条接口
//今日头条完成 "pages/index/index",
// var newsData = 'http://192.168.0.12/api/index/article_tt' //num

//产品推荐完成 "pages/index/index","pages/ecshop/ecshop",
var fineData = 'http://192.168.0.12/api/index/product_mend' //num

//文章详情完成 "pages/dynamic/content/content",
var indexProduct = 'http://192.168.0.12/api/index/article_data'  //id

//全部产品列表完成 "pages/ecshop/ecshop",
var productList = 'http://192.168.0.12/api/index/product_list' //num


//产品详情 "pages/index/order/order"
var useorderData = 'http://192.168.0.12/api/index/product_data' //id

//名片 
var cardData = 'http://192.168.0.12/api/card/card_data' //id

//预约 pages/index/order/order
var addOrderData = 'http://192.168.0.12/api/make/make_add'

// 导出
module.exports = {
  allFineData: allFineData,
  // userPostData: userPostData,
  dynamicData: dynamicData,
  orderData: orderData,
  newsProudctData: newsProudctData,
  userCardData: userCardData,

  // 接口
  // newsData: newsData,
  fineData: fineData,
  indexProduct: indexProduct,
  useorderData: useorderData,
  productList: productList,
  cardData: cardData,
  addOrderData: addOrderData
}