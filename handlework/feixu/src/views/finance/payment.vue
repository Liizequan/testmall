<template>
    <div class="all-order payment-finace">
        <!-- 我是所有的订单 -->
        <div class="top">
            <el-row :gutter="20">
                <el-col :span="6" class="items-center">
                    <span>系统单号：</span>
                    <p class="flex1"><el-input v-model="payment.orderNo"></el-input></p>
                </el-col>
                <el-col :span="6" class="items-center">
                    <span>业务单号  ：</span>
                    <p class="flex1"><el-input v-model="payment.numberOne"></el-input></p>
                </el-col>
                <el-col :span="6" class="items-center">
                    <span>DN号：</span>
                    <p class="flex1"><el-input v-model="payment.numberTwo"></el-input></p>
                </el-col>
                <el-col :span="6" class="items-center">
                    <span>{{!isusername ? '承运商' : '个人'}}：</span>
                    <p class="flex1"><el-input v-model="payment.company" @input="companyInput"></el-input></p>
                </el-col>
            </el-row>
            <el-row :gutter="20" class="ptop20">
                <el-col :span="6" class="items-center">
                    <span>司机名称：</span>
                    <p class="flex1"><el-input v-model="payment.username" @input="usernameInput" :disabled="iscompany"></el-input></p>
                </el-col>
                <el-col :span="6" class="items-center">
                    <span>录单员：</span>
                    <p class="flex1"><el-input v-model="payment.user"></el-input></p>
                </el-col>
                <el-col :span="6" class="items-center">
                    <span>付款方式：</span>
                    <p class="flex1">
                        <el-select clearable  v-model="payment.payMethod" slot="prepend" placeholder="请选择" style="width:100%;">
                            <el-option label="现结" value="10"></el-option>
                            <el-option label="月结" value="20"></el-option>
                        </el-select>    
                    </p>
                </el-col>
                <el-col :span="6" class="items-center">
                    <span>付款类型：</span>
                    <p class="flex1">
                        <el-select clearable  v-model="payment.paytype" slot="prepend" placeholder="请选择" style="width:100%;">
                            <el-option
                                v-for="item in paytype"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>    
                    </p>
                </el-col>
                <el-col :span="6" class="items-center ptop20">
                    <span>录单时间：</span>
                    <p class="flex1">
                             <el-date-picker
                            v-model="payTimes"
                            type="daterange"
                            style="width:100%"
                            range-separator="至"
                            @change="orderTimeRange"
                            value-format="yyyy-MM-dd" 
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker> 
                        <!-- <el-date-picker
                            v-model="payment.createTime"
                            style="width:100%"
                            value-format="yyyy-MM-dd" 
                            type="date"
                            placeholder="选择日期">
                        </el-date-picker> -->
                    </p>
                </el-col>
                <el-col :span="6" class="items-center ptop20">
                    <span>付款时间：</span>
                    <p class="flex1">
                        <el-date-picker
                            v-model="payTime"
                            type="daterange"
                            style="width:100%"
                            range-separator="至"
                            value-format="yyyy-MM-dd" 
                            @change="chooseTimeRange"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker> 
                    </p>
                </el-col>
            </el-row>
            <div class="ptop30">
                <div class="between">
                    <el-radio-group v-model="payment.status">
                        <el-radio label="10">已完成</el-radio>
                        <el-radio label="20">未完成</el-radio>
                    </el-radio-group>
                    <div>
                        总费用：{{payData.data | allMoney}}元 , 
                        总单数 {{payData.data ? payData.data.length : 0}}条 ; 
                        选中费用：{{secled |allMoney}}元 , 
                        选中 {{secled ? secled.length : 0}}条
                    </div>
                </div>
                <div class="btn ptop30">
                    <el-button type="primary" class="btn-elblue" style="width:180px;" @click="paySearch(currentPage,pageSize)">查询</el-button>
                </div>
            </div>
        </div>

        <div class="ptop40">
            
            <!-- 头部导航 -->
            <div class="nav-bar">
                <el-tabs v-model="activeName" @tab-click="handleClick" style="padding-left:10px;" >
                    <el-tab-pane label="全部" name="first"></el-tab-pane>
                    <el-tab-pane label="已付" name="second"></el-tab-pane>
                    <el-tab-pane label="待付" name="third"></el-tab-pane>
                    <el-tab-pane label="异常账单" name="fourth"></el-tab-pane>
                </el-tabs>
                <import-export  :dataLength="(secled.length==0)" :isExport="true" :exportApi="this.$api.payExport + '?exportId=' +daochuId">
                    <div slot="auto" v-if="secled.length>0">
                        <el-button @click="addMonthly">生成月付</el-button>
                    </div>
                </import-export>
            </div>
            <!-- 数据列表 -->
             <el-table  :data="payData.data" stripe style="width: 100%" 
                @selection-change="handleSelectionChange"
                element-loading-text="拼命加载中"
                v-loading="loading">
                <el-table-column  type="selection" width="55">
                </el-table-column>
                <el-table-column  prop="cost"  label="运费金额">
                </el-table-column>
                <el-table-column  prop="numberOne"  label="单号">
                    <template slot-scope="scope">
                        <!-- <el-link :underline="false" class="colb" @click="lookOrder(scope.row.orderId)">{{scope.row.numberOne}}</el-link> -->
                        <p>业务订单号：<el-link :underline="false"  class="order-num colb" @click="lookDetail(scope.row.id)">{{scope.row.numberOne}}</el-link></p>
                        <p>系统订单号：<el-link :underline="false"  class="order-num colb" @click="lookOrder(scope.row.orderId)">{{scope.row.orderNo}}</el-link></p>
                    </template>
                </el-table-column>
                <el-table-column prop="customer" label="客户名称">
                    <template slot-scope="scope">
                        <p> 承运商类型：{{scope.row.type}} </p>
                        <p> 承运商名称：{{scope.row.company}} </p>
                    </template>
                </el-table-column>
                <el-table-column prop="tax" label="发票状态">
                    <template slot-scope="scope">
                        <p>
                            <!-- {{scope.row.tax}} -->
                            {{scope.row.tax == 10 ? '未收' : '已收'}}
                        </p>
                    </template>
                </el-table-column>
                <el-table-column  prop="approvalStatus"  label="账单状态">
                     <template slot-scope="scope">
                        <p>
                            {{scope.row.approvalStatus == 20 ? '已支付' : '未支付'}}
                        </p>
                    </template>
                </el-table-column>
                <el-table-column  prop="approvalTime"  label="最后付款时间">
                    <template slot-scope="scope">
                        <!-- <p><el-link @click="lookDetail(scope.row.id)" class="colb">详情</el-link></p> -->
                        <p>
                            {{scope.row.approvalTime ? scope.row.approvalTime : ''}}
                        </p>
                    </template>
                </el-table-column>
                <el-table-column prop="payMethod" label="付款方式" width="85">
                </el-table-column>
                <el-table-column  prop="name"  label="操作" width="120">
                    <template slot-scope="scope">
                        <div >
                            <!-- <el-link :underline="false" @click="lookDetail(scope.row.id)" class="">详情</el-link>
                            <el-link :underline="false" @click="lookDetail(scope.row.id)" class="colb" v-if="scope.row.approvalStatus!=3">确认支付</el-link>
                            <el-link :underline="false" @click="lookDetail(scope.row.id)" class="colb" v-else>已支付</el-link> -->
                            <p><el-button type="primary" @click="lookDetail(scope.row.id)" class="backb" style="width:96px;">详情</el-button></p>
                            <p><el-button type="warning" @click="invoice(scope.row.id)" class="backy" style="width:96px;margin-top:20px;" v-if="scope.row.tax==10">收发票</el-button></p>
                            <p><el-button type="danger" @click="ConfirmPayment(scope.row)" class="backo" style="margin-top:20px;" v-if="scope.row.approvalStatus==1 || scope.row.approvalStatus==2">确认支付</el-button></p>    
                        </div>
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
                :total="payData.totalSize">
            </el-pagination>

        </div>
    </div>
