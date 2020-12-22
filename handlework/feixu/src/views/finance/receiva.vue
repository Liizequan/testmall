<template>
    <div class="all-order payment-finace">
        <!-- 我是所有的订单 -->
        <div class="top">
            <!-- <ul class="between">
                <li class="items-center">
                    <span>订单号：</span>
                    <p><el-input v-model="payment.orderNo"></el-input></p>
                </li>
                <li class="items-center">
                    <span>客户名称：</span>
                    <p><el-input v-model="payment.customer"></el-input></p>
                </li>
                <li class="items-center">
                    <span>司机名称：</span>
                    <p>
                        <el-input placeholder="名称" v-model="payment.username" class="input-with-select">
                        </el-input>
                    </p>
                </li>
            </ul>
            <ul class="between ptop20">
                <li class="items-center">
                    <span>录单员：</span>
                    <p><el-input v-model="payment.user"></el-input></p>
                </li>
                <li class="items-center">
                    <span>录单时间：</span>
                    <p>
                        <el-date-picker
                            v-model="payment.createTime"
                            style="width:100%"
                            value-format="yyyy-MM-dd" 
                            type="date"
                            placeholder="选择日期">
                        </el-date-picker>
                    </p>
                </li>
                <li class="items-center">
                    <span>付款方式：</span>
                    <p>
                        <el-select clearable  v-model="payment.payMethod" slot="prepend" placeholder="请选择" style="width:100%;">
                            <el-option label="网银" value="10"></el-option>
                            <el-option label="现结" value="20"></el-option>
                        </el-select>
                    </p>
                </li>
            </ul>
            <ul class="between ptop20">
                <li class="items-center">
                    <span>付款时间：</span>
                    <p>
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
                </li>
            </ul> -->
            
            <el-row :gutter="20">
                <el-col :span="6" class="items-center">
                    <span>系统单号：</span>
                    <p class="flex1"><el-input v-model="payment.orderNo"></el-input></p>
                </el-col>
                <el-col :span="6" class="items-center">
                    <span>业务单号：</span>
                    <p class="flex1"><el-input v-model="payment.numberOne"></el-input></p>
                </el-col>
                <el-col :span="6" class="items-center">
                    <span>DN号：</span>
                    <p class="flex1"><el-input v-model="payment.numberTwo"></el-input></p>
                </el-col>
                <el-col :span="6" class="items-center">
                    <span>客户名称：</span>
                    <p class="flex1"><el-input v-model="payment.customer"></el-input></p>
                </el-col>
            </el-row>
            <el-row :gutter="20" class="ptop20">
                <el-col :span="6" class="items-center">
                    <span>项目名称：</span>
                    <p class="flex1"><el-input v-model="payment.username"></el-input></p>
                </el-col>
                <el-col :span="6" class="items-center">
                    <span>录单员：</span>
                    <p class="flex1"><el-input v-model="payment.user"></el-input></p>
                </el-col>
                <el-col :span="6" class="items-center">
                    <span>收款方式：</span>
                    <p class="flex1">
                        <el-select clearable  v-model="payment.payMethod" slot="prepend" placeholder="请选择" style="width:100%;">
                            <el-option label="网银" value="10"></el-option>
                            <el-option label="现结" value="20"></el-option>
                        </el-select>    
                    </p>
                </el-col>
                <el-col :span="6" class="items-center">
                    <span>录单时间：</span>
                    <p class="flex1">

                        <el-date-picker
                            v-model="payment.payTimes"
                            type="daterange"
                            style="width:100%"
                            range-separator="至"
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
                    <span>收款时间：</span>
                    <p class="flex1">
                        <el-date-picker
                            v-model="payment.payTime"
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
                 <!-- <el-radio-group v-model="checkList">
                    <el-radio label="已完成"></el-radio>
                    <el-radio label="未完成"></el-radio>
                </el-radio-group> -->
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
                    <el-tab-pane label="已收" name="second"></el-tab-pane>
                    <el-tab-pane label="未收" name="third"></el-tab-pane>
                    <el-tab-pane label="异常账单" name="fourth"></el-tab-pane>
                </el-tabs>
                <!-- <div class="imports">
                    <el-button>导出</el-button>
                </div> -->
                <!-- <import-export :isExport="true" :exportApi="this.$api.payAdd"/> -->
                
                <import-export  v-if="(secled.length>0)">
                    <div slot="auto">
                        <el-button @click="addMonthly">生成月收</el-button>
                    </div>
                </import-export>
            </div>
            <!-- 数据列表 -->
             <el-table  :data="payData.data" @selection-change="handleSelectionChange" stripe style="width: 100%">
                <el-table-column  type="selection" width="55">
                </el-table-column>
                <el-table-column  prop="cost"  label="运费金额">
                </el-table-column>
                <el-table-column  prop="numberOne"  label="单号">
                    <template slot-scope="scope">
                        <!-- <el-link :underline="false" class="colb" @click="lookOrder(scope.row.id)">{{scope.row.numberOne}}</el-link> -->
                        <p>业务订单号：<el-link :underline="false"  class="order-num colb" @click="lookDetail(scope.row.numberOne)">{{scope.row.numberOne}}</el-link></p>
                        <p>系统订单号：<el-link :underline="false"  class="order-num colb" @click="lookOrder(scope.row.id)">{{scope.row.orderNo}}</el-link></p>
                    </template>
                </el-table-column>
                <el-table-column prop="customer" label="客户名称">
                </el-table-column>
                <el-table-column prop="contact" label="联系人">
                </el-table-column>
                <el-table-column prop="phone" label="联系电话">
                </el-table-column>
                <el-table-column  prop="tax"  label="发票状态">
                    <template slot-scope="scope">
                        <p>
                            {{scope.row.tax==10 ? '未开' : '已开'}}
                        </p>
                    </template>
                </el-table-column>
                <el-table-column  prop="receivedStatus"  label="账单状态">
                    <template slot-scope="scope">
                        <p>
                            {{scope.row.receivedStatus==10 ? '未到账' : '到账'}}
                        </p>
                    </template>
                </el-table-column>
                <el-table-column  prop="transferTime"  label="最后付款时间">
                    <template slot-scope="scope">
                        <!-- <p><el-link @click="lookDetail(scope.row.id)" class="colb">详情</el-link></p> -->
                        <p>
                            {{scope.row.transferTime ? scope.row.transferTime : ''}}
                        </p>
                    </template>
                </el-table-column>
                <el-table-column prop="payMethod" label="收款方式">
                </el-table-column>
                <el-table-column  prop="name"  label="操作">
                    <template slot-scope="scope">
                        <!-- <p ><el-link @click="lookDetail(scope.row.id)" class="colb">详情</el-link></p>
                        <p ><el-link @click="collection(scope.row.id)" class="colb">收发票</el-link></p> -->
                            <p><el-button type="primary" @click="lookDetail(scope.row.id)" class="backb" style="width:96px;">详情</el-button></p>
                            <p><el-button type="warning" @click="collection(scope.row.id)" class="backy" style="width:96px;margin-top:20px;" v-if="scope.row.tax==10">开发票</el-button></p>
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

            payment:{
                orderNo:'',//订单号：
                numberOne:'',//业务单号
                numberTwo:'',//DM单号	
                customer:'',//客户名称
                username:'',//司机名称：
                user:'',//录单员
                createTime:'',//录单时间
                payTimes:'',
                payMethod:'',//付款方式
                status:'',//状态
                payTime:'',
                begin:'',//付款开始时间
                end:'',//付款结束时间
            },
            payTime:[],

            currentPage:1,
            pagin:true,//是否显示
            payData:[],//页面数据
            payDatas:[],//所有数据
            pageSize:10,//一页的数据
            secled:[],//选中的
            daochuId:'',//选中的id
            api:'',//当前路径
        }
    },
    
    filters:{
        allMoney:function(amount){//形参
            if(amount){
                var allMoney = 0;
                for(var i of amount){
                    allMoney += parseFloat(i.cost)
                }
                return allMoney
            }
        }
    },
    created() {
        this.getPayData(this.$api.receiveIndex)
        this.api = this.$api.receiveIndex
    },
    methods: {
        getPayData(url,pageNum,pageSize){
            this.$http.get(url,{
                pageNum:pageNum || this.currentPage,
                pageSize:pageSize || this.pageSize,
            },res=>{
                console.log(res)
                // this.payData = res.data.slice(0,this.pageSize)
                this.payData = res.data
                if(res.data.length != 0){
                    this.pagin = false
                }else{
                    this.pagin = true
                }
            })
        },
        
        // 查看订单
        lookOrder(val){
            console.log(val,"111111111111111111111111111111111111111111")
            this.$router.push({
                path: '/order/detail',
                query: {
                    id: val
                }
            })
        },
        // 确认开发票
        collection(val){
            this.$confirm('请确定是否已经开好发票，一旦确定将无法更改?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.post(this.$api.receiveTax,{
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
        handleSelectionChange(val){
            this.secled = val
        },
        // 收款搜索
        paySearch(pageNum,pageSize){
            console.log(this.payment.begin)
            var payment =this.payment;
            this.$http.post(this.$api.receiveSearch,{
                orderNo:payment.orderNo,
                numberOne:payment.numberOne,//业务单号：
                numberTwo:payment.numberTwo,//DN号：
                customer:payment.customer,//客户名称
                username:payment.username,//司机名称：
                user:payment.user,//录单员
                // createTime:payment.createTime,//录单时间
                orderstart:payment.payTimes ? payment.payTimes[0] : '',
                orderend:payment.payTimes ? payment.payTimes[1] : '',
                payMethod:payment.payMethod,//付款方式
                status:payment.status,//状态
                begin:payment.payTime ? payment.payTime[0] : '',//付款开始时间
                end:payment.payTime ? payment.payTime[1] : '',//付款结束时间
                pageNum:pageNum,
                pageSize:pageSize,
            },res=>{
                console.log(res)
                // this.payData = res.data.slice(0,this.pageSize)
                if(res.data.data.length != 0){
                    this.pagin = false
                    this.activeName = 'first'
                    // this.payData = res.data.slice(0,this.pageSize)
                    this.payData = res.data
                    this.api = this.$api.receiveSearch;
                }else{
                    return this.$message('暂无相关收款')
                }
            })
        },
        orderTimeRange(val){
            this.payment.orderstart = val[0]
            this.payment.orderend = val[1]
        },
        // 时间选择
        chooseTimeRange(val){
            console.log(val)
            this.payment.begin = val[0]
            this.payment.end = val[1]
        },
        lookDetail(val){
            console.log('查看详情')
            // this.$router.push('/payment/detail')
            
            this.$router.push({
                path: '/receiva/detail',
                query: {
                    id: val
                }
            })
        },
        // payFun(val){
        //     if(val=='first'){
        //         this.getPayData(this.$api.receiveIndex)
        //     }else if(val == 'second'){
        //         this.getPayData(this.$api.receiveReceived)
        //     }else if(val == 'third'){
        //         this.getPayData(this.$api.receivePre)
        //     }else{
        //         this.getPayData(this.$api.receiveType)
        //     }
        // },
        addMonthly(){
            console.log('生成月收')
            this.$confirm('是否继续生成新月收订单?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.post(this.$api.receiveCreate,{
                    receiveId:this.daochuId,
                },res=>{
                    console.log(res)
                    this.$message(res.msg)
                    this.getPayData(this.api)
                })
            }).catch(() => {});
        },
        handleClick(val){
            console.log(val)
            if(val.name=='first'){
                this.getPayData(this.$api.receiveIndex)
                this.api = this.$api.receiveIndex
            }else if(val.name == 'second'){
                this.getPayData(this.$api.receiveReceived)
                this.api = this.$api.receiveReceived
            }else if(val.name == 'third'){
                this.getPayData(this.$api.receivePre)
                this.api = this.$api.receivePre
            }else{
                this.getPayData(this.$api.receiveType)
                this.api = this.$api.receiveType
            }
        },
        handleSizeChange(val){
            console.log(val)
            this.pageSize = val
            console.log('一页多少条数据')
            if(this.api == this.$api.receiveSearch){
                return this.paySearch(this.currentPage,val)
            }
            // this.payData = this.payDatas.slice(0,val)
            this.getPayData(this.api,this.currentPage,val)
        },
        handleCurrentChange(val){
            console.log(val)
            console.log('切换页数')
            console.log(this.pageSize)
            console.log(this.payDatas.slice(0,val*this.pageSize))
            if(this.api == this.$api.receiveSearch){
                return this.paySearch(val,this.pageSize)
            }
            // if(val!=1){
            //     this.payData = this.payDatas.slice((val*this.pageSize-this.pageSize),val*this.pageSize)
            // }else{
            //     this.payData = this.payDatas.slice(0,val*this.pageSize)
            // }
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