<template>
    <div class="staff-add">
        <!-- 顶部信息 -->
        <header class="between">
            <div class="left user-img">
                <!-- <img :src="this.$baseURL + logoImg.path" alt=""> -->
                <el-image
                style="width: 180px; height: 180px"
                :src="this.$baseURL + logoImg.path"
                fit="cover"></el-image>
                <div>
                    <span> 上传图片 </span>
                    <p><input type="file" ref="files" id="files" @change="ImgChan" name="files"></p>    
                </div>
            </div>
            <div class="right font14-nobold-6">
                <span class="bitianstyle"><span>*</span>为必填项</span>
                <h3>用户名：{{base.name}}</h3>
                <ul class="basic-info">
                    <li><i class="el-icon-circle-plus-outline"></i>部门：{{department.label}}</li>
                    <li><i class="el-icon-circle-plus-outline"></i>职位：{{position.label}}</li>
                    <li><i class="el-icon-circle-plus-outline"></i>工号：{{base.num}}</li>
                    <li><i class="el-icon-circle-plus-outline"></i>入职时间：{{contract.sta_time}}</li>
                </ul>
            </div>
        </header>

        <!-- 基础信息 -->   
        <main class="main-one">
            <p class="top-title">基础信息</p>
            <div class="between form-one font14-isbold-3">
                <div class="left">
                    <div class="form-one-input">
                        <p class="mandatory"><span>*</span>姓名 :</p>
                        <div class="input">
                            <el-input placeholder="请输入姓名" v-model="base.name" clearable>
                            </el-input>
                        </div>
                    </div>
                    <div class="form-one-input">
                        <p class="mandatory"><span>*</span>联系电话 :</p>
                        <div class="input">
                            <el-input placeholder="请输入联系电话" v-model="base.phone" clearable>
                            </el-input>
                        </div>
                    </div>
                    <div class="form-one-input">
                        <p class="mandatory">电子邮箱 :</p>
                        <div class="input">
                            <el-input placeholder="请输入电子邮箱" v-model="base.email" clearable>
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
                            <Department @department="getCustomerData"/>
                        </div>
                    </div>
                    <div class="form-one-input">
                        <p class="mandatory">职级 :</p>
                        <!-- <div class="input">
                            <el-input placeholder="请输入职级" v-model="base.rank" clearable>
                            </el-input>
                        </div> -->
                        <div class="input">
                            <Rank @customer="getRankData"/>
                        </div>
                    </div>
                    <div class="form-one-input">
                        <p class="mandatory">上级 :</p>
                        <div class="input">
                            <!-- <el-input placeholder="请输入上级" v-model="base.top" clearable>
                            </el-input> -->
                            <el-select v-model="base.top" placeholder="请选择" style="width:100%">
                                <el-option v-for="item in alluser" :key="item.name" :label="item.name"
                                    :value="item.user_id">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <!-- <div class="form-one-input">
                        <p class="mandatory"><span>*</span>其他上级 :</p>
                        <div class="input">
                            <el-input  placeholder="请输入姓名" v-model="mainOne.name" clearable>
                            </el-input>
                        </div>
                    </div>
                    <div class="form-one-input">
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
                                <el-option v-for="item in denger" :key="item.label" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="form-one-input">
                        <p class="mandatory ">微信/QQ :</p>
                        <div class="input">
                            <el-input placeholder="请输入微信/QQ" v-model="base.wechat" clearable>
                            </el-input>
                        </div>
                    </div>
                    <div class="form-one-input">
                        <p class="mandatory "><span>*</span>工号 :</p>
                        <div class="input">
                            <el-input placeholder="请输入工号" v-model="base.num" clearable>
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
                                <el-option v-for="item in statuses" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="form-one-input">
                        <p class="mandatory">权限开设 :</p>
                        <div class="input">
                            <el-input placeholder="请输入权限开设" v-model="base.auth" clearable>
                            </el-input>
                            <!-- <Rank @customer="getRankData"/> -->
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
                            <el-input placeholder="请输入证件姓名" v-model="per.name" clearable>
                            </el-input>
                        </div>
                    </div>
                    <div class="form-one-input">
                        <p class="mandatory"><span>*</span>出生日期 :</p>
                        <div class="input">
                            <!-- <el-input placeholder="请输入出生日期" v-model="per.birth" clearable>
                            </el-input> -->
                            <el-date-picker
                                v-model="per.birth"
                                type="date"
                                placeholder="选择日期"
                                format="yyyy-MM-dd" value-format="yyyy-MM-dd" 
                                style="width:100%">
                            </el-date-picker>
                        </div>
                    </div>
                    <div class="form-one-input">
                        <p class="mandatory"><span>*</span>民族 :</p>
                        <div class="input">
                            <el-input placeholder="请输入民族" v-model="per.nation" clearable>
                            </el-input>
                        </div>
                    </div>
                    <div class="form-one-input">
                        <p class="mandatory"><span>*</span>最高学历 :</p>
                        <div class="input">
                            <el-select v-model="per.educa" placeholder="请选择" style="width:100%">
                                <el-option v-for="item in educas" :key="item.id" :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="form-one-input">
                        <p class="mandatory"><span>*</span>专业 :</p>
                        <div class="input">
                            <el-input placeholder="请输入专业" v-model="per.major" clearable>
                            </el-input>
                        </div>
                    </div>
                    <div class="form-one-input">
                        <p class="mandatory"><span>*</span>户口类型 :</p>
                        <div class="input">
                            <el-select v-model="per.huType" placeholder="请选择" style="width:100%">
                                <el-option v-for="item in huTypes" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="form-one-input">
                        <p class="mandatory"><span>*</span>现居地 :</p>
                        <div class="input">
                            <el-input placeholder="请输入现居地" v-model="per.address" clearable>
                            </el-input>
                        </div>
                    </div>
                    <div class="form-one-input">
                        <p class="mandatory"><span>*</span>紧急联系人 :</p>
                        <div class="input">
                            <el-input placeholder="请输入紧急联系人" v-model="per.man" clearable>
                            </el-input>
                        </div>
                    </div>
                    <div class="form-one-input">
                        <p class="mandatory">子女状态 :</p>
                        <div class="input">
                            <el-input placeholder="请输入子女状态" v-model="per.sonType" clearable>
                            </el-input>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <div class="form-one-input">
                        <p class="mandatory "><span>*</span>身份证号码 :</p>
                        <div class="input">
                            <el-input placeholder="请输入身份证号码" v-model="per.idNum" clearable>
                            </el-input>
                        </div>
                    </div>
                    <div class="form-one-input">
                        <p class="mandatory "><span>*</span>年龄 :</p>
                        <div class="input">
                            <el-input placeholder="请输入年龄" v-model="per.age" clearable>
                            </el-input>
                        </div>
                    </div>
                    <div class="form-one-input">
                        <p class="mandatory "><span>*</span>籍贯 :</p>
                        <div class="input">
                            <el-input placeholder="请输入籍贯" v-model="per.hometown" clearable>
                            </el-input>
                        </div>
                    </div>
                    <div class="form-one-input">
                        <p class="mandatory"><span>*</span>毕业院校 :</p>
                        <div class="input">
                            <el-input placeholder="请输入毕业院校" v-model="per.school" clearable>
                            </el-input>
                        </div>
                    </div>
                    <div class="form-one-input">
                        <p class="mandatory"><span>*</span>毕业时间 :</p>
                        <div class="input">
                            <!-- <el-input placeholder="请输入毕业时间" v-model="per.date" clearable>
                            </el-input> -->
                            <el-date-picker
                                v-model="per.date"
                                format="yyyy-MM-dd" value-format="yyyy-MM-dd" 
                                type="date"
                                placeholder="选择日期"
                                style="width:100%">
                            </el-date-picker>
                        </div>
                    </div>
                    <div class="form-one-input">
                        <p class="mandatory"><span>*</span>户口所在地 :</p>
                        <div class="input">
                            <el-input placeholder="请输入户口所在地" v-model="per.huWhere" clearable>
                            </el-input>
                        </div>
                    </div>
                    <div class="form-one-input">
                        <p class="mandatory"><span>*</span>政治面貌 :</p>
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
                            <el-input placeholder="请输入紧急联系人电话" v-model="per.phone" clearable>
                            </el-input>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        <!-- 合同信息 -->
        <main class="main-one main-two">
            <p class="top-title">合同信息</p>
            <div class="between form-one font14-isbold-3">
                <div class="left">
                    <div class="form-one-input">
                        <p class="mandatory"><span>*</span>合同编号 :</p>
                        <div class="input">
                            <el-input placeholder="请输入合同编号" v-model="contract.num" clearable>
                            </el-input>
                        </div>
                    </div>
                    <div class="form-one-input">
                        <p class="mandatory"><span>*</span>聘用形式 :</p>
                        <div class="input">
                            <el-select v-model="contract.appType" placeholder="请选择" style="width:100%">
                                <el-option v-for="item in appTypes" :key="item.id" :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="form-one-input">
                        <p class="mandatory"><span>*</span>开始时间 :</p>
                        <div class="input">
                            <!-- <el-input placeholder="请输入开始时间" v-model="contract.sta_time" clearable>
                            </el-input> -->
                            <el-date-picker
                                v-model="contract.sta_time"
                                type="date"
                                placeholder="请输入开始时间"
                                format="yyyy-MM-dd" value-format="yyyy-MM-dd" 
                                style="width:100%">
                            </el-date-picker>
                        </div>
                    </div>
                    <div class="form-one-input">
                        <p class="mandatory"><span>*</span>试用期结束 :</p>
                        <div class="input">
                            <!-- <el-input placeholder="请输入试用期结束" v-model="contract.end_time" clearable>
                            </el-input> -->
                            <el-date-picker
                                v-model="contract.end_time"
                                type="date"
                                placeholder="请输入试用期结束"
                                format="yyyy-MM-dd" value-format="yyyy-MM-dd" 
                                style="width:100%">
                            </el-date-picker>
                        </div>
                    </div>
                    <div class="form-one-input">
                        <p class="mandatory"><span>*</span>合同内容 :</p>
                        <div class="input">
                            <el-input placeholder="请输入合同内容" v-model="contract.content" clearable>
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
                            <Position @department="getPositionData"/>
                        </div>
                    </div>
                    <div class="form-one-input">
                        <p class="mandatory "><span>*</span>到期时间 :</p>
                        <div class="input">
                            <!-- <el-input placeholder="请输入到期时间" v-model="contract.deadline" clearable>
                            </el-input> -->
                            <el-date-picker
                                v-model="contract.deadline"
                                type="date"
                                format="yyyy-MM-dd" value-format="yyyy-MM-dd" 
                                placeholder="请输入到期时间"
                                style="width:100%">
                            </el-date-picker>
                        </div>
                    </div>
                    <div class="form-one-input">
                        <p class="mandatory"><span>*</span>其他 :</p>
                        <div class="input">
                            <el-input placeholder="请输入其他" v-model="contract.other" clearable>
                            </el-input>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        <!-- 底部附件及按钮 -->
        <footer>
            <div class="eclosure">
                <p class="font14-isbold-3"><span>*</span>相关附件 :</p>
                <div class="textarea font14-nobold-9">
                    <el-button style="margin-right:20px;" class="upBtn"><i class="el-icon-upload"></i>上传附件<input
                            type="file" ref="file" id="file" @change="upChan" name="file"></el-button>
                    支持格式：.rar .zip .doc .docx .pdf ，单个文件不能超过10MB
                </div>
            </div>
            <div class="eclosure" style="margin-top:10px;">
                <p class="font14-isbold-3"></p>
                <div class="textarea font14-nobold-9">
                    <i class='el-icon-folder' v-for="(item,index) in files" :key="index">{{item.name}}</i>
                </div>
            </div>
            <div class="font14-nobold-9">

            </div>
            <div class="btn">
                <el-button type="primary" @click="save">保存</el-button>
                <el-button @click="back()">取消</el-button>
            </div>
        </footer>

    </div>
