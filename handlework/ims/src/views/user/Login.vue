<template>
  <div class="login">
    <el-col :xs="0" :sm="12" :md="12" :lg="12" :xl="12">
      <div class="login-left">
        <!-- <h1>This is an login page</h1> -->
        <img src="../../assets/logo.png" alt="" />
      </div>
    </el-col>
    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
      <!-- <el-row :gutter="10">
        <el-col :xs="1" :sm="1" :md="2" :lg="5" :xl="6"></el-col>
        <el-col :xs="20" :sm="22" :md="20" :lg="14" :xl="12">
         
        </el-col>
        <el-col :xs="2" :sm="1" :md="2" :lg="5" :xl="6"></el-col>
      </el-row> -->
      <div class="login-right">
        <div class="container">
          <div class="top">
            <h2>浮点动力信息管理系统</h2>
            <p>Information Management System</p>
          </div>
          <div class="center">
            <div class="between">
              <!-- <p>用户名</p> -->
              <div class="flex1">
                <el-input placeholder="用户名" v-model="from.text" :value="from.text" clearable maxlength="25"></el-input>
              </div>
            </div>
            <div class="between">
              <!-- <p>密码</p> -->
              <div class="flex1">
                <el-input placeholder="密码" v-model="from.password" :value="from.password" show-password maxlength="16">
                </el-input>
              </div>
            </div>
            <div class="checkbox">
              <el-checkbox v-model="from.checked">
                <el-link :underline="false">记住密码</el-link>
              </el-checkbox>
              <!-- <router-link to="/register">忘记密码</router-link> -->
              <el-link :underline="false" @click="goForget">忘记密码</el-link>
            </div>
            <div class="between" style="justify-content: center;">
              <!-- <el-link :underline="false" class="logins" @click="goLogin" :loading="true">登录</el-link> -->
              <el-button class="logins" @click="goLogin" :loading="loading">登录</el-button>
              <!-- <el-link :underline="false" class="logins" @click="toModify"
                >修改密码</el-link
              > -->
              <!-- <el-link :underline="false" class="register" @click="goRegister"
                >注册</el-link
              > -->
            </div>
          </div>
        </div>
      </div>
    </el-col>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        loading:false,
        from: {
          text: "",
          password: "",
          checked: false
        }
      };
    },
    created() {
      // 检测到登录就返回到首页
      // const token = localStorage.getItem("token");
      // if (token) {
      // this.$router.push({ name: "首页" });
      // this.$router.push({ path: "/index" });
      // }
      const token = localStorage.getItem("token");
      const login = localStorage.getItem("login");

      // if (token) {
      //   // this.$router.push({ name: "首页" });
      //   this.$router.push({ path: "/index" });
      // }
      if (login) {
        this.from.text = JSON.parse(login).name
        this.from.password = JSON.parse(login).psw
        // this.from.password = JSON.parse(login).checked
        this.from.checked = true
      }

    },
    methods: {

      getThemeColor() {
        this.$http.get('theme/getThemeColor').then(res => {
          if (res.code == 1) {
            localStorage.setItem('themeColor', res.msg.color)
            document.body.style.setProperty('--themeColor', localStorage.getItem('themeColor'));
            this.$router.push({ path: "/index" });
          }else{
            this.$router.push({ path: "/index" });
          }
          this.loading = false
        })
      },
      toModify() {
        this.$router.push('/modify')
      },
      goLogin: function () {
        this.loading = true
        this.$http.post('login/login', { account: this.from.text, password: this.from.password || '' }).then(res => {
          localStorage.setItem("login_status", JSON.stringify(res));
          this.$message(res.msg)
          if (res.code === 1) {
            // 记住密码
            let login = { name: this.from.text, psw: this.from.password, checkbox: true }
            if (this.from.checked) {
              localStorage.setItem("login", JSON.stringify(login));
            } else {
              localStorage.setItem("login", '');
            }
            setTimeout(() => {
              localStorage.setItem("token", res.token);
              this.getThemeColor()
            }, 600);
          } else {
            this.loading = false
          }
        })
      },
      goForget: function () {
        console.log('hello world')
        this.$router.push({ path: "/forget" });
      },
      // goRegister: function() {
      //   this.$router.push({ name: "register" });
      // }
    }
  };
</script>
<style lang="less" scoped>
  .login .login-right .between .logins {
    margin: 0 10px;
  }

  .login .login-right .top p {
    font-size: 1.45rem;
  }
  .top h2{
    height: 2.4rem !important;
    line-height: 2.4rem !important;
  }
  .logins{
    padding:0;
  }
</style>