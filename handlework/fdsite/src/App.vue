<template>
  <div id="app">
    <div class="header">
      <div class="header-logo">
        <router-link to="/index">
        <!-- <img src="./components/fd_logo.png" class="block"/> -->
        <img src="./image/fd_logo.png" alt="">
        <div>
          <h2>广州浮点动力科技服务有限公司</h2>
          <p>Guangzhou FP Technology services Co., Ltd.</p>
        </div>
        </router-link>
      </div>
      <div class="header-nav">
        <ul class="header-item">
          <li class="header-list" v-for="(item,index) in nav" :key="index" @click="navClick(index)" :class="actives==index?'actives':''" @mouseenter="enter(index)">
            <router-link :to="item.to" >{{item.title}}</router-link>
            <span v-if="item.span!=''">{{item.span}}</span>
            <div class="nav-bar" v-if="index==navBarNum" @mouseleave="leave()">
              <div class="between" v-if="item.subTitle!=null">
                <p  class="nav-item"><a href="javascript:;">{{item.subTitle}}</a> <span v-if="item.right" class="el-icon-arrow-right"></span></p>
                <ul class="nav-list">
                  <li v-for="(item1,index) in item.navChild" :key="index" >
                    <a :href="item1.to">{{item1.title}}</a>
                  </li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="header-search">
        <!-- <el-input
          v-model="search"
          @keyup.enter.native="onSubmit"
        >
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input> -->
        <el-autocomplete
          class="inline-input"
          v-model="search"
          :fetch-suggestions="querySearch"
          placeholder="请输入内容"
          :trigger-on-focus="false"
          @select="handleSelect"
          
        >
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-autocomplete>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return { 
      search:'',
      actives:0,//表示颜色变化
      active:0  ,//点击切换
      navBarNum:1,//判断是否显示
      nav:[
        {to:'/index',title:'首页',span:'/'},
        {
          to:'/system',
          title:'系统开发',
          span:'/',
          subTitle:'系统开发',
          right:true,
          navChild:[
            {title:'高端网站建设',to:'#system1'},
            {title:'APP开发',to:'#system2'},
            {title:'微信小程序',to:'#system3'},
            {title:'企业商城建设',to:'#system4'},
            {title:'后台数据库搭建',to:'#system5'},
          ]
        },
        {
          to:'/brank',
          title:'品牌打造',
          span:'/',
          subTitle:'品牌打造',
          right:true,
          navChild:[
            {title:'LOGO设计',to:'#brank1'},
            {title:'企业画册',to:'#brank2'},
            {title:'企业VI',to:'#brank2'},
            // {title:'企业活动物料',to:'#brank3'},
            // {title:'企业文化墙',to:'#brank3'},
          ]
        },
        { 
          to:'/science',
          title:'科技项目申报',
          span:'/',
          subTitle:'项目申报',
          right:true,
          navChild:[
            // {title:'商标申请',to:'#science1'},
            {title:'商标注册',to:'#science1'},
            // {title:'版权登记',to:'#science2'},
            {title:'专利申请',to:'#science2'},
            {title:'高新技术认定',to:'#science3'},
            // {title:'知识产权贯标',to:'#science5'},
          ]
        },
        { 
          to:'/about',
          title:'关于我们',
          span:'/',
          subTitle:'关于我们',
          right:true,
          navChild:[
            {title:'公司简介',to:'#about1'},
            // {title:'企业文化',to:'#about2'},
            {title:'未来愿景',to:'#about3'},
            {title:'联系我们',to:'#about4'},
          ]
        },
        { 
          to:'/careers',
          title:'招贤纳士',
          span:''
        },
      ],
      // 搜索
      restaurants: [],
      search: ''
    }
  },
  methods: {
    navClick:function(e){
      console.log(e)
      this.actives=e
      var routes = this.nav[e].to
      // console.log(routes)
      this.$router.push({  //核心语句
        path:routes,   //跳转的路径
      })
    },
    // 移入

    enter:function(e){
      // console.log(e); 
      this.navBarNum=e
    },
    // 移出
    leave:function(){
      this.navBarNum=null
      // console.log(this.actives)
      // var routes = this.nav[this.actives].to
      // this.$router.push({  //核心语句
      //   path:routes, 
      // })
    },
    //搜索  
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
      console.log('添加')
      console.log(queryString)//输入的内容
      console.log(cb)//调用的函数
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    loadAll() {
      return [
        { "value": "系统开发", "to":'/system'},
        { "value": "高端网站", "to":'/system'},
        { "value": "建设APP开发", "to":'/system'},
        { "value": "微信小程序", "to":'/system'},
        { "value": "企业商城建设", "to":'/system'},
        { "value": "后台数据库搭建", "to":'/system'},

        { "value": "品牌打造", "to":'/brank'},
        { "value": "LOGO设计", "to":'/brank'},
        { "value": "企业画册", "to":'/brank'},
        { "value": "企业VI", "to":'/brank'},
        { "value": "企业活动物料", "to":'/brank'},
        { "value": "企业文化墙", "to":'/brank'},

        { "value": "项目申报 ", "to":'/science'},
        { "value": "商标申请", "to":'/science'},
        { "value": "版权登记", "to":'/science'},
        { "value": "专利申请", "to":'/science'},
        { "value": "高新技术认定", "to":'/science'},
        { "value": "知识产权贯标", "to":'/science'},
         
        { "value": "关于我们 ", "to":'/about'},
        { "value": "公司简介", "to":'/about'},
        { "value": "企业文化", "to":'/about'},
        { "value": "未来愿景", "to":'/about'},
        { "value": "联系我们", "to":'/about'},

      ]
    }, 
    handleSelect(item) {
      console.log(item.to);
      // 路由跳转
      this.search = '';
      this.$router.push({path:item.to})
    }
  },
  // 页面刷新时调用
  mounted() {
    this.restaurants = this.loadAll();//调用搜索框


    // console.log(this.$route.path)//获取路由
    // this.routers = this.$route.path
    // this.$router.push({  //核心语句
    //   path:routes, 
    // })
    this.navBarNum=null
    var nav = this.nav
    var that = this;
    for(var i in nav){
      if(nav[i].to==that.$route.path){
        that.navBarNum = i
        that.actives = i
        // console.log(i)
      }
    }
  },
  // 页面返回时调用
  watch: {
    // 页面返回上一步时调用
    $route(to,from){
      // console.log(to)//to目前地址   from 上一个页面地址
      for(var i in this.nav){
        if(this.nav[i].to == to.path){
          // console.log(i)
          this.navBarNum = i
          this.actives = i
        }
      }
    }
  },
}
</script>

