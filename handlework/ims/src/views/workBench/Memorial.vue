<template>
    <div class="contain memorial">
        <div v-if="this.$route.path === '/memorial'">
            <div class="memorial">
                <header class="between">
                    <p>
                        <el-button type='primary' @click="goto"><i class="el-icon-plus"></i>新建备忘录</el-button>
                    </p>
                    <p class="font14-nobold-9">
                        日期筛选：
                        <el-date-picker v-model="date" type="daterange" range-separator="至" start-placeholder="开始日期"
                            :picker-options="pickerOptions" end-placeholder="结束日期" @change="dateChan">
                        </el-date-picker>
                        <el-button type="primary" style="margin-left:10px;" @click="pageData">全部</el-button>
                    </p>
                </header>
                <main>
                    <div>
                        <ul class="menorial-item">
                            <li class="menorial-list font14-nobold-9" v-for="(item,index) in menorialList" :key='index'>
                                <el-link :underline="false" style="display:block">
                                    <div class="top between flex-items-center" @click="goNoticeDetail(item.id)">
                                        <h3 class="font16-isbold-3 veticel1" >{{item.title}}</h3>
                                        <i class="el-icon-arrow-right"></i>
                                    </div>
                                </el-link>
                                <div class="contont veticel8 is-kai-font">
                                    {{item.content}}
                                </div>
                                <div class="footer between">
                                    <p>更新时间：<span>{{item.update_time}}</span></p>
                                    <p class="link">
                                        <el-link :underline="false" @click="goDeleteDetail(item.id)">删除</el-link>
                                        <el-link :underline="false" type="primary" style="padding-left:10px;"
                                            @click="goEditDetail(item.id)">编辑</el-link>
                                    </p>
                                </div>
                            </li>
                            <li class="add-memorial menorial-list font14-nobold-9" v-if="menorialList.length < '9' ">
                                <el-link :underline="false" class="el-icon-plus"
                                    style="font-size:50px;font-weight:bold;" @click="goto"></el-link>
                            </li>
                            <li v-if="menorialList.length%3===1" class="menorial-list"
                                style="background-color: transparent; box-shadow:none">
                            </li>
                        </ul>
                    </div>
                    <el-pagination background layout="prev, pager, next" :total="res.msg.total" @current-change="pageChan">
                    </el-pagination>
                </main>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                date: '',//日期
                menorialList: [],// 数据列表
                pickerOptions: this.limitDateStart(),
                res: {
                    msg:{
                        total:0
                    }
                }
            }
        },
        computed: {
        },
        methods: {
            pageChan(page){
                this.pageData(page)
            },
            dateChan(e) {
                // this.$http.get('index/searchmemorial',{
                //     token:localStorage.getItem('token'),
                //     begin:'',
                //     end:''
                // }).then(res=>{

                // })
            },
            // 页面数据
            pageData(page) {
                this.date = ''
                this.$http.get('index/allmemorial', {
                    token: localStorage.getItem("token"),
                    page:page||1
                }).then(res => {
                    this.menorialList = res.msg.data
                    this.res = res
                })
            },
            //前往添加
            goto() {
                console.log('添加')
                this.$router.push('/memorial/add')
            },
            // 前往详情
            goNoticeDetail(index) {
                console.log('详情')
                this.$router.push('/memorial/detail/' + index)
            },
            // 前往编辑
            goEditDetail(index) {
                console.log('编辑')
                this.$router.push({
                    path: '/memorial/add', query: {
                        id: index,
                    }
                })
            },
            // 删除详情
            goDeleteDetail(index) {
                this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.post('index/delmemorial', {
                        // token: this.$token,
                        id: index
                    }).then(res => {
                        this.pageData()
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    })
                }).catch(() => {
                });
            },
            // 日期筛选器
            limitDateStart() {
                var _this = this;
                return {
                    onPick(time) {
                        var minDate = '', maxDate = '';
                        if (time.minDate) {
                            minDate = time.minDate.getFullYear() + '-' + (time.minDate.getMonth() + 1) + '-' + time.minDate.getDate()
                        }
                        if (time.maxDate) {
                            maxDate = time.maxDate.getFullYear() + '-' + (time.maxDate.getMonth() + 1) + '-' + time.maxDate.getDate()
                        }
                        if (time.maxDate && time.maxDate) {
                            this.$http.get('index/searchmemorial', {
                                // token: this.$token,
                                begin: minDate,
                                end: maxDate
                            }).then(res => {
                                console.log(res)
                                _this.menorialList = res.msg.data
                                _this.res = res
                            })
                        }
                    }
                }
            }
        },// 开始
        created() {
            // index/allmemorial
            this.pageData()
            this.$bus.$off()
            this.$bus.$on('memoryInit', () => {
                this.pageData()
            })
        },
        // 监听路由
        watch: {

        }
    }
</script>
<style lang="less" scoped>
    .memorial {
      .veticel1{
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
      }
      .veticel8{
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 48;
        overflow: hidden;
        text-align: justify;
      }
        header {
            p.font14-nobold-9>div {
                margin-left: 10px;
            }
        }

        main {
            .menorial-item {
                display: flex;
                justify-content: space-between;
                flex-wrap: wrap;
                padding: 10px 0 20px;
            }

            .menorial-list {
                width: 350px;
                background-color: #fff;
                padding: 10px;
                margin-top: 15px;
                height: 240px;
                display: flex;
                box-shadow: 0 0px 4px rgba(0, 0, 0, .12);
                flex-direction: column;

                .contont {
                    text-align: left;
                    margin: 20px 0;
                    flex: 1;
                }

                .footer {
                    border-top: 1px solid #eee;

                    .link {
                        span {
                            display: inline-block;
                            padding: 0 10px;
                            color: pink;
                        }
                    }

                    padding:20px 0 10px;
                }
            }

            .add-memorial {
                position: relative;

                .el-icon-plus {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }
            }

            .el-col {
                background: #fff;
            }

        }
    }
</style>