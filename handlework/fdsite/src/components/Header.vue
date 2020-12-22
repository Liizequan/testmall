<template>
  <div class="header">
    <div class="header-logo">
      <img src="./fd_logo.png" class="block"/>
    </div>
    <div class="header-nav">
      <!-- <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path:'/system' }">系统开发</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path:'/brank'  }">品牌打造</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path:'/science'}">科技项目申报</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path:'/about'  }">关于我们</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path:'/careers'}">招贤纳士</el-breadcrumb-item>
      </el-breadcrumb> -->
      <ul>
        <!-- <li><router-link to="/index" class="active">首页</router-link><span>/</span></li>
        <li><router-link to="/system">系统开发</router-link><span>/</span></li>
        <li><router-link to="/brank">品牌打造</router-link><span>/</span></li>
        <li><router-link to="/science">科技项目申报</router-link><span>/</span></li>
        <li><router-link to="/about">关于我们</router-link><span>/</span></li>
        <li><router-link to="/careers">招贤纳士</router-link></li> -->
        <li v-for="(item,index) in nav" :key="index" @click="navClick(index)">
          <router-link :to="item.to" :class="active==index?'active':''">{{item.title}}</router-link>
          <span>{{item.span}}</span>
        </li>
      </ul>
    </div>
    <div class="header-search">
      <el-input
        prefix-icon="el-icon-search"
        v-model="search">
      </el-input>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return { 
      search:'',
      active:1  ,
      nav:[
        {to:'/index',title:'首页',span:'/'},
        {to:'/system',title:'系统开发',span:'/'},
        {to:'/brank',title:'品牌打造',span:'/'},
        {to:'/science',title:'科技项目申报',span:'/'},
        {to:'/about',title:'关于我们',span:'/'},
        {to:'/careers',title:'招贤纳士',span:''},
      ]
    }
  },
  methods: {
    navClick:function(e){
      console.log(e)
      sessionStorage.setItem('index',e);
      window.reload()
    }
  },
  created() {
      var index = sessionStorage.getItem('index');
      console.log(index);
      if(index!=null){
        this.active = index
      }
  },
  mounted(){
    var index = sessionStorage.getItem('index');
    console.log(index);
    if(index!=null){
      this.active = index
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .header{
    width:1200px;
    margin:auto;
    display:flex;
    padding:30px 0;
    /* background: pink; */
    justify-content:space-between;
  }
  .header-nav{
    flex:1;
    /* padding-left:120px; */
  }
  .header-nav .el-breadcrumb{
    height:40px;
    line-height:40px;
  }
  .header-search{
    height:32px;
    width:140px;
    display: flex;
    align-self: center;
  }

  .header-search input{
    height:32px;
    border-radius:40px;
  }


  .header-nav ul li{
    float:left;
  }
  .header-nav ul li a{
    display:inline-block;
    padding:10px;
    color:#333333;
  }
  .header-nav ul li a:hover,.header-nav ul li .active{
    color:#1371FF
  }
  /* .el-icon-search{
    line-height:32px;
  }
  .el-breadcrumb__separator {
    margin: 0 15px;
  }
  .el-breadcrumb__inner.is-link{
    color:#333333;
  }
  .el-breadcrumb__inner.is-link:hover{
    color:#1371FF;
  }
  .el-breadcrumb__item:last-child .el-breadcrumb__inner{
    
    font-weight:bold;
    color:#333333;
  }
  .el-breadcrumb__item:last-child .el-breadcrumb__inner:hover{
    font-weight:bold;
    color:#1371FF;
  } */
</style>

