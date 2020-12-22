<!--
左边导航
-->

<template>
  <div class="navs">
    <!-- <h1>我是侧边栏</h1> -->

    <div class="logo" style="height: 130px;position:relative;">
      <img :src="$baseURL+logo.value" alt="" class="logoImg">
    </div>
    <div class="nav">
      <el-container width="100%">
        <el-menu router :default-active="this.$route.path" class="el-menu-vertical-demo" background-color="#27272b"
          text-color="#fff" active-text-color="#ffd04b">
          <!-- 没有收缩框 -->
          <!-- <el-menu-item index="/index">
            <i class="el-icon-menu"></i>\
            <span slot="title">导航零</span>
          </el-menu-item> -->

          <!-- 有收缩框 -->
          <div v-for="(item, index) in nav" :key="index">
            <el-submenu :index="String(index)" style="background-color: pink;">
              <template slot="title" style="background-color: pink">
                <!-- <i class="el-icon-location"></i> -->
                <img :src="curIndex==index?item.iconS:item.icon" class="menuIcon">
                <span>{{ item.text }}</span>
                <!-- :class="curIndex==index?'selColor':'normalColor'" -->
              </template>
              <el-menu-item-group v-for="(items, indexs) in item.navChild" :key="indexs" @click="curItemIndex=indexs">
                <template slot="title"></template>
                <el-menu-item :index="items.route" @click="curIndex = index">{{ items.text}}
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </div>
        </el-menu>
      </el-container>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        curItemIndex: 0,
        curIndex: 0,
        logo: '',
        login: false,
        nav: [
          {
            iconS: require("@/assets/icon/zy (2).png"),
            icon: require("@/assets/icon/zy.png"),
            text: "工作台",
            navChild: [
              { route: "/index", text: "首页" },
              { route: "/notice", text: "公告栏" },
              { route: "/email", text: "邮箱" },
              // { route: "/memorial", text: "备忘录" },
              {route: "/checkCenter",text: "待办审批"},
              { route: "/calendar", text: "日历日程" },
              { route: "/report", text: "工作汇报" }
            ]
          },
          // {
          //   iconS: require("@/assets/icon/gz (2).png"),
          //   icon: require("@/assets/icon/gz.png"),
          //   text: "工作汇报",
          //   navChild: [
          //     { route: "/report", text: "工作汇报" },
          //   ]
          // },
          {
            iconS: require("@/assets/icon/rs (2).png"),
            icon: require("@/assets/icon/rs.png"),
            text: "综合管理",
            navChild: [
              { route: "/organize", text: "组织架构" },
              { route: "/staff", text: "人事行政" },
              { route: "/relation", text: "员工关系" },
              { route: "/position", text: "职位架构" },
              { route: "/staffLink", text: "员工通讯录" },
              {route: "/wageSheet",text: "工资单"},
              {route: "/statistics",text: "业务提成统计"},
              {route: "/store",text: "行政仓库"}
            ]
          },
          // {
          //   iconS: require("@/assets/icon/cw (2).png"),
          //   icon: require("@/assets/icon/cw.png"),
          //   text: "财务管理",
          //   navChild: [
          //     {route: "/wageSheet",text: "工资单"},
          //     {route: "/statistics",text: "业务提成统计"},
          //     {route: "/store",text: "行政仓库"}
          //   ]
          // },
          {
            iconS: require("@/assets/icon/cw (2).png"),
            icon: require("@/assets/icon/cw.png"),
            text: "文档管理"
          },
          {
            iconS: require("@/assets/icon/sp (2).png"),
            icon: require("@/assets/icon/sp.png"),
            text: "审批中心",
            navChild: [

              { route: "/achieve", text: "绩效考核" },
            ]
          },
          {
            iconS: require("@/assets/icon/kh (2).png"),
            icon: require("@/assets/icon/kh.png"),
            text: "客户管理",
            navChild: [
              {
                route: "/customMana",
                text: "客户管理"
              },
              {
                route: "/contact",
                text: "客户通讯录"
              },
              {
                route: "/message",
                text: "短信计划"
              }
            ]
          },
          {
            iconS: require("@/assets/icon/yw (2).png"),
            icon: require("@/assets/icon/yw.png"),
            text: "业务管理",
            navChild: [
              {
                route: "/makeReq",
                text: "立项申请"
              },
              {
                route: "/allOrder",
                text: "全部订单"
              },
              {
                route: "/orderMana",
                text: "订单管理"
              },
              {
                route: "/contract",
                text: "合同"
              },
              {
                route: "/arriConf",
                text: "到账确认"
              },
              // {
              //   route: "/busiDistr",
              //   text: "业务分派"
              // },
              // {
              //   route: "/busiGuide",
              //   text: "业务指南"
              // },
              // {
              //   route: "/markActiv",
              //   text: "市场活动"
              // }
            ]
          },
          {
            iconS: require("@/assets/icon/gd (2).png"),
            icon: require("@/assets/icon/gd.png"),
            text: "工单系统",
            navChild: [
              {
                route: "/newSheet",
                text: "新建工作单"
              },
              {
                route: "/sheetSys",
                text: "全部工作单"
              }
            ]
          }
          // {
          //   iconS: require("@/assets/icon/sc (2).png"),
          //   icon: require("@/assets/icon/sc.png"),
          //   text: "市场营销",
          //   navChild: [

          //   ]
          // }
        ]
      };
    },
    computed: {
      numberFun: function (value) {
        return parseInt(value);
      }
    },
    watch: {
    },
    created() {
      if (localStorage.getItem('logo')) {
        this.logo = JSON.parse(localStorage.getItem('logo'))
      }
    }
  };
