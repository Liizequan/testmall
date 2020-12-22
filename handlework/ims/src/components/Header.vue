<template>
  <div class="header">
    <!-- <h2>我是顶部组件</h2> -->
    <el-header style="height:120px;">
      <div class="right">
        <header>
          <div class="search">
            <!-- <el-input
              placeholder="搜索员工、客户、公司名称"
              prefix-icon="el-icon-search"
              v-model="searchText"
              circle
            >
            </el-input> -->
            <span style="position: absolute;left: 292px;">欢迎来到广州浮点动力科技服务有限公司!</span>
            <div>
              <ul class="between">
                <!-- <li v-for="(item, index) in userList" :key="index" @click="index == 0 ? 'ForgetPwd' : ''">
                  <el-badge :value="item.num" class="item">
                    {{ item.text }}
                    <i :class="item.icon"></i>
                  </el-badge>
                </li> -->
                <!-- <li>
                  <el-popover v-model="colorShow" placement="bottom"
                  trigger="hover">
                    <el-color-picker v-model="colorRes"></el-color-picker>
                    <el-badge value="" class="item" @click="colorShow = true" slot="reference">
                      主题
                      <i class="el-icon-reading"></i>
                    </el-badge>
                  </el-popover>
                </li> -->
                <li @click="changeBg">
                  <el-badge class="item">
                    切换主题
                    <i class="el-icon-reading"></i>
                  </el-badge>
                </li>
                <li @click="ForgetPwd">
                  <el-badge value="" class="item">
                    密码修改
                    <i class="el-icon-edit"></i>
                  </el-badge>
                </li>
                <li @click="infoClick">
                  <el-badge :value="tostInfo" class="item">
                    消息
                    <i class="el-icon-chat-dot-round"></i>
                  </el-badge>
                </li>
                <li @click="remindClick">
                  <el-badge :value="isNaN(allNum)?'':allNum" class="item">
                    提醒
                    <i class="el-icon-bell"></i>
                  </el-badge>
                </li>
                <li @click="">
                  <el-badge :value="isNaN(allNum)?'':allNum" class="item">
                    {{structure_name?structure_name:''}}
                  </el-badge>
                </li>
              </ul>
            </div>
          </div>
          <el-dropdown @command="handleCommand" style="height:40px">
            <span class="el-dropdown-link">
              <el-link :underline="false"> {{userName}}<i class="el-icon-arrow-down el-icon--right"></i></el-link>
            </span>
            <el-dropdown-menu slot="dropdown">
              <!-- <el-dropdown-item command="a">修改头像</el-dropdown-item>
              <el-dropdown-item command="b">修改资料</el-dropdown-item> -->
              <el-dropdown-item command="c">退出系统</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <div class="xyk-flex-items" :style="'background-image:url('+headUrl+')'">
            <!--  -->
            <!-- <el-avatar :size="user.sizeList" :src="headUrl" :fit="cover"></el-avatar> -->
          </div>
        </header>
        <footer class="bottom">
          <!-- <el-link icon="el-icon-edit">首页</el-link> -->
          <el-breadcrumb separator=">">
            <el-breadcrumb-item v-for="(item, index) in breadcrumb" :key="index" >
              <!-- :to="{ path: item.path }" -->
              <!-- <i class="el-icon-edit"></i> -->
              {{ item.name == "index" ? "首页" : item.name }}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </footer>
      </div>
    </el-header>



    <!-- 抽屉框 -->
    <el-drawer title="提醒" :with-header="false" :visible.sync="drawer" size="20%">
      <div class="header-drawer">
        <p class="title">提醒</p>
        <div class="data">
          <!-- 2020年1月1日 -->
          {{dataTime}}
        </div>
        <div class="tixing-info">
          <h4>待处理事项：</h4>
          <ul class="font14-nobold-9">
            <li @click="goshenpi">
              <p> 需要审批事项共有</p> <span>{{approval}}</span>
            </li>
            <!-- <li @click="goxiaoxi">
              <p> 未阅读信息</p> <span>{{schedule}}</span>
            </li> -->
            <li @click="gogondan">
              <p> 新增工单</p> <span>{{workorder}}</span>
            </li>
            <li @click="goyojian">
              <p> 未阅读邮件</p> <span>{{email}}</span>
            </li>
            <li @click="gorichen">
              <p> 日程</p> <span>{{info}}</span>
            </li>
          </ul>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        themeIndex:0,
        themeInData: [
          { theme: require('@/assets/theme1.jpg') },
          { theme: require('@/assets/theme2.jpg') },
          { theme: require('@/assets/theme3.jpg') },
          { theme: require('@/assets/theme4.jpg') },
          { theme: require('@/assets/theme5.jpg') },
          { theme: require('@/assets/theme6.jpg') },
          { theme: require('@/assets/theme7.jpg') },
          { theme: require('@/assets/theme8.jpg') },
          { theme: require('@/assets/theme9.jpg') },
          { theme: require('@/assets/theme10.jpg') }
        ],
        colorRes: '',
        colorShow: false,
        headUrl: '',
        dataTime: '',
        searchText: "", //搜索内容
        user: {
          sizeList: "medium"
          // circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
        },
        // userList: [
        //   { icon: "el-icon-edit", text: "密码修改" },
        //   { icon: "el-icon-chat-dot-round", text: "消息", num: 2 },
        //   { icon: "el-icon-bell", text: "提醒", num: 3 }
        // ],
        breadcrumb: [],
        userName: '用户名',
        allNum: '',

        // 消息
        tostInfo: 0,
        // 抽屉
        drawer: false,
        text: '18',
        approval: '',
        email: '',
        info: '',
        schedule: '',
        workorder: '',
        structure_name:''
      };
    },
    props: {
      list: String
    },
    mounted() {
      this.initTheme()
    },
    created() {
      this.$bus.$off();
      this.$bus.$on('topHasNewMsg',()=>{
        console.log('+++++++++++')
        this.tostInfo++
      })
      this.headUrl = this.$baseURL+JSON.parse(localStorage.getItem('login_status')).info.head
      this.breadcrumb = this.$route.matched;
      if (localStorage.getItem('login_status')) {
        this.userName = JSON.parse(localStorage.getItem('login_status')).info.name
        this.structure_name = JSON.parse(localStorage.getItem('login_status')).info.structure_name
      }
      var data = new Date();
      this.getIndexData()

      var curDate = new Date();
      var curYear = curDate.getFullYear();  //获取完整的年份(4位,1970-????)
      var curMonth = curDate.getMonth() + 1;  //获取当前月份(0-11,0代表1月)
      var curDay = curDate.getDate();       //获取当前日(1-31)
      this.dataTime = curYear + '年' + curMonth + '月' + curDay + '日'
    },
    methods: {
      goshenpi() {
        this.drawer = false
        if (this.$route.path != '/inCheckCenterCheck') {
          this.$router.push('/inCheckCenterCheck')
        }
      },
      goxiaoxi() {
        this.drawer = false
        if (this.$route.path != '/chat') {
          this.$router.push('/chat')
        }
      },
      gogondan() {
        this.drawer = false
        if (this.$route.path != '/sheetSys') {
          this.$router.push('/sheetSys')
        }
      },
      goyojian() {
        this.drawer = false
        if (this.$route.path != '/email') {
          this.$router.push('/email')
        }
      },
      gorichen() {
        this.drawer = false
        if (this.$route.path != '/calendar') {
          this.$router.push('/calendar')
        }
      },
      handleCommand(command) {
        // this.$message("click on item " + command);
        if (command == 'c') {
          this.$confirm('此操作将退出系统, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            // window.opener=null;
            // window.open('',self);
            // window.close();
            // window.location.href="about:blank";
            localStorage.setItem('token', '')
            this.$router.push('/login')
            clearInterval(localStorage.getItem('shenpitimer'))
          }).catch(() => {

          });

        }
      },
      ForgetPwd(index) {
        this.$router.push('/modify')
      },
      // 前往聊天接口
      infoClick() {
        if (this.$route.path == '/chat') {
          return false
        }
        this.$router.push('/chat')
      },
      // 前往提醒接口[词典]	remind;
      remindClick() {
        this.drawer = true
      },
      handleClose(done) {
        this.$confirm('还有未保存的工作哦确定关闭吗？')
          .then(_ => {
            done();
          })
          .catch(_ => { });
      },
      //获取首页数据
      getIndexData() {
        this.$http.get('index/main', { token: localStorage.getItem('token') }).then(res => {
          // this.tostInfo = res.info
          var message = res.message
          this.approval = message.approval
          this.email = message.email
          this.info = message.schedule//日程
          this.schedule = message.schedule
          this.workorder = message.workorder
          this.allNum = parseInt(message.approval) + parseInt(message.email)  + parseInt(message.schedule) + parseInt(message.workorder)
        })
      },
      changeBg() {
        document.getElementsByClassName('el-header')[0].style.setProperty('background', "url(" + this.themeInData[++this.themeIndex].theme + ")")
        localStorage.setItem('themeIndex',this.themeIndex)
        if(this.themeIndex>=this.themeInData.length-1){
          this.themeIndex = -1
        }
      },
      initTheme(){
        if(localStorage.getItem('themeIndex')){
          this.themeIndex = localStorage.getItem('themeIndex')
        }
        document.getElementsByClassName('el-header')[0].style.setProperty('background', "url(" + this.themeInData[this.themeIndex].theme + ")")
        if(this.themeIndex>=this.themeInData.length-1){
          this.themeIndex = -1
        }
      }
    },
    watch: {
      $route(to, from) {
        this.breadcrumb = to.matched;
        this.getIndexData()
      },
      colorRes() {
        document.body.style.setProperty('--themeColor', this.colorRes);
        localStorage.setItem('themeColor', this.colorRes)
        this.$http.post('theme/setThemeColor', {
          color: this.colorRes
        }).then(res => {
          if (res.code == 1) {
            this.$message('修改成功')
          }
        })
      }
    },
  };
