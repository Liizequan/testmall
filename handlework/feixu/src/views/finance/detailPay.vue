<template>
    <div class="detail-order">
        <!-- 我是付款详情 -->
        <div class="between items-center order-top ">
            <h4 class="top-title">付款详情</h4>
            <div class="between">
            <!-- <el-button :disabled="true" type="warning">订单号 {{detailData.id}}</el-button> -->
                <el-button @click="signBnormal" v-if="detailData.status !=7">标记异常</el-button>
                <el-button @click="nopaymentDialog = true" v-else>取消异常</el-button>
                <!-- <el-button>导出</el-button> -->
                <import-export :isExport="true" :exportApi="this.$api.exportOne+'?id=' + this.$route.query.id"/>
            </div>
        </div>
        <!-- 异常信息 -->
        <div class="unusual border-bottom" v-if="detailData.status==7">
            <div class="items-center">
                <span>异常原因：</span>
                <b>{{detailData.errorReason}}</b>
            </div>
             <div class="items-center">
                <span>备注：</span>
                {{detailData.errorRemark}}
            </div>
        </div>
        <!-- 基础信息 -->
        <div class="basics border-bottom pbom20">
            <p class="left-text">基础信息</p>
            <div class="basics-row">
                <el-row :gutter="20">
                    <el-col :span="6">
                        <div class="basics-list">
                            <span>客户名称：</span>
                            <p class="flex1">{{detailData.customer}}</p>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="basics-list">
                            <span>联系人：</span>
                            <p class="flex1">{{detailData.contact}}</p>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="basics-list">
                            <span>联系电话：</span>
                            <p class="flex1">{{detailData.phone}}</p>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="basics-list">
                            <span>系统订单号：</span>
                            {{detailData.orderNo}}
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="basics-list">
                            <span>业务单号：</span>
                            <p class="flex1">{{detailData.numberOne}}</p>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="basics-list">
                            <span style="width:60px;">DN号：</span>
                            {{detailData.numberTwo}}
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="basics-list">
                            <span>录单人员：</span>
                            <p class="flex1">{{detailData.user}}</p>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="basics-list">
                            <span>最后操作人：</span>
                            <p class="flex1">{{carrier.lastuser}}</p>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="basics-list">
                            <span>创建时间：</span>
                            <p class="flex1">{{detailData.createTime}}</p>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="basics-list">
                            <span>最后更新时间：</span>
                            <p class="flex1">{{detailData.updateTime}}</p>
                            
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
        
        <!-- 货物信息 -->
        <div class="basics border-bottom pbom20">
            <p class="left-text">货物信息</p>
            <div class="basics-row">
                <el-row :gutter="20" v-for="(item,index) in detailData.goods" :key="index">
                    <el-col :span="5">
                        <div class="basics-list">
                            <span>货物类型：</span>
                            <p class="flex1">{{item.type}}</p>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="basics-list">
                            <span>货物名称：</span>
                            <p class="flex1">{{item.name}}</p>
                        </div>
                    </el-col>
                    <el-col :span="4">
                        <div class="basics-list">
                            <span>数量：</span>
                            <p class="flex1">{{item.num}}</p>
                        </div>
                    </el-col>
                    <el-col :span="4">
                        <div class="basics-list">
                            <span>重量：</span>
                            <p class="flex1">{{item.weight}}吨</p>
                        </div>
                    </el-col>
                    <el-col :span="4">
                        <div class="basics-list">
                            <span>体积：</span>
                            <p class="flex1">{{item.volume}}方 </p>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
        <!-- 应付以及承运信息 -->
        <div class="address border-bottom pbom40">
            <div class="between">
                <p class="left-text">应付以及承运信息</p>
                <!-- <el-button style="height:40px;margin-top:30px;">全部付款</el-button> -->
            </div>
            <div class="between">
                <div class="shipment-left">
                    <div class="border-bottom ">
                        <div>
                            <p class="smale-title">承运信息</p>
                        </div>                    
                        <div class="ptop20 mbom40">
                            <el-row :gutter="20" class="ptop20">
                                <el-col :span="6">
                                    <div class="shipment-list">
                                        <span> 承运类型：</span>
                                        <p class="flex1">{{carrier.type}}</p>
                                    </div>
                                </el-col>
                                <el-col :span="6">
                                    <div class="shipment-list">
                                        <span> 承运商：</span>
                                        <p class="flex1">{{carrier.company}}</p>
                                    </div>
                                </el-col>
                                <el-col :span="6">
                                    <div class="shipment-list">
                                        <span> 司机名称：</span>
                                        <p class="flex1">{{carrier.username}}</p>
                                    </div>
                                </el-col>
                                <el-col :span="6">
                                    <div class="shipment-list">
                                        <span> 司机电话：</span>
                                        <p class="flex1">{{carrier.phone}}</p>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row :gutter="20" class="ptop20">
                                <el-col :span="6">
                                    <div class="shipment-list">
                                        <span> 车牌号码：</span>
                                        <p class="flex1">{{carrier.plate}}</p>
                                    </div>
                                </el-col>
                                <el-col :span="6">
                                    <div class="shipment-list">
                                        <span> 车辆类型：</span>
                                        <p class="flex1">{{carrier.cart}}</p>
                                    </div>
                                </el-col>
                                <el-col :span="6">
                                    <div class="shipment-list">
                                        <span> 装卸方式：</span>
                                        <p class="flex1">{{carrier.dock}}</p>
                                    </div>
                                </el-col>
                                <el-col :span="6">
                                    <div class="shipment-list">
                                        <span> 用车类型：</span>
                                        <p class="flex1">{{carrier.cartType}}</p>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row :gutter="20" class="ptop20">
                                <!-- <el-col :span="6">
                                    <div class="shipment-list">
                                        <span> 提货服务：</span>
                                        <p class="flex1">{{carrier.service}}</p>
                                    </div>
                                </el-col> -->
                                <el-col :span="6">
                                    <div class="shipment-list">
                                        <span> 提货地址：</span>
                                        <p class="flex1">{{carrier.delivery}}</p>
                                    </div>
                                </el-col>
                                <el-col :span="6">
                                    <div class="shipment-list">
                                        <span> 提货时间：</span>
                                        <p class="flex1">{{carrier.deliveryTime}}</p>
                                    </div>
                                </el-col>
                                <el-col :span="6">
                                    <div class="shipment-list">
                                        <span> 送货地址：</span>
                                        <p class="flex1">{{carrier.carry}}</p>
                                    </div>
                                </el-col>
                                <el-col :span="6">
                                    <div class="shipment-list">
                                        <span> 送货时间：</span>
                                        <p class="flex1">{{carrier.carryTime}}</p>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                    
                    <div>
                        <div class="ptop40">
                            <p class="smale-title">应付信息</p>
                        </div>                    
                        <div class="ptop20">
                            <el-row :gutter="20" class="ptop20">
                                <el-col :span="6">
                                    <div class="shipment-list">
                                        <span> 运输费用：</span>
                                        <p class="flex1">{{carrier.cost || 0}}元</p>
                                    </div>
                                </el-col>
                                <el-col :span="6">
                                    <div class="shipment-list">
                                        <span> 装卸费：</span>
                                        <p class="flex1">{{carrier.dockCost || 0}}元</p>
                                    </div>
                                </el-col>
                                <el-col :span="6">
                                    <div class="shipment-list">
                                        <span> 保险费：</span>
                                        <p class="flex1">{{carrier.insurance || 0}}元</p>
                                    </div>
                                </el-col>
                                <el-col :span="6">
                                    <div class="shipment-list">
                                        <span> 已付金额：</span>
                                        <!-- {{carrier.card || 0}}元 -->
                                        <p class="flex1">{{payAmount(carrier)}}元</p>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row :gutter="20" class="ptop20">
                                <el-col :span="6">
                                    <div class="shipment-list">
                                        <span> 已付油卡：</span>
                                        <!-- {{carrier.card || 0}}元 -->
                                        <p class="flex1">{{payCard(carrier)}}元</p>
                                    </div>
                                </el-col>
                                <el-col :span="6">
                                    <div class="shipment-list">
                                        <span> 付款方式：</span>
                                        <p class="flex1">{{carrier.payMethod}}</p>
                                    </div>
                                </el-col>
                                <el-col :span="6">
                                    <div class="shipment-list">
                                        <span> 付款类型：</span>
                                        <p class="flex1">{{carrier.payType}}</p>
                                    </div>
                                </el-col>
                                <!-- <el-col :span="6">
                                    <div class="shipment-list">
                                        <span> 首笔付讫方式：</span>
                                        <p class="flex1">{{carrier.paid}}</p>
                                    </div>
                                </el-col> -->
                            </el-row>
                        </div>
                        <div class="ptop40 items-center">
                            <!-- <p class="items-center">总运费：
                                <strong class="backorange"> 
                                    {{
                                    (parseInt(carrier.cost) || 0) + 
                                    (parseInt(carrier.dockCost) || 0) + 
                                    (parseInt(carrier.insurance) || 0) }}
                                </strong>元；  
                            已付{{carrier.amountPaid}}元，油卡{{carrier.cardPaid}}元；
                            还需要支付<span class="backorange">
                                {{
                                    (parseInt(carrier.cost) || 0) + 
                                    (parseInt(carrier.dockCost) || 0) + 
                                    (parseInt(carrier.insurance) || 0) -
                                    (parseInt(carrier.amountPaid) || 0)-
                                    (parseInt(carrier.cardPaid) || 0)
                                }}    
                            </span>元</p>  -->
                            <p class="items-center">总运费：
                                <strong class="colo"> 
                                    <!-- {{item.cost}} -->
                                {{(parseFloat(carrier.cost) || 0 ) + (parseFloat(carrier.dockCost) || 0) + (parseFloat(carrier.insurance) || 0)}}
                                </strong>元；
                                已付<span class="colb">{{payAmount(carrier)}}</span>元，
                                油卡<span class="colb">{{payCard(carrier)}}</span>元，
                                还需要支付
                                <span class="colo">
                                    {{(parseFloat(carrier.cost) || 0 ) + (parseFloat(carrier.dockCost) || 0) + (parseFloat(carrier.insurance) || 0)
                                    - payAmount(carrier) - payCard(carrier)}}
                                </span>
                            元</p> 
                        </div>
                    </div>
                </div>
                <div class="shipment-right">
                    <div class="txt-center">
                        <!-- <div style='width:200px;'>
                            <el-carousel height="300px" direction="horizontal" :autoplay="true">
                                <el-carousel-item v-if="item.file || item.file.length==0">
                                    <div style="line-height: 300px;">暂无司机证件信息，请上传</div>
                                </el-carousel-item>
                                <el-carousel-item v-for="(items,index) in item.file" :key="index" v-else>
                                    <img :src="$http.noUrl + fileList" alt="">
                                </el-carousel-item>
                            </el-carousel>
                        </div> -->
                        <!-- <img :src="$http.url+carrier.file" alt="">  -->
                        <div style='width:200px;'>
                            <el-carousel height="300px" direction="horizontal" :autoplay="true" v-if="carrier.file && carrier.file.length>0">
                                <el-carousel-item v-for="(items,index) in carrier.file" :key="index">
                                    <img :src="$http.noUrl + items.path" alt="">
                                </el-carousel-item>
                            </el-carousel>
                            <el-carousel height="300px" direction="horizontal" :autoplay="true"  v-else>
                                <el-carousel-item>
                                    <!-- <div style="line-height: 300px;">暂无司机证件信息，请上传</div> -->
                                </el-carousel-item>
                            </el-carousel>
                            
                        </div>
                        <span>司机证件信息</span>
                    </div>                    
                    <div class="btn between">
                        <!-- <el-button>上传凭证</el-button> -->
                        <el-upload
                            class="upload-demo"
                            :action="$http.fileUrl"
                            :show-file-list="false"
                            :beforeUpload="beforeAvatarUploadPdf"  
                            :on-success="handleAvatarSuccess">
                            <div class="items-center">
                                <p style="margin-right:20px;text-align:left">
                                    <el-button>上传凭证</el-button>
                                </p>
                            </div>  
                        </el-upload>
                        <el-button @click="payment(carrier)" type="primary" class="backb" :disabled="carrier.approvalStatus==3">申请支付</el-button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 支付凭证 -->
        <div class="ptop40 border-bottom pbom40 pay-list">
            <p class="left-text">支付凭证</p>
            <div class="flex ptop20">
                <span>附件：</span>
                <ul>
                    <!-- <li>
                        <span>确定收货单.jpg</span>
                        <el-link>查看</el-link>
                        <el-link>下载</el-link>
                    </li>
                    <li class="ptop20">
                        <span>确定收货单.jpg</span>
                        <el-link>查看</el-link>
                        <el-link>下载</el-link>
                    </li> -->
                    <li v-if="file.length==0">
                        暂无相关附件，请上传
                    </li>
                    <li v-for="(item,index) in file" :key="index" v-else>
                        <span>{{item.filelist.name}}</span>
                        <el-link :underline='false' @click="lookFile(item)">查看</el-link>
                        <el-link :underline='false' :href='$http.noUrl+item.filelist.path' download="" title="下载">下载</el-link>
                        <!-- <a :href='$http.noUrl+item.fileId.path' style="font-size:12px;" download="" title="下载">下载</a> -->
                    </li>
                </ul>
            </div>
        </div>
        
        <!-- 申请记录 -->
        <div class="ptop40">
            <p class="left-text">支付申请记录</p>
            <el-table  :data="allPayLog" style="width: 100%" class="ptop20">
                <el-table-column prop="accountHolder"  label="开户人"   width="180">
                </el-table-column>
                <el-table-column   prop="amount"  label="支付金额" width="180">
                </el-table-column>
                <el-table-column prop="card" label="支付油卡">
                </el-table-column>
                <el-table-column prop="openingBank" label="所属银行">
                </el-table-column>
                <el-table-column prop="bankAccount" label="银行卡号">
                </el-table-column>
            </el-table>
        </div>
        <!-- 操作记录 -->
        <!-- <div class="ptop40 border-bottom pbom40">
            <p class="left-text">操作记录</p>
            <el-table  :data="tableData" style="width: 100%" class="ptop20">
                <el-table-column prop="date"  label="时间："   width="180">
                </el-table-column>
                <el-table-column   prop="name"  label="操作人：" width="180">
                </el-table-column>
                <el-table-column prop="address" label="事项：">
                </el-table-column>
            </el-table>
        </div> -->
        <!-- 弹框 -->
        <div class="is-dialog">
            <!-- 标记异常 -->
            <el-dialog
                :visible.sync="abnormalVisible"
                width="640px"
                center
                :before-close="handleClose"
                custom-class="status-dialog"
                >
                <div slot="title">
                    <b class="font24">标记异常</b>
                </div>
                <div class="form">
                    <el-form label-position="top" label-width="80px" :model="abnormal">
                        <el-form-item label="异常原因">
                            <el-input v-model="abnormal.name"></el-input>
                        </el-form-item>
                        <el-form-item label="异常备注">
                            <el-input v-model="abnormal.errorRemark"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button style="width:150px;" @click="abnormalVisible = false">取 消</el-button>
                    <el-button style="width:150px;" type="primary" class="btn-elblue" @click="abnormalSubmit">确 定</el-button>
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
                    <el-form ref="errorRemark"  label-width="100px">
                        <el-form-item label="备注：">
                            <el-input type="textarea" v-model="errorRemark"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button style="width:150px;" @click="nopaymentDialog = false">取 消</el-button>
                    <el-button style="width:150px;" class="btn-elblue" type="primary" @click="signCancel">确认</el-button>
                </span>
            </el-dialog>

            <!-- 待收货 -->
            <el-dialog
                :visible.sync="dialogVisible"
                width="640px"
                center
                :before-close="handleClose"
                custom-class="status-dialog"
                >
                <div slot="title">
                    <b class="font24">订单状态</b>
                    <p><span>请核实订单状态，一旦确认无法更改</span></p>
                </div>
                <div class="btn">
                    <p class="pbom20"><el-button style="width:100%">录单</el-button></p>
                    <p class="pbom20"><el-button style="width:100%">待发货</el-button></p>
                    <p class="pbom20"><el-button style="width:100%">运输中</el-button></p>
                    <p class="pbom20"><el-button style="width:100%">待提货</el-button></p>
                    <p class="pbom20"><el-button style="width:100%">待回单</el-button></p>
                    <p class="pbom20"><el-button style="width:100%">已完成</el-button></p>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button style="width:150px;" @click="dialogVisible = false">取 消</el-button>
                    <el-button style="width:150px;" type="primary" @click="dialogVisible = false">确 认</el-button>
                </span>
            </el-dialog>

            <!-- 申请支付 -->
            <el-dialog
                :visible.sync="paymentDialog"
                width="1000px"
                top="70px"
                center
                :before-close="handleClose"
                custom-class="status-dialog payment-dialog"
                >
                <div slot="title">
                    <b class="font24">申请支付</b>
                    <p><span>项目费用明细请款单</span></p>
                </div>
                <div class="payment-content">
                    <div>
                        <el-row class="back-title table-list">
                            <!-- <el-col :span="4"><div class="">所属日期</div></el-col>
                            <el-col :span="4"><div class="">项目</div></el-col>
                            <el-col :span="6"><div class="">客户名称</div></el-col>
                            <el-col :span="10"><div class="">起止地</div></el-col> -->
                            <el-col :span="4" style="overflow:hidden"><div class="col-list">提货时间</div></el-col>
                            <el-col :span="4" style="overflow:hidden"><div class="col-list">项目名称</div></el-col>
                            <el-col :span="4" style="overflow:hidden"><div class="col-list">司机</div></el-col>
                            <el-col :span="4" style="overflow:hidden"><div class="col-list">车牌</div></el-col>
                            <el-col :span="8" style="overflow:hidden"><div class="col-list">起止地</div></el-col>
                        </el-row>
                        <el-row class="table-list" style="display:flex;width:100%">
                            <!-- <el-col :span="4"><div style="width:auto;">{{detailData.deliveryTime}}</div></el-col>
                            <el-col :span="4"><div style="width:auto;">{{detailData.project}}</div></el-col>
                            <el-col :span="4"><div style="width:auto;">{{detailData.username}}</div></el-col>
                            <el-col :span="4"><div style="width:auto;">{{detailData.plate}}</div></el-col>
                            <el-col :span="4"><div style="width:auto;overflow: hidden;" :title="(detailData.carry ? detailData.carry : '' )+ (detailData.delivery ? ('至' + detailData.delivery):'')">
                                {{(detailData.carry ? detailData.carry : '' )+ (detailData.delivery ? ('至' + detailData.delivery):'')}}</div>
                            </el-col> -->
                            <el-col :span="4" style="overflow:hidden">{{carrier.deliveryTime}}</el-col>
                            <el-col :span="4" style="overflow:hidden">{{detailData.project}}</el-col>
                            <el-col :span="4" style="overflow:hidden">{{carrier.company}}</el-col>
                            <el-col :span="4" style="overflow:hidden">{{carrier.plate}}</el-col>
                            <el-col :span="8" style="overflow:hidden">{{(carrier.delivery ? carrier.delivery : '' ) + (carrier.carry ? ('至' + carrier.carry):'')}}</el-col>
                        </el-row>
                    </div>
                    <div class="ptop20">
                        <el-row class="back-title table-list">
                            <!-- <el-col :span="6"><div class="">所属日期</div></el-col> -->
                            <el-col :span="24">
                                <!-- <div class="items-center">
                                    总运费：<strong class="backorange"> 0000.00</strong>元；
                                    已付0000元，油卡0000元；还需要支付<span class="backorange">0000.00</span>元
                                </div>   -->
                                <p class="items-center">总运费：
                                    <strong class="colo"> 
                                        <!-- {{item.cost}} -->
                                    {{(parseFloat(carrier.cost) || 0 ) + (parseFloat(carrier.dockCost) || 0) + (parseFloat(carrier.insurance) || 0)}}
                                    </strong>元；
                                    已付<span class="colb">{{payAmount(carrier)}}</span>元，
                                    油卡<span class="colb">{{payCard(carrier)}}</span>元，
                                    还需要支付
                                    <span class="colo">
                                        {{(parseFloat(carrier.cost) || 0 ) + (parseFloat(carrier.dockCost) || 0) + (parseFloat(carrier.insurance) || 0)
                                        - payAmount(carrier) - payCard(carrier)}}
                                    </span>
                                元</p> 
                            </el-col>
                        </el-row>
                        
                        <div v-if="!payLog ||payLog.length==0"  class="auto-list" style="text-align:center;border-top:0;">
                            <p>暂无可支付信息，请 <el-link type="primary" @click="goOrderEdit(carrier.orderId)">添加</el-link> 后在申请支付</p>
                        </div>
                        <div class="auto-list"  v-for="(items,indexs) in payLog" :key="indexs">
                            <el-row class="is-row"  :gutter="20">
                                <el-col :span="8" class="between">
                                    <span>金额：</span> 
                                    <p class="flex1"><el-input v-model="items.amount" :placeholder="items.amount"></el-input></p>
                                </el-col>
                                <el-col :span="8" class="between">
                                    <span>油卡：</span> 
                                    <p class="flex1">
                                        <el-input v-model="items.card" :placeholder="items.card"></el-input>
                                    </p>
                                </el-col>
                                <el-col :span="8" class="between">
                                    <span>付款方式：</span>
                                    <p class="flex1">
                                        <el-select v-model="items.payMethod" placeholder="请选择">
                                            <el-option
                                            v-for="item in paymethod"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                            </el-option>
                                        </el-select>
                                        <!-- <el-input v-model="items.payMethod" :placeholder="items.payMethod"></el-input> -->
                                    </p>
                                </el-col>
                            </el-row>
                            <el-row class="is-row"  :gutter="20">
                                <el-col :span="8" class="between">
                                    <span>付款类型：</span>
                                    <p class="flex1">
                                        <el-select v-model="items.payType" placeholder="请选择">
                                            <el-option
                                            v-for="item in paytype"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                            </el-option>
                                        </el-select>
                                        <!-- <el-input v-model="items.payMethod" :placeholder="items.payMethod"></el-input> -->
                                    </p>
                                </el-col>
                                <el-col :span="8" class="between">
                                    <span>油卡卡号：</span> 
                                    <p class="flex1"><el-input v-model="items.cardNumber" :placeholder="items.cardNumber"></el-input></p>
                                </el-col>
                                <el-col :span="8" class="between">
                                    <span>油卡类型：</span> 
                                    <p class="flex1">
                                        <!-- <el-input v-model="items.cardtype" :placeholder="items.cardtype"></el-input> -->
                                        <el-select v-model="items.cardtype" style="width:100%" slot="prepend" placeholder="请选择">
                                            <el-option
                                            v-for="item in cardtype"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </p>
                                </el-col>
                            </el-row>
                            <el-row class="is-row" :gutter="20">
                                <el-col :span="8" class="between">
                                    <span>收款人名称：</span> 
                                    <p class="flex1"><el-input v-model="items.accountHolder" :placeholder="items.accountHolder"></el-input></p>
                                </el-col>
                                <el-col :span="8" class="between">
                                    <span>银行账号：</span> 
                                    <p class="flex1"><el-input maxlength="19" v-model="items.bankAccount" :placeholder="items.bankAccount"></el-input></p>
                                </el-col>
                                <el-col :span="8" class="between">
                                    <span>所属银行：</span> 
                                    <p class="flex1"><el-input v-model="items.openingBank" :placeholder="items.openingBank"></el-input></p>
                                </el-col>
                            </el-row>
                            <el-row class="is-row" :gutter="20">
                                <el-col :span="8" class="between">
                                    <span>项目负责人：</span> 
                                    <p class="flex1">
                                        <el-select v-model="items.charge" placeholder="请选择">
                                            <el-option
                                            v-for="item in userList"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                            </el-option>
                                        </el-select>    
                                    </p>
                                </el-col>
                                <el-col :span="8" class="between">
                                    <span>经理审批：</span>
                                    <p class="flex1">
                                        <el-select v-model="items.manager" placeholder="请选择">
                                            <el-option
                                            v-for="item in managerList"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </p>
                                </el-col>
                                <el-col :span="8" class="between">
                                    <span>财务付款：</span>
                                    <p class="flex1">
                                        <!-- <el-input></el-input> -->
                                        <el-select v-model="items.finance" placeholder="请选择">
                                            <el-option
                                            v-for="item in financeList"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </p>
                                </el-col>
                            </el-row>
                            <el-row class="is-row" :gutter="20">
                                <el-col :span="16" class="between">
                                    <span>备注：</span> 
                                    <p class="flex1"><el-input v-model="items.remark" ></el-input></p>
                                </el-col>
                                <el-col :span="8">


              <!-- <el-button style="width:150px;" :disabled="items.status>0" type="primary" @click="apply(items)">{{items.status == 3 ? '已付款' : items.status>0 ? '申请中' : '提交申请'}}</el-button> -->
                  
                    <el-button style="width:100%;" type="primary" v-if="items.status<=0" @click="apply(items)">提交申请</el-button>
                    <el-button style="width:100%;" type="warning" :disabled="true" v-if="items.status==1" @click="apply(items)">待经理审批</el-button>
                    <el-button style="width:100%;" type="warning" :disabled="true"  v-if="items.status==2" @click="apply(items)">待财务付款</el-button>
                    <el-button style="width:100%;" type="warning" :disabled="true"  v-if="items.status==3" @click="apply(items)">已付款</el-button>

                                </el-col>
                            </el-row>
                        </div>

                        
                        <!-- <div class="auto-list">
                            <el-row class="is-row">
                                <el-col :span="8">
                                    <div class="items-center flex">
                                        <span>付款方式：</span> 
                                        <p>{{carrier.payMethod}}</p>
                                    </div>
                                </el-col>
                                <el-col :span="8">
                                    <div class="items-center flex">
                                        <span>油卡卡号：</span> 
                                        <p>{{carrier.cardNumber}}</p>
                                    </div>
                                </el-col>
                                <el-col :span="8">
                                    <div class="items-center flex">
                                        <span>油卡方式：</span> 
                                        <p>{{carrier.card}}</p>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row class="is-row">
                                <el-col :span="8">
                                    <div class="items-center flex">
                                        <span>收款人名称：</span> 
                                        <p>{{carrier.accountHolder}}</p>
                                    </div>
                                </el-col>
                                <el-col :span="8">
                                    <div class="items-center flex">
                                        <span>银行账号：</span> 
                                        <p>{{carrier.bankAccount}}</p>
                                    </div>
                                </el-col>
                                <el-col :span="8">
                                    <div class="items-center flex">
                                        <span>所属银行：</span> 
                                        <p>{{carrier.openingBank}}</p>
                                    </div>
                                </el-col>
                            </el-row>
                        </div> -->
                    </div>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button style="width:150px;" @click="paymentDialog = false">取 消</el-button>
                    <!-- <el-button style="width:150px;" type="primary" @click="apply">提交申请</el-button> -->
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

            dialogVisible: false,//待收货
            paymentDialog:false,//申请支付
            lookFileImg:false,//附件
            fileList:'',//附件图片
            abnormal:{
                name:'',
                errorRemark:'',
            },
            detailData:{},
            abnormalVisible:false,//异常账单
            nopaymentDialog:false,//取消异常
            errorRemark:'',//取消异常内容
            carrier:{},
            file:[],
            payTanListValue:{
                name:'',
                cwapp:'',
                jlapp:'',
            },
            info:[{
                deliver:'',receive:''
            }],
            userList:[],
            financeList:[],
            managerList:[],
            paymethod:[{name: "现结", id: 10}, {name: "月结", id: 20}],
            cardtype:[],
            payLog:[],//支付信息
            allPayLog:[],//申请支付记录
            paytype:[],
        }
    },
    created() {
        this.getDetail()
        this.getMen()
    },
    methods: {
        getDetail(){
            this.$http.get(this.$api.orderData,{},res=>{
                console.log(res)
                this.cardtype = res.data.card;
                this.paymethod = res.data.paymethod
                this.paytype = res.data.paytype
            })
            this.$http.get(this.$api.payLook,{
                id:this.$route.query.id
            },res=>{
                console.log(res)
                this.detailData = res.data;
                this.carrier = res.data.carrier
                this.file = res.data.file
                // this.info = res.data.info
                var payLog = res.data.carrier.payLog;
                var allPayLog = []
                for(var i of payLog){
                    if(i.status && i.status>0){
                        allPayLog.push(i)
                    }
                }
                this.allPayLog = allPayLog;
            })
        },
        getMen(){
            this.$http.get(this.$api.dataUserlist,{},res=>{
                console.log(res)
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
        // 标记账单异常
        signBnormal(){
            // this.$http.post('')
            this.abnormalVisible = true;
        },
        // 确定标记异常
        abnormalSubmit(){
            this.$http.post(this.$api.signBnormal,{
                id:this.detailData.id,
                status:7,
                errorReason:this.abnormal.name,
                errorRemark:this.abnormal.errorRemark
            },res=>{
                console.log(res)
                this.$message(res.msg)
                if(res.code==1){
                    this.abnormalVisible = false
                    this.getDetail()
                }
            })
        },
        payAmount(val){
            if(val.payLog && val.payLog.length>0){
                return val.payLog[0].payAmount || 0
            }else{
                return 0
            }
        },
        payCard(val){
            if(val.payLog && val.payLog.length>0){
                return val.payLog[0].payCard || 0
            }else{
                return 0
            }
        },
        // 确认取消异常
        signCancel(){
            console.log('取消异常')
            this.$http.post(this.$api.signBnormal,{
                id:this.$route.query.id,
                status:6,
                errorRemark:this.errorRemark
            },res=>{
                console.log(res)
                this.$message(res.msg)
                if(res.code == 1){
                    this.nopaymentDialog = false
                    this.getDetail()
                }
            })
        },
        // 查看附件
        lookFile(val){
            console.log('查看附件',val)
            this.lookFileImg = true
            this.fileList = val.filelist.path
        },
        beforeAvatarUploadPdf(file){
            // console.log(file)
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
        // 待收货
        tihuo(){
            console.log('提货')
            this.dialogVisible = true
        },
        // 申请支付
        payment(val){
            this.paymentDialog = true
            console.log(val)
            var payLog = val.payLog
            for(var i of val.payLog){
                if(i.cardtype){
                    i.cardtype = parseInt(i.cardtype)
                }else{
                    i.cardtype = val.cardId ? parseInt(val.cardId) : ''
                }
                if(!i.payType){
                    i.payType = val.payTypeId ? parseInt(val.payTypeId) : val.payTypeId
                }else{
                    i.payType = parseInt(i.payType)
                }
                if(i.charge){
                    i.charge = parseInt(i.charge)
                }else{
                    i.charge = val.charge ? parseInt(val.cardId) : ''
                }
                if(i.finance){
                    i.finance = parseInt(i.finance)
                }
                if(i.manager){
                    i.manager = parseInt(i.manager)
                }
                if(i.payMethod){
                    i.payMethod = parseInt(i.payMethod)
                }
            }
            this.payLog = payLog
        },
        // 前往订单编辑
        goOrderEdit(val){
            this.$router.push({
                path: '/add/order',
                query: {
                    id: val
                }
            })
        },
        // 提交申请支付
        apply(val){
            // if(!val.amount){
            //     return this.$message('金额不能为空')
            // }

            // if(!val.card){
            //     return this.$message('油卡不能为空')
            // }
            // if(!val.payMethod){
            //     return this.$message('付款方式不能为空')
            // }
            // if(!val.cardNumber){
            //     return this.$message('油卡卡号不能为空')
            // }
            // if(!val.cardtype){
            //     return this.$message('油卡类型不能为空')
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

            if(!val.charge){
                return this.$message('项目负责人不能为空')
            }
            if(!val.manager){
                 return this.$message('项目经理不能为空')
            }
            if(!val.finance){
                 return this.$message('财务付款不能为空')
            }
            // return console.log(val)
            this.$http.post(this.$api.approvalApply,{
                id:val.id,
                carrierId:val.carrierId,
                charge:val.charge,
                finance:val.finance,
                manager:val.manager,
                amount:val.amount,
                card:val.card,
                payType:val.payType,
                payMethod:val.payMethod,
                cardtype:val.cardtype || '',
                remark:val.remark || '',
                cardNumber:val.cardNumber,
                accountHolder:val.accountHolder,
                bankAccount:val.bankAccount,
                openingBank:val.openingBank,
            },res=>{
                console.log(res)
                this.$message(res.msg)
                if(res.code==1){
                    this.paymentDialog = false
                    this.getDetail()
                }
            })
            // var payList = this.payTanListValue;
            // if(!payList.name){
            //     return this.$message('项目负责人不能为空')
            // }
            // if(!payList.cwapp){
            //     return this.$message('财务审批人不能为空')
            // }
            // if(!payList.jlapp){
            //     return this.$message('经理审批人不能为空')
            // }
            // this.$http.post(this.$api.approvalApply,{
            //     id:this.$route.query.id,
            //     charge:payList.name,
            //     finance:payList.cwapp,
            //     manager:payList.jlapp
            // },res=>{
            //     this.$message(res.msg)
            //     if(res.code == 1){
            //         this.paymentDialog = false
            //         this.getDetail();
            //     }
            // })
            // console.log(payList)
        },
        handleClose(done) {
            console.log('关闭')
            this.dialogVisible = false
            this.paymentDialog = false
            this.abnormalVisible = false
            this.lookFileImg = false
            this.nopaymentDialog = false
            // this.$confirm('确认关闭？')
            // .then(_ => {
            //     done();
            // })
            // .catch(_ => {});
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
            padding:40px 0;
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
        }

        //应付以及承运信息
        .shipment-left{
            // width:1100px;
            width:80%;
            .shipment-list{
                display: flex;
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
        // 附件弹框
        .status-dialog .img{
            margin:auto;
            text-align: center;
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
                            width:90px;
                        }
                        p{
                            width:160px;
                            // flex:1
                        }
                    }
                }
                .men{
                    .items-center{
                        span{
                            display: inline-block;
                            width:120px;
                        }
                    }
                    .items-center+.items-center span{
                        margin-left:20px;
                    }
                }
            }
        }
        .pay-list{
            ul li{
                span{
                    color: #00A1E9;
                }
            }
        }
        
    }
</style>