</script>
<style lang="less" scoped>
  .navs {
    height: 100%;

    .logo {
      width: 250px;
      // background-color: pink;
      background-color: #4FBB88;
      /* background-image: linear-gradient(to right, #0acffe 0%, #495aff 100%); */
      line-height: 130px;
    }

    .nav {
      height: calc(100vh - 130px);
      overflow: overlay;
    }

    .nav::-webkit-scrollbar {
      width: 4px;
      /*高宽分别对应横竖滚动条的尺寸*/
      height: 4px;
    }

    /*滚动条里面小方块*/
    .nav::-webkit-scrollbar-thumb {
      border-radius: 5px;
      height: 5px;
      -webkit-box-shadow: inset 0 0 5px rgb(84, 92, 100);
      background: rgb(84, 92, 100);
    }

    /*滚动条里面轨道*/
    .nav::-webkit-scrollbar-track {
      border-radius: 0;
    }
  }

  /* 去掉滚动条 */

  .el-aside {
    overflow: hidden;
  }

  .el-submenu,
  .el-menu-item {
    text-align: left;
  }

  .el-menu {
    width: 100%;
    border-right: 0;
  }

  .logoImg {
    width: 100px;
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .logo,
  .nav {
    background: #27272b !important;
     /* background-color: #4FBB88; */
  }

  .menuIcon {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }

  .selColor {
    background: red !important;
    /* background:#212124 !important; */
  }

  .normalColor {
    /* background:#27272b !important; */
    background: blue !important;
  }
</style>
<style>
  .el-menu-item {
    color: #fff !important;
    /* background-color: #808D9A !important; */
  }

  .el-menu-item.is-active {
    /* background:rgb(24, 141, 86) !important; */
    /* color:#5e5ed4 !important; */
    /* #27272b   #409EFF*/
    background: #409EFF !important;
  }

  .el-submenu__title {
    background: #27272b !important;
  }

  .is-active .el-submenu__title {
    background: #27272b !important;
    color: #409EFF !important;
  }

  .el-breadcrumb__inner.is-link {
    font-weight: 100 !important;
    color: #606266 !important;
  }

  .el-breadcrumb__separator {
    color: #606266 !important;
    font-weight: 100 !important;
  }
</style>