</template>
<script>
import Department from '@/components/table/Department.vue'
import Rank from '@/components/table/Rank.vue'
import Position from '@/components/table/Position.vue'
    export default {
        components:{
            Department,
            Rank,
            Position
        },
        data() {
            return {
                logoImg:'',//用户头像
                base: {
                    // name: '林',
                    // contact: '联系人',
                    // email: '邮箱',
                    // depart: {label:""},
                    // rank: 'rank',
                    // top: 'top',
                    // sex: 'sex',
                    // wechat: 'wechat',
                    // num: 'num',
                    // status: '',
                    // auth: 'auth',
                    // phone: 'phone'
                },
                per: {
                    // name: 'name',
                    // birth: 'birth',
                    // nation: 'nation',
                    // educa: '',
                    // major: 'major',
                    // huType: '',
                    // addr: 'addr',
                    // contact: 'contact',
                    // sonType: 'sonType',
                    // idNum: 'idNum',
                    // age: 'age',
                    // hometown: 'hometown',
                    // school: 'school',
                    // date: 'date',
                    // huWhere: 'huWhere',
                    // polit: '',
                    // man: 'man',
                    // address: 'address'
                },
                contract: {
                    // num: 'num',
                    // appType: '',
                    // sta_time: 'sta_time',
                    // end_time: 'end_time',
                    // content: 'content',
                    // conType: '',
                    // posi: '',
                    // deadline: 'deadline',
                    // other: 'other',
                },
                denger:[
                    {value:1,label:'男'},
                    {value:2,label:'女'},
                ],
                appTypes:[],
                username:'用户名',
                alluser:'',//所有人员
                department:{},
                position: '职位',
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
                    { label: '实习合同', value: '实习合同'},
                    { label: '劳务合同', value: '劳务合同'}
                ],
                educas:[],
                value: '',
                files: [],
                file_ids: [],
                ids_str: '',
                posis:[]
            }
        },
        methods: {
            getPosis(){
                this.$http.get('user/positions',{token:localStorage.getItem('token')}).then(res=>{
                    this.posis = res
                })
            },
            getAppTypes(){//应聘类型
                this.$http.get('user/modality',{token:localStorage.getItem('token')}).then(res=>{
                    this.appTypes = res
                })
            },
            opChan(e) {
                console.log(e)
            },
            // 文件图片
            upChan() {
                console.log(this.$refs.file.files[0])
                this.$http.upload(this.$refs.file.files[0]).then(res => {
                    if (res.data.code == 1) {
                        this.$message('上传成功')
                        this.files.push({ name: this.$refs.file.files[0].name, msg: res.data.msg })
                        this.file_ids.push(res.data.msg.id)
                        console.log(res.data.msg.id, 'iiiiiiiiiiiii')
                        for (let i in this.file_ids) {
                            if (i == this.file_ids.length - 1) {
                                this.ids_str += this.file_ids[i]
                            } else {
                                this.ids_str += this.file_ids[i] + ','
                            }
                        }
                    }
                })
            },
            ImgChan() {
                console.log('上传')
                console.log(this.$refs.files.files[0])
                this.$http.Imgupload(this.$refs.files.files[0]).then(res => {
                    console.log(res)
                    this.logoImg = res.data.msg;
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
            getCustomerData(val){
                // console.log(val.label)
                this.department = val
            },
            // 获取职位
            getPositionData(val){
                console.log(val)
                this.position = val
            },
            // 获取职级
            getRankData(val){
                this.base.rank = val
            },
            save() {
                console.log(this.department.id)
                console.log(this.contract.conType)
                if(!this.base.name){
                    console.log(this.base.name)
                    return this.$message('姓名不能为空')
                }
                if(!this.base.sex){
                    console.log(this.base.sex)
                    return this.$message('性别不能为空')
                }
                if(!this.base.phone){
                    console.log(this.base.phone)
                    return this.$message('联系电话不能为空')
                }
                console.log(this.per.phone)
                if(!this.per.phone){
                    return this.$message('紧急联系电话不能为空')
                }
                if(!this.base.num){
                    return this.$message('工号不能为空')
                }
                if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.per.phone && this.base.phone))){ 
                    this.$message('不是完整的11位手机号或者正确的手机号前七位')
                    return false; 
                } 
                this.$http.post('user/add', {
                    token: localStorage.getItem('token'),
                    'info[head]':this.logoImg.path,
                    'info[name]': this.base.name,//基础信息
                    'info[account]': this.base.phone,
                    'info[email]': this.base.email,
                    // 'info[structure_id]': this.base.depart,//部门
                    'info[structure_id]':this.department.id,
                    'info[rank]': this.base.rank,
                    'info[superior]': this.base.top,
                    'info[gender]': this.base.sex,
                    'info[wechat]': this.base.wechat,
                    'info[job_number]': this.base.num,
                    'info[status]': this.base.status,
                    'info[role_id]': this.base.auth,
                    'user[name]': this.per.name,//个人信息
                    'user[id_card]': this.per.idNum,
                    'user[birthday]': this.per.birth,
                    'user[nation]': this.per.nation,
                    'user[education]': this.per.educa,
                    'user[major]': this.per.major,
                    'user[node_type]': this.per.huType,
                    'user[residence]': this.per.address,
                    'user[contacts_name]': this.per.man,
                    'user[children]': this.per.sonType,
                    'user[age]': this.per.age,
                    'user[native_place]': this.per.hometown,
                    'user[school]': this.per.school,
                    'user[graduation]': this.per.date,
                    'user[registered_residence]': this.per.huWhere,
                    'user[political_outlook]': this.per.polit,
                    'user[contacts_phone]': this.per.phone,
                    'agree[number]': this.contract.num,//合同信息
                    'agree[type]': this.contract.type,
                    'agree[modality]': this.contract.appType,
                    'agree[position]': this.contract.posi,
                    'agree[begin_time]': this.contract.sta_time,
                    'agree[end_time]': this.contract.end_time,
                    'agree[trial_time]': this.contract.deadline,
                    'agree[content]': this.contract.content,
                    'agree[other]': this.contract.other,
                    'agree[appendix]': this.ids_str//附件
                }).then(res => { 
                    console.log(res)
                })
            },
            getDeprats() {
                this.$http.get('index/structure', {}).then(res => {
                    this.departs = res
                })
                this.$http.get('user/alluser',{token:localStorage.getItem('token')}).then(res=>{
                    console.log(res)
                    this.alluser = res
                })

            },
            getEducas(){
                this.$http.get('user/education',{token:localStorage.getItem('token')}).then(res=>{
                    this.educas = res
                })
            },
        },
        created() {
            this.getDeprats()
            this.getEducas()
            this.getAppTypes()
            this.getPosis()
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
            topPosi(){
                for (let i in this.posis) {
                    if (this.posis[i].id == this.contract.posi) {
                        return this.posis[i].name
                        break
                    }
                }
            },
            toNum(){},
            topTime(){}
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
        .user-img{
            position: relative;
            width: 150px;
            height: 180px;
            overflow: hidden;
            border: 1px solid #ddd;
            img {
                width:100%;
                height:100%;
            }
            div,p{
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
                input,p{
                    width:100%;
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
            align-items: center;

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
</style>