<template>
    <div class="contain">
        <div class="staff" v-if="this.$route.path =='/staff'">
            <!-- 头部 -->
            <div class="header">
                <!-- 全部 -->
                <!-- <header class="between" v-if="tabbar==0">
                    <div class="left">
                        <el-button type="primary" @click="goto" style="width:120px;"><i class="el-icon-plus"></i> 新增员工
                        </el-button>
                        <el-link :underline="false" @click="tabbar = 0" :type='tabbar ==0 ? "primary" : ""'
                            style="margin-left:30px;" class="font18-bold-3">全部</el-link>
                        <el-link :underline="false" @click="tabbar = 1" :type='tabbar ==1 ? "primary" : ""'
                            style="margin-left:30px;" class="font18-bold-3">生日提醒</el-link>
                    </div>
                    <div class="right between font14-nobold-9">
                        <el-link :underline="false"><span><i class="el-icon-upload2"></i>导入</span></el-link>
                        <el-link :underline="false"><span><i class="el-icon-download"></i>导出</span></el-link>
                        <el-link :underline="false" @click="delMem"><span><i class="el-icon-delete"></i>删除</span>
                        </el-link>
                    </div>
                </header> -->
                <!-- 生日提醒 -->
                <!-- <header class="between" v-else>
                    <div class="left">
                        <el-button type="primary" @click="goto" style="width:120px;"><i class="el-icon-upload2"></i> 导出
                        </el-button>
                        <el-link :underline="false" @click="tabbarTab(0)" :type='tabbar ==0 ? "primary" : ""'
                            style="margin-left:30px;" class="font18-bold-3">全部</el-link>
                        <el-link :underline="false" @click="tabbarTab(1)" :type='tabbar ==1 ? "primary" : ""'
                            style="margin-left:30px;" class="font18-bold-3">生日提醒</el-link>
                    </div>
                    <div class="right between font14-nobold-9">
                        <el-date-picker v-model="value1" type="daterange" range-separator="至" start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </div>
                </header> -->

                <header class="between">
                    <div class="left">
                        <el-button type="primary" @click="goto" style="width:120px;" v-if="newStaff"><i class="el-icon-plus"></i>新增员工
                        </el-button>
                        <el-link :underline="false" @click="tabbar = 0" :type='tabbar ==0 ? "primary" : ""'
                            style="margin-left:30px;" class="font18-bold-3">全部</el-link>
                        <el-link :underline="false" @click="tabbar = 1" :type='tabbar ==1 ? "primary" : ""'
                            style="margin-left:30px;" class="font18-bold-3">生日提醒</el-link>
                    </div>
                    <div class="right between font14-nobold-9" v-if="tabbar==0">
                        <el-link :underline="false" @click="output"><span v-if="outputAllStaff"><i class="el-icon-download"></i>导出</span>
                        </el-link>
                        <el-link v-if="deleteAllStaff" :underline="false" @click="delMem"><span><i class="el-icon-delete"></i>批量删除</span>
                        </el-link>
                    </div>
                    <div class="right between font14-nobold-9" v-else>
                        <el-date-picker v-model="value1" type="daterange" range-separator="至" start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                        <el-link :underline="false" @click="biroutput"><span><i class="el-icon-download"></i>导出</span>
                        </el-link>
                    </div>
                </header>
            </div>
            <!-- 表格 -->
            <div class="table">
                <!-- 全部 -->
                <template v-if="tabbar==0">
                        <el-table ref="multipleTable" :data="staffData" tooltip-effect="dark" stripe
                            :header-cell-style="$store.state.headStyle" style="width: 100%;text-align:center;margin-top:30px;"
                            :default-sort="{prop: 'date', order: 'descending'}" @selection-change="allChan">
                            <el-table-column type="selection" width="55">
                            </el-table-column>
                            <el-table-column prop="job_number" label="员工编号">
                            </el-table-column>
                            <el-table-column prop="name" label="名称" width="80">
                            </el-table-column>
                            <el-table-column prop="structure_id" label="部门">
                            </el-table-column>
                            <!-- <el-table-column prop="position" label="职位">
                            </el-table-column> -->
                            <el-table-column prop="begin_time" label="合同签订日期" sortable>
                            </el-table-column>
                            <el-table-column prop="end_time" label="合同到期日期" sortable>
                            </el-table-column>
                            <el-table-column prop="account" label="手机号码">
                            </el-table-column>
                            <el-table-column label="状态" width="60"
                                :filters="[{text: '在职', value: '在职'}, {text: '离职', value: '离职'}]"
                                :filter-method="filterHandler">
                                <template slot-scope="scope">
                                    <div :style="scope.row.status=='离职'?'color:red;':''">
                                        {{scope.row.status}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="gender" label="性别" width="60">
                            </el-table-column>
                            <el-table-column label="操作" class="btn">
                                <template slot-scope="scope" v-if="tabbar==0">
                                    <div>
                                        <!-- <a href="javascript:;" style="color:#409EFF;text-decoration: none;">详情 <i
                                                class="el-icon-arrow-right"></i> </a> -->
                                        <el-link type="primary" style="margin-right:20px;"
                                            @click="goNoticeDetail(scope.row.user_id)">详情<i
                                                class="el-icon-arrow-right"></i>
                                        </el-link>
                                        <el-link type="primary" @click="del(scope.row.user_id)">删除<i
                                                class="el-icon-delete"></i></el-link>
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
                </template>
                <!-- 生日 -->
                <template v-if="tabbar==1">
                    <div class="is-table">
                        <el-table ref="multipleTable" :data="birthData" tooltip-effect="dark"
                            style="width: 100%;text-align:center" :default-sort="{prop: 'date', order: 'descending'}"
                            stripe :header-cell-style="$store.state.headStyle">
                            <el-table-column type="selection" width="55">
                            </el-table-column>
                            <el-table-column prop="job_number" label="员工编号">
                            </el-table-column>
                            <el-table-column prop="name" label="名称">
                            </el-table-column>
                            <el-table-column prop="gender" label="性别">
                            </el-table-column>
                            <el-table-column prop="birthday" label="出生日期">
                            </el-table-column>
                            <el-table-column prop="next" label="下一次生日">
                            </el-table-column>
                            <el-table-column prop="age" label="年龄">
                            </el-table-column>
                            <el-table-column prop="account" label="手机号码">
                            </el-table-column>
                            <el-table-column label="操作" class="btn">
                                <template slot-scope="scope">
                                    <div>
                                        <!-- <a href="javascript:;"  @click="goNoticeDetail(scope.row.user_id)" style="color:#409EFF;text-decoration: none;">详情 <i class="el-icon-arrow-right"></i> </a> -->

                                        <el-link type="primary" style="margin-right:20px;"
                                            @click="goNoticeDetail(scope.row.user_id)">详情<i
                                                class="el-icon-arrow-right"></i>
                                        </el-link>
                                        <el-link type="primary" @click="del(scope.row.user_id)">删除<i
                                                class="el-icon-delete"></i></el-link>
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </template>
            </div>
            <!-- 分页 -->
            <div class="paging">
                <!-- <el-pagination background layout="prev, pager, next" :total="birthData.length" prev-text='上一页'
                    next-text='下一页'>
                </el-pagination> -->
                <div v-if="tabbar == 0">
                    <el-pagination background layout="prev, pager, next" :total="staffDatares.total"
                        style="padding-top:30px;" @current-change="pageChan">
                    </el-pagination>
                </div>
                <div v-else>
                    <el-pagination background layout="prev, pager, next" :total="birthDatares.total"
                        style="padding-top:30px;" @current-change="pageChan">
                    </el-pagination>
                </div>
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
                tabbar: 0,//导航
                value1: '',//日期
                // allData: [],
                selected_ids: '',//选中的成员
                staffData: [],//所有员工
                staffDatares: '',
                birthData: [],
                birthDatares: '',


                // 员工编号
            }
        },
        components: {
            // TablePage
        },
        methods: {
            filterHandler(value, row) {
                return row.status === value;
            },
            // 全部员工导出
            output() {
                this.$http.downloadFile('user/exportuserlist')
            },
            // 生日导出
            biroutput() {
                this.$http.downloadFile('user/exportbirthday')
            },
            delMem() {
                console.log(this.selected_ids)
                if (this.selected_ids) {

                    this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {

                        this.$http.post('user/del', { token: localStorage.getItem('token'), user_id: this.selected_ids }).then(res => {
                            this.$message(res.msg)
                            if (res.code == 1) {
                                this.getStaff()
                                // this.$message({
                                //     type: 'success',
                                //     message: '删除成功!'
                                // });
                            }
                        })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                } else {
                    this.$message('请选择员工')
                }

            },
            del(val) {
                console.log(val)
                this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.post('user/del', { token: localStorage.getItem('token'), user_id: val }).then(res => {
                        this.$message(res.msg)
                        if (res.code == 1) {
                            this.getStaff()
                        }
                    })
                }).catch(() => {
                });

            },
            // 前往添加员工
            goto() {
                this.$router.push('/staff/add')
            },
            // 前往详情
            goNoticeDetail(index, rows) {
                this.$router.push('/staff/detail/' + index)
            },
            // 员工编号
            filterTag() {

            },
            // 人事行政
            getStaff(page) {
                this.$http.get('user/userlist', { token: localStorage.getItem('token'), page: page || 1 }).then(res => {
                    console.log(res)
                    this.staffDatares = res
                    for (let i in res.data) {
                        if (!res.data[i].structure_id) {
                            res.data[i].structure_id = '全部'
                        }
                    }
                    this.staffData = res.data
                })
            },
            // 生日提醒
            getBirth(page) {
                this.$http.get('user/birthday', { token: localStorage.getItem('token'), page: page || 1 }).then(res => {
                    console.log(res)
                    this.birthDatares = res
                    this.birthData = res.data
                })
            },
            // 选中用户
            allChan(val) {
                this.selected_ids = ''
                for (let i in val) {
                    if (i == val.length - 1) {
                        this.selected_ids += val[i].user_id
                    } else {
                        this.selected_ids += val[i].user_id + ','
                    }
                }
                console.log(this.selected_ids, 'vvvvvvvvvvvv')
            },
            pageChan(page) {
                if (this.tabbar == 0) {
                    console.log('我是所有')
                    this.getStaff(page)
                } else {
                    console.log('我是生日')
                    this.getBirth(page)
                }
            },
            tabbarTab(val) {
                this.tabbar = val
                if (val == 0) {
                    this.getStaff()
                } else if (val == 1) {
                    this.getBirth()
                }
            }
        },
        watch:{
            $route(){
                this.getBirth()
                this.getStaff()
            }
        },
        created() {
            this.deleteAllStaff = this.$http.allow('批量删除员工')
            this.outputAllStaff = this.$http.allow('导出员工')
            this.newStaff = this.$http.allow('新增员工')
            this.getBirth()
            this.getStaff()
        }
    }
</script>
<style lang="less" scoped>
    .staff {
        header .right {
            display: flex;
            align-items: center;

            span {
                display: inline-block;
                padding-left: 20px;

                i {
                    display: inline-block;
                    padding-right: 5px;
                }
            }
        }

        .is-table {
            padding: 30px 0;
        }
    }
</style>