// 1. 角色数据获取
const roleData = 'role/api';
// 2. 角色添加
const roleAdd = 'role/add';
// 3. 角色列表
const roleList = 'role/index';

// 4. 登录
const userLogin = 'login';
// 5. 退出登录
const userLogout = 'logout';
// 6. 全部已读
const allRead = 'notice/set';
// 7. 通知列表 (没完成)
const noticeList = 'notice/index';

// 8. 管理员添加
const adminAdd = 'admin/add';
// 9. 管理员列表
const adminList = 'admin/index';
// 10.查看管理员
const adminLook = 'admin/look';
// 11.编辑管理员
const adminEdit = 'admin/edit';
// 12.删除管理员
const adminDelete = 'admin/del';

// 13.查看角色
const roleLook = 'role/look';
// 14.编辑角色
const roleEdit = 'role/edit';
// 15.删除角色
const roleDelete = 'role/del';

// 16.订单添加（未完成）
const orderAdd = 'order/add';
// 17.订单选项数据
const orderData = 'index/data';
// 18.全部订单
const orderIndex = 'order/index';
// 19.进行中的订单
const orderGoing = 'order/going';
// 20.完成的订单
const orderGood = 'order/type?status=6';
// 21.异常的订单
const orderAbnormal = 'order/type?status=7';
// 22.取消的订单
const orderCancel = 'order/type?status=8'
// 23.草稿的订单
const orerDraft = 'order/draft'
// 24.订单查询
const orderSearch = 'order/search';
// 25.订单导出
const orderExport = 'order/export';
// 26.订单上传
const orderUpload = 'order/load';
// 27.订单确认完成//6
const orderConfirm = 'order/updatestatus';
// 28.上传回单
const orderFile = 'order/backfile';
// 29.关闭订单//8
const orderClose = 'order/updatestatus';
// 30.订单详情
const orderDetail = 'order/look';
// 31.标记订单异常//7
const signBnormal = 'order/updateerror';
// 32.改变订单状态//10
const updatestatus = 'order/updatestatus'


// 33.地址
const region = 'index/region';
// 34.新建客户
const userAdd = 'user/add';
// 35.客户列表
const userList = 'user/index';
// 36.集团客户
const userGroup = 'user/type?type=2';
// 37.个人客户
const userMysel = 'user/type?type=1';
// 38.搜索客户
const userSearch = 'user/search';
// 39.导出客户
const userExport = 'user/export';
// 40.获取客户详情
const userLook = 'user/look';
// 41.删除客户
const userDelete = 'user/del';
// 42.删除客户附件
const userDelfile = 'user/delfile';
// 43.编辑客户
const userEdit = 'user/edit';

// 44.新建承运商
const carrierAdd = 'carrier/add';
// 45.承运商列表
const carrierList = 'carrier/index';
// 46.承运商集团
const carrierGroup = 'carrier/type?type=2';
// 47.承运商个人
const carrierMysel = 'carrier/type?type=1';
// 48.承运商搜索
const carrierSearch = 'carrier/search';
// 49.获取承运商详情
const carrierLook = 'carrier/look';
// 50.删除承运商
const carrierDelete = 'carrier/del';
// 51.编辑承运商
const carrierEdit = 'carrier/edit';
// 52.导出承运商
const carrierExport = 'carrier/export';

// 53.付款列表
const payIndex = 'pay/index';
// 54.付款搜索
const paySearch = 'pay/search';
// 55.已付列表
const paid = 'pay/pay';
// 56.预约列表
const advance = 'pay/wait';
// 57.账单异常
const payError = 'pay/error';


// 58.收支统计一年
const budgetYear = 'data/budgetyear';
// 59.收支最近六个月
const budgetSixMonth = 'data/budgetsixmonth';
// 60.收支最近一个月
const budgetMonth = 'data/budgetmonth';
// 61.收支最近一周
const budgetWeek = 'data/budgetweek';
// 62.获取首页其他数据
const indexMain = 'index/main';

