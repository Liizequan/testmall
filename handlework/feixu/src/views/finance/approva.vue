<template>
    <div class="all-order payment-finace approva">
        <!-- 我是所有的订单 -->
        <div class="top">
            <!-- <ul class="between">
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
            </ul> -->
            <el-row :gutter="20">
                <el-col :span="6" class="items-center">
                    <span>系统单号：</span>
                    <p class="flex1"><el-input v-model="approvalSearch.orderNo"></el-input></p>
                </el-col>
                <el-col :span="6" class="items-center">
                    <span>业务单号：</span>
                    <p class="flex1"><el-input v-model="approvalSearch.numberOne"></el-input></p>
                </el-col>
                <el-col :span="6" class="items-center">
                    <span>DN号：</span>
                    <p class="flex1"><el-input v-model="approvalSearch.numberTwo"></el-input></p>
                </el-col>
                <el-col :span="6" class="items-center">
                    <span>承运商：</span>
                    <p class="flex1"><el-input v-model="approvalSearch.company"></el-input></p>
                </el-col>
            </el-row>
            <el-row :gutter="20" class="ptop20">
                <el-col :span="6" class="items-center">
                    <span>司机名称：</span>
                    <p class="flex1"><el-input v-model="approvalSearch.username"></el-input></p>
                </el-col>
                <el-col :span="6" class="items-center">
                    <span>录单员：</span>
                    <p class="flex1"><el-input v-model="approvalSearch.user"></el-input></p>
                </el-col>
                <el-col :span="6" class="items-center">
                    <span>录单时间：</span>
                    <p class="flex1">
                             <el-date-picker
                            v-model="approvalSearch.appTimes"
                            type="daterange"
                            style="width:100%"
                            range-separator="至"
                            value-format="yyyy-MM-dd" 
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                        <!-- <el-date-picker
                            v-model="approvalSearch.createTime"
                            style="width:100%"
                            value-format="yyyy-MM-dd" 
                            type="date"
                            placeholder="选择日期">
                        </el-date-picker> -->
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
                    <el-radio label="10">已付款</el-radio>
                    <el-radio label="20">未付款</el-radio>
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
                    <el-tab-pane label="待审核" name="second"></el-tab-pane>
                    <el-tab-pane label="待付款" name="third"></el-tab-pane>
                    <el-tab-pane label="已付款" name="fourth"></el-tab-pane>
                    <el-tab-pane label="驳回申请" name="fifth"></el-tab-pane>
                    <el-tab-pane label="我的申请" name="sixth"></el-tab-pane>
                </el-tabs>
                <div class="imports flex">
                    <!-- <el-button @click="approvalAll">一键审批</el-button> -->
                    <!-- <el-button>导出</el-button> -->
                    <div style="width:90px">
                        <!-- <import-export :isImport="false" :isExport="true" :exportApi="this.$api.approvalExport"/> -->
                    </div>
                </div>
            </div>
            <!-- 数据列表 -->
            <el-table  :data="approval.data" stripe class="table" @select="checkboxs" @select-all="checkboxs" style="width: 100%">
                <el-table-column  type="selection" width="55">
                </el-table-column>
                <el-table-column  prop="numberOne"  label="单号">
                    <template slot-scope="scope">
                        <!-- <p><el-link :underline="false" @click="goOrder(scope.row.orderId)" class="colb">{{scope.row.numberOne}}</el-link></p> -->
                        <p>业务订单号：<el-link :underline="false"  class="order-num colb" @click="lookApplyDetail(scope.row)">{{scope.row.numberOne}}</el-link></p>
                        <p>系统订单号：<el-link :underline="false"  class="order-num colb" @click="goOrder(scope.row.orderId)">{{scope.row.orderNo}}</el-link></p>
                    </template>
                </el-table-column>
                <el-table-column  prop="delivery"  label="起止地">
                    <template slot-scope="scope">
                        <p>
                            {{scope.row.delivery}}
                            <span v-if="scope.row.carry">
                                {{'&nbsp;&nbsp;至&nbsp;&nbsp;' + scope.row.carry}}
                            </span>
                        </p>
                    </template>
                </el-table-column>
                <el-table-column prop="payMethod" label="付款费用">
                    <template slot-scope="scope">
                        <span>金额：￥{{scope.row.amount}}</span><br>
                        <span>油卡：￥{{scope.row.card}}</span><br>
                    </template>
                </el-table-column>
                <el-table-column  prop="date"  label="收款人信息">
                    <template slot-scope="scope">
                        <!-- <p><el-link @click="lookDetail(scope.$index, scope.row)">司机 司机姓名 13760012345 粤Y12345</el-link></p> -->
                        <p>
                            {{scope.row.accountHolder + scope.row.bankAccount + scope.row.openingBank}}
                        </p>
                    </template>
                </el-table-column>
                <el-table-column width="130" prop="name"  label="审批状态">
                    <template slot-scope="scope">
                        <div class="fan-btn"
                        :class="scope.row.status  == '1' || scope.row.status  == '2' ? 'backb': scope.row.status  == '3' ? 'backo': 'backsl'"
                        >{{scope.row.status == 1 ? '待经理审批' : scope.row.status ==2 ? '待财务付款' : scope.row.status == 3 ? '已付款' : scope.row.status == 0 ? '待审批' :  '已驳回'}}</div>
                        <!-- <el-button v-if="sc">待审批</el-button> -->
                        <!-- <el-button style="margin-left:0; margin-top:10px;">已驳回</el-button> -->
                    </template>
                </el-table-column>
                <el-table-column width="130" prop="apply" label="申请人">
                </el-table-column>
                <el-table-column  prop="charge"  label="审批人">
                    <template slot-scope="scope">
                        <p>经理：{{scope.row.manager}}</p>
                        <p>财务：{{scope.row.finance}}</p>
                    </template>
                </el-table-column>
                <el-table-column  prop="name"  label="操作">
                    <template slot-scope="scope">
                        <p class="operation" v-if="scope.row.status == '1' || scope.row.status == '2'">
                            <el-button type="primary" @click="ApplyTrue(scope.row)" class="backb" style="width:98px;" v-if="scope.row.status == '1'">审批</el-button> 
                            <el-button type="danger" @click="ApplyTrue(scope.row)" class="backo" style="width:98px;" v-if="scope.row.status == '2'">付款</el-button> 
                        </p>
                        <p class="operation">
                            <el-button @click="lookApplyDetail(scope.row)">查看详情</el-button>
                        </p>
                        <p class="operation" v-if="scope.row.status =='-1'">
                            <el-button type="primary" class="btn-elblue" @click="applyReason(scope.row)">再次申请</el-button>
                        </p>
                        <p class="operation" v-if="scope.row.status =='-1'">
                            <el-button @click="lookReason(scope.row)">驳回原因</el-button>
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
                <el-dialog
                    :visible.sync="dialogVisible"
                    width="900px"
                    top="80px"
                    center
                    :before-close="handleClose"
                    custom-class="status-dialog"
                    class="row" 
                    >
                    <!-- id="pdfDom"  -->
                     <!-- id="printMe" -->
                    <div class="row status-dialog" style="color:#333;" id="pdfDom">
                        <div slot="title" style="text-align:center;">
                            <b class="font24">
                                {{statues == '1' ? '请款单' : statues == '4' ? '驳回原因': statues == '3' ? '申请支付': '审批信息'}}
                            </b>
                        </div>
                        <div class="centent">
                            <el-row>
                                <el-col :span="12"><div >系统订单号：{{appDetail.orderNo}}</div></el-col>
                                <el-col :span="12"><div style="text-align:right">申请日期：{{appDetail.createTime}}</div></el-col>
                            </el-row>
                            <div class="table mtop30">
                                <el-row class="title">
                                    <el-col :span="5"><div class="col-list">提货时间</div></el-col>
                                    <el-col :span="4"><div class="col-list">项目名称</div></el-col>
                                    <el-col :span="2"><div class="col-list">司机</div></el-col>
                                    <el-col :span="2"><div class="col-list">车牌</div></el-col>
                                    <el-col :span="11"><div class="col-list">起止地</div></el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="5"><div class="col-list" style="overflow: hidden;">{{appDetail.deliveryTime}}</div></el-col>
                                    <el-col :span="4"><div class="col-list" style="overflow: hidden;">{{appDetail.project}}</div></el-col>
                                     <el-col :span="2"><div class="col-list" style="overflow: hidden;">{{appDetail.username}}</div></el-col>
                                    <el-col :span="2"><div class="col-list" style="overflow: hidden;">{{appDetail.plate}}</div></el-col>
                                    <el-col :span="11"><div class="col-list"  :title="(appDetail.delivery ? appDetail.delivery : '' )+ (appDetail.carry ? ('至' + appDetail.carry):'')">
                                        {{(appDetail.delivery ? appDetail.delivery : '' )+ (appDetail.carry ? ('至' + appDetail.carry):'')}}</div>
                                    </el-col>
                                </el-row>
                            </div>
                            <div class="table mtop20">
                                <el-row class="title items-center">
                                    <el-col :span="24"><div class="col-list between">
                                        <!-- <div class="col-list" style="margin-right:20px;">本次支付</div> -->
                                        <div class="money items-center flex1">
                                            <p class="items-center">总运费：
                                                <b class="colo"> 
                                                    {{parseFloat(appDetail.totalAmount) ||0}}
                                                <!-- {{(parseFloat(appDetail.cost) || 0 ) + (parseFloat(appDetail.dockCost) || 0) + (parseFloat(appDetail.insurance) || 0)}} -->
                                                </b>元；
                                                
                                                已付金额<span class="colb">{{parseFloat(appDetail.payAmount) || 0}}</span>元，
                                                已付油卡<span class="colb">{{parseFloat(appDetail.payCard) || 0}} </span>元；还需要支付
                                                
                                                <b class="colo">
                                                    {{parseFloat(appDetail.waitAmount) || 0}}
                                                </b>
                                            元</p> 
                                        </div>    
                                    </div></el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="8"><div class="between col-list">付款类型：
                                        <span v-if="statues!=3" class="flex1">{{appDetail.payType}}</span> 
                                        <!-- <el-input class="flex1" v-else v-model="appDetail.payMethod"></el-input> -->
                                        <el-select  v-else  v-model="appDetail.payType" placeholder="请选择" class="flex1">
                                            <el-option
                                            v-for="item in paytype"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </div></el-col>
                                    <el-col :span="8"><div class="between col-list">付款方式：
                                        <span v-if="statues!=3" class="flex1">{{appDetail.payMethod}}</span> 
                                        <!-- <el-input class="flex1" v-else v-model="appDetail.payMethod"></el-input> -->
                                        <el-select  v-else  v-model="appDetail.payMethod" placeholder="请选择" class="flex1">
                                            <el-option
                                            v-for="item in paymethod"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </div></el-col>
                                    <el-col :span="8"><div class="between col-list">油卡类型：
                                        <span v-if="statues!=3" class="flex1">{{appDetail.cardtype}}</span> 
                                        <!-- <el-input class="flex1" v-else v-model="appDetail.cardtype"></el-input> -->
                                        <el-select v-else  v-model="appDetail.cardtype" style="width:100%" slot="prepend" class="flex1" placeholder="请选择">
                                                <el-option
                                                v-for="item in cardtype"
                                                :key="item.id"
                                                :label="item.name"
                                                :value="item.id">
                                                </el-option>
                                            </el-select>
                                    </div></el-col>
                                    <el-col :span="8"><div class="between col-list">油卡卡号：
                                        <span v-if="statues!=3" class="flex1">{{appDetail.cardNumber}}</span> 
                                        <el-input class="flex1" v-else v-model="appDetail.cardNumber"></el-input>
                                    </div></el-col>
                                    <el-col :span="8"><div class="between col-list">金额：
                                        <span v-if="statues!=3" class="flex1">{{appDetail.amount ? appDetail.amount : 0}}元</span> 
                                        <el-input class="flex1" v-else v-model="appDetail.amount"></el-input>
                                    </div></el-col>
                                    <el-col :span="8"><div class="between col-list">油卡：
                                        <span v-if="statues!=3" class="flex1">{{appDetail.card ? appDetail.card : 0}}元</span> 
                                        <el-input class="flex1" v-else v-model="appDetail.card"></el-input>
                                    </div></el-col>
                                    <!-- <el-col :span="8"><div class="col-list">共生支付：{{appDetail.createTime}}</div></el-col> -->
                                    <el-col :span="8"><div class="between col-list">收款人名称：
                                        <span v-if="statues!=3" class="flex1">{{appDetail.accountHolder}}</span> 
                                        <el-input class="flex1" v-else v-model="appDetail.accountHolder"></el-input>
                                    </div></el-col>
                                    <el-col :span="8"><div class="between col-list">银行账号：
                                        <span v-if="statues!=3" class="flex1">{{appDetail.bankAccount}}</span> 
                                        <el-input class="flex1" v-else v-model="appDetail.bankAccount"></el-input>
                                    </div></el-col>
                                    <el-col :span="8"><div class="between col-list">所属银行：
                                        <span v-if="statues!=3" class="flex1">{{appDetail.openingBank}}</span> 
                                        <el-input class="flex1" v-else v-model="appDetail.openingBank"></el-input>
                                    </div></el-col>
                                    <el-col :span="24"><div class="between col-list">备注：
                                        <span v-if="statues!=3" class="flex1">{{appDetail.openingBank}}</span> 
                                        <el-input class="flex1" v-else v-model="appDetail.openingBank"></el-input>
                                    </div></el-col>
                                </el-row>
                            </div>
                            <div class="mtop20 is-approval">
                                <el-row>
                                    <el-col :span="6">
                                        <div class="">项目负责人：</div>
                                        <div style="height:40px;line-height:40px" v-if="statues!=3">{{appDetail.charge}}</div>
                                        <div v-else>
                                            <el-select v-model="appDetail.chargeId" placeholder="请选择" style="width:180px; margin-top:5px;">
                                                <el-option
                                                v-for="item in userList"
                                                :key="item.id"
                                                :label="item.name"
                                                :value="item.id">
                                                </el-option>
                                            </el-select>
                                        </div>
                                    </el-col>
                                    <el-col :span="6">
                                        <div class="">经理审批：</div>
                                        <div style="height:40px;line-height:40px" v-if="statues!=3">{{appDetail.manager}}</div>
                                        <div v-else>
                                            <el-select v-model="appDetail.managerId" placeholder="请选择" style="width:180px; margin-top:5px;">
                                                <el-option
                                                v-for="item in managerList"
                                                :key="item.id"
                                                :label="item.name"
                                                :value="item.id">
                                                </el-option>
                                            </el-select>
                                        </div>
                                    </el-col>
                                    <el-col :span="6">
                                        <div class="">财务审批：</div>
                                        <div style="height:40px;line-height:40px" v-if="statues!=3">{{appDetail.finance}}</div>
                                        <div v-else>
                                            <el-select v-model="appDetail.financeId" placeholder="请选择" style="width:180px; margin-top:5px;">
                                                <el-option
                                                v-for="item in financeList"
                                                :key="item.id"
                                                :label="item.name"
                                                :value="item.id">
                                                </el-option>
                                            </el-select>
                                        </div>
                                    </el-col>
                                    <el-col :span="6">
                                        <div class="">申请人：</div>
                                        <div style="height:40px;line-height:40px">{{appDetail.apply}}</div>
                                    </el-col>
                                </el-row>
                            </div>
                            <div class="reject ptop40" v-if="statues == 4">
                                <h4 class="colb">驳回原因：</h4>
                                <p class="ptop20">{{appDetail.reason}}</p>
                            </div>
                        </div>
                    </div>
                    <div slot="footer" style="color:#333;" class="dialog-footer" v-if="statues!=1">
                        <div class=" between">
                            <div>
                                <el-button style="width:150px;" :type="appDetail.status==2 ? 'danger' : 'primary'" :class="appDetail.status == 2 ? 'backo' : 'backb'" @click="approvalTure(appDetail)" v-if="statues == 2">
                                    确认{{appDetail.status==2 ? '付款' : '审批'}} 
                                </el-button>
                                <el-button style="width:150px;" type="primary" class="btn-elblue" @click="applyReason(appDetail)" v-if="statues == 4">重新申请</el-button>
                                <el-button style="width:150px;" @click="dialogVisible = false">关 闭</el-button>
                            </div>
                            <div v-if="statues == 2">
                                <el-button style="width:150px;" class="backo" @click="dialogVisible = false, applyVisible = true">驳回申请</el-button>
                            </div>
                            <div v-if="statues == 3">
                                <el-button style="width:150px;" type="primary" @click="apply(appDetail)">提交申请</el-button>
                            </div>
                        </div>
                    </div>
                    <!-- getPdf() -->
                    <!--   v-print="'#printMe'" -->
                    <div slot="footer" v-if="statues == 1" class="flex">
                        <el-button style="width:150px;justify-content: center;" type="button" class="btn btn-primary"  @click="getPdf()">导出请款单</el-button>
                        <el-button style="width:150px;justify-content: center;" type="button" class="btn btn-primary"  v-print="'#pdfDom'">打印请款单</el-button>
                    </div>
                </el-dialog>
                <!-- 驳回申请 -->
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
                            <el-input type="textarea" v-model="rejectText"></el-input>
                        </p>
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button style="width:150px;" type="primary" class="btn-elblue" @click="RejectTap">确 定</el-button>
                        <el-button style="width:150px;" @click="applyVisible = false">取 消</el-button>
                    </span>
                </el-dialog>
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
                orderNo:'',//订单号：
                numberOne:'',//业务单号
                numberTwo:'',//DM单号	
                company:'',//承运商
                username:'',//司机名称：
                user:'',//申请人
                createTime:'',//录单时间
                appTimes:'',
                appTime:'',

                status:'',//状态
                begin:'',//付款开始时间
                end:'',//付款结束时间
            },//搜索条件
            dialogVisible:false,//驳回弹框
            applyVisible:false,//再次申请
            statues:1,
            approval:[],//驳回申请列表
            approvals:[],//所有驳回申请列表

            appDetail:{},//情况单信息
            operationStatus:null,//操作状态
            rejectText:'',
            payTanListValue:{//重新申请
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
        this.getApprova(this.$api.approvalIndex)
        this.api = this.$api.approvalIndex
        this.getSelectData()
        this.getMen()
    },
    methods: {
        getApprova(url,pageNum,pageSize){
            this.$http.get(url,{
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
            this.appDetail = val
            this.statues = 1
            this.dialogVisible = true
        },
        //打开确认弹框
        ApplyTrue(val){
            console.log(val)
            this.appDetail = val
            this.dialogVisible = true
            this.operationStatus = 1
            this.statues = 2
        },
        // 打开再次申请
        applyReason(val){
            // val.payMethodId = val.payMethodId　? parseInt(val.payMethodId) : '';
            var val = val
            val.payType = (val.payTypeId && val.payTypeId != 'null') ? parseInt(val.payTypeId) : '';      
            val.payMethod = (val.payMethodId &&　val.payMethodId != 'null') ? parseInt(val.payMethodId) : '';                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
            val.cardtype = (val.cardtypeId && val.cardtypeId != 'null') ? parseInt(val.cardtypeId) : '';
            val.chargeId = val.chargeId ? parseInt(val.chargeId) : '';
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
            // console.log(val.name)
            // if(val.name=='first'){
            //     console.log('我是全部')
            //     this.getApprova(this.$api.approvalIndex)
            // }else if(val.name == 'second'){
            //     console.log('我是全部1')
            //     this.getApprova(this.$api.noApproval)
            // }else if(val.name == 'third'){
            //     console.log('我是全部2')
            //     this.getApprova(this.$api.yesApproval)
            // }else if(val.name == 'fourth'){
            //     console.log('我是全部3')
            //     this.getApprova(this.$api.ejectApproval)
            // }else{
            //     console.log('我是全部4')
            //     this.getApprova(this.$api.myApproval)
            // }
            this.getDetailFun()
        },
        // 搜索审批
        searchApproval(pageNum,pageSize){
            var approvalSearch = this.approvalSearch
            this.$http.post(this.$api.approvalSearch,{
                orderNo:approvalSearch.orderNo,
                numberOne:approvalSearch.numberOne,
                numberTwo:approvalSearch.numberTwo,
                company:approvalSearch.company,
                username:approvalSearch.username,
                user:approvalSearch.user,
                // createTime:approvalSearch.createTime,
                orderstart:approvalSearch.appTimes ? approvalSearch.appTimes[0] : '',
                orderend:approvalSearch.appTimes ? approvalSearch.appTimes[1] : '',
                status:approvalSearch.status,
                // begin:approvalSearch.begin,
                // end:approvalSearch.end,
                begin:approvalSearch.appTime ?approvalSearch.appTime[0] : '',//付款开始时间
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
                    this.api = this.$api.approvalSearch
                }else{
                    console.log('woyg')
                    this.pagin = true
                    this.$message('暂无搜索到相关审批，请重新搜索')
                }
            })
        },
        getDetailFun(){
            if(this.activeName=='first'){
                this.getApprova(this.$api.approvalIndex)
                this.api = this.$api.approvalIndex
            }else if(this.activeName == 'second'){
                this.getApprova(this.$api.noApproval)
                this.api = this.$api.noApproval
            }else if(this.activeName == 'third'){
                this.getApprova(this.$api.daiFuk)
                this.api = this.$api.daiFuk
                console.log('代付款')
            }else if(this.activeName == 'fourth'){
                this.getApprova(this.$api.yesApproval)
                this.api = this.$api.yesApproval
            }else if(this.activeName == 'fifth'){
                this.getApprova(this.$api.ejectApproval)
                this.api = this.$api.ejectApproval
            }else{
                this.getApprova(this.$api.myApproval)
                this.api = this.$api.myApproval
            }
        },
        // 确认审批
        approvalTure(val){
            // return console.log(val)
            var data = '';
            if(val.status == 2){
                data = '请认真核对付款信息，一旦确定将无法修改'
            }else{
                data = '是否对业务单号：' + val.numberOne + '进行审批'
            }
            this.$confirm(data, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                var url = '';
                if(val.status==1){//待经理审批
                    url = this.$api.sureoneApp
                }
                if(val.status==2){
                    url = this.$api.suretwoApp
                }
                console.log(url)
                this.$http.post(url,{
                    id:val.id,
                    carrierId:val.carrierId
                },res=>{
                    console.log(res)
                    this.$message(res.msg)
                    if(res.code ==1){
                        this.dialogVisible = false
                        this.getDetailFun()
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
            // if(val.amount==0 && val.card==0){
            //     return this.$message('金额或者金额不能为0')
            // }
            // if(!val.payMethod){
            //     return this.$message('付款方式不能为空')
            // }
            // if(!val.accountHolder){
            //     return this.$message('收款人不能为空')
            // }
            // if(!val.bankAccount){
            //     return this.$message('银行账号不能为空')
            // }
            // if(!val.openingBank){
            //     return this.$message('所属银行不能为空')
            // }

            if((!val.amount || val.amount=='0') && (!val.card ||  val.card == '0')){
                return this.$message('金额或者油卡错误')
            }
            // if(val.amount && !val.bankAccount){
            //     return this.$message('银行账号不能为空')
            // }
            // if(val.card && !val.cardNumber){
            //     return this.$message('油卡卡号不能为空')
            // }

            if(!val.chargeId){
                return this.$message('项目负责人不能为空')
            }
            if(!val.managerId){
                 return this.$message('项目经理不能为空')
            }
            if(!val.financeId){
                 return this.$message('财务付款不能为空')
            }
            // return console.log(val)
            this.$http.post(this.$api.approvalApply,{
                id:val.id,
                carrierId:val.carrierId,
                charge:val.chargeId,
                finance:val.financeId,
                manager:val.managerId,
                amount:val.amount,
                card:val.card,
                payMethod:val.payMethodId,
                cardtype:val.cardtypeId || '',
                cardNumber:val.cardNumber,
                accountHolder:val.accountHolder,
                bankAccount:val.bankAccount,
                openingBank:val.openingBank,
            },res=>{
                console.log(res)
                this.$message(res.msg)
                if(res.code==1){
                    this.dialogVisible = false
                    this.getDetailFun()
                }
            })
        },
        // 确定驳回申请
        RejectTap(){
            console.log(this.appDetail)
            this.$http.post(this.$api.approvalReject,{
                id:this.appDetail.id,
                remark:this.rejectText
            },res=>{
                this.$message(res.msg)
                if(res.code == 1){
                    console.log('关闭了没')
                    this.applyVisible = false
                    this.getDetailFun()
                }
            })
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
            if(this.api == this.$api.approvalSearch){
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
            if(this.api == this.$api.approvalSearch){
                return this.searchApproval(val,this.pageSize)
            }
            this.getApprova(this.api,val,this.pageSize)
        },
        handleClose(){
            this.dialogVisible = false
            this.applyVisible = false
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
        }
        p{
            // color: @col9;
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
        .dialog-footer{
            display: block;
        }
    }
    
    .centent{
        // color: @col9;
        font-weight: bold;
        .table,.is-approval{
            border: 1px solid #000;
            padding:2px;
        }
        .title{
            background-color: #F7F7F7;
        }
        .is-approval{
            padding:10px 0 0 10px;
        }
        .col-list{
            height: 34px;
            line-height: 34px;
            padding-left:10px;
        }
    }
    .operation+.operation{
        padding-top:10px;
    }
</style>