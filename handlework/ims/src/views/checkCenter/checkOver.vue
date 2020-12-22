<template>
    <div class="checkOver contain">
        <div v-if="this.$route.path == '/checkOver'">
            <div class="top topBtns">
                <div class="leftBtns">
                </div>
                <div class="right">
                    日期筛选：
                    <el-date-picker type="daterange" :picker-options="pickerOptions" v-model="date" range-separator="至"
                        start-placeholder='开始时间' end-placeholder='结束时间'>
                    </el-date-picker>
                    <el-button type="primary" class="ml10" @click="isCheckCnterData">全部</el-button>
                </div>
            </div>
            <div style="height: 20px;text-align:right;margin-bottom:10px;" v-if="deleteAll">
                <el-link :underline='false' v-if="tabbar == 1" @click="delAll"><i class='el-icon-delete'>批量删除</i>
                </el-link>
            </div>
            <el-table :data="tableData" @selection-change="selChan" stripe
            :header-cell-style="$store.state.headStyle">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column label="审批事由" prop="reason"></el-table-column>
                <el-table-column label="审批类型" prop="type" :filter-method="filterTag" width="100px">
                    <!-- :filters="approvalType -->
                </el-table-column>
                <el-table-column label="申请人" prop="user_id" width="100px"></el-table-column>
                <el-table-column label="申请时间" prop="create_time" sortable></el-table-column>
                <el-table-column label="审批人" prop="approval" width="100px"></el-table-column>
                <el-table-column label="审批时间" prop="update_time" sortable></el-table-column>
                <el-table-column label="审批状态" prop="status" width="100px"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-link type="primary" @click="toDetail(tableData[scope.$index])">详情 <i
                                class="el-icon-arrow-right"></i>
                        </el-link>
                        <el-link :underline='false' type='primary' class='ml20' v-if="tabbar==1"
                            @click="delAll(scope.row.id)">
                            删除<i class='el-icon-delete'></i>
                        </el-link>
                    </template>
                </el-table-column>
            </el-table>

            <el-pagination background layout="prev, pager, next" :total="res.msg.total" style="padding-top:30px;"
                @current-change="pageChan">
            </el-pagination>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                selected: '',
                canDelAll: false,
                bySearch: false,
                res: '',
                imgUrl: require("@/assets/logo.png"),
                dialogShow: false,
                // 导航
                tabbar: 1,
                tabbars: ["全部", "我发起的", "我审批的"],
                tableData: [],
                tempData: [],
                // 审批类型
                approvalType: [],
                date: "",
                pickerOptions: {
                    onPick: (dateRange => {
                        if (!dateRange.maxDate) {
                            return;
                        }
                        var minDate = new Date(dateRange.minDate)
                        var maxDate = new Date(dateRange.maxDate)
                        const resminDate = minDate.getFullYear() + '-' + (minDate.getMonth() + 1) + '-' + minDate.getDate()
                        const resmaxDate = maxDate.getFullYear() + '-' + (maxDate.getMonth() + 1) + '-' + maxDate.getDate()
                        this.bySearch = true
                        this.getTimeData(resminDate, resmaxDate)
                    })
                },//日期选择器
            };
        },
        methods: {
            delAll(id) {
                if (this.$http.testNum(id)) {//单独删除
                    this.$http.conf().then(() => {
                        this.$http.post('approval/delall', {
                            token: localStorage.getItem('token'),
                            id: id
                        }).then(res => {
                            this.$message(res.msg)
                            if (res.code == 1) {
                                this.getList()
                            }
                        })
                    })
                } else {//批量删除
                    if (this.canDelAll && this.selected.length) {
                        this.$http.conf().then(() => {
                            this.$http.post('approval/delall', {
                                token: localStorage.getItem('token'),
                                id: this.$http.getIdsStrByObjArr(this.selected)
                            }).then(res => {
                                this.$message(res.msg)
                                if (res.code == 1) {
                                    this.getList()
                                }
                            })
                        })
                    } else {
                        this.$message('请选择审批项')
                    }
                }
            },
            selChan(e) {
                this.selected = e
                if (this.tabbar == 1) {
                    this.canDelAll = true
                } else {
                    this.canDelAll = false
                }
            },
            pageChan(page) {
                if (this.bySearch) {

                } else {
                    this.isCheckCnterData(page)
                }
            },
            getTimeData(min, max, page = 1) {
                var type = this.tabbar
                this.$http.get('approval/search', {
                    // token: this.$token,
                    begin: min,
                    end: max,
                    type: type,
                    page: page
                }).then(res => {
                    this.res = res
                    this.tableData = res.data
                })
            },
            timeTap(val) {
            },
            // 导航切换
            tabbarTap() {
                this.bySearch = false
                this.isCheckCnterData()
            },
            createNew() {
                this.dialogShow = true;
            },
            // 前往详情
            toDetail(index) {
                if (index.type == '普通') {
                    this.$router.push({ path: "/checkCenter/normalDetl", query: { id: index.id } });
                } else if (index.type == '请假') {
                    this.$router.push({ path: "/checkCenter/holidayDetl", query: { id: index.id } });
                } else if (index.type == '加班') {
                    this.$router.push({ path: "/checkCenter/overtimeDetl", query: { id: index.id } });
                } else if (index.type == '出差') {
                    this.$router.push({ path: "/checkCenter/outsideDetl", query: { id: index.id } });
                } else if (index.type == '外勤') {
                    this.$router.push({ path: "/checkCenter/travelDetl", query: { id: index.id } });
                } else if (index.type == '借支') {
                    this.$router.push({ path: "/checkCenter/debitDetl", query: { id: index.id } });
                } else if (index.type == '差旅') {
                    this.$router.push({ path: "/checkCenter/reimbDetl", query: { id: index.id } });
                }
            },
            normal() {
                this.$router.push("/checkCenter/newNormal");
                this.dialogShow = false;
            },
            holiday() {
                this.$router.push("/checkCenter/newHoliday");
                this.dialogShow = false;
            },
            overtime() {
                this.$router.push("/checkCenter/newOvertime");
                this.dialogShow = false;
            },
            outside() {
                this.$router.push("/checkCenter/newTravel");
                this.dialogShow = false;
            },
            travel() {
                this.$router.push("/checkCenter/newOutside");
                this.dialogShow = false;
            },
            debit() {
                this.$router.push("/checkCenter/newDebit");
                this.dialogShow = false;
            },
            reimburt() {
                this.$router.push("/checkCenter/newReimb");
                this.dialogShow = false;
            },

            // 决定页面数据 
            isCheckCnterData(page) {
                var url = '';
                if (this.tabbar == 0) {
                    // 全部审批数据
                    url = 'approval/index'
                } else if (this.tabbar == 1) {
                    // 我发起审批的
                    url = 'approval/mystart'
                } else {
                    // 我审批的
                    url = 'approval/myapproval'
                }

                this.$http.get(url, {
                    token: localStorage.getItem("token"),
                    page: page || 1
                }).then(res => {
                    this.res = res
                    this.tableData = res.msg.data
                    // this.tempData = res.slice(0, 10)
                })
            },


            // 审批类型筛选
            filterTag(value, row) {
                return row.tag === value;
            },
            getList(){
                this.$http.get('approval/tieup').then(res=>{
                    this.res = res
                    this.tableData = res.msg.data
                })
            }
        },
        created() {
            // 审批类型
            // this.$http.get('approval/type').then(res => {
            //     let approvalType = JSON.parse(JSON.stringify(res));
            //     for (var item of approvalType) {
            //         var text = { text: item.name }
            //         var value = { value: item.name }
            //         Object.assign(item, text, value)
            //     }
            //     this.approvalType = approvalType
            // })
            // this.isCheckCnterData();
            this.deleteAll = this.$http.allow('批量删除')
            this.getList()
        },
        watch: {
            $route(to, from) {
                this.isCheckCnterData();
            }
        },
    };
</script>
<style lang="less" scoped>
    .top {
        margin-bottom: 20px;
    }

    .btn {
        border: none;
    }

    .dialog>div {
        width: 24%;
        display: inline-block;
    }

    .dialog>div:hover {
        color: #6464E4;
    }

    .dialog {
        .img {
            text-align: center;
            margin: auto;

            img {
                width: 40px;
                height: 40px;
            }

            img:nth-child(2) {
                display: none;
            }
        }

        .img:hover img:nth-child(1) {
            display: none;
        }

        .img:hover img:nth-child(2) {
            display: inline-block;
        }

        .dialog-txt {
            padding: 5px 0 20px;
        }
    }
    /deep/.el-table__body,/deep/.el-table__header{
        width:100% !important;
    }
</style>