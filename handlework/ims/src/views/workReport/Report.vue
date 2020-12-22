<template>
    <div class="contain">
        <!-- 我是工作汇报 -->
        <div class="report" v-if="$route.path == '/report'">
            <header class="between">
                <div class="left">
                    <el-button type="primary" @click="goto"><i class="el-icon-plus"></i> 新增汇报</el-button>
                    <el-button :type="now=='wojieshou'?'primary':''" @click="gomywork">我接收的</el-button>
                    <el-button :type="now=='woxinjian'?'primary':''" @click="getnewbyme">我提交的</el-button>
                    <!-- <el-link :underline="false" @click="gomywork" style="padding-left:20px;" class="font16-bold-3">我接收的</el-link> -->
                </div>
                <div class="right between font14-isbold-3">
                    <div>
                        <span>发起人</span>
                        <!-- <el-autocomplete
                            class="inline-input"
                            v-model="origin"
                            :fetch-suggestions="querySearch"
                            placeholder="请输入内容"
                            @select="Origin"
                        >
                        </el-autocomplete> -->
                        <el-select v-model="sendMan" class="fainput">
                            <el-option v-for="(item,index) in sendMen" :key="index" :label="item.name"
                                :value="item.user_id"></el-option>
                        </el-select>
                    </div>
                    <div>
                        <span>类型</span>
                        <!-- <el-autocomplete
                            class="inline-input"
                            v-model="types"
                            :fetch-suggestions="querySearch"
                            placeholder="请输入内容"
                            @select="Types"
                        >
                        </el-autocomplete> -->
                        <el-select v-model="searchType" class="leiinput">
                            <el-option label="日" value="1"></el-option>
                            <el-option label="周" value="3"></el-option>
                            <el-option label="月" value="2"></el-option>
                            <el-option label="年" value="4"></el-option>
                        </el-select>
                    </div>
                    <el-button type="primary" class="search" @click="searching">搜索</el-button>
                    <!-- <el-button type="primary" @click="getList">全部</el-button> -->
                    <el-button type="primary" @click="batchDelete">批量删除</el-button>
                    <!-- <el-link style="padding-left:10px;" @click="batchDelete" :underline="false"><i class="el-icon-delete"></i>删除</el-link> -->
                </div>
            </header>
            <!-- <div style="text-align:right;padding-top:20px;">
                <el-link type="primary" @click="batchDelete">批量删除</el-link>
            </div> -->
            <div class="table">
                <el-table :data="tempData" @selection-change="handleSelectionChange" stripe
                    :header-cell-style="$store.state.headStyle" style="width: 100%">
                    <el-table-column type="selection" width="55">
                    </el-table-column>
                    <el-table-column prop="title" label="标题">
                    </el-table-column>
                    <!-- <el-table-column prop="text2" label="概要">
                    </el-table-column> -->
                    <el-table-column prop="user_id" label="作者">
                    </el-table-column>
                    <el-table-column prop="approval" label="接收人">
                    </el-table-column>
                    <el-table-column prop="types" label="类型">
                    </el-table-column>
                    <el-table-column prop="status" label="点评" width="150" style="text-align:center">
                    </el-table-column>
                    <el-table-column prop="create_time" label="时间">
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <div>
                                <!-- <a href="javascript:;" style="color:#409EFF;text-decoration: none;">详情1 <i
                                        class="el-icon-arrow-right"></i> </a> -->
                                <el-link type="primary" style="margin-right:20px;" @click="goNoticeDetail(scope.row)">
                                    详情<i class="el-icon-arrow-right"></i></el-link>
                                <el-link type="primary" @click="del(scope.row.id)">删除<i class="el-icon-delete"></i>
                                </el-link>
                            </div>
                            <!-- <div @click="del(scope.row)">
                                <a href="javascript:;" style="color:#409EFF;text-decoration: none;">删除 <i
                                        class="el-icon-arrow-right"></i> </a>
                            </div> -->
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination background layout="prev, pager, next" :total="res.total" style="padding-top:30px;"
                    @current-change="pageChan">
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
                now: 'wojieshou',
                sendMan: '',
                searchType: '',
                restaurants: [],
                // 表格
                tableData: [],
                tempData: [],
                // 发起人
                origin: '',
                // 类型
                types: '',
                sendMen: [],
                arrId: [],//选中人员
                res: '',
                isReport: true,//表示当前是全部
            }
        },
        computed: {
            // 用来计算是年度还是月报、周报、日报
        },
        methods: {
            getnewbyme() {
                this.now = 'woxinjian'
                this.$http.get('report/my').then(res => {
                    for (let i in res.data) {
                        if (res.data[i].type == 1) {
                            res.data[i].types = '日报'
                        } else if (res.data[i].type == 2) {
                            res.data[i].types = '周报'
                        } else if (res.data[i].type == 3) {
                            res.data[i].types = '月报'
                        } else if (res.data[i].type == 4) {
                            res.data[i].types = '年报'
                        }
                    }
                    this.res = res
                    this.tempData = res.data
                })
            },
            // 选中
            // 选择人员
            handleSelectionChange(val) {
                var arrId = [];
                for (let i of val) {
                    arrId.push(i.id)
                    this.arrId = arrId
                }
            },

            // 多条删除
            batchDelete() {
                console.log('批量删除')
                console.log(this.arrId)
                if (this.arrId.length != 0) {
                    this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$http.post('report/delall', {
                            // token:this.$token,
                            id: this.arrId.join(',')
                        }).then(res => {
                            console.log(res)
                            if (res.code == 1) {
                                this.$message(res.msg)
                                this.getList()
                            }
                        })
                    })
                } else {
                    this.$message('请选择删除汇报')
                }
            },
            // 单条删除

            getSendMan() {
                this.$http.get('user/index', { token: localStorage.getItem('token') }).then(res => {
                    for (let i in res) {
                        this.sendMen = [...this.sendMen, ...res[i].user]
                    }
                })
            },
            pageChan(page) {
                // console.log(e, 'eeee')
                // this.tempData = this.$http.getCur(e, this.tableData)
                this.getList(page)
                // this.searching(page)
                this.gomywork(page)
            },
            searching(page) {
                this.isReport = false
                this.$http.post('report/search', {
                    token: localStorage.getItem('token'), page: 1,
                    user_id: this.sendMan,
                    type: this.searchType,
                }).then(res => {
                    console.log(res)
                    var res = res.msg
                    for (let i in res.data) {
                        if (res.data[i].type == 1) {
                            res.data[i].types = '日报'
                        } else if (res.data[i].type == 2) {
                            res.data[i].types = '月报'
                        } else if (res.data[i].type == 3) {
                            res.data[i].types = '周报'
                        } else if (res.data[i].type == 4) {
                            res.data[i].types = '年报'
                        }
                    }
                    this.res = res
                    this.tempData = res.data
                })
            },
            goto() {
                console.log('前往添加')
                this.$router.push('/report/add')
            },
            handleSelect() {
                console.log(1)
            },
            // 前往详情
            goNoticeDetail(row) {
                console.log(row, 'www')
                this.$router.push({ path: '/report/detail/' + row.id, query: { who: row.type } })
            },
            // 删除
            del(row) {
                console.log(row, 'www')
                this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.post('report/del', { token: localStorage.getItem('token'), id: row }).then(res => {
                        this.$message(res.msg)
                        if (res.code == 1) {
                            this.pageChan()
                        }
                    })
                }).catch(() => {
                });
            },
            querySearch(queryString, cb) {
                var restaurants = this.restaurants;
                var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            createFilter(queryString) {
                return (restaurant) => {
                    return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            Origin() {
                console.log('发起人')
            },
            Types() {
                console.log('类型')
            },
            getList(page) {
                this.isReport = true
                this.$http.get('report/index', { token: localStorage.getItem('token'), page: page || 1 }).then(res => {
                    console.log(res)
                    for (let i in res.data) {
                        if (res.data[i].type == 1) {
                            res.data[i].types = '日报'
                        } else if (res.data[i].type == 2) {
                            res.data[i].types = '周报'
                        } else if (res.data[i].type == 3) {
                            res.data[i].types = '月报'
                        } else if (res.data[i].type == 4) {
                            res.data[i].types = '年报'
                        }
                    }
                    this.res = res
                    this.tempData = res.data
                    // this.tableData = res
                    // this.tempData = res.slice(0, 10)
                })
            },
            gomywork(page) {
                this.now = 'wojieshou'
                this.isReport = true
                this.$http.get('report/myreceive', { token: localStorage.getItem('token'), page: page || 1 }).then(res => {
                    for (let i in res.data) {
                        if (res.data[i].type == 1) {
                            res.data[i].types = '日报'
                        } else if (res.data[i].type == 2) {
                            res.data[i].types = '周报'
                        } else if (res.data[i].type == 3) {
                            res.data[i].types = '月报'
                        } else if (res.data[i].type == 4) {
                            res.data[i].types = '年报'
                        }
                    }
                    this.res = res
                    this.tempData = res.data
                })
            }
        },
        watch: {
            $route() {
                this.gomywork()
                this.getSendMan()
            }
        },
        created() {
            // this.getList()
            this.gomywork()
            this.getSendMan()
            this.$bus.$off()
            this.$bus.$on('reportInit', () => { this.getList() })
        }
    }
</script>
<style lang="less" scoped>
    .right>div {

        /* margin-left: 30px; */
        span {
            display: inline-block;
            padding: 0 20px;
        }
    }

    .table {
        padding-top: 30px;
    }

    .search {
        margin-left: 10px;
    }

    .fainput {
        width: 120px;
        margin-right: 10px;
    }

    .leiinput {
        width: 120px;
    }
</style>