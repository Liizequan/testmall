<template>
    <div class="add-order">
        <!-- 新建客户 -->
        <div >
            <div class="between items-center order-top">
                <h4 class="top-title">{{this.$route.query.id ? '编辑' : '新建'}}客户</h4>
                <span>{{newTime}}</span>
            </div>
            <ul>
                <!-- 基本信息 -->
                <li class="base ptop30">
                    <!-- 8位日期+6位随机数字 -->
                    <p style="font-size:18px;font-weight:bold">基本信息</p>
                    <el-row :gutter="20" class="is-row ptop40">
                        <el-col :span="5">
                            <div class="items-center">
                                <span> 客户类型：</span>
                                <p class="flex1">
                                    <!-- <el-input></el-input> -->
                                    <el-select v-model="custom.type" placeholder="请选择">
                                        <el-option
                                        v-for="item in discomList"
                                        :key="item.id"
                                        :label="item.types"
                                        :value="item.id">
                                        </el-option>
                                    </el-select>
                                </p>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20" class="ptop20">
                        <el-col :span="8">
                            <div class="items-center">
                                <span>客户名称：</span>
                                <p class="flex1"><el-input v-model="custom.username"></el-input></p>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="items-center">
                                <span>联系人：</span>
                                <p class="flex1"><el-input v-model="custom.contact"></el-input></p>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="items-center">
                                <span>联系电话：</span>
                                <p class="flex1"><el-input v-model="custom.phone"></el-input></p>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20" class="ptop20">
                        <el-col :span="8">
                            <div class="items-center">
                                <span>联系邮箱：</span>
                                <p class="flex1"><el-input v-model="custom.email" @blur="isEmail(custom.email)"></el-input></p>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="items-center">
                                <span>联系地址：</span>
                                <p class="flex1 between" style="padding-top:0;">
                                    <el-cascader
                                        slot="prepend"
                                        style="margin-right:10px;"
                                        class="flex1"
                                        v-model="custom.addresss"
                                        :options="options"
                                        @change="handleChange">
                                    </el-cascader>
                                    <el-input v-model="custom.detail" class="flex1">
                                    </el-input>
                                </p>
                            </div>
                        </el-col>
                    </el-row>
                </li>
                <!-- 收付账号 -->
                <li class="goods-list">
                    <div class="list-title">
                        <p>收付账号</p>
                    </div>
                    <div class="receive-border">
                        <el-row :gutter="20" class="ptop20">
                            <el-col :span="8">
                                <div class="items-center">
                                    <span>开户人：</span>
                                    <p class="flex1"><el-input v-model="custom.name"></el-input></p>
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="items-center">
                                    <span>银行账号：</span>
                                    <p class="flex1"><el-input v-model="custom.account" maxlength="19" @blur="bankReg(custom.account)"></el-input></p>
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="items-center ">
                                    <span>所属银行：</span>
                                    <p class="flex1"><el-input v-model="custom.bank"></el-input></p>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </li>
                <!-- 其他备注及附件 -->
                <li class="goods-list autofu">
                    <div class="list-title">
                        <p>其他备注及附件</p>
                    </div>
                    
                    <div class="receive-border receivable">
                        <!-- <div class="items-center beizhu">
                            <span>备注：</span>
                            <p style="width:600px; margin-left:40px;">
                                <el-input type="textarea"></el-input>
                            </p>
                        </div>   -->
                        <el-row :gutter="20" class="is-row ptop20">
                            <el-col :span="12">
                                <div class="flex">
                                    <span style="display:inline-block;width:65px;">备注：</span>
                                    <el-input type="textarea" v-model="custom.remark" style=""></el-input>
                                </div> 
                            </el-col>
                            <el-col :span="12">
                                <div class="flex">
                                    <span style="display:inline-block;width:100px;">主营项目：</span>
                                    <el-input type="textarea" v-model="custom.project" style=""></el-input>
                                </div> 
                            </el-col>
                        </el-row>
                        <!-- <div class="items-center ptop20">
                            <span style="display:inline-block;width:65px;">附件：</span>
                            <p>
                                <el-button>上传</el-button>
                            </p>
                        </div>  
                        <p style="margin-left: 65px;padding-top: 15px">
                            * 附件格式仅支持：word、pdf、excel、jpg、png格式文件
                        </p> -->
                        <el-upload
                            class="upload-demo ptop20"
                            :action="this.$http.fileUrl"
                            :beforeUpload="beforeAvatarUploadPdf"  
                            :on-success="handleAvatarSuccess"
                            :file-list="fileList"
                            ref="upload"
                            :before-remove="removeUpload">
                            <div class="items-center">
                                <span style="width:50px;text-align:left">附件：</span>
                                <p>
                                    <el-button>上传</el-button>
                                </p>
                            </div>  
                            <p style="margin-left:55px;padding-top: 15px" slot="tip" >
                                * 附件格式仅支持：word、pdf、excel、jpg、png格式文件
                            </p>
                        </el-upload>
                    </div>
                </li>
            </ul>
            <div class="btn">
                <div class="txt-center">
                    <el-button style="width:160px" @click="save" type="primary" class="btn-elblue" >保存</el-button>
                    <!-- <el-button style="width:160px" save(20)>存到草稿</el-button> -->
                    <el-button style="width:160px" @click="reset()">重置表单</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            
            discomList:[
                {id:1,types:'个人'},
                {id:2,types:'公司'}
            ],//公司个人选项
            options: [],
            value: '',

            custom:{
                type:1,//客户类型
                username:'',//客户名称
                contact:'',//联系人
                phone:'',//联系电话
                email:'',//联系邮箱
                addresss:[],//联系地址
                detail:'',//详细地址
                name:'',//名称
                account:'',//银行账号
                bank:'',//所属银行
                remark:'',//备注
                project:'',//主营项目
                files:[],//附件
            },
            fileList:[],//附件
            newTime:'',//当前时间
        }
    },
    created() { 
        var day2 = new Date();
        this.newTime = day2.getFullYear()+"-" + (day2.getMonth()+1) + "-" + day2.getDate();
        this.getRegion()
        this.getUserLook()
    },
    methods: {
        
        getUserLook(){
            if(this.$route.query.id){
                this.$http.get(this.$api.userLook,{
                    id:this.$route.query.id
                },res=>{
                    console.log(res)
                    if(res.code ==1){
                        this.custom = res.data
                        var file = res.data.file
                        var fileArray = []
                        for(var i of file){
                            console.log(i)
                            fileArray.push(i.id)
                            Object.assign(i,i.fileId)
                        }
                        this.custom.type = parseInt(res.data.typeId)
                        var addresss = res.data.addresssId.split(',')
                        for(var i in addresss){
                            addresss[i] = parseInt(addresss[i])
                        }
                        this.custom.addresss = addresss
                        this.custom.files = fileArray
                        this.fileList = file
                    }
                })
            }
        },
        // 获取地址
        getRegion(){
            this.$http.get(this.$api.region,{},res=>{
                console.log(res)
                this.options = res.data
            })
        },
        // 联系地址
        handleChange(val){
            console.log(val)
        },
        // 银行账号
        bankReg(val){
            console.log(this.$reg.onlyne(val))
            if(!this.$reg.onlyne(val) && val){
                this.$message({
                    message: '银行账号不对',
                    center: true
                });
            }
        },
        beforeAvatarUploadPdf(file){
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
            this.custom.files.push(file.data.id)
        },
        removeUpload(file, fileList){
            console.log('删除附件')
            var files = this.custom.files;
            if(fileList.length!=0){//编辑的时候
                // this.$http.post(this.$api.userDelfile,{
                //     id:file.id,
                // },res=>{
                //     this.$message(res.msg)
                //     for(var i in files){
                //         console.log(files[i],file.id)
                //         if(files[i] == file.id){
                //             this.custom.files.splice(i,1)
                //         }
                //     }
                // })
                for(var i in files){
                    if(files[i] == file.id){
                        this.custom.files.splice(i,1)
                    }
                }
                return 
            }
            for(var i in files){
                if(file.response.data.id == files[i]){
                    this.custom.files.splice(i,1);
                }
            }
        },
        // 提交 
        save(){
            var custom = this.custom
            // return console.log(custom.files)
            if(!custom.type){
                return this.$message('客户类型不能为空')
            }
            if(!this.$reg.isPhone(custom.phone) && custom.phone){
                return this.$message('联系电话错误')
            }
            if(!this.$reg.isEmail(custom.email) && custom.email){
                return this.$message('联系邮箱错误')
            }
            if(custom.addresss.length==0){
                return this.$message('联系地址不能为空')
            }
            if(!this.$reg.onlyne(custom.account) && custom.account){
                return this.$message('银行账号不能为空')
            }
            var url = this.$api.userAdd
            console.log(custom.files)
            var data  = {
                type:custom.type,
                username:custom.username,
                contact:custom.contact,
                phone:custom.phone,
                email:custom.email,
                addresss:custom.addresss,
                detail:custom.detail,
                name:custom.name,
                account:custom.account,
                bank:custom.bank,
                remark:custom.remark,
                project:custom.project,
                file:custom.files.join(','),
            }
            console.log(custom)
            if(this.$route.query.id){//编辑
                url = this.$api.userEdit
                data = Object.assign({id:this.$route.query.id},data)
            }
            this.$http.post(url,data,res=>{
                console.log(res)
                this.$message(res.msg)
                if(this.$route.query.id){
                    return this.back()
                }
                if(res.code == 1){
                    // this.reset()
                }
            })
        },
        
        // 电话正则
        phoneReg(val){
            console.log(val)
            if(!this.$reg.isPhone(val) && val){
                this.$message({
                    message: '联系电话错误',
                    center: true
                });
            
            }
        },
        // 邮箱正则
        isEmail(val){
            if(!this.$reg.isEmail(val) && val){
                this.$message({
                    message: '邮箱格式不对',
                    center: true
                });
            }
        },
        // 重置表单
        reset(){
            this.custom = {
                discom:'',//客户类型
                username:'',//客户名称
                contact:'',//联系人
                phone:'',//联系电话
                email:'',//联系邮箱
                addresss:'',//联系地址
                name:'',//名称
                account:'',//银行账号
                bank:'',//所属银行
                remark:'',//备注
                project:'',//主营项目
                files:'',//附件
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
    .add-order{
        // padding:25px;
        color:@col3;
        // 新增
        .add-list{
            color:@col9;
            font-size: 14/@rem;
            padding:10px 0;
        }
        .goods-list{
            margin-top:40px;
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
            border-bottom: 1px solid #F7F7F7;
        }
        .is-row {
            .between{
                width:480px;
                display: flex;
                padding-top:20px;
                align-items: center;
            }
        }
        .items-center>span{
            display: inline-block;
            // width:75px;
            margin-right: 5px;
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
            .receive-box>p{
                height: 52px;
                line-height: 52px;
                padding-left:20px;
                color: @colf;
                font-size: 16/@rem
            }
        }
        .receive-border .is-row{
            display: flex;
            justify-content: space-between;
        }
        .receive-border .is-row .between{
            width:470px;
        }
        .receive-border .is-norow .between{
            width:100%;
        }
        // 货物
        .goods-list .goods{
            padding-top:0;
        }
        .receive-border{
            border:@border;
            border-top:transparent;
            padding:20px;
            padding-top:0px;
        }

        // 其他备注及附件.
        .beizhu{
            margin:10px 0 20px;
        }
        .btn{
            margin:60px 0 40px;
            .status{
                span{
                    display: inline-block;
                    padding-right: 20px;
                }
            }

        }
    }
</style>