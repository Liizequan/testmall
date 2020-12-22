<template>
    <div class="add-order">
        <!-- 新建订单 -->
        <el-form ref="Form"
            v-loading="loading"
            element-loading-text="请稍等，数据更新中..."
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(255, 255, 255, 0.5)"
        >
            <div class="between items-center order-top">
                <h4 class="top-title">{{!editDetail ? '新增' : '编辑'}}订单</h4>
                <span>{{newTime}}</span>
            </div>
            <ul>
                <!-- 基本信息 -->
                <li>
                    <el-row :gutter="20" class="is-row">
                        <el-col :span="6">
                            <div class="between">
                                <span><i class="red">*</i> 客户名称：</span>
                                <p><el-input v-model="form.customerName"></el-input></p>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="between">
                                <span><i class="red">*</i> 项目名称：</span>
                                <p><el-input v-model="form.projectName"></el-input></p>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="between">
                                <span> 联系人：</span>
                                <p><el-input v-model="form.contact"></el-input></p>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="between">
                                <span> 联系电话：</span>
                                <p><el-input v-model="form.phone" @blur="phoneReg(form.phone)" maxlength="11" show-word-limit></el-input></p>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20" class="is-row">
                        <el-col :span="6">
                            <div class="between">
                                <span>业务单号：</span>
                                <p><el-input v-model="form.service" maxlength="18"></el-input></p>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="between">
                                <span>DM单号：</span>
                                <p><el-input v-model="form.dm" maxlength="18"></el-input></p>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="between ">
                                <span>计划提货：</span>
                                <p>
                                    <!-- <el-input></el-input> -->
                                    <el-date-picker
                                    style="width:100%;"
                                    v-model="form.deliveryTime"
                                    type="datetime"
                                    format="yyyy 年 MM 月 dd 日"
                                    value-format="yyyy-MM-dd"
                                    placeholder="选择日期时间">
                                    </el-date-picker>
                                </p>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="between ">
                                <span>计划到货：</span>
                                <p>
                                    <!-- <el-input></el-input> -->
                                    <el-date-picker
                                    style="width:100%;"
                                    v-model="form.arrivalTime"
                                    type="datetime"
                                    format="yyyy 年 MM 月 dd 日"
                                    value-format="yyyy-MM-dd"
                                    placeholder="选择日期时间">
                                    </el-date-picker>
                                </p>
                            </div>
                        </el-col>
                    </el-row>
                </li>
                <!-- 收发方 -->
                <li>
                    <div class="receive between" v-for="(item,index) in form.receiveList" :key="index" >
                        <el-row :gutter="20" class="is-row">
                            <el-col :span="12">
                                <div class="receive-box">
                                    <p class="backblue">发货方</p>
                                    <div class="receive-border">
                                        <el-row :gutter="20" >
                                            <el-col :span="12" class="items-center">
                                                <span style="width:80px;">发货人：</span>
                                                <!-- <p class="flex1"><el-input v-model="item.consignor"></el-input></p> -->
                                                <p class="flex1">
                                                    <el-select v-model="item.type" filterable placeholder="请选择">
                                                        <el-option
                                                        style="width：100%"
                                                        v-for="item in goods"
                                                        :key="item.name"
                                                        :label="item.name"
                                                        :value="item.name">
                                                        </el-option>
                                                    </el-select>
                                                </p>
                                            </el-col>
                                            <el-col :span="12" class="items-center">
                                                <span style="width:80px;">联系电话：</span>
                                                <p class="flex1"><el-input v-model="item.signorphone" @blur="phoneReg(item.signorphone)" maxlength="11" show-word-limit></el-input></p>
                                            </el-col>
                                            <!-- <el-col :span="12" class="between">
                                                <span style="width:80px;">发货地址：</span>
                                                <div class="flex1">
                                                    <el-cascader
                                                    style="width:100%"
                                                        v-model="item.deliver"
                                                        :options="province"
                                                        @change="adressChange">
                                                    </el-cascader>
                                                </div>
                                            </el-col> -->
                                            <el-col :span="24" class="between">
                                                <span style="width:80px;">发货地址：</span>
                                                <p class="flex1"><el-input v-model="item.deliver"></el-input></p>
                                            </el-col>
                                            <el-col :span="24" class="between">
                                                <span style="width:80px;">备注：</span>
                                                <P class="flex1"><el-input v-model="item.signorremark"></el-input></P>
                                            </el-col>
                                        </el-row>
                                    </div>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="receive-box">
                                    <p class="backorange">收货方</p>
                                    <div class="receive-border">
                                        <el-row :gutter="20" >
                                            <el-col :span="12" class="items-center">
                                                <span style="width:80px;">收货人：</span>
                                                <p class="flex1"><el-input v-model="item.consignee"></el-input></p>
                                            </el-col>
                                            <el-col :span="12" class="items-center">
                                                <span style="width:80px;">联系电话：</span>
                                                <p class="flex1"><el-input v-model="item.signeephone" @blur="phoneReg(item.signeephone)" maxlength="11" show-word-limit></el-input></p>
                                            </el-col>
                                            <!-- <el-col :span="12" class="between">
                                                <span style="width:80px;">收货地址：</span>
                                                <p class="flex1">
                                                    <el-cascader
                                                        style="width:100%"
                                                        v-model="item.receive"
                                                        :options="province"
                                                        @change="handleChange">
                                                    </el-cascader>
                                                </p>
                                            </el-col> -->
                                            <el-col :span="24" class="between">
                                                <span style="width:80px;">收货地址：</span>
                                                <p class="flex1"><el-input v-model="item.receive"></el-input></p>
                                            </el-col>
                                        </el-row>
                                        <el-row :gutter="20" >
                                            <el-col :span="12" class="between">
                                                <span style="width:80px;">海关报关：</span>
                                                <p class="flex1"><el-input v-model="item.customs"></el-input></p>
                                            </el-col>
                                            <el-col :span="12" class="between">
                                                <span style="width:80px;">备注：</span>
                                                <p class="flex1"><el-input v-model="item.signeeremark"></el-input></p>
                                            </el-col>
                                        </el-row>
                                    </div>
                                </div>
                            </el-col>
                            <el-col :span="24" class="delete-rece" v-if="form.receiveList.length>1">
                                <el-row><el-link @click="deleteReceive(index)" :underline="false" style="color:#fff">删除</el-link></el-row>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="add-list" v-if="!editDetail">
                        <i class="el-icon-plus" @click="receiveAdd">增加收发</i>
                    </div>
                </li>
                <!-- 货物信息 -->
                <li class="goods-list">
                    <div class="list-title">
                        <p>货物信息</p>
                    </div>
                    <div class="receive-border goods-box" v-for="(item,index) in form.goodsList" :key="index">
                        <div class="between">
                            <el-row :gutter="20" >
                                <el-col :span="5" class="items-center">
                                    <span>货物类型：</span>
                                    <p class="flex1">
                                        <el-select v-model="item.type" placeholder="请选择">
                                            <el-option
                                            style="width：100%"
                                            v-for="item in goods"
                                            :key="item.name"
                                            :label="item.name"
                                            :value="item.name">
                                            </el-option>
                                        </el-select>
                                    </p>
                                </el-col>
                                <el-col :span="6" class="items-center">
                                    <span>货物名称：</span>
                                    <p class="flex1">
                                        <el-input v-model="item.name"></el-input>
                                    </p>
                                </el-col>
                                <el-col :span="3" class="items-center">
                                    <span style="width:auto">数量：</span>
                                    <p  class="flex1">
                                        <el-input v-model="item.num"></el-input>
                                        <!-- <span>件</span> -->
                                    </p>
                                </el-col>
                                <el-col :span="3" class="items-center">
                                    <span style="width:auto">重量：</span>
                                    <p class="flex1">
                                        <el-input v-model="item.weight"  @blur="isNumber(item.weight)"></el-input>
                                        <span>吨</span>
                                    </p>
                                </el-col>
                                <el-col :span="3" class="items-center">
                                    <span style="width:auto">体积：</span>
                                    <p  class="flex1">
                                        <el-input v-model="item.volume"  @blur="isNumber(item.volume)"></el-input>
                                        <span>方</span>
                                    </p>
                                </el-col>
                                <el-col :span="4" class="items-center">
                                    <span>货物价值：</span>
                                    <p class="flex1">
                                        <el-input v-model="item.worth"  @blur="isNumber(item.worth)"></el-input>
                                        <span>元</span>
                                    </p>
                                </el-col>
                                <el-col :span="11" class="items-center ptop20">
                                    <span>备注：</span>
                                    <p class="flex1">
                                        <el-input v-model="item.remark"></el-input>
                                    </p>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                    <div class="add-list" v-if="!editDetail">
                        <i class="el-icon-plus" @click="goodsAdd">增加货物信息</i>
                    </div>
                </li>
                <!-- 承运信息 -->
                <li class="goods-list meet">
                    <div class="list-title">
                        <p>应付账单以及承运信息</p>
                    </div>
                    <div class="receive-border meet-box" v-for="(item,index) in form.meetList" :key="index">
                        <div class="top">
                            <el-row :gutter="20" >
                                <el-col :span="4" class="items-center">
                                    <span style="width:230px;">配送公司/个人：</span>
                                    <p class="flex:1">
                                        <el-select v-model="item.type" placeholder="请选择">
                                            <el-option
                                            v-for="(item,index) in discomList"
                                            :key="index"
                                            :label="item"
                                            :value="item">
                                            </el-option>
                                        </el-select>
                                    </p>
                                </el-col>
                                <el-col :span="4" class="items-center">
                                    <span style="width:155px;">公司名称：</span>
                                    <p class="flex:1">
                                        <el-input v-model="item.company"></el-input>
                                    </p>
                                </el-col>
                                <el-col :span="4" class="items-center">
                                    <span style="width:155px;">司机名称：</span>
                                    <p class="flex:1">
                                        <el-input v-model="item.username"></el-input>
                                    </p>
                                </el-col>
                                <el-col :span="4" class="items-center">
                                    <span>司机电话：</span>
                                    <p class="flex:1">
                                        <el-input v-model="item.phone" @blur="phoneReg(item.phone)" maxlength="11"></el-input>
                                    </p>
                                </el-col>
                                <el-col :span="4" class="items-center">
                                    <span>车辆类型：</span>
                                    <p class="flex:1">
                                        <el-select v-model="item.cart" placeholder="请选择">
                                            <el-option
                                            v-for="item in cart"
                                            :key="item.name"
                                            :label="item.name"
                                            :value="item.name">
                                            </el-option>
                                        </el-select>
                                    </p>
                                </el-col>
                                <el-col :span="4" class="items-center">
                                    <span>车牌号码：</span>
                                    <p class="flex:1">
                                        <el-input v-model="item.plate" maxlength="8" @blur="plateReg(item.plate)"></el-input>
                                    </p>
                                </el-col>
                            </el-row>
                            <el-row :gutter="20" class="ptop20">
                                <el-col :span="4" class="items-center">
                                    <span>装卸方式：</span>
                                    <p class="flex:1">
                                        <el-select v-model="item.dock" placeholder="请选择">
                                            <el-option
                                            v-for="item in dock"
                                            :key="item.name"
                                            :label="item.name"
                                            :value="item.name">
                                            </el-option>
                                        </el-select>
                                    </p>
                                </el-col>
                                <el-col :span="4" class="items-center">
                                    <span>用车类型：</span>
                                    <p class="flex:1">
                                        <el-select v-model="item.cartType" placeholder="请选择">
                                            <el-option
                                            v-for="item in cartType"
                                            :key="item.name"
                                            :label="item.name"
                                            :value="item.name">
                                            </el-option>
                                        </el-select>
                                    </p>
                                </el-col>
                                <el-col :span="4" class="items-center">
                                    <span>提货服务：</span>
                                    <p class="flex:1">
                                        <el-select v-model="item.service" placeholder="请选择">
                                            <el-option
                                            v-for="item in needService"
                                            :key="item"
                                            :label="item"
                                            :value="item">
                                            </el-option>
                                        </el-select>
                                    </p>
                                </el-col>
                                <el-col :span="6" class="items-center">
                                    <span style="width:80px;">提货地址：</span>
                                    <p class="flex:1">
                                        <el-input v-model="item.carry"></el-input>
                                    </p>
                                </el-col>
                                <el-col :span="6" class="items-center">
                                    <span style="width:80px;">送货地址：</span>
                                    <p class="flex:1">
                                        <el-input v-model="item.delivery"></el-input>
                                    </p>
                                </el-col>
                            </el-row>
                        </div>
                        <div class="cntent ptop20">
                            <el-row :gutter="20" >
                                <el-col :span="4" class="items-center">
                                    <span>承运费用：</span>
                                    <p class="flex1">
                                        <el-input v-model="item.cost" @blur="isNumber(item.cost)"></el-input>
                                        <span>元</span>
                                    </p>
                                </el-col>
                                <el-col :span="4" class="items-center">
                                    <span>装卸费：</span>
                                    <p class="flex1">
                                        <el-input v-model="item.dockCost" @blur="isNumber(item.dockCost)"></el-input>
                                        <span>元</span>
                                    </p>
                                </el-col>
                                <el-col :span="4" class="items-center">
                                    <span>保险费：</span>
                                    <p class="flex1">
                                        <el-input v-model="item.insurance" @blur="isNumber(item.insurance)"></el-input>
                                        <span>元</span>
                                    </p>
                                </el-col>
                                <el-col :span="8" class="items-center">
                                    <span style="width:60px">油卡：</span>
                                    <p class="flex1">
                                        <el-input placeholder="卡号" v-model="item.cardNumber"  @blur="numCart(item.cardNumber)" maxlength="19" class="input-with-select">
                                            <el-select v-model="item.card" slot="prepend" style="width:110px" placeholder="请选择">
                                                <el-option
                                                v-for="item in cardtype"
                                                :key="item.id"
                                                :label="item.name"
                                                :value="item.id">
                                                </el-option>
                                            </el-select>
                                        </el-input>
                                    </p>
                                </el-col>
                                <el-col :span="4" class="items-center">
                                    <span>付款方式：</span>
                                    <p class="flex1">
                                        <el-select v-model="item.payMethod" placeholder="请选择">
                                            <el-option
                                            v-for="item in paymethod"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </p>
                                </el-col>
                                <el-col :span="4" class="items-center  ptop20">
                                    <span>付款类型：</span>
                                    <p class="flex1">
                                        <el-select v-model="item.payType" placeholder="请选择">
                                            <el-option
                                            v-for="item in paytype"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </p>
                                </el-col>
                                <el-col :span="4" class="items-center  ptop20">
                                    <span>首笔付讫方式：</span>
                                    <p class="flex1">
                                        <el-select v-model="item.paid" placeholder="请选择">
                                            <el-option
                                            v-for="item in paid"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </p>
                                </el-col>
                            </el-row>
                            <div class="money items-center mbom20">
                                <p class="items-center" style="margin-left:0;">总费用：
                                    <strong class="backorange">
                                        {{(parseInt(item.cost) || 0.00 ) + (parseInt(item.dockCost) || 0.00 ) + (parseInt(item.insurance) || 0.00)}}
                                    </strong> 元；
                                </p> 
                                已付{{item.amountPaid || 0}}元，油卡{{item.cardPaid || 0}}元；还需要支付<span class="backorange">
                                    {{parseInt(item.cost)+parseInt(item.dockCost)+parseInt(item.insurance)-parseInt(item.amountPaid)-parseInt(item.cardPaid) || 0.00}}
                                </span>元
                            </div>
                        </div>
                        <div class="footer pbom10">
                            <h3>应付信息</h3>
                            <el-row :gutter="20">
                                <el-col :span="7" class="items-center">
                                    <span style="width:90px">开户人：</span>
                                    <p class="flex1">
                                        <el-input v-model="item.accountHolder"></el-input>
                                    </p>
                                </el-col>
                                <el-col :span="5" class="items-center">
                                    <span>银行账号：</span>
                                    <p class="flex1">
                                        <el-input v-model="item.bankAccount" maxlength="19" @blur="bankReg(item.bankAccount)"></el-input>
                                    </p>
                                </el-col>
                                <el-col :span="4" class="items-center">
                                    <span>所属银行：</span>
                                    <p class="flex1">
                                        <el-input v-model="item.openingBank"></el-input>
                                    </p>
                                </el-col>
                                <el-col :span="4" class="items-center">
                                    <span>已付金额：</span>
                                    <p class="flex1">
                                        <el-input v-model="item.amountPaid" @blur="isNumber(item.amountPaid)"></el-input>
                                        <span style="width:10px">元</span>
                                    </p>
                                </el-col>
                                <el-col :span="4" class="items-center">
                                    <span>已付油卡：</span>
                                    <p class="flex1">
                                        <el-input v-model="item.cardPaid" @blur="isNumber(item.cardPaid)"></el-input>
                                        <span style="width:10px">元</span>
                                    </p>
                                </el-col>
                                <el-col :span="12" class="ptop20">
                                    <el-upload
                                    class="upload-demo"
                                    :header="{'method':'post'}"
                                    :action="$http.fileUrl"
                                    :multiple="true"
                                    :beforeUpload="beforeAvatarUploadPdf"
                                    :on-preview="handlePreview"
                                    :on-success="handleSucess"
                                    :on-remove="handleRemove"
                                    :file-list="item.fileList"
                                    >
                                    <el-button @click="sijiFile(index)">上传司机证件</el-button>
                                    </el-upload>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                    <div class="add-list between " v-if="!editDetail">
                        <i class="el-icon-plus" @click="meetAdd">增加承运信息</i>
                        <!-- <el-button style="height:32px;line-height:7px;">上传司机证件</el-button> -->
                    </div>
                </li>
                <!-- 应收账单 -->
                <li class="goods-list">
                    <div class="list-title">
                        <p>应收账单</p>
                    </div>
                    <div class="receive-border receivable">
                        <div class="top">
                            <div class="pad-t20 flex receivable-list">
                                <div class="items-center">
                                    <span>订单费用：</span>
                                    <p style="width:122px;">
                                        <el-input v-model="form.cost" @blur="isNumber(form.cost)"></el-input>
                                        <span>元</span>
                                    </p>
                                </div>
                                <div class="items-center">
                                    <span>付款方式：</span>
                                    <p style="width:112px;">
                                        <el-select v-model="form.payMethod" placeholder="请选择">
                                            <el-option
                                            v-for="item in paymethodList"
                                            :key="item.label"
                                            :label="item.label"
                                            :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="cntent">
                            <div class="money items-center">
                                <p class="items-center">总费用：<strong class="backorange">{{form.cost || 0}}</strong> 元；</p> 
                                已收{{form.amountReceived || 0}} 元 , 待收{{(parseInt(form.cost) || 0) - (parseInt(form.amountReceived)||0)}} 元。
                            </div>
                        </div>
                        <div class="footer">
                            <h3>应收信息</h3>
                            <div class="is-footer">
                                <el-row :gutter="20">
                                    <el-col :span="6" class="items-center">
                                        <span>开户人：</span>
                                        <p class="flex1">
                                            <el-input v-model="form.accountHolder"></el-input>
                                        </p>
                                    </el-col>
                                    <el-col :span="6" class="items-center">
                                        <span>银行账号：</span>
                                        <p class="flex1">
                                            <el-input v-model="form.bankAccount" maxlength="19"  @blur="bankReg(form.bankAccount)"></el-input>
                                        </p>
                                    </el-col>
                                    <el-col :span="6" class="items-center">
                                        <span>所属银行：</span>
                                        <p class="flex1">
                                            <el-input v-model="form.openingBank"></el-input>
                                        </p>
                                    </el-col>
                                    <el-col :span="6" class="items-center ">
                                        <span>转账时间：</span>
                                        <p class="flex1">
                                            <el-date-picker
                                            style="width:100%;"
                                            v-model="form.pickUp"
                                            type="datetime"
                                            format="yyyy 年 MM 月 dd 日"
                                            value-format="yyyy-MM-dd"
                                            placeholder="选择转账时间">
                                            </el-date-picker>
                                        </p>
                                    </el-col>
                                    
                                    <el-col :span="6" class="items-center ptop20">
                                        <span>核对人：</span>
                                        <p class="flex1">
                                            <el-select v-model="form.checkman" style="width:100%" placeholder="请选择">
                                                <el-option
                                                v-for="item in userList"
                                                :key="item"
                                                :label="item"
                                                :value="item">
                                                </el-option>
                                            </el-select>
                                        </p>
                                    </el-col>
                                    <el-col :span="6" class="items-center ptop20">
                                        <span>已收金额：</span>
                                        <p class="flex1">
                                            <el-input v-model="form.amountReceived"  @blur="isNumber(form.amountReceived)"></el-input>
                                            <span style="width:10px">元</span>
                                        </p>
                                    </el-col>
                                    <el-col :span="12" class="items-center ptop20">
                                        <span>备注：</span>
                                        <p class="flex1">
                                            <el-input v-model="form.receivedRemark"></el-input>
                                        </p>
                                    </el-col>
                                </el-row>
                            </div>
                        </div>
                    </div>
                </li>
                <!-- 其他备注及附件 -->
                <li class="goods-list autofu">
                    <div class="list-title">
                        <p>其他备注及附件</p>
                    </div>
                    
                    <div class="receive-border receivable">
                        <div class="items-center beizhu">
                            <span>备注：</span>
                            <p style="width:600px; margin-left:40px;">
                                <el-input type="textarea" v-model="form.remark"></el-input>
                            </p>
                        </div>  
                        <!-- <div class="items-center">
                            <span>附件：</span>
                            <p style="width:600px; margin-left:40px;">
                                <el-button>上传回单</el-button>
                                <el-button>支付凭证</el-button>
                                <el-button>其他</el-button>
                            </p>
                        </div>  
                        <p style="margin-left: 85px;padding-top: 15px">
                            * 附件格式仅支持：word、pdf、excel、jpg、png格式文件
                        </p> -->
                        <el-upload
                            class="upload-demo"
                            :action="this.$http.fileUrl"
                            :beforeUpload="beforeAvatarUploadPdf"  
                            :on-success="handleAvatarSuccess"
                            :before-remove="removeUpload"
                            :file-list="form.file">
                            <!-- <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                            <div class="items-center">
                                <span>附件：</span>
                                <p style="margin-left:40px;text-align:left">
                                    <el-button>上传回单</el-button>
                                    <el-button>支付凭证</el-button>
                                    <el-button>其他</el-button>
                                </p>
                            </div>  
                            <p style="margin-left: 85px;padding-top: 15px" slot="tip" >
                                * 附件格式仅支持：word、pdf、excel、jpg、png格式文件
                            </p>
                        </el-upload>
                    </div>
                </li>
            </ul>
            <div class="btn">
                <div class="items-center status">
                    <span>目前状态：</span>
                    <div v-if="!editDetail">
                        <div class="fan-btn backb">录单</div>
                    </div>
                    <div v-else>
                        <el-button v-for="(item,index) in status" :key="index" :type="item.id == form.status ? 'primary': ''" v-model="form.status" @click="subSatus(item.id)">{{item.name}}</el-button>
                    </div>
                </div>
                <div class="txt-center">
                    <el-button @click="save(10)" v-if="!editDetail">保存订单</el-button>
                    <el-button @click="save(20)" v-if="!editDetail">存到草稿</el-button>
                    <el-button @click="save(30)" v-else>编辑订单</el-button>
                    <el-button @click="resets">重置表单</el-button>
                </div>
            </div>
        </el-form>
    </div>
