<template>
  <div class="login">
    <el-col :xs="0" :sm="12" :md="12" :lg="12" :xl="12">
      <div class="login-left">
        <img src="../../assets/logo.png" alt="" />
      </div>
    </el-col>
    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
      <div class="login-right">
        <div class="container">
          <div class="top">
            <h2>浮点动力信息管理系统</h2>
            <p class="stationName">Information Management System</p>
          </div>
          <div class="center">
            <div class="between">
              <div class="flex1">
                <el-input placeholder="新密码" v-model="psd" clearable maxlength="16"></el-input>
              </div>
            </div>
            <div class="between">
              <div class="flex1">
                <el-input placeholder="确认密码" v-model="repsd" clearable maxlength="16"></el-input>
              </div>
            </div>
            <div class="between">
              <el-link :underline="false" class="logins" @click="confirm">确定修改</el-link>
              <el-link :underline="false" class="logins" @click="back">返回</el-link>
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
        psd: "",
        repsd: ''
      };
    },
    created() {
      // 检测到登录就返回到首页
      // const token = localStorage.getItem("username");
      // if (token) {
      // this.$router.push({ name: "/home" });
      // }
    },
    methods: {
      back() {
        this.$router.back()
      },
      confirm() {
        if (!this.psd) {
          this.$message('请填写新密码')
        } else if (this.psd.length < 8 || this.psd.length > 16) {
          this.$message('新密码应为8~16位')
        } else if (!this.repsd) {
          this.$message('请填写确认密码')
        } else if (this.repsd.length < 8 || this.repsd.length > 16) {
          this.$message('确认密码应为8~16位')
        }else if(this.psd!=this.repsd){
          this.$message('新密码与确认密码不一致')
        } else {
          this.$http.post('user/password', {
            token: localStorage.getItem('token'),
            password: this.psd
          }).then(res => {
            this.$message(res.msg)
            if (res.code == 1) {
              localStorage.setItem('token', '')
              this.$router.push('/login')
            }
          })
        }
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

  .stationName {
    color: #4D4F5C;
    opacity: 0.5;
    height: 3rem;
    line-height: 4rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }
  .login .login-right .top p{
    font-size: 1.45rem;
  }
</style>