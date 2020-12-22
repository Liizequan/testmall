<template>
   <div class="lh-login" v-if="loginHide">
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
                        <!-- <div class="form"> -->
                        <form class="form" action='http://lihope88.com/home/login/index.html' method="post">
                            <p><input name="user_username" type="text" placeholder="请输入您的账号"></p>
                            <p class="pwd">
                                <input name="user_password" :type="[look?'password':'text']" placeholder="密码">
                                <img src="../image/eay.png" alt="" @click="lookPwd">
                            </p>
                            <p class="forget"><a href="#">找回密码？</a></p>
                            <p class="submit"><button type="submit">登录</button></p>
                            <!-- <p class="submit"><button @click="login">登录</button></p> -->
                        </form>
                        <!-- </div> -->
                    </div>
                    <p class="onId"><a href="javascript:;">没有账号？去注册</a></p>
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
                        <td><router-link to="/affairs">户型推荐</router-link></td>
                        <td><router-link to="/business">公司注册</router-link></td>
                        <td><router-link to="/finance">代理记账</router-link></td>
                        <td><router-link to="/government">高企育培</router-link></td>
                        <td><router-link to="/market">新四板挂牌</router-link></td>
                    </tr>
                    <tr>
                        <td rowspan="3"><router-link to="/affairs">注册选址</router-link></td>
                        <td><router-link to="/business">公司转让</router-link></td>
                        <td><router-link to="/finance">审计服务</router-link></td>
                        <td><router-link to="/government">高企认定</router-link></td>
                        <td><router-link to="/market">新三板挂牌</router-link></td>
                    </tr>
                    <tr>
                        <td><router-link to="/business">公司变更</router-link></td>
                        <td><router-link to="/finance">税务服务</router-link></td>
                        <td><router-link to="/government">科技小巨人</router-link></td>
                        <td><router-link to="/market">国内IPO</router-link></td>
                    </tr>
                    <tr>
                        <td colspan="3"><router-link to="/business">许可证办理</router-link></td>
                        <td><router-link to="/market">香港IPO</router-link></td>
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
                        <p>广州浮点动力科技服务有限公司</p>
                        <p>地址：广州市黄埔区开创大道108号锦昊智樽仺217</p>
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
    // function getCookie(cname){
    //     console.log(cname);
    //     var name = cname + "=";
    //     var ca = document.cookie.split(';');
    //     for(var i=0; i<ca.length; i++) 
    //     {
    //         var c = ca[i].trim();
    //         if (c.indexOf(name)==0) return c.substring(name.length,c.length);
    //     }
    //     return "";
    // }
    // var status=getCookie('user_id');
    // if(status==''){
    //     alert('没有登录');
    // }else{
    //     alert('已经登录');
    //     window.location.href='http://localhost/home/user/index.html'
    // }
    export default{
        data(){
            return{
                loginHide:true,
                look:true,//查看密码
            }
        },
        methods: {
            //读取cookie
            getCookie:function (cname) {
                console.log(cname);
                var name = cname + "=";
                var ca = document.cookie.split(';');
                for(var i=0; i<ca.length; i++) {
                    var c = ca[i].trim();
                    if (c.indexOf(name)==0) return c.substring(name.length,c.length);
                }
                return "";
            },
            lookPwd:function(){
                this.look=!this.look
            }
        },
        //页面加载调用获取cookie值
        mounted(){
            var status=this.getCookie('user_id')
            if(status==''){
                console.log('没有登录');
            }else{
                console.log('已经登录');
                this.loginHide=false
                window.location.href='http://lihope88.com/home/user/index.html'
            }
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
            margin:78px 0px;
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
        .form p{
            padding-top:20px;
        }
        .form input{
            border:0;
            width:100%;
            height: 30px;
            line-height: 30px;
            outline: none;
            padding-left: 10px;
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
            transform: translateY(50%);
        }
        .form a{
            color:#999999;
            font-size: 14px;
            padding-bottom: 2px;
            border-bottom: 1px solid #999;
        }
        .submit button{
            width:100%;
            height: 40px;
            line-height: 40px;
            border: none;
            color:#fff;
            border-radius:3px;
            background: #BB0000;
            margin:35px 0;

        }
        input,input:-internal-autofill-selected{
            background-color: #fff !important;;
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
        a{
            color:#888;
        }
</style>