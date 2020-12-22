<template>
    <div class='viewpoint contain'>
        <el-table :data="tableData" stripe :header-cell-style="$store.state.headStyle">
            <!-- <el-table-column type="selection"></el-table-column>  @selection-change="allChan"-->
            <el-table-column prop="id" label="客户编号" width="80"></el-table-column>
            <el-table-column prop="name" label="客户名称"></el-table-column>
            <el-table-column prop="phone" label="联系电话" width="120px;"></el-table-column>
            <el-table-column prop="industry" label="行业">
                <!-- :filters="industry" :filter-method="filterIndustry" -->
            </el-table-column>
            <el-table-column prop="source" label="客户来源"></el-table-column>
            <el-table-column prop="status" label="客户状态" :filters="[
                { text: '重要', value: '重要' },
                { text: '普通', value: '普通' },
                { text: '潜在', value: '潜在' },
                { text: '失败', value: '失败' }
              ]"></el-table-column>
              <!-- :filter-method="filterStatus -->
            <el-table-column prop="user_id" label="客户经理"></el-table-column>
            <el-table-column prop="create_time" sortable label="创建日期" width="160px;"></el-table-column>
            <el-table-column label="关注">
                <template slot-scope="scope">
                    <div @click="setStar(scope.row.id,scope.row.is_follow)">
                        <el-rate :max="1" v-model="scope.row.is_follow" disabled></el-rate>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="180">
                <!-- <template>
                <el-link type="primary" @click="toDetail">详情<i class="el-icon-arrow-right"></i></el-link>
              </template> -->
                <template slot-scope="scope">
                    <div>
                        <a href="javascript:scrollTo(0,0);" style="color:#409EFF;text-decoration: none;"
                            @click="toDetail(tableData[scope.$index].id)">详情 <i class="el-icon-arrow-right"></i></a>
                        <!-- <el-link type="primary" @click="addUser(scope.row.id)">添加成员</el-link> -->
                    </div>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                res: '',
                tableData: null
            }
        },
        methods: {
            toDetail(id) {
                this.$router.push({
                    path: "/customMana/cusDetl", query: {
                        id: id
                    }
                });

            },
            getList(page) {
                this.$http.get('marketing/my', { token: localStorage.getItem('token'), page: page || 1 }).then(res => {
                    this.res = res
                    this.tableData = res.msg.data
                })
            },
            setStar(id, is_follow) {
                if (!is_follow) {
                    this.$http.post('customer/dofollow', { customer_id: id }).then(res => {
                        this.$message(res.msg)
                        if (res.code == 1) {
                            this.getList()
                        }
                    })
                } else {
                    this.$http.post('customer/delfollow', { customer_id: id }).then(res => {
                        this.$message(res.msg)
                        if (res.code == 1) {
                            this.getList()
                        }
                    })
                }
            },
        },
        watch: {
            $route(){
                this.getList()
            }
        },
        created() {
            this.getList()
        }
    }
</script>
<style lang='less' scoped>
    .viewpoint {
        margin: 30px auto;
        padding: 30px;
        background: #fff;
        width: 1140px;
    }
</style>