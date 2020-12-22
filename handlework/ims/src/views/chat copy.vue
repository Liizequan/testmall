<template>
    <div class="chat contain">
        <div class="chat-container between ">
            <Aside>
                <el-input
                    placeholder="请输入内容"
                    prefix-icon="el-icon-search"
                    v-model="search"
                >
                </el-input>
                <el-collapse v-model="activeNames" @change="handleChange" accordion 
                    style="margin-top:20px;">
                    <el-collapse-item :title="item.label" :name="item.id" v-for="(item,index) in userList" :key="index">
                        <ul class="user-item font14-isbold-3">
                            <li v-for="(items,index) in item.user" :key="index" @click="andMeTalk(items)">
                                <el-link :underline="false"> {{items.name || '暂无人员'}}</el-link>
                            </li>
                        </ul>
                    </el-collapse-item>
                </el-collapse>
            </Aside>
            <Main v-if="userId">
                <Header>{{andMeTalkUser}}</Header>
                <div class="">
                    <ul class="info-item xyk-scroll">
                        <!-- <li class="left">
                            <el-avatar size="medium" :src="currentUser.path"></el-avatar>
                            <div class="user-text font14-nobold-9">
                                <p>{{currentUser.name || '财务部-陈探探'}}</p>
                                <div class="info-txt">
                                    <span v-if="you">{{currentUser.time || '14:30'}}</span>
                                    <p>{{currentUser.name + currentUser.user_id  || '请确认9月份工资'}}</p>
                                    <span>{{currentUser.time || '14:30'}}</span>
                                </div>
                            </div>
                            <el-avatar size="medium" :src="currentUser.path" v-if="you"></el-avatar>
                        </li> -->
                        <li :class="item.status == 1 ? 'right' : 'left'" v-for="(item,index) in isUserData" :key="index">
                            <el-avatar size="medium" :src="item.head"  v-if="item.status != 1"></el-avatar>
                            <div class="user-text font14-nobold-9">
                                <p>{{item.structure + ' - ' + item.myname}}</p>
                                <div class="info-txt">
                                    <span v-if="item.status == 1">{{item.create_time}}</span>
                                    <p>{{item.content}}</p>
                                    <span v-if="item.status != 1">{{item.create_time}}</span>
                                </div>
                            </div>
                            <el-avatar size="medium" :src="item.head"  v-if="item.status == 1"></el-avatar>
                        </li>
                        <!-- <li class="right">
                            <el-avatar size="medium" :src="currentUser.path" v-if="me"></el-avatar>
                            <div class="user-text font14-nobold-9">
                                <p>{{currentUser.name || '财务部-陈探探'}}</p>
                                <div class="info-txt">
                                    <span>{{currentUser.time || '14:30'}}</span>
                                    <p>{{currentUser.name + currentUser.user_id  || '请确认9月份工资'}}</p>
                                    <span v-if="me">{{currentUser.time || '14:30'}}</span>
                                </div>
                            </div>
                            <el-avatar size="medium" :src="currentUser.path"></el-avatar>
                        </li> -->
                    </ul>
                </div>
                <Footer>
                    <div class="footer">
                        <el-input type="textarea" placeholder="请输入" v-model="chatText"></el-input>
                        <p><el-button style="width:100px;" @click="submit">发送</el-button></p>
                    </div>
                </Footer>
            </Main>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            search:'',//搜索人员
            userList:'',//所有人员
            activeNames:null,//是否显示下拉人员
            andMeTalkUser:'待选择人员',//姓名
            andMeTalkImg:'',//选择人员的头像
            currentUser:'',//当前需要聊天的用户id
            chatText:'',//聊天内容


            isUserData:[],//当前客户聊天记录

            you:false,
            me:true,
            userId:'',
        }
    },
    methods: {
        handleChange(val) {
            console.log(val);
        },
        andMeTalk(val){
            console.log('与我聊天的人员id:',val)
            
            this.andMeTalkUser = val.name
            this.userId = val.user_id
            this.getData()
        },
        timer(){
            return setInterval(()=>{
                this.getData()
            },5000)
        },
        // 获取数据
        getData(){
            this.$http.get('index/getchat',{
                token:localStorage.getItem("token"),
                user_id:this.userId,
            }).then(res=>{
                var userInfo = JSON.parse(localStorage.getItem("login_status"))
                var myId = userInfo.info.user_id
                var res = res.msg;
                for(var i in res){
                    if(myId == res[i].user_id){
                        res[i] = Object.assign({status:1}, res[i])
                    }
                }
                this.isUserData = res
            })
        },
        mounted() {
        },

        // 发送
        submit(){
            if(!this.userId){
                return this.$message('请选择聊天人员')
            }
            this.$http.post('index/sendchat',{
                // token:this.$token,
                receiver_id:this.userId,
                content:this.chatText
            }).then(res=>{
                console.log(res)
                if(res.code == 1){
                    this.getData()
                    this.chatText = ''
                }
            })
        }
    },
    watch: {
      isUserData() {
        this.timer() 
      }
    },
    destroyed() {
        clearTimeout(this.timer)
    },
    created() {
        this.$http.get('user/index',{
            token:localStorage.getItem("token")
        }).then(res=>{
            console.log(res)
            var id = res.user_id
            var text = res.name
            var img = res.head
            this.userList = res
        })

        this.getData()
    },

}
</script>
<style lang="less" scoped>
    .chat{
        height: 680px;  
    }
    Aside{
        width:280px;
        margin-right: 20px;
        height: 680px;
        // background-color: pink;
        .user-item{
            text-align: left;
            li:hover{
                color:#409EFF;
            }
        }
    }
    Main{
        display: flex;
        flex:1;
        flex-direction: column;
        position: relative;
        height: 680px;
        Header{
            width:100%;
            text-align: center;
            margin-bottom: 20px;
        }
        .info-item {
            height: 460px;
            overflow: auto;
            box-shadow: 0 0 4px 0 rgba(0,0,0,.1);
            padding:20px;
        }
        .info-item li{
            display: flex;
            .user-text {
                padding-left:20px;
                .info-txt {
                    display: flex;
                    p{
                        color:#fff;
                        border-radius: 4px;
                        padding:8px 12px;
                        margin:10px;
                        margin-left:0;
                        background-color: #409EFF;
                        position: relative;
                    }
                    span{
                        display: inline-block;
                        margin:10px;
                        padding:8px 12px;
                        padding-left:0;
                    }
                }
            }
        }
        .info-item li.left{
            text-align: left;
            .user-text{
                .info-txt{
                    p:after{
                        content:'';
                        position: absolute;
                        top:-15px;
                        left:10px;
                        border:10px solid transparent;
                        border-bottom:10px solid #409EFF;
                    }
                }
            }
        }
        .info-item li.right{
            display: flex;
            text-align: right;
            justify-content: flex-end;
            .user-text {
                padding-right: 20px;
                .info-txt {
                    p{
                        margin-right: 0;
                    }
                    p:after{
                        content:'';
                        position: absolute;
                        top:-15px;
                        right:10px;
                        border:10px solid transparent;
                        border-bottom:10px solid #409EFF;
                    }
                }
            }
        }
        
        Footer{
            background-color: #fff;
            .footer{
                position: absolute;
                bottom:0;
                left:0;
                width:100%;
                p{
                    text-align: right;
                    padding-top:30px;
                }
            }   
        }
    }
</style>