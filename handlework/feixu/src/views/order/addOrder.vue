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
                                <!-- <p><el-input v-model="form.customerName"></el-input></p> -->
                                <div class="flex1" style="position:relative">
                                <el-popover
                                    width="400"
                                    v-model="isbase"
                                    ref="popover"
                                    :popper-class="baseList.length==0 ? 'base-list' : 'prop-class xyk-scroll '"
                                    trigger="focus">
                                    <!-- <el-input clearable slot="reference" v-model="form.customerName" @keyup.enter.native="getBase(form.customerName)"></el-input> -->
                                    <!-- <el-input clearable slot="reference" v-model="form.customerName" @input="getBase(form.customerName)"></el-input> -->
                                    <div>
                                        <ul>
                                            <li v-for="(items,index) in baseList" :key="index" @click="baseClick(items)" style="padding:5px;border-bottom:1px dashed #e5e5e5">
                                                <el-link :underline="false"> {{items.username +' '+items.project + ' ' + items.contact +' '+ items.phone}}</el-link>
                                            </li>
                                            <!-- <li v-if="baseList.length==0">暂无数据</li> -->
                                        </ul>
                                    </div>
                                </el-popover>
                                <el-input clearable v-popover:popover v-model="form.customerName" @input="getBase(form.customerName)"></el-input>
                                </div>
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
                                <p><el-input v-model="form.phone"></el-input></p>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20" class="is-row">
                        <el-col :span="6">
                            <div class="between">
                                <span>业务单号：</span>
                                <p><el-input v-model="form.service"></el-input></p>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="between">
                                <span>DN单号：</span>
                                <p><el-input v-model="form.dm"></el-input></p>
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
                                    value-format="yyyy-MM-dd HH:mm:ss"
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
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    placeholder="选择日期时间">
                                    </el-date-picker>
                                </p>
                            </div>
                        </el-col>
                    </el-row>
                </li>
                <!-- 收发方 -->
                <!-- <li>
                    <div class="receive between" v-for="(item,index) in form.receiveList" :key="index" >
                        <el-row :gutter="20" class="is-row">
                            <el-col :span="12">
                                <div class="receive-box">
                                    <p class="backblue">发货方</p>
                                    <div class="receive-border">
                                        <el-row :gutter="20" >
                                            <el-col :span="12" class="items-center">
                                                <span style="width:80px;">发货人：</span>
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
                </li> -->
                <!-- 发放 -->
                <li class="goods-list">
                    <div class="list-title">
                        <p>发货方</p>
                    </div>
                    <div class="receive-border goods-box" v-for="(item,index) in form.deliver" :key="index">
                        <div  class="is-row">
                            <el-row :gutter="24" style="width:100%;">
                                <el-col :span="6" class="items-center">
                                    <span>发货人：</span>
                                    <div class="flex1" style="position:relative">

                                        <el-popover
                                            width="400"
                                            placement="right-start"
                                            :popper-class="consignorList.length==0 ? 'base-list' : 'prop-class xyk-scroll'"
                                            v-model="item.faVisible"
                                            trigger="click">
                                            <el-input clearable slot="reference"  @blur="item.faVisible=false" v-model.trim="item.name" @focus="isFahuoren = index" @input="getConsignor(item.name,index)"></el-input>
                                            <div>
                                                <ul>
                                                    <li v-for="(items,index) in consignorList" :key="index" @click="faHuoName(items)" style="padding:5px;border-bottom:1px dashed #e5e5e5">
                                                        <el-link :underline="false"> {{items.name +' '+ items.address +' '+ items.phone}}</el-link>
                                                    </li>
                                                    <!-- <li v-if="consignorList.length==0">暂无数据</li> -->
                                                </ul>
                                            </div>
                                        </el-popover>

                                        
                                        <!-- <el-select  v-model="item.name" @change="deliverChange" filterable placeholder="请选择">
                                            <el-option
                                            style="width:100%; max-width:350px;"
                                            v-for="items in consignorList"
                                            :key="items.name"
                                            :label="items.name"
                                            :value="items.name">
                                                {{items.name}}
                                                {{items.address}}
                                                {{items.phone}}
                                            </el-option>
                                        </el-select> -->
                                        <!-- <div  v-if="index+1 == isFahuoren" style="position:absolute; top:60px;width:300px; background:#fff;padding:10px 20px;border-radius:3px;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)">
                                            <ul>
                                                <li v-for="(items,index) in consignorList" :key="index" @click="faHuoName(items)" style="height:34px;line-height:34px;overflow:hidden;border-bottom:1px solid #f5f5f5">
                                                    <el-link> {{items.name +' '+ items.address +' '+ items.phone}}</el-link>
                                                </li>
                                                <li v-if="consignorList.length==0">暂无数据</li>
                                            </ul>
                                        </div> -->
                                        
                                    </div>    
                                </el-col>
                                <el-col :span="6" class="items-center">
                                    <span>联系电话：</span>
                                    <p class="flex1">
                                        <el-input v-model="item.phone"></el-input>
                                    </p>
                                </el-col>
                                <el-col :span="6" class="items-center">
                                    <span style="width:auto">发货地址：</span>
                                    <p  class="flex1">
                                        <el-input v-model="item.deliver"></el-input>
                                    </p>
                                </el-col>
                                <el-col :span="6" class="items-center" style="padding-right:0;">
                                    <span style="width:auto">备注：</span>
                                    <p class="flex1">
                                        <el-input v-model="item.mark"></el-input>
                                    </p>
                                </el-col>
                                <el-col :span="24" v-if="form.deliver.length>1" style="padding-right:0">
                                    <el-button-group style="float: right;width:260px;" class="between">
                                        <el-button @click="preFa(index)" icon="el-icon-arrow-up">上移</el-button>
                                        <el-button @click="nextFa(index)" icon="el-icon-arrow-down">下移</el-button>
                                        <el-button @click="delectFa(index)" icon="el-icon-delete" style="">删除</el-button>
                                    </el-button-group>
                                </el-col>   
                                </el-row>
                            </div>
                        </div>
                        <div class="add-list" v-if="!editDetail">
                            <i class="el-icon-plus" @click="deliversAdd">增加发货方</i>
                    </div>
                </li>
                <!-- 收方 -->
                <li class="goods-list">
                    <div class="list-title">
                        <p>收货方</p>
                    </div>
                    <div class="receive-border goods-box" v-for="(item,index) in form.receive" :key="index">
                        <div  class="is-row">
                            <el-row :gutter="24" style="width:100%;">
                                <el-col :span="6" class="items-center">
                                    <span>收货人：</span>
                                    <div class="flex1">
                                        <!-- <el-select v-model="item.name" filterable placeholder="请选择">
                                            <el-option
                                            style="width：100%"
                                            v-for="item in consignorList"
                                            :key="item.name"
                                            :label="item.name"
                                            :value="item.name">
                                            </el-option>
                                        </el-select> -->
                                        <el-popover
                                            width="400"
                                            placement="right-start"
                                            :popper-class="consignorList.length==0 ? 'base-list' : 'prop-class xyk-scroll' "
                                            v-model="item.faVisible"
                                            trigger="click">
                                            <el-input clearable slot="reference" v-model.trim="item.name" @blur="item.faVisible=false" @focus="isSohuoren = index" @input="getConsignor(item.name,index)"></el-input>
                                            <div>
                                                <ul>
                                                    <li v-for="(items,index) in consignorList" :key="index" @click="shouHuoName(items)" style="padding:5px;border-bottom:1px dashed #e5e5e5">
                                                        <el-link :underline="false"> {{items.name +' '+ items.address +' '+ items.phone}}</el-link>
                                                    </li>
                                                    <!-- <li v-if="consignorList.length==0">暂无数据</li> -->
                                                </ul>
                                            </div>
                                        </el-popover>
                                    </div>
                                </el-col>
                                <el-col :span="6" class="items-center">
                                    <span>联系电话：</span>
                                    <p class="flex1">
                                        <el-input v-model="item.phone"></el-input>
                                    </p>
                                </el-col>
                                <el-col :span="6" class="items-center">
                                    <span style="width:auto">收货地址：</span>
                                    <p  class="flex1">
                                        <el-input v-model="item.receive"></el-input>
                                    </p>
                                </el-col>
                                <el-col :span="6" class="items-center" style="padding-right:0;">
                                    <span style="width:auto">海关报关：</span>
                                    <p class="flex1">
                                        <el-input v-model="item.customs"></el-input>
                                    </p>
                                </el-col>
                                <el-col :span="12" class="items-center" style="margin-top:20px;">
                                    <span style="width:auto">备注：</span>
                                    <p class="flex1">
                                        <el-input v-model="item.mark" ></el-input>
                                    </p>
                                </el-col>   
                                <el-col :span="12" v-if="form.receive.length>1" style="padding-right:0">
                                    <el-button-group style="float: right;width:260px;" class="between">
                                        <el-button @click="preSo(index)" icon="el-icon-arrow-up">上移</el-button>
                                        <el-button @click="nextSo(index)" icon="el-icon-arrow-down">下移</el-button>
                                        <el-button @click="delectSo(index)" icon="el-icon-delete" style="">删除</el-button>
                                    </el-button-group>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                    <div class="add-list" v-if="!editDetail">
                        <i class="el-icon-plus" @click="receiveAdd">增加收货方</i>
                    </div>
                </li>
                <!-- 货物信息 -->
                <li class="goods-list">
                    <div class="list-title">
                        <p>订单车辆货物信息</p>
                    </div>
                    <div class="receive-border goods-box" v-for="(item,index) in form.goodsList" :key="index">
                        <div class="between">
                            <el-row :gutter="20" >
                                <el-col :span="5" class="items-center">
                                    <span>货物类型：</span>
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
                                <el-col :span="6" class="items-center">
                                    <span>货物名称：</span>
                                    <p class="flex1">
                                        <el-input v-model="item.name"></el-input>
                                    </p>
                                </el-col>
                                <el-col :span="5" class="items-center">
                                    <span style="width:auto">数量：</span>
                                    <p  class="flex1">
                                        <el-input v-model="item.num"></el-input>
                                        <!-- <span>件</span> -->
                                    </p>
                                </el-col>
                                <el-col :span="4" class="items-center">
                                    <span style="width:auto">重量：</span>
                                    <p class="flex1">
                                        <el-input v-model="item.weight"  @blur="isNumber(item.weight)"></el-input>
                                        <span>吨</span>
                                    </p>
                                </el-col>
                                <el-col :span="4" class="items-center">
                                    <span style="width:auto">体积：</span>
                                    <p  class="flex1">
                                        <el-input v-model="item.volume"  @blur="isNumber(item.volume)"></el-input>
                                        <span>方</span>
                                    </p>
                                </el-col>
                                <el-col :span="5" class="items-center ptop20">
                                    <span>货物价值：</span>
                                    <p class="flex1">
                                        <el-input v-model="item.worth"  @blur="isNumber(item.worth)"></el-input>
                                        <span>元</span>
                                    </p>
                                </el-col>
                                <el-col :span="6" class="items-center ptop20">
                                    <span>用车类型：</span>
                                    <p class="flex1">
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
                                <el-col :span="6" class="items-center ptop20">
                                    <span>车辆类型：</span>
                                    <p class="flex1">
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
                                <el-col :span="7" class="items-center ptop20">
                                    <span>用车大小：</span>
                                    <p class="flex1">
                                        <el-select v-model="item.size" placeholder="请选择">
                                            <el-option
                                            v-for="item in sizeList"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </p>
                                </el-col>
                                <el-col :span="11" class="items-center ptop20">
                                    <span>备注：</span>
                                    <p class="flex1">
                                        <el-input v-model="item.remark"></el-input>
                                    </p>
                                </el-col>
                                <el-col :span="13" class=" ptop20" v-if="form.goodsList.length>1" style="padding-right:0">
                                    <el-button-group style="float: right;margin-right:16px;width:260px;" class="between">
                                        <el-button type="" @click="preGo(index)" icon="el-icon-arrow-up">上移</el-button>
                                        <el-button type="" @click="nextGo(index)" icon="el-icon-arrow-down">下移</el-button>
                                        <el-button type="" @click="delectGo(index)" icon="el-icon-delete" style="">删除</el-button>
                                    </el-button-group>
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
                            <el-row :gutter="20" v-if="form.meetList.length>1">
                                <el-col :span="6" class="items-center pbom20">
                                    编号： {{form.meetList.length + '-' + (parseInt(index) + 1)}}
                                </el-col>
                            </el-row>
                            <el-row :gutter="20" >
                                <el-col :span="6" class="items-center">
                                    <span>承运类型：</span>
                                    <p class="flex1">
                                        <el-select @change="changCrearType" v-model="item.type" :disabled="index>0 && (item.type!=null || item.type!=undefined)" placeholder="请选择">
                                            <el-option
                                            v-for="(item,index) in discomList"
                                            :key="index"
                                            :label="item"
                                            :value="item">
                                            </el-option>
                                        </el-select>
                                    </p>
                                </el-col> 
                                <el-col :span="6" class="items-center">
                                    <span>提货时间：</span>
                                    <p class="flex1">
                                        <el-date-picker
                                            v-model="item.deliveryTime"
                                            style="width:100%;"
                                            value-format="yyyy-MM-dd"
                                            type="date"
                                            placeholder="选择日期">
                                        </el-date-picker>
                                    </p>
                                </el-col>
                                <el-col :span="6" class="items-center">
                                    <span>提货地址：</span>
                                    <p class="flex1">
                                        <el-input v-model="item.delivery"></el-input>
                                    </p>
                                </el-col>
                                
                                <el-col :span="6" class="items-center">
                                    <span>收货时间：</span>
                                    <p class="flex1">
                                        <el-date-picker
                                            v-model="item.carryTime"
                                            value-format="yyyy-MM-dd"
                                            style="width:100%;"
                                            type="date"
                                            placeholder="选择日期">
                                        </el-date-picker>
                                    </p>
                                </el-col>
                            </el-row>
                            <el-row :gutter="20" class="ptop20">
                                
                                <el-col :span="6" class="items-center">
                                    <span>收货地址：</span>
                                    <p class="flex1">
                                        <el-input v-model="item.carry"></el-input>
                                    </p>
                                </el-col>
                                <el-col :span="6" class="items-center">
                                    <span>承运商：</span>
                                    <div class="flex1">
                                        <!-- <el-input v-model="item.company"></el-input> -->
                                        
                                        <el-popover
                                            placement="right"
                                            width="400"
                                            :popper-class="allUserList ? 'base-list' :'prop-class xyk-scroll'"
                                            v-model="item.faVisible"
                                            trigger="click">
                                            <el-input clearable slot="reference" @blur="item.faVisible=false" v-model.trim="item.company" @click="searchUser(item.company,index)" @focus="isFahuoren = index" @input="searchUser(item.company,index)"></el-input>
                                            <div>
                                                <ul>
                                                    <li v-for="(items,indexs) in allUserList" :key="indexs" @click="isCheng(items,index)" style="padding:5px;border-bottom:1px dashed #e5e5e5">
                                                        <el-link :underline="false"> {{items.username +' '+ items.phone +' '+ items.plate}}</el-link>
                                                    </li>
                                                    <!-- <li v-if="allUserList.length==0">暂无数据</li> -->
                                                </ul>
                                            </div>
                                        </el-popover>
                                    </div>
                                </el-col>
                                <el-col :span="6" class="items-center">
                                    <span>司机名称：</span>
                                    <p class="flex1">
                                        <el-input v-model="item.username"></el-input>
                                    </p>
                                </el-col>
                                <el-col :span="6" class="items-center">
                                    <span>司机电话：</span>
                                    <p class="flex1">
                                        <el-input v-model="item.phone" @blur="phoneReg(item.phone)" maxlength="11"></el-input>
                                    </p>
                                </el-col>
                            </el-row>
                            <el-row :gutter="20" class="ptop20">
                                
                                
                                <!-- <el-col :span="6" class="items-center">
                                    <span>装卸方式：</span>
                                    <p class="flex1">
                                        <el-select v-model="item.dock" placeholder="请选择">
                                            <el-option
                                            v-for="item in dock"
                                            :key="item.name"
                                            :label="item.name"
                                            :value="item.name">
                                            </el-option>
                                        </el-select>
                                    </p>
                                </el-col> -->
                                <el-col :span="6" class="items-center">
                                    <span>用车类型：</span>
                                    <p class="flex1">
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
                                <el-col :span="6" class="items-center">
                                    <span>车辆类型：</span>
                                    <p class="flex1">
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
                                <el-col :span="6" class="items-center">
                                    <span>用车大小：</span>
                                    <p class="flex1">
                                        <el-select v-model="item.size" placeholder="请选择">
                                            <el-option
                                            v-for="item in sizeList"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </p>
                                </el-col>
                                <el-col :span="6" class="items-center">
                                    <span>车牌号码：</span>
                                    <p class="flex1">
                                        <el-input v-model="item.plate" maxlength="8" @blur="plateReg(item.plate)"></el-input>
                                    </p>
                                </el-col>
                                <!-- <el-col :span="6" class="items-center">
                                    <span>提货服务：</span>
                                    <p class="flex1">
                                        <el-select v-model="item.service" placeholder="请选择">
                                            <el-option
                                            v-for="item in needService"
                                            :key="item"
                                            :label="item"
                                            :value="item">
                                            </el-option>
                                        </el-select>
                                    </p>
                                </el-col> -->
                            </el-row>
                        </div>
                        <div class="cntent ptop20">
                            <el-row :gutter="20" >
                                <el-col :span="6" class="items-center">
                                    <span><i class="red">*</i> 承运费：</span>
                                    <p class="flex1">
                                        <el-input v-model="item.cost" @blur="isNumber(item.cost)"></el-input>
                                        <span>元</span>
                                    </p>
                                </el-col>
                                <el-col :span="6" class="items-center">
                                    <span><i class="red">*</i> 装卸费：</span>
                                    <p class="flex1">
                                        <el-input v-model="item.dockCost" @blur="isNumber(item.dockCost)"></el-input>
                                        <span>元</span>
                                    </p>
                                </el-col>
                                <el-col :span="6" class="items-center">
                                    <span>保险费：</span>
                                    <p class="flex1">
                                        <el-input v-model="item.insurance" @blur="isNumber(item.insurance)"></el-input>
                                        <span>元</span>
                                    </p>
                                </el-col>
                                <el-col :span="6" class="items-center">
                                    <span><i class="red">*</i> 付款类型：</span>
                                    <p class="flex1">
                                        <el-select v-model="item.payType" style="width:100%;" placeholder="请选择">
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
                            <el-row :gutter="20" class="ptop20">
                                <el-col :span="8" class="items-center">
                                    <span>油卡：</span>
                                    <p class="flex1">
                                        <el-input placeholder="卡号" v-model="item.cardNumber" class="input-with-select">
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
                                <el-col :span="6" class="items-center">
                                    <span><i class="red">*</i> 付款方式：</span>
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
                                <!-- <el-col :span="6" class="items-center">
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
                                </el-col> -->
                            </el-row>
                        </div>
                        <div class="footer pbom10">
                            <h3>支付信息</h3>
                            <el-row :gutter="20">
                                <el-col :span="5" class="items-center">
                                    <span style="width:auto; margin-right:5px;">开户人：</span>
                                    <p class="flex1">
                                        <el-input v-model="item.accountHolder"></el-input>
                                    </p>
                                </el-col>
                                <el-col :span="5" class="items-center">
                                    <span>所属银行：</span>
                                    <p class="flex1">
                                        <el-input v-model="item.openingBank"></el-input>
                                    </p>
                                </el-col>
                                <el-col :span="6" class="items-center">
                                    <span>银行账号：</span>
                                    <p class="flex1">
                                        <el-input v-model="item.bankAccount"></el-input>
                                    </p>
                                </el-col>
                            </el-row>
                            <el-row :gutter="20" :class=" item.payLog.length>1 ? 'yinfu mtop20 ' :'yinfus mtop20' " v-for="(items,indexs) in item.payLog" :key="indexs">
                                <el-col :span="5" class="items-center">
                                    <span v-if="item.payLog.length>1 " style="margin-right:0;">{{indexs+1}} 、</span>
                                    <span style="width:auto; margin-right:5px;">金额：</span>
                                    <p class="flex1">
                                        <el-input v-model="items.amount" @blur="isNumber(items.amount)" :disabled="items.status>0"></el-input>
                                        <span style="width:10px">元</span>
                                    </p>
                                </el-col>
                                <el-col :span="5" class="items-center">
                                    <span style="width:auto; margin-right:5px;">油卡：</span>
                                    <p class="flex1">
                                        <el-input v-model="items.card" @blur="isNumber(items.card)" :disabled="items.status>0"></el-input>
                                        <span style="width:10px">元</span>
                                    </p>
                                </el-col>
                                <el-col :span="4" class="items-center" style="height:40px;justify-content: flex-end;">
                                    <el-link  style="font-size:24px;" class="el-icon-circle-close error-icon" :underline="false" @click="deletePayLog(index,indexs)" :disabled="items.status>0"></el-link>
                                </el-col>
                            </el-row>
                            <div class="money mtop20">
                                <div class="items-center">
                                    <el-link :underline="false" @click="addYinFu(index)">+增加应付信息</el-link>
                                </div>
                                <div class="flex mtop20 items-center">
                                    <p class="items-center" style="margin-left:0;">总费用：
                                        <strong class="colo" style="font-size:24px;">
                                            <!-- {{(parseInt(item.cost) || 0.00 ) + (parseInt(item.dockCost) || 0.00 ) + (parseInt(item.insurance) || 0.00)}} -->
                                            {{(parseFloat(item.cost) || 0)+(parseFloat(item.dockCost) || 0)+(parseFloat(item.insurance) || 0)}}
                                        </strong> 元；
                                    </p> 
                                    
                                    <!-- {{item.payLog[0].amount || 0}} -->
                                    已付<span class="colb" style="width:auto;"> {{addAmountFun(item.payLog) || 0}}</span>
                                
                                    <!-- {{item.cardPaid || 0}} -->
                                    元，油卡<span class="colb" style="width:auto;"> {{addCountFun(item.payLog) || 0}}</span>
                                
                                    <!-- {{parseInt(item.cost)+parseInt(item.dockCost)+parseInt(item.insurance)-parseInt(item.amountPaid)-parseInt(item.cardPaid) || 0.00}} -->
                                    元；还需要支付<span class="colo"  ref='allMoney' style="width:auto;">
                                        {{((parseFloat(item.cost) || 0) + (parseFloat(item.dockCost) || 0) + (parseFloat(item.insurance) || 0)
                                        - (addAmountFun(item.payLog) || 0) - (addCountFun(item.payLog) || 0)).toFixed(2)}}
                                    </span>元
                                </div>
                            </div>
                            <el-row :gutter="20">
                                <el-col :span="12" class="ptop20">
                                    <el-upload
                                    class="upload-demo"
                                    :header="{'method':'post'}"
                                    :action="$http.fileUrl"
                                    :beforeUpload="beforeAvatarUploadPdf"
                                    :on-preview="handlePreview"
                                    :on-success="handleSucess"
                                    :on-remove="handleRemove"
                                    :file-list="item.fileList"
                                    >
                                    <el-button @click="sijiFile(index)">上传司机证件</el-button>
                                    </el-upload>
                                </el-col>
                                <el-col :span="12" class="ptop20" v-if="form.meetList.length>1" style="padding-right:0">
                                    <el-button-group style="float: right;width:260px; margin-right: 16px;" class="between">
                                        <el-button @click="preMi(index)" icon="el-icon-arrow-up">上移</el-button>
                                        <el-button @click="nextMi(index)" icon="el-icon-arrow-down">下移</el-button>
                                        <el-button @click="delectMi(index)" icon="el-icon-delete" style="">删除</el-button>
                                    </el-button-group>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                    <div class="add-list between ">
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
                                    <span>收款方式：</span>
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
                                已收{{form.amountReceived || 0}} 元 , 待收{{(parseFloat(form.cost) || 0) - (parseFloat(form.amountReceived)||0)}} 元。
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
                                            <el-input v-model="form.bankAccount"></el-input>
                                        </p>
                                    </el-col>
                                    <el-col :span="6" class="items-center">
                                        <span>所属银行：</span>
                                        <p class="flex1">
                                            <el-input v-model="form.openingBank"></el-input>
                                        </p>
                                    </el-col>
                                    <!-- <el-col :span="6" class="items-center ">
                                        <span>转账时间：</span>
                                        <p class="flex1">
                                            <el-date-picker
                                            style="width:100%;"
                                            v-model="form.pickUp"
                                            type="datetime"
                                            value-format="yyyy-MM-dd HH:mm:ss"
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
                                                :key="item.id"
                                                :label="item.name"
                                                :value="item.id">
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
                                    </el-col> -->
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
                            <span>订单备注：</span>
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
                            :on-preview="handlePreviews"
                            ref="upload"
                            :beforeUpload="beforeAvatarUploadPdfs"  
                            :on-success="handleAvatarSuccess"
                            :before-remove="removeUpload"
                            :file-list="form.file">
                            <!-- <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                            <div class="items-center">
                                <span>附件：</span>
                                <p style="margin-left:40px;text-align:left">
                                    <el-button @click="fileType='上传回单'">上传回单</el-button>
                                    <el-button @click="fileType='支付凭证'">支付凭证</el-button>
                                    <el-button @click="fileType='其他'">其他</el-button>
                                </p>
                            </div>  
                            <p style="margin-left: 85px;padding-top: 15px" slot="tip" >
                                * 附件格式支持：word、pdf、excel、jpg、png等格式文件
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
                    <el-button @click="save(30)" v-else>保存订单</el-button>
                    <el-button @click="resets">重置表单</el-button>
                </div>
            </div>
        </el-form>
        <!-- 附件 -->
        <el-dialog
            :visible.sync="lookFileImg"
            width="640px"
            center
            custom-class="status-dialog"
            >
            <div slot="title">
                <b class="font24">{{fileText}}</b>
                <p><span>此附件只能查看图片，如不是图片，请查看原文件</span></p>
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
</template>
<script>
export default {
    data() {
        return {
            addYouKa:false,//是否是添加油卡
            loading:false,
            lookFileImg:false,//图片弹框
            isbase:false,
            fileList:'',//附件
            fileText:'',//附件标题
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
                sijiFile:'',//用来决定点击的是哪个司机信息


                // receiveList:[//发货
                //     {
                //         consignor:'',signorphone:'',deliver:'',signoraddress:'',
                //         signorremark:'',consignee:'',signeephone:'',receive:'',
                //         signeeaddress:'',customs:'',signeeremark:''
                //     }
                // ],
                deliver:[{faVisible:false,name: "",phone: "",deliver: "",mark: ""}],// 发货人
                receive:[{faVisible:false,name: "",phone: "",receive: "",customs: "",mark: ""}],// 收货人
                goodsList:[// 货物信息
                    {type:'',name:'',num:'',weight:'',volume:'',worth:'',size:'',cart:'',cartType:'',remark:''}
                ],
                meetList:[//应付账单以及承运信息
                    {
                        type:"",company:"",username:"",phone:"",cart:"",
                        plate:"",dock:"",cartType:"",service:"",carry:"",
                        delivery:"",cost:'',dockCost:'',insurance:'0',
                        card:"",cardNumber:"",payMethod:'',payType:'',
                        accountHolder:"",bankAccount:"",size:'',
                        openingBank:"",payLog:[{amount:0,card:0}],
                        carryTime:'',deliveryTime:'',
                        // amountPaid:"",cardPaid:"",
                        file:[],fileList:[],
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
                // {id:6,name:'已完成'},
                // {id:7,name:'异常'},
                // {id:8,name:'取消'},
            ],//按钮状态

            editDetail:false,
            isFahuoren:null,
            isSohuoren:null,
            // faVisible:false,

            consignorList:[],//收货人
            fileType:'上传回单',
            
            baseList:[],
            allUserList:[],
            sizeList:[],
        }
    },
    created() {
        var day2 = new Date();
        this.newTime = day2.getFullYear()+"-" + (day2.getMonth()+1) + "-" + day2.getDate();
        this.getSelectData()
        this.getlocalStorageData()
        this.getOrderDetail()
        this.getUserList()
        this.getConsignor()
        this.searchUser()
        this.getBase()
        console.log(this.$route.query.id)
    },
    methods: {
        getUserList(){
            this.$http.get(this.$api.dataUserlist,{},res=>{
                this.userList = res.data
            })
        },
        addAmountFun(val){
            var amount = 0;
            for(var i of val){
                // console.log(i)
                amount += i.amount ? parseFloat(i.amount) : 0
            }
            return amount
            // return val
        },
        addCountFun(val){
            var card = 0;
            for(var i of val){
                // console.log(i)
                card += i.card ? parseFloat(i.card) : 0
            }
            return card
        },
        deliverChange(){
            // thsi.faVisible = true
        },
        getConsignor(val,index){
            console.log(val,index)
            console.log('获取发货人')
            var data = '';
            if(!val && this.form.deliver[index]){
               this.form.deliver[index].faVisible = false
            }
            if(val){data = {name:val}}else{data = {}}
            this.$http.post(this.$api.searchAdres,data,res=>{
                console.log(res.data.data)
                this.consignorList = res.data.data
                if(res.data.data.length==0){
                    this.form.deliver[index].faVisible = false
                }
                if(index || index==0){
                    this.form.deliver[index].faVisible = true
                }
            })
        },
        getDeliverer(){
            console.log('获取收货人')
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
                this.sizeList = data.size
            })
        },
        getlocalStorageData(){
            const orderFormData = localStorage.getItem("orderForm");
            console.log(orderFormData)
        },
        getBase(val){
            this.$http.post(this.$api.orderSearchUser,{
                username:val ? val : ''
            },res=>{
                console.log(res)
                this.baseList = res.data
                if(res.data.length==0){
                    this.isbase = false
                }
            })
        },
        baseClick(val){
            console.log(val)
            this.form.customerName = val.username
            this.form.projectName = val.project
            this.form.contact = val.contact
            this.form.phone = val.phone
            this.isbase = false
        },
        
        // 搜索客户
        searchUser(val,index){
            console.log(val)
            // var search = this.search
            this.isFahuoren = index
            this.$http.post(this.$api.searchcarrier,{
                username:val || '',
            },res=>{
                console.log(res)
                this.allUserList = res.data
                if(res.data.length==0){
                    this.form.meetList[index].faVisible = false
                }
                if(index || index==0){
                    this.form.meetList[index].faVisible = false
                }
            })
            // 等待接口
        },
        isSiji(val){
            console.log(val)
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
                        this.form.deliver = res.data.deliver;//发货方
                        this.form.receive = res.data.receive;//收货方
                        this.form.goodsList =  res.data.goods;
                        var file = JSON.parse(JSON.stringify(res.data.file));
                        console.log(file)
                        if(!file){
                            this.form.file = []
                        }else{
                            console.log(file)
                            var fileList = [], files=[];
                            for(var j of file){
                                console.log(j)
                                // j = Object.assign(j,j.fileId)
                                // // fileArr.push(j)
                                fileList.push({fileId:j.fileId,type:j.type})
                                files.push(j.filelist)
                            }
                            console.log(files)
                            console.log(fileList)
                            this.form.file = files
                            this.form.fileList = fileList
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
                        // var info = res.data.info;
                        // for(var i in info){
                        //     var deliver = info[i].deliverId.split(',')
                        //     var receive = info[i].receiveId.split(',')
                        //     if(deliver instanceof Array){
                        //         for(var j in deliver){
                        //             deliver[j] = parseInt(deliver[j])
                        //         }
                        //     }
                        //     if(receive instanceof Array){
                        //         for(var j in receive){
                        //             receive[j] = parseInt(receive[j])
                        //         }
                        //     }
                        //     info[i].deliver = deliver
                        //     info[i].receive = receive
                        // }
                        // this.form.receiveList = info;
                        // this.form.goodsList = res.data.goods
                        
                        var carrier = res.data.carrier
                        for(var i in carrier){
                            carrier[i] = Object.assign({fileList:carrier[i].file},carrier[i])
                            // carrier[i] = [...{fileList:carrier[i].file},carrier[i]]
                        }
                        for(var i of carrier){
                            i.card = i.cardId ? parseInt(i.cardId) : '';
                            // i.paid = i.paidId ? parseInt(i.paidId) : '';
                            i.payMethod = i.payMethodId ? parseInt(i.payMethodId) : '';
                            i.payType = i.payTypeId ? parseInt(i.payTypeId) : '';
                            var file = i.file;
                            if(!file){
                                console.log('没有附件')
                                i.fileList = []
                                i.file = []
                            }
                            if(file instanceof Array){
                                i.fileList = file
                                var carFile = []
                                for(var j of file){
                                    carFile.push(j.id)
                                }
                                i.file = carFile
                            }
                            console.log(i)
                            if(i.payLog.length==0 || !i.payLog){
                                // i.payLog = payLog.push({id:0,amount:0,card:0})
                                i.payLog = [{id:0,amount:0,card:0}]
                            }else{
                                var payLog = i.payLog
                                for(var j in payLog){
                                    console.log(payLog[j])
                                    payLog[j] = {id:payLog[j].id, amount:payLog[j].amount, card: payLog[j].card,status: payLog[j].status}
                                }
                                console.log(payLog)
                            }
                        }
                        console.log(carrier)
                        console.log(this.form.carriersFile)
                        this.form.meetList = carrier

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
            if(!this.$reg.isPlaTe(val)&& val){
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
        // 增加应付
        addYinFu(val){
            console.log(val)
            console.log(this.form.meetList)
            if(this.$route.query.id){
                return this.form.meetList[val].payLog.push({id:0, amount:0,card:0})
            }
            this.form.meetList[val].payLog.push({amount:0,card:0})
        },
        // 删除应付
        deletePayLog(val,val2){
            this.$confirm('是否继续删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.form.meetList[val].payLog.splice(val2,1)
            }).catch(() => {
                    
            });
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
        // 发放添加
        deliversAdd(){
            this.form.deliver.push({faVisible:false, name: "",phone: "",deliver: "",mark: ""}) 
        },
        // 收货方添加
        receiveAdd(){
            console.log('你好')
            this.form.receive.push({faVisible:false,name: "",phone: "",receive: "",customs: "",mark: ""})
        },
        goodsAdd(){
            console.log('货物信息添加')
            this.form.goodsList.push(
                {type:'',name:'',num:'',weight:'',volume:'',worth:'',size:'',cart:'',cartType:'',remark:''}
            )
        },
        meetAdd(){
            console.log('增加承运信息')
            var data = {
                type:"",company:"",username:"",phone:"",cart:"",
                plate:"",dock:"",cartType:"",service:"",carry:"",
                delivery:"",cost:'',dockCost:'',insurance:'0',
                card:"",cardNumber:"",payMethod:'',payType:'',
                accountHolder:"",bankAccount:"",size:'',
                openingBank:"",payLog:[{amount:0,card:0}],
                carryTime:'',deliveryTime:'',
                // amountPaid:"",cardPaid:"",
                file:[],fileList:[],
            }
            
            for(var i of this.form.meetList) {
                if(i.type){
                    data.type=i.type
                }
            }
            if(this.$route.query.id){
                data = Object.assign({id:0},data)
            }
            this.form.meetList.push( data)
        },
        subSatus(val){
            console.log(val)
            this.form.status = val
        },
        // 司机证件上传前
        beforeAvatarUploadPdf(file){
            console.log('文件上传情况')
            console.log(this.$http.fileUrl)
            // var testmsg=file.name.substring(file.name.lastIndexOf('.')+1)	
            // const extension = testmsg === 'jpg' ||  testmsg === 'JPG' ||  testmsg === 'png' ||  testmsg === 'PNG';
            const isLt2M = file.size / 1024 / 1024 < 5
            console.log(file)
            var meetList = this.form.meetList
            console.log(meetList)
            for(var i in meetList){
                // console.log(i.file)
                // console.log(i.fileList)
                if(meetList[i].fileList){
                    for(var j of meetList[i].fileList){
                        console.log(this.form.sijiFile)
                        console.log(i)
                        if(j.name == file.name && this.form.sijiFile == i){
                            this.$message({
                                message: file.name+'：文件已经存在，请删除后在上传',
                                type: 'error'
                            })
                            return false
                        }   
                    }
                }
            }
            // this.form.meetList.forEach( ( item, i ) => {
            //     console.log( item, i );
            //     console.log(item)
            //     if(item.fileList && i==this.form.sijiFile) {
            //         item.fileList.forEach( (items,j) =>{
            //             console.log(items)
            //             console.log(file.name)
            //             if(file.name == items.name){
            //                 this.$message({
            //                     message: file.name+'：文件已经存在，请删除后在上传',
            //                     type: 'error'
            //                 })
            //                 return false
            //             }
            //         })
            //     }
            // } );

            if(!isLt2M) {
                this.$message({
                    message: '上传文件大小不能超过 5MB!',
                    type: 'error'
                });
                return false;
            }
            return isLt2M
        },
        // 上传成功
        handleSucess(file){
            console.log(file)
            
            // console.log(this.form.meetList[this.form.sijiFile].file)
            this.form.meetList[this.form.sijiFile].file.push(file.data.id)
            // this.form.meetList[this.form.sijiFile].fileList.push(file.data.id)
            if(!this.form.meetList[this.form.sijiFile].fileList){
                // console.log(this.form.meetList[this.form.sijiFile])
                // console.log(Object.assign({fileList:[]},this.form.meetList[this.form.sijiFile]))
                return this.form.meetList[this.form.sijiFile] = Object.assign({fileList:[]},this.form.meetList[this.form.sijiFile])
            }
            this.form.meetList[this.form.sijiFile].fileList.push(file.data)
            console.log(this.form.meetList)
        },
        //点击司机凭证 列表
        handlePreview(file){
            console.log(this.form.meetList)
            console.log(file)
            this.lookFileImg = true;
            this.fileText = '司机凭证'
            this.fileList = file.path
        },
        // 删除司机凭证
        handleRemove(file,fileList){
            console.log(file)
            console.log(fileList)
            console.log(this.form.meetList)
            var meetList = this.form.meetList   
            
            for(var i of meetList){
                for(var j in i.file){
                    // if(file.id == i.file[j] || file.response.data.id == i.file[j]){
                    //     var newFile = i.file.splice(j,1);
                    // }
                    // console.log(file)
                    // console.log(i.file[j])
                    if(file.id == i.file[j]){
                        i.file.splice(j,1);
                        // i.fileList.splice(j,1);
                        i.fileList.splice(j,1);
                        console.log(i.fileList)
                    }
                    if(file.response && file.response.data.id == i.file[j]){
                        i.file.splice(j,1);
                        // i.fileList.splice(j,1);
                    }
                }
            }
            /**/
            console.log(meetList)
            // this.form.meetList = meetList
        },


        
        beforeAvatarUploadPdfs(file){
            console.log('文件上传情况')
            console.log(this.$http.fileUrl)
            // var testmsg=file.name.substring(file.name.lastIndexOf('.')+1)	
            // const extension = testmsg === 'jpg' ||  testmsg === 'JPG' ||  testmsg === 'png' ||  testmsg === 'PNG';
            const isLt2M = file.size / 1024 / 1024 < 5
            // if(!extension ) {
            //     this.$message({
            //         message: '上传文件只能是jpg或者png格式!',
            //         type: 'error'
            //     });
            //     return false;//必须加上return false; 才能阻止
            // }    
            // console.log(file)
            console.log(this.form.file)
            if(this.form.file){
                for(var i of this.form.file){
                    console.log(i.name)
                    console.log(file.name)
                    if(i.name == file.name){
                        this.$message({
                            message: file.name+'：文件已经存在，请删除后在上传',
                            type: 'error'
                        })
                        return false
                    }
                }
            }
            console.log(this.form.file)
            console.log(file)
            console.log('纸张')
            
            // for(var i of this.form.meetList){
            //     // console.log(i.file)
            //     // console.log(i.fileList)
            //     if(i.fileList){
            //         for(var j of i.fileList){
            //             if(j.name == file.name){
            //                 this.$message({
            //                     message: file.name+'：文件已经存在，请删除后在上传',
            //                     type: 'error'
            //                 })
            //                 return false
            //             }
            //         }
            //     }
            // }

            if(!isLt2M) {
                this.$message({
                    message: '上传文件大小不能超过 5MB!',
                    type: 'error'
                });
                return false;
            }
            return isLt2M
        },
        handlePreviews(file){
            console.log(file)
            this.lookFileImg = true
            this.fileList = file.path
            if(file.response){
                this.fileList = file.response.data.path
            }
            console.log(this.form.file)
            console.log(this.form.fileList)
            for(var i of this.form.fileList){
                if(i.fileId == file.id){
                    this.fileText = i.type
                }
                if(file.response && file.response.data.id == i.fileId){
                    this.fileText = i.type
                }
            }
        },
        handleAvatarSuccess(res, file){
            console.log(res)
            this.form.fileList.push({fileId:res.data.id,type:this.fileType})
            
            // var file = [];
            // file.push(res.data)
            // console.log(file)
            // console.log('上传成功')
            // if(!this.form.file){
            //     console.log(file)
            //     this.form.file = file
            // }else{
            //     console.log(this.form.file)
            //     this.form.file.push(res.data)
            // }
            if(!this.form.file){
                var arr = []; //定义数组
                arr.push(res.data); 
                console.log(arr)
                this.form.file = arr
                console.log(this.form.file)
                return false
            }else{
                this.form.file.push(res.data)
                console.log(this.form.file)
            }

            
        },
        removeUpload(file, fileList){
            // console.log(this.form.file)
            // console.log(this.form.fileList)
            // console.log(file)

            for(var i in fileList){
                if(fileList[i].id == file.id && fileList[i].id && file.id){
                    this.form.file.splice(i,1)
                    this.form.fileList.splice(i,1)
                    // console.log(JSON.parse(JSON.stringify(this.form.file)))
                    // console.log(JSON.parse(JSON.stringify(this.form.fileList)))
                    // console.log(fileList[i].id)
                    console.log(file.id)
                }
            }   
            // console.log(JSON.parse(JSON.stringify(fileList))) 




            // for(var [index,elem] of new Map( fileList.map( ( item, i ) => [ i, item ] ) )){
            //     if(elem.id == file.id){
            //         console.log(index)
            //         var newFile = fileList.splice(index,0);
            //         console.log(newFile)
            //     }
            // }
            // console.log(JSON.parse(JSON.stringify(fileList))) 
            
            // console.log(this.form.file)
            // console.log(this.form.fileList)
        },
        // 
        isCheng(val,index){
            console.log(val)
            console.log(index)
            this.form.meetList[index].company = !this.form.meetList[index].company ?　val.username　: this.form.meetList[index].company
            this.form.meetList[index].username = !this.form.meetList[index].username ?　val.username　: this.form.meetList[index].username
            this.form.meetList[index].phone = !this.form.meetList[index].phone ?　val.phone: this.form.meetList[index].phone
            this.form.meetList[index].plate = !this.form.meetList[index].plate ?　val.plate: this.form.meetList[index].plate
            this.form.meetList[index].accountHolder = !this.form.meetList[index].accountHolder ?　val.contact: this.form.meetList[index].accountHolder
            this.form.meetList[index].bankAccount = !this.form.meetList[index].bankAccount ?　val.account: this.form.meetList[index].bankAccount
            this.form.meetList[index].openingBank = !this.form.meetList[index].openingBank ?　val.bank: this.form.meetList[index].openingBank
            this.form.meetList[index].faVisible = false
        },
        // 改变承运类型
        changCrearType(val){
            var meetList = this.form.meetList
            for(var i in meetList){
                meetList[i].type = val
            }
        },
        // 发货上移
        preFa(val){
            console.log(val)
            var newList = this.form.deliver.splice(val,1);
            this.form.deliver.splice(val-1,0,newList[0])
        },
        // 发货下移
        nextFa(val){
            console.log(val)
            var newList = this.form.deliver.splice(val,1);
            this.form.deliver.splice(val+1,0,newList[0])
        },
        // 删除
        delectFa(val){
            this.$confirm('是否删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.form.deliver.splice(val,1);
            }).catch(() => {
            });
        },
        faHuoName(val){
            console.log(val)
            console.log(this.isFahuoren)
            this.form.deliver[this.isFahuoren].name = val.name
            this.form.deliver[this.isFahuoren].deliver = val.address
            this.form.deliver[this.isFahuoren].phone = val.phone
            this.form.deliver[this.isFahuoren].faVisible = false
        },
        shouHuoName(val){
            console.log(val)
            this.form.receive[this.isSohuoren].name = val.name
            this.form.receive[this.isSohuoren].receive = val.address
            this.form.receive[this.isSohuoren].phone = val.phone
            this.form.receive[this.isSohuoren].faVisible = false
        },
        // 收货上移
        preSo(val){
            console.log(val)
            var newList = this.form.receive.splice(val,1);
            this.form.receive.splice(val-1,0,newList[0])
        },
        // 收货上移
        nextSo(val){
            console.log(val)
            var newList = this.form.receive.splice(val,1);
            this.form.receive.splice(val+1,0,newList[0])
        },
        // 删除
        delectSo(val){
            this.$confirm('是否删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.form.receive.splice(val,1);
            }).catch(() => {
            });
        },
        // 货物上移
        preGo(val){
            console.log(val)
            var newList = this.form.goodsList.splice(val,1);
            this.form.goodsList.splice(val-1,0,newList[0])
        },
        // 货物下移
        nextGo(val){
            console.log(val)
            var newList = this.form.goodsList.splice(val,1);
            this.form.goodsList.splice(val+1,0,newList[0])
        },
        // 货物删除
        delectGo(val){
            this.$confirm('是否删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.form.goodsList.splice(val,1);
            }).catch(() => {
            });
        },
        // 承运商上移
        preMi(val){
            console.log(val)
            // console.log(this.form.meetList.splice(val,1))
            var newList = this.form.meetList.splice(val,1);
            this.form.meetList.splice(val-1,0,newList[0])
        },
        // 承运商下移
        nextMi(val){
            console.log(val)
            var newList = this.form.meetList.splice(val,1);
            this.form.meetList.splice(val+1,0,newList[0])
        },
        // 承运商删除
        delectMi(val){
            this.$confirm('是否删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.form.meetList.splice(val,1);
            }).catch(() => {
            });
        },




        // 判断数据不能为空
        noNullData(){
        },
        // 保存
        save(val){
            let form = this.form;
            // return console.log(form)
            // console.log(JSON.parse(JSON.stringify(this.form.file)))
            // console.log(JSON.parse(JSON.stringify(this.form.fileList)))


            var draft = 10;//保存或者存为草稿
            if(val==20){
                draft = 20
            }else{
                if(!form.customerName){
                    return this.$message('客户名称不能为空')
                }else if(!form.projectName){
                    return this.$message('项目名称不能为空')
                }else if(!this.$reg.isPhone(form.phone) && form.phone){
                    return this.$message('手机格式不对')
                }
                // 发货
                var deliver = form.deliver;
                for(var i of deliver){
                    console.log(i)
                    if(!this.$reg.isPhone(i.phone) && i.phone){
                        return this.$message('收货人：联系方式错误')
                    }
                }
                // 收货
                var receive = form.receive
                for(var i of receive){
                    console.log(i)
                    if(!this.$reg.isPhone(i.phone) && i.phone){
                        return this.$message('发货人：联系方式错误')
                    }
                }
                var goodsList = form.goodsList;
                for(var i of goodsList){
                    if(!this.$reg.mtf(i.weight) && i.weight){
                        return this.$message('货物信息: 重量格式错误')
                    }
                    if(!this.$reg.mtf(i.volume) && i.volume){
                        return this.$message('货物信息: 体积格式错误')
                    }
                    if(!this.$reg.mtf(i.worth) && i.worth){
                        return this.$message('货物信息: 货物价值格式错误')
                    }   
                }

                var meetList = form.meetList;
                for(var i of meetList){
                    if(!this.$reg.isPhone(i.phone) && i.phone){
                        return this.$message('应付账单以及承运信息: 司机电话格式错误')
                    }
                    if(!this.$reg.isPlaTe(i.plate) && i.plate){
                        return this.$message('应付账单以及承运信息: 车牌号码格式错误')
                    }
                    if(!i.cost){
                        return this.$message('应付账单以及承运信息: 承运费不能为空')
                    }else if(!this.$reg.mtf(i.cost)){
                        return this.$message('应付账单以及承运信息: 承运费承运费格式错误')
                    }
                    if(!i.dockCost){
                        return this.$message('应付账单以及承运信息: 装卸费不能为空')
                    }else if(!this.$reg.mtf(i.dockCost)){
                        return this.$message('应付账单以及承运信息: 装卸费格式错误')
                    }
                    if(!this.$reg.mtf(i.insurance) && i.insurance){
                        return this.$message('应付账单以及承运信息: 保险费格式错误')
                    }
                    if(!i.payMethod){
                        return this.$message('应付账单以及承运信息: 付款方式不能为空')
                    }
                    if(!i.payType){
                        return this.$message('应付账单以及承运信息: 付款类型不能为空')
                    }
                    if(!this.$reg.onlyne(i.bankAccount) && i.bankAccount){
                        return this.$message('应付账单以及承运信息: 银行账号格式错误')
                    }
                    if(!this.$reg.mtf(i.amountPaid) && i.amountPaid){
                        return this.$message('应付账单以及承运信息: 已付金额格式错误')
                    }
                    if(!this.$reg.mtf(i.cardPaid) && i.cardPaid){
                        return this.$message('应付账单以及承运信息: 已付金额格式错误')
                    }
                }
            }

            // let newFileList = [];
            // // 附件
            // for(var i of form.fileList){
            //     newFileList.push(i.id)
            // }
            // console.log(newFileList)

            // 发货方
            // let info = form.receiveList;
            // for(var i in info){
            //     console.log(info[i].deliver)
            //     if(info[i].deliver instanceof Array){
            //         info[i].deliver = info[i].deliver.join(',')
            //     }
            //     if(info[i].receive instanceof Array){
            //         info[i].receive = info[i].receive.join(',')
            //     }
            // }


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
                var payLog = carrier[i].payLog;
                for(var j in payLog){
                    if(payLog[j].amount == '' || payLog[j].amount == undefined){
                        payLog[j].amount = 0
                    }
                    if(payLog[j].card == '' || payLog[j].card == undefined){
                        payLog[j].card = 0
                    }
                }
            }
            var allMoney = this.$refs.allMoney[0].innerHTML;
            if(allMoney<0){
                return this.$message('待支付费用不能小于0')
            }
            // return console.log(carrier)
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
                // file:form.fileList.join(','),//文件上传
                file:form.fileList.length != 0 ?  JSON.stringify(form.fileList) : '',
                status:form.status,//按钮状态
                draft:draft,//保存  20 草稿
                // info:JSON.stringify(info),
                deliver:JSON.stringify(form.deliver),
                receive:JSON.stringify(form.receive),
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
            this.fileList = '',//附件
            
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
                sijiFile:'',//用来决定点击的是哪个司机信息


                // receiveList:[//发货
                //     {
                //         consignor:'',signorphone:'',deliver:'',signoraddress:'',
                //         signorremark:'',consignee:'',signeephone:'',receive:'',
                //         signeeaddress:'',customs:'',signeeremark:''
                //     }
                // ],
                deliver:[{faVisible:false,name: "",phone: "",deliver: "",mark: ""}],// 发货人
                receive:[{faVisible:false,name: "",phone: "",receive: "",customs: "",mark: ""}],// 收货人
                goodsList:[// 货物信息
                    {type:'',name:'',num:'',weight:'',volume:'',worth:'',size:'',cart:'',cartType:'',remark:''}
                ],
                meetList:[//应付账单以及承运信息
                    {
                        type:"",company:"",username:"",phone:"",cart:"",
                        plate:"",dock:"",cartType:"",service:"",carry:"",
                        delivery:"",cost:'',dockCost:'',insurance:'0',
                        card:"",cardNumber:"",payMethod:'',payType:'',
                        accountHolder:"",bankAccount:"",size:'',
                        openingBank:"",payLog:[{amount:0,card:0}],
                        // amountPaid:"",cardPaid:"",
                        file:[],fileList:[],
                    }
                ],
            }
            this.$refs.upload.clearFiles()
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

    .yinfus .error-icon,.yinfu .error-icon{
        display:none;
    }
    .yinfu:hover .error-icon{
        display:block;
    }
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
        .red{
            color:red;
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
                width:auto;
            }
            .between>p{
                flex:1;
                // width:260px;
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
                    // width:80px;
                    margin-right: 10px;
                }
            }
            .meet-box{
                .items-center>span{
                    display: inline-block;
                    // width:110px;
                    margin-right:10px;
                }
                .cntent{
                    .items-center>span{
                        display: inline-block;
                        // width:auto;
                        margin-right:10px;
                    }
                }
                .footer{
                    .items-center>span{
                        display: inline-block;
                        // width:80px;
                        margin-right:10px;
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
                // margin-left:10px;
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
        // 附件弹框
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
    }
</style>