// 63.数据统计
const dataIndex = 'data/index';
// 64.数据统计一年
const datagetYear = 'data/orderyear';
// 65.数据统计六个月
const ordergetsixMonth = 'data/ordersixmonth';
// 66.数据统计最近一个月
const ordergetMonth = 'data/ordermonth';
// 67.数据统计最近一周
const ordergetWeek = 'data/orderweek';
// 68.数据收支一年
const statisYear  ='data/budgetyear';
// 69.数据收支六个月
const statisSixMonth = 'data/budgetsixmonth';
// 70.数据收支一个月
const statisMonth = 'data/budgetmonth';
// 71.数据收支一周
const statisWeek = 'data/budgetweek';

// 72.付款列表导出
const payAdd = 'pay/add';
// 73.付款详情
const payLook = 'pay/look';
// 74.上传凭证
const orderfile = 'order/orderfile';

// 75.收款列表
const receiveIndex = 'receive/index';
const receiveReceived = 'receive/received';
const receivePre = 'receive/pre';
const receiveType = 'receive/type?status=7';
// 76.收款搜索
const receiveSearch = 'receive/search';
// 77.收款详情
const receiveLook = 'receive/look';
// 78.项目负责人
const dataUserlist = 'data/userlist';
// 79.申请支付
const approvalApply = 'approval/apply';
// 80.单条数据导出
const exportOne = 'order/exportone';
// 81.承运商上传凭证
const carrierFile = 'order/carrierfile';


// 82.全部付款
const applyall = 'approval/applyall';
// 83.到账
const orderReceived = 'order/received';
// 84.审批中心
const approvalIndex = 'approval/index'
// 85.未审批
const noApproval = 'approval/type?status=1';
// 86.已审批
const yesApproval = 'approval/type?status=3';
// 87.驳回申请
const ejectApproval = 'approval/type?status=-1'
// 88.我的申请
const myApproval = 'approval/my';
// 89.搜索审批
const approvalSearch = 'approval/search'
// 90.确认审批
const approvalTure = 'approval/sure';
// 91.驳回申请操作
const approvalReject = 'approval/reject';
// 92.一键审批
const approvalAll = 'approval/sureall'
// 93.审批导出
const approvalExport = 'approval/add';

// 94.编辑订单
const orderEdit = 'order/edit';
// 95.更改密码
const changePwd = 'admin/updateinfo'
// 96.订单模板下载
const orderMu = '导入模板.xlsx'
// 97.收发货人
const address = 'address/index';
// 98.财务管理员
const dataFinance ='data/finance';
// 98.经理管理员
const dataManager ='data/manager';
// 99.地址搜索
const searchAdres = 'order/searchaddress'
// 100.经理审批
const sureoneApp = 'approval/sureone';
// 101.财务审批
const suretwoApp = 'approval/suretwo';
// 102.付款发票
const payTax = 'pay/tax';
// 103.收款发票
const receiveTax = 'receive/tax';
// 104.预算1周
const amountWeek = 'amount/week';
// 105.预算1月
const amountMonth = 'amount/month';
// 106.预算6个月
const amountSix = 'amount/six';
// 106.预算1年
const amountYear = 'amount/year';
// 107.待付款
const daiFuk = 'approval/type?status=2';
// 108.订单记忆
const orderSearchUser = 'order/searchuser';
// 109.付款列表导出
const payExport = 'pay/export';
// 110.订单中心的承运商记忆功能
const searchcarrier = 'order/searchcarrier';
// 111.生成月结订单
const createpay = 'pay/createpay';
// 112.月付列表
const monthpayindex = 'pay/monthpayindex';
// 113.月结申请支付
const applymonthpay = 'pay/applymonthpay'
// 114.月结搜索
const monthpaysearch = 'pay/monthpaysearch';
// 115.经理审批
const paySureone = 'pay/sureone';
// 116.财务付款
const paySuretwo = 'pay/suretwo';
// 117.已付款
const payMonthstatus ='pay/monthstatus';
// 118.查看详情
const payMonthlook = 'pay/monthlook';
// 119.月付驳回
const payBackpay = 'pay/backpay';
// 120.生成月收
const receiveCreate= 'receive/create';
// 121.月收列表
const receiveReceivelist = 'receive/receivelist';
// 122.月收详情
const receiveReceivelook = 'receive/receivelook';
// 123.月付导出
const payMonthexport = 'pay/monthexport';
// 124.确认到账
const receiveReceivesure = 'receive/receivesure';
// 125.月收导出
const Receiveexport = 'receive/receiveexport';
// 126.月未收
const receivestatus = 'receive/receivestatus';
// 127.搜索月收
const searchreceive = 'receive/searchreceive';
// 128.月结开发票
const payTaxmonth = 'pay/taxmonth';
// 129.收发票
const receiveTaxmonth = 'receive/taxmonth';
// 130.撤销付款
const canclePay = 'pay/cancel'
// 130.撤销收款
const cancleRecieve = 'receive/cancel'