</template>
<script>
import ImportExport from "@/components/ImportExport.vue";
export default {
    components: { ImportExport },
    data() {
        return {
            checkList:'',
            activeName:'first',
            input3:'',
            value1:'',
            select:'',
            loading:true,

            payment:{
                orderNo:'',//系统单号：
                numberOne:'',//业务单号
                numberTwo:'',//DM单号	
                company:'',//承运商：
                username:'',//司机名称：
                user:'',//录单员
                createTime:'',//录单时间
                orderstart:'',
                orderend:'',
                payMethod:'',//付款方式
                paytype:'',//付款类型
                status:'',//状态
                begin:'',//付款开始时间
                end:'',//付款结束时间
            },
            payTimes:'',
            payTime:'',

            currentPage:1,
            pagin:true,//是否显示
            payData:[],//页面数据
            payDatas:[],//所有数据
            pageSize:10,//一页的数据
            secled:[],//选中的
            daochuId:'',//选中的id
            api:'',
            paytype:[],//付款类型
            iscompany:false,
            isusername:false,
        }
    },
    filters:{
        allMoney:function(amount){//形参
            if(amount){
                console.log(amount)
                var allMoney = 0;
                for(var i of amount){
                    allMoney += parseFloat(i.cost)
                }
                return allMoney
            }
        },
        numadd:function(amount){
           console.log(amount)
        }
    },
    created() {
        this.getSelectData();
        this.getPayData(this.$api.payIndex)
        this.api = this.$api.payIndex
    },
    methods: {
        
        getSelectData(){
            this.$http.get(this.$api.orderData,{},res=>{
                console.log(res)
                this.paytype = res.data.paytype
            })
        },
        getPayData(url,pageNum ,pageSize){
            this.$http.get(url,{
                pageNum:pageNum || this.currentPage,
                pageSize:pageSize || this.pageSize,
            },res=>{
                console.log(res)
                // this.payData = res.data.slice(0,this.pageSize)
                this.payData = res.data
                this.loading = false
                if(res.data.length != 0){
                    this.pagin = false
                }else{
                    this.pagin = true
                }
            })
        },
        // 承运商
        companyInput(val){
            console.log(val)
            if(val && !this.isusername){
                this.iscompany = true;
                this.payment.username = ''
                this.isusername=false
            }else{
                this.iscompany = false
            }
        },
        // 司机名称
        usernameInput(val){
            if(val){
                this.isusername = true;
            }else{
                this.isusername = false
            }
        },
        handleSelectionChange(val){
            console.log('选中')
            this.secled = val;
        },
        // 生成月结
        addMonthly(){
            if(!this.daochuId){
                return this.$message('请选择月付的订单')
            }
            // for(var i of this.secled){
            //     if(i.customer != i.customer){
            //         console.log('nihao')
            //     }
            //     console.log(i.customer)
            // }
            for(var i=0; i<this.secled.length; i++){
                console.log(this.secled[i])

            }
                // return console.log(1)
            this.$confirm('是否继续生成新月付订单?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.post(this.$api.createpay,{
                    payId:this.daochuId,
                },res=>{
                    console.log(res)
                    this.$message(res.msg)
                    this.getPayData(this.api)
                })
            }).catch(() => {});
        },
        checkboxT(row, index){
            console.log(row,row.approvalStatus)
            // if(row.approvalStatus==10){
            //     return true
            // }else{
            //     return false
            // }
        },
        // 支付搜索
        paySearch(pageNum,pageSize){
            console.log(this.payment.begin)
            var payment =this.payment;
            console.log(this.payTime)
            this.$http.post(this.$api.paySearch,{
                orderNo:payment.orderNo,//系统单号
                numberOne:payment.numberOne,//业务单号：
                numberTwo:payment.numberTwo,//业务单号：
                company:payment.company,//客户名称
                username:payment.username,//司机名称：
                user:payment.user,//录单员
                // createTime:payment.createTime,//录单时间
                orderstart:this.payTimes ? this.payTimes[0] : '',
                orderend:this.payTimes ? this.payTimes[1] : '',
                payMethod:payment.payMethod,//付款方式
                payType:payment.paytype,//付款类型
                status:payment.status,//状态
                begin:this.payTime ?　this.payTime[0] : '',//付款开始时间
                end:this.payTime ?　this.payTime[1] : '',//付款结束时间
                pageNum:pageNum,
                pageSize:pageSize,
            },res=>{
                console.log(res)
                if(res.data.data.length != 0){
                    this.pagin = false
                    // this.payData = res.data.slice(0,this.pageSize)
                    this.activeName = 'first'
                    this.payData = res.data
                    this.api = this.$api.paySearch;
                }else{
                    return this.$message('暂无相关付款')
                }
            })
        },
        orderTimeRange(val){
            // this.payment.orderstart = val[0]
            // this.payment.orderend = val[1]
        },
        // 时间选择
        chooseTimeRange(val){
            console.log(val)
            this.payment.begin = val[0]
            this.payment.end = val[1]
        },
        // 查看订单
        lookOrder(val){
            this.$router.push({
                path: '/order/detail',
                query: {
                    id: val
                }
            })
        },
        // 开发票
        invoice(val){
            this.$confirm('请确定是否已经收到发票，一旦确定将无法更改?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.post(this.$api.payTax,{
                    id:val,
                    tax:20
                },res=>{
                    console.log(res)
                    this.$message(res.msg)
                    if(res.code==1){
                        // this.payFun(this.activeName)
                        this.getPayData(this.api)
                    }
                })
            }).catch(() => {   
            });
        },
        // 确认支付
        ConfirmPayment(val){
            console.log(val)
            var url = this.$api.suretwoApp;
            console.log(this.activeName)
            if(val.approvalStatus == 1){
                url = this.$api.sureoneApp;//经理
            }
            this.$confirm(val.approvalStatus==1 ? '经理：' : '财务部：' + '是否确认支付？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.post(url,{
                    id:val.id
                },res=>{
                    this.$message(res.msg)
                    if(res.code==1){
                        console.log('数据刷新')
                        this.payFun(this.activeName)
                    }
                })
            }).catch(() => {
            });
        },
        lookDetail(val){
            console.log('查看详情')
            // this.$router.push('/payment/detail')
            this.$router.push({
                path: '/payment/detail',
                query: {
                    id: val
                }
            })
        },
        // payFun(val){
        //     if(val=='first'){
        //         this.getPayData(this.$api.payIndex)
        //     }else if(val == 'second'){
        //         this.getPayData(this.$api.paid)
        //     }else if(val == 'third'){
        //         this.getPayData(this.$api.advance)
        //     }else{
        //         this.getPayData(this.$api.payError)
        //     }
        // },
        handleClick(val){
            console.log(val.name)
            if(val.name=='first'){
                this.getPayData(this.$api.payIndex)
                this.api = this.$api.payIndex
            }else if(val.name == 'second'){
                this.getPayData(this.$api.paid)
                this.api = this.$api.paid
            }else if(val.name == 'third'){
                this.getPayData(this.$api.advance)
                this.api = this.$api.advance
            }else{
                this.getPayData(this.$api.payError)
                this.api = this.$api.payError
            }
        },
        handleSizeChange(val){
            console.log(val)
            this.pageSize = val
            console.log('一页多少条数据')
            // return console.log(this.api == this.$api.paySearch)
            if(this.api == this.$api.paySearch){
                return this.paySearch(this.currentPage,val)
            }
            // this.payData = this.payDatas.slice(0,val)
            this.getPayData(this.api,this.currentPage,val)
        },
        handleCurrentChange(val){
            console.log(val)
            console.log('切换页数')
            // console.log(this.pageSize)
            // console.log(this.payDatas.slice(0,val*this.pageSize))
            // if(val!=1){
            //     this.payData = this.payDatas.slice((val*this.pageSize-this.pageSize),val*this.pageSize)
            // }else{
            //     this.payData = this.payDatas.slice(0,val*this.pageSize)
            // }
            console.log(this.api)
            
            if(this.api == this.$api.paySearch){
                return this.paySearch(val,this.pageSize)
            }
            this.getPayData(this.api,val,this.pageSize)
        }
        
    },
    watch: {
        'secled': function(newVal,oldVal){
            var selectId = [];
            for(var i of newVal){
                selectId.push(i.id)
            }
            this.daochuId = selectId.join(',')
        },
    },

}
</script>
<style lang="less" scoped>
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
</style>