<template>
  <div id="app">
    <!-- 第一次进来的页面 -->
    <!-- <div id="nav">
      <Navs/>
    </div> -->

    <!-- 内容 -->
    <!-- 登录路由 -->

    <!-- 已登录路由 -->
    <div id="content"  v-if="($route.path != '/login') || ($route.path != '/forget') || ($route.path != '/register')" >
      <!-- 左导航 -->
      <div class="app-aside">
        <Navs />
      </div>
      <!-- 右导航 -->
      <div class="app-main">
        <!-- 头部 -->
        <Header />
        <!-- 底部 -->
        <div class="app-main-router content-back">
          <router-view />
        </div>
      </div>
    </div>
    
    <router-view v-else/>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Navs from "./components/Navs.vue";
// import Navs from "./views/navs/Navs.vue";

export default {
  name: "app",
  components: {
    Navs,
    Header
  },
  data() {
    return {
      login: false,
      nav: [
        {
          route: "/home",
          text: "Home"
        },
        {
          route: "/about",
          text: "About"
        }
      ],
      token:'',
    };
  },

  created() {
    const login_status = JSON.parse(localStorage.getItem("login_status"));
    if(this.$route.path != '/login' || this.$route.path != '/forget' || this.$route.path != '/register'){
      if(login_status.code == '-2'){
        console.log('不在登录页面')
        this.$confirm('登录已经失效/您还没有登录？是否前往登录', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '正在前往!'
          });
          this.$router.push({
            name: "login"
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消登录'
          });          
        });
      }
    }
  },
  watch: {
    $route(to, from) {
      const token = localStorage.getItem("token");
      if(!token){
        this.$router.push({
          name: "login"
        });
      }
      const login_status = JSON.parse(localStorage.getItem("login_status"));
      // console.log(login_status)
      if(to.path != '/login'){
        if(login_status.code == '-2'){
          console.log('不在登录页面')
          this.$confirm('登录已经失效/您还没有登录？是否前往登录', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$message({
              type: 'success',
              message: '正在前往!'
            });
            this.$router.push({
              name: "login"
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消登录'
            });          
          });
        }
      }
    }
  }
};
</script>

<style lang="less">
body,
h1,
h2,
h3,
h4,
h5,
h6,
ol,
ul,
li,
p {
  padding: 0;
  margin: 0;
  list-style: none;
}

.between {
  display: flex;
  justify-content: space-between;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#content {
  width: 100%;
  height: 100vh;
  .app-aside {
    width: 250px;
    float: left;
    background-color: pink;
    overflow: overlay;
  }
  .app-main {
    width: calc(100%);
    min-width: 1200px;
    .app-main-router {
      height: calc(100vh - 130px);
      overflow: overlay;
    }
    .app-main-router::-webkit-scrollbar {
      width: 8px;
      /*高宽分别对应横竖滚动条的尺寸*/
      height: 8px;
    }
    /*滚动条里面小方块*/
    .app-main-router::-webkit-scrollbar-thumb {
      border-radius: 5px;
      height: 5px;
      -webkit-box-shadow: inset 0 0 5px rgb(84, 92, 100);
      background: rgb(84, 92, 100);
    }
    /*滚动条里面轨道*/
    .app-main-router::-webkit-scrollbar-track {
      border-radius: 0;
    }
  }
}
</style>
