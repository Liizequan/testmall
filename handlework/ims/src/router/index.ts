import Vue from "vue";
import VueRouter from "vue-router";

/*登录*/
const Login = () => import("../views/user/Login.vue");
/*找回*/
const Forget = () => import("../views/user/Forget.vue");
const Modify = () => import("../views/user/modify.vue");
/*注册*/
const Register = () => import("../views/user/Register.vue");

/*工作台*/

/*首页*/
const Index = () => import("@/views/workBench/Index.vue");

/*公告栏*/
const Notice = () => import("@/views/workBench/Notice.vue");
const NoticeAdd = () => import("@/views/workBench/noticeChild/Add.vue");
const NoticeDetails = () => import("@/views/workBench/noticeChild/Details.vue");

/*邮箱*/
const Email = () => import("@/views/workBench/Email.vue");
const EmailAdd = () => import("@/views/workBench/emailChild/Add.vue"); //添加
const Emaildetails = () => import("@/views/workBench/emailChild/Details.vue"); //详情
const EmailSendOutDetails = () => import("@/views/workBench/emailChild/SendOutDetails.vue"); //发送

/*备忘录*/

const Memorial = () => import("@/views/workBench/Memorial.vue");
const MemorialAdd = () => import("@/views/workBench/memorialChild/Add.vue"); //添加
const MemorialDetails = () => import("@/views/workBench/memorialChild/Details.vue"); //详情

/*日历*/
const Calendar = () => import("@/views/workBench/Calendar.vue");
const CalendarMonth = () => import("@/views/workBench/calendarChild/Month.vue"); //月
const CalendarWeek = () => import("@/views/workBench/calendarChild/Week.vue"); //周
const CalendarDay = () => import("@/views/workBench/calendarChild/Day.vue"); //日

/*人事行政*/
const Staff = () => import('@/views/personAdmin/Staff.vue')//员工
const StaffLink = () => import('@/views/personAdmin/staffLink.vue')//员工通讯录
const StaffAdd = () => import('@/views/personAdmin/staffChild/Add.vue')//员工添加
const StaffDetails = () => import('@/views/personAdmin/staffChild/Details.vue')//员工详情

/*员工关系*/
const Relation = () => import('@/views/personAdmin/Relation.vue')//员工关系
const BecomeAdd = () => import('@/views/personAdmin/relationBecome/Add.vue')//员工转正申请
const BecomeDetails = () => import('@/views/personAdmin/relationBecome/Details.vue')//员工转正申请
const QuitAdd = () => import('@/views/personAdmin/relationQuit/Add.vue')//员工转正申请
const QuitDetails = () => import('@/views/personAdmin/relationQuit/Details.vue')//员工转正申请

/*绩效考核*/
const Achieve = () => import('@/views/personAdmin/Achieve.vue')//绩效
const AchieveAdd = () => import('@/views/personAdmin/achieveChild/Add.vue')//添加绩效
const AchieveDetails = () => import('@/views/personAdmin/achieveChild/Details.vue')//绩效进行详情

/*职位架构*/
const Position = () => import('@/views/personAdmin/Position.vue')//职位架构

const Organize = () => import('@/views/personAdmin/organize.vue')//组织架构

/*工作汇报*/
const Workreport = () => import("@/views/workReport/Report.vue"); //工作汇报
const ReportAdd = () => import("@/views/workReport/reportChild/Add.vue"); //汇报添加
const ReportDetails = () => import("@/views/workReport/reportChild/Details.vue"); //汇报添加


/*聊天*/
const Chat = () => import('@/views/chat.vue')//消息聊天


