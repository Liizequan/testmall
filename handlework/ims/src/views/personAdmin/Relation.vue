<template>
    <div class="contain">
        <div class="relation"  v-if="this.$route.path =='/relation'">
            <!-- 头部 -->
            <div class="header">
                <!-- 转正、离职 -->
                <header>
                    <div class="between flex-items-center">
                        <div>
                            <el-link :underline="false" @click="tabbar = 0, invalue =[]" :type='tabbar ==0 ? "primary" : ""' 
                                style="display:inline-block;font-size:18px; padding-right:30px; font-weight:bold">转正管理</el-link>
                            <el-link :underline="false" @click="tabbar = 1, outvalue = []" :type='tabbar ==1 ? "primary" : ""' 
                                style="display:inline-block;font-size:18px; padding-right:30px; font-weight:bold">离职管理</el-link>
                        </div>
                        <div class="right between font14-nobold-9">
                            <el-button type='primary' v-if="tabbar==0" @click="goto">转正申请</el-button>
                            <el-button type='primary' v-else @click="goto">离职申请</el-button>
                        </div>
                    </div>
                    <div class="between bottom">
                        <span>共有<span  v-if="tabbar==0">{{inData.length}}</span><span v-else>{{outData.length}}</span> 条转正信息</span>
                        <div class="right font14-nobold-9">
                            <!-- <el-link :underline="false"><span><i class="el-icon-upload2"></i>导入</span></el-link> -->
                            <!-- <el-link :underline="false" @click="output"><span><i class="el-icon-download"></i>导出</span></el-link>
                            <el-link :underline="false" @click="deleteData"><span><i class="el-icon-delete"></i>批量删除</span></el-link> -->
                        </div>
                    </div>
                </header>
            </div>
            <!-- 表格 -->
            <div class="table">
                <!-- 转正 -->
                <div class="is-table" v-if="tabbar==0">
                    <el-table stripe
                    :header-cell-style="$store.state.headStyle"
                        ref="multipleTable"
                        :data="inData"
                        tooltip-effect="dark"
                        style="width: 100%;text-align:center"
                        :default-sort = "{prop: 'date', order: 'descending'}"
                        @selection-change="inDataChange"
                        v-loading="loading">
                        <el-table-column  type="selection"  width="55">
                        </el-table-column>
                        <el-table-column prop="job_number"  label="员工编号">
                        </el-table-column>
                        <el-table-column prop="name"  label="名称">
                        </el-table-column>
                        <el-table-column prop="structure_id"  label="部门">
                        </el-table-column>
                        <el-table-column prop="position_id"  label="职位">
                        </el-table-column>
                        <el-table-column prop="correction_time" label="试用期到期日">
                        </el-table-column>
                        <el-table-column prop="entry_time" label="入职日期">
                        </el-table-column>
                        <el-table-column prop="status" label="审批状态">
                        </el-table-column>
                        <el-table-column label="操作" class="btn">
                            <template slot-scope="scope" v-if="tabbar==0">
                                <!-- <div @click="goNoticeDetail(scope.row.id,'in')">
                                    <a href="javascript:;" style="color:#409EFF;text-decoration: none;">详情 <i class="el-icon-arrow-right"></i> </a>
                                </div> -->
                                <div>
                                    <el-link type="primary"  @click="goNoticeDetail(scope.row.id,'in')">详情<i class="el-icon-arrow-right"></i></el-link>
                                    <!-- <el-link type="primary" @click="del(scope.row.id,'in')">删除<i class="el-icon-delete"></i></el-link> -->
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <!-- 离职 -->
                <div class="is-table" v-else>
                    <el-table stripe
                    :header-cell-style="$store.state.headStyle"
                        ref="multipleTable"
                        :data="outData"
                        tooltip-effect="dark"
                        style="width: 100%;text-align:center"
                        :default-sort = "{prop: 'date', order: 'descending'}"
                        @selection-change="outDataChange"
                        v-loading="loading"
                        border>
                        <el-table-column  type="selection"  width="55">
                        </el-table-column>
                        <el-table-column prop="job_number"  label="工号编号">
                        </el-table-column>
                        <el-table-column prop="name"  label="名称">
                        </el-table-column>
                        <el-table-column prop="structure_id"  label="部门">
                        </el-table-column>
                        <el-table-column prop="position_id"  label="职位">
                        </el-table-column>
                        <el-table-column prop="correction_time"  label="离职日期">
                        </el-table-column>
                        <el-table-column prop="entry_time"  label="入职日期">
                        </el-table-column>
                        <el-table-column prop="status"  label="审批状态">
                        </el-table-column>
                        <el-table-column label="操作" class="btn">
                            <template slot-scope="scope">
                                <!-- <div @click="goNoticeDetail(scope.row.id,'out')">
                                    <a href="javascript:;" style="color:#409EFF;text-decoration: none;">详情 <i class="el-icon-arrow-right"></i> </a>
                                </div> -->
                                <div>
                                    <el-link type="primary" style="margin-right:20px;" @click="goNoticeDetail(scope.row.id,'out')">详情<i class="el-icon-arrow-right"></i></el-link>
                                    <el-link type="primary" @click="del(scope.row.id,'out')">删除<i class="el-icon-delete"></i></el-link>
                                </div>
                            </template>
                        </el-table-column>
                        
                    </el-table>
                </div>
            </div>
            <!-- 分页 -->
            <div class="paging">
                <el-pagination background layout="prev, pager, next" :total="tableData.length">
                </el-pagination>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    data() {
        return {
            inData:[],
            outData:[],
            tabbar:0,//导航
            invalue:'',//选择转正
            outvalue:'',//选择离职
            tableData: [],
            loading:true,
        }
    },
    components:{
        // TablePage
    },
    methods: {
        // 前往添加员工
        goto(){
            if(this.tabbar == 0){//转正this.$router.push('/relation/becomeadd')
                this.$http.get('application/gettime').then(res=>{
                    if(res.code == 0){
                        this.$router.push('/relation/becomeadd')
                    }else{
                        this.$message('一个月只能申请一次')
                    }
                })
            }else{
                this.$router.push('/relation/quitadd')
            }
        },
        // 前往详情
        goNoticeDetail(id,type){
            if(type == 'in'){//转正
                this.$router.push({path:'/relation/becomedetail/',query:{id:id}})
            }else{
                this.$router.push({path:'/relation/quitdetail/',query:{id:id}})
            }
        },
        // 页面数据
        getList(){
            this.$http.get('application/index',{token:localStorage.getItem('token')}).then(res=>{

                this.loading = false
                this.inData = res.data1.data
                this.outData = res.data2.data
            })
        },
        // 转正
        inDataChange(val){
            console.log(val)
            var indataId = [];
            for(var i of val){
                console.log(i.id)
                indataId.push(i.id)
            }
            console.log(indataId)
            this.invalue = indataId.toString()
        },
        // 离职
        outDataChange(val){
            console.log(val)
            var outdataId = [];
            for(var i of val){
                console.log(i.id)
                outdataId.push(i.id)
            }
            console.log(outdataId)
            this.outvalue = outdataId.toString()
        },
        // 单条删除
        del(val,type){
            var title = '';
            if(type == 'in'){
                title = '是否删除转正申请'
            }else{
                title = '是否删除离职申请'
            }
            this.$confirm(title, {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.post('application/del',{
                    // token:this.$token,
                    id:val
                }).then(res=>{
                    console.log(res)
                    if(res.code===1){
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getList()
                    }
                })
            }).catch(() => {      
            });
        },
        // 批量删除
        deleteData(){
            console.log(this.invalue)
            console.log(this.outvalue)
            // if(this.invalue.length == 0 || this.outvalue.length == 0){
            //     return this.$message('请先选择')
            // }
            var title = ''
            if(this.tabbar == 0){
                title='是否删除转正申请'
                if(this.invalue.length == 0){
                    return this.$message('请先选择')
                }
            }else{
                title='是否删除离职申请'
                if(this.outvalue.length == 0){
                    return this.$message('请先选择')
                }
            }
            this.$confirm(title, {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.post('application/del',{
                    // token:this.$token,
                    id:this.invalue || this.outvalue
                }).then(res=>{
                    console.log(res)
                    if(res.code===1){
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getList()
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
            /**/
        },
        // 导出
        
        output() {
            var url = '';
            if(this.tabbar == 0){//转正
                url = 'application/exportzhuan'
            }else{//离职
                url = 'application/exportli'
            }
            this.$http.downloadFile(url)
        },
        
    },
    created(){
        this.getList()
    },
    // 监听路由
    watch: {
        $route(to,form){
            this.getList()
        }
    }
}
</script>
<style lang="less" scoped>
.relation{
    header {
        .bottom{
            margin:20px 0;
        }
        .right{
            display: flex;
            align-items: center;
            span{
                display: inline-block;
                padding-left: 20px;
                i{
                    display: inline-block;
                    padding-right:5px;
                }
            }
        }
    }
    .is-table{
        padding:0 0px 30px 0;
    }
}
/* /deep/.el-link--primary>.el-link--inner{
    display: flex;
    align-items: center;
    width: 50px;
  }
  .is-underline.el-link--primary{
    height: 24px;
  } */
</style>