</template>
<script>
export default {
    data() {
        return {
            addYouKa:false,//是否是添加油卡
            loading:false,
            newTime:'',//时间
            
            form:{
                // 顶部
                customerName:'',// 客户名称
                projectName:'',// 项目名称
                contact:'',//联系人
                phone:'',//电话
                service:'',//业务单号
                dm:'',//dm单号
                deliveryTime:'',//提货时间
                arrivalTime:'',//到货时间

                // 应付
                cost:0,//订单费用
                payMethod:'',//付款方式
                payType:'',//付款类型
                accountHolder:'',//名称、开户人
                bankAccount:'',//银行账号
                openingBank:'',//开户银行
                pickUp:'',//选择转账时间
                checkman:'',//核对人
                amountReceived:0,//已收金额
                receivedRemark:'',//收款备注
                remark:'',//附件备注
                fileList:[],//文件上传
                carriersFile:[],//司机证件
                status:1,
                sijiFile:null,//用来决定点击的是哪个司机信息


                receiveList:[//发货
                    {
                        consignor:'',signorphone:'',deliver:'',signoraddress:'',
                        signorremark:'',consignee:'',signeephone:'',receive:'',
                        signeeaddress:'',customs:'',signeeremark:''
                    }
                ],
                goodsList:[// 货物信息
                    {type:'',name:'',num:null,weight:null,volume:null,worth:null,remark:''}
                ],
                meetList:[//应付账单以及承运信息
                    {
                        type:"",company:"",username:"",phone:"",cart:"",
                        plate:"",dock:"",cartType:"",service:"",carry:"",
                        delivery:"",cost:null,dockCost:null,insurance:null,
                        card:"",cardNumber:"",payMethod:null,payType:null,
                        paid:"",accountHolder:"",bankAccount:"",
                        openingBank:"",amountPaid:"",cardPaid:"",file:[],
                    }
                ],
            },

            // 本地数据
            discomList:['公司','个人'],//公司个人选项
            needService:['需要','不需要'],//提货服务
            
            paymethodList:[{// 付款方式
                value:10, label:'网银'
            },{
                value:20, label:'现金'
            }],
            // 数据库数据
            goods:[],//货物类型
            card:[],
            cart:[],//货车类型
            cartType:[],//用车类型
            dock:[],//卸装方式
            paymethod:[],//付款方式
            paytype:[],//付款类型
            paid:[],//首笔付讫方式
            cardtype:[],//油卡
            province:[],//地址
            userList:[],//核对人
            status:[
                {id:1,name:'录单'},//添加的时候只有录单
                {id:2,name:'待发货'},
                {id:3,name:'运输中'},
                {id:4,name:'待提货'},
                {id:5,name:'待回单'},
                {id:6,name:'已完成'},
                {id:7,name:'异常'},
                {id:8,name:'取消'},
            ],//按钮状态

            editDetail:false,
        }
    },
    created() {
        var day2 = new Date();
        this.newTime = day2.getFullYear()+"-" + (day2.getMonth()+1) + "-" + day2.getDate();
        this.getSelectData()
        this.getlocalStorageData()
        this.getOrderDetail()
        this.getUserList()
        console.log(this.$route.query.id)
    },
    methods: {
        getUserList(){
            this.$http.get(this.$api.dataUserlist,{},res=>{
                this.userList = res.data
            })
        },
        getSelectData(){
            this.$http.get(this.$api.orderData,{},res=>{
                console.log(res)
                // this.loading = false
                var data = res.data
                this.cardtype = data.card;
                this.cart = data.cart;
                this.cartType = data.cartType;
                this.dock = data.dock;
                this.goods = data.goods;
                this.paymethod = data.paymethod;
                this.paytype = data.paytype;
                this.paid = data.paid
                this.province = data.province
            })
        },
        getlocalStorageData(){
            const orderFormData = localStorage.getItem("orderForm");
            console.log(orderFormData)
        },
        // 获取编辑数据
        getOrderDetail(){
            if(this.$route.query.id){
                this.editDetail = true
                this.$http.get(this.$api.orderDetail,{
                    id:this.$route.query.id
                },res=>{
                    console.log(res)
                    // this.orderDetailData = res.data
                    // this.info = res.data.info
                    if(res.code==1){
                        this.form.customerName = res.data.customer// 客户名称
                        this.form.projectName = res.data.project// 项目名称
                        this.form.contact = res.data.contact//联系人
                        this.form.phone = res.data.phone//电话
                        this.form.service = res.data.numberOne//业务单号
                        this.form.dm = res.data.numberTwo//dm单号
                        this.form.deliveryTime = res.data.deliveryTime//提货时间
                        this.form.arrivalTime = res.data.arrivalTime//到货时间
                        var file = JSON.parse(JSON.stringify(res.data.file));
                        if(!file){
                            this.form.file = []
                        }else{
                            console.log('存在')
                            // var fileArr = [];
                            console.log(file)
                            for(var j of file){
                                console.log(j)
                                j = Object.assign(j,j.fileId)
                                // fileArr.push(j)
                            }
                            console.log(file)
                            this.form.file = file
                            this.form.fileList = file
                        }
                        // 应付
                        this.form.cost=res.data.cost//订单费用
                        this.form.payMethod = res.data.payMethod//付款方式
                        this.form.payType = res.data.payType//付款类型
                        this.form.accountHolder = res.data.accountHolder//名称、开户人
                        this.form.bankAccount = res.data.bankAccount//银行账号
                        this.form.openingBank = res.data.openingBank//开户银行
                        this.form.pickUp = res.data.transferTime//选择转账时间
                        this.form.checkman = res.data.checkman//核对人
                        this.form.amountReceived=res.data.amountReceived,//已收金额
                        this.form.receivedRemark= res.data.receivedRemark,//收款备注
                        this.form.remark= res.data.remark,//附件备注
                        this.form.status=res.data.status;
                        // this.sijiFile:null,//用来决定点击的是哪个司机信息
                        var info = res.data.info;
                        for(var i in info){
                            var deliver = info[i].deliverId.split(',')
                            var receive = info[i].receiveId.split(',')
                            if(deliver instanceof Array){
                                for(var j in deliver){
                                    deliver[j] = parseInt(deliver[j])
                                }
                            }
                            if(receive instanceof Array){
                                for(var j in receive){
                                    receive[j] = parseInt(receive[j])
                                }
                            }
                            info[i].deliver = deliver
                            info[i].receive = receive
                        }
                        this.form.receiveList = info;
                        this.form.goodsList = res.data.goods
                        

                        var carrier = res.data.carrier
                        for(var i in carrier){
                            carrier[i] = Object.assign({fileList:carrier[i].file},carrier[i])
                        }
                        console.log(carrier)
                        for(var i of carrier){
                            i.card = parseInt(i.cardId)
                            i.paid = parseInt(i.paidId)
                            i.payMethod = parseInt(i.payMethodId)
                            i.payType = parseInt(i.payTypeId)
                            var file = i.file;
                            if(!file){
                                console.log('没有附件')
                                i.fileList = []
                                i.file = []
                            }
                            console.log(i.fileList)
                            if(file instanceof Array){
                                i.fileList = file
                                var carFile = []
                                for(var j of file){
                                    carFile.push(j.id)
                                }
                                i.file = carFile
                            }
                        }
                        console.log(carrier)
                        console.log(this.form.carriersFile)
                        this.form.meetList = carrier


                        // var fileArr = []
                        // for(var i in carrier){
                        //     carrier[i].paid = parseInt(carrier[i].paidId)
                        //     carrier[i].card = parseInt(carrier[i].cardId)
                        //     carrier[i].payMethod = parseInt(carrier[i].payMethodId)
                        //     carrier[i].payType = parseInt(carrier[i].payTypeId)

                        //     var file =carrier[i].file;
                        //     this.form.carriersFile = file
                        //     for(var j in file){
                        //         if(file[j] == 0){
                        //             return carrier[i].file = fileArr
                        //         }
                        //         fileArr.push(file[j].id)
                        //         if(file.length==fileArr.length){
                        //             console.log(carrier[i].file )
                        //             console.log(fileArr )
                        //             carrier[i].file = fileArr
                        //             console.log(carrier[i].file )
                        //             console.log(fileArr )
                        //         }
                        //     }
                        // }
                        // console.log(carrier)
                        // this.form.meetList = carrier
                        // this.form.receiveList = info;
                        // this.form.goodsList = res.data.goods

                        // var file = res.data.file;
                        // if(file instanceof Array){
                        //     if(file.length>0){
                        //         for(var i of file){
                        //             i = Object.assign(i,i.fileId)
                        //         }
                        //         this.form.file = file
                        //         this.form.fileList = file
                        //     }else{
                        //         this.form.file = []
                        //         this.form.fileList = []
                        //     }
                            
                        // }else{
                        //     this.form.file = []
                        //     this.form.fileList = []
                        // }



                    }
                })
            }
        },
        // 电话正则
        phoneReg(val){
            console.log(val)
            if(!this.$reg.isPhone(val) && val){
                this.$message({
                    message: '手机格式不对',
                    center: true
                });
            }
        },
        // 银行账号
        bankReg(val){
            console.log(this.$reg.onlyne(val))
            if(!this.$reg.onlyne(val)){
                this.$message({
                    message: '银行账号不对',
                    center: true
                });
            }
        },
        // 车牌正则
        plateReg(val){
            if(!this.$reg.isPlaTe(val)){
                this.$message({
                    message: '车牌号码错误',
                    center: true
                })
            }
        },
        // 油卡正则
        numCart(val){
            console.log(val)
            console.log(this.$reg.onlyne(val))
            if(!this.$reg.onlyne(val)){
                this.$message({
                    message: '卡号错误',
                    center: true
                })
            }
        },
        // 数字
        isNumber(val){
            console.log(this.$reg.mtf(val))
            console.log(val)
            if(!this.$reg.mtf(val) && val) {
                this.$message({
                    message: '格式错误，请输入有效数字',
                    center: true
                })
            }
        },
        // 删除收发方
        deleteReceive(val){
            console.log(val)
            if(this.form.receiveList.length>1){
                this.$confirm('是否继续删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.form.receiveList.splice(val,1)
                }).catch(() => {
                     
                });
            }
        },  
        handleChange(val){
            console.log(val)
        },
        adressChange(val){
        },
        receiveAdd(){
            console.log('收发添加')
            this.form.receiveList.push(
                {
                    consignor:'',signorphone:'',deliver:'',signoraddress:'',
                    signorremark:'',consignee:'',signeephone:'',receive:'',
                    signeeaddress:'',customs:'',signeeremark:''
                }
            )
        },
        goodsAdd(){
            console.log('货物信息添加')
            this.form.goodsList.push(
                {type:'',name:'',num:null,weight:null,volume:null,worth:null,remark:''}
            )
        },
        meetAdd(){
            console.log('增加承运信息')
            this.form.meetList.push(
                {
                    type:"",company:"",username:"",phone:"",cart:"",
                    plate:"",dock:"",cartType:"",service:"",carry:"",
                    delivery:"",cost:null,dockCost:null,insurance:null,
                    card:"",cardNumber:"",payMethod:null,payType:null,
                    paid:"",accountHolder:"",bankAccount:"",
                    openingBank:"",amountPaid:"",cardPaid:"",file:[]
                }
            )
        },
        subSatus(val){
            console.log(val)
            this.form.status = val
        },
        beforeAvatarUploadPdf(file){
            console.log('文件上传情况')
            console.log(this.$http.fileUrl)
            // var testmsg=file.name.substring(file.name.lastIndexOf('.')+1)	
            // const extension = testmsg === 'jpg' ||  testmsg === 'JPG' ||  testmsg === 'png' ||  testmsg === 'PNG';
            const isLt2M = file.size / 1024 / 1024 < 2
            // if(!extension ) {
            //     this.$message({
            //         message: '上传文件只能是jpg或者png格式!',
            //         type: 'error'
            //     });
            //     return false;//必须加上return false; 才能阻止
            // }    
            // console.log(file)
            if(!isLt2M) {
                this.$message({
                    message: '上传文件大小不能超过 2MB!',
                    type: 'error'
                });
                return false;
            }
            return isLt2M
        },
        handleAvatarSuccess(res, file){
            console.log(res)
            this.form.fileList.push(res.data)
            console.log(this.form.fileList)
        },
        removeUpload(file, fileList){
            console.log(this.form.file)
            console.log(this.form.fileList)
            for(var i in fileList){
                if(fileList[i].id == file.id){
                    fileList.splice(i,0)
                    this.form.fileList =fileList
                    this.form.file =fileList
                }
            }
            console.log(this.form.file)
            console.log(this.form.fileList)
        },
        // 判断数据不能为空
        noNullData(){

            
            
        },
        // 保存
        save(val){
            let form = this.form;
            // return console.log(form)





            if(!form.customerName){
                return this.$message('客户名称不能为空')
            }else if(!form.projectName){
                return this.$message('项目名称不能为空')
            }else if(!form.contact){
                return this.$message('联系人不能为空')
            }else if(!this.$reg.isPhone(form.phone) && !form.phone){
                return this.$message('手机格式不对')
            }else if(!form.service){
                return this.$message('业务单号不能为空')
            }else if(!form.dm){
                return this.$message('dm单号不能为空')
            }
            var receiveList = form.receiveList;
            for(var i of receiveList){
                if(!i.consignor){
                    return this.$message('发货人不能为空')
                }
                if(!this.$reg.isPhone(i.signorphone) && !i.signorphone){
                    return this.$message('发货方联系电话格式不对')
                }
                if(!i.deliver){
                    return this.$message('发货方地址不能为空')
                }
                if(!i.signoraddress){
                    return this.$message('发货方详细地址不能为空')
                }
                if(!i.consignee){
                    return this.$message('收货人不能为空')
                }
                if(!this.$reg.isPhone(i.signeephone) && !i.signeephone){
                    return this.$message('收货方联系电话格式不对')
                }
                if(!i.receive){
                    return this.$message('收货方地址不能为空')
                }
                if(!i.signeeaddress){
                    return this.$message('收货方详细地址不能为空')
                }

            }
            var goodsList = form.goodsList;
            for(var i of goodsList){
                if(!i.type){
                    return this.$message('货物信息: 货物类型')
                }
                if(!i.name){
                    return this.$message('货物信息: 货物名称')
                }
                if(!i.num){
                    return this.$message('货物信息: 数量')
                }
                if(!i.weight){
                    return this.$message('货物信息: 重量')
                }
                if(!i.volume){
                    return this.$message('货物信息: 体积')
                }
                if(!i.worth){
                    return this.$message('货物信息: 货物价值')
                }   
            }
            var meetList = form.meetList;
            for(var i of meetList){
                if(!i.type){
                    return this.$message('应付账单以及承运信息: 配送公司/个人不能为空')
                }
                if(!i.company){
                    return this.$message('应付账单以及承运信息: 公司名称不能为空')
                }
                if(!i.username){
                    return this.$message('应付账单以及承运信息: 司机名称不能为空')
                }
                if(!this.$reg.isPhone(i.phone) && !i.phone){
                    return this.$message('应付账单以及承运信息: 司机电话格式错误')
                }
                if(!i.cart){
                    return this.$message('应付账单以及承运信息: 车辆类型不能为空')
                }
                if(!this.$reg.isPlaTe(i.plate)){
                    return this.$message('应付账单以及承运信息: 车牌号码格式错误')
                }
                if(!i.dock){
                    return this.$message('应付账单以及承运信息: 装卸方式不能为空')
                }
                if(!i.cartType){
                    return this.$message('应付账单以及承运信息: 用车类型不能为空')
                }
                if(!i.service){
                    return this.$message('应付账单以及承运信息: 提货服务不能为空')
                }
                if(!i.carry){
                    return this.$message('应付账单以及承运信息: 提货地址不能为空')
                }
                if(!i.delivery){
                    return this.$message('应付账单以及承运信息: 送货地址不能为空')
                }
                if(!i.cost){
                    return this.$message('应付账单以及承运信息: 承运费用不能为空')
                }
                if(!i.dockCost){
                    return this.$message('应付账单以及承运信息: 装卸费不能为空')
                }
                if(!i.insurance){
                    return this.$message('应付账单以及承运信息: 保险费不能为空')
                }
                if(!i.payMethod){
                    return this.$message('应付账单以及承运信息: 付款方式不能为空')
                }
                if(!i.payType){
                    return this.$message('应付账单以及承运信息: 付款类型不能为空')
                }
                if(!i.paid){
                    return this.$message('应付账单以及承运信息: 首笔付讫方式不能为空')
                }
                if(!i.accountHolder){
                    return this.$message('应付账单以及承运信息: 开户人不能为空')
                }
                if(!i.bankAccount){
                    return this.$message('应付账单以及承运信息: 银行账号不能为空')
                }
                if(!i.openingBank){
                    return this.$message('应付账单以及承运信息: 所属银行不能为空')
                }
                if(!i.amountPaid){
                    return this.$message('应付账单以及承运信息: 已付金额不能为空')
                }
            }


            var draft = 10;//保存或者存为草稿
            if(val==20 || val == 30){
                draft = 20
            }

            let newFileList = [];
            // 附件
            for(var i of form.fileList){
                newFileList.push(i.id)
            }
            console.log(newFileList)

            // 发货方
            let info = form.receiveList;
            for(var i in info){
                console.log(info[i].deliver)
                if(info[i].deliver instanceof Array){
                    info[i].deliver = info[i].deliver.join(',')
                }
                if(info[i].receive instanceof Array){
                    info[i].receive = info[i].receive.join(',')
                }
            }

            // 应付
            let carrier = JSON.parse(JSON.stringify(form.meetList));
            for(var i in carrier){
                if(carrier[i].file instanceof Array){
                    if(carrier[i].file.length>0){
                        // if(!carrier[i].file[0]){//如果附件不存在
                        //     console.log('凉了')
                        //     // carrier[i].file[0] = '0'
                        // }else{
                        //     carrier[i].file = carrier[i].file.join(',')
                        // }
                        carrier[i].file = carrier[i].file.join(',')
                        console.log(carrier)
                    }else{
                        carrier[i].file = '';
                        console.log('没有附件') 
                    }
                }
            }
            // console.log(carrier)
            // return console.log(form)
            var url = this.$api.orderAdd;//添加
            var data = {
                // 顶部
                customer:form.customerName,// 客户名称
                project:form.projectName,// 项目名称
                contact:form.contact,//联系人
                phone:form.phone,//电话
                numberOne:form.service,//业务单号
                numberTwo:form.dm,//dm单号
                deliveryTime:form.deliveryTime,//提货时间
                arrivalTime:form.arrivalTime,//到货时间

                // 应付
                cost:form.cost,//订单费用
                payMethod:form.payMethod,//付款方式
                // payType:form.payType,//付款类型
                accountHolder:form.accountHolder,//名称、开户人
                bankAccount:form.bankAccount,//银行账号
                openingBank:form.openingBank,//开户银行
                transferTime:form.pickUp,//选择转账时间
                checkman:form.checkman,//核对人
                amountReceived:form.amountReceived,//已收金额
                receivedRemark:form.receivedRemark,//收款备注
                remark:form.remark,//附件备注
                file:newFileList.join(','),//文件上传
                status:form.status,//按钮状态
                draft:draft,//保存  20 草稿
                info:JSON.stringify(info),
                goods:JSON.stringify(form.goodsList),
                carrier:JSON.stringify(carrier),
            }
            if(this.editDetail){
                url = this.$api.orderEdit;//编辑
                data = Object.assign({id:this.$route.query.id},data)
            }
            
            this.$http.post(url,data,res=>{
                console.log(res)
                this.$message(res.msg)
                if(res.code == 1){//添加成功清空
                    if(this.editDetail){
                        this.back()
                    }else{
                        this.reset()
                    }
                }
            })
            /**/
        },
        // 存到草稿
        draft(){
            console.log('保存到本地')
            console.log(this.form)
            localStorage.setItem("orderForm",JSON.stringify(this.form));
        },
        sijiFile(index){//用来确定存储的是那条数据
            console.log(index)
            this.form.sijiFile = index
        },
        handleSucess(file){
            console.log(file)
            // console.log(this.form.meetList[this.form.sijiFile].file)
            this.form.meetList[this.form.sijiFile].file.push(file.data.id)
            // if(!this.form.meetList[this.form.sijiFile].fileList){
            //     // console.log(this.form.meetList[this.form.sijiFile])
            //     // console.log(Object.assign({fileList:[]},this.form.meetList[this.form.sijiFile]))
            //     this.form.meetList[this.form.sijiFile] = Object.assign({fileList:[]},this.form.meetList[this.form.sijiFile])
            // }
            // this.form.meetList[this.form.sijiFile].fileList.push(file.data)
            // console.log(this.form.meetList)
        },
        //正在上传司机凭证 
        handlePreview(file){
            console.log(this.form.meetList)
            console.log(file)
        },

        // 删除凭证
        handleRemove(file,fileList){
            console.log(file)
            console.log(fileList)
            console.log(this.form.meetList)
            var meetList = this.form.meetList
            for(var i of meetList){
                console.log(i.file)
                for(var j in i.file){
                    if(file.id == i.file[j] || file.response.data.id == i.file[j]){
                        var newFile = i.file.splice(j,1);
                    }
                }
            }
            console.log(meetList)
            this.form.meetList = meetList
        },
        // 重置
        resets(){
            this.$confirm('重置表单将清空所有数据，是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.reset()
            }).catch(() => {
                     
            });
        },
        reset(){
            this.form = {
                // 顶部
                customerName:'',// 客户名称
                projectName:'',// 项目名称
                contact:'',//联系人
                phone:'',//电话
                service:'',//业务单号
                dm:'',//dm单号
                deliveryTime:'',//提货时间
                arrivalTime:'',//到货时间

                // 应付
                cost:'',//订单费用
                payMethod:'',//付款方式
                payType:'',//付款类型
                accountHolder:'',//名称、开户人
                bankAccount:'',//银行账号
                openingBank:'',//开户银行
                pickUp:'',//选择转账时间
                checkman:'',//核对人
                amountReceived:'',//已收金额
                receivedRemark:'',//收款备注
                remark:'',//附件备注
                fileList:[],//文件上传


                receiveList:[//发货
                    {
                        consignor:'',signorphone:'',deliver:'',signoraddress:'',
                        signorremark:'',consignee:'',signeephone:'',receive:'',
                        signeeaddress:'',customs:'',signeeremark:''
                    }
                ],
                goodsList:[// 货物信息
                    {type:'',name:'',num:null,weight:null,volume:null,worth:null,remark:''}
                ],
                meetList:[//应付账单以及承运信息
                    {
                        type:"",company:"",username:"",phone:"",cart:"",
                        plate:"",dock:"",cartType:"",service:"",carry:"",
                        delivery:"",cost:"",dockCost:"",insurance:"",
                        card:"",cardNumber:"",payMethod:null,payType:null,
                        paid:"",accountHolder:"",bankAccount:"",
                        openingBank:"",amountPaid:"",cardPaid:"",file:[]
                    }
                ],
            }
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
    .add-order{
        // padding:25px;
        color:@col3;
        // 新增
        .add-list{
            color:@col9;
            font-size: 14/@rem;
            padding:10px 0;
        }
        .add-list i:hover{
            cursor:pointer;
        }
        .goods-list{
            margin-top:20px;
        }
        // 头部
        .list-title{
            padding:15px 20px;
            font-size: 16/@rem;
            font-weight: bold;
            background-color: #F7F6F9;
            border: @border;
        }
        .order-top{
            padding-bottom: 10px;
            margin-bottom: 10px;
            border-bottom: 1px solid #F7F7F7;
        }
        .is-row {
            .between{
                // width:347px;
                display: flex;
                padding-top:20px;
                align-items: center;
            }
            .between>span{
                display: inline-block;
                width:90px;
            }
            .between>p{
                // flex:1;
                width:260px;
            }
            i{
                color:red;
            }
        }
        .receive-border .between>p{
            // width:240px;
        }
        // 收发
        .receive{
            padding-top:40px;
            .backblue{
                background-color: @backblue;
            }
            .backorange{
                background-color: @backorange;
            }
            .delete-rece{
                position: absolute;
                top:0;
                right: 20px;
                height: 52px;
                line-height: 52px;
                text-align: right;
            }
            .receive-box>p{
                height: 52px;
                line-height: 52px;
                padding-left:20px;
                color: @colf;
                font-size: 16/@rem;

            }
        }
        .receive+.receive{
            padding-top:20px;
        }
        .receive-border .is-row{
            display: flex;
            justify-content: space-between;
        }
        .receive-border .is-row .between{
            width:327px;
        }
        .receive-border .is-norow .between{
            width:100%;
        }
        // 货物
        .goods-list{
            .goods{
                padding-top:0;
            }
            .items-center>p{
                position: relative;
                span{
                    position: absolute;
                    right:10px;
                    top:50%;
                    transform: translateY(-50%);
                    color:@col9;
                    background:#fff;
                }
            }
            .goods-box{
                .items-center>span{
                    display: inline-block;
                    width:80px;
                }
            }
            .meet-box{
                .items-center>span{
                    display: inline-block;
                    width:165px;
                }
                .cntent{
                    .items-center>span{
                        display: inline-block;
                        width:72px;
                    }
                }
                .footer{
                    .items-center>span{
                        display: inline-block;
                        width:80px;
                    }
                }
            }
        }
        .receive-border{
            border:@border;
            border-top:transparent;
            padding:20px;
            // padding-top:10px;
        }

        // 应付账单以及承运信息
        .cntent {
            border-top:@border;
            border-bottom: @border;
            margin-top:20px;
            padding-bottom:20px;
            .flex-wrap{
                .items-center{
                    padding-top:20px;
                    padding-right:20px;
                }
            }
            .money{
                padding-top:40px;
                color:@col9;
                p{
                    color:@col3;
                }
                .backorange{
                    color:@backorange;
                }
                strong{
                    font-size: 24/@rem;
                }
            }
        }
        .footer{
            h3{
                font-size: 18/@rem;
                font-weight: 400;
                padding:20px 0;
            }
            .between{
                margin-bottom: 10px;
                span{
                    display: inline-block;
                    width:80px;
                }
                .items-center+.items-center{
                    margin-left:20px;
                }
            }
        }
        .meet>.receive-border+.receive-border{
            margin-top:20px;
            border-top:@border;
        }
        .meet .top,
        .meet .cntent{
            .items-center>p{
                margin-left:10px;
            }
        }

        // 应收账单
        .receivable-list>.items-center{
            padding-right: 20px;
        }
        .receivable-list p{
            margin-left:10px;
        }
        .receivable{
            .cntent>.items-center{
                padding-top:10px;
            }
            .cntent{
                padding-top:0;
                border-top:0;
            }
            .footer{
                .is-footer{
                    display: flex;
                    flex-wrap: wrap;
                }
                .is-footer>.items-center{
                    margin-bottom: 20px;
                    span{
                        display: inline-block;
                        width:80px;
                    }
                }
            }
        }

        // 其他备注及附件.
        .autofu{
            padding-top:20px;
        }
        .beizhu{
            margin:10px 0 20px;
        }
        .btn{
            .status{
                margin:40px 0 60px;
                span{
                    display: inline-block;
                    padding-right: 20px;
                }
            }
        }
        .upload-demo{
            width:600px; 
        }
    }
</style>