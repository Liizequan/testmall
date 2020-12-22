<template>
    <div class="admin">
        <!-- 我是管理员 -->
        <div >
            <el-button style="width:180px;height:48px" class="btn-elblue mbom20" type="primary" @click="addAccount">添加账号</el-button></div>
        <div class="table ptop40">
              <el-table  :data="adminListData" style="width: 100%" :cell-style="cellStyle" :header-cell-style="cellClass" :header-row-style="rowClass">
                <!-- <el-table-column
                prop="id"
                label="序号">
                </el-table-column> -->
                <el-table-column
                prop="id"
                label="ID">
                </el-table-column>
                <el-table-column
                prop="name"
                label="管理员名称">
                </el-table-column>
                <el-table-column
                prop="username"
                label="账号">
                </el-table-column>
                <el-table-column
                prop="role"
                label="角色">
                </el-table-column>
                <el-table-column
                prop="createTime"
                label="添加时间">
                </el-table-column>
                <el-table-column
                prop="updateTime"
                label="登录时间">
                </el-table-column>
                <el-table-column
                width="150px"
                label="操作">
                <template slot-scope="scope">
                    <el-button size="small" type="primary" @click="editAdminList(scope.row)">编辑</el-button>
                    <el-button @click="deleteAdmin(scope.row)" size="small">删除</el-button>
                </template>
                </el-table-column>
            </el-table>

        </div>

        <!-- 弹框 -->
        
        <div class="is-dialog">
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
                    <b class="font24">{{!isEdit?'添加' : '编辑'}}账号</b>
                </div>
                <div class="form">
                    <el-form ref="form" label-width="100px">
                        <el-form-item label="管理员名称：">
                            <el-input v-model="name"></el-input>
                        </el-form-item>
                        <el-form-item label="账号： ">
                            <el-input type="" v-model="text" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="密码：" v-if="!isEdit">
                            <el-input v-model="pass" show-password @blur="pwdReg"></el-input>
                        </el-form-item>
                        <el-form-item label="角色：">
                            <!-- <el-input type="" v-model="form.name"></el-input> -->
                            <el-select v-model="roleId" placeholder="请选择">
                                <el-option
                                v-for="item in roleListData"
                                :key="item.name"
                                :label="item.name"
                                :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button style="width:150px;" @click="paymentDialog = false">取 消</el-button>
                    <el-button style="width:150px;" class="btn-elblue" type="primary" @click="submit">确 认</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            // 弹框
            paymentDialog:false,
            name:'',
            text:'',
            pass:'',
            roleListData:[],//角色
            roleId:null,
            adminListData:[],//管理员
            editId:null,//编辑id
            isEdit:false,//编辑状态
        }
    },
    created() {
        this.getRoleData()
        this.getAdminData()
    },
    methods: {
        
        // 样式
        cellStyle({row,column,rowIndex,columnIndex}){
            return 'text-align:center;height:70px;'
        },  
        cellClass({row,rowIndex}){
            return 'text-align:center;'
        },
        rowClass({row,rowIndex}){
            return 'height:50px'
        },
        getRoleData(){
            this.$http.get(this.$api.roleList,{
            },res=>{
                console.log(res)
                this.roleListData = res.data;
            })
        },
        getAdminData(){
            this.$http.get(this.$api.adminList,{
            },res=>{
                console.log(res)
                this.adminListData = res.data;
            })
        },
        pwdReg(){
            console.log(!this.$reg.isPwd(this.pass))
            if(!this.$reg.isPwd(this.pass)){
                this.$message({
                    message: '密码错误，请以8~16为英文、数字为密码',
                    center: true
                });
            }
        },
        editAdminList(val){
            this.editId = val.id
            this.$http.get(this.$api.adminLook + '?id=' + val.id,{
            },res=>{
                console.log(res)
                // this.$message(res.msg)
                var data = res.data
                this.isEdit = true
                this.name = data.name;
                this.text = data.username;
                this.roleId = data.roleId
            })
            this.paymentDialog = true
        },
        deleteAdmin(val){
            console.log(val)
            this.$confirm('是否继续删除该账号?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.post(this.$api.adminDelete,{
                    id:val.id
                },res=>{
                    this.getRoleData()
                    this.getAdminData()
                    this.$message({
                        message: res.msg
                    });
                })
            }).catch(() => {
                this.$message('已取消删除');          
            });
        },
        addAccount(){
            this.paymentDialog = true
            if(this.isEdit){
                this.name = ''
                this.text = ''
                this.pass = ''
                this.roleId = null
            }
            this.isEdit = false
        },
        handleClose(){
            this.paymentDialog = false
            
        },
        submit(){
            if(!this.name){
                return this.$message('管理员名称不能为空')
            }
            if(!this.text){
                return this.$message('账号不能为空')
            }
            if(!this.$reg.isPwd(this.pass) && !this.isEdit){
                return this.$message({
                    message:'密码错误，请以8~16为英文、数字为密码',
                    center: true
                })
            }
            if(!this.roleId){
                return this.$message('请选择您的角色')
            }
            

            if(this.isEdit){//编辑
                this.$http.post(this.$api.adminEdit,{
                    id:this.editId,
                    name:this.name,
                    username:this.text,
                    roleId:this.roleId
                },res=>{
                    console.log(res)
                    this.$message(res.msg)
                    if(res.code ==1 ){
                        this.getRoleData()
                        this.getAdminData()
                        this.paymentDialog = false
                    }
                })
                return
            }
            this.$http.post(this.$api.adminAdd,{//添加
                name:this.name,
                username:this.text,
                password:this.pass,
                roleId:this.roleId
            },res=>{
                console.log(res)
                this.$message(res.msg)
                if(res.code ==1 ){
                    this.paymentDialog = false
                    this.getRoleData()
                    this.getAdminData()
                }
            })
        }
    },
}
</script>
<style lang="less" scoped>
@col9:#999;
@border:1px solid #e5e5e5;
        .status-dialog {
            b{
                height: 50px;
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
            .form{
                margin:0 70px;
            }
        }
</style>