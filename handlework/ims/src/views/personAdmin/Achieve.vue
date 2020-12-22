<template>
    <div class="contain">
        <div class="staff" v-if="this.$route.path =='/achieve'">
            <!-- 头部 -->
            <div class="header">
                <!-- 全部 -->
                <header class="between" v-if="tabbar==0">
                    <div class="left">
                        <el-button type="primary" @click="goto" style="width:120px;"><i class="el-icon-plus"></i> 新增考核</el-button>
                        <el-link :underline="false" type="primary" class="font18-bold-3" style="padding-left:30px;">我的考核</el-link>
                    </div>
                    <div class="right between font14-nobold-9">
                        <!-- <el-link :underline="false"><span><i class="el-icon-upload2"></i>导入</span></el-link> -->
                        <el-link :underline="false" @click="output"><span><i class="el-icon-download"></i>导出</span></el-link>
                        <el-link :underline="false" @click="deleteData"><span><i class="el-icon-delete"></i>批量删除</span></el-link>
                    </div>
                </header>
                <!-- 生日提醒 -->
                <!-- <header class="between" v-else>
                    <div class="left">
                        <el-button type="primary" @click="goto" style="width:120px;"><i class="el-icon-upload2"></i> 导出</el-button>
                        <el-link :underline="false" @click="tabbar = 0" :type='tabbar ==0 ? "primary" : ""' 
                            style="display:inline-block; padding-left:30px; font-weight:bold">全部</el-link>
                        <el-link :underline="false" @click="tabbar = 1" :type='tabbar ==1 ? "primary" : ""' 
                            style="display:inline-block; padding-left:30px; font-weight:bold">生日提醒</el-link>
                    </div>
                    <div class="right between font14-nobold-9">
                         <el-date-picker
                            v-model="value1"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </div>
                </header> -->
            </div>
            <!-- 表格 -->
            <div class="table">
                <!-- 全部 -->
                <div class="is-table">
                    <el-table stripe
                    :header-cell-style="$store.state.headStyle"
                        ref="multipleTable"
                        :data="tableData"
                        tooltip-effect="dark"
                        style="width: 100%;text-align:center"
                        :default-sort = "{prop: 'date', order: 'descending'}"
                        v-loading="loading"
                        @selection-change="handleSelectionChange">
                        <el-table-column  type="selection"  width="55">
                        </el-table-column>
                        <el-table-column prop="name"  label="绩效考核名称">
                        </el-table-column>
                        <el-table-column prop="create_time"  label="考核开始时间">
                        </el-table-column>
                        <el-table-column prop="end_time"  label="考核结束时间">
                        </el-table-column>
                        <el-table-column prop="cycle"  label="考核周期">
                        </el-table-column>
                        <el-table-column prop="user_id" label="考核对象">
                        </el-table-column>
                        <el-table-column prop="structure" label="部门">
                        </el-table-column>
                        <el-table-column prop="status" label="考核状态">
                        </el-table-column>
                        <el-table-column label="操作" class="btn">
                            <template slot-scope="scope" v-if="tabbar==0">
                                <!-- <div @click="goNoticeDetail(tableData[scope.$index].id)"> -->
                                <div>
                                    <!-- <el-link :underline="false" style="margin-right:20px;">详情 <i class="el-icon-arrow-right"></i> </el-link>
                                    <el-link :underline="false">删除 <i class="el-icon-arrow-right"></i> </el-link> -->
                                    <el-link type="primary" style="margin-right:20px;" @click="goNoticeDetail(scope.row.id)">详情<i class="el-icon-arrow-right"></i></el-link>
                                    <el-link type="primary" @click="del(scope.row.id)">删除<i class="el-icon-delete"></i></el-link>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <!-- 生日 -->
                <!-- <div class="is-table" v-else>
                    <el-table
                        ref="multipleTable"
                        :data="tableData"
                        tooltip-effect="dark"
                        style="width: 100%;text-align:center"
                        :default-sort = "{prop: 'date', order: 'descending'}"
                        border>
                        <el-table-column  type="selection"  width="55">
                        </el-table-column>
                        <el-table-column prop="id"  label="员工编号">
                        </el-table-column>
                        <el-table-column prop="name"  label="名称">
                        </el-table-column>
                        <el-table-column prop="danger"  label="性别">
                        </el-table-column>
                        <el-table-column prop="date"  label="出生日期">
                        </el-table-column>
                        <el-table-column prop="nextdate"  label="下一次生日">
                        </el-table-column>
                        <el-table-column prop="age"  label="年龄">
                        </el-table-column>
                        <el-table-column prop="date"  label="出生日期">
                        </el-table-column>
                        <el-table-column prop="date"  label="出生日期">
                        </el-table-column>




                        <el-table-column label="操作" class="btn">
                            <template slot-scope="scope">
                                <div @click="goNoticeDetail(tableData[scope.$index].id)">
                                    <a href="javascript:;" style="color:#409EFF;text-decoration: none;">详情 <i class="el-icon-arrow-right"></i> </a>
                                </div>
                            </template>
                        </el-table-column>
                        
                    </el-table>
                </div> -->
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
// import TablePage from "../../components/TablePage.vue";
export default {
    data() {
        return {
            tabbar:0,//导航
            value1:'',//日期
            tableData: [],
            loading:true,
            selected:[],//选中的
        }
    },
    components:{
        // TablePage
    },
    methods: {
        // 前往添加员工
        goto(){
            this.$router.push('/achieve/add')
        },
        // 前往详情
        goNoticeDetail(index){
            this.$router.push('/achieve/detail/'+index)
        },
        // 删除
        del(index){
            console.log('删除')
            console.log(index)
            this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    this.$http.post('examine/del',{
                        id:index
                    }).then(res=>{
                        console.log(res)
                        this.$message({
                            message: res.msg
                        });
                        if(res.code==1){
                            this.getAchiveData()
                        }
                    })
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        // 导出
        output() {
            this.$http.downloadFile('examine/exort')
        },
        // 绩效考核
        // examine/ myselfy
        getAchiveData(){
            this.$http.get('examine/myselfy',{
                token:localStorage.getItem("token")
            }).then(res=>{
                console.log(res)
                var res = res.data
                this.tableData = res
                this.loading = false
            })
        },
        // 删除数据
        deleteData(index){
            console.log(index)
            console.log(this.selected)
            var arrId = [];
            for(var i of this.selected){
                console.log(i.id)
                arrId.push(i.id)
            }
            if(arrId.length==0){
                return this.$message('请选择需要删除的考核')
            }
            this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    this.$http.post('examine/del',{
                        id:arrId.join(',')
                    }).then(res=>{
                        console.log(res)
                        this.$message({
                            message: res.msg
                        });
                        if(res.code==1){
                            this.getAchiveData()
                        }
                    })
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        // 选中考核
        handleSelectionChange(val){
            console.log(val)
            this.selected = val
        }

    },
    created() {
        this.getAchiveData()
    },
    watch: {
        $route(to, from) {
            this.getAchiveData()
        }
    },
}
</script>
<style lang="less" scoped>  
.staff{
    header .right{
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
    .is-table{
        padding:30px 0;
    }
}
/deep/.el-table__body,/deep/.el-table__header{
    width:100% !important;
}
</style>