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
            <p>请完成以创建您的帐户</p>
          </div>
          <div class="center">
            <div class="between">
              <!-- <p>用户名</p> -->
              <div class="flex1">
                <el-input
                  placeholder="用户名"
                  v-model="from.text"
                  clearable
                ></el-input>
              </div>
            </div>
            <div class="between">
              <!-- <p>手机号码</p> -->
              <div class="flex1">
                <el-input
                  placeholder="手机号码"
                  v-model="from.tel"
                  clearable
                ></el-input>
              </div>
            </div>
            <div class="between">
              <!-- <p>密码</p> -->
              <div class="flex1">
                <el-input
                  placeholder="密码"
                  v-model="from.paw"
                  show-password
                ></el-input>
              </div>
            </div>
            <div class="between">
              <!-- <p>再次输入密码</p> -->
              <div class="flex1">
                <el-input
                  placeholder="再次输入密码"
                  v-model="from.twoPaw"
                  show-password
                ></el-input>
              </div>
            </div>
            <div class="between">
              <!-- <p>验证码</p> -->
              <div class="flex1">
                <el-input
                  placeholder="验证码"
                  v-model="from.code"
                  show-password
                ></el-input>
              </div>
            </div>
            <div class="checkbox">
              <el-checkbox v-model="from.checked"></el-checkbox
              ><a href="javascript:;" @click="goAgree" class="flex1"
                >我同意条款和条件</a
              >
            </div>
            <div class="between">
              <el-link :underline="false" class="logins" @click="goRegister"
                >注册</el-link
              >
            </div>
          </div>
          <div class="footer">
            <el-link :underline="false" @click="goLogin"
              >已经有帐户了？登录。</el-link
            >
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
      from: {
        text: "", //姓名
        tel: "", //电话
        paw: "", //密码
        twoPaw: "", //确认密码
        code: "", //验证码

        check: false
      }
    };
  },
  created() {
    // 检测到登录就返回到首页
    const token = localStorage.getItem("username");
    if (token) {
      this.$router.push({ name: "home" });
    }
  },
  methods: {
    goRegister: function() {
      console.log(this.from.text);
      console.log(this.from.tel);
      console.log(this.from.paw);
      console.log(this.from.twoPaw);
      console.log(this.from.code);
      var res = {
        //登录成功为1，登录失败为0
        code: 1,
        msg: "密码错误"
      };

      // ajax请求

      if (res.code === 1) {
        this.$message({
          showClose: true,
          duration: 1000,
          center: true,
          message: "恭喜你，注册成功",
          type: "success"
        });
      } else {
        const h = this.$createElement;
        this.$notify({
          title: "温馨提示",
          duration: "1500",
          position: "top-right",
          message: h("span", { style: "color: teal" }, res.msg)
        });
      }
    },
    // 去登陆
    goLogin: function() {
      this.$router.push({ name: "login" });
    },
    // 去同意
    goAgree: function() {
      console.log("go agree");
    }
  }
};
</script>
<style lang="less" scoped>
.footer a.el-link.el-link--default {
  text-align: underline;
}
</style>
