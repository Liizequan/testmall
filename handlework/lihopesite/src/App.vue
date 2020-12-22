<template>
  <div id="app">
    <!--头部信息-->
    <div class="header-top" v-if="heade">
      <div class="header-logo" @click="tab(0)"><router-link to="/"><img src="./image/lh-logo.png" alt=""></router-link ></div>
      <div class="header-list">
        <ul>
          <li v-for="(item, index) in header" :key="index" :class="{'active':item.router == routers}">
            <router-link :to='item.router' @click="tab(index)">{{item.title}}</router-link >
          </li>
          <!-- <li><a href="http://localhost/home/login/index.html">金融服务</a></li> -->
        </ul>
      </div>
      <div class="header-phone">
        <p class="gray">
          <img src="./image/phone.png" alt="">
          全国免费服务热线
        </p> 
        <p class="red">020 8201-6711</p>
      </div>
    </div>
    <router-view/>
    <!-- 回到顶部图标 -->
    <div class="AddTop">
      <ul>
        <li>
          <p class="weixin">
            <span>
              <b>
                <img src="./image/madam_chen.png" alt=""/><br>
                <span>扫码马上咨询</span>
              </b>
            </span>
          </p>
          <a :class="[weixin1 == true ? 'active tel' : 'tel']" href="javascript:;" @mouseenter="weixinenter" @mouseleave="weixinleave" >
            <!-- <img :src="[weixin1 == true?'./image/blue_wx.png':'./image/white_wx.png']" style="width:40px;height:40px;" alt="" ref="clientWidth"/> -->
            <img src="./image/blue_wx.png" v-show="weixin1" alt="" ref="clientWidth"/><img src="./image/white_wx.png" v-show="!weixin1"  alt="" ref="clientWidth"/><br>
            <!-- 左移动的宽等于图片的宽 -->
            <span @click="weixin">微信咨询</span> 
          </a>
        </li>
        <li>
          <div>
            <p class="title">联系电话：</p>
            <p class="sub">
              <span>业务经理</span><br>
              <b>134 1111 3429</b>
            </p>
          </div>
          <a  :class="[tel1 == true ? 'active tel' : 'tel']" href="javascript:;" @mouseenter="telenter" @mouseleave="telleave" >
            <!-- 左移动的宽等于图片的宽 -->
            <img src="./image/white_tel.png" v-show="!tel1" alt="" ref="clientWidth"/><img src="./image/rel_tel.png" v-show="tel1" alt="" ref="clientWidth"/><br>
            <span @click="tel">联系电话</span> 
          </a>
        </li>
        <li>
          <a href="javascript:scroll(0,0)" style="display:flex;  align-self: center;justify-content: center;">
            <img src="./image/white_top.png" alt="" style="padding:5px 0"/>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  // inject:['reload'],
    data() {
      return {
        left:'',//电话图片移动位置
        heade:true,//默认有头部信息
        routers:'/index', //默认样式
        header:[
          {router:'/index',title:'首页'},
          {router:'/affairs',title:'商务办公'},
          {router:'/business',title:'工商代理'},
          {router:'/finance',title:'财税服务'},
          {router:'/government',title:'政府补贴'},
          {router:'/market',title:'上市辅导'},
          {router:'/login',title:'金融服务'},
        ],
        weixin1:false,
        tel1:false,
      }
    },
    methods: {
      tab(index){
        this.routers = this.header[index].router
        //点击的地址栏
        // console.log(this.$route.path)
        this.showHide()
      },
      // 让不需要头部的给隐藏掉
      showHide(){
        if(this.$route.path == '/login'){
          this.heade = false
        }else{
           this.heade = true
        }
      },
      // 固定栏微信
      weixin(){

      },
      weixinenter(){
        this.weixin1 = true
      },
      weixinleave(){
        this.weixin1 = false
      },
      telenter(){
        this.tel1 = true
      },
      telleave(){
        this.tel1 = false
      },
      // 固定栏电话
      tel(){

      }
    },
    // 页面刷新时调用
    mounted() {
      // console.log(this.$route.path)//获取路由
      this.routers = this.$route.path//更改路由
      this.showHide()//执行methods中的showHide函数
      const eWidth = this.$refs.clientWidth.offsetWidth;//图片的高度
      console.log(eWidth)
      this.left = eWidth
      
    },
    // 页面返回时调用
    watch: {
      // 页面返回上一步时调用
      $route(to,from){
        // console.log(to)//to目前地址   from 上一个页面地址
        this.routers = to.path  
        // console.log(from)
        this.showHide()
      }
    },
    
}
</script>

<style>

/* 固定栏 */
.AddTop{
  position:fixed;
  bottom:34px;
  right:0px;
  text-align: center;
}
.AddTop li {
  position: relative;
  font-size: 14px;
  height: 70px;
}
.AddTop li .weixin{
  position:absolute;
  z-index:100;
  top:-80%;
  left:-186px;
  width:184px;   
  height:184px;
  color:#999999;
  border:1px solid #ddd;
  background:#fff;
  text-align: center;
  display: none;
}
.AddTop li .weixin b{
  position: absolute;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
}
.AddTop li .weixin img{
  width:140px;
  height:140px;
}
/* .AddTop li a::after{
  content: '';
  position: absolute;
  top:50%;
  left:0px;
  transform: translateY(-50%);
  border:10px solid transparent;
  border-left:10px solid #fff;
  display:none;
} */
.AddTop li:hover a:after,.AddTop li:hover p,.AddTop li:hover div{
  display: block;
}
.AddTop li:last-child a::after{
  content: '';
  position: absolute;
  border:0;
}
.AddTop li+li a{
  border-top:1px solid #D9898A;
}
.AddTop li div{
  position:absolute;
  top:50%;
  width:120px;
  padding:20px;
  left:-162px;
  z-index:2;
  border:1px solid #ddd;
  transform: translateY(-50%);
  background: #fff;
  display: none;
  text-align: left;
}
.AddTop li a span{
  font-size: 12px;
}
.AddTop li div .title{
  font-size: 14px;
  color:#999999;
  padding-bottom:15px;
  margin-bottom:20px;
  border-bottom:1px solid #999999;
}
.AddTop li div .sub{
  color:#333;
  font-size:16px;
  line-height:24px;
}
.AddTop a{
  color:#fff;
  width:70px;
  height:50px;
  padding:10px 0;
  background:#BB0000;
  display:inline-block;
}
.AddTop .active{
  color: #999;
  background:#fff;
}
.AddTop .tel{
  position: relative;
}



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