/*测试*/
const Home = () => import("@/views/home/Home.vue");
const Home1 = () => import("@/views/home/child/Home1.vue");
const Home2 = () => import("@/views/home/child/Home2.vue");
const Home3 = () => import("@/views/home/child/Home3.vue");
const About = () => import("@/views/about/About.vue");
const AllOrder = () => import("@/views/business/allOrder.vue");
const OrderMana = () => import("@/views/business/orderMana.vue");
const Contract = () => import("@/views/business/contract.vue");
const contractincheck = () => import("@/views/business/contractincheck.vue");
const MakeReq = () => import("@/views/business/makeReq.vue");
const ArriConf = () => import("@/views/business/arriConf.vue");
const BusiDistr = () => import("@/views/business/busiDistr.vue");
const BusiGuide = () => import("@/views/business/busiGuide.vue");
const MarkActiv = () => import("@/views/business/markActiv.vue");
const NewOrder = () => import("@/views/business/newOrder.vue");
const OrderDetl = () => import("@/views/business/orderDetl.vue");
const ContractDetl = () => import("@/views/business/contractDetl.vue");
const NewContract = () => import("@/views/business/newContract.vue");
const NewBusi = () => import("@/views/business/newBusi.vue");
const BusiDetl = () => import("@/views/business/busiDetl.vue");
const NewConf = () => import("@/views/business/newConf.vue");
const ArriDetl = () => import("@/views/business/arriDetl.vue");
const SheetSys = () => import("@/views/sheetSys/sheetSys.vue");
const mySheet = () => import("@/views/sheetSys/mySheet.vue");
const sheetCheckByMe = () => import("@/views/sheetSys/sheetCheckByMe.vue");
const NewSheet = () => import("@/views/sheetSys/newSheet.vue");
const SheetDetl = () => import("@/views/sheetSys/sheetDetl.vue");
const CheckCenter = () => import("@/views/checkCenter/checkCenter.vue");
const InCheckCenter = () => import("@/views/checkCenter/inCheckCenter.vue");
const InCheckCenterUp = () => import("@/views/checkCenter/inCheckCenterUp.vue");
const InCheckCenterCheck = () => import("@/views/checkCenter/inCheckCenterCheck.vue");
const inCheckCenterCheckShare = () => import("@/views/checkCenter/inCheckCenterCheckShare.vue");
const checkOver = () => import("@/views/checkCenter/checkOver.vue");
const myHot = () => import("@/views/checkCenter/myHot.vue");
const undersCheck = () => import("@/views/checkCenter/undersCheck.vue");


const NewNormal = () => import("@/views/checkCenter/newNormal.vue");
//======
const debitDetl = () => import("@/views/checkCenter/debitDetl.vue");
const holidayDetl = () => import("@/views/checkCenter/holidayDetl.vue");
const newDebit = () => import("@/views/checkCenter/newDebit.vue");
const newHoliday = () => import("@/views/checkCenter/newHoliday.vue");
const newOutside = () => import("@/views/checkCenter/newOutside.vue");
const newOvertime = () => import("@/views/checkCenter/newOvertime.vue");
const newReimb = () => import("@/views/checkCenter/newReimb.vue");
const newTravel = () => import("@/views/checkCenter/newTravel.vue");
const normalDetl = () => import("@/views/checkCenter/normalDetl.vue");
const outsideDetl = () => import("@/views/checkCenter/outsideDetl.vue");
const overtimeDetl = () => import("@/views/checkCenter/overtimeDetl.vue");
const reimbDetl = () => import("@/views/checkCenter/reimbDetl.vue");
const travelDetl = () => import("@/views/checkCenter/travelDetl.vue");
const contact = () => import("@/views/market/contact.vue");
const newEmail = () => import("@/views/market/newEmail.vue");
const newContact = () => import("@/views/market/newContact.vue");
const message = () => import("@/views/market/message.vue");
const Viewpoint = () => import("@/views/custom/viewpoint.vue");
const UndersCus = () => import("@/views/custom/undersCus.vue");

