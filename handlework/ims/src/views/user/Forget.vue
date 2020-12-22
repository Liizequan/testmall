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
                <el-input placeholder="账户名" v-model="account" clearable maxlength="25"></el-input>
              </div>
            </div>
            <div class="between">
              <!-- <p>用户名</p> -->
              <div class="flex1">
                <el-input placeholder="邮箱" v-model="email" clearable maxlength="255"></el-input>
              </div>
            </div>
            <div class="between">
              <el-link :underline="false" class="logins" @click="gain">发送</el-link>
              <el-link :underline="false" class="logins" @click="back()">返回</el-link>
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
        email: "",
        account: ''
      };
    },
    created() {
      // 检测到登录就返回到首页
      // const token = localStorage.getItem("username");
      // if (token) {
      //   this.$router.push({ name: "home" });
      // }
    },
    methods: {
      gain: function () {
        if(!this.account){
          this.$message('请填写账户名')
          return
        }else if (!this.email) {
          this.$message('请填写邮箱')
          return
        }else if(!this.$re.isEmail(this.email)){
          this.$message('请填写正确邮箱')
          return
        }
        this.$http.post('login/forget', {
          account: this.account,
          email: this.email
        }).then(res => {
          this.$message(res.msg)
          // this.$http.post('login/doforget', {
          //   account: this.account,
          //   code:res.code
          // }).then(res=>{

          // })
        })
        // var res = {
        //   code: 0,
        //   msg: "发送失败"
        // };
        // if (res.code === 1) {
        //   this.$message({
        //     showClose: true,
        //     duration: 1000,
        //     center: true,
        //     message: "恭喜你，注册成功",
        //     type: "success"
        //   });
        // } else {
        //   const h = this.$createElement;
        //   this.$notify({
        //     title: "温馨提示",
        //     duration: "1500",
        //     position: "top-right",
        //     message: h("span", { style: "color: teal" }, res.msg)
        //   });
        // }
      }
    }
  };
</script>
<style lang="less" scoped>
  .login .login-right .center .between:last-child {
    padding-top: 3.125rem;
  }

  .login {
    height: 100%;
    overflow: hidden;
  }

  .login-left {
    height: 100%;

    /* &>img {
      height: 86%;
      width: 80%;
      margin: 0 auto;
    } */
  }

  .login-right {
    height: 100%;
    background: #fff;
  }

  .login .login-right .top h2 {
    height: 40px;
    line-height: 40px;
  }
</style>