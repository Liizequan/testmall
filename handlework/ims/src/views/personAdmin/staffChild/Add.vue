<template>
    <div class="staff-add">
        <!-- 顶部信息 -->
        <header>
            <div class="between">

                <div class="left user-img" style="position:relative;">
                    <!-- <img :src="this.$baseURL + logoImg.path" alt=""> -->
                    <el-image style="width: 180px; height: 180px" :src="this.$baseURL + logoImg" fit="cover"></el-image>
                    <div>
                        <span> 上传图片 </span>
                        <p><input type="file" ref="files" id="files" @change="ImgChan" name="files"></p>
                    </div>
                </div>
                <div class="right font14-nobold-6">
                    <div class="bitianstyle" style="text-align: right;"><span>*</span>为必填项</div>
                    <h3>用户名：{{base.name}}</h3>
                    <ul class="basic-info">
                        <li><i class="el-icon-postcard"></i>部门：{{depart}}</li>
                        <li><i class="el-icon-suitcase-1"></i>职位：{{positionId}}</li>
                        <li><i class="el-icon-s-operation"></i>工号：{{base.num}}</li>
                        <li><i class="el-icon-time"></i>入职时间：{{contract.sta_time}}</li>
                    </ul>
                </div>
            </div>
            <div style="padding:10px;color:#ccc;font-size: 14px;text-align: left;">支持格式为jpg,png,jpeg</div>
        </header>

        <!-- 基础信息 -->
        <main class="main-one">
            <p class="top-title">基础信息</p>
            <div class="between form-one font14-isbold-3">
                <div class="left">
                    <div class="form-one-input">
                        <p class="mandatory"><span>*</span>姓名 :</p>
                        <div class="input">
                            <el-input placeholder="请填姓名（2~4位中文）" v-model="base.name" maxlength="4" clearable>
                            </el-input>
                        </div>
                    </div>
                    <div class="form-one-input">
                        <p class="mandatory"><span>*</span>联系电话 :</p>
                        <div class="input">
                            <el-input placeholder="请填联系电话（11位数字）" maxlength="11" v-model="base.phone" clearable>
                            </el-input>
                        </div>
                    </div>
                    <div class="form-one-input">
                        <p class="mandatory"><span>*</span>电子邮箱 :</p>
                        <div class="input">
                            <!-- <el-input placeholder="请填电子邮箱（qq/谷歌等有效邮箱）" v-model="base.email" clearable>
                            </el-input> -->
                            <el-input placeholder="请填电子邮箱" v-model="base.email" class="input-with-select"
                                maxlength="20">
                                <!-- <el-button slot="append" icon="el-icon-search"></el-button> -->
                                <el-select v-model="emailSelect" slot="append" placeholder="请选择">
                                    <el-option label="@163.com" value="@163.com"></el-option>
                                    <el-option label="@gmail.com" value="@gmail.com"></el-option>
                                    <el-option label="@yahoo.com" value="@yahoo.com"></el-option>
                                    <el-option label="@sina.com" value="@sina.com"></el-option>
                                    <el-option label="@sohu.com" value="@sohu.com"></el-option>
                                    <el-option label="@qq.com" value="@qq.com"></el-option>
                                    <el-option label="@126.com" value="@126.com"></el-option>
                                    <el-option label="@aliyun.com" value="@aliyun.com"></el-option>
                                </el-select>
                            </el-input>
                        </div>
                    </div>
                    <div class="form-one-input">
                        <p class="mandatory"><span>*</span>部门 :</p>
                        <div class="input">
                            <!-- <el-select v-model="base.depart" placeholder="请选择" style="width:100%">
                                <el-option v-for="item in departs" :key="item.id" :label="item.name" :value="item.id">
                                </el-option>
                            </el-select> -->
                            <Department :departmentId='depart' @department="getCustomerData"
                                :structure="structure_id" />
                        </div>
                    </div>
                    <div class="form-one-input">
                        <p class="mandatory"><span>*</span>职级 :</p>
                        <!-- <div class="input">
                            <el-input placeholder="请输入职级" v-model="base.rank" clearable>
                            </el-input>
                        </div> -->
                        <div class="input">
                            <RankInit @customer="getRankData" :department="base.rank" @alow="allows" />
                        </div>
                    </div>
                    <div class="form-one-input">
                        <p class="mandatory">上级 :</p>
                        <div class="input">
                            <menCheck :excuters="alluser" @theRes="topOneChan">
                                <template slot="title">
                                    <h3>上级</h3>
                                </template>
                                <template slot="main">
                                    <el-input v-model="base.top" placeholder='请选择'></el-input>
                                </template>
                            </menCheck>
                        </div>
                    </div>
                    <div class="form-one-input">
                        <p class="mandatory">权限 : </p>
                        <div class="input">
                            <el-input v-model="allow" :placeholder="base.allow.length>0 ? '已选择' : '请选择'"
                                @focus="fuccshow"></el-input>
                        </div>
                    </div>
                    <!-- <div class="form-one-input">
                        <p class="mandatory"><span>*</span>个人工龄 :</p>
                        <div class="input">
                            <el-input  placeholder="请输入姓名" v-model="mainOne.name" clearable>
                            </el-input>
                        </div>
                    </div>
                    <div class="form-one-input">
                        <p class="mandatory"><span>*</span>助理 :</p>
                        <div class="input">
                            <el-input  placeholder="请输入姓名" v-model="mainOne.name" clearable>
                            </el-input>
                        </div>
                    </div> -->
                </div>
                <div class="right">
                    <div class="form-one-input">
                        <p class="mandatory "><span>*</span>性别 :</p>
                        <div class="input">
                            <!-- <el-input placeholder="请输入性别" v-model="base.sex" clearable>
                            </el-input> -->
                            <!-- <el-select v-model="base.sex" placeholder="请选择" style="width:100%">
                                <el-option v-for="item in denger" :key="item.id" :label="item.label"
                                    :value="item.id">
                                </el-option>
                            </el-select> -->
                            <el-select v-model="base.sex" placeholder="请选择" style="width:100%">
                                <el-option v-for="(item,index) in denger" :key="index" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="form-one-input">
                        <p class="mandatory "><span>*</span>微信/QQ :</p>
                        <div class="input">
                            <el-input placeholder="请填微信/QQ" v-model="base.wechat" clearable maxlength="11">
                            </el-input>
                        </div>
                    </div>
                    <div class="form-one-input">
                        <p class="mandatory "><span>*</span>工号 :</p>
                        <div class="input">
                            <!-- <el-input placeholder="请填工号" v-model="base.num" maxlength="8"
                                onkeyup="this.value=this.value.replace(/[^0-9-]+/,'');" clearable>
                            </el-input> -->
                            <el-input placeholder="工号为四位大写字母+四位数字" v-model="base.num" maxlength="8">
                            </el-input>
                        </div>
                    </div>
                    <!-- <div class="form-one-input">
                        <p class="mandatory"><span>*</span>职位 :</p>
                        <div class="input">
                            <el-select v-model="value" placeholder="请选择" style="width:100%">
                                <el-option v-for="item in options" :key="item.value"
                                :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="form-one-input">
                        <p class="mandatory"><span>*</span>证件类型 :</p>
                        <div class="input">
                            <el-select v-model="value" placeholder="请选择" style="width:100%">
                                <el-option v-for="item in options" :key="item.value"
                                :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="form-one-input">
                        <p class="mandatory"><span>*</span>证件号 :</p>
                         <div class="input">
                            <el-input  placeholder="请输入姓名" v-model="mainOne.name" clearable>
                            </el-input>
                        </div>
                    </div>
                    <div class="form-one-input">
                        <p class="mandatory"><span>*</span>入职时间 :</p>
                         <div class="input">
                            <el-input  placeholder="请输入姓名" v-model="mainOne.name" clearable>
                            </el-input>
                        </div>
                    </div> -->
                    <div class="form-one-input">
                        <p class="mandatory">状态 :</p>
                        <div class="input">
                            <el-select v-model="base.status" placeholder="请选择" style="width:100%">
                                <el-option v-for="(item,index) in statuses" :key="index" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="form-one-input">
                        <p class="mandatory">婚育状况 :</p>
                        <div class="input">
                            <!-- <el-input placeholder="请输入权限开设" maxlength="15" v-model="base.auth" clearable>
                            </el-input> -->
                            <el-select v-model="base.auth" placeholder="请选择权限开设" class="el_date">
                                <el-option value="未婚" label="未婚"></el-option>
                                <el-option value="已婚" label="已婚"></el-option>
                                <el-option value="已育" label="已育"></el-option>
                            </el-select>
                            <!-- <Rank @customer="getRankData"/> -->
                        </div>
                    </div>
                    <div class="form-one-input">
                        <p class="mandatory">下级 :</p>
                        <!-- <div class="input">
                            <el-select v-model="base.top2" placeholder="请选择" style="width:100%">
                                <el-option v-for="(item,index) in alluser" :key="index" :label="item.name"
                                    :value="item.user_id">
                                </el-option>
                            </el-select>
                        </div> -->
                        <menCheck :excuters="alluser" @theRes="topTwoChan">
                            <template slot="title">
                                <h3>下级</h3>
                            </template>
                            <template slot="main">
                                <el-input v-model="base.top2" placeholder='请选择' style="width: 280px;margin-left:20px;">
                                </el-input>
                            </template>
                        </menCheck>
                    </div>
                    <div class="form-one-input">
                        <p class="mandatory">左菜单权限 : </p>
                        <div class="input">
                            <el-input @focus="fff" placeholder="选完后确定即可"></el-input>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        <!-- 个人信息 -->
        <main class="main-one main-two">
            <p class="top-title">个人信息</p>
            <div class="between form-one font14-isbold-3">
                <div class="left">
                    <div class="form-one-input">
                        <p class="mandatory"><span>*</span>证件姓名 :</p>
                        <div class="input">
                            <el-input placeholder="请填证件姓名（2~4位中文）" maxlength="4" v-model="per.name" clearable>
                            </el-input>
                        </div>
                    </div>
                    <div class="form-one-input">
                        <p class="mandatory"><span>*</span>出生日期 :</p>
                        <div class="input">
                            <!-- <el-input placeholder="请输入出生日期" v-model="per.birth" clearable>
                            </el-input> -->
                            <el-date-picker v-model="per.birth" type="date" placeholder="请选择" format="yyyy-MM-dd"
                                value-format="yyyy-MM-dd" style="width:100%">
                            </el-date-picker>
                        </div>
                    </div>
                    <div class="form-one-input">
                        <p class="mandatory">民族 :</p>
                        <div class="input">
                            <el-input placeholder="请填民族" maxlength="10 " v-model="per.nation" clearable>
                            </el-input>
                        </div>
                    </div>
                    <div class="form-one-input">
                        <p class="mandatory"><span>*</span>最高学历 :</p>
                        <div class="input">
                            <el-select v-model="per.educa" placeholder="请选择" style="width:100%">
                                <el-option v-for="item in educas" :key="item.id" :label="item.name" :value="item.id">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="form-one-input">
                        <p class="mandatory">专业 :</p>
                        <div class="input">
                            <el-input placeholder="请填专业" v-model="per.major" clearable>
                            </el-input>
                        </div>
                    </div>
                    <div class="form-one-input">
                        <p class="mandatory">户口类型 :</p>
                        <div class="input">
                            <el-select v-model="per.huType" placeholder="请选择" style="width:100%">
                                <el-option v-for="item in huTypes" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="form-one-input">
                        <p class="mandatory">现居地 :</p>
                        <div class="input">
                            <el-input placeholder="请填现居地" v-model="per.address" clearable>
                            </el-input>
                        </div>
                    </div>
                    <div class="form-one-input">
                        <p class="mandatory"><span>*</span>紧急联系人 :</p>
                        <div class="input">
                            <el-input placeholder="请填紧急联系人（2~4位中文）" maxlength="4" v-model="per.man" clearable>
                            </el-input>
                        </div>
                    </div>
                    <div class="form-one-input">
                        <p class="mandatory">子女状态 :</p>
                        <div class="input">
                            <el-input placeholder="请填子女状态" v-model="per.sonType" clearable>
                            </el-input>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <div class="form-one-input">
                        <p class="mandatory "><span>*</span>身份证号码 :</p>
                        <div class="input">
                            <el-input placeholder="请填身份证号码" maxlength="18" v-model="per.idNum" clearable>
                            </el-input>
                        </div>
                    </div>
                    <div class="form-one-input">
                        <p class="mandatory ">年龄 :</p>
                        <div class="input">
                            <el-input placeholder="请填年龄" maxlength="3"
                                onkeyup="this.value=this.value.replace(/[^0-9-]+/,'');" v-model="per.age" clearable>
                            </el-input>
                        </div>
                    </div>
                    <div class="form-one-input">
                        <p class="mandatory ">籍贯 :</p>
                        <div class="input">
                            <el-input placeholder="请填籍贯" v-model="per.hometown" clearable>
                            </el-input>
                        </div>
                    </div>
                    <div class="form-one-input">
                        <p class="mandatory">毕业院校 :</p>
                        <div class="input">
                            <el-input placeholder="请填毕业院校" v-model="per.school" clearable>
                            </el-input>
                        </div>
                    </div>
                    <div class="form-one-input">
                        <p class="mandatory">毕业时间 :</p>
                        <div class="input">
                            <!-- <el-input placeholder="请输入毕业时间" v-model="per.date" clearable>
                            </el-input> -->
                            <el-date-picker v-model="per.date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="date"
                                placeholder="请选择" style="width:100%">
                            </el-date-picker>
                        </div>
                    </div>
                    <div class="form-one-input">
                        <p class="mandatory">户口所在地 :</p>
                        <div class="input">
                            <el-input placeholder="请填户口所在地" v-model="per.huWhere" clearable>
                            </el-input>
                        </div>
                    </div>
                    <div class="form-one-input">
                        <p class="mandatory">政治面貌 :</p>
                        <div class="input">
                            <el-select v-model="per.polit" placeholder="请选择" style="width:100%">
                                <el-option v-for="item in polits" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="form-one-input">
                        <p class="mandatory"><span>*</span>紧急联系人电话 :</p>
                        <div class="input">
                            <el-input placeholder="请填紧急联系人电话" onkeyup="this.value=this.value.replace(/[^0-9-]+/,'');"
                                maxlength="11" v-model="per.phone" clearable>
                            </el-input>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        <!-- 合同信息 -->
        <main class="main-one main-two">
            <p class="top-title">劳动合同信息</p>
            <div class="between form-one font14-isbold-3">
                <div class="left">
                    <div class="form-one-input">
                        <p class="mandatory"><span>*</span>合同编号 :</p>
                        <div class="input">
                            <el-input placeholder="合同编号为16位大小写字母、英文构成" v-model="contract.num" clearable maxlength="16">
                            </el-input>
                        </div>
                    </div>
                    <div class="form-one-input">
                        <p class="mandatory"><span>*</span>聘用形式 :</p>
                        <div class="input">
                            <el-select v-model="contract.appType" placeholder="请选择" style="width:100%">
                                <el-option v-for="item in appTypes" :key="item.id" :label="item.name" :value="item.id">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="form-one-input">
                        <p class="mandatory"><span>*</span>开始时间 :</p>
                        <div class="input">
                            <!-- <el-input placeholder="请输入开始时间" v-model="contract.sta_time" clearable>
                            </el-input> -->
                            <el-date-picker v-model="contract.sta_time" type="date" placeholder="请选择开始时间"
                                format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width:100%">
                            </el-date-picker>
                        </div>
                    </div>
                    <div class="form-one-input">
                        <p class="mandatory">试用期结束 :</p>
                        <div class="input">
                            <!-- <el-input placeholder="请输入试用期结束" v-model="contract.end_time" clearable>
                            </el-input> -->
                            <el-date-picker v-model="contract.end_time" type="date" placeholder="请选择试用期结束"
                                format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width:100%">
                            </el-date-picker>
                        </div>
                    </div>
                    <div class="form-one-input">
                        <p class="mandatory"><span>*</span>合同内容 :</p>
                        <div class="input">
                            <el-input placeholder="请填合同内容" v-model="contract.content" clearable>
                            </el-input>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <div class="form-one-input">
                        <p class="mandatory "><span>*</span>合同类型 :</p>
                        <div class="input">
                            <el-select v-model="contract.type" placeholder="请选择" style="width:100%">
                                <el-option v-for="item in conTypes" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="form-one-input">
                        <p class="mandatory "><span>*</span>职位 :</p>
                        <div class="input">
                            <!-- <el-select v-model="contract.posi" placeholder="请选择" style="width:100%">
                                <el-option v-for="item in posis" :key="item.id" :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select> -->
                            <Position :departmentId='positionId' @department="getPositionData" />
                        </div>
                    </div>
                    <div class="form-one-input">
                        <p class="mandatory "><span>*</span>到期时间 :</p>
                        <div class="input">
                            <!-- <el-input placeholder="请输入到期时间" v-model="contract.deadline" clearable>
                            </el-input> -->
                            <el-date-picker v-model="contract.deadline" type="date" format="yyyy-MM-dd"
                                value-format="yyyy-MM-dd" placeholder="请选择到期时间" style="width:100%">
                            </el-date-picker>
                        </div>
                    </div>
                    <div class="form-one-input">
                        <p class="mandatory">其他 :</p>
                        <div class="input">
                            <el-input placeholder="请填其他" v-model="contract.other" clearable>
                            </el-input>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        <!-- 底部附件及按钮 -->
        <footer>
            <div class="eclosure">
                <div class="flex-items-center" style="height:40px;">
                    <p class="font14-isbold-3 mandatory"><span>*</span>相关附件 :</p>
                    <div class="textarea  font14-nobold-9">
                        <el-button style="margin-right:20px;" class="upBtn"><i
                                class="el-icon-upload"></i>上传附件{{progress=='100%'?'':progress}}<input type="file"
                                ref="file" id="file" @change="upChan" name="file"></el-button>
                        <!-- 支持格式：.rar .zip .doc .docx .pdf ，单个文件不能超过10MB -->
                        <!-- <div style="text-align:left"> -->
                        <!-- </div> -->
                    </div>
                </div>
                <div class="font14-nobold-9" style="text-align:left">
                    <h4>附件提示:</h4>
                    <!-- 支持格式：.rar .zip .doc .docx .pdf ，单个文件不能超过10MB<br> -->
                    求职简历 / 身份证 / 银行卡 / 学历证 / 其他证书<br>
                    面试记录 / 劳动合同 / 协议 / 录用信息 / 其他<br>
                </div>
            </div>
            <div class="eclosure" style="margin-top:10px;padding-left:150px;">
                <div class="textarea font14-nobold-9" v-for="(item,index) in files" :key="index"
                    style="margin-right:10px;" v-if="files.length&&item">
                    <i class='el-icon-folder'></i>&nbsp;&nbsp;
                    <span> {{item.name ? item.name : '其他'}}</span>
                    <span v-if="item.size"> ({{item.size}})</span>
                    <el-link v-if="$route.query.id" :underline="false" :href="$baseURL +'/'+ item.path">下载</el-link>
                    <el-link :underline='false' type='primary' class='ml20' @click="del(index)"><i
                            class='el-icon-delete'></i>删除</el-link>
                </div>
            </div>
            <div class="font14-nobold-9">

            </div>
            <div class="btn">
                <el-button type="primary" @click="save">保存</el-button>
                <el-button @click="back()">取消</el-button>
            </div>
        </footer>

        <!-- 弹框 -->
        <el-dialog :visible.sync="fucshow" title="编辑权限">
            <el-form label-width="120px">
                <el-checkbox-group v-model="base.allow" @change="fuc">
                    <el-form-item :label="item.name+'：'" v-for="(item,index) in fuclist" :key="index"
                        style="text-align: left;">
                        <el-checkbox v-for="(it,i) in item.allow" :key="i" :label="it.id">{{it.name}}</el-checkbox>
                    </el-form-item>
                </el-checkbox-group>
                <!-- <el-form-item> -->
                <el-button @click="fucshow = false">取消</el-button>
                <el-button type="primary" @click="fucshow = false">确认</el-button>
                <!-- </el-form-item> -->
            </el-form>
        </el-dialog>
        <el-dialog :visible.sync="fffshow" title="左菜单权限">
            <el-checkbox-group v-model="fffvalue" style="text-align: left;" @change="getfuc">
                <el-checkbox :label="item" v-for="(item,index) in fucdata" :key="index" style="width:100px;margin-bottom:10px;">{{item}}</el-checkbox>
            </el-checkbox-group>
            <el-button type="primary" @click="fffshow = false">确定</el-button>
            <el-button @click="fffshow = false">取消</el-button>
        </el-dialog>
    </div>
