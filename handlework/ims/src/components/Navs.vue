<!--
左边导航
-->

<template>
  <div class="navs">
    <!-- <h1>我是侧边栏</h1> -->

    <div class="logo" style="height: 130px;position:relative;">
      <!-- <img :src="$baseURL+logo.value" alt="" class="logoImg"> -->
      <img :src="fudiandongli" alt="" class="logoImg">
    </div>
    <div class="nav" style="overflow-y: scroll;">
      <el-container width="100%">
        <!-- background-color="#27272b" -->
        <el-menu router :default-active="this.$route.path" class="el-menu-vertical-demo linear" text-color="#fff"
          active-text-color="#fff">
          <!--左边颜色修改#ffd04b -->
          <!-- 没有收缩框 -->
          <!-- <el-menu-item index="/index">
            <i class="el-icon-menu"></i>
            <span slot="title">导航零</span>
          </el-menu-item> -->
          <!-- 有收缩框 -->
          <el-submenu v-for="(item,index) in nav" :key="index" :index="String(index)">
            <template slot="title">
              <div class="dottt" v-if="item.dot">{{item.dot}}</div>
              <!-- 一级title -->
              <div @click="tokao(index)" style="border-top:1px solid #fff;padding:0 20px;font-size:16px;"
                :style="curIndex==index?'background:#ccc':''">
                <img :src="curIndex==index?item.iconS:item.icon" class="menuIcon">
                <!-- <span :style="curIndex==index?'color:#409EFF;':''">{{ item.text }}</span> -->
                <span :class="curIndex==index?'oneRankActiveColor':''">{{ item.text }}</span>
              </div>
            </template>
            <div v-for="(items, indexs) in item.navChild" :key="indexs">
              <el-submenu v-if="items.hasChild&&leftmenuarr.indexOf(items.text)!=-1" @click="curIndex = index"
                :index="index+'-'+indexs">
                <div class="dottt" v-if="items.dot">{{items.dot}}</div>
                <template slot="title">
                  <!-- 二级title -->
                  <div style="margin:0 20px;margin-left:50px;font-size:16px;">{{items.text}}</div>
                </template>
                <el-menu-item v-for="(it,i) in items.navChild" :index="it.route"
                  @click="curIndex = index,curItemIndex=indexs" :class="curItemIndex==indexs?'itemClass':''"
                  style="font-size:16px;">
                  <!-- 三级 -->
                  <div class="dottt" v-if="it.dot">{{it.dot}}</div>
                  {{it.text}}
                </el-menu-item>
              </el-submenu>
              <el-menu-item :index="items.route" @click="curIndex = index,curItemIndex=indexs"
                v-if="!items.hasChild&&leftmenuarr.indexOf(items.text)!=-1">
                <!-- 二级 -->
                <!-- :style="curIndex == index&&curItemIndex==indexs?'background:#ccc':''" -->
                <!-- curIndex是第一级，curItemIndex是第二级 -->
                <div class="dottt" v-if="items.dot">{{items.dot}}</div>
                <div style="margin-left:10px;font-size:16px;">
                  {{ items.text}}
                </div>
              </el-menu-item>
            </div>
          </el-submenu>
        </el-menu>
      </el-container>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        allshenpinum:0,
        timer:'',
        kaoroutes: ['/index'],
        fudiandongli: require('@/assets/logow.jpg'),
        curItemIndex: 0,
        curIndex: 0,
        logo: '',
        login: false,
        nav: [
          {
            iconS: require("@/assets/iconw/zy (2).png"),
            icon: require("@/assets/iconw/zy (2).png"),
            text: "工作台",
            navChild: [
              { route: "/index", text: "首页" },
              { route: "/notice", text: "公告栏" },
              { route: "/email", text: "邮箱" },
              { route: "/checkCenter", text: "待办提醒" },
              { route: "/calendar", text: "日程安排" },
              { route: "/report", text: "工作汇报" }
            ]
          },
          {
            iconS: require("@/assets/iconw/rs (2).png"),
            icon: require("@/assets/iconw/rs (2).png"),
            text: "综合管理",
            navChild: [
              { route: "/organize", text: "组织架构" },
              {
                hasChild: true, text: '人力资源', navChild: [
                  { route: "/staff", text: "员工信息/合同管理" },
                  { route: "/position", text: "职位管理" }
                ]
              },
              { route: "/staffLink", text: "员工通讯录" },
              { route: "/relation", text: "转正/离职" },
              { route: "/achieve", text: "绩效考核" },
              {
                hasChild: true, text: '薪酬管理', navChild: [
                  { route: "/wageSheet", text: "工资单" },
                  { route: "/statistics", text: "业务提成" },
                ]
              },
              { route: "/store", text: "行政仓库" }
            ]
          },
          {
            iconS: require("@/assets/iconw/cw (2).png"),
            icon: require("@/assets/iconw/cw (2).png"),
            text: "文档管理",
            navChild: [
              {
                hasChild: true,
                text: "文档建设",
                navChild: [
                  {
                    route: "/myDocu",
                    text: "我的文档库"
                  },
                ]
              }, {
                route: "/publicDocu",
                text: "公共文件夹"
              }
            ]
          },
          {
            iconS: require("@/assets/iconw/sp (2).png"),//三  index
            icon: require("@/assets/iconw/sp (2).png"),
            text: "审批中心",
            dot:'',
            navChild: [
              {
                route: "/inCheckCenterCheck",
                text: "新建审批"
              }, {
                route: "/inCheckCenterUp",
                text: "我提交的审批"
              }, {
                route: "/checkOver",
                text: "已办结审批"
              }, {
                route: "/undersCheck",
                text: "待我审批",//3  index
                dot: ''
              }, {
                route: "/inCheckCenterCheckShare",
                text: "抄送我审批",//4
                dot: ''
              },
              {
                hasChild: true, text: '审批意见及评论',//5
                navChild: [
                  {
                    route: "/inReport",
                    text: "工作汇报",//5-0
                    dot: ''
                  }, {
                    route: "/inAchieve",
                    text: "绩效考核",//5-1
                    dot: ''
                  }, {
                    route: "/inRelation",
                    text: "转正/离职",//5-2
                    dot: ''
                  },
                  {
                    route: "/inArriConf",
                    text: "客户回款",//5-3
                    dot: ''
                  }, {
                    route: "/inAllOrder",
                    text: "订单审核",//5-4
                    dot: ''
                  }, {
                    route: "/contractincheck",
                    text: "合同审核",//5-5
                    dot: ''
                  }, {
                    route: "/sheetCheckByMe",
                    text: "工作单",//5-6
                    dot: ''
                  }, {
                    route: "/docuincheck",
                    text: "文档类",//5-7
                    dot: ''
                  }
                ]
              }
            ]
          },
          {
            iconS: require("@/assets/iconw/kh (2).png"),
            icon: require("@/assets/iconw/kh (2).png"),
            text: "客户管理",
            navChild: [
              {
                route: "/customMana",
                text: "客户管理"
              }, {
                route: "/undersCus",
                text: "我下属的客户"
              }, {
                route: "/viewpoint",
                text: "我关注的客户"
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
            iconS: require("@/assets/iconw/yw (2).png"),
            icon: require("@/assets/iconw/yw (2).png"),
            text: "业务管理",
            navChild: [
              {
                route: "/makeReq",
                text: "立项申请"
              },
              {
                route: "/orderMana",
                text: "订单管理"
              },
              {
                route: "/allOrder",
                text: "全部订单"
              },
              {
                route: "/contract",
                text: "合同"
              },
              {
                route: "/arriConf",
                text: "客户回款"
              },
            ]
          },
          {
            iconS: require("@/assets/iconw/gd (2).png"),
            icon: require("@/assets/iconw/gd (2).png"),
            text: "工单系统",
            navChild: [
              {
                route: "/newSheet",
                text: "新建工作单"
              },
              {
                route: "/sheetSys",
                text: "我派发的"
              },
              {
                route: "/mySheet",
                text: "我执行的"
              }
            ]
          }
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
    methods: {
      tokao(i) {

      },
      getleftmenunum() {
        this.$http.get('index/main').then(res => {
          this.nav[3].navChild[3].dot = res.dot.notice_a//待我审批
          this.nav[3].navChild[4].dot = res.dot.notice_b//抄送我审批
          // this.nav[3].navChild[5].navChild[0].dot = res.dot.notice_c//工作汇报
          this.nav[3].navChild[5].navChild[1].dot = res.dot.notice_d//绩效考核
          this.nav[3].navChild[5].navChild[2].dot = res.dot.notice_e//转正/离职
          this.nav[3].navChild[5].navChild[3].dot = res.dot.notice_f//客户回款
          this.nav[3].navChild[5].navChild[4].dot = res.dot.notice_g//订单审核
          this.nav[3].navChild[5].navChild[5].dot = res.dot.notice_h//合同审核
          this.nav[3].navChild[5].navChild[6].dot = res.dot.notice_i//工作单
          this.nav[3].navChild[5].navChild[7].dot = res.dot.notice_j//文档类
          let dots = res.dot
          this.nav[3].dot = dots.notice_a+dots.notice_b+dots.notice_d+dots.notice_e+dots.notice_f+dots.notice_g+dots.notice_h+dots.notice_i+dots.notice_j
        })
      }
    },
    created() {
      this.getleftmenunum()
      clearInterval(localStorage.getItem('shenpitimer'))
      let timer = setInterval(() => {
        this.getleftmenunum()
      }, 5000);
      localStorage.setItem('shenpitimer',timer)
      this.iamcaiwu = this.$http.allow('新建工资单')
      this.leftmenuarr = JSON.parse(localStorage.getItem('login_status')).info.auth.split(',')
      this.$bus.$off()
      this.$bus.$on('setIndex', (index) => {
        this.curIndex = index
      })
      if (localStorage.getItem('logo')) {
        this.logo = JSON.parse(localStorage.getItem('logo'))
      }
    }
  };
</script>
<style lang="less" scoped>
  /* @theme: var(--themeColor); */
  @theme: #6FAFF1;

  /* @theme:  red; */
  .navs {
    height: 100%;

    .logo {
      width: 250px;
      /* background-color: pink; */
      /* background-color: #4FBB88; */
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
    width: 140px;
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }



  .menuIcon {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }

  .selColor {
    /* background: red !important; */
    /* background:#212124 !important; */
  }

  .normalColor {
    /* background:#27272b !important; */
    background: blue !important;
  }

  /* 左边颜色修改 start*/
  .linear {
    /* background-image: linear-gradient(to left, #ccc 0%, #fff 20%, #ddd 40%, #eee 100%); */
    /* background-image: linear-gradient(to left, #e7f0fd 0%, #fff 20%, #e7f0fd 40%, #e7f0fd 60%,#eee 100%); */
    background: @theme
  }

  .el-menu>div,
  .el-menu>li {
    /* background-image: linear-gradient(to left, #ccc 0%, #fff 20%, #ddd 40%, #eee 100%); */
    background: @theme;
  }

  .logo,
  .nav {
    /* background-image: linear-gradient(to left, #ccc 0%, #fff 20%, #ddd 40%, #eee 100%); */
    background: @theme;
    /* background: #27272b !important; */
    /* background:#47474c !important */
    /* background-color: #4FBB88; */
  }

  .oneRankActiveColor {
    /* color:#343434; */
    color: #fff;
    font-weight: bold;
  }

  .el-menu-item:hover {
    background: #ccc;
  }

  /* /deep/.el-submenu__title{
    border-top:1px solid #fff;
  } */
  /deep/.el-submenu__icon-arrow {
    color: #fff;
  }

  /* 左边颜色修改 end*/
  .dottt {
    font-size: 12px;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: red;
    color: #fff;
    line-height: 14px;
    text-align: center;
    position: absolute;top: 50%;
    transform: translateY(-50%);
    right: 6px;
  }
</style>
<style>
  /* 左边颜色修改start*/

  .el-menu-item {
    /* color: #7d6b6b !important; */
    /* background-color: #808D9A !important; */
  }

  .el-menu-item.is-active {
    /* background:rgb(24, 141, 86) !important; */
    /* color:#5e5ed4 !important; */
    /* #27272b   #409EFF */
    background: #ccc !important;
  }

  /* 左边颜色修改end*/

  .el-submenu__title {
    color: #fff !important;
    padding: 0 !important;
    /* color:#7d6b6b !important; */
    /* background: #27272b !important; */
    /* background-image: linear-gradient(to left, #ccc 0%, #fff 20%,#ddd 40% ,#eee 100%); */
  }

  .is-active .el-submenu__title {
    /* background: #27272b !important; */
    /* background-image: linear-gradient(to left, #ccc 0%, #fff 20%,#ddd 40% ,#eee 100%); */
    /* color: #409EFF !important; */
  }

  .el-breadcrumb__inner.is-link {
    font-weight: 100 !important;
    color: #606266 !important;
  }

  .el-breadcrumb__separator {
    color: #606266 !important;
    font-weight: 100 !important;
  }

  .itemClass {
    /* background-color:red !important; */
  }
</style>