export default{
    roleData,
    roleAdd,
    roleList,
    userLogin,
    userLogout,
    allRead,
    noticeList,
    adminAdd,
    adminList,
    adminLook,
    adminEdit,
    adminDelete,
    roleLook,
    roleEdit,
    roleDelete,
    orderAdd,
    orderData,
    orderIndex,
    orderGoing,
    orderGood,
    orderAbnormal,
    orderCancel,
    orerDraft,
    orderSearch,
    orderExport,
    orderUpload,
    orderConfirm,
    orderFile,
    orderClose,
    orderDetail,
    signBnormal,
    updatestatus,
    region,
    userAdd,
    userList,
    userGroup,
    userMysel,
    userSearch,
    userExport,
    userLook,
    userDelete,
    userDelfile,
    userEdit,
    carrierAdd,
    carrierList,
    carrierGroup,
    carrierMysel,
    carrierSearch,
    carrierLook,
    carrierDelete,
    carrierEdit,
    carrierExport,
    payIndex,
    paySearch,
    paid,
    advance,
    payError,
    budgetYear,
    budgetSixMonth,
    budgetMonth,
    budgetWeek,
    indexMain,
    dataIndex,
    datagetYear,
    ordergetsixMonth,
    ordergetMonth,
    ordergetWeek,
    statisYear,
    statisSixMonth,
    statisMonth,
    statisWeek,
    payAdd,
    payLook,
    orderfile,
    receiveIndex,
    receiveSearch,
    receiveLook,
    dataUserlist,
    approvalApply,
    exportOne,
    carrierFile,
    applyall,
    orderReceived,
    approvalIndex,
    noApproval,
    yesApproval,
    ejectApproval,
    myApproval,
    approvalSearch,
    approvalTure,
    approvalReject,
    approvalAll,
    approvalExport,
    orderEdit,
    changePwd,
    orderMu,
    address,
    dataFinance,
    dataManager,
    searchAdres,
    sureoneApp,
    suretwoApp,
    payTax,
    receiveTax,
    amountWeek,
    amountMonth,
    amountSix,
    amountYear,
    daiFuk,
    receiveReceived,
    receivePre,
    receiveType,
    orderSearchUser,
    payExport,
    searchcarrier,
    createpay,
    monthpayindex,
    applymonthpay,
    monthpaysearch,
    paySureone,
    paySuretwo,
    payMonthstatus,
    payMonthlook,
    payBackpay,
    receiveCreate,
    receiveReceivelist,
    receiveReceivelook,
    payMonthexport,
    receiveReceivesure,
    Receiveexport,
    receivestatus,
    searchreceive,
    payTaxmonth,
    receiveTaxmonth,
    canclePay,
    cancleRecieve
}