<template>
    <div class="report-detail">
        <div class="top">
            <div class="between">
                <h3 class="font18-bold-3">{{initRes.title}} -
                    <span v-if="who==1">日报</span>
                    <span v-if="who==2">周报</span>
                    <span v-if="who==3">月报</span>
                    <span v-if="who==4">年度</span>
                </h3>
                <div>
                    <el-button type="primary" icon="el-icon-edit" @click="toEdit" :disabled="initRes.comment.length != 0">编辑</el-button>
                    <el-button type="primary" icon="el-icon-delete-solid" @click="del">删除</el-button>
                </div>
            </div>
            <p class="txt-left font16-nobold-9">{{initRes.create_time}}</p>
            <div class="between flex-items-center" style="padding:20px 0 0;">
                <p class=" font16-bold-3 flex-items-center" v-if="who==3" style="width:260px;">本月达成率 <span
                        class="font36-bold-3" style="display:inline-block; padding-left:10px;">{{percent}}</span></p>
                <p class="txt-right font16-nobold-9" v-if='who==3'>本月完成进度{{percentDetl}}，希望继续努力！</p>
            </div>
        </div>
        <!-- 日报 -->
        <div class="content" v-if="who==1">
            <div>
                <p class="title font16-bold-3">今日总结：</p>
                <p class="text">
                    {{initRes.text1}}
                </p>
            </div>
            <div>
                <p class="title font16-bold-3">明日计划：</p>
                <p class="text">
                    {{initRes.text2}}
                </p>
            </div>
        </div>
        <!-- 周报 -->
        <div class="content" v-if="who==2">
            <div>
                <p class="title font16-bold-3">本周工作成效：</p>
                <p class="text">
                    {{initRes.text1}}
                </p>
            </div>
            <div>
                <p class="title font16-bold-3">本周小结：</p>
                <p class="text">
                    {{initRes.text2}}
                </p>
            </div>
            <div>
                <p class="title font16-bold-3">下周计划内容：</p>
                <p class="text">
                    {{initRes.text3}}
                </p>
            </div>
        </div>
        <!-- 月报 -->
        <div class="content" v-if="who==3">
            <div>
                <p class="title font16-bold-3">本月目标：</p>
                <p class="text">
                    {{initRes.text1}}</p>
            </div>
            <div>
                <p class="title font16-bold-3">本月完成情况：</p>
                <p class="text">
                    {{initRes.text2}}</p>
            </div>
            <div>
                <p class="title font16-bold-3">未达成目标的原因：</p>
                <p class="text">
                    {{initRes.text4}}</p>
            </div>
            <div>
                <p class="title font16-bold-3">改变现状的对策：</p>
                <p class="text">
                    {{initRes.text5}}</p>
            </div>
            <div>
                <p class="title font16-bold-3">意见以及建议：</p>
                <p class="text">
                    {{initRes.text6}}</p>
            </div>
        </div>
        <!-- 年度 -->
        <div class="content" v-if="who==4">
            <div>
                <p class="title font16-bold-3">工作概述：</p>
                <p class="text">
                    {{initRes.text1}}
                </p>
            </div>
            <div>
                <p class="title font16-bold-3">工作回顾：</p>
                <p class="text">
                    {{initRes.text2}}</p>
            </div>
            <div>
                <p class="title font16-bold-3">工作完成情况：</p>
                <p class="text">
                    {{initRes.text3}}
                </p>
            </div>
            <div>
                <p class="title font16-bold-3">成果展示：</p>
                <p class="text">
                    {{initRes.text4}}
                </p>
            </div>
            <div>
                <p class="title font16-bold-3">工作之中存在不足之处：</p>
                <p class="text">
                    {{initRes.text5}}
                </p>
            </div>
            <div>
                <p class="title font16-bold-3">明年计划：</p>
                <p class="text">
                    {{initRes.text6}}</p>
            </div> 
           
        </div>

        <div class="bottom">
             <div>
                <p class="title font16-bold-3">评价人：</p>
                <p class="text">
                    <span v-for="item in initRes.approval" :key="item">
                    {{item.name}}
                    </span>
                </p>
            </div>
            <div class="sub">
                <p class="title font16-bold-3">评价内容：</p>
                <el-input type="textarea" style="margin:10px 0 20px;" :rows="2" placeholder="请输入内容" v-model="textarea">
                </el-input>
                <el-button type="primary" @click="Post">发表</el-button>
                <el-button @click="back">返回</el-button>
            </div>
            <div class="sup">
                <ul>
                    <li v-for="(item,index) in initRes.comment" :key="index" class="user-info-list">
                        <div>
                            <img :src="item.head" alt="">
                        </div>
                        <div class="font14-isbold-3">
                            <p style="line-height: 18px;">
                                <span>{{item.user_id}}</span>
                                <span class="font14-nobold-9">{{item.create_time}}</span>
                            </p>
                            <p>{{item.content}}</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                textarea: '',
                title:'',
                userInfo: [
                    {
                        name: 'kings',
                        time: '2019-12-9',
                        content: '做的不错'
                    }
                ],
                day: false,
                week: false,
                month: false,
                year: true,
                who: '',
                initRes: {},
                id: '',
                user_id: '',
                percent:'',
                percentDetl:''
                // 年4
                // 月2
                // 周3
                // 日1
            }
        },
        computed: {
            // 用来计算是年度还是月报、周报、日报
        },
        methods: {
            toEdit(){
                if(this.initRes.user_id!=JSON.parse(localStorage.getItem('login_status')).info.user_id){
                    return this.$message('您没有权限')
                }
                if(this.initRes.comment.length == 0){
                    this.$router.push({path:'/report/add',query:{who:this.who,id:this.id}})
                }else{
                    this.$message('已评价，不可在编辑')
                }
            },
            Post() {
                if(!this.textarea){
                    this.$message('请填写评价内容')
                    return
                }
                this.$http.post('report/comment', { token: localStorage.getItem('token'), report_id: this.id, content: this.textarea }).then(res => {
                    if (res) {
                        this.$message(res.msg)
                    }
                    if(res.code ==1){
                        this.init()
                    }
                })
            },
            del() {
                this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.post('report/del', { token: localStorage.getItem('token'), id: this.initRes.id, user_id: this.initRes.user_id }).then(res => {
                        this.$message(res.msg)
                        if (res.code == 1) {
                            this.$router.back()
                            this.$bus.$emit('reportInit')
                        }
                    })
                }).catch(() => {       
                });
            },
            init() {
                this.$http.get('report/edit', { id: this.id }).then(res => {
                    this.initRes = res
                    if(this.who == 3){
                        if(res.text3==1){
                            this.percent = '20%'
                            this.percentDetl = '很差'
                        }else if(res.text3==2){
                            this.percent = '40%'
                            this.percentDetl = '不行'
                        }else if(res.text3==3){
                            this.percent = '60%'
                            this.percentDetl = '刚好及格'
                        }else if(res.text3==4){
                            this.percent = '80%'
                            this.percentDetl = '还行'
                        }else if(res.text3==5){
                            this.percent = '100%'
                            this.percentDetl = '不错'
                        }
                    }
                })
            }
        },
        created() {
            this.who = this.$route.query.who
            this.id = this.$route.params.detail_Id
            // this.user_id = this.$route.query.user_id
            this.init()
            // 获取后台返回数据
        },
    }
</script>
<style lang="less" scoped>
    .report-detail {
        text-align: left;

        .txt-right {
            display: block;
            width: 100%;
            text-align: right;
        }

        .title {
            background: rgba(0, 0, 0, .1);
            text-align: left;
            padding: 10px;
        }

        .text {
            padding: 10px 0 20px;
            font-size: 14px;
            color: #606266;
            text-align: justify;
        }

        .top {
            margin-bottom: 20px;
        }

        .bottom {
            .sup {
                padding-top: 30px;
            }

            li.user-info-list {
                display: flex;
                margin: 10px 0;
                padding: 20px;
                // background-color: rgba(0, 0, 0, 0.1);
                border: 1px solid #DCDFE6;

                img {
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    border: 1px solid #ddd;
                    margin-right: 20px;
                }

                p {
                    padding-top: 10px;
                }
            }
        }
    }
</style>