</template>
<script>
    import Department from '@/components/table/Department.vue'
    import Rank from '@/components/table/Rank.vue'
    import RankInit from '@/components/table/RankInit.vue'
    import Position from '@/components/table/Position.vue'
    import menCheck from '@/components/menCheckcopy.vue'
    export default {
        components: {
            Department,
            Rank,
            Position,
            menCheck,
            RankInit
        },
        data() {
            return {
                fffvalue:[],
                fffshow:false,
                fucdata: [
                    '首页',
                    '公告栏',
                    '邮箱',
                    '待办提醒',
                    '日程安排',
                    '工作汇报',
                    '组织架构',
                    '人力资源',
                    '员工通讯录',
                    '转正/离职',
                    '绩效考核',
                    '薪酬管理',
                    '行政仓库',
                    '文档建设',
                    '公共文件夹',
                    '新建审批',
                    '我提交的审批',
                    '已办结审批',
                    '待我审批',
                    '抄送我审批', 
                    '审批意见及评论',
                    '客户管理',
                    '我下属的客户',
                    '我关注的客户',
                    '客户通讯录',
                    '短信计划',
                    '立项申请',
                    '订单管理',
                    '全部订单',
                    '合同',
                    '客户回款',
                    '新建工作单',
                    '我派发的',
                    '我执行的'
                ],
                fucshow: false,
                fuclist: [],
                user_id: '',
                emailSelect: '',
                eidt: false,//true就是编辑
                logoImg: '',//用户头像
                allow: '',
                base: {
                    name: '',
                    contact: '',
                    email: '',
                    depart: { id: "", label: "" },
                    rank: '',
                    top: '',
                    top2: '',
                    sex: '',
                    wechat: '',
                    num: '',
                    status: '',
                    auth: '',
                    phone: '',
                    allow: [],
                },
                per: {
                    name: '',
                    birth: '',
                    nation: '',
                    educa: '',
                    major: '',
                    huType: '',
                    addr: '',
                    contact: '',
                    sonType: '',
                    idNum: '',
                    age: '',
                    hometown: '',
                    school: '',
                    date: '',
                    huWhere: '',
                    polit: '',
                    man: '',
                    address: '',
                    phone: ''
                },
                contract: {
                    num: '',
                    appType: '',
                    sta_time: '',
                    end_time: '',
                    content: '',
                    conType: '',
                    posi: '',
                    deadline: '',
                    other: '',
                },
                denger: [
                    { value: 1, label: '男' },
                    { value: 2, label: '女' },
                ],
                appTypes: [],
                username: '用户名',
                alluser: '',//所有人员
                depart: '',
                department: {},//部门
                position: {},
                positionId: '',//职位id
                jobnumber: '',//工号
                entrytime: '',//入职时间
                mainOne: {
                    name: ''
                },
                departs: [],
                statuses: [
                    { label: '在职', value: '在职' },
                    { label: '离职', value: '离职' }
                ],
                huTypes: [
                    { label: '城市', value: '城市' },
                    { label: '农村', value: '农村' }
                ],
                polits: [
                    { label: '群众', value: '群众' },
                    { label: '团员', value: '团员' },
                    { label: '党员', value: '党员' }
                ],
                conTypes: [
                    { label: '实习合同', value: '实习合同' },
                    { label: '劳务合同', value: '劳务合同' }
                ],
                educas: [],
                value: '',
                files: [],
                file_ids: [],
                ids_str: '',
                posis: [],
                topTwoIdsStr: '',
                topOneIdsStr: '',
                structure_id: '',
            }
        },
        methods: {
            getfuc(){
                this.finalfucvalue = this.fffvalue.join(',')
            },
            fff(){
                this.fffshow = true
            },
            fuccshow() {
                this.fucshow = true
                // var allowId = []
                // for(var i of this.fuclist){
                //     if(this.base.rank == i.id){
                //         for(var j of i.allow){
                //             allowId.push(j.id)
                //         }
                //     }
                // }
                // console.log(allowId)
                // this.base.allow = allowId
            },
            fuc() {
                console.log(this.groups, 'ggggggggggggg')
            },
            // 上级start
            topOneChan(val) {
                console.log(val)
                this.topOneIdsStr = this.getIdsStr(val)
                this.base.top = this.getNames(val)
            },
            topTwoChan(val) {
                this.topTwoIdsStr = this.getIdsStr(val)
                this.base.top2 = this.getNames(val)
            },
            getIdsStr(val) {
                let ids = []
                for (let i in val) {
                    ids.push(val[i].id)
                }
                return ids.join(',')
            },
            getNames(val) {
                let names = []
                for (let i in val) {
                    names.push(val[i].name)
                }
                return names.join('  ')
            },
            // 上级end
            del(index) {
                this.files.splice(index, 1)
            },
            getPosis() {
                this.$http.get('user/positions', { token: localStorage.getItem('token') }).then(res => {
                    this.posis = res
                })
            },
            getAppTypes() {//应聘类型
                this.$http.get('user/modality', { token: localStorage.getItem('token') }).then(res => {
                    this.appTypes = res
                })
            },
            opChan(e) {
                console.log(e)
            },
            // 文件图片
            upChan() {
                if (!this.$refs.file.files.length) return
                if (this.$http.upload(this.$refs.file.files[0])) {
                    this.$http.upload(this.$refs.file.files[0]).then(res => {
                        if (res.data.code == 1 && this.$refs.file.files.length) {
                            this.$message('上传成功')
                            this.files.push({ name: this.$refs.file.files[0].name, msg: res.data.msg })
                            this.file_ids.push(res.data.msg.id)
                            for (let i in this.file_ids) {
                                if (i == this.file_ids.length - 1) {
                                    this.ids_str += this.file_ids[i]
                                } else {
                                    this.ids_str += this.file_ids[i] + ','
                                }
                            }
                        }
                    })
                }

            },
            ImgChan() {
                console.log('上传')
                console.log(this.$refs.files.files[0])
                this.$http.Imgupload(this.$refs.files.files[0]).then(res => {
                    console.log(res)
                    if (res.code == 0) {
                        return this.$message('仅支持：' + 'jpg,png,jpeg')
                    }
                    this.logoImg = res.data.msg.path;
                    // if (res.data.code == 1) {
                    //     this.$message('上传成功')
                    //     this.files.push({ name: this.$refs.files.files[0].name, msg: res.data.msg })
                    //     this.file_ids.push(res.data.msg.id)
                    //     console.log(res.data.msg.id, 'iiiiiiiiiiiii')
                    //     for (let i in this.file_ids) {
                    //         if (i == this.file_ids.length - 1) {
                    //             this.ids_str += this.file_ids[i]
                    //         } else {
                    //             this.ids_str += this.file_ids[i] + ','
                    //         }
                    //     }
                    // }
                })
            },
            // 获取部门
            getCustomerData(val) {
                // console.log(val.label)
                this.department = val
                this.depart = val.label
            },
            // 获取职位
            getPositionData(val) {
                console.log(val)
                this.position = val
                this.positionId = val.label
            },
            // 获取职级
            getRankData(val) {
                this.base.rank = val
                console.log(val)
            },
            allows(val) {
                var allow = val.split(',')
                for (var i in allow) {
                    allow[i] = parseInt(allow[i])
                }
                if (this.base.allow.length == 0) {
                    this.base.allow = allow
                }
            },
            save() {
                var reg_name = /^([\u4e00-\u9fa5\·]{2,4})$/;
                var reg_phone = /^1[3|4|5|8][0-9]\d{4,8}$/;
                var reg_email = /^(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})$/
                var reg_idCard = /^\d{15}|\d{}18$/
                if (!this.logoImg) {
                    return this.$message('头像不能为空')
                }
                if (!this.base.name || !reg_name.test(this.base.name)) {
                    return this.$message('姓名由2到4位中文组成')
                }
                if (!this.base.sex) {
                    return this.$message('性别不能为空')
                }
                if (!this.base.phone || !reg_phone.test(this.base.phone)) {
                    return this.$message('请输入有效的联系电话')
                }
                if (!this.base.wechat) {
                    return this.$message('请输入微信/QQ')
                }
                // if (!this.base.email || !reg_email.test(this.base.email)) {
                //     return this.$message('请输入有效的电子邮箱')
                // }
                if (!this.$re.isInt(this.base.email)) {
                    return this.$message('请输入有效电子邮箱')
                }
                console.log(this.base.num, '工号问题', this.$re.workNum(this.base.num))
                if (!this.$re.workNum(this.base.num)) {
                    return this.$message('工号有误')
                }
                // if(!this.department.id || !this.department == 0){
                //     return this.$message('部门不能为空')
                // }
                if (typeof (this.department.id) != 'number') {
                    return this.$message('部门不能为空')
                }
                // if (!this.position.id) {
                //     return this.$message('职位不能为空')
                // }
                if (!this.per.name || !reg_name.test(this.per.name)) {
                    return this.$message('证件姓名由2到4位中文组成')
                }
                if (!this.per.idNum || !reg_idCard.test(this.per.idNum)) {
                    return this.$message('请输入正确的身份证号码')
                }
                if (!this.per.birth) {
                    return this.$message('出生日期不能为空')
                }
                // if(!this.per.school){
                //     return this.$message('毕业院校不能为空')
                // }
                if (!this.per.man || !reg_name.test(this.per.man)) {
                    return this.$message('请输入有效的紧急联系人')
                }
                if (!this.per.phone || !reg_phone.test(this.per.phone)) {
                    return this.$message('请输入有效的紧急联系电话')
                }
                // 'agree[number]': this.contract.num,//合同信息
                // 'agree[type]': this.contract.type,
                // 'agree[modality]': this.contract.appType,
                // 'agree[position]': this.position.id,
                // 'agree[begin_time]': this.contract.sta_time,
                // 'agree[end_time]': this.contract.end_time,
                // 'agree[trial_time]': this.contract.deadline,
                // 'agree[content]': this.contract.content,
                // 'agree[other]': this.contract.other,
                // 'agree[appendix]': this.ids_str//附件
                if (!this.$re.isContract(this.contract.num)) {
                    return this.$message('合同编号有误')
                }
                if (!this.contract.type) {
                    return this.$message('合同类型不能为空')
                }
                if (!this.contract.appType) {
                    return this.$message('聘用形式不能为空')
                }
                if (!this.position.id && !this.positionId) {
                    return this.$message('职位不能为空')
                }
                if (!this.contract.sta_time) {
                    return this.$message('开始时间不能为空')
                }
                if (!this.contract.deadline) {
                    return this.$message('到期时间不能为空')
                }
                if (this.contract.deadline < this.contract.sta_time) {
                    return this.$message('到期时间不能早于开始时间')
                }
                if (this.contract.end_time && (this.contract.end_time < this.contract.sta_time)) {
                    return this.$message('试用期结束不能早于开始时间')
                }
                if (!this.contract.content) {
                    return this.$message('合同内容不能为空')
                }
                if (!this.ids_str) {
                    return this.$message('请上传相关附件')
                }
                var url = '', data = {};
                // 数据
                let isdata = {
                    user_id: this.user_id,
                    'info[head]': this.logoImg,//图片
                    'info[name]': this.base.name,//基础信息
                    'info[account]': this.base.phone,//联系电话
                    'info[email]': this.base.email + this.emailSelect,//电子邮箱
                    'info[structure_id]': this.department.id,//部门id
                    'info[rank]': this.base.rank,//职级
                    // 'info[allow]': JSON.stringify(this.base.allow),//权限
                    'info[allow]': this.base.allow.join(','),//权限
                    // 'info[superior]': this.base.top,//上级
                    'info[superior]': this.topOneIdsStr,//上级
                    // 'info[superior2]': this.base.top2,//下个上级
                    'info[superior2]': this.topTwoIdsStr,//下个上级
                    'info[gender]': this.base.sex == '男' ? 1 : (this.base.sex == '女' ? 2 : this.base.sex),
                    'info[wechat]': this.base.wechat,
                    'info[job_number]': this.base.num,//工号
                    'info[status]': this.base.status,//状态
                    'info[role_id]': this.base.auth,//权限开设

                    'user[name]': this.per.name,//个人信息
                    'user[id_card]': this.per.idNum,//身份证号码 
                    'user[birthday]': this.per.birth,//出生日期
                    'user[nation]': this.per.nation,//民族
                    'user[education]': this.per.educa,//最高学历
                    'user[major]': this.per.major,//专业
                    'user[node_type]': this.per.huType,//户口类型
                    'user[residence]': this.per.address,//现居地
                    'user[contacts_name]': this.per.man,//紧急联系人
                    'user[children]': this.per.sonType,//子女状态
                    'user[age]': this.per.age,//年龄 
                    'user[native_place]': this.per.hometown,//籍贯
                    'user[school]': this.per.school,//毕业院校 
                    'user[graduation]': this.per.date,//毕业时间
                    'user[registered_residence]': this.per.huWhere,//户口所在地
                    'user[political_outlook]': this.per.polit,//政治面貌
                    'user[contacts_phone]': this.per.phone,//紧急联系人电话
                    'agree[number]': this.contract.num,//合同信息
                    'agree[type]': this.contract.type,
                    'agree[modality]': this.contract.appType,
                    'agree[position]': this.position.id,
                    'agree[begin_time]': this.contract.sta_time,
                    'agree[end_time]': this.contract.deadline,
                    'agree[trial_time]': this.contract.end_time,
                    'agree[content]': this.contract.content,
                    'agree[other]': this.contract.other,
                    'agree[appendix]': this.ids_str,//附件
                    'info[auth]':this.finalfucvalue
                }


                if (this.$route.query.id) {
                    url = 'user/edit'
                    data = Object.assign({ id: this.$route.query.id }, isdata)
                } else {
                    url = 'user/add'
                    data = isdata
                }
                this.$http.post(url, data).then(res => {
                    console.log(res)
                    this.$message(res.msg)
                    if (res.code == 1) {
                        this.back()
                    }
                })
                /**/
            },

            getDeprats() {
                this.$http.get('index/structure', {}).then(res => {
                    this.departs = res
                })
                // this.$http.get('user/alluser', { token: localStorage.getItem('token') }).then(res => {
                //     this.alluser = res
                // })
                this.$http.get('user/index', { token: localStorage.getItem('token') }).then(res => {
                    for (let i in res) {
                        res[i].group = []
                    }
                    this.alluser = res

                })
            },
            getEducas() {
                this.$http.get('user/education', { token: localStorage.getItem('token') }).then(res => {
                    this.educas = res
                })
            },
        },
        created() {
            this.finalfucvalue = this.fucdata.join(',')
            if (this.$route.query.id) {
                this.eidt = true
                this.$http.get('user/detail', {
                    token: localStorage.getItem("token"),
                    id: this.$route.query.id
                }).then(res => {
                    console.log(res)
                    var user = res.user,
                        info = res.info,
                        department = res.greement
                    this.fffvalue = user.auth.split(',')
                    console.log(this.fffvalue,'ffffffffff')
                    this.structure_id = user.structure_id
                    this.user_id = user.user_id
                    this.logoImg = user.head
                    this.base.name = user.name
                    this.base.phone = user.account
                    this.base.email = user.email.split('@')[0]
                    this.emailSelect = '@' + user.email.split('@')[1]
                    // this.depart = user.structure_id
                    this.depart = user.structure ? user.structure : '全部'
                    this.department.id = user.structure_id //部门
                    this.positionId = department.position//职位
                    this.base.rank = user.rank_id //职级
                    this.base.top = JSON.parse(JSON.stringify(user.superior_group1)).join(' ')
                    this.topOneIdsStr = res.superior
                    this.topTwoIdsStr = res.superior2
                    this.base.top2 = JSON.parse(JSON.stringify(user.superior_group2)).join(' ')
                    this.base.sex = user.gender
                    this.base.wechat = user.wechat
                    this.base.num = user.job_number
                    this.base.status = user.status
                    this.base.auth = user.role_id
                    // this.base.allow = user.allow
                    this.per.name = info.name//个人信息
                    this.per.idNum = info.id_card//身份证号码 
                    this.per.birth = info.birthday//出生日期
                    this.per.nation = info.nation//民族
                    this.per.educa = info.education//最高学历
                    this.per.major = info.major//专业
                    this.per.huType = info.node_type//户口类型
                    this.per.address = info.residence//现居地
                    this.per.man = info.contacts_name//紧急联系人
                    this.per.sonType = info.children//子女状态
                    this.per.age = info.age//年龄 
                    this.per.hometown = info.native_place//籍贯
                    this.per.school = info.school//毕业院校 
                    this.per.date = info.graduation//毕业时间
                    this.per.huWhere = info.registered_residence//户口所在地
                    this.per.polit = info.political_outlook//政治面貌
                    this.per.phone = info.contacts_phone//紧急联系人电话


                    this.contract.num = department.number//合同信息
                    this.contract.type = department.type
                    this.contract.appType = department.modality_id
                    this.contract.sta_time = department.begin_time
                    this.contract.end_time = department.trial_time//试用期结束
                    this.contract.deadline = department.end_time//到期时间
                    this.contract.content = department.content
                    this.contract.other = department.other
                    this.files = department.file//附件
                    let ids_arr = []
                    for (let i in department.file) {
                        if (department.file[i]) {
                            ids_arr.push(department.file[i].id)
                        }
                    }
                    this.ids_str = ids_arr.join(',')

                    var allow = [];
                    for (var i of user.allow) {
                        allow.push(i.id)
                    }
                    this.base.allow = allow
                    // this.ids_str = ()=>{
                    //     let arr = []
                    //     for(let i in department.file){
                    //         arr.push(department.file[i].id)
                    //     }
                    //     return arr.join(',')
                    // }
                })
            }
            this.getDeprats()
            this.getEducas()
            this.getAppTypes()
            this.getPosis()
            this.$http.post('work/allow').then(res => {
                this.fuclist = res
            })
        },
        computed: {
            topDepart() {
                for (let i in this.departs) {
                    if (this.departs[i].id == this.base.depart) {
                        return this.departs[i].name
                        break
                    }
                }
            },
            topPosi() {
                for (let i in this.posis) {
                    if (this.posis[i].id == this.contract.posi) {
                        return this.posis[i].name
                        break
                    }
                }
            },
            toNum() { },
            topTime() { },
            progress() {
                return this.$store.state.progress
            }
        },
    }