const newMessage = () => import("@/views/market/newMessage.vue");
const commission = () => import("@/views/money/commission.vue");
const goodDetl = () => import("@/views/money/goodDetl.vue");
const members = () => import("@/views/money/members.vue");
const store = () => import("@/views/money/store.vue");
const wageSheet = () => import("@/views/money/wageSheet.vue");
const statistics = () => import("@/views/money/statistics.vue");
const customMana = () => import("@/views/custom/customMana.vue");
const newCustom = () => import("@/views/custom/newCustom.vue");
const cusDetl = () => import("@/views/custom/cusDetl.vue");
//=======审批中心中的意见和评论start
const inReport = () => import('@/views/checkCommand/Report.vue');
const inRelation = () => import('@/views/checkCommand/Relation.vue');
const inArriConf = () => import('@/views/checkCommand/arriConf.vue');
const inAchieve = () => import('@/views/checkCommand/Achieve.vue');
const inAllOrder = () => import('@/views/checkCommand/allOrder.vue');
const shareDocu = () => import('@/views/checkCommand/shareDocu.vue');
const docuincheck = () => import('@/views/checkCommand/docuincheck.vue');
//============审批中心中的意见和评论end
//文档库start
const myDocu = () => import('@/views/document/myDocu.vue');
const undersDocu = () => import('@/views/document/undersDocu.vue');
const vPointDocu = () => import('@/views/document/vPointDocu.vue');
const publicDocu = () => import('@/views/document/publicDocu.vue');
const deepPublic = () => import('@/views/document/deepPublic.vue');
//文档库end

Vue.use(VueRouter);

