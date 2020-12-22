<template>
    <div class="detail-order">
        <!-- 我是收款详情 -->
        <div class="between items-center order-top ">
            <h4 class="top-title">收款详情</h4>
            <div class="between">
                <el-button @click="payment"  v-if="receiveDet.status!=7">标记异常</el-button>
                <el-button @click="nopaymentDialog = true" v-else>取消异常</el-button>
                <!-- <el-button>导出</el-button> -->
                <import-export  :isExport="true" :exportApi="this.$api.exportOne+'?id=' + this.$route.query.id"/>
            </div>
        </div>
        <!-- 异常信息 -->
        <div class="unusual border-bottom" v-if="receiveDet.status==7">
            <div class="items-center">
                <span>异常原因：</span>
                <b>{{receiveDet.errorReason}}</b>
            </div>
             <div class="items-center">
                <span>备注：</span>
                {{receiveDet.errorRemark}}
            </div>
        </div>
        <!-- 基础信息 -->
        <div class="basics">    
            <p class="left-text">基础信息</p>
            <div class="basics-row">
                <el-row :gutter="20">
                    <el-col :span="6">
                        <div class="basics-list">
                            <span>客户名称：</span>
                            <p class="flex1">{{receiveDet.customer}}</p>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="basics-list">
                            <span>联系人：</span>
                            <p class="flex1">{{receiveDet.contact}}</p>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="basics-list">
                            <span>联系电话：</span>
                            <p class="flex1">{{receiveDet.phone}}</p>
                        </div>
                    </el-col>
                    <!-- <el-col :span="6">
                        <div class="basics-list">
                            <span>订单号码：</span>
                            {{receiveDet.orderNo}}
                        </div>
                    </el-col> -->
                    <el-col :span="6">
                        <div class="basics-list">
                            <span>业务单号：</span>
                            <p class="flex1">{{receiveDet.numberOne}}</p>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="basics-list">
                            <span>业务单号：</span>
                            <p class="flex1">{{receiveDet.numberOne}}</p>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="basics-list">
                            <span>DN号：</span>
                            <p class="flex1">{{receiveDet.numberTwo}}</p>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="basics-list">
                            <span>货物类型：</span>
                            <p class="flex1">{{goods[0].type}}</p>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="basics-list">
                            <span>货物名称：</span>
                            <p class="flex1">{{goods[0].name}}</p>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="basics-list">
                            <span>件数/重量/体积：</span>
                            <p class="flex1">{{goods[0].num+'/'+goods[0].weight+'/'+goods[0].volume}}</p>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="basics-list">
                            <span>创建时间：</span>
                            <p class="flex1">{{receiveDet.createTime}}</p>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="basics-list">
                            <span>录单人员：</span>
                            <p class="flex1">{{receiveDet.user}}</p>
                        </div>
                    </el-col>
                    <!-- <el-col :span="6">
                        <div class="basics-list">
                            <span>最后操作人：</span>
                            {{receiveDet.user}}
                            等待确定
                        </div>
                    </el-col> -->
                    <el-col :span="6">
                        <div class="basics-list">
                            <span>最后更新时间：</span>
                            <p class="flex1">{{receiveDet.updateTime}}</p>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
        <!-- 应付以及承运信息 -->
        <div class="address">
            <div class="between">
                <p class="left-text">收款信息</p>
                <!-- <el-button style="height:40px;margin-top:30px;">全部付款</el-button> -->
            </div>
            <div class="between  border-bottom pbom20">
                <div class="shipment-left"> 
                    <div>
                        <el-row :gutter="20">
                            <el-col :span="6">
                                <div class="shipment-list">
                                    <span> 付款人：</span>
                                    <p class="flex1">{{receiveDet.accountHolder}}</p>
                                </div>
                            </el-col>
                            <el-col :span="6">
                                <div class="shipment-list">
                                    <span> 付款账号：</span>
                                    <p class="flex1">{{receiveDet.bankAccount}}</p>
                                </div>
                            </el-col>
                            <el-col :span="6">
                                <div class="shipment-list">
                                    <span> 付款银行：</span>
                                    <p class="flex1">{{receiveDet.openingBank}}</p>
                                </div>
                            </el-col>
                            <el-col :span="6">
                                <div class="shipment-list">
                                    <span> 核对人员：</span>
                                    <p class="flex1">{{receiveDet.checkman}}</p>
                                </div>
                            </el-col>
                            <!-- <el-col :span="6">
                                <div class="shipment-list">
                                    <span> 付款类型：</span>
                                    {{receiveDet.receivedStatus}}
                                </div>
                            </el-col> -->
                            <el-col :span="6">
                                <div class="shipment-list">
                                    <span> 付款方式：</span>
                                    <p class="flex1">{{receiveDet.payMethod}}</p>
                                </div>
                            </el-col>
                            <!-- <el-col :span="6">
                                <div class="shipment-list">
                                    <span> 油卡：</span>
                                    {{receiveDet.card}}
                                </div>
                            </el-col> -->
                        </el-row>
                    </div>
                    <div class="ptop40 items-center">
                        <!-- <p class="items-center">总运费：<strong class="backorange"> 0000.00</strong>元；
                        已付0000元，油卡0000元；还需要支付<span class="backorange">0000.00</span>元</p>  -->
                        <!-- <p class="items-center">总运费：
                                <strong class="backorange"> 
                                    {{
                                    (parseInt(receiveDet.cost) || 0) + 
                                    (parseInt(receiveDet.dockCost) || 0) + 
                                    (parseInt(receiveDet.insurance) || 0) }}
                                </strong>元；  
                            已付{{receiveDet.amountPaid || 0}}元，油卡{{receiveDet.cardPaid || 0}}元；
                            还需要支付<span class="backorange">
                                {{
                                    (parseInt(receiveDet.cost) || 0) + 
                                    (parseInt(receiveDet.dockCost) || 0) + 
                                    (parseInt(receiveDet.insurance) || 0) -
                                    (parseInt(receiveDet.amountPaid) || 0)-
                                    (parseInt(receiveDet.cardPaid) || 0)
                                }}    
                            </span>元
                        </p>  -->
                    </div>
                </div>
            </div>
            <div class="btn ptop20 flex">
                <!-- <el-button @click="tihuo" type="primary" class="backb">收款</el-button> -->
                <!-- <el-button @click="Received" type="danger" class="backo">到账</el-button> -->
                <!-- <el-button>上传凭证</el-button> -->
                <el-upload
                    class="upload-demo"
                    :action="$http.fileUrl"
                    :show-file-list="false"
                    :beforeUpload="beforeAvatarUploadPdf"  
                    :on-success="handleAvatarSuccess">
                    <div class="items-center">
                        <p style="text-align:left">
                            <el-button>上传凭证</el-button>
                        </p>
                    </div>  
                </el-upload>
            </div>
            
            <!-- <div class="table">
                <b>付款记录</b>
                <div>
                <el-table :data="tableData" style="width: 100% ; border-right:1px solid #E5E5E5; border-left:1px solid #E5E5E5">
                    <el-table-column prop="date"  label="付款人" >
                    </el-table-column>
                    <el-table-column   prop="name"  label="付款账号">
                    </el-table-column>
                    <el-table-column prop="address" label="账号银行">
                    </el-table-column>
                    <el-table-column   prop="name"  label="付款金额">
                    </el-table-column>
                    <el-table-column prop="address" label="付款时间">
                    </el-table-column>
                    <el-table-column   prop="name"  label="备注">
                    </el-table-column>
                    <el-table-column prop="address" label="核对人">
                    </el-table-column>
                </el-table>
                </div>
            </div>   -->
        </div>
        <!-- 支付凭证 -->
        <div class="ptop40 border-bottom pbom40">
            <p class="left-text">支付凭证</p>
            <div class="flex fujian ptop20">
                <span>附件：</span>
                <ul>
                    <li v-for="(item,index) in file" :key="index">
                        <span class="colb">{{item.filelist.name}}</span>
                        <el-link @click="LookImg(item.filelist.path)">查看</el-link>
                        <!-- <el-link :href="$http.noUrl+path">下载</el-link> -->
                        <el-link :href='$http.noUrl+item.filelist.path' class="colb" @click="lookFile(item)" download="" title="下载">下载</el-link>
                    </li>
                    <!-- <li class="ptop20">
                        <span>确定收货单.jpg</span>
                        <el-link>查看</el-link>
                        <el-link>下载</el-link>
                    </li> -->
                </ul>
            </div>
        </div>
        <!-- 操作记录 -->
        <div class="ptop40 border-bottom pbom40">
            <p class="left-text">操作记录</p>
            <el-table  :data="log" style="width: 100%" class="ptop20">
                <el-table-column prop="createTime"  label="时间："   width="180">
                </el-table-column>
                <el-table-column   prop="user"  label="操作人：" width="180">
                </el-table-column>
                <el-table-column prop="message" label="事项：">
                </el-table-column>
            </el-table>
        </div>
        <!-- 弹框 -->
        <div class="is-dialog">
            <!-- 继续支付 -->
            <el-dialog
                :visible.sync="dialogVisible"
                width="640px"
                top="100px"
                center
                :before-close="handleClose"
                custom-class="status-dialog"
                >
                <div slot="title">
                    <b class="font24">订单状态</b>
                    <p><span>请核实订单状态，一旦确认无法更改</span></p>
                </div>
                <el-form ref="form" :model="form" label-width="100px">
                    <el-form-item label="收款人：">
                        <el-input v-model="form.accountHolder" style="width:400px"></el-input>
                    </el-form-item>
                    <el-form-item label="收款账号：">
                        <el-input v-model="form.bankAccount" maxlength="19" style="width:400px"></el-input>
                    </el-form-item>
                    <el-form-item label="所属银行：">
                        <el-input v-model="form.openingBank" style="width:400px"></el-input>
                    </el-form-item>
                    <el-form-item label="收款金额：">
                        <div class="between">
                            <el-input v-model="form.amountReceived"></el-input>
                            <el-button style="margin-left:20px;" type="primary" class="btn-elblue" @click="allMoney">全部</el-button>
                        </div>
                    </el-form-item>
                    <!-- <el-form-item label="油卡：">
                        <div class="between">
                            <el-input v-model="form.name"></el-input>
                            <el-button style="margin-left:20px;" type="primary" class="btn-elblue">全部</el-button>
                        </div>
                    </el-form-item> -->
                    <el-form-item label="收款时间：">
                        <!-- <el-time-picker placeholder="选择日期时间"   type="datetime" v-model="form.date2" style="width: 100%;"></el-time-picker> -->
                        <el-date-picker  v-model="form.transferTime" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择日期时间" style="width:400px">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="备注：">
                        <el-input type="textarea" v-model="form.receivedRemark" style="width:400px"></el-input>
                    </el-form-item>
                    <el-form-item label="核对人：">
                        <!-- <el-input v-model="form.checkman" style="width:400px"></el-input> -->
                        <el-select v-model="form.checkman" clearable  placeholder="请选择" style="width:400px">
                            <el-option
                            v-for="item in userList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button style="width:150px;" @click="dialogVisible = false">取 消</el-button>
                    <el-button style="width:150px;" type="primary" class="btn-elblue" @click="orderStatus">确 认</el-button>
                </span>
            </el-dialog>

            <!-- 标记异常 -->
            <el-dialog
                :visible.sync="paymentDialog"
                width="640px"
                top="70px"
                center
                :before-close="handleClose"
                custom-class="status-dialog payment-dialog"
                >
                <div slot="title">
                    <b class="font24">标记异常</b>
                    <p><span>此项目异常的原因主要是什么？</span></p>
                </div>
                <div>
                    <el-form ref="abnormal" :model="abnormal" label-width="100px">
                        <el-form-item label="异常原因：">
                            <el-input v-model="abnormal.errorReason"></el-input>
                        </el-form-item>
                        <el-form-item label="备注：">
                            <el-input type="textarea" v-model="abnormal.errorRemark"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button style="width:150px;" @click="paymentDialog = false">取 消</el-button>
                    <el-button style="width:150px;" class="btn-elblue" type="primary" @click="updataSubmit">确 认</el-button>
                </span>
            </el-dialog>

            <!-- 取消异常 -->
            <el-dialog
                :visible.sync="nopaymentDialog"
                width="640px"
                top="70px"
                center
                :before-close="handleClose"
                custom-class="status-dialog payment-dialog"
                >
                <div slot="title">
                    <b class="font24">取消异常</b>
                    <p><span>更改订单异常状态</span></p>
                </div>
                <div>
                    <el-form label-width="100px">
                        <el-form-item label="备注：">
                            <el-input type="textarea" v-model="yichang"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button style="width:150px;" @click="paymentDialog = false">取 消</el-button>
                    <el-button style="width:150px;" class="btn-elblue" type="primary" @click="nopayment">确认</el-button>
                </span>
            </el-dialog>


            <!-- 附件 -->
            <el-dialog
                :visible.sync="lookFileImg"
                width="640px"
                center
                :before-close="handleClose"
                custom-class="status-dialog"
                >
                <div slot="title">
                    <b class="font24">附件信息</b>
                    <p><span>此附件只能查看图片，如不是图片，请下载后查看</span></p>
                </div>
                <div class="img">
                    <el-image :src="$http.noUrl + fileList"></el-image>
                    <!-- {{$http.noUrl + fileList}} -->
                    <!-- <el-image src="http://n.sinaimg.cn/sinacn20190522s/192/w668h324/20190522/8e80-hxhyiun3381047.jpg"></el-image> -->
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button style="width:150px;" @click="lookFileImg = false">取 消</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import ImportExport from "@/components/ImportExport.vue";
export default {
    components: { ImportExport },
    data(){
        return {
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

            yichang:'',// 取消异常原因
            
            dialogVisible: false,//继续支付
            paymentDialog:false,//标记异常
            nopaymentDialog:false,//取消异常
            lookFileImg:false,//付件
            fileList:'',//图片查看

            abnormal:{
                errorReason:'',
                errorRemark:'',
            },
            // 弹框
            form: {
                accountHolder: '',
                bankAccount: '',
                openingBank: '',
                amountReceived: '',
                delivery: false,
                transferTime: '',
                receivedRemark: '',
                checkman: ''
            },


            receiveDet:{},
            goods:[
                {type:'',name:'',num:'',weight:'',volumn:''},
            ],
            carrier:[],
            log:[],
            file:[],
            userList:[],//所有用户
 
        }
    },
    created() {
        this.getDetail()
        this.getUser()
    },
    methods: {
        getDetail(){
            this.$http.get(this.$api.receiveLook,{
                id:this.$route.query.id
            },res=>{
                console.log(res)
                this.receiveDet = res.data
                this.goods = res.data.goods;
                this.carrier = res.data.carrier;
                this.log=res.data.log
                this.file = res.data.file;
            })
        },
        // 获取用户
        getUser(){
            this.$http.get(this.$api.dataUserlist,{},res=>{
                console.log(res)
                this.userList = res.data
            })
        },
        // 到账dialogVisible = false
        // 到账
        Received(){
            this.$confirm('请确定是否已经到账，一旦确定将无法修改?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.post(this.$api.orderReceived,{
                    id:this.$route.query.id,
                },res=>{
                    console.log(res)
                    this.$message(res.msg)
                    if(res.code == 1){
                        this.getDetail()
                    }
                })
            }).catch(() => {    
            });
        },
        tihuo(){
            console.log('提货')
            this.dialogVisible = true
        },
        // 标记异常
        updataSubmit(){
            this.$http.post(this.$api.signBnormal,{
                id:this.$route.query.id,
                status:7,
                errorReason:this.abnormal.errorReason,
                errorRemark:this.abnormal.errorRemark,
            },res=>{
                console.log(res)
                this.$message(res.msg)
                if(res.code==1){
                    this.paymentDialog = false
                    this.getDetail()
                }
            })  
        },
        orderStatus(){
            var form = this.form;
            if(!form.accountHolder){
                return this.$message('付款人不能为空')
            }
            if(!form.bankAccount){
                return this.$message('付款账号不能为空')
            }else if(!this.$reg.onlyne(form.bankAccount )){
                this.$message({
                    message: '付款账号不对',
                    center: true
                });
            }
            if(!form.openingBank){
                return this.$message('所属银行不能为空')
            }
            if(!form.amountReceived){
                return this.$message('付款金额不能为零或空')
            }
            if(form.amountReceived>this.receiveDet.cost){
                return this.$message('付款金额不能大于订单费用')
            }
            if(!form.checkman){
                return this.$message('核对人不能为空')
            }

            this.$http.post(this.$api.orderReceived,{
                id:this.$route.query.id,
                accountHolder:form.accountHolder,
                bankAccount:form.bankAccount,
                openingBank:form.openingBank,
                amountReceived:form.amountReceived,
                transferTime:form.transferTime,
                receivedRemark:form.receivedRemark,
                checkman:form.checkman,
            },res=>{
                console.log(res)
                this.$message(res.msg)
                if(res.code == 1){
                    this.getDetail()
                    this.dialogVisible = false
                }
            })
        },
        allMoney(){
            console.log('剩下未支付的所有金额');
            this.form.amountReceived = this.receiveDet.cost
        },
        // 申请支付
        payment(){
            this.paymentDialog = true
        },
        
        beforeAvatarUploadPdf(file){
            console.log(file)
             var testmsg=file.name.substring(file.name.lastIndexOf('.')+1) 
            // const extension = testmsg === 'xls'
            // const extension2 = testmsg === 'xlsx'
            const isLt2M = file.size / 1024 / 1024 < 5
            // if(!extension && !extension2) {
            //     this.$message({
            //     message: '上传文件只能是 xls、xlsx格式!',
            //     type: 'warning'
            //     });
            // }
            if(!isLt2M) {
                this.$message({
                message: '上传文件大小不能超过 5MB!',
                type: 'warning'
                });
            }
            // return extension || extension2 && isLt2M
            return isLt2M

        },
        handleAvatarSuccess(file){
            console.log(file)
            this.$message(file.msg)
            if(file.code==1){
                this.$http.post(this.$api.orderfile,{
                    orderId:this.$route.query.id,
                    fileId:file.data.id
                },res=>{
                    console.log(res)
                    this.getDetail();
                })
            }
        },
        // 取消异常确定
        nopayment(){
            this.$http.post(this.$api.signBnormal,{
                id:this.$route.query.id,
                status:6,
                errorRemark:this.yichang,
            },res=>{
                console.log(res)
                this.$message(res.msg)
                if(res.code == 1){
                    this.nopaymentDialog = false
                    this.getDetail()
                }
            })
        },
        // 查看图片
        LookImg(val){
            this.fileList = val;
            this.lookFileImg = true
        },
        handleClose(done) {
            console.log('关闭')
            this.dialogVisible = false
            this.paymentDialog = false
            this.nopaymentDialog = false
            this.lookFileImg = false
            // this.$confirm('确认关闭？')
            // .then(_ => {
            //     done();
            // })
            // .catch(_ => {});
        },
        onSubmit() {
            console.log('submit!');
        }
    
    },
}
</script>
<style lang="less" scoped>
    @backblue:#00A1E9;
    @backorange:#FF5531;
    // #F5F7F9
    @rem:256/16rem;
    @colf:#fff;
    @col3:#333;
    @col9:#999;
    @border:1px solid #E5E5E5;
    .font24{
        font-size: 24/@rem;
    }
    
    .border{
        border:@border;
    }
    .border-bottom{
        border-bottom:@border;
    }
    .detail-order{
        font-size: 14/@rem;
        .smale-title{
            font-size: 18/@rem;
            color:@col3;
        }
        .order-top{
            padding-bottom: 40px;
            border-bottom:@border;
        }
        // 异常信息
        .unusual{
            padding:60px 0 40px;
            .items-center{
                height: 40px;
                line-height: 40px;
            }
            span{
                display: inline-block;
                width:80px;
            }    
        }

        // 基础信息
        .basics{
            .left-text{
                margin-top:40px;
                margin-bottom: 40px;
            }
            .basics-row{
                .basics-list{
                    display: flex;
                    padding-bottom:20px;
                    span{
                        color: @col9;
                    }
                }
            }
            .basics-btn{
                padding:40px 0;
            }
        }

        // 地址信息
        .address{
            .left-text{
                margin-top:40px;
                margin-bottom: 20px;
            }
            .is-row{
                padding-bottom: 40px;
            }
            .address-list{
                span{
                    display: inline-block;
                    width:70px;
                }
                p+p{
                    padding-left:40px;
                }
            }
            
            .table{
                b{
                    display: block;
                    padding:30px 0;
                }
            }
            .backo,.backb{
                width:100px;
            }
        }
        .fujian {
            ul{
                li+li{
                    padding-top:20px;
                }
            }
        }

        //应付以及承运信息
        .shipment-left{
            width:100%;
            .shipment-list{
                display: flex;
                padding-top:20px;
                span{
                    color: @col9;
                }
            }
        }
        .shipment-right{
            img{
                width:200px;
                height:300px;
            }
            .txt-center{
                height: 380px;
            }
            .btn{
                text-align: right;
            }
        }

        // 弹框
        // 待收货
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
        // 申请支付
        .payment-dialog{
            .payment-content{
                .payment-row-list{
                    span{
                        display: inline-block;
                        width:100px;
                    }
                }
                .back-title{
                    background-color: #F8F6F5;
                }
                .table-list{
                    height: 50px;
                    line-height: 50px;
                    padding:0 20px;
                    border:@border;
                }
                .table-list+.table-list{
                    border-top:0;
                }
                .auto-list{
                    border:@border;
                    padding:20px;
                    .is-row{
                        height: 55px;
                        line-height: 55px;
                        span{
                            display: inline-block;
                            width:80px;
                        }
                        p{
                            width:160px;
                        }
                    }
                }
            }
        }
        .img{
            margin:auto;
            text-align: center;
        }
    }
</style>