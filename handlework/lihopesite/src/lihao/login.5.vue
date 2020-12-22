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
                                <input name="user_password" type="password" placeholder="密码">
                                <img src="../image/eay.png" alt="">
                            </p>
                            <p class="forget"><a href="#">忘记密码？请咨询客服</a></p>
                            <p class="submit"><button type="submit">登录</button></p>
                            <!-- <p class="submit"><button @click="login">登录</button></p> -->
                        </form>
                        <!-- </div> -->
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
                loginHide:true
            }
        },
        methods: {
            //读取cookie
            getCookie:function () {
                if (document.cookie.length>0) {
                    var arr=document.cookie.split(';');//这里显示的格式需要切割一下自己可输出看下
                    // console.log(arr)
                    for(var i=0;i<arr.length;i++){
                        var arr2=arr[i].split('=');//再次切割
                        console.log(arr2)
                        //判断查找相对应的值
                        if(arr2[0]=='user_id'){
                            // this.ruleForm.userName=arr2[1]//保存到保存数据的地方
                            var userId = arr2[1]
                            console.log(userId)
                            // 什么情况下才能跳转到对应页面，需要账号密码都对的情况下才能跳转
                            if(userId == null || userId==''){
                                // window.location.href= 'http://lihope88.com/home/user/index.html'
                                window.location.href= 'http://lihope88.com/#/login'
                            }else if(userId > 1){//如果userId大于1时，才跳转到对应页面
                                this.loginHide=false
                                window.location.href= 'http://lihope88.com/home/user/index.html'
                            }
                        }
                    }
                }
            },
        },
        //页面加载调用获取cookie值
        mounted(){
            this.getCookie()
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