const routes = [
  {
    path: "/myDocu",
    name: "我的文档库",
    component: myDocu
  },
  {
    path: "/undersDocu",
    name: "我下属的文档",
    component: undersDocu
  },
  {
    path: "/vPointDocu",
    name: "我关注的文档",
    component: vPointDocu
  },
  {
    path: "/publicDocu",
    name:"公共文件夹",
    component: publicDocu,
    children:[
      {
        path: "deepPublic",
        name: "文件夹",
        component: deepPublic
      }
    ]
  },
  {
    path: "/",
    redirect: "/index"
  },
  // 首页
  {
    path: "/index",
    name: "index",
    component: Index
  },
  // 消息、聊天
  {
    path: '/chat',
    name: '聊天',
    component: Chat,
    meta: {
      keepAlive: true
    }
  },
  // 公告栏
  {
    path: "/notice",
    name: "公告栏",
    component: Notice,
    children: [
      {
        path: "add",
        name: "新建公告",
        component: NoticeAdd,
        parent: '公告栏'
      },
      {
        path: "detail/:detail_Id",
        name: "公告详情",
        component: NoticeDetails
      }
    ]
  },
  // 备忘录
  {
    path: "/memorial",
    name: "备忘录",
    component: Memorial,
    children: [
      {
        path: "add",
        name: "新建备忘",
        component: MemorialAdd
      },
      {
        path: "detail/:detail_Id",
        name: "备忘详情",
        component: MemorialDetails
      }
    ]
  },
  // 邮箱
  {
    path: "/email",
    name: "邮箱",
    component: Email,
    children: [
      {
        path: "add",
        name: "新建邮箱",
        component: EmailAdd
      },
      {
        path: "detail/:detail_Id",
        name: "邮箱详情",
        component: Emaildetails
      },
      {
        path: "sendout/:sendout_Id",
        name: "发送邮箱详情",
        component: EmailSendOutDetails
      }
    ]
  },
  // 日历
  {
    path: "/calendar",
    name: "日历日程",
    component: Calendar,
    // children: [
    //   {
    //     path: "",
    //     // redirect: "month"
    //   },
    //   {
    //     path:'month',
    //     name: "月程",
    //     component:CalendarMonth,
    //   },
    //   {
    //     path:'week',
    //     name: "周程",
    //     component:CalendarWeek,
    //   },
    //   {
    //     path:'day',
    //     name: "日程",
    //     component:CalendarDay,
    //   }
    // ]
  },
  // 工作汇报
  {
    path: "/report",
    name: "工作汇报",
    component: Workreport,
    children: [
      {
        path: "add",
        name: "新增汇报",
        component: ReportAdd
      },
      {
        path: "detail/:detail_Id",
        name: "汇报详情",
        component: ReportDetails
      }
    ]
  },
  //审批中心中的意见和评论start
  {
    path: "/inReport",
    name: "工作汇报",
    component: inReport,
    children: [
      // {
      //   path: "add",
      //   name: "新增汇报",
      //   component: ReportAdd
      // },
      // {
      //   path: "detail/:detail_Id",
      //   name: "汇报详情",
      //   component: ReportDetails
      // }
    ]
  },
  {
    path:'/shareDocu',
    name:'分享文档',
    component:shareDocu
  },{
    path:'/docuincheck',
    name:'文档类',
    component:docuincheck
  },
  {
    path: '/inRelation',
    name: '转正/离职',
    component: inRelation,
    children: [
      {
        path: 'becomeadd',
        name: '转正申请',
        component: BecomeAdd
      },
      {
        path: 'becomedetail',
        name: '转正详情',
        component: BecomeDetails
      },
      {
        path: 'quitadd',
        name: '离职申请',
        component: QuitAdd
      },
      {
        path: 'quitdetail',
        name: '离职详情',
        component: QuitDetails
      },

    ]
  },
  {
    path: "/inArriConf",
    name: "客户回款",
    component: inArriConf,
    children: [
      {
        path: "newConf",
        name: "新建到账确认",
        component: NewConf
      },
      {
        path: "arriDetl",
        name: "到账确认详情",
        component: ArriDetl
      }
    ]
  },
  {
    path: '/inAchieve',
    name: '绩效考核',
    component: inAchieve,
    children: [
      {
        path: 'add',
        name: '新建考核',
        component: AchieveAdd,
      },
      {
        path: 'detail/:detail_Id',
        name: '考核进行中',
        component: AchieveDetails,
      }
    ]
  },
  {
    path: "/inAllOrder",
    name: "订单审核",
    component: inAllOrder,
    children: [
      {
        path: "orderDetl",
        name: "订单详情",
        component: OrderDetl
      },
      {
        path: "newOrder",
        name: "订单",
        component: NewOrder
      }
    ]
  },
  //审批中心中的意见和评论end
  {
    path: '/staffLink',
    name: '员工通讯录',
    component: StaffLink
  },
  // 人事行政
  {
    path: '/staff',
    name: '员工信息/合同管理',
    component: Staff,
    children: [
      {
        path: 'add',
        name: '员工添加',
        component: StaffAdd
      },
      {
        path: 'detail/:detail_Id',
        name: '员工详情',
        component: StaffDetails
      }
    ]
  },
  // 员工关系
  {
    path: '/relation',
    name: '转正/离职',
    component: Relation,
    children: [
      {
        path: 'becomeadd',
        name: '转正申请',
        component: BecomeAdd
      },
      {
        path: 'becomedetail',
        name: '转正详情',
        component: BecomeDetails
      },
      {
        path: 'quitadd',
        name: '离职申请',
        component: QuitAdd
      },
      {
        path: 'quitdetail',
        name: '离职详情',
        component: QuitDetails
      },

    ]
  },
  // 绩效考核
  {
    path: '/achieve',
    name: '绩效考核',
    component: Achieve,
    children: [
      {
        path: 'add',
        name: '新建考核',
        component: AchieveAdd,
      },
      {
        path: 'detail/:detail_Id',
        name: '考核进行中',
        component: AchieveDetails,
      }
    ]
  },
  // 职位架构
  {
    path: '/position',
    name: '职位管理',
    component: Position
  }, {
    path: '/organize',
    name: '组织架构',
    component: Organize
  },

  {
    path: "/home",
    name: "首页",
    component: Home,
    children: [
      {
        path: "home1",
        name: "首页1",
        component: Home1
      },
      {
        path: "home2",
        name: "首页2",
        component: Home2
      },
      {
        path: "home3",
        name: "首页3",
        component: Home3
      }
    ]
  },
  {
    path: "/about",
    name: "about",
    component: About
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/register",
    name: "register",
    component: Register
  },
  {
    path: "/forget",
    name: "forget",
    component: Forget
  },
  {
    path: "/modify",
    name: "修改密码",
    component: Modify
  },
  {
    path: "/OrderMana",
    name: "订单管理",
    component: OrderMana,
    children: [
      {
        path: "orderDetl",
        name: "订单详情",
        component: OrderDetl
      },
      {
        path: "newOrder",
        name: "订单",
        component: NewOrder
      }
    ]
  },
  {
    path: "/allOrder",
    name: "全部订单",
    component: AllOrder,
    children: [
      {
        path: "orderDetl",
        name: "订单详情",
        component: OrderDetl
      },
      {
        path: "newOrder",
        name: "订单",
        component: NewOrder
      }
    ]
  },
  {
    path: "/contract",
    name: "合同",
    component: Contract,
    children: [
      {
        path: "newContract",
        name: "新建合同",
        component: NewContract
      },
      {
        path: "contractDetl",
        name: "合同详情",
        component: ContractDetl
      }
    ]
  },
  {
    path: "/contractincheck",
    name: "合同审核",
    component: contractincheck,
    children: [
      {
        path: "newContract",
        name: "新建合同",
        component: NewContract
      },
      {
        path: "contractDetl",
        name: "合同详情",
        component: ContractDetl
      }
    ]
  },
  {
    path: "/makeReq",
    name: "立项申请",
    component: MakeReq,
    children: [
      {
        path: "newBusi",
        name: "立项",
        component: NewBusi
      },
      {
        path: "busiDetl",
        name: "立项详情",
        component: BusiDetl
      }
    ]
  },
  {
    path: "/arriConf",
    name: "客户回款",
    component: ArriConf,
    children: [
      {
        path: "newConf",
        name: "新建到账确认",
        component: NewConf
      },
      {
        path: "arriDetl",
        name: "到账确认详情",
        component: ArriDetl
      }
    ]
  },
  {
    path: "/busiDistr",
    name: "业务分派",
    component: BusiDistr
  },
  {
    path: "/busiGuide",
    name: "业务指南",
    component: BusiGuide
  },
  {
    path: "/markActiv",
    name: "市场活动",
    component: MarkActiv
  },
  {
    path: "/sheetSys",
    name: "我派发的",
    component: SheetSys,
    children: [
      {
        path: "sheetDetl",
        name: "工单详情",
        component: SheetDetl
      }
    ]
  },{
    path: "/mySheet",
    name: "我接收的",
    component: mySheet,
    children: [
      {
        path: "sheetDetl",
        name: "工单详情",
        component: SheetDetl
      }
    ]
  },{
    path: "/sheetCheckByMe",
    name: "工作单",
    component: sheetCheckByMe,
    children: [
      {
        path: "sheetDetl",
        name: "工单详情",
        component: SheetDetl
      }
    ]
  },
  
  {
    path: "/newSheet",
    name: "新建工作单",
    component: NewSheet,
  },
  {
    path: "/undersCheck",
    name: "待我审批",
    component: undersCheck,
  }, {
    path: "/myHot",
    name: "我的分享审批",
    component: myHot,
  }, {
    path: "/checkOver",
    name: "已办结审批",
    component: checkOver,
  },
  {
    path: "/checkCenter",
    name: "待办审批",
    component: CheckCenter,
    children: [
      {
        path: "newNormal",
        name: "新建普通审批",
        component: NewNormal
      },
      {
        path: "newDebit",
        name: "新建借支审批",
        component: newDebit
      },
      {
        path: "newHoliday",
        name: "新建请假审批",
        component: newHoliday
      },
      {
        path: "newOutside",
        name: "新建出差审批",
        component: newOutside
      },
      {
        path: "newOvertime",
        name: "新建加班审批",
        component: newOvertime
      },
      {
        path: "newReimb",
        name: "新建差旅报销审批",
        component: newReimb
      },
      {
        path: "newTravel",
        name: "新建外勤审批",
        component: newTravel
      },
      {
        path: "debitDetl",
        name: "借支审批详情",
        component: debitDetl
      },
      {
        path: "holidayDetl",
        name: "请假审批详情",
        component: holidayDetl
      },
      {
        path: "normalDetl",
        name: "普通审批详情",
        component: normalDetl
      },
      {
        path: "outsideDetl",
        name: "出差审批详情",
        component: outsideDetl
      },
      {
        path: "overtimeDetl",
        name: "加班审批详情",
        component: overtimeDetl
      },
      {
        path: "reimbDetl",
        name: "报销审批详情",
        component: reimbDetl
      },
      {
        path: "travelDetl",
        name: "外勤审批详情",
        component: travelDetl
      }
    ]
  },
  {
    path: "/inCheckCenter",
    name: "新建审批",
    component: InCheckCenter,
    children: [
      {
        path: "newNormal",
        name: "新建普通审批",
        component: NewNormal
      },
      {
        path: "newDebit",
        name: "新建借支审批",
        component: newDebit
      },
      {
        path: "newHoliday",
        name: "新建请假审批",
        component: newHoliday
      },
      {
        path: "newOutside",
        name: "新建出差审批",
        component: newOutside
      },
      {
        path: "newOvertime",
        name: "新建加班审批",
        component: newOvertime
      },
      {
        path: "newReimb",
        name: "新建差旅报销审批",
        component: newReimb
      },
      {
        path: "newTravel",
        name: "新建外勤审批",
        component: newTravel
      },
      {
        path: "debitDetl",
        name: "借支审批详情",
        component: debitDetl
      },
      {
        path: "holidayDetl",
        name: "请假审批详情",
        component: holidayDetl
      },
      {
        path: "normalDetl",
        name: "普通审批详情",
        component: normalDetl
      },
      {
        path: "outsideDetl",
        name: "出差审批详情",
        component: outsideDetl
      },
      {
        path: "overtimeDetl",
        name: "加班审批详情",
        component: overtimeDetl
      },
      {
        path: "reimbDetl",
        name: "报销审批详情",
        component: reimbDetl
      },
      {
        path: "travelDetl",
        name: "外勤审批详情",
        component: travelDetl
      }
    ]
  },
  {
    path: "/inCheckCenterUp",
    name: "我提交的审批",
    component: InCheckCenterUp,
    children: [
      {
        path: "newNormal",
        name: "新建普通审批",
        component: NewNormal
      },
      {
        path: "newDebit",
        name: "新建借支审批",
        component: newDebit
      },
      {
        path: "newHoliday",
        name: "新建请假审批",
        component: newHoliday
      },
      {
        path: "newOutside",
        name: "新建出差审批",
        component: newOutside
      },
      {
        path: "newOvertime",
        name: "新建加班审批",
        component: newOvertime
      },
      {
        path: "newReimb",
        name: "新建差旅报销审批",
        component: newReimb
      },
      {
        path: "newTravel",
        name: "新建外勤审批",
        component: newTravel
      },
      {
        path: "debitDetl",
        name: "借支审批详情",
        component: debitDetl
      },
      {
        path: "holidayDetl",
        name: "请假审批详情",
        component: holidayDetl
      },
      {
        path: "normalDetl",
        name: "普通审批详情",
        component: normalDetl
      },
      {
        path: "outsideDetl",
        name: "出差审批详情",
        component: outsideDetl
      },
      {
        path: "overtimeDetl",
        name: "加班审批详情",
        component: overtimeDetl
      },
      {
        path: "reimbDetl",
        name: "报销审批详情",
        component: reimbDetl
      },
      {
        path: "travelDetl",
        name: "外勤审批详情",
        component: travelDetl
      }
    ]
  },
  {
    path: "/inCheckCenterCheck",
    name: "新建审批",
    component: InCheckCenterCheck,
    children: [
      {
        path: "newNormal",
        name: "新建普通审批",
        component: NewNormal
      },
      {
        path: "newDebit",
        name: "新建借支审批",
        component: newDebit
      },
      {
        path: "newHoliday",
        name: "新建请假审批",
        component: newHoliday
      },
      {
        path: "newOutside",
        name: "新建出差审批",
        component: newOutside
      },
      {
        path: "newOvertime",
        name: "新建加班审批",
        component: newOvertime
      },
      {
        path: "newReimb",
        name: "新建差旅报销审批",
        component: newReimb
      },
      {
        path: "newTravel",
        name: "新建外勤审批",
        component: newTravel
      },
      {
        path: "debitDetl",
        name: "借支审批详情",
        component: debitDetl
      },
      {
        path: "holidayDetl",
        name: "请假审批详情",
        component: holidayDetl
      },
      {
        path: "normalDetl",
        name: "普通审批详情",
        component: normalDetl
      },
      {
        path: "outsideDetl",
        name: "出差审批详情",
        component: outsideDetl
      },
      {
        path: "overtimeDetl",
        name: "加班审批详情",
        component: overtimeDetl
      },
      {
        path: "reimbDetl",
        name: "报销审批详情",
        component: reimbDetl
      },
      {
        path: "travelDetl",
        name: "外勤审批详情",
        component: travelDetl
      }
    ]
  },
  {
    path: "/inCheckCenterCheckShare",
    name: "抄送我审批",
    component: inCheckCenterCheckShare,
    children: [
      {
        path: "newNormal",
        name: "新建普通审批",
        component: NewNormal
      },
      {
        path: "newDebit",
        name: "新建借支审批",
        component: newDebit
      },
      {
        path: "newHoliday",
        name: "新建请假审批",
        component: newHoliday
      },
      {
        path: "newOutside",
        name: "新建出差审批",
        component: newOutside
      },
      {
        path: "newOvertime",
        name: "新建加班审批",
        component: newOvertime
      },
      {
        path: "newReimb",
        name: "新建差旅报销审批",
        component: newReimb
      },
      {
        path: "newTravel",
        name: "新建外勤审批",
        component: newTravel
      },
      {
        path: "debitDetl",
        name: "借支审批详情",
        component: debitDetl
      },
      {
        path: "holidayDetl",
        name: "请假审批详情",
        component: holidayDetl
      },
      {
        path: "normalDetl",
        name: "普通审批详情",
        component: normalDetl
      },
      {
        path: "outsideDetl",
        name: "出差审批详情",
        component: outsideDetl
      },
      {
        path: "overtimeDetl",
        name: "加班审批详情",
        component: overtimeDetl
      },
      {
        path: "reimbDetl",
        name: "报销审批详情",
        component: reimbDetl
      },
      {
        path: "travelDetl",
        name: "外勤审批详情",
        component: travelDetl
      }
    ]
  },
  {
    path: "/contact",
    name: "客户通讯录",
    component: contact,
    children: [
      {
        path: "newContact",
        name: "新建联系人",
        component: newContact
      },
      {
        path: "newEmail",
        name: "新建邮件",
        component: newEmail
      }
    ]
  },
  {
    path: "/message",
    name: "短信计划",
    component: message,
    children: [
      {
        path: "newMessage",
        name: "短信",
        component: newMessage
      }
    ]
  },
  {
    path: "/undersCus",
    name: "我下属的客户",
    component: UndersCus
  },
  {
    path: "/viewpoint",
    name: "我关注的客户",
    component: Viewpoint
  },
  {
    path: "/commission",
    name: "业绩提成",
    component: commission
  },
  {
    path: "/store",
    name: "行政仓库",
    component: store,
    children: [
      {
        path: "goodDetl",
        name: "物品详情",
        component: goodDetl
      }
    ]
  },
  {
    path: "/wageSheet",
    name: "工资单",
    component: wageSheet,
    children: [
      {
        path: "members",
        name: "财务人员",
        component: members
      }
    ]
  },
  {
    path: "/statistics",
    name: "业绩提成",
    component: statistics
  },
  {
    path: "/customMana",
    name: "客户管理",
    component: customMana,
    children: [
      {
        path: "newCustom",
        name: "新增~编辑客户",
        component: newCustom
      },
      {
        path: "cusDetl",
        name: "客户详情",
        component: cusDetl
      }
    ]
  }
];

const router = new VueRouter({
  // mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
