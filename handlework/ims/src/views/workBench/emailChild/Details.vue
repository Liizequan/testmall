<template>
    <div class="contain ">
        <div class="">
            <div class="sendout">
                <header>
                    <div class="between">
                        <h3 class="font20-bold-3">{{userList.title}}</h3>
                        <el-link :underline="false" @click="deleteFirst(userList.id)" v-if="userList.status!='-1'">删除</el-link>
                        <el-link :underline="false" @click="deleteData(userList.id)" v-else>删除</el-link>
                    </div>
                    <ul class="font14-nobold-9">
                        <li class="user-info">
                            <span>发件人 :</span>
                            <p>
                                <span>{{userList.send}}</span>
                                <span>《 {{userList.send_email}} 》</span>
                            </p>
                        </li>
                        <li class="user-info">
                            <span>时&nbsp;&nbsp;&nbsp;&emsp;&emsp;间 :</span>
                            <p>
                                <span>{{userList.create_time}}</span>
                            </p>
                        </li>
                        <li class="user-info">
                            <span>收件人 :</span>
                            <p>
                                <span>{{userList.receiver}} </span>
                                <span>《 {{userList.receiver_email}} 》</span>
                            </p>
                        </li>
                        <li class="user-info">
                            <span>附&emsp;&emsp;件 :</span>
                            <p>
                                <span>{{num}}个（附件名称）</span>
                            </p>
                        </li>
                    </ul>
                </header>
                <aside>
                    <div v-html="userList.content" class="conttt">
                    </div>
                </aside>
                <footer>
                    <div v-if=" num!=0 ">
                        <div class="fujian" v-for="(item,index) in userList.file" :key="index">
                            <p><i class="el-icon-paperclip"></i><span>附件（{{userList.file.length}}个）</span></p>
                            <div class="fujian-len">
                                <img :src="url+'/'+item.path" alt="" v-if="item.ext == 'jpg'">
                                <div class="fujian-len-text">
                                    <p>{{item.name}}({{item.size}})</p>
                                    <p><a :href="url+'/'+item.path" target="_blank" style="text-decoration: none;color:blue;font-size:14px;">下载</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="btn">
                        <el-button type="primary" @click="goEidt(userList.id,who)" v-if="who==0">回复</el-button>
                        <el-button type="primary" @click="goEidt(userList.id,who)" v-else>编辑</el-button>
                        <el-button @click="back()">返回</el-button>
                    </div>
                </footer>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                userList: {
                    name: '浮点动力 ',
                    email: '3425929027@qq.com',
                    time: '2019年10月30号（星期三） 09：25',
                    sendout: '陈先生',
                    semail: '2567929027@qq.com',
                    fujian: '1',
                },
                url: this.$baseURL,
                num: 0,
                who:''
            }
        },
        methods: {
            //加入回收站
            deleteFirst(val) {
                this.$confirm('是否加入回收站?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.post('email/del', {
                        token: localStorage.getItem('token'),
                        id: val
                    }).then(res => {
                        if (res.codo == 1) {
                            this.$message(res.msg)
                            this.back()
                        }
                    })
                })
            },
            deleteData(val) {
                this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.post('email/comfirmdel', {
                        token: localStorage.getItem('token'),
                        id: val
                    }).then(res => {
                        if (res.codo == 1) {
                            this.$message(res.msg)
                            this.back()
                        }
                    })
                })
            },
            goEidt(val,who) {
                this.$router.push({
                    path: '/email/add',
                    query: {
                        id: val,
                        navIndex:who
                    }
                })
            }
        },
        created() {
            this.who = this.$route.query.navIndex
            this.$http.get('email/look', {
                token: localStorage.getItem("token"),
                id: this.$route.params.detail_Id
            }).then(res => {
                // console.log(res)
                this.userList = res
                if (res.file[0]) {
                    this.num = res.file.length
                }
            })
        },
    }
</script>
<style lang="less" scoped>
    .sendout {
        header {
            padding-bottom: 20px;
            border-bottom: 1px solid #D7D7D7;

            ul {
                padding-top: 10px;

                li>span {
                    display: inline-block;
                    width: 60px;
                    text-align: left;
                }
            }

            .user-info {
                display: flex;
                padding-top: 10px;
            }
        }

        aside {
            padding: 20px;
        }

        footer {
            .fujian {
                background-color: #fff;
                text-align: left;
                padding: 0 10px;

                p {
                    padding: 10px 0;
                    border-bottom: 1px solid #F2F2F2;
                }

                .fujian-len {
                    display: flex;
                    padding: 20px 10px;

                    .fujian-len-text {
                        padding: 9px;
                    }

                    img {
                        width: 60px;
                        height: 60px;
                    }

                    p {
                        border: 0;
                        padding: 0;
                    }
                }
            }

            .btn {
                padding: 30px 0 0px;
            }
        }
    }

    .conttt {
        overflow-x: hidden !important;
    }
</style>