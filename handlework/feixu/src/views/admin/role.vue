<template>
    <div class="admin">
        <!-- 我是角色管理 -->
        <div class="mbom40"><el-button style="width:180px;height:48px" class="btn-elblue mbom20" type="primary" @click="addAccount"> 添加角色</el-button></div>
        <div class="table">
              <el-table  :data="roleListData" style="width: 100%;" :cell-style="cellStyle" :header-cell-style="cellClass" :header-row-style="rowClass">
                <!-- <el-table-column
                prop="date"
                label="序号">
                </el-table-column> -->
                <el-table-column
                prop="id"
                label="ID">
                </el-table-column>
                <el-table-column
                prop="name"
                label="角色名称">
                </el-table-column>
                <el-table-column
                prop="authority"
                label="权限范围">
                    <template slot-scope="scope">
                        <el-popover trigger="hover" placement="right" :width="400" >
                            <!-- <div class="is-user-api">
                                <p v-for="item in scope.row.api" :key="item">{{ item }}</p>
                            </div> -->
                            <el-row :gutter="20">
                                <el-col :span="8" v-for="item in scope.row.api" :key="item.id">{{ item }}</el-col>
                            </el-row>
                            <!-- <div class="name-wrapper"> -->
                                <!-- <el-tag size="medium">查看详情</el-tag> -->
                                <el-link slot="reference"  :underline="false">查看详情</el-link>
                            <!-- </div> -->
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column
                prop="createTime"
                label="添加时间">
                </el-table-column>
                <el-table-column
                label="操作">
                    <template slot-scope="scope">
                        <el-button size="small" type="primary" @click="eidtRole(scope.row)" >编辑</el-button>
                        <el-button @click="deleteRole(scope.row)" size="small">删除</el-button>
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
                    <b class="font24">{{!isEdit?'添加':'编辑'}}角色</b>
                </div>
                <div class="form">
                    <el-form ref="form" label-width="100px">
                        <el-form-item label="角色名：">
                            <el-input v-model="name"></el-input>
                        </el-form-item>
                        <el-form-item v-for="(item,index) in roleList" :key="index" :label="item.name + '：'"  style="margin-bottom:8px;">
                            <el-checkbox-group v-model="checkedRole" @change="handleCheckedCitiesChange">
                                <el-checkbox v-for="(items,index) in item.api" :key="index" :label="items.id">{{items.name}}</el-checkbox>
                            </el-checkbox-group>
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
            roleListData:[],//角色数据列表
            name:'',//角色名
            roleList:[],//角色弹框数据列表
            checkedRole:[],//选中的角色数据
            isEdit:false,//编辑状态
            roleId:null,//编辑id
        }
    },  
    created() {
        this.getRoleData()
        this.getRole()
    },
    methods: {// 样式
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
        getRole(){
            this.$http.get(this.$api.roleData,{
            },res => {
                console.log(res)
                this.roleList = res.data
                var array = [];
                for(var i of res.data){
                    console.log(i)
                    for(var j of i.api){
                        console.log(j.id)
                        if(j.id){
                            array.push(parseInt(j.id))
                        }
                    }
                }
                this.checkedRole = array
            });
        },
        addAccount(){
            this.paymentDialog = true
            this.isEdit = false
            this.name = '';
            this.checkedRole = []
            this.getRole()
        },
        eidtRole(val){//编辑
            this.roleId = val.id
            this.$http.get(this.$api.roleLook,{
                id:val.id
            },res=>{
                var authority = res.data.authority.split(',');
                var newAuthority = []
                for(var i of authority){
                    console.log(i)
                    newAuthority.push(parseInt(i))
                }
                this.checkedRole = newAuthority
                this.name = res.data.name
            })
            this.paymentDialog = true
            this.isEdit = true
        },
        deleteRole(val){//删除
            this.$confirm('是否继续删除该角色?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.post(this.$api.roleDelete,{
                    id:val.id
                },res=>{
                    this.$message(res.msg)
                    this.getRoleData()
                    this.getRole()
                })
            }).catch(() => {
                this.$message('已取消删除');          
            });
        },
        handleClose(){
            this.paymentDialog = false
            
        },
        handleCheckedCitiesChange(val){
            console.log(val)
        },
        submit(){
            console.log('确认')
            
            if(!this.name){
                return this.$message('角色名不能为空')
            }
            if(this.isEdit){//编辑
                this.$http.post(this.$api.roleEdit,{
                    id:this.roleId,
                    name:this.name,
                    authority:this.checkedRole,
                },res =>{
                    console.log(res)
                    this.paymentDialog = false
                    this.$message(res.msg);
                    if(res.code == 1){
                        this.getRoleData()
                        this.getRole()
                        this.checked = true
                    }
                })
                return 
            }
            this.$http.post(this.$api.roleAdd,{//添加 
                name:this.name,
                authority:this.checkedRole,
            },res =>{
                console.log(res)
                this.paymentDialog = false
                this.$message(res.msg);
                if(res.code == 1){
                    this.getRoleData()
                    this.getRole()
          
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
        .is-user-api{
            display: flex;
            flex-wrap: wrap;
            p{
                width:100px;
            }
        }
    }
</style>