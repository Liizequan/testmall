<template>
   <div class="lh-login">
        <!-- 头部 -->
        <div class="login-top">
            <p><img src="../image/lh-logo.png" alt=""></p>
            <p><router-link to="/">首页</router-link></p>
        </div>
        <!-- 内容 -->
        <div class="login-content">
            <div class="login-container">
                <div class="login-box">
                    <div>
                        <p class="title">登录账号</p>
                        <div class="form">
                        <!-- <form class="form"> -->
                            <p><input name="text" type="text" placeholder="请输入您的账号" v-model="username"></p>
                            <p class="pwd">
                                <input name="pwd" type="password" placeholder="密码" v-model="userpwd">
                                <img src="../image/eay.png" alt="">
                            </p>
                            <p class="forget"><a href="#">忘记密码？请咨询客服</a></p>
                            <!-- <p class="submit"><button type="submit">登录</button></p> -->
                            <p class="submit"><button @click="login">登录</button></p>
                        <!-- </form> -->
                        </div>
                    </div>
                    <p class="onId">没有账号？</p>
                </div>
            </div>
        </div>
        <!-- 尾部 -->
        <footer>
            <div class="footer">
                <table>
                    <tr>
                        <th>商务办公</th><th>工商代理</th><th>财税服务</th><th>政府补贴</th><th>上市辅导</th>
                    </tr>
                    <tr>
                        <td rowspan="4">办公室解决方案</td><td>公司注册</td><td>代理记账</td><td>高企育培</td><td>新四板挂牌</td>
                    </tr>
                    <tr>
                        <td>公司转让</td><td>审计服务</td><td>高新企业认定</td><td>新三板挂牌</td>
                    </tr>
                    <tr>
                        <td>公司变更</td><td>税务服务</td><td>科技小巨人</td><td>国内IPO</td>
                    </tr>
                    <tr>
                        <td colspan="3">许可证办理</td><td>香港IPO</td>
                    </tr>
                </table>  
                <div class="footer-lihao">
                    <p><i><img src="../image/lihao.png" alt=""></i></p>
                    <p class="footer-lihao-text">扫描二维码 关注更多信息</p>
                </div>   
                <div class="footer-right">
                    <div class="footer-right-contact">
                        <p>24小时免费服务热线</p>
                        <p class="red">020 8201-6711</p>
                    </div>
                    <div class="footer-right-conpany">
                        <p>利好财务策划（广州）有限公司</p>
                        <p>地址：广州市黄埔区开创大道108号锦昊至尊217</p>
                    </div>
                    <div class="footer-right-small">
                        <i><img src="../image/qq.png" alt=""></i>
                        <i><img src="../image/wx.png" alt=""></i>
                    </div>
                </div>
            </div>  
        </footer>
    </div>
</template>
<script>
export default {
    data() {
        return {
            username:'',
            userpwd:'',
        }
    },
    methods: {
        login: function (e) {
            // GET /someUrl
            // this.$http.post('http://weath.lihope88.com/home/login/index').then(response => {
            //     console.log(response.data);
            //     // get body data
            //     // this.someData = response.body;
            //     console.log('登录成功')
    
            // }, response => {
            //     console.log("登录失败");
            // });

            console.log(this.username)
            console.log(this.userpwd)
            // 如果用户名和密码不正确，就显示错误原因，
            // 如果正确就跳转到对应页面
            // 如果下次登录有登录过就直接跳转到对应页面
            // 如果跳转到新页面就将新页面的登陆信息更改


            // this.$axios.post("http://weath.lihope88.com/home/login",{
            //     user_username:this.username,
            //     user_password:this.userpwd
            //     }).then(data=>{
            //         console.log(data)
            //     })
            // }
            
            var _this = this;
            _this.$http.post('http://weath.lihope88.com/home/login/index.html', {
                user_username:_this.username,
                user_password:_this.userpwd
            },{emulateJSON:true}
            ).then(function (response) {
                console.log(response)
                var errorcode = response.data.code;
                if (errorcode == "200") {
                    // _this.$router.push(
                    // { path: '/HelloWorld',
                    //     query: {
                    //     user: response.data.data,
                    //     }
                    // });
                    console.log('跳转到新网页')
                } else {
                    // _this.$router.push({ path: '/Fail' });
                    console.log('登录失败')
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        },
    },
}
</script>
<style scoped>
    .login-top{
            width:1200px;
            height:100px;
            margin:auto;
            display: flex;
            justify-content: space-between;
        }
        .login-top p{
            display: flex;
            align-self: center;
            font-size:16px;
        }
        .login-top p a{
            color: #333;
        }
        .login-top img{
            display: block;
        }
        /* 登录信息 */
        .login-content{
            width:100%;
            min-width: 1200px;
            height: 650px;
            background:#cde3ff url(../image/login_bg.png) no-repeat 50% 50%;
        }
        .login-container{
            width:1200px;
            margin: auto;
            height: 100%;
        }
        .login-box{
            width:420px;
            height: 480px;
            float: right;
            margin:78px 50px;
            background: #fff;
            position: relative;
            box-shadow:0px 4px 10px 0px rgba(0, 0, 0, 0.15);
        }
        .login-box>div{
            margin:0 30px;
        }
        .title{
            font-size: 36px;
            font-weight:bold;
            color: #BB0000;
            padding:38px 0;
        }
        .form input{
            border:0;
            width:100%;
            padding-top:15px;
            height: 30px;
            line-height: 30px;
            outline: none;
            border-bottom: 1px solid #E5E5E5;
        }
        .form .forget{
            text-align: right;
            margin-top:20px;
        }
        .form .pwd{
            position: relative;
        }
        .form .pwd img{
            position: absolute;
            top:50%;
            right: 0;
            transform: translateY(-50%);
        }
        .form a{
            color:#999999;
            text-decoration: underline;
        }
        .submit button{
            width:100%;
            height: 40px;
            line-height: 40px;
            border: none;
            color:#fff;
            border-radius:3px;
            background: #BB0000;
            margin:60px 0;

        }
        .onId{
            position: absolute;
            bottom: 0;
            text-align: center;
            width:100%;
            height: 50px;
            line-height: 50px;
            color: #BB0000;
            font-size: 14px;
            background: #F2F2F2;
        }
</style>