</script>
<style lang="less" scoped>
    .top-title {
        margin: 40px 0 20px;
        padding-left: 10px;
        text-align: left;
        font-weight: bold;
        border-left: 2px solid #409EFF;
    }

    .mandatory {
        text-align: right;

        span {
            color: #F56C6C;
        }
    }

    header {
        .user-img {
            position: relative;
            width: 150px;
            height: 180px;
            overflow: hidden;
            border: 1px solid #ddd;

            img {
                width: 100%;
                height: 100%;
            }

            div,
            p {
                position: absolute;
                bottom: 0px;
                left: 50%;
                background: orange;
                transform: translateX(-50%);
                width: 100%;
                height: 34px;
                line-height: 34px;
                color: #fff;
                font-size: 16px;

                input,
                p {
                    width: 100%;
                    opacity: 0;
                }
            }
        }

        .right {
            flex: 1;
            text-align: left;
            padding-left: 30px;

            h3 {
                border-bottom: 1px solid #ddd;
                height: 32px;
                line-height: 32px;
            }

            .basic-info {
                li {
                    padding-top: 10px;

                    i {
                        display: inline-block;
                        padding-right: 4px;
                    }
                }
            }
        }

    }

    main {
        .form-one-input {
            display: flex;
            align-items: center;
            width: 500px;
            margin-bottom: 20px;

            .mandatory {
                width: 130px;
            }

            .input {
                width: 280px;
                margin-left: 20px;
            }
        }
    }

    footer {
        .eclosure {
            display: flex;
            flex-wrap: wrap;

            p {
                width: 130px;
                text-align: right;
                margin-right: 20px;
            }
        }

        .btn {
            padding-top: 40px;
        }
    }


    .upBtn {
        position: relative;
    }

    /deep/.el-input-group__append {
        width: 90px;
    }
</style>