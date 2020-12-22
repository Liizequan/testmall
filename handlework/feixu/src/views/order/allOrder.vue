<template>
    <div class="all-order">
        <!-- 我是所有的订单 -->
        <div class="top">
            <!-- <ul class="between">
                <li class="items-center">
                    <span>订单号：</span>
                    <p><el-input v-model="orderNo"></el-input></p>
                </li>
                <li class="items-center">
                    <span>客户名称：</span>
                    <p><el-input v-model="customer"></el-input></p>
                </li>
                <li class="items-center">
                    <span>司机名称：</span>
                    <p><el-input v-model="project"></el-input></p>
                </li>
            </ul> -->
            <!-- <ul class="between ptop20">
                <li class="items-center">
                    <span>录单员：</span>
                    <p><el-input v-model="user"></el-input></p>
                </li>
                <li class="items-center">
                    <span>录单时间：</span>
                    <p><el-input v-model="createTime"></el-input></p>
                </li>
                <li class="items-center">
                    <span>付款方式：</span>
                    <p>
                        <el-select v-model="payMethod" placeholder="请选择" style="width:100%">
                            <el-option
                            v-for="item in paymethodList"
                            :key="item.label"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </p>
                </li>
            </ul> -->
            <el-row :gutter="20">
                <!-- <el-col :span="8" class="items-center">
                    <span>订单号：</span>
                    <p class="flex1"><el-input v-model="orderNo"></el-input></p>
                </el-col> -->
                <el-col :span="6" class="items-center">
                    <span>系统单号：</span>
                    <p class="flex1"><el-input v-model="orderNo"></el-input></p>
                </el-col>
                <el-col :span="6" class="items-center">
                    <span>业务单号：</span>
                    <p class="flex1"><el-input v-model="numberOne"></el-input></p>
                </el-col>
                <el-col :span="6" class="items-center">
                    <span>DN号：</span>
                    <p class="flex1"><el-input v-model="numberTwo"></el-input></p>
                </el-col>
                <el-col :span="6" class="items-center">
                    <span>客户名称：</span>
                    <p class="flex1"><el-input v-model="customer"></el-input></p>
                </el-col>
            </el-row>
            <el-row :gutter="20" class="ptop20">
                <el-col :span="6" class="items-center">
                    <span>项目名称：</span>
                    <p class="flex1"><el-input v-model="project"></el-input></p>
                </el-col>
                <el-col :span="6" class="items-center">
                    <span>录单员：</span>
                    <p class="flex1"><el-input v-model="user"></el-input></p>
                </el-col>   
                <el-col :span="6" class="items-center">
                    <span>录单时间：</span>
                    <p class="flex1">
                        <!-- <el-input v-model="createTime"></el-input> -->
                            <el-date-picker
                            v-model="createTime"
                            type="daterange"
                            style="width:100%"
                            range-separator="至"
                            @change="chooseTimeRange"
                            value-format="yyyy-MM-dd" 
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker> 

                        <!-- <el-date-picker
                            style="width:100%;"
                            v-model="createTime"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期时间">
                        </el-date-picker> -->
                    </p>
                </el-col>
                <el-col :span="6" class="items-center">
                    <span>收款方式：</span>
                    <p class="flex1">
                        <el-select v-model="payMethod" clearable placeholder="请选择" style="width:100%">
                            <el-option
                            v-for="item in paymethodList"
                            :key="item.label"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </p>
                </el-col>
            </el-row>
            <div class="ptop30">
                <el-radio-group v-model="status">
                    <el-radio label="10">已完成</el-radio>
                    <el-radio label="20">未完成</el-radio>
                </el-radio-group>
                <div class="btn ptop30">
                    <el-button type="primary" class="btn-elblue" style="width:180px;" @click="search(currentPage,pageSize)">查询</el-button>
                </div>
            </div>
        </div>

        <div class="ptop40">
            
            <!-- 头部导航 -->
            <div class="nav-bar">
                <el-tabs v-model="activeName" @tab-click="handleClick" style="padding-left:10px;" >
                    <el-tab-pane label="全部" name="first"></el-tab-pane>
                    <el-tab-pane label="进行中的订单" name="second"></el-tab-pane>
                    <el-tab-pane label="已结束的订单" name="third"></el-tab-pane>
                    <el-tab-pane label="异常订单" name="fourth"></el-tab-pane>
                    <el-tab-pane label="已取消" name="fifth"></el-tab-pane>
                    <el-tab-pane label="草稿箱" name="sixth"></el-tab-pane>
                </el-tabs>  
                <!-- <div class="imports flex">
                    <el-upload
                        class="no-need-uplod-list"
                        :action="this.$http.url+this.$api.orderUpload"
                        :beforeUpload="beforeUpload"  
                        :on-success="submitUpload">
                        <el-button>导入</el-button>
                    </el-upload>
                    <el-button class='download'>
                        <a :href='this.$http.url+this.$api.orderExport' download=""  title="导出">导出</a>
                    </el-button>
                </div> -->
                <el-button class='download' style="position:absolute; right:220px;top:0">
                    <a :href='$http.url+$api.orderMu' target='_blank' download="" title="下载模板">下载模板</a>
                </el-button>
                <import-export 
                :dataLength="(secled.length==0)" 
                :isImport="true" :isExport="true" 
                :importApi="this.$api.orderUpload" 
                :exportApi="this.$api.orderExport + '?exportId=' +daochuId"
                />
            </div>
            <!-- 数据列表 -->
            <div>
            <el-table  :data="orderData.data" stripe style="width: 100%" 
                element-loading-text="拼命加载中"
                @selection-change="handleSelectionChange"
                v-loading="loading">
                <el-table-column  type="selection" width="55">
                </el-table-column>
                <el-table-column  prop="date"  label="单号">
                    <template slot-scope="scope">
                        <p>业务订单号：<el-link :underline="false"  class="order-num" @click="lookDetail(scope.row.id)">{{scope.row.numberOne}}</el-link></p>
                        <p>系统订单号：<el-link :underline="false"  class="order-num" @click="lookDetail(scope.row.id)">{{scope.row.orderNo}}</el-link></p>
                        <p :class="scope.row.receivedStatus==10 ?'colo' : 'colg'">
                            {{scope.row.receivedStatus==10 ? '未到账' : '到账'}}
                        </p>
                        <p ><el-link :underline="false" @click="lookDetail(scope.row.id)" style="font-size:12px;">查看详情+</el-link></p>
                    </template>
                </el-table-column>
                <el-table-column  prop="deliver"  label="运输路线">
                    <template slot-scope="scope">
                        <p>{{scope.row.deliver}}</p>
                        <p v-if="scope.row.deliver || scope.row.receive">至</p>
                        <p>{{scope.row.receive}}</p>
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="费用">
                    <template slot-scope="scope">
                        <p>应付费用：￥{{parseFloat(scope.row.drivercost.cost || 0 ) + parseFloat(scope.row.drivercost.dockCost || 0) +parseFloat(scope.row.drivercost.insurance || 0) }}</p>
                        <!-- <p>已付费用：￥{{parseFloat(scope.row.drivercost.amountPaid || 0) + parseFloat(scope.row.drivercost.cardPaid || 0)}}</p> -->
                        <p>应收费用：￥{{scope.row.cost || 0}}</p>
                    </template>
                </el-table-column>
                <el-table-column  prop="date"  label="司机信息">
                    <template slot-scope="scope">
                        {{scope.row.driver}}
                    </template>
                </el-table-column>
                <el-table-column  prop="name"  label="客户名称">
                    <template slot-scope="scope">
                        {{scope.row.customer}}
                    </template>
                </el-table-column>
                <el-table-column prop="address" width="120" label="订单状态">
                    <template slot-scope="scope">
                        <div class="fan-btn"
                            :class="scope.row.status== 1 ? 'backf' 
                            : scope.row.status== 2 ? 'backy' 
                            : scope.row.status== 3 ? 'backo' 
                            : scope.row.status== 4 ? 'backz'  
                            : scope.row.status== 5 ? 'backb' 
                            : scope.row.status== 6 ? 'backg' : 'backd' "
                        >
                            {{
                                scope.row.status== 1 ? '进行中' : scope.row.status == 2 ? '待发货' : scope.row.status == 3 ? '运输中' :
                                scope.row.status== 4 ? '待提货' : scope.row.status == 5 ? '待回单' : scope.row.status== 6 ? '已完成' : 
                                scope.row.status== 7 ? '异常' : scope.row.status== 8 ?'取消' : '失效订单'
                            }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column  prop="date"  label="录单时间">
                    <template slot-scope="scope">
                        {{scope.row.createTime}}
                    </template>
                </el-table-column>
                <el-table-column  prop="name"  width="120" label="操作">
                    <template slot-scope="scope">
                        <div>
                            <div style="btn-list">
                                <p class="p-btn" v-if="scope.row.status < 6"><el-button style="width:100px;" @click="confirm(scope.row)">确认完成</el-button></p>
                                <p class="p-btn" v-if="scope.row.status < 6">
                                    <el-upload
                                    class="upload-demo"
                                    :action="$http.fileUrl"
                                    :on-success="handleSuccess"
                                    :limit="1">
                                        <el-button @click="handlePreview(scope.row.id)">上传回单</el-button>
                                    </el-upload>
                                </p>
                                <p class="p-btn" v-if="scope.row.status == 6"><el-button style="width:100px;" @click="handleClose(scope.row)">关闭订单</el-button></p>
                                <p class="p-btn"><el-button style="width:100px;" @click="lookDetail(scope.row.id)">查看</el-button></p>
                            </div>
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
                :total="orderData.totalSize">
            </el-pagination>
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
            orderNo:'',//系统单号
            numberOne:'',//业务单号
            numberTwo:'',//DN号
            customer:'',
            project:'',
            user:'',
            createTime:'',
            payMethod:'',
            status:'',//选中
            begin:'',
            end:'',
            activeName:'first',

            currentPage:1,//分页
            orderData:[],//页面显示的订单
            orderDatas:[],//全部订单
            loading:true,
            pagin:true,//是否显示
            pageSize:10,//一页的数据
            // totalSize:0,//所有数据的条数

            paymethodList:[{// 收款方式
                value:10, label:'网银'
            },{
                value:20, label:'现金'
            }],
            api:'',//当前地址
            orderfileId:'',//上传回单id
            secled:[],//选中的
            daochuId:'',//选中的id
        }
    },
    created() {
        this.getOrderData(this.$api.orderIndex)
        this.api = this.$api.orderIndex
    },
    methods: {//orderGoing
        // 时间选择
        chooseTimeRange(val){
            console.log(val)
            // this.begin = val[0]
            // this.end = val[1]
        },
        search(pageNum,pageSize){//搜索
            console.log(this.createTime)
            this.$http.post(this.$api.orderSearch,{
                orderNo:this.orderNo,
                numberOne:this.numberOne,
                numberTwo:this.numberTwo,
                customer:this.customer,
                project:this.project,
                user:this.user,
                // createTime:this.createTime,
                orderstart:this.createTime ? this.createTime[0] : '',
                orderend:this.createTime ? this.createTime[1] : '',
                payMethod:this.payMethod,
                status:this.status,
                pageNum:pageNum,
                pageSize:pageSize,
            },res=>{
                console.log(res)
                this.activeName = 'first'
                if(res.data.length != 0){
                    this.pagin = false
                    this.orderData = res.data
                    this.api = this.$api.orderSearch
                    // this.orderData = res.data.slice(0,this.pageSize)
                }else{
                    this.$message('暂无相关订单')   
                }
            })
        },
        handleSelectionChange(val){
            console.log('选中')
            console.log(val )
            this.secled = val;
        },
        getOrderData(api,pageNum,pageSize){//获取列表数据
            this.$http.get(api,{
                pageNum:pageNum || this.currentPage,
                pageSize:pageSize || this.pageSize,
            },res=>{
                console.log(res)
                // this.orderDatas = res.data
                // this.orderData = res.data.slice(0,this.pageSize)
                this.orderData = res.data
                this.loading = false
                if(res.data.length != 0){
                    this.pagin = false
                }else{
                    this.pagin = true
                }
            })
        },
        lookDetail(val){//查看详情
            // this.$router.push('/order/detail?id='+val)
            this.$router.push({
                path: '/order/detail',
                query: {
                    id: val
                }
            })
        },
        handleClick(val){//导航数据切换
            if(val.name == 'first'){//所有
                this.getOrderData(this.$api.orderIndex)
                this.api = this.$api.orderIndex
            }
            else if(val.name == 'second'){//进行
                this.getOrderData(this.$api.orderGoing)
                this.api = this.$api.orderGoing
            }
            else if(val.name == 'third'){//结束
                this.getOrderData(this.$api.orderGood)
                this.api = this.$api.orderGood
            }
            else if(val.name == 'fourth'){
                this.getOrderData(this.$api.orderAbnormal)
                this.api = this.$api.orderAbnormal
            }
            else if(val.name == 'fifth'){
                this.getOrderData(this.$api.orderCancel)
                this.api = this.$api.orderCancel
            }
            else if(val.name == 'sixth'){
                this.getOrderData(this.$api.orerDraft)
                this.api = this.$api.orerDraft
            }
        },
        handleSizeChange(val){//页码数据选择
            this.pageSize = val
            // this.orderData = this.orderDatas.slice(0,val)
            console.log(this.api)
            console.log(this.$api.orderSearch)
            if(this.api = this.$api.orderSearch){
                console.log('nihao')
                return this.search(this.currentPage,val)
            }


            this.getOrderData(this.api,this.currentPage,val)
            console.log(val)
            console.log(this.pageSize)
        },
        handleCurrentChange(val){//页数切换
            // if(val!=1){
            //     this.orderData = this.orderDatas.slice((val*this.pageSize-this.pageSize),val*this.pageSize)
            // }else{
            //     this.orderData = this.orderDatas.slice(0,val*this.pageSize)
            // }
            console.log(this.api)
            console.log(this.$api.orderSearch)
            if(this.api == this.$api.orderSearch){
                return this.search(val,this.pageSize)
            }
            this.getOrderData(this.api,val,this.pageSize)
        },
        confirm(val){//确认
            this.$confirm('是否已经完成业务单号:'+val.numberOne+'?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.post(this.$api.orderConfirm,{
                    id:val.id,
                    status:6
                },res=>{
                    console.log(res)
                    this.$message(res.msg)
                    if(res.code==1){
                        this.getOrderData(this.api)
                    }
                })
            }).catch(() => {   
            });
        },
        handlePreview(val){//上传过程
            console.log(val)
            this.orderfileId = val
        },
        handleSuccess(val){//文件上传成功
            console.log(val)
            this.$http.post(this.$api.orderFile,{
                orderId:this.orderfileId,
                fileId:val.data.id
            },res=>{
                console.log(res)
                this.$message(res.msg)
                if(res.code==1){
                    this.getOrderData(this.api)
                }
            })
        },
        handleClose(val){//关闭订单
            console.log(val)
            this.$confirm('是否确认关闭该业务订单，一旦关闭将无法正常操作', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.post(this.$api.orderClose,{
                    id:val.id,
                    status:8
                },res=>{
                    console.log(res)
                    if(res.code==1){
                        this.getOrderData(this.api)
                    }
                })
            }).catch(() => {   
            });
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
        .order-num{
            // font-size:16px;
            color: #00A1E9;
        }
    }
    .p-btn+.p-btn{
        margin-top: 10px;
    }
</style>