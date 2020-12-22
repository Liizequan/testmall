<template>
  <div id="app">
    <!--头部信息-->
    <div class="header-top" v-if="heade">
      <div class="header-logo" @click="tab(0)"><router-link to="/"><img src="./image/lh-logo.png" alt=""></router-link ></div>
      <div class="header-list">
        <ul>
          <li v-for="(item, index) in header" :key="index" :class="{'active':Index==index}" @click="tab(index)">
            <router-link to="/">{{item.title}}</router-link >
          </li>
        </ul>
      </div>
      <div class="header-phone">
        <p class="gray">
          <img src="./image/phone.png" alt="">
          24小时免费服务热线
        </p> 
        <p class="red">020 8201-6711</p>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  // inject:['reload'],
  data() {
      return {
        heade:true,//默认有头部信息
        Index:0, //默认样式
        header:[
          {router:'/',title:'首页'},
          {router:'/affairs',title:'商务办公'},
          {router:'/business',title:'工商代理'},
          {router:'/finance',title:'财税服务'},
          {router:'/government',title:'政府补贴'},
          {router:'/market',title:'上市辅导'},
          {router:'/login',title:'金融服务'},
        ]
      }
    },
    // provide(){
    //   return {
    //     reload : this.reload
    //   }
    // },
    methods: {
      // reload(){
      //   console.log(123)
      // },
      tab(index){
        var _this = this;
        _this.Index = index;
        // 页面跳转
        _this.$router.push({
          path:_this.header[index].router
        });
        // 将需要的下标数据保存在本地
        // if(typeof(index) == 'number'){
        //   localStorage.setItem('home',index);
        // }
        // _this.ask();
      },
      // ask(){
      //   var _this = this;
      //   if(_this.$route.path != '/login'){
      //     _this.heade = true
      //   }else{
      //     _this.heade = false
      //   }
      // }
    },
    created() {
      // 将需要的下标数据读取设置为默认
      // var id = localStorage.getItem('home');
      // 如果没有存储的下标，则默认为0；表示客户一开始就显示首页
      // this.Index = id || 0
      // this.reload;
      // this.ask();
      console.log(this.$route.path)
    },
}
</script>

<style>
.header-top{
    width:1200px;
    margin:auto;
    padding-top:20px;
    display: flex;
    justify-content: space-between;
}
.header-logo image{
    display: block;
}
.header-list {
    flex: 1;
}
.header-list ul{
    height:100%;
    float: right;
}
.header-list ul li{
    width:100px;
    height: 100%;
    float: left;
    text-align:center;
}
.header-list li a{
    color:#333;
    font-size:16px;
    display: inline-block;
    padding:20px 0 40px;
}
.header-list li.active a{
    color: #BB0000;
    border-bottom: 2px solid #BB0000;
}
.header-phone{
    margin-left:60px;
    font-size: 14px;
}
.header-phone img{
    vertical-align: top;
}
.header-phone .red{
    font-size:24px;
    font-weight: bold;
}
.header-banner,.header-banner img{
    width:100%;
    min-width:1200px;
    overflow: hidden;
}
</style>
