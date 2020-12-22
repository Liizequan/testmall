<template>
  <div id="app">
    <!-- 第一次进来的页面 -->
    <!-- <div id="nav">
      <Navs/>
    </div>-->

    <!-- 内容 -->
    <!-- 登录路由 -->

    <!-- 已登录路由 -->
    <div id="content" v-if="$route.path !='/login' && $route.path !='/forget' && $route.path != '/modify'">
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
          <keep-alive>
            <router-view v-if='$route.meta.keepAlive'></router-view>
          </keep-alive>
          <router-view v-if='!$route.meta.keepAlive'></router-view>
        </div>
      </div>
    </div>

    <router-view v-else />
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
        token: ""
      };
    },
    methods: {},
    created() {
      this.$http.get('index/structure').then(res => {
        localStorage.setItem('structure', JSON.stringify(res))
      })
      let ws = new WebSocket('ws://ims.gzfloat.com:2348?user_id=' + JSON.parse(localStorage.getItem('login_status')).info.user_id);//本人
      ws.onopen = (res) => { }
      ws.onmessage = (result) => {//onmessage只能有一个，当别的地方再次onmessage时，这里也就是原先的onmessage将不再接收数据
        console.log(result, 'AppApp')
        if (this.$route.path != '/chat') {
          this.$bus.$emit('topHasNewMsg')
        }
        console.log(JSON.parse(result.data), 'kkkkkkkkkkkk')
        if (JSON.parse(result.data).group_id) {
          if (this.$store.state.newMsgGroupIdsArr.indexOf(JSON.parse(result.data).group_id) == -1) {
            this.$store.state.newMsgGroupIdsArr.push(JSON.parse(result.data).group_id)
          }
        } else {
          if (this.$store.state.hasNewMsgIdsArr.indexOf(JSON.parse(result.data).from) == -1) {
            this.$store.state.hasNewMsgIdsArr.push(JSON.parse(result.data).from)
          }
          if (JSON.parse(result.data).from) {
            this.$http.get('user/frominfo', {
              user_id: JSON.parse(result.data).from
            }).then(res => {
              if (this.$store.state.hasNewMsgStructureArr.indexOf(res.msg.from_structrure) == -1) {
                this.$store.state.hasNewMsgStructureArr.push(res.msg.from_structrure)
              }
            })
          }
        }
      }
      this.$store.state.ws = ws
      this.$http.get('user/index', {
        token: localStorage.getItem("token")
      }).then(res => {
        var addressMen = [];
        for (var i of res) {
          var user = i.user
          for (var j = 0; j < user.length; j++) {
            if (user[j]) {
              addressMen.push(user[j])
            }
          }
        }
        localStorage.setItem('guishurenyuan', JSON.stringify(addressMen))
      })
      this.$http.get('Marketing/type').then(res => {
        //客户类型
        localStorage.setItem('customerType', JSON.stringify(res))
      })
      this.$http.get('Marketing/industry').then(res => {
        //所属行业
        localStorage.setItem('industry', JSON.stringify(res))
      })
      this.$http.getMen();
      this.$http.getCustomers();
      document.body.style.setProperty(
        "--themeColor",
        localStorage.getItem("themeColor")
      ); //刷新时
      const login_status = JSON.parse(localStorage.getItem("login_status"));
      if (this.$route.path != "/login") {
        if (login_status.code == "-2") {
          this.$confirm("登录已经失效/您还没有登录？是否前往登录", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              this.$message({
                type: "success",
                message: "正在前往!"
              });
              this.$router.push({
                name: "login"
              });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "取消登录"
              });
            });
        }
      }
    },
    watch: {
      $route(to, from) {
        // const token = localStorage.getItem("token");
        // if(!token){
        //   this.$router.push({
        //     name: "login"
        //   });
        // }
        const login_status = JSON.parse(localStorage.getItem("login_status"));
        if (to.path != "/chat") {
          let timer = localStorage.getItem('timer')
          clearInterval(timer)
        }
        if (to.path != "/login") {
          if (login_status.code == "-2") {
            this.$confirm("登录已经失效/您还没有登录？是否前往登录", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            })
              .then(() => {
                this.$message({
                  type: "success",
                  message: "正在前往!"
                });
                this.$router.push({
                  name: "login"
                });
              })
              .catch(() => {
                this.$message({
                  type: "info",
                  message: "取消登录"
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
        height: calc(100vh - 120px);
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
        /* background-image: linear-gradient(-225deg, #5D9FFF 0%, #B8DCFF 48%, #6BBBFF 100%); */
      }

      /*滚动条里面轨道*/
      .app-main-router::-webkit-scrollbar-track {
        border-radius: 0;
      }
    }
  }

  .bitianstyle {
    font-size: 14px;
    color: #999;
  }

  .tableTitleStyle {
    font-size: 18px;
    font-weight: bold;
  }

  .tableStyle {
    font-size: 14px;
  }

  .content-back {
    overflow-y: scroll !important;
  }

  /* table width problem start */
  /deep/.el-table__body,
  /deep/.el-table__header {
    width: 100% !important;
  }
  /* table width problem end */
</style>