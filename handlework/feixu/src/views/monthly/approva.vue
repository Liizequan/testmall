<template>
    <div class="all-order payment-finace approva">
        <!-- 我是所有的订单 -->
        <div class="top">
            <el-row :gutter="20">
                <el-col :span="6" class="items-center">
                    <span>月付单号：</span>
                    <p class="flex1"><el-input v-model="approvalSearch.payNo"></el-input></p>
                </el-col>
                <el-col :span="6" class="items-center">
                    <span>月份：</span>
                    <p class="flex1">
                        <!-- <el-input v-model="approvalSearch.month"></el-input> -->
                        <el-date-picker
                            v-model="approvalSearch.month"
                            type="month"
                            style="width:100%"
                            value-format="yyyy-MM" >
                        </el-date-picker>
                    </p>
                </el-col>
                <el-col :span="6" class="items-center">
                    <span>客户名称：</span>
                    <p class="flex1"><el-input v-model="approvalSearch.customer"></el-input></p>
                </el-col>
                <!-- <el-col :span="6" class="items-center">
                    <span>司机名称：</span>
                    <p class="flex1"><el-input v-model="approvalSearch.username"></el-input></p>
                </el-col> -->
                <el-col :span="6" class="items-center">
                    <span>承运商：</span>
                    <p class="flex1"><el-input v-model="approvalSearch.carrier"></el-input></p>
                </el-col>
            </el-row>
            <el-row :gutter="20" class="ptop20">
                <el-col :span="6" class="items-center">
                    <span>申请人：</span>
                    <p class="flex1"><el-input v-model="approvalSearch.apply"></el-input></p>
                </el-col>
                <el-col :span="6" class="items-center">
                    <span>项目名称：</span>
                    <p class="flex1"><el-input v-model="approvalSearch.project"></el-input></p>
                </el-col>
                <el-col :span="6" class="items-center">
                    <span>车牌：</span>
                    <p class="flex1"><el-input v-model="approvalSearch.plate"></el-input></p>
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
                    </p>
                </el-col>
            </el-row>
            <el-row :gutter="20" class="ptop20">
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
                    <el-tab-pane label="待申请" name="second"></el-tab-pane>
                    <el-tab-pane label="待审核" name="third"></el-tab-pane>
                    <el-tab-pane label="待付款" name="fourth"></el-tab-pane>
                    <el-tab-pane label="已付款" name="fifth"></el-tab-pane>
                    <el-tab-pane label="已驳回" name="sixth"></el-tab-pane>
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
                <el-table-column  prop="payNo"  label="运单号">
                    <template slot-scope="scope">
                        <p class="colb">{{scope.row.payNo}}</p>
                        <p v-show="scope.row.status == 0"><el-link type="danger" @click="caclePay(scope.row.id)">撤销付款</el-link></p>
                    </template>
                </el-table-column>
                <el-table-column  prop="carry"  label="类型">
                    <template slot-scope="scope">
                        {{
                            scope.row.status == '-1' ? '驳回' : 
                            scope.row.status == 1 ? '待经理审批' :  
                            scope.row.status == 2 ? '待财务付款' :  
                            scope.row.status == 3 ? '已付款' : '未申请' 
                        }}
                    </template>
                </el-table-column>
                <el-table-column prop="customer" label="客户名称">
                </el-table-column>
                <el-table-column  prop="name"  label="收款信息">
                    <template slot-scope="scope">
                        <!-- <p><el-link @click="lookDetail(scope.$index, scope.row)">司机 司机姓名 13760012345 粤Y12345</el-link></p> -->
                        收款人： {{scope.row.name}}
                        收款账户： {{scope.row.account}}
                        银行 {{scope.row.bank}}
                    </template>
                </el-table-column>
                <el-table-column  prop="cost"  label="总费用（元）">
                </el-table-column>
                <el-table-column  prop="count"  label="单数" width="60px">
                </el-table-column>
                <el-table-column  prop="tax"  label="发票状态" width="120px">
                    <template slot-scope="scope">
                        {{scope.row.tax == 10 ? '未收' : '已收'}}
                    </template>
                </el-table-column>
                <el-table-column  prop="chargeId"  label="项目负责人	">
                </el-table-column>
                <el-table-column  prop="manager"  label="审批人">
                    <template slot-scope="scope">
                        经理审批:{{scope.row.manager}}<br>
                        财务付款:{{scope.row.finance}}
                    </template>
                </el-table-column>
                <el-table-column  prop="createTime"  label="录单时间" width="120px">
                </el-table-column>
                <el-table-column  prop="name"  label="操作" width="120px">
                    <template slot-scope="scope">
                        <p class="operation" v-if="scope.row.status == '1' || scope.row.status == '2'">
                            <el-button type="primary" @click="ApplyTrue(scope.row)" class="backb" style="width:98px;" v-if="scope.row.status == '1'">审批</el-button> 
                            <el-button type="danger" @click="ApplyTrue(scope.row)" class="backo" style="width:98px;" v-if="scope.row.status == '2'">付款</el-button> 
                        </p>
                        <p class="operation">
                            <el-button @click="lookApplyDetail(scope.row.id)">查看详情</el-button>
                        </p>
                        <p class="operation" v-if="scope.row.tax ==10">
                            <el-button type="warning" @click="invoice(scope.row.id)" class="backy" style="width:96px;">收发票</el-button>
                        </p>
                        <p class="operation" v-if="scope.row.status =='0'">
                            <el-button type="primary" class="btn-elblue" style="width:98px;" @click="applyReason(scope.row)">申请</el-button>
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
                    width="1000px"
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
                                {{statues == '4' ? '驳回原因' :  '月结请款单'}}
                            </b>
                        </div>
                        <div class="centents">
                            <el-row>
                                <el-col :span="12"><div >支付单号：{{appDetail.payNo}}</div></el-col>
                                <el-col :span="12">
                                    <div style="text-align:right" v-if="statues==3">当前日期：{{times | times}}</div>
                                    <div style="text-align:right" v-else>申请日期：{{appDetail.createTime}}</div>
                                </el-col>
                            </el-row>
                            <div class="table mtop30">
                                <el-row class="title">
                                    <el-col :span="3"><div class="col-list">月结月份</div></el-col>
                                    <el-col :span="4"><div class="col-list">项目名称</div></el-col>
                                    <el-col :span="4"><div class="col-list">承运商</div></el-col>
                                    <el-col :span="3"><div class="col-list">车牌</div></el-col>
                                    <el-col :span="10"><div class="col-list">起止地</div></el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="3">
                                        <div class="col-list" style="overflow: hidden;">
                                            <!-- <el-input v-model="appDetail.deliveryTime"></el-input> -->
                                            <!-- {{appDetail.month}} -->
                                            <span v-if="statues!=3">{{appDetail.month}}</span>
                                            <el-date-picker v-else
                                                style="width:100%"
                                                v-model="appDetail.month"
                                                format="yyyy-MM"
                                                value-format="yyyy-MM"
                                                type="month"
                                                placeholder="选择月份">
                                            </el-date-picker>
                                        </div>
                                    </el-col>
                                    <el-col :span="4">
                                        <div class="col-list" style="overflow: hidden;">
                                            <span v-if="statues!=3">{{appDetail.project}}</span>
                                            <el-input v-else v-model="appDetail.project"></el-input>
                                        </div>
                                    </el-col>
                                     <el-col :span="4">
                                         <div class="col-list" style="overflow: hidden;">
                                            <span v-if="statues!=3">{{appDetail.carrier}}</span>
                                            <el-input v-else v-model="appDetail.carrier"></el-input>
                                            </div>
                                        </el-col>
                                    <el-col :span="3">
                                        <div class="col-list" style="overflow: hidden;">
                                            <span v-if="statues!=3">{{appDetail.plate}}</span>
                                            <el-input v-else v-model="appDetail.plate"></el-input>
                                        </div>
                                    </el-col>
                                    <el-col :span="10">
                                        <div class="col-list flex">
                                            <span v-if="statues!=3">{{appDetail.delivery}}至{{appDetail.carry}}</span>
                                            <p v-else class="flex">
                                                <el-input v-model="appDetail.delivery"></el-input>
                                                &nbsp;&nbsp;&nbsp;至&nbsp;&nbsp;&nbsp;
                                                <el-input v-model="appDetail.carry"></el-input>
                                            </p>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                            <div class="table mtop20">
                                <el-row class="title items-center">
                                    <el-col :span="24"><div class="col-list between">
                                        <!-- <div class="col-list" style="margin-right:20px;">本次支付</div> -->
                                        <div class="money items-center flex1">
                                            <p class="items-center">总运费：
                                                <b class="colo">  {{parseFloat(appDetail.cost) ||0}} </b>元
                                                （金额： {{parseFloat(appDetail.amount) ||0}}元,
                                                油卡： {{parseFloat(appDetail.card) ||0}}元,
                                                共：{{(parseFloat(appDetail.amount) ||0) + (parseFloat(appDetail.card) ||0)}}元）
                                            </p>
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
                                    <el-col :span="8"><div class="between col-list">油卡类型：
                                        <span v-if="statues!=3" class="flex1">{{appDetail.cardType}}</span> 
                                        <!-- <el-input class="flex1" v-else v-model="appDetail.cardtype"></el-input> -->
                                        <el-select v-else  v-model="appDetail.cardType" style="width:100%" slot="prepend" class="flex1" placeholder="请选择">
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
                                        <span v-if="statues!=3" class="flex1">{{appDetail.name}}</span> 
                                        <el-input class="flex1" v-else v-model="appDetail.name"></el-input>
                                    </div></el-col>
                                    <el-col :span="8"><div class="between col-list">银行账号：
                                        <span v-if="statues!=3" class="flex1">{{appDetail.account}}</span> 
                                        <el-input class="flex1" v-else v-model="appDetail.account"></el-input>
                                    </div></el-col>
                                    <el-col :span="8"><div class="between col-list">所属银行：
                                        <span v-if="statues!=3" class="flex1">{{appDetail.bank}}</span> 
                                        <el-input class="flex1" v-else v-model="appDetail.bank"></el-input>
                                    </div></el-col>
                                    <el-col :span="24"><div class="between col-list">备注：
                                        <span v-if="statues!=3" class="flex1">{{appDetail.remark}}</span> 
                                        <el-input class="flex1" v-else v-model="appDetail.remark"></el-input>
                                    </div></el-col>
                                </el-row>
                            </div>
                            <div class="table mtop20 is-approval">
                                <el-row class="title " style="padding-left:10px">
                                    <el-col :span="6">
                                        <div class="">项目负责人：</div>
                                    </el-col>
                                    <el-col :span="6">
                                        <div class="">经理审批：</div>
                                    </el-col>
                                    <el-col :span="6">
                                        <div class="">财务审批：</div>
                                    </el-col>
                                    <el-col :span="6">
                                        <div class="">申请人：</div>
                                        <!-- <div style="height:40px;line-height:40px">{{appDetail.apply}}</div> -->
                                    </el-col>
                                </el-row>
                                <el-row style="padding-left:10px">
                                    <el-col :span="6">
                                        <div style="height:40px;line-height:40px" v-if="statues!=3">{{appDetail.chargeId}}</div>
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
                            <div v-if="statues == 2" class="flex">
                                <!-- <el-button style="width:150px;" class="backo" @click="getPdf()">>导出</el-button> -->
                                <el-button style="justify-content: center;width:150px;" slot="footer" type="button" class="btn btn-primary"  v-print="'#printMe'" @click="getPdf()">导出请款单</el-button>
                                <el-button style="justify-content: center;width:150px;margin-left:10px" type="primary" class="btn btn-primary"  v-print="'#pdfDom'">打印请款单</el-button>
                                <el-button style="width:150px;" type="danger" class="backo" @click="dialogVisible = false, applyVisible = true">驳回申请</el-button>
                            </div>
                            <div v-if="statues == 3">
                                <el-button style="width:150px;" type="primary" @click="apply(appDetail)">提交申请</el-button>
                            </div>
                        </div>
                    </div>
                    <!-- getPdf() -->
                    <!--   v-print="'#printMe'" -->
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
                payNo:'',//订单号：
                month:'',
                customer:'',//客户名称
                carrier:'',//承运商
                project:'',//项目名称
                plate:'',//车牌
                appTimes:'',
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
            times:'',
        }
    },
    created() {
        this.getApprova(this.$api.monthpayindex)
        this.api = this.$api.monthpayindex;
        this.getSelectData()
        this.getMen()
    },
    filters:{
        times:function(amount){
            var myDate = new Date();  
            //   var y = myDate.getYear(); //获取当前年份(2位)  
            var y =  myDate.getFullYear(); //获取完整的年份(4位,1970-????)  
            var m =  myDate.getMonth()+1; //获取当前月份(0-11,0代表1月)         // 所以获取当前月份是myDate.getMonth()+1;   
            var d =  myDate.getDate(); //获取当前日(1-31)  
            var h = myDate.getHours(); //获取当前小时数(0-23)  
            var f = myDate.getMinutes(); //获取当前分钟数(0-59)  
            var s = myDate.getSeconds(); //获取当前秒数(0-59)  
            return  y+'-'+m+'-'+d +'  '+ h+':'+f+':'+s;
        }
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
                    status:this.activeName=='second' ? 0 : this.activeName=='third' ? 1 : this.activeName=='fourth' ? 2 : this.activeName=='fifth' ? 3 : '-1'
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
                path: '/approva/detailMon',
                query: {
                    id: val
                }
            })
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
            val.cardType = (val.cardTypeId && val.cardTypeId != 'null') ? parseInt(val.cardTypeId) : '';
            val.chargeId = val.charge ? parseInt(val.charge) : '';
            val.managerId = val.managerId ? parseInt(val.managerId) : '';
            val.financeId = val.financeId ? parseInt(val.financeId) : '';
            val.plate = val.plate ? val.plate : val.item[0].plate || '';
            val.carrier = val.carrier ? val.carrier : val.item[0].company || '';
            val.project = val.project ? val.project : val.item[0].project || '';
            val.carry = val.carry ? val.carry : val.item[0].carry || '';
            val.delivery = val.delivery ? val.delivery : val.item[0].delivery || '';
            
            val.apply = val.apply ? val.apply : JSON.parse(localStorage.getItem("info")).username;
            this.appDetail = val //数据
            this.statues = 3 //按钮状态
            this.dialogVisible = true //控制显示
            // console.log( this.appDetail,"-------------------------------------------------------")


            
        },
        // 打开驳回原因
        lookReason(val){
            this.appDetail = val
            this.dialogVisible = true
            this.statues = 4
        },
        handleClick(val){
            if(val.name == 'first'){
                this.getApprova(this.$api.monthpayindex)
            }else{
                this.getApprova(this.$api.payMonthstatus)
            }
        },
        // 搜索审批
        searchApproval(pageNum,pageSize){
            var approvalSearch = this.approvalSearch;
            this.$http.post(this.$api.monthpaysearch,{
                payNo:approvalSearch.payNo,
                customer:approvalSearch.customer,
                apply:approvalSearch.apply || '',
                status:approvalSearch.status,
                carrier:approvalSearch.carrier,
                month:approvalSearch.month || '',
                project:approvalSearch.project,
                createbegin:approvalSearch.appTimes ?approvalSearch.appTimes[0] : '',
                createend:approvalSearch.appTimes ?approvalSearch.appTimes[1] : '',
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
                    this.api = this.$api.monthpaysearch
                }else{
                    console.log('woyg')
                    this.pagin = true
                    this.$message('暂无搜索到相关审批，请重新搜索')
                }
            })
        },
        // 开发票
        invoice(val){
            this.$confirm('请确定是否已经收到发票?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.post(this.$api.payTaxmonth,{
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
                payType:val.payType,
                cardType:val.cardType || '',
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
            if(this.api == this.$api.monthpaysearch){
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
            if(this.api == this.$api.monthpaysearch){
                return this.searchApproval(val,this.pageSize)
            }
            this.getApprova(this.api,val,this.pageSize)
        },
        handleClose(){
            this.dialogVisible = false
            this.applyVisible = false
        },

        caclePay(id) {
            this.$http.post(this.$api.canclePay,{
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
        .dialog-footer{
            display: block;
        }
    }
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
    .operation+.operation{
        padding-top:10px;
    }
</style>