<template>
    <div class='staffLink contain'>
        <div class="searchCon">
            <el-input placeholder="输入姓名/部门搜索" class="search" v-model="key" @change="searching"></el-input>
        </div>
        <el-table :data="tableData.data" stripe
        :header-cell-style="$store.state.headStyle">
            <el-table-column label="姓名" prop="name"></el-table-column>
            <!-- <el-table-column label='工号' prop='job_number'></el-table-column> -->
            <el-table-column label='手机号' prop='account'></el-table-column>
            <el-table-column label='微信/QQ' prop='wechat'></el-table-column>
            <el-table-column label='邮箱' prop='email' width="180"></el-table-column>
            <el-table-column label='部门' prop='structure_id'></el-table-column>
            <el-table-column label='职位' prop='position'></el-table-column>
            <el-table-column label='员工状态' prop='status'></el-table-column>
        </el-table>
        <el-pagination background layout="prev,pager,next" :total="tableData.total" class="pagination" @current-change="getList"></el-pagination>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                tableData:'',
                key:''
            }
        },
        methods: {
            getList(page){
                this.$http.get('user/userworklist', { token: localStorage.getItem('token'),page:page||1 }).then(res =>{
                    this.tableData = res
                })
            },
            searching(){
                this.$http.get('user/userlistsearch',{
                    text:this.key
                }).then(res=>{
                    this.tableData = res
                })
            }
        },
        watch: {
            $route(){
            this.getList()}
        },
        created() {
            this.getList()
        }
    }
</script>
<style lang='less' scoped>
    .staffLink{
        margin:30px;
        padding:30px;
        background:#fff;
    }
    .pagination{
        margin-top:30px;
    }
    .search{
        width:300px;
    }
    .searchCon{
        text-align:right;
        margin-bottom:20px;
    }
    .contain{
        margin:0 auto;
        margin-top:30px;
    }
</style>