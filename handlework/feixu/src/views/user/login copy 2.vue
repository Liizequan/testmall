<template>
    <div class="user-login">
        <div class="back-img">
            <img src="@/assets/img/user/login_back.png" alt="">
            <div class="back-img-box">
                <div class="between">
                    <aside>
                        <div class="logo">
                            <img src="@/assets/img/LOGO.png" alt="">
                        </div>
                        <div class="left-back">
                            <img src="@/assets/img/user/left_back.png" alt="">
                        </div>
                    </aside>
                    <main>
                        <div class="top">
                            <h1>飞旭后台管理系统</h1>
                            <p>欢迎回来！ 请登录到您的帐户</p>
                        </div>
                        <div class="form">
                            <el-form >
                                <el-form-item>
                                    <el-input placeholder="请您输入管理员账号" type="text" v-model="text" clearable></el-input>
                                </el-form-item>
                                <el-form-item class="tow-input">
                                    <el-input placeholder="请输入登录密码" type="password" v-model="pass" show-password></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-checkbox v-model="checked">记住账号</el-checkbox>
                                </el-form-item>
                                <el-form-item class="submit">
                                    <el-button type="primary" class="btn" @click="submitForm">提交</el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                    </main>
                </div>
            </div>
        </div>
        <!-- <h3>我是登录页面</h3> -->
    </div>
</template>
<script>
export default {
    data() {
        return {
            text:'',
            pass:'',
            checked:false,
            preRouter:'',//上一个路由
        }
    },
    beforeRouteEnter (to, from, next) {
      // 在渲染该组件的对应路由被 confirm 前调用
      // 不！能！获取组件实例 `this`
      // 因为当钩子执行前，组件实例还没被创建
      console.log(to)
      console.log(from)
      console.log(next())
        next(vm => {    // 通过 `vm` 访问组件实例 ，直接用this是有指向问题的   
            console.log(vm)
            vm.preRouter = from.path
        })
    },
    created() {
        var fxlogin = JSON.parse(localStorage.getItem('fxlogin'));
        if(fxlogin){
            
            this.checked = (fxlogin.checked == 'on' ? true : false)
            this.text = fxlogin.text
        }
    },
    methods: {
        submitForm(){
            console.log('登录')
            this.$http.post(this.$api.userLogin,{
                username:this.text,
                password:this.pass,
                'remember-me':this.checked? 'on':'off'
            },res=>{
                console.log(res)
                this.$message(res.msg)
                if(res.code===1){
                    // this.back()
                    // 如果上一个页面是路由页面，返回路由页面，否则返回首页
                    localStorage.setItem("info", JSON.stringify(res.info));
                    if(this.checked = 'on'){
                        console.log('保存')
                        var fxlogin = {text:this.text,checked:this.checked}
                        localStorage.setItem("fxlogin", JSON.stringify(fxlogin));
                    }else{
                        localStorage.setItem("fxlogin", '');
                    }        
                    if(this.preRouter != '/login'){
                        this.$router.push(this.preRouter)
                    }else{
                        this.$router.push('/')
                    }
                }
            })
            /**/
        },
        getPath(){
            console.log(this.$route.path);
        }
    },
    watch: {
      '$route':'getPath'
    },
}
</script>
<style scoped lang="less">
@rem:256/16rem;
@col9:#999;

    .back-img {
        position: relative;
    }
    .back-img>img{
        width:100%;
        height: 100vh;
    }
    .back-img-box{
        position: absolute;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);
        aside{
            width:930px;
            /* height:200px; */
            float: left;
            background-color: #E5F0FF;
        }
        main{
            width:670px;
            height: 811px;
            float: right;
            background-color: #FFFEFF;
            padding-left:120px;
            .top{
                padding-top:70px;
                h1{
                    color: #00A1E9;
                    font-size: 54/@rem;
                }
                p{
                    color: @col9;
                    font-size: 18/@rem;
                    padding-top:10px;
                }
            }
            .form{
                width:400px;
                padding-top: 70px;
                .tow-input{
                    padding-top:50px;
                }
                .submit{
                    margin-top:110px;
                }
                .btn{
                    width:400px;
                    height:72px;
                    opacity:1;
                    font-size: 32/@rem;
                    border-radius:40px;
                }
            }
        }
    }
</style>