<style>



body,a,p,b,h1,h2,h3,h4,h5,h6,ul,li,img,textarea{
  padding:0;
  margin:0;
  list-style:none;
  text-decoration: none;
  font-family: 'Microsoft Yahei'
}
ol{
  padding:0;
  margin:0;
}
.bg-color{
  background:#F9F9F9;
}
.bold5{
  font-size:34px;
  height:34px;
  line-height:34px;
  font-weight:500;
  color:#333333;
}
.bold{
  font-size:34px;
  height:34px;
  color:#333;
  line-height:34px;
  font-weight:bold;
}
.gray9{
  font-size:14px;
  color:#999999;
}
.between{
  display:flex;
  justify-content: space-between;
}
.column{
  display: flex;
  flex-direction: column;
}
.self{
  display: flex;
  flex-direction: column;
  align-self: center;
}
.warp{
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.wrap{
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.wraps{
  display: flex;
  flex-wrap:wrap;
}
.around{
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
.flex-left{
  display: flex;
  flex-direction: row;
  justify-content:left;
}
.img-center{
  position:absolute;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
}
.img-x-center{
  position:absolute;
  top:0;
  left:50%;
  transform: translateX(-50%);
}
.img-y-center{
  position: absolute;
  top:50%;
  left:0;
  transform: translateY(-50%);
}
.text-center{
  text-align: center;
}


/* 头部导航条 */
.header-logo a{
  display: flex;
  justify-content: space-between;
  color:#333333;
}
.header-logo img{
  width:47px;
  height:38px;
  margin-right:15px;
}
.header-logo h2{
  font-size:16px;
}
.header-logo p{
  font-size:10px;
}
.nav-bar{
  position: absolute;
  top: 59px;
  width:100%;
  min-width:1200px;
  /* overflow: hidden; */
  left: 0px;
  background:#fff;
  margin:42px auto 15px;
  font-size: 14px;
  z-index:100;
  /* border-top:1px solid #E9E9E9; */
}
.header .nav-bar .between{
  width:1200px;
  margin:auto;
}
.header .nav-item{
  color: #1371FF;
  padding-left:78px;
  align-self:center;
}
.header .nav-item a{
  padding-right: 20px;
  color: #1371FF;
  display: inline-block;
}
.header .nav-item span.el-icon-arrow-right{
  color: #1371FF;
  font-weight: 600;
}
.header .nav-list{
  flex:1;
  padding-left:220px;
}
.header .nav-list li a{
  padding:30px 0px; 
  margin-right:60px;
}

.header{
    width:1200px;
    margin:auto;
    display:flex;
    padding:30px 0;
    /* background: pink; */
    justify-content:space-between;
  }
  .header-nav {
    flex:1;
  }
  .header-nav .header-item{
    /* background: pink; */
    /* overflow: hidden; */
    display: flex;
    justify-content: flex-end;
  }
  .header-nav .el-breadcrumb{
    height:40px;
    line-height:40px;
  }
  .header-nav li a{
    /* background:pink; */
    position:relative;
  }
  .header-nav li.actives>a{
    color: #1371FF;
  }
  .header-nav .header-list:hover>a{
    color: #1371FF;
  }
  .nav-bar{
    border-top: 1px solid transparent;
  }
  .header-nav .header-list:hover .nav-bar{
    border-top: 1px solid #E9E9E9;
  }
  .header-nav .header-list:hover>a::before{
    content: '';
    position:absolute;
    bottom:-30px;
    /* top:0; */
    left:50%;
    transform: translateX(-50%);
    border:5px solid transparent;
    border-bottom:5px solid #1371FF;
  }
  .header-nav .header-list:first-child:hover>a::before,
  .header-nav .header-list:last-child:hover>a::before,
  .header-nav .header-list:first-child:hover .nav-bar,
  .header-nav .header-list:last-child:hover .nav-bar{
    border:0;
  }
  .header-nav li li a{
    padding:10px 0;
    border-bottom: 2px solid transparent;
  }
  .header-nav li li a:hover{
    color:#1371FF;
    border-bottom:2px solid #1371FF;
  }
  .header-search{
    height:32px;
    width:140px;
    display: flex;
    align-self: center;
    margin-left: 30px;
  }

  .header-search input{
    height:32px;
    border-radius:40px;
  }


  .header-nav ul li{
    float:left;
  }
  .header-nav .header-list span{
    display:inline-block;
    color: #E5E5E5;
    padding:5px;
  }
  .header-nav ul li a{
    display:inline-block;
    padding:10px;
    color:#333333;
  }
  .header-nav ul li a:hover,.header-nav ul li .active{
    color:#1371FF
  }

</style>