</script>
<style lang="less" scoped>
  @theme: #6faff1;

  /* @theme:localStorage.getItem(''); */
  .xyk-text-right {
    text-align: right;
  }

  .xyk-flex-items {
    display: flex;
    align-items: center;
    margin: 0 20px;
    width:36px !important;
    height: 36px;
    background-size: cover;
    border-radius: 18px;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }

  /* ele的样式 */
  /* 头部 */
  /* 顶部颜色修改 start */

  /deep/.el-breadcrumb__inner.is-link {
    color: #fff !important;
  }

  /deep/.el-breadcrumb__separator {
    color: #fff !important;
  }

  /deep/.el-link--inner {
    color: #fff !important;
  }

  .right {
    color: #fff !important;
    text-shadow: 0px 0px 2px #000;
  }
  /deep/.el-breadcrumb__inner{
    color:#fff !important;
  }
  .el-header {
    /* background: var(--themeColor); */
    /* background:url('../assets/theme1.jpg'); */
    /* background-image: url('../assets/theme1.jpg'); */
    /* background-position: center;*/
    background-size:cover !important; 
    /* background-size: contain !important; */
    border-bottom: #fff 4px solid;
    border-left: 2px solid #fff;
    /* background-image:linear-gradient(to bottom,#eee 0%,#ddd 40%,#fff 60%,#ddd 80%,#ccc 90%,#ddd 100%); */
    font-size: 14px;
    padding: 0;
    display: flex;
    justify-content: space-between;
  }

  .header .bottom {
    border-top: 2px dashed #fff;
  }
  /* 顶部颜色修改 end*/
  // 方向
  .el-icon--right {
    transform: rotate(-90deg);
  }

  // 姓名
  .el-dropdown {
    display: block;
    position: relative;
    color: #353442;
    height: 70px;
    line-height: 70px;
  }

  // 提醒
  .el-badge__content.is-fixed {
    top: 15px;
  }

  .el-input__inner {
    border-radius: 30px;
  }

  /*自定义*/
  .header {
    height: 120px;

    .right {
      display: flex;
      flex: 1;
      flex-direction: column;

      header {
        height: 70px;
        display: flex;
        justify-content: flex-end;

        .search {
          display: flex;
          flex: 1;
          align-items: center;
          justify-content: flex-end;
          margin-right: 40px;

          .el-input {
            width: 260px;
            margin-right: 40px;
          }

          li {
            height: 30px;
            line-height: 30px;
            padding: 10px;

            i {
              margin-right: 5px;
            }
          }
        }
      }
    }


    .bottom {
      /* width: 100%; */
      display: flex;
      flex: 1;
      align-items: center;
      background: skyblue;
      color: #fff;
      padding-left: 40px;
    }
  }

  .item {
    cursor: pointer;
  }

  .header-drawer {
    .title {
      font-size: 16px;
      color: #fff;
      background-color: #409EFF;
      padding: 20px;
    }

    .data {
      font-size: 24px;
      color: #409EFF;
      font-weight: bold;
      padding: 30px 0;
      border-bottom: 1px solid #ddd;
    }

    .tixing-info {
      text-align: left;
      padding: 0 40px;

      h4 {
        padding: 30px 0;
        font-weight: bold;
        color: #353442;
      }

      ul>li {
        height: 34px;
        line-height: 34px;
        display: flex;
        justify-content: space-between;
        cursor: pointer;
      }

      ul>li:hover {
        color: #409EFF;
      }
    }
  }

  .header .bottom {
    background: none;
    /* border-top: 1px solid #e5e5e5; */
    box-shadow: 0 3px 2px 0px rgba(0, 0, 0, .02);
    height: 40px;
  }
</style>
<style>
  .el-popover.el-popper {
    min-width: 40px;
  }
</style>