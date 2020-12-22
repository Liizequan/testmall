<template>
    <div class="detail-order">
        <!-- 我是承运详情 -->
        <div class="between items-center order-top pbom20">
            <h4 class="top-title">承运商详情</h4>
            <div>
                <el-link>编辑</el-link>
            </div>
        </div>
        <!-- 基础信息 -->
        <div class="basics ptop20 pbom20 border-bottom">
            <p class="left-text">基础信息</p>
            <div class="basics-row">
                <el-row :gutter="20">
                    <el-col :span="8">
                        <div class="basics-list">
                            <span>承运商类型：</span>
                        </div>
                    </el-col>
                    <el-col :span="8" v-if="mysql">
                        <div class="basics-list">
                            <span>公司名称：</span>
                        </div>
                    </el-col>
                    <el-col :span="8" v-else>
                        <div class="basics-list">
                            <span>司机名称：</span>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="basics-list">
                            <span>联系人：</span>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="basics-list">
                            <span>联系电话：</span>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="basics-list">
                            <span>联系邮箱：</span>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="basics-list">
                            <span>联系地址：</span>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="basics-list">
                            <span>车牌号码：</span>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="basics-list">
                            <span>车型/大小：</span>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="basics-list">
                            <span>创建人：</span>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="basics-list">
                            <span>创建时间：</span>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="basics-list">
                            <span>最后更新人员：</span>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="basics-list">
                            <span>最后更新时间：</span>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
        <!-- 收付账号 -->
        <div class="basics ptop20">
            <div class="between">
                <p class="left-text">收付账号</p>
            </div>
            <div class="between  border-bottom pbom40">
                <div class="shipment-left"> 
                    <div>
                        <el-row :gutter="20">
                            <el-col :span="8">
                                <div class="shipment-list">
                                    <span> 名称：</span>
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="shipment-list">
                                    <span> 银行账号：</span>
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="shipment-list">
                                    <span> 所属银行：</span>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </div>
        </div>
        <!-- 其他备注及附件 -->
        <div class="ptop40 auto-fujian border-bottom pbom40">
            <p class="left-text">其他备注及附件</p>
            <div class="flex ptop40">
                <span>备注：</span>
                
            </div>
            <div class="flex ptop20">
                <span>主营项目：</span>
                
            </div>
            <div class="flex ptop20">
                <span>附件：</span>
                <ul>
                    <li>
                        <span>确定收货单.jpg</span>
                        <el-link>查看</el-link>
                        <el-link>下载</el-link>
                    </li>
                    <li class="ptop20">
                        <span>确定收货单.jpg</span>
                        <el-link>查看</el-link>
                        <el-link>下载</el-link>
                    </li>
                </ul>
            </div>
        </div>
        <!-- 操作记录 -->
        <div class="ptop40 pbom20">
            <p class="left-text">关联订单</p>

            <div class="table ptop20">
                <el-table :data="tableData" style="width: 100% ;">
                    <el-table-column prop="date"  label="订单号" >
                    </el-table-column>
                    <el-table-column   prop="name"  label="发货地">
                    </el-table-column>
                    <el-table-column prop="address" label="目的地">
                    </el-table-column>
                    <el-table-column   prop="name"  label="开单时间">
                    </el-table-column>
                    <el-table-column prop="address" label="用车类型">
                    </el-table-column>
                    <el-table-column   prop="name"  label="重量/件数">
                    </el-table-column>
                    <el-table-column prop="address" label="总费用（￥）">
                    </el-table-column>
                    <el-table-column prop="address" label="订单状态">
                        <template slot-scope="scope">
                            <el-button  @click="lookDetail(scope.$index, scope.row)">运输中</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="txt-center ptop40">
                    <el-link> 查看更多 <i class="el-icon-arrow-down"></i></el-link>
                </div>
            </div>  
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
                    <el-form-item label="付款人：">
                        <el-input v-model="form.name" style="width:400px"></el-input>
                    </el-form-item>
                    <el-form-item label="付款账号：">
                        <el-input v-model="form.name" style="width:400px"></el-input>
                    </el-form-item>
                    <el-form-item label="账号银行：">
                        <el-input v-model="form.name" style="width:400px"></el-input>
                    </el-form-item>
                    <el-form-item label="付款金额：">
                        <div class="between">
                            <el-input v-model="form.name"></el-input>
                            <el-button style="margin-left:20px;" type="primary" class="btn-elblue">全部</el-button>
                        </div>
                    </el-form-item>
                    <el-form-item label="油卡：">
                        <div class="between">
                            <el-input v-model="form.name"></el-input>
                            <el-button style="margin-left:20px;" type="primary" class="btn-elblue">全部</el-button>
                        </div>
                    </el-form-item>
                    <el-form-item label="付款时间：">
                        <!-- <el-time-picker placeholder="选择日期时间"   type="datetime" v-model="form.date2" style="width: 100%;"></el-time-picker> -->
                        <el-date-picker  v-model="form.date2"  type="datetime"
                            placeholder="选择日期时间" style="width:400px">
                        </el-date-picker>
                        
                    
                    </el-form-item>
                    <el-form-item label="备注：">
                        <el-input type="textarea" v-model="form.desc" style="width:400px"></el-input>
                    </el-form-item>
                    <el-form-item label="核对人：">
                        <el-input v-model="form.desc" style="width:400px"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button style="width:150px;" @click="dialogVisible = false">取 消</el-button>
                    <el-button style="width:150px;" type="primary" class="btn-elblue" @click="dialogVisible = false">确 认</el-button>
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
                    <el-form ref="form" :model="form" label-width="100px">
                        <el-form-item label="异常原因：">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item label="备注：">
                            <el-input type="textarea" v-model="form.name"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button style="width:150px;" @click="paymentDialog = false">取 消</el-button>
                    <el-button style="width:150px;" class="btn-elblue" type="primary" @click="paymentDialog = false">确 认</el-button>
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
                    <el-form ref="form" :model="form" label-width="100px">
                        <el-form-item label="备注：">
                            <el-input type="textarea" v-model="form.name"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button style="width:150px;" @click="paymentDialog = false">取 消</el-button>
                    <el-button style="width:150px;" class="btn-elblue" type="primary" @click="paymentDialog = false">确认</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
export default {
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
            dialogVisible: false,//继续支付
            paymentDialog:false,//标记异常
            nopaymentDialog:false,//取消异常


            // 弹框
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            }
 
        }
    },
    methods: {
        // 到账
        tihuo(){
            console.log('提货')
            this.dialogVisible = true
        },
        // 申请支付
        payment(){
            this.paymentDialog = true
        },
        // 申请支付
        nopayment(){
            this.nopaymentDialog = true
        },
        handleClose(done) {
            console.log('关闭')
            this.dialogVisible = false
            this.paymentDialog = false
            this.nopaymentDialog = false
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
                margin-top:20px;
                margin-bottom: 40px;
            }
            .basics-row{
                .basics-list{
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
                margin-bottom: 36px;
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
        }

        //应付以及承运信息
        .shipment-left{
            width:100%;
            .shipment-list{
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
        .auto-fujian{
            span{
                color:@col9;
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
        
    }
</style>