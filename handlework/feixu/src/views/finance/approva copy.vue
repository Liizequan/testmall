<template>
    <div class="all-order payment-finace approva">
        <!-- 我是所有的订单 -->
        <div class="top">
            <ul class="between">
                <li class="items-center">
                    <span>订单号：</span>
                    <p><el-input v-model="approvalSearch.orderNo"></el-input></p>
                </li>
                <li class="items-center">
                    <span>客户名称：</span>
                    <p><el-input v-model="approvalSearch.customer"></el-input></p>
                </li>
                <li class="items-center">
                    <span>司机名称：</span>
                    <p><el-input v-model="approvalSearch.username"></el-input></p>
                </li>
            </ul>
            <ul class="between ptop20">
                <li class="items-center">
                    <span>申请人：</span>
                    <p><el-input v-model="approvalSearch.user"></el-input></p>
                </li>
                <li class="items-center">
                    <span>录单时间：</span>
                    <!-- <p><el-input></el-input></p> -->
                    <p>
                        <el-date-picker
                            v-model="approvalSearch.createTime"
                            style="width:100%"
                            value-format="yyyy-MM-dd" 
                            type="date"
                            placeholder="选择日期">
                        </el-date-picker>
                    </p>
                </li>
                <!-- <li class="items-center">
                    <span>付款方式：</span>
                    <p>
                        <el-select clearable  v-model="approvalSearch.payMethod" slot="prepend" placeholder="请选择" style="width:100%;">
                            <el-option label="网银" value="10"></el-option>
                            <el-option label="现结" value="20"></el-option>
                        </el-select>
                    </p>
                </li> -->
                <li class="items-center">
                    <span>审核时间：</span>
                    <p>
                        <el-date-picker
                            v-model="appTime"
                            type="daterange"
                            style="width:100%"
                            range-separator="至"
                            value-format="yyyy-MM-dd" 
                            @change="chooseTimeRange"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </p>
                </li>
            </ul>
            <!-- <ul class="between ptop20">
            </ul> -->
            <div class="ptop30">
                <el-radio-group v-model="approvalSearch.status">
                    <el-radio label="已完成"></el-radio>
                    <el-radio label="未完成"></el-radio>
                </el-radio-group>
                <div class="btn ptop30">
                    <el-button type="primary" class="btn-elblue" style="width:180px;" @click="searchApproval">查询</el-button>
                </div>
            </div>
        </div>

        <div class="ptop40">
            
            <!-- 头部导航 -->
            <div class="nav-bar">
                <el-tabs v-model="activeName" @tab-click="handleClick" style="padding-left:10px;" >
                    <el-tab-pane label="全部" name="first"></el-tab-pane>
                    <el-tab-pane label="待审核" name="second"></el-tab-pane>
                    <el-tab-pane label="已审核" name="third"></el-tab-pane>
                    <el-tab-pane label="驳回申请" name="fourth"></el-tab-pane>
                    <el-tab-pane label="我的申请" name="fifth"></el-tab-pane>
                </el-tabs>
                <div class="imports">
                    <el-button>一键审批</el-button>
                    <el-button>导出</el-button>
                </div>
            </div>
            <!-- 数据列表 -->
            <el-table  :data="approval" stripe class="table" style="width: 100%">
                <el-table-column  type="selection" width="55">
                </el-table-column>
                <el-table-column  prop="orderNo"  label="申请订单号">
                    <template slot-scope="scope">
                        <p class="colb">{{scope.row.orderNo}}</p>
                    </template>
                </el-table-column>
                <el-table-column  prop="name"  label="起止地">
                    <template slot-scope="scope">
                        <p>{{scope.row.delivery}}</p>
                        <p>至</p>
                        <p>{{scope.row.carry}}</p>
                    </template>
                </el-table-column>
                <el-table-column prop="payMethod" label="付款费用">
                    <template slot-scope="scope">
                        <span>金额：￥{{scope.row.amountPaid}}</span><br>
                        <span>油卡：￥{{scope.row.cardPaid}}</span><br>
                    </template>
                </el-table-column>
                <el-table-column  prop="date"  label="收款人信息">
                    <template slot-scope="scope">
                        <!-- <p><el-link @click="lookDetail(scope.$index, scope.row)">司机 司机姓名 13760012345 粤Y12345</el-link></p> -->
                        <p>
                            {{scope.row.username + scope.row.phone + scope.row.plate}}
                        </p>
                    </template>
                </el-table-column>
                <el-table-column width="130" prop="name"  label="审批状态">
                    <template slot-scope="scope">
                        <el-button
                        :class="scope.row.approvalStatus  == '待审批' ? 'backo': scope.row.approvalStatus  == '已审批' ? 'backb': 'backsl'"
                        >{{scope.row.approvalStatus}}</el-button>
                        <!-- <el-button v-if="sc">待审批</el-button> -->
                        <!-- <el-button style="margin-left:0; margin-top:10px;">已驳回</el-button> -->
                    </template>
                </el-table-column>
                <el-table-column width="130" prop="apply" label="申请人">
                </el-table-column>
                <el-table-column  prop="createTime"  label="申请时间">
                </el-table-column>
                <el-table-column  prop="name"  label="操作">
                    <template slot-scope="scope">
                        <p class="operation" v-if="scope.row.approvalStatus == '待审批'">
                            <el-button type="primary" @click="ApplyTrue(scope.row)" class="btn-elblue">确认审批</el-button> 
                        </p>
                        <p class="operation" v-if="scope.row.approvalStatus == '待审批' || scope.row.approvalStatus == '已审批'">
                            <el-button @click="lookApplyDetail(scope.row)">查看详情</el-button>
                        </p>
                        <p class="operation" v-if="scope.row.approvalStatus !='待审批' && scope.row.approvalStatus !='已审批'">
                            <el-button type="primary" class="btn-elblue" @click="applyReason(scope.$index, scope.row)">再次申请</el-button>
                        </p>
                        <p class="operation" v-if="scope.row.approvalStatus !='待审批' && scope.row.approvalStatus !='已审批'">
                            <el-button @click="lookReason(scope.$index, scope.row)">驳回原因</el-button>
                        </p>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页列表 -->
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[4, 8, 12, 16]"
                :page-size="pageSize"
                :hide-on-single-page="pagin"
                layout="total, sizes, prev, pager, next, jumper"
                background
                class="txt-center ptop40 pbom20"
                style="width:750px"
                :total="approvals.length">
            </el-pagination>
            <!-- 弹框 -->
            <div class="is-dialog">
                <!-- 驳回原因 -->
                <el-dialog
                    :visible.sync="dialogVisible"
                    width="860px"
                    top="80px"
                    center
                    :before-close="handleClose"
                    custom-class="status-dialog"
                    >
                    <div slot="title">
                        <b class="font24">
                            {{statues == '1' ? '请款单' : statues == '4' ? '驳回原因':'审批信息'}}
                        </b>
                        <p><span>项目费用明细请款单 </span></p>
                    </div>
                    <div class="centent">
                        <el-row>
                            <el-col :span="12"><div class="">申请日期：{{appDetail.createTime}}</div></el-col>
                            <el-col :span="12"><div class="">油卡卡号：{{appDetail.cardNumber}}</div></el-col>
                        </el-row>
                        <div class="table mtop30">
                            <el-row class="title">
                                <el-col :span="5"><div class="col-list">所属日期</div></el-col>
                                <el-col :span="5"><div class="col-list">项目名称</div></el-col>
                                <el-col :span="5"><div class="col-list">客户名称</div></el-col>
                                <el-col :span="9"><div class="col-list">起止地</div></el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="5"><div class="col-list">{{appDetail.createTime}}</div></el-col>
                                <el-col :span="5"><div class="col-list">{{appDetail.project}}</div></el-col>
                                <el-col :span="5"><div class="col-list">{{appDetail.customer}}</div></el-col>
                                <el-col :span="9"><div class="col-list">{{appDetail.delivery + '至' + appDetail.carry}}</div></el-col>
                            </el-row>
                        </div>
                        <div class="table mtop20">
                            <el-row class="title items-center">
                                <el-col :span="4"><div class="col-list">本次支付</div></el-col>
                                <el-col :span="20"><div class="col-list">
                                    <div class="money items-center">
                                        <p class="items-center">总运费：<strong class="backorange"> 0000.00</strong>元；</p> 
                                        已付0000元，油卡0000元；还需要支付<span class="backorange">0000.00</span>元
                                    </div>    
                                </div></el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="8"><div class="col-list">支付方式：{{appDetail.payMethod}}</div></el-col>
                                <el-col :span="8"><div class="col-list">付讫方式：{{appDetail.payType}}</div></el-col>
                                <el-col :span="8"><div class="col-list">支付金额：{{appDetail.amountPaid}}</div></el-col>
                                <el-col :span="8"><div class="col-list">油卡支付：{{appDetail.cardPaid}}</div></el-col>
                                <!-- <el-col :span="8"><div class="col-list">共生支付：{{appDetail.createTime}}</div></el-col> -->
                                <el-col :span="8"><div class="col-list">收款人名称：{{appDetail.accountHolder}}</div></el-col>
                                <el-col :span="8"><div class="col-list">银行账号：{{appDetail.bankAccount}}</div></el-col>
                                <el-col :span="8"><div class="col-list">所属银行：{{appDetail.openingBank}}</div></el-col>
                            </el-row>
                        </div>
                        <div class="mtop10 border-bottom table">
                            <el-row class="titles">
                                <el-col :span="statues!=2 ? 6 : 8">
                                    <div class="">项目负责人</div>
                                </el-col>
                                <el-col :span="statues!=2 ? 6 : 8">
                                    <div class="">财务审批</div>
                                </el-col>
                                <el-col :span="statues!=2 ? 6 : 8">
                                    <div class="">经理审批</div>
                                </el-col>
                                <el-col :span="statues!=2 ? 6 : 8" v-if="statues!=2">
                                    <div class="">申请人</div>
                                </el-col>
                            </el-row>
                            <el-row class="titles-list">
                                <el-col :span="statues!=2 ? 6 : 8">
                                    <div class="" v-if="statues!=2">{{appDetail.charge}}</div>
                                    <div v-else>
                                        <el-select v-model="payTanListValue.name" placeholder="请选择">
                                            <el-option
                                            v-for="item in userList"
                                            :key="item"
                                            :label="item"
                                            :value="item">
                                            </el-option>
                                        </el-select>
                                    </div>
                                </el-col>
                                <el-col :span="statues!=2 ? 6 : 8">
                                    <div class="" v-if="statues!=2">{{appDetail.finance}}</div>
                                    <div v-else>
                                        <el-select v-model="payTanListValue.cwapp" placeholder="请选择">
                                            <el-option
                                            v-for="item in userList"
                                            :key="item"
                                            :label="item"
                                            :value="item">
                                            </el-option>
                                        </el-select>
                                    </div>
                                </el-col>
                                <el-col :span="statues!=2 ? 6 : 8">
                                    <div class="" v-if="statues!=2">{{appDetail.manager}}</div>
                                    <div v-else>
                                        <el-select v-model="payTanListValue.jlapp" placeholder="请选择">
                                            <el-option
                                            v-for="item in userList"
                                            :key="item"
                                            :label="item"
                                            :value="item">
                                            </el-option>
                                        </el-select>
                                    </div>
                                </el-col>
                                <el-col :span="statues!=2 ? 6 : 8" v-if="statues!=2">
                                    <div class="">{{appDetail.apply}}</div>
                                </el-col>
                            </el-row>
                        </div>
                        <div class="reject ptop40" v-if="statues == 4">
                            <h4 class="colb">驳回原因：</h4>
                            <p class="ptop20">查不到此单的提货信息无法确定！</p>
                        </div>
                    </div>
                    <div slot="footer" class="dialog-footer" v-if="statues!=1">
                        <div class=" between">
                            <div>
                                <el-button style="width:150px;" type="primary" class="btn-elblue" @click="approvalTure(appDetail)" v-if="statues == 2">确认审批</el-button>
                                <el-button style="width:150px;" type="primary" class="btn-elblue" @click="dialogVisible = false" v-else>重新申请</el-button>
                                <el-button style="width:150px;" @click="dialogVisible = false">关 闭</el-button>
                            </div>
                            <div v-if="statues == 2">
                                <el-button style="width:150px;" class="backo" @click="dialogVisible = false">驳回申请</el-button>
                            </div>
                        </div>
                    </div>
                </el-dialog>
                <!-- 再次申请 -->
                <el-dialog
                    :visible.sync="applyVisible"
                    width="860px"
                    top="100px"
                    center
                    :before-close="handleClose"
                    custom-class="status-dialog"
                    >
                    <div slot="title">
                        <b class="font24">驳回申请</b>
                    </div>
                    <div class="centent">
                        <span>驳回原因：</span>
                        <p class="ptop10">
                            <el-input type="textarea"></el-input>
                        </p>
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button style="width:150px;" type="primary" class="btn-elblue" @click="dialogVisible = false">确 定</el-button>
                        <el-button style="width:150px;" @click="dialogVisible = false">取 消</el-button>
                    </span>
                </el-dialog>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            checkList:[],
            activeName:'first',
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }],

            currentPage:1,
            pagin:true,//是否显示
            payData:[],//页面数据
            payDatas:[],//所有数据
            pageSize:4,//一页的数据

            approvalSearch:{
                orderNo:'',//订单号：
                customer:'',//客户名称
                username:'',//司机名称：
                user:'',//申请人
                createTime:'',//录单时间
                status:'',//状态
                begin:'',//付款开始时间
                end:'',//付款结束时间
            },//搜索条件
            appTime:[],

            dialogVisible:false,//驳回弹框
            applyVisible:false,//再次申请
            statues:1,
            approval:[],//驳回申请列表
            approvals:[],//所有驳回申请列表

            appDetail:{},//情况单信息
            operationStatus:null,//操作状态
            userList:[],
            payTanListValue:{
                name:'',
                cwapp:'',
                jlapp:'',
            },
        }
    },
    created() {
        this.getApprova(this.$api.approvalIndex)
        this.getUser()
    },
    methods: {
        getApprova(url){
            this.$http.get(url,{},res=>{
                console.log(res)
                this.approval = res.data.slice(0,this.pageSize)
                this.approvals = res.data;
                if(res.data.length != 0){
                    this.pagin = false
                }else{
                    this.pagin = true
                }
            })
        },
        getUser(){
            this.$http.get(this.$api.dataUserlist,{},res=>{
                console.log(res)
                this.userList = res.data
            })
        },
        // 查看款单
        lookApplyDetail(val){
            this.appDetail = val
            this.statues = 1
            this.dialogVisible = true
        },
        lookReason(){
            this.dialogVisible = true
            this.statues = 2
        },
        applyReason(){
            this.applyVisible = true
        },
        handleClick(val){
            console.log(val.name)
            if(val.name=='first'){
                console.log('我是全部')
                this.getApprova(this.$api.approvalIndex)
            }else if(val.name == 'second'){
                console.log('我是全部1')
                this.getApprova(this.$api.noApproval)
            }else if(val.name == 'third'){
                console.log('我是全部2')
                this.getApprova(this.$api.yesApproval)
            }else if(val.name == 'fourth'){
                console.log('我是全部3')
                this.getApprova(this.$api.ejectApproval)
            }else{
                console.log('我是全部4')
                this.getApprova(this.$api.myApproval)
            }
        },
        // 搜索审批
        searchApproval(){
            var approvalSearch = this.approvalSearch
            this.$http.post(this.$api.approvalSearch,{
                orderNo:approvalSearch.orderNo,
                customer:approvalSearch.customer,
                username:approvalSearch.username,
                user:approvalSearch.user,
                createTime:approvalSearch.createTime,
                status:approvalSearch.status,
                begin:approvalSearch.begin,
                end:approvalSearch.end,
            },res=>{
                console.log(res)
                if(res.data.length != 0){
                    this.pagin = false
                    this.activeName = 'first'
                    this.approval = res.data.slice(0,this.pageSize)
                    this.approvals = res.data;
                }else{
                    console.log('woyg')
                    this.pagin = true
                    this.$message('暂无搜索到相关审批，请重新搜索')
                }
            })
        },
        ApplyTrue(val){//打开确认弹框
            console.log(val)
            this.appDetail = val
            this.dialogVisible = true
            this.operationStatus = 1
            this.statues = 2
        },
        // 确认审批
        approvalTure(){
            var appDetail = this.appDetail;
            this.$confirm('是否确定对单号：'+appDetail.orderNo+' 的审批', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.post(this.$api.approvalTure,{
                    id:appDetail.id,
                },res=>{
                    console.log(res)
                    this.$message(res.msg)
                    if(res.code ==1){
                        if(this.activeName=='first'){
                            console.log('我是全部')
                            this.getApprova(this.$api.approvalIndex)
                        }else if(this.activeName == 'second'){
                            console.log('我是全部1')
                            this.getApprova(this.$api.noApproval)
                        }else if(this.activeName == 'third'){
                            console.log('我是全部2')
                            this.getApprova(this.$api.yesApproval)
                        }else if(this.activeName == 'fourth'){
                            console.log('我是全部3')
                            this.getApprova(this.$api.ejectApproval)
                        }else{
                            console.log('我是全部4')
                            this.getApprova(this.$api.myApproval)
                        }
                    }
                })
            }).catch(() => {    
            });
        },
        // 时间选择
        chooseTimeRange(val){
            console.log(val)
            this.approvalSearch.begin = val[0]
            this.approvalSearch.end = val[1]
        },
        handleSizeChange(val){
            console.log(val)
            this.pageSize = val
            console.log('一页多少条数据')
            this.approval = this.approvals.slice(0,val)
        },
        handleCurrentChange(val){
            console.log(val)
            console.log('切换页数')
            console.log(this.pageSize)
            console.log(this.approvals.slice(0,val*this.pageSize))
            if(val!=1){
                this.approval = this.approvals.slice((val*this.pageSize-this.pageSize),val*this.pageSize)
            }else{
                this.approval = this.approvals.slice(0,val*this.pageSize)
            }
        },
        handleClose(){
            this.dialogVisible = false
            this.applyVisible = false
        }
        
    },

}
</script>
<style lang="less" scoped>
@col9:#999;
@border:1px solid #E5E5E5;
    .all-order{
        .top{
            li>p{
                width: 340px;
                margin-left:20px;
            }
        }
    }
    .payment-finace{
        li.items-center>span{
            display: inline-block;
            width:70px;
        }
    }
    .table{
        .colb{
            font-size: 16px;
            font-weight: bold;
        }
        .titles{
            height: 50px;
            line-height: 50px;
            background: #F7F7F7;
            padding-left:10px;
        }
        .titles-list{
            padding-left:10px;
            height: 50px;
            line-height: 50px;
        }
    }
    
    .status-dialog {
        b{
            height: 70px;
            line-height: 70px;
        }
        p{
            color: @col9;
        }
        .btn{
            width:350px;
            margin:auto;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            p{
                width:100px;
            }
        }
        .dialog-footer{
            display: inline-block;
            height: 60px;
        }
    }
    .is-dialog{
        .centent{
            color: @col9;
            .table{
                border:@border;
            }
            .title{
                background-color: #F7F7F7;
            }
            .col-list{
                height: 50px;
                line-height: 50px;
                padding-left:10px;
            }
            .reject{    
            }
        }
        .dialog-footer{
            display: block;
        }
    }
    .operation+.operation{
        padding-top:10px;
    }
</style>