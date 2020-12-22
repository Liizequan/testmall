<template>
    <div class="all-order payment-finace approva">
        <!-- 我是所有的订单 -->
        <div class="top">
            <el-row :gutter="20">
                <el-col :span="6" class="items-center">
                    <span>月收单号：</span>
                    <p class="flex1"><el-input v-model="approvalSearch.receiveNo"></el-input></p>
                </el-col>
                <!-- <el-col :span="6" class="items-center">
                    <span>月份：</span>
                    <p class="flex1">
                        <el-date-picker
                            v-model="approvalSearch.month"
                            type="month"
                            style="width:100%"
                            value-format="yyyy-MM" >
                        </el-date-picker>
                    </p>
                </el-col> -->
                <el-col :span="6" class="items-center">
                    <span>客户名称：</span>
                    <p class="flex1"><el-input v-model="approvalSearch.customer"></el-input></p>
                </el-col>
                <!-- <el-col :span="6" class="items-center">
                    <span>司机名称：</span>
                    <p class="flex1"><el-input v-model="approvalSearch.username"></el-input></p>
                </el-col> -->
                <!-- <el-col :span="6" class="items-center">
                    <span>承运商：</span>
                    <p class="flex1"><el-input v-model="approvalSearch.carrier"></el-input></p>
                </el-col> -->
                <el-col :span="6" class="items-center">
                    <span>申请人：</span>
                    <p class="flex1"><el-input v-model="approvalSearch.apply"></el-input></p>
                </el-col>
            </el-row>
            <el-row :gutter="20" class="ptop20">
                <!-- <el-col :span="6" class="items-center">
                    <span>项目名称：</span>
                    <p class="flex1"><el-input v-model="approvalSearch.project"></el-input></p>
                </el-col>
                <el-col :span="6" class="items-center">
                    <span>车牌：</span>
                    <p class="flex1"><el-input v-model="approvalSearch.plate"></el-input></p>
                </el-col> -->
                <el-col :span="6" class="items-center">
                    <span>录单时间：</span>
                    <p class="flex1">
                        <el-date-picker
                            v-model="approvalSearch.luTime"
                            type="daterange"
                            style="width:100%"
                            range-separator="至"
                            value-format="yyyy-MM-dd" 
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </p>
                </el-col>
                <el-col :span="6" class="items-center">
                    <span>审核时间：</span>
                    <p class="flex1">
                        <el-date-picker
                            v-model="approvalSearch.appTime"
                            type="daterange"
                            style="width:100%"
                            range-separator="至"
                            value-format="yyyy-MM-dd" 
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </p>
                </el-col>
            </el-row>
            <div class="ptop30">
                <!-- <el-radio-group v-model="approvalSearch.status">
                    <el-radio label="已完成"></el-radio>
                    <el-radio label="未完成"></el-radio>
                </el-radio-group> -->
                <el-radio-group v-model="approvalSearch.status">
                    <el-radio label="10">已收款</el-radio>
                    <el-radio label="20">未收款</el-radio>
                </el-radio-group>
                <div class="btn ptop30">
                    <el-button type="primary" class="btn-elblue" style="width:180px;" @click="searchApproval(currentPage,pageSize)">查询</el-button>
                </div>
            </div>
        </div>

        <div class="ptop40">
            
            <!-- 头部导航 -->
            <div class="nav-bar">
                <el-tabs v-model="activeName" @tab-click="handleClick" style="padding-left:10px;" >
                    <el-tab-pane label="全部" name="first"></el-tab-pane>
                    <el-tab-pane label="待收款" name="second"></el-tab-pane>
                    <el-tab-pane label="已收款" name="third"></el-tab-pane>
                    <!-- <el-tab-pane label="待付款" name="fourth"></el-tab-pane>
                    <el-tab-pane label="已付款" name="fifth"></el-tab-pane>
                    <el-tab-pane label="已驳回" name="sixth"></el-tab-pane> -->
                    <!-- <el-tab-pane label="我的申请" name="sixth"></el-tab-pane> -->
                </el-tabs>
                <!-- <div class="imports flex">
                    <div style="width:90px">
                        <import-export :isImport="false" :isExport="true" :exportApi="this.$api.approvalExport"/>
                    </div>
                </div> -->
            </div>
            <!-- 数据列表 -->
            <!-- <import-export :isImport="false" :isExport="true" :exportApi="this.$api.approvalExport"/> -->
            <el-table  :data="approval.data" stripe class="table" @select="checkboxs" @select-all="checkboxs" style="width: 100%">
                <el-table-column  type="selection" width="55">
                </el-table-column>
                <el-table-column  prop="receiveNo"  label="运单号">
                    <template slot-scope="scope">
                        <p class="colb">{{scope.row.receiveNo}}</p>
                        <p v-show="scope.row.status == 10"><el-link type="danger" @click="cacleRecieve(scope.row.id)">撤销收款</el-link></p>
                    </template>
                </el-table-column>
                <el-table-column prop="customer" label="客户名称">
                </el-table-column>
                <el-table-column  prop="status"  label="收款信息">
                    <template slot-scope="scope">
                        <!-- <p><el-link @click="lookDetail(scope.$index, scope.row)">司机 司机姓名 13760012345 粤Y12345</el-link></p> -->
                        {{scope.row.status == 10 ? '未收' : '已收'}}
                    </template>
                </el-table-column>
                <el-table-column  prop="cost"  label="总费用（元）">
                </el-table-column>
                <el-table-column  prop="count"  label="单数">
                </el-table-column>
                <el-table-column  prop="tax"  label="发票状态" width="120px">
                    <template slot-scope="scope">
                        {{scope.row.tax == 10 ? '未开' : '已开'}}
                    </template>
                </el-table-column>
                <el-table-column  prop="user"  label="生成人">
                </el-table-column>
                <el-table-column  prop="createTime"  label="录单时间" width="120px">
                </el-table-column>
                <el-table-column  prop="name"  label="操作" width="120px">
                    <template slot-scope="scope">
                        <!-- <p class="operation" v-if="scope.row.status == '1' || scope.row.status == '2'">
                            <el-button type="primary" @click="ApplyTrue(scope.row)" class="backb" style="width:98px;" v-if="scope.row.status == '1'">审批</el-button> 
                        </p> -->
                        <el-button type="danger" @click="ApplyTrue(scope.row.id)" class="backb backo" style="width:98px;">{{scope.row.status == 10 ? '收款' : '已收'}}</el-button> 
                        <p class="operation ptop10">
                            <el-button @click="lookApplyDetail(scope.row.id)">查看详情</el-button>
                        </p>
                        <p class="operation" v-if="scope.row.tax ==10">
                            <el-button type="warning" @click="invoice(scope.row.id)" class="backy" style="width:96px;">开发票</el-button>
                        </p>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页列表 -->
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 30]"
                :page-size="pageSize"
                :hide-on-single-page="pagin"
                layout="total, sizes, prev, pager, next, jumper"
                background
                class="txt-center ptop40 pbom20"
                style="width:750px"
                :total="approval.totalSize">
            </el-pagination>
            <!-- 弹框 -->
            <div class="is-dialog">
                <!-- 驳回原因 -->
                <!-- 驳回申请 -->
            </div>
        </div>
    </div>
</template>
<script>
import ImportExport from "@/components/ImportExport.vue";
export default {
    components: { ImportExport },
    data() {
        return {
            checkList:[],
            activeName:'first',

            currentPage:1,
            pagin:true,//是否显示
            payData:[],//页面数据
            payDatas:[],//所有数据
            pageSize:10,//一页的数据

            approvalSearch:{
                receiveNo:'',//订单号：
                customer:'',//客户名称
                apply:'',//申请人：
                luTime:'',//录单时间
                appTime:'',
                status:'',//状态
            },//搜索条件
            dialogVisible:false,//驳回弹框
            applyVisible:false,//再次申请
            statues:1,
            approval:[],//驳回申请列表
            approvals:[],//所有驳回申请列表

            appDetail:{},//情况单信息
            operationStatus:null,//操作状态
            rejectText:'',
            payTanListValue:{//重新申请q
                name:'',
                cwapp:'',
                jlapp:'',
            },
            userList:[],
            financeList:[],
            managerList:[],
            checks:[],
            paytype:[],
            cardtype:[],
            paymethod:[],
            api:'',
        }
    },
    created() {
        this.getApprova(this.$api.receiveReceivelist)
        this.api = this.$api.receiveReceivelist;
        this.getSelectData()
        this.getMen()
    },
    methods: {
        getApprova(url,pageNum,pageSize){
            console.log(this.activeName)
            if(this.activeName == 'first'){
                this.$http.post(url,{
                    pageNum:pageNum || this.currentPage,
                    pageSize:pageSize || this.pageSize,
                },res=>{
                    console.log(res)
                    // this.approval = res.data.slice(0,this.pageSize)
                    // this.approvals = res.data;
                    this.approval = res.data;
                    if(res.data.length != 0){
                        this.pagin = false
                    }else{
                        this.pagin = true
                    }
                })
            }else{
                this.$http.post(url,{
                    pageNum:pageNum || this.currentPage,
                    pageSize:pageSize || this.pageSize,
                    status:this.activeName=='second' ? 10 : 20
                },res=>{
                    console.log(res)
                    // this.approval = res.data.slice(0,this.pageSize)
                    // this.approvals = res.data;
                    this.approval = res.data;
                    if(res.data.length != 0){
                        this.pagin = false
                    }else{
                        this.pagin = true
                    }
                })
            }
        },
        getMen(){
            this.$http.get(this.$api.dataUserlist,{},res=>{
                this.userList = res.data
            })
            this.$http.get(this.$api.dataFinance,{},res=>{
                console.log(res)
                this.financeList = res.data
            })
            this.$http.get(this.$api.dataManager,{},res=>{
                console.log(res)
                this.managerList = res.data
            })
        },
        getSelectData(){
            this.$http.get(this.$api.orderData,{},res=>{
                console.log(res)
                this.cardtype = res.data.card;
                this.paytype = res.data.paytype;
                this.paymethod = res.data.paymethod;
            })
        },
        // 查看订单详情
        goOrder(val){
            this.$router.push({
                path: '/order/detail',
                query: {
                    id: val
                }
            })
        },
        // 打开查看款单
        lookApplyDetail(val){
            this.$router.push({
                path: '/approva/detailMonShou',
                query: {
                    id: val
                }
            })
        },
        //打开确认弹框
        ApplyTrue(val){
            // console.log(val)
            // this.appDetail = val
            // this.dialogVisible = true
            // this.operationStatus = 1
            // this.statues = 2
            this.$confirm('请确定是否已经到账，一旦确定将无法更改', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.post(this.$api.receiveReceivesure,{
                    id:val
                },res=>{
                    console.log(res)
                    this.$message(res.msg)
                    if(res.code==1){
                        this.getApprova(this.api)
                    }
                })
            }).catch(() => {
            });
        },
        // 打开再次申请
        applyReason(val){
            // val.payMethodId = val.payMethodId　? parseInt(val.payMethodId) : '';
            var val = val
            val.payType = (val.payTypeId && val.payTypeId != 'null') ? parseInt(val.payTypeId) : '';      
            val.payMethod = (val.payMethodId &&　val.payMethodId != 'null') ? parseInt(val.payMethodId) : '';                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
            val.cardType = (val.cardTypeId && val.cardTypeId != 'null') ? parseInt(val.cardTypeId) : '';
            val.chargeId = val.charge ? parseInt(val.charge) : '';
            val.managerId = val.managerId ? parseInt(val.managerId) : '';
            val.financeId = val.financeId ? parseInt(val.financeId) : '';
            this.appDetail = val
            this.statues = 3
            this.dialogVisible = true
            console.log( this.appDetail )

            
        },
        // 打开驳回原因
        lookReason(val){
            this.appDetail = val
            this.dialogVisible = true
            this.statues = 4
        },
        handleClick(val){
            if(val.name == 'first'){
                this.getApprova(this.$api.receiveReceivelist)
            }else{
                this.getApprova(this.$api.receivestatus)
            }
        },
        // 搜索审批
        searchApproval(pageNum,pageSize){
            var approvalSearch = this.approvalSearch;
            this.$http.post(this.$api.searchreceive,{
                receiveNo:approvalSearch.receiveNo,
                customer:approvalSearch.customer,
                apply:approvalSearch.apply || '',
                status:approvalSearch.status,
                // carrier:approvalSearch.carrier,
                // month:approvalSearch.month,
                // project:approvalSearch.project,
                orderstart: approvalSearch.luTime ? approvalSearch.luTime[0] : '',
                orderend: approvalSearch.luTime ? approvalSearch.luTime[1] : '',
                begin:approvalSearch.appTime ? approvalSearch.appTime[0] : '',//付款开始时间
                end:approvalSearch.appTime ?approvalSearch.appTime[1] : '',//付款结束时间
                pageNum:pageNum,
                pageSize:pageSize,
            },res=>{
                console.log(res)
                if(res.data.data.length != 0){
                    this.pagin = false
                    this.activeName = 'first'
                    // this.approval = res.data.slice(0,this.pageSize)
                    this.approval = res.data;
                    this.api = this.$api.monthpaysearch
                }else{
                    console.log('woyg')
                    this.pagin = true
                    this.$message('暂无搜索到相关审批，请重新搜索')
                }
            })
        },
        // 确认审批
        approvalTure(val){
            // return console.log(val)
            var data = '';
            if(val.status == 2){
                data = '请认真核对付款信息，一旦确定将无法修改'
            }else{
                data = '是否对月付单号：' + val.payNo + '进行审批'
            }
            this.$confirm(data, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                var url = '';
                if(val.status==1){//待经理审批
                    url = this.$api.paySureone
                }
                if(val.status==2){
                    url = this.$api.paySuretwo
                }
                console.log(url)
                this.$http.post(url,{
                    id:val.id,
                    // carrierId:val.carrierId
                },res=>{
                    console.log(res)
                    this.$message(res.msg)
                    if(res.code ==1){
                        this.dialogVisible = false
                        this.getApprova(this.api)
                    }
                })
            }).catch(() => {    
            });
        },
        
        // 重新申请支付
        apply(val){
            // var payList = this.payTanListValue
            // this.$http.post(this.$api.approvalApply,{
            //     id:this.appDetail.id,
            //     charge:payList.name,
            //     finance:payList.cwapp,
            //     manager:payList.jlapp
            // },res=>{
            //     console.log(res)
            //     this.$message(res.msg)
            //     if(res.code == 1){
            //         this.dialogVisible = false
            //         this.getDetailFun()
            //     }
            // })
            // console.log(payList)
            // return console.log(val)
            if(val.amount==0 && val.card==0){
                return this.$message('金额或者金额不能为0')
            }
            if(!val.chargeId){
                return this.$message('项目负责人不能为空')
            }
            if(!val.managerId){
                 return this.$message('项目经理不能为空')
            }
            if(!val.financeId){
                 return this.$message('财务付款不能为空')
            }
            if((parseFloat(val.amount) + parseFloat(val.card)) != val.cost){
                return this.$message('金额与油卡要等于总费用')
            }
            this.$http.post(this.$api.applymonthpay,{
                id:val.id,
                charge:val.chargeId,
                finance:val.financeId,
                manager:val.managerId,
                remark:val.remark || '',
                month:val.month,
                project:val.project,
                carrier:val.carrier,
                plate:val.plate,
                carry:val.carry,
                delivery:val.delivery,
                payType:val.payType || '',
                cardType:val.cardType,
                cardNumber:val.cardNumber,
                amount:val.amount,
                card:val.card,
                name:val.name,
                account:val.account,
                bank:val.bank
            },res=>{
                console.log(res)
                this.$message(res.msg)
                if(res.code==1){
                    this.dialogVisible = false
                    this.getApprova(this.api)
                }
            })
        },
        // 确定驳回申请
        RejectTap(){
            console.log(this.appDetail)
            this.$http.post(this.$api.payBackpay,{
                id:this.appDetail.id,
                reason:this.rejectText
            },res=>{
                this.$message(res.msg)
                if(res.code == 1){
                    console.log('关闭了没')
                    this.applyVisible = false
                    this.getApprova(this.api)
                }
            })
        },

        // 收发票
        invoice(val){
            this.$confirm('请确定是否已经收到发票?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.post(this.$api.receiveTaxmonth,{
                    id:val
                },res=>{
                    console.log(res)
                    if(res.code==1){
                        this.getApprova(this.api)
                    }
                })
            }).catch(() => {
            });
        },
        // 选择
        checkboxs(val){
            console.log(val)
            var array = [];
            for(var i of val){
                console.log(i.id)
                array.push(i.id)
            }
            console.log(array)
            this.checks = array
        },
        // 一键审批
        approvalAll(){
            if(this.checks.length==0){
                return this.$message('请选择然后再一键审批')
            }
            this.$http.post(this.$api.approvalAll,{
                id:this.checks.join(',')
            },res=>{
                this.$message(res.msg)
                console.log(res)
                if(res.code ==1){
                    this.getDetailFun()
                }
            })
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
            // this.approval = this.approvals.slice(0,val)
            if(this.api == this.$api.searchreceive){
                return this.searchApproval(this.currentPage,val)
            }
            // this.payData = this.payDatas.slice(0,val)
            this.getApprova(this.api,this.currentPage,val)
        },
        handleCurrentChange(val){
            console.log(val)
            console.log('切换页数')
            console.log(this.pageSize)
            console.log(this.approvals.slice(0,val*this.pageSize))
            // if(val!=1){
            //     this.approval = this.approvals.slice((val*this.pageSize-this.pageSize),val*this.pageSize)
            // }else{
            //     this.approval = this.approvals.slice(0,val*this.pageSize)
            // }
            if(this.api == this.$api.searchreceive){
                return this.searchApproval(val,this.pageSize)
            }
            this.getApprova(this.api,val,this.pageSize)
        },
        handleClose(){
            this.dialogVisible = false
            this.applyVisible = false
        },
        cacleRecieve(id) {
            this.$http.post(this.$api.cancleRecieve,{
                id:id
            },res=>{
                this.$message(res.msg)
                console.log(res)
                if(res.code ==1){
                    // this.getDetailFun()
                    this.getApprova(this.api)
                }
            })
        }
        
    },

}
</script>
<style lang="less" scoped media="printContent">
#printMe {
    // margin: 100px; /* this affects the margin in the printer settings */
}
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
            // font-size: 16px;
            // font-weight: bold;
        }
    }
    
    .status-dialog {
        b{
            height: 70px;
            line-height: 70px;
            position: relative;
        }
        b.font24::after,b.font24::before{
            content: '';
            position: absolute;
            top:50%;
            transform: translateY(-50%);
            height:2px;
            width:100px;
            background-image: -moz-linear-gradient(right,#fff,#000,#fff);
            background-image: -webkit-linear-gradient(left,#fff,#000,#fff);
        }
        b.font24::before{
            left: -100%;
        }
        b.font24::after{
            right: -100%;
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
        .centents{
            // color: @col9;
            font-weight: bold;
            .table,.is-approval{
                padding:2px;
                border: 1px solid #000;
            }
            .title{
                background-color: #F7F7F7;
                height: 50px;
                line-height: 50px;
            }
            .col-list{
                height: 50px;
                line-height: 50px;
                padding:0 5px;
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