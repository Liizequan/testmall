<template>
    <div class="detail-order">
        <!-- 我是订单详情 -->
        <div class="between items-center order-top ">
            <div>
                <h4 class="top-title">订单详情  </h4>
                <p><span>月付单号</span>{{orderDetailData.payNo}}</p>
                <p><span>月收单号</span>{{orderDetailData.receiveNo}}</p>
            </div>
            <div class="flex">
                <!-- <el-button :disabled="true" type="warning">订单号 {{orderDetailData.id}}</el-button> -->
                <el-button :disabled="orderDetailData.status == 8" @click="editOrder">编辑</el-button>
                <el-button :disabled="orderDetailData.status == 8" @click="signBnormal" v-if="orderDetailData.status!=7">标记异常</el-button>
                <el-button @click="nopaymentDialog = true" v-else>取消异常</el-button>
                <!-- <el-button>导出</el-button> -->
                <div class="export-left">
                    <import-export  :isImport="false" :isExport="true" :exportApi="this.$api.exportOne+'?id=' + this.$route.query.id"/>
                </div>
            </div>
        </div>
        <!-- 异常信息 -->
        <div class="unusual border-bottom" v-if="orderDetailData.status==7">
            <div class="items-center">
                <span>异常原因：</span>
                <b>{{orderDetailData.errorReason}}</b>
            </div>
             <div class="items-center">
                <span>备注：</span>
                {{orderDetailData.errorRemark}}
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
                            <p class="flex1">{{orderDetailData.customer}}</p>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="basics-list">
                            <span>项目名称：</span>
                            <p class="flex1">{{orderDetailData.project}}</p>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="basics-list">
                            <span>联系人：</span>
                            <p class="flex1">{{orderDetailData.contact}}</p>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="basics-list">
                            <span>联系电话：</span>
                            <p class="flex1">{{orderDetailData.phone}}</p>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="6">
                        <div class="basics-list">
                            <span>业务单号：</span>
                            <p class="flex1">{{orderDetailData.numberOne}}</p>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="basics-list">
                            <span>DN单号：</span>
                            <p class="flex1">{{orderDetailData.numberTwo}}</p>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="basics-list">
                            <span>计划提货：</span>
                            <p class="flex1">{{orderDetailData.deliveryTime}}</p>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="basics-list">
                            <span>计划到货：</span>
                            <p class="flex1">{{orderDetailData.arrivalTime}}</p>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="6">
                        <div class="basics-list">
                            <span>系统订单号：</span>
                            <p class="flex1">{{orderDetailData.orderNo}}</p>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="basics-list">
                            <span>收款类型：</span>
                            <p class="flex1">{{orderDetailData.payMethod == 10 ? '网银' : '现金'}}</p>
                        </div>
                    </el-col>
                    <!-- <el-col :span="6">
                        <div class="basics-list">
                            <span>油卡服务：</span>
                            无|| 油卡类型
                        </div>
                    </el-col> -->
                    <el-col :span="6">
                        <div class="basics-list">
                            <span>付款状态：</span>
                            {{orderDetailData.paid == 10 ? '已付清' : '未付清'}} 
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="basics-list">
                            <span>订单状态：</span>
                            {{
                                orderDetailData.status == 1 ? '进行中' :
                                orderDetailData.status == 2 ? '待发货' :
                                orderDetailData.status == 3 ? '运输中' :
                                orderDetailData.status == 4 ? '待提货' :
                                orderDetailData.status == 5 ? '待回单' :
                                orderDetailData.status == 6 ? '已完成' :
                                orderDetailData.status == 7 ? '异常' :
                                orderDetailData.status == 8 ? '取消' :  ''
                            }} 
                        </div>
                    </el-col>
                    <!-- <el-col :span="6">
                        <div class="basics-list">
                            <span>订单号：</span>
                            {{orderDetailData.orderNo}} 
                        </div>
                    </el-col> -->
                    <el-col :span="6">
                        <div class="basics-list">
                            <span>录单人员：</span>
                            {{orderDetailData.user}}
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="basics-list">
                            <span>创建时间：</span>
                            {{orderDetailData.createTime}}
                        </div>
                    </el-col>
                </el-row>
                <div class="basics-btn border-bottom flex">
                    <!-- <el-button type="primary" class="btn-elblue" @click="tihuo">
                        {{
                            orderDetailData.status == 1 ? '录单' :
                            orderDetailData.status == 2 ? '待发货' :
                            orderDetailData.status == 3 ? '运输中' :
                            orderDetailData.status == 4 ? '待提货' :
                            orderDetailData.status == 5 ? '待回单' :
                            orderDetailData.status == 6 ? '已完成' :
                            orderDetailData.status == 7 ? '异常' :
                            orderDetailData.status == 8 ? '取消' :  ''
                        }} 
                    </el-button> --> 
                    <el-link  :disabled="orderDetailData.status== 8" :underline="false" class="fan-btn" style="color:#fff;" @click="tihuo"
                        :class="orderDetailData.status== 1 ? 'backf' 
                        : orderDetailData.status== 2 ? 'backy' 
                        : orderDetailData.status== 3 ? 'backo' 
                        : orderDetailData.status== 4 ? 'backz'  
                        : orderDetailData.status== 5 ? 'backb' 
                        : orderDetailData.status== 6 ? 'backg' : 'backd' "
                    >
                        {{
                            orderDetailData.status== 1 ? '进行中' : orderDetailData.status == 2 ? '待发货' : orderDetailData.status == 3 ? '运输中' :
                            orderDetailData.status== 4 ? '待提货' : orderDetailData.status == 5 ? '待回单' : orderDetailData.status== 6 ? '已完成' : 
                            orderDetailData.status== 7 ? '异常' :'取消' 
                        }}
                    </el-link>
                    <!-- <el-button>上传回单</el-button> -->
                    <el-upload
                        class="upload-demo"
                        :disabled="orderDetailData.status== 8"
                        :show-file-list="false"
                        :beforeUpload="beforeAvatarUpload"
                        :action="$http.fileUrl"
                        :on-success="uploadFile">
                        <div class="items-center">
                            <p style="margin-left:20px;">
                                <el-button :disabled="orderDetailData.status== 8">上传回单</el-button>
                            </p>
                        </div>  
                    </el-upload>
                    <el-button style="margin-left:20px;" @click="closeOrder" v-if="orderDetailData.status != 8">关闭订单</el-button>
                </div>
            </div>
        </div>
        <!-- 地址信息 -->
        <div class="address">
            <p class="left-text">地址信息</p>
            <!-- <div v-if="!orderDetailData.info || orderDetailData.info.length==0">暂无地址信息</div> -->
            <div class="border-bottom address-box">
                <el-row :gutter="20" class="is-row">
                    <el-col :span="24" class="pbom20" style="font-size:18px ; color:#333; font-weight:500">发货方</el-col>
                    <el-col :span="24"  v-for="(item,index) in orderDetailData.deliver" :key="index" class="between pbom20 deliver">
                        <div class="flex1 flex"><span> 发货人：</span><p class="flex1">{{item.name}}</p></div>
                        <div class="flex1 flex"><span> 联系电话：</span><p class="flex1">{{item.phone}}</p></div>
                        <div class="flex1 flex"><span> 发货地址：</span><p class="flex1">{{item.deliver}}</p></div>
                        <div class="flex1 flex"><span> 备注：</span><p class="flex1">{{item.mark}}</p></div>
                    </el-col>
                    <!-- <el-col :span="12">
                        <div class="address-list">
                            <el-button type="danger" class="btn-elorange">收货方</el-button>
                            <div class="flex-wrap ptop20">
                                <p><span>发货人：</span><strong>{{item.consignee}}</strong></p>
                                <p><span>联系电话： </span><strong>{{item.signeephone}}</strong></p>
                            </div>
                            <div class="ptop20">
                                <p><span>发货地址：</span><strong>{{item.receive+item.signeeaddress}}</strong></p>
                            </div>
                            <div class="ptop20">
                                <p><span> 海关报关：</span><strong>{{item.customs}}</strong></p>
                            </div>
                            <div class="ptop20">
                                <p><span> 备注：</span><strong>{{item.signeeremark}}</strong></p>
                            </div>
                        </div>
                    </el-col> -->
                    <el-col :span="24" class="pbom20 ptop40 mtop20" style="font-size:18px ; color:#333; font-weight:500; border-top:1px solid #e5e5e5">收货方</el-col>
                    <el-col :span="24"  v-for="(item,index) in orderDetailData.receive" :key="'receive'+index" class="pbom20 receive">
                        <div class="between">
                            <!-- <p class="flex1"><span>  </span>{{item.name}}</p>  
                            <p class="flex1"><span> </span>{{item.phone}}</p>
                            <p class="flex1"><span> 发货地址：</span>{{item.receive}}</p>
                            <p class="flex1"><span> 海关报关：</span>{{item.customs}}</p> -->
                            <div class="flex1 flex"><span> 收货人：</span><p class="flex1">{{item.name}}</p></div>
                            <div class="flex1 flex"><span> 联系电话：</span><p class="flex1">{{item.phone}}</p></div>
                            <div class="flex1 flex"><span> 收货地址：</span><p class="flex1">{{item.receive}}</p></div>
                            <div class="flex1 flex"><span> 海关报关：</span><p class="flex1">{{item.customs}}</p></div>
                        </div>
                        <div class="flex1 mtop20  flex"><span> 备注：</span><p class="flex1">{{item.mark}}</p></div>
                    </el-col>
                </el-row>
            </div>
        </div>
        <!-- 货物信息 -->
        <div class="address">
            <p class="left-text">货物信息</p>
            <div v-if="!orderDetailData.goods || orderDetailData.goods.length==0">暂无货物信息</div>
            <div class="border-bottom pbom40 goods-box" v-for="(item,index) in orderDetailData.goods" :key="index" v-else>
                <el-row :gutter="20">
                    <el-col :span="6">
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
                    <el-col :span="6">
                        <div class="basics-list">
                            <span>数量：</span>
                            <p class="flex1">{{item.num}}</p>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="basics-list">
                            <span>重量：</span>
                            <p class="flex1">{{item.weight ? item.weight+'吨' : ''}}</p>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20" class="ptop20">
                    <el-col :span="6">
                        <div class="basics-list">
                            <span>体积：</span>
                            <p class="flex1">{{item.volume? item.volume+'方' : ''}}</p>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="basics-list">
                            <span>货物价值：</span>
                            <p class="flex1">{{item.worth? item.worth+'元' : ''}}</p>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="basics-list">
                            <span>货物备注：</span>
                            <p class="flex1">{{item.remark}}</p>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
        <!-- 应付以及承运信息 -->
        <div class="address border-bottom pbom20">
            <div class="between">
                <p class="left-text">应付以及承运信息</p>
                <p>
                    <!-- <el-button style="height:40px;margin-top:30px;" class="backb" type="primary" @click="applyAll" v-if="orderDetailData.carrier">全部付款</el-button> -->
                </p>
            </div>
            <div v-if="!orderDetailData.carrier || orderDetailData.carrier.length==0">暂无应付以及承运信息</div>
            <div class="between yincheng" v-for="(item,index) in orderDetailData.carrier" :key="index">
                <div class="shipment-left">
                    <div class="border-bottom ">
                        <div>
                            <p class="smale-title">总承运商({{orderDetailData.carrier.length}})-承运商({{index+1}})</p>
                        </div>                    
                        <div class="ptop20 mbom40">
                            <el-row :gutter="20" class="ptop20">
                                <el-col :span="6">
                                    <div class="shipment-list">
                                        <span> 承运类型：</span>
                                        <p class="flex1">{{item.type}}</p>
                                    </div>
                                </el-col>
                                <el-col :span="6">
                                    <div class="shipment-list">
                                        <span> 承运商：</span>
                                        <p class="flex1">{{item.company}}</p>
                                    </div>
                                </el-col>
                                <el-col :span="6">
                                    <div class="shipment-list">
                                        <span> 司机名称：</span>
                                        <p class="flex1">{{item.username}}</p>
                                    </div>
                                </el-col>
                                <el-col :span="6">
                                    <div class="shipment-list">
                                        <span> 司机电话：</span>
                                        <p class="flex1">{{item.phone}}</p>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row :gutter="20" class="ptop20">
                                <el-col :span="6">
                                    <div class="shipment-list">
                                        <span> 车牌号码：</span>
                                        <p class="flex1">{{item.plate}}</p>
                                    </div>
                                </el-col>
                                <el-col :span="6">
                                    <div class="shipment-list">
                                        <span> 车辆类型：</span>
                                        <p class="flex1">{{item.cart}}</p>
                                    </div>
                                </el-col>
                                <!-- <el-col :span="6">
                                    <div class="shipment-list">
                                        <span> 装卸方式：</span>
                                        <p class="flex1">{{item.dock}}</p>
                                    </div>
                                </el-col> -->
                                <el-col :span="6">
                                    <div class="shipment-list">
                                        <span> 用车类型：</span>
                                        <p class="flex1">{{item.cartType}}</p>
                                    </div>
                                </el-col>
                                <el-col :span="6">
                                    <div class="shipment-list">
                                        <span> 提货地址：</span>
                                        <p class="flex1">{{item.delivery}}</p>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row :gutter="20" class="ptop20">
                                <!-- <el-col :span="6">
                                    <div class="shipment-list">
                                        <span> 提货服务：</span>
                                        <p class="flex1">{{item.service	}}</p>
                                    </div>
                                </el-col> -->
                                <el-col :span="6">
                                    <div class="shipment-list">
                                        <span> 提货时间：</span>
                                        <p class="flex1">{{item.deliveryTime}}</p>
                                    </div>
                                </el-col>
                                <el-col :span="6">
                                    <div class="shipment-list">
                                        <span> 收货地址：</span>
                                        <p class="flex1">{{item.carry}}</p>
                                    </div>
                                </el-col>
                                <el-col :span="6">
                                    <div class="shipment-list">
                                        <span> 收货时间：</span>
                                        <p class="flex1">{{item.carryTime}}</p>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                    <div class="border-bottom">
                        <div class="ptop30">
                            <p class="smale-title">应付信息</p>
                        </div>                  
                        <div class="ptop20">
                            <el-row :gutter="20" class="ptop20">
                                <el-col :span="6">
                                    <div class="shipment-list">
                                        <span> 运输费用：</span>
                                        <p class="flex1">{{item.cost+'元'}}</p>
                                    </div>
                                </el-col>
                                <el-col :span="6">
                                    <div class="shipment-list">
                                        <span> 装卸费：</span>
                                        <p class="flex1">{{item.dockCost+'元'}}</p>
                                    </div>
                                </el-col>
                                <el-col :span="6">
                                    <div class="shipment-list">
                                        <span> 保险费：</span>
                                        <p class="flex1">{{item.insurance+'元'}}</p>
                                    </div>
                                </el-col>
                                <el-col :span="6">
                                    <div class="shipment-list">
                                        <span> 油卡：</span>
                                        <p class="flex1">{{item.cardNumber	}}</p>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row :gutter="20" class="ptop20">
                                <el-col :span="6">
                                    <div class="shipment-list">
                                        <span> 付款方式：</span>
                                        <p class="flex1">{{item.payMethod==10? '现结':'月结'}}</p>
                                    </div>
                                </el-col>
                                <el-col :span="6">
                                    <div class="shipment-list">
                                        <span> 付款类型：</span>
                                        <p class="flex1">{{item.payType}}</p>
                                    </div>
                                </el-col>
                                <!-- <el-col :span="6">
                                    <div class="shipment-list">
                                        <span> 首笔付讫方式：</span>
                                        <p class="flex1">{{item.paid	}}</p>
                                    </div>
                                </el-col> -->
                                <el-col :span="6">
                                    <div class="basics-list">
                                        <span>油卡服务：</span>
                                        <p class="flex1">{{item.card || '无'}}</p>
                                    </div>
                                </el-col>
                                <el-col :span="18" class="ptop20">
                                    <div class="basics-list">
                                        <p class="items-center">总运费：
                                            <strong class="colo"> 
                                                <!-- {{item.cost}} -->
                                            {{(parseInt(item.cost) || 0 ) + (parseInt(item.dockCost) || 0) + (parseInt(item.insurance) || 0)}}
                                            </strong>元；
                                        已付
                                            <span class="colb"> {{item.amountPaid || 0}}</span>
                                        元，油卡
                                            <span class="colb"> {{item.cardPaid || 0}}</span>
                                        元；还需要支付
                                        <span class="colo">
                                            <!-- 0000.00 -->
                                            {{
                                                (parseInt(item.cost) || 0 ) + (parseInt(item.dockCost) || 0 ) + (parseInt(item.insurance) || 0 ) 
                                                - (parseInt(item.amountPaid) || 0 ) - (parseInt(item.cardPaid) || 0 )
                                            }}
                                        </span>
                                        元</p> 
                                    </div>
                                </el-col>
                                <el-col :span="6">
                                    <div class="basics-list" v-if="item.tax == 20">
                                        <span>发票状态：</span>
                                        已收
                                    </div>
                                    <el-button @click="invoice(item.id)" v-else>收发票</el-button>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                </div>
                <div class="shipment-right">
                    <div class="txt-center">
                        <div style='width:200px;margin-bottom:30px;'>
                            <el-carousel height="300px" direction="horizontal" :autoplay="true">
                                <el-carousel-item v-for="(items,index) in item.file" :key="index">
                                    <img :src="$http.noUrl + items.path" alt="">
                                </el-carousel-item>
                            </el-carousel>
                        </div>
                        <span>司机证件信息</span>
                    </div>                    
                    <div class="btn flex">
                        <el-upload
                            class="upload-demo"
                            :action="$http.fileUrl"
                            :disabled="orderDetailData.status== 8"
                            :show-file-list="false" 
                            :beforeUpload="beforeAvatarUpload"
                            :on-success="handleAvatarSuccess">
                            <div class="items-center">
                                <p style="margin-right:14px;text-align:left">
                                    <el-button  :disabled="orderDetailData.status== 8" @click="pingzheng(item.id)">上传凭证</el-button>
                                </p>
                            </div>  
                        </el-upload>
                        <!-- <el-button @click="payment(item)" type="primary" :disabled="item.approvalStatus!=0" class="backb">
                            {{item.approvalStatus==0 ? '申请支付' : item.approvalStatus=='-1' ? '已驳回' :  item.approvalStatus=='1' ? '待经理审批' : item.approvalStatus=='2' ? '待财务付款' : '已审批'}}
                        </el-button> -->
                        <el-button type="danger" :disabled="false" v-if="item.approvalStatus == -10">已归为月结</el-button>
                        <el-button v-else-if="item.approvalStatus == 10" @click="payment(item)" type="primary"  :disabled="orderDetailData.status== 8">
                            申请支付
                        </el-button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 应收信息 -->
        <div class="ptop40 border-bottom pbom30">
            <p class="left-text">应收信息</p>
            <div class="ptop30">
                <el-row :gutter="20" class="items-center">
                    <el-col :span="4">
                        <div class="grid-content bg-purple">
                            <span> 订单费用：</span>
                            {{orderDetailData.cost+'元'}}
                        </div>
                    </el-col>
                    <el-col :span="4">
                        <div class="grid-content bg-purple">
                            <span> 收款方式：</span>
                            {{orderDetailData.payMethod == 10 ? '网银' : '现金'}}
                        </div>
                    </el-col>
                    <el-col :span="4">
                        <div class="grid-content bg-purple">
                            <span> 已收金额：</span>
                            {{orderDetailData.amountReceived+'元'}}
                        </div>
                    </el-col>
                    <!-- <el-col :span="4">
                        <div class="grid-content bg-purple">
                            <span> 已收油卡：</span>
                            {{orderDetailData.cost}}
                        </div>
                    </el-col> -->
                    <el-col :span="4">
                        <div class="grid-content bg-purple">
                            <span> 总费用：</span>
                            <strong class="backorange"> {{orderDetailData.cost+'元'}}</strong>
                        </div>
                    </el-col>
                    <el-col :span="8" >
                        <div class="btn flex" style="justify-content: flex-end;">
                            <!-- <el-button style="width:98px">上传凭证</el-button> -->
                            <el-upload
                                class="upload-demo"
                                :action="$http.fileUrl"
                                :beforeUpload="beforeAvatarUpload"
                                 :disabled="orderDetailData.status== 8"
                                :show-file-list="false" 
                                :on-success="orderfile">
                                <div class="items-center">
                                    <p style="margin-right:14px;text-align:left">
                                        <el-button @click="pingzheng(item.id)" :disabled="orderDetailData.status== 8">支付凭证</el-button>
                                    </p>
                                </div>  
                            </el-upload>
                            <!-- <el-button style="width:98px" @click="Received" type="danger" class="backo" :disabled="orderDetailData.receivedStatus==20 || orderDetailData.status== 8">到账</el-button> -->
                        </div>
                    </el-col>
                </el-row>
                <div class="items-center between">
                    <!-- <p class="items-center">
                        总费用：<strong class="backorange"> {{orderDetailData.cost}}</strong>
                    </p > -->
                    <!-- <div class="btn">
                        <el-button style="width:98px">上传凭证</el-button>
                        <el-button style="width:98px">到账</el-button>
                    </div> -->
                </div>
            </div>
        </div>
        <!-- 备注 -->
        <div class="ptop40 border-bottom pbom40">
            <p class="left-text">备注及其他附件</p>
            <div class="ptop40">
                <span>备注：</span>
                {{orderDetailData.remark}}
            </div>
            <div class="flex ptop20 fujina">
                <span>附件：</span>
                <span  v-if="!orderDetailData.file || orderDetailData.file.length==0">暂无附件</span>
                <ul v-else>
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
                    <li v-for="(item,index) in orderDetailData.file" class="items-center" :key="index">
                        
                        <span>{{item.type}}&nbsp;&nbsp;:&nbsp;&nbsp;{{item.filelist.name}}</span>
                        <el-link @click="lookFile(item)" :underline="false">查看</el-link>
                        <a :href='$http.noUrl+item.filelist.path' download="" title="下载">下载</a>
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
        <div class="ptop40 pbom40">
            <p class="left-text">操作记录</p>
            <el-table  :data="orderDetailData.log" style="width: 100%" class="ptop20">
                <el-table-column prop="createTime"  label="时间"   width="180">
                </el-table-column>
                <el-table-column   prop="user"  label="操作人" width="180">
                </el-table-column>
                <el-table-column prop="message" label="事项">
                </el-table-column>
            </el-table>
        </div>
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

            <!-- 订单状态 -->
            <el-dialog
                :visible.sync="dialogVisible"
                width="640px"
                center
                :before-close="handleClose"
                custom-class="status-dialog"
                >
                <div slot="title">
                    <b class="font24">订单状态</b>
                    <p><span>请核实订单状态</span></p>
                </div>
                <div class="btn">
                    <p class="pbom20" v-for="(item,index) in btnStatus" :key="index">
                        <el-button  style="width:100%"  :type="btnStatusList==item.id ? 'primary' : ''" 
                        :class="btnStatusList==item.id ? 'btn-elblue' : ''" @click="btnStatusList = item.id" v-model="btnStatusList">
                            {{item.name}}
                        </el-button>
                    </p>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button style="width:150px;" @click="dialogVisible = false">取 消</el-button>
                    <el-button style="width:150px;" type="primary" @click="statusSubmit">确 认</el-button>
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
                    <b class="font24">{{isAllPay ? '全部支付' : '申请支付'}}</b>
                    <p><span>项目费用明细请款单</span></p>
                </div>
                <div class="payment-content">
                    <div>
                        <el-row class="back-title table-list">
                            <!-- <el-col :span="6"><div class="">所属日期</div></el-col>
                            <el-col :span="4"><div class="">项目</div></el-col>
                            <el-col :span="4"><div class="">客户名称</div></el-col>
                            <el-col :span="10"><div class="">起止地</div></el-col> -->
                            <el-col :span="4"><div class="col-list">提货时间</div></el-col>
                            <el-col :span="4"><div class="col-list">项目名称</div></el-col>
                            <el-col :span="4"><div class="col-list">司机</div></el-col>
                            <el-col :span="4"><div class="col-list">车牌</div></el-col>
                            <el-col :span="4"><div class="col-list">起止地</div></el-col>
                        </el-row>
                        <el-row class="table-list" v-for="(item,index) in carrierPay" :key="index">
                            <!-- <el-col :span="6"><div class="" :title="item.createTime">{{item.createTime}}</div></el-col>
                            <el-col :span="4"><div class="" :title="item.project">{{item.project}}</div></el-col>
                            <el-col :span="4"><div class="" :title="item.customer">{{item.customer}}</div></el-col>
                            <el-col :span="10"><div class="" :title="item.carry+' / '+item.delivery">{{item.carry+(item.delivery　? (' / '+item.delivery) : '')}}</div></el-col> -->
                            <el-col :span="4"><div class="col-list">{{item.deliveryTime}}</div></el-col>
                            <el-col :span="4"><div class="col-list">{{item.project}}</div></el-col>
                            <el-col :span="4"><div class="col-list">{{item.username}}</div></el-col>
                            <el-col :span="4"><div class="col-list">{{item.plate}}</div></el-col>
                            <el-col :span="4"><div class="col-list" style="overflow: hidden;" :title="(item.delivery ? item.delivery : '' )+ (item.carry ? ('至' + item.carry):'')">
                                {{(item.delivery ? item.delivery : '' )+ (item.carry ? ('至' + item.carry):'')}}</div>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="ptop20"  v-for="(item,index) in carrierPay" :key="index">
                        <el-row class="back-title table-list">
                            <!-- <el-col :span="4"><div class="">所属日期</div></el-col> -->
                            <el-col :span="24">
                                <div class="items-center">
                                        <p class="items-center">总运费：
                                            <strong class="colo"> 
                                            {{(parseFloat(item.cost) || 0 ) + (parseFloat(item.dockCost) || 0) + (parseFloat(item.insurance) || 0)}}
                                            <!-- {{item.payLog[0].totalAmount}} -->
                                            </strong>元；
                                        已付
                                            <!-- {{item.amountPaid || 0}} -->
                                            <span class="colb">{{item.payLog[0].payAmount || 0}}</span> 
                                        元，油卡
                                            <span class="colb">{{item.payLog[0].payCard || 0}}</span> 
                                            <!-- {{item.cardPaid || 0}} -->
                                        元；还需要支付
                                        <span class="colo">
                                            {{
                                                (parseFloat(item.cost) || 0 ) + (parseFloat(item.dockCost) || 0 ) + (parseFloat(item.insurance) || 0 ) 
                                                - (parseFloat(item.payLog[0].payAmount) || 0 ) - (parseFloat(item.payLog[0].payCard) || 0 )
                                            }}
                                            <!-- {{item.payLog[0].waitAmount}} -->
                                        </span>
                                        元</p> 
                                </div>  
                            </el-col>
                        </el-row>
                        <div class="auto-list"  v-for="(items,indexs) in item.payLog" :key="indexs">
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
                                    <span>付款类型：</span> 
                                    <p class="flex1">
                                        <!-- <el-input v-model="items.payTypeId" :placeholder="items.payType"></el-input> -->
                                        <el-select v-model="items.payType" placeholder="请选择">
                                            <el-option
                                            v-for="item in paytype"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </p>
                                </el-col>
                            </el-row>
                            <el-row class="is-row"  :gutter="20">
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
                                <el-col :span="8" class="between">
                                    <span>油卡卡号：</span> 
                                    <p class="flex1"><el-input v-model="items.cardNumber" :placeholder="items.cardNumber"></el-input></p>
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
                                    <p class="flex1">
                                        <el-input v-model="items.remark"></el-input>
                                    </p>
                                </el-col>
                                <el-col :span="8">


                    <!-- <el-button style="width:100%;" type="primary" :disabled="items.status>0" @click="apply(items)">{{items.status>0 ? '申请中' : '提交申请'}}</el-button> -->
                    <el-button style="width:100%;" type="primary" v-if="items.status<=0" @click="apply(items)">提交申请</el-button>
                    <el-button style="width:100%;" type="warning" :disabled="true" v-if="items.status==1" @click="apply(items)">待经理审批</el-button>
                    <el-button style="width:100%;" type="warning" :disabled="true"  v-if="items.status==2" @click="apply(items)">待财务付款</el-button>
                    <el-button style="width:100%;" type="warning" :disabled="true"  v-if="items.status==3" @click="apply(items)">已付款</el-button>


                                </el-col>
                            </el-row>
                        </div>
                    </div>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button style="width:150px;" @click="paymentDialog = false">取 消</el-button>
                    
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
            orderDetailData:{},//订单详情数据
            info:[{
                deliver:'',receive:''
            }],
            carrier:[
                {cardNumber:'',card:''}
            ],
            userList:[],//项目负责人
            financeList:[],// 财物审批
            managerList:[],//经理审批
            carrierList:{},//选中需要支付的承运商
            payTanListValue:{
                name:[],
                cwapp:[],
                jlapp:[],
            },
            abnormalVisible:false,//异常
            nopaymentDialog:false,//取消订单异常
            abnormal:{
                errorReason:'',//异常原因
                errorRemark:'',//异常备注
            },
            errorRemark:'',//取消异常备注
            
            dialogVisible: false,//待收货
            lookFileImg:false,//附件
            fileList:'',//需要查看附件的文件
            paymentDialog:false,//申请支付
            
            btnStatus:[
                {id:1,name:'进行中'},
                {id:2,name:'待发货'},
                {id:3,name:'运输中'},
                {id:4,name:'待提货'},
                {id:5,name:'待回单'},
                {id:6,name:'已完成'}
            ],
            btnStatusList:1,


            // 申请支付
            carrierPay:[],//申请支付列表
            isAllPay:false,//是否是全部支付

            paymethod:[{name: "现结", id: 10}, {name: "月结", id: 20}],
            cardtype:[],
            allPayLog:[],//申请记录
        }
    },
    created() {
        this.getOrderDetail()
        this.getMen()
        this.getIndex()
    },
    methods: {
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
        getOrderDetail(){
            console.log(this.$route.query)
            this.$http.get(this.$api.orderDetail,{
                id:this.$route.query.id
            },res=>{
                this.orderDetailData = res.data
                this.info = res.data.info
                var carrier = res.data.carrier;
                var allPayLog = [];
                for(var i of carrier){
                    var payLog = i.payLog;
                    for(var j of payLog){
                        console.log(j.status)
                        // if(j.status>0){
                        //     allPayLog = allPayLog.push(j)
                        //     console.log(allPayLog)
                        //     // allPayLog = [...{},j]
                        // }
                        if(j.status>0){
                            console.log(j)
                            allPayLog.push(j)
                        }
                    }
                }
                this.allPayLog = allPayLog
                console.log(carrier)
            })
        },
        getIndex(){
            this.$http.get(this.$api.orderData,{},res=>{
                console.log(res)
                this.cardtype = res.data.card;
                this.paymethod = res.data.paymethod
                this.paytype = res.data.paytype
            })
        },
        // 编辑
        editOrder(){
            this.$router.push({
                path: '/add/order',
                query: {
                    id: this.$route.query.id
                }
            })
        },
        // 待收货
        tihuo(){
            console.log('提货')
            this.dialogVisible = true
        },
        // 开发票
        invoice(val){
            this.$confirm('请确定是否已经收到发票，一旦确定将无法更改?', '提示', {
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
                        this.getOrderDetail()
                    }
                })
            }).catch(() => {   
            });
        },
        // 上传回单
        uploadFile(file){
            console.log(file)
            this.$http.post(this.$api.orderFile,{
                orderId:this.$route.query.id,
                fileId:file.data.id
            },res=>{
                console.log(res)
                this.$message(res.msg)
                if(res.code == 1){
                    this.getOrderDetail()
                }
            })
        },
        pingzheng(val){
            this.carrierId = val;
        },
        beforeAvatarUpload(file) {                 
            var testmsg=file.name.substring(file.name.lastIndexOf('.')+1)                
            // const extension = testmsg === 'xls'
            // const extension2 = testmsg === 'xlsx'
            const isLt2M = file.size / 1024 / 1024 < 5
            // if(!extension && !extension2) {
            //     this.$message({
            //         message: '上传文件只能是 xls、xlsx格式!',
            //         type: 'warning'
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
        // 应付上传凭证
        handleAvatarSuccess(file){
            console.log(this.carrierId)
            this.$message(file.msg)
            if(file.code == 1){
                this.$http.post(this.$api.carrierFile,{
                    id:this.carrierId,
                    fileId:file.data.id
                },res=>{
                    console.log(res)
                    this.getOrderDetail()
                })
            }
        },
        // 应收上传凭证
        orderfile(file){
            this.$message(file.msg)
            if(file.code == 1){
                this.$http.post(this.$api.orderfile,{
                    orderId:this.$route.query.id,
                    fileId:file.data.id
                },res=>{
                    console.log(res)
                    this.getOrderDetail()
                })
            }
        },
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
                        this.getOrderDetail()
                    }
                })
            }).catch(() => {    
            });
        },
        // 申请支付
        payment(val){
            this.paymentDialog = true
            this.isAllPay = false
            console.log(val)
            var payLog = val.payLog;
            for(var i of payLog){
                if(!i.payMethod){
                    i.payMethod = val.payMethodId ? parseInt(val.payMethodId) : val.payMethodId
                }else{
                    i.payMethod = parseInt(i.payMethod)
                }
                if(!i.payType){
                    i.payType = val.payTypeId ? parseInt(val.payTypeId) : val.payTypeId
                }else{
                    i.payType = parseInt(i.payType)
                }
                if(!i.cardNumber){
                    i.cardNumber = val.cardNumber
                }
                if(!i.cardtype){
                    i.cardtype = val.cardId ? parseInt(val.cardId) : val.cardId
                }else{
                    i.cardtype = parseInt(i.cardtype)
                }
                if(!i.accountHolder){
                    i.accountHolder = val.accountHolder
                }
                if(!i.bankAccount){
                    i.bankAccount = val.bankAccount
                }
                if(!i.openingBank){
                    i.openingBank = val.openingBank
                }   
                // console.log(i.charge)
                if(i.charge){
                    i.charge = parseInt(i.charge)
                }
                if(i.finance){
                    i.finance = parseInt(i.finance)
                } 
                if(i.manager){
                    i.manager = parseInt(i.manager)
                }
                console.log(i)
            }
            var array = []
            array.push(val)
            // this.carrierList = val
            console.log(array)
            this.carrierPay = array
            var arrId = []
            for(var i of array){
                console.log(i.id)
                arrId.push(i.id)
            }
            // this.carrierId = '';
            console.log(arrId.join(','))
            this.carrierId = arrId.join(',')
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
            // // }
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
            //     return this.$message('银行卡不能为空')
            // }
            // if(val.card && !val.cardNumber){
            //     return this.$message('油卡不能为空')
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
                    this.getOrderDetail();
                }
            })
            // var url = this.$api.approvalApply
            // if(this.isAllPay){
            //     console.log('全部支付')
            //     url = this.$api.applyall;
            // }
            // var payList = this.payTanListValue
            // if(!payList.name){
            //     return this.$message('项目负责人不能为空')
            // }
            // if(!payList.cwapp){
            //     return this.$message('财务审批人不能为空')
            // }
            // if(!payList.jlapp){
            //     return this.$message('经理审批人不能为空')
            // }
            // this.$http.post(url,{
            //     id:this.carrierId,
            //     charge:payList.name,
            //     finance:payList.cwapp,
            //     manager:payList.jlapp
            // },res=>{
            //     this.$message(res.msg)
            //     if(res.code == 1){
            //         this.getOrderDetail()
            //         this.paymentDialog = false
            //     }
            // })
            // console.log(payList)
        },
        // 全部付款
        applyAll(){
            var carrierPay = this.orderDetailData.carrier;
            this.carrierPay = carrierPay;
            console.log(carrierPay)
            var arrId = [];
            for(var i of carrierPay){
                arrId.push(i.id)
            }
            console.log(arrId)
            this.carrierId = arrId.join(',')
            this.paymentDialog = true;
            this.isAllPay = true;
        },
        handleClose(done) {
            console.log('关闭')
            this.abnormalVisible = false
            this.dialogVisible = false
            this.paymentDialog = false
            this.lookFileImg = false
            // this.$confirm('确认关闭？')
            // .then(_ => {
            //     done();
            // })
            // .catch(_ => {});
        },
        // 标记账单异常
        signBnormal(){
            // this.$http.post('')
            this.abnormalVisible = true;
        },
        // 确定标记异常
        abnormalSubmit(){
            this.$http.post(this.$api.signBnormal,{
                id:this.$route.query.id,
                status:7,
                errorReason:this.abnormal.name,
                errorRemark:this.abnormal.errorRemark
            },res=>{
                console.log(res)
                this.$message(res.msg)
                if(res.code==1){
                    this.abnormalVisible = false
                    this.getOrderDetail()
                }
            })
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
                    this.getOrderDetail()
                }
            })
        },
        // 关闭订单
        closeOrder(){
            this.$confirm('此操作将关闭订单, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.post(this.$api.orderClose,{
                    id:this.$route.query.id,
                    status:8
                },res=>{
                    this.$message(res.msg)
                    if(res.code==1){
                        this.back();
                    }
                })
            }).catch(() => {      
            });
        },  
        // 订单状态确认
        statusSubmit(){
            console.log('确认')
            this.$http.post(this.$api.updatestatus,{
                id:this.$route.query.id,
                status:this.btnStatusList
            },res=>{
                console.log(res)
                this.$message(res.msg)
                if(res.code == 1){
                    this.dialogVisible = false
                    this.getOrderDetail()
                }
            })
        },
        // 查看附件
        lookFile(val){
            console.log('查看附件',val)
            this.lookFileImg = true
            this.fileList = val.filelist.path
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
                    padding-bottom:20px;
                    display: flex;
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
                    color:@col9;
                }
                p+p{
                    padding-left:40px;
                }
            }
            // .address-box+.address-box,
            // .goods-box+.goods-box{
            //     padding-top:40px;
            // }
            .address-box{
                .receive,.deliver{
                    .flex1{
                        span{
                            color:@col9;
                        }
                    }
                }
                .receive:last-child{
                    padding-bottom:0;
                }
            }
            .basics-list{
                display: flex;
                span{
                    color:@col9;
                    font-size: 14/@rem;
                }
            }
            .yincheng+.yincheng{
                padding-top:40px;
            }
            .yincheng:last-child{
                .border-bottom:last-child{
                    border:0;
                    .pbom40{
                        padding-bottom:0;
                    }
                }
            }
        }

        //应付以及承运信息
        .shipment-left{
            // width:1100px;
            width:80%;
            .shipment-list{
                display: -webkit-box;
                span{
                    color: @col9;
                    // min-width: 60px;
                }
            }
        }
        .shipment-right{
            margin-bottom: 20px;
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
        // 附件
        .fujina{
            ul li{
                span{
                    color:#00A1E9;
                    display: inline-block;
                    padding-right: 5px;
                }
                a{
                    color:#606266;
                    font-size: 14px;
                    text-decoration: none;
                    display: inline-block;
                    padding-left: 5px;
                }
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
        .table-list .col-list{
            height: 50px;
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
                    overflow: hidden;
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
        // 图片查看
        .img{
            text-align: center;
        }
    }
</style>