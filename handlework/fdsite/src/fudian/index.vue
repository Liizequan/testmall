<template>
  <div class="fd-index">
    <!-- <div>
      <my-header></my-header>
    </div> -->
    <!-- 轮播 -->
    <div class="banner">
      <el-carousel height="600px" width="100%" arrow="always" :autoplay="false" name='浮点'>
        <el-carousel-item v-for="(item,index) in banner" :key="index" >
          <img :src="url+item.src" alt="">
        </el-carousel-item>
      </el-carousel>  
    </div>
    <!-- 图文1 洞悉市场趋势演变 让传播回归社会-->
    <div class="section">
      <section class="text-center">
        <div class="section1">
          <p class="section-title">洞悉市场趋势演变让传播回归社会</p>
          <div :class="section1 ? 'section1-top-no' : 'section1-top-yes'">
            <p class="section-china" >
              浮点科技秉承实现全网价值营销的理念，以数据为核心，结合品牌打造，科技项目申报等多维度，为客户提供综合性数字化创新服务；
              帮助传统企业实现“互联网+”转型升级，极力辅导企业上市；
              系统开发，品牌打造科技项目申报等全新服务内容让企业不止有关注度，更有内容精度。
            </p>
            <h2 class="section-english-title">Insight into the evolution of market trends    allowing communication to return to society</h2>
            <p class="section-english">
              To provide customers with comprehensive digital innovation services; 
              to help traditional enterprises achieve "Internet +" transformation and upgrading; 
              to strongly guide enterprises to go public; 
              let enterprises not only have attention, but also content accuracy.
            </p>
          </div>
        </div>
      </section>
    </div>
    <!-- 图文2 服务领域 -->
    <div class="section">
      <section>
        <div class="section2">
          <div class="section-top">
            <p class="bold5">服务领域</p>
            <p class="gray9">企业互联网品牌形象一体化建设，知识产权科技项目申报一站式服务</p>
          </div>
          <ul class="between" style="position:relative">
            <li class="section-list" v-for="(item,index) in list" :key="index">
              <div :class="section2 ? 'section2-top-no' : 'section2-top-yes'">
                <div class="section-list-top">
                  <p class="section-list-top-img"><i class="img-center">
                    <img :src="item.img" alt="">
                  </i></p>
                  <p class="section-list-top-title">{{item.title}}</p>
                  <p class="section-list-top-txt">{{item.txt}}</p>
                </div>
                <div class="section-list-bottom">
                  <ul class="section-list-bottom-item">
                    <li v-for="(item,index) in item.text" :key="index">{{item}}</li>
                  </ul>
                </div>
              </div>
            </li>
            <!-- <div :class="section2?'section2-top-no':'section2-top-yes'"></div> -->
          </ul>
        </div>
      </section>
    </div>
    <!-- 图文3 打造品牌 为企业增值 -->
    <div class="section bg-color">
      <section>
        <div class="section3">
          <div class="section-top">
            <p class="bold5">打造品牌为企业增值</p>
            <p class="gray9">多维度力证塑造企业核心竞争力为您提供创新的互联网解决方案</p>
          </div>
          <div class="section-bottom">
            <div class="between">
              <div :class="section3Top?'section-bottom-img':'section-bottom-img1'"><i><img src="../image/list1.png" alt=""></i></div>
              <div :class="section3Right?'section-bottom-right':'section-bottom-right1'">
                <div class="section-bottom-right-title bold">成熟的服务体系</div>
                <p class="gray9">我们的核心技术引擎，面向各个行业各类公司，提供网站搭建、APP软件开发、微信小程序、企业知识产权服务等多维度对方面的解决方案。</p>
              </div>
            </div>
            <div class="between">
              <div :class="section3Left?'section-bottom-left':'section-bottom-left1'">
                <div class="section-bottom-right-title bold">远见卓识的专业团队</div>
                <p class="gray9">我们拥有见解独到、远见卓识的专业团队，多年专业行业经验与知识构成赋能市场洞察与策略执行，为您提供专业化的全网价值营销服务。</p>
              </div>
              <div :class="section3Bottom?'section-bottom-img2':'section-bottom-img3'"><i><img src="../image/list2.png" alt=""></i></div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <!-- 图文4 为客户创造更多价值 -->
    <div class="section">
      <section>
        <div class="section4">
          <div class="section-top">
            <p class="bold5">为客户创造更多价值</p>
            <p class="gray9">获得最默契的交流，成就最愉悦的合作，减少传播推广成本，降低人力资源成本</p>
          </div>
          <ul class="section-bottom">
            <li class="between" v-for="(item,index) in loText" :key="index">
              <div class="section-bottom-left self"><i><img :src="item.img" alt=""></i></div>
              <div class="section-bottom-right self">
                <p class="section-bottom-right-title">{{item.title}}</p>
                <p class="section-bottom-right-txt">{{item.txt}}</p>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </div>
    <!-- 图文5 浮点科技，为客户创造更多的移动互联网价值 -->
    <div class="section">
      <section>
        <div class="section5">
          <p class="section-title bold">浮点科技，为客户创造更多的移动互联网价值</p>
          <p class="section-txt">
            浮点拥有经验丰富的运营和技术团队，既能提供富有创意的方案，又有技术团队将方案落地<br>
            十年互联网服务经验，2000+企业选择，一站式整合营销服务
          </p>
          <p class="section-btn"><a href="#index">点击咨询</a></p>
        </div>
      </section>
    </div>

    <!-- 图文6 合作案例 -->
    <div class="section">
      <section>
        <div class="section6">
          <div class="section-top">
            <p class="bold5">合作案例</p>
            <p class="gray9">十年经验总结，不断积累、不断完善、不断创新只为您提供最成熟最合适的方案</p>
          </div>
          <div class="section-case">
            <ul class="section-case-title">
              <li v-for="(item,index) in title" :key="index" @click="titleClick(index)" :class="{'active':activeTitle == index}">
                <a href="javascript:;">{{item.title}}</a>
              </li>
            </ul>
            <ul class="wrap">
              <li v-for="(item,index) in cooperate" :key="index">
                <router-link :to="'/example/child/'+item.id">
                  <p class="section-ul-li-img">
                    <i><img :src="url+item.img" alt="" style="width:100%"/></i>
                  </p>
                  <div class="section-ul-li-div">
                    <p class="section-ul-li-title">{{item.title}}</p>
                    <p class="between">
                      <span>Details</span>
                      <i><img src="../image/auto_right.png" alt=""></i>
                    </p>
                  </div>
                </router-link>
              </li>
            </ul>
            <p class="btn" @click="lookExample"><a href="javascript:;">查看更多</a></p>
          </div>
        </div>
      </section>  
    </div>
    <!-- 引入 -->
    <div id="index">
      <my-contact></my-contact>
    </div>
    <div class="bg-color">
      <my-footer></my-footer>
    </div>
  </div>
</template>
<script>
import myHeader from '../components/Header';
import myContact from '../components/Contact';
import myFooter from '../components/Footer';
export default {
  components:{
    myHeader,
    myContact,
    myFooter
  },
  data() {
    return {
      section1:false,
      section2:false,
      section3Top:false,
      section3Right:false,
      section3Left:false,
      section3Bottom:false,
      activeTitle:0,
      title:['全部案例','品牌网站','微信开发','电商平台'],
      banner:[
        // {src:require('../image/banner01.png')},
        // {src:require('../image/banner01.png')},
        // {src:require('../image/banner01.png')},
      ],
      list:[
        {
          img:require('../image/website.png'),
          title:'高端网站建设',
          txt:'High-end website construction',
          text:['品牌网站建设','营销网站建设','企业网站建设','手机网站建设','多品牌网站建设','多语言网站建设']
        },
        {
          img:require('../image/removal.png'),
          title:'移动端平台搭建',
          txt:'Mobile platform construction',
          text:['微信小程序','APP开发','H5创意设计','微商城建设']
        },
        {
          img:require('../image/crown.png'),
          title:'企业品牌打造',
          txt:'Corporate branding',
          text:['LOGO设计','企业画册','企业文化宣传','企业VI','企业活动物料','企业电商详情']
        },
        {
          img:require('../image/beacon_star.png'),
          title:'科技项目申报',
          txt:'Technology project declaration',
          text:['商标申请','专利申请','版权登记','高新技术认定','知识产权贯标']
        },
      ],
      loText:[
        {
          img:require('../image/logo1.png'),
          title:'精准企业定位',
          txt:'精准企业模式定位，明确企业发展方向，定向吸引客户浏览'
        },
        {
          img:require('../image/logo2.png'),
          title:'高颜值网页设计',
          txt:'简约清晰的网站布局，层层深入的内容逻辑，让客户无法拒绝你的产品'
        },
        {
          img:require('../image/logo3.png'),
          title:'多层质量监控',
          txt:'内部多层审核把关，只做高质量网站让网站成为企业的窗口'
        },
        {
          img:require('../image/logo4.png'),
          title:'企业文化包装展示',
          txt:'包装企业文化、主营产品，展现企业价值，吸引需求客户'
        },
        {
          img:require('../image/logo5.png'),
          title:'网站结构优化',
          txt:'网站结构优化，让搜索展示变得更直接、更简单、更可信'
        },
        {
          img:require('../image/logo6.png'),
          title:'10年建站经验',
          txt:'10年建站经验，已帮助多家企业搭建营销平台、更可靠、更高效'
        },
      ],
      cooperateLength:false,//否则是否显示查看更多button
      cooperate:[
        // {img:require('../image/cooperate1.png'),title:'NO尔斯水杯'},
        // {img:require('../image/cooperate2.png'),title:'农情商事官网'},
        // {img:require('../image/cooperate3.png'),title:'宁波霍科电器有限公司'},
        // {img:require('../image/cooperate4.png'),title:'金箔娱乐'},
        // {img:require('../image/cooperate5.png'),title:'吉利新能源汽车'},
        // {img:require('../image/cooperate6.png'),title:'杭城物联网'},
      ],
      url:fudian.host,
    }
  },
  methods:{
    titleClick:function(e){
      // console.log(e)
      this.activeTitle = e
      console.log(e)
      if(e==0){//所有数据
        var url = this.url+"/api/index/example";
        // 跨域
        /*
        this.$http.get(url).then(result=>{
          var list = result.data.list
          this.title = result.data.cate
          this.cooperate = list.slice(0.6);
        })
        */
        var that = this;
        that.$axios({
          url: url
        }).then(function (result) {
          var list = result.data.list
          list.sort(() => Math.random() - 0.5);
          var newList = [];
          for(var i=0; i<6; i++){
            console.log(list[i])
            if(list[i]!=undefined){
              newList.push(list[i])
            }
          }
          that.title = result.data.cate
          that.cooperate = newList;
        })
        
      }else{//类别数据
        var url = this.url+"/api/index/example?id="+e;
        // 跨域
        /*
        this.$http.get(url).then(result=>{
          var list = result.data.list
        this.title = result.data.cate
        this.cooperate = list.slice(0.6);
        })
        */
        var that = this;
        that.$axios({
          method: 'get',
          url: url
        }).then(function (result) {
          var list = result.data.list
          list.sort(() => Math.random() - 0.5);
          var newList = [];
          for(var i=0; i<6; i++){
            console.log(list[i])
            if(list[i]!=undefined){
              newList.push(list[i])
            }
          }
          that.title = result.data.cate
          that.cooperate = newList;
        })
      }
    },
    lookExample:function(e){
      // console.log(this.activeTitle)
      var id = this.activeTitle
      this.$router.push({  //核心语句
        path:'/example/'+id, 
      })
    },
    menu() {
      this.scroll = document.documentElement.scrollTop || document.body.scrollTop;
      console.log(this.scroll)
      this.section1 = true
      if(this.scroll>400){
        this.section2=true
      }
      if(this.scroll>=1100){
        this.section3Top=true
        this.section3Right=true
      }
      if(this.scroll>1600){
        this.section3Left=true
        this.section3Bottom=true
      }
    }
  },
  created:function(){
    // 请求数据
    // 获取页数
    // 数据总数据
    if( this.cooperate.length > 6){//如果案例长度大于6就隐藏
      this.cooperateLength=true
    }
    // this.tobal = this.cooperate.lengt
    var pages = this.pages;
    var url = this.url+"/api/index/example";
    // 跨域
    /*
    this.$http.get(url).then(result=>{
      console.log(result)
      var list = result.data.list
      this.title = result.data.cate
      this.cooperate = list.slice(0.6);
    })
    */
    var that = this;
    that.$axios({
      method: 'get',
      url: url
    }).then(function (result) {
      console.log(result)
      var list = result.data.list
      list.sort(() => Math.random() - 0.5);
      var newList = [];
      for(var i=0; i<6; i++){
        console.log(list[i])
        if(list[i]!=undefined){
          newList.push(list[i])
        }
      }
      that.title = result.data.cate
      that.cooperate = newList;
    })

    // 轮播图
    // http://gzfloat.com/api/index/banner
    var banner = this.url+"/api/index/banner";
    that.$axios({
      method: 'get',
      url: banner
    }).then(function (result) {
      console.log(result)
      that.banner = result.data.list
      // var list = result.data.list
      // that.title = result.data.cate
      // that.cooperate = list.slice(0.6);
    })
  },
  mounted() {
    window.addEventListener('scroll', this.menu)
  },

}
</script>
<style scoped>
.section-top{
  text-align: center;
}
.header .el-input__icon{
  line-height: 32px;
}
/* 轮播图 */
.banner{
  overflow: hidden;
  width:100%;
  min-width:1200px;
  margin:auto;
  /* border:1px solid pink; */
}
.banner img{
  width:100%;
  min-height: 100%;
  display:block;
}
.el-carousel__arrow--left{
  left:15%;
}
.el-carousel__arrow--right{
  right: 15%;
}
.el-carousel__arrow{
  background-color:#000;
  opacity: 0.5;
}
.el-carousel__arrow:hover{
  background-color:#000;
  opacity: 0.4;
}
.el-carousel__indicators--horizontal{
  bottom:10px;
}

/* 文章1 */
.section1{
  width:1200px;
  margin:auto;
  color:#999999;
  padding:80px 0;
  overflow: hidden;
  border-bottom:1px solid #E5E5E5;
  /* background:skyblue; */
}
.section1-top-no{
  transform: translateY(0px);
  transition:all 1.2s ease-in-out;
}
.section1-top-yes{
  transform: translateY(300px);
}

.banner .el-carousel__arrow--right{
  right:15%;
}
.section-title{
  color:#333;
  height:34px;
  font-size:34px;
  font-weight:500;
  line-height:34px;
  padding-bottom: 30px;
  position: relative;
}
.section-title::after{
  content: '';
  width:56px;
  height:4px;
  background-color: #ddd;
  position: absolute;
  bottom:0;
  left:50%;
  transform: translateX(-50%);
}
.section-china{
  /* width:980px; */
  margin:auto;
  font-size:16px;
  line-height:30px;
  padding:30px 0 40px;
}
.section-english-title{
  font-size: 16px;
  color: #333;
  padding-bottom: 10px;
  text-transform: uppercase;
}
.section-english{
  margin:auto;
  font-size:12px;
  line-height:22px;
  text-transform: uppercase;
}
/* 图文2 */
.section2{
  width:1200px;
  margin:auto;
  text-align: center;
  padding:80px 0;
  overflow: hidden;
  /* background:pink; */
}
.section-top .gray9{
  padding:20px 0 50px;
}
.section-list{
  flex:1;
  color:#fff;
  text-align: center;
  justify-content: center;
  height:388px;
  overflow: hidden;
  /* transform: translateX(388px); */
  background:linear-gradient(150deg,#00C6FF 0%,#0072FF 100%);
}
.section-list:nth-child(2){
  background:linear-gradient(150deg,#ED6EA0 0%,#7873F5 100%);
}
.section-list:nth-child(3){
  background:linear-gradient(150deg,#209CFF 0%,#68E0CF 100%);
}
.section-list:nth-child(4){
  background:linear-gradient(150deg,#FFA128 0%,#E14FAD 100%);
}
.section-list .section2-top-no{
  transform: translateY(0);
  transition: all 1s linear;
}
.section-list .section2-top-yes{
  transform: translateY(390px);
}
.section-list-top-img{
  position:relative;
  width:100%;
  height:100px;
  margin:40px 0 20px;
}
.section-list-top-img img{
  display: block;
}
.section-list-top-title{
  font-size:16px;
  font-weight:500;
}
.section-list-top-txt{
  opacity:0.2;
  padding-top:10px;
  font-size:14px;
}
.section-list-bottom{
  padding:30px 40px;
}
.section-list-bottom-item{
  opacity:0.8;
  font-size:14px;
  display: flex;
  flex-wrap: wrap;
}
.section-list-bottom-item li{
  width:50%;
  line-height: 33px;
  text-align: left;
}
/* <!-- 图文3 --> */
.section3{
  padding:60px 0 70px;  
  width:1200px;
  margin:auto;
  /* background:peachpuff; */
}
.section3 .section-bottom{
  overflow: hidden;
}
.section3 .section-bottom-img{
  transition: all 1s linear;
  transform: translateY(0px);
}
.section3 .section-bottom-img1{
  transform: translateY(-450px);
}
.section3 .section-bottom-right{
  padding-left:35px;
  transition: all 1s linear;
  transform: translateX(0px);
}
.section3 .section-bottom-right1{
  transform: translateX(550px);
}
.section3 .section-bottom-right-title{
  position:relative;
  padding:75px 0 40px;
  margin-bottom:30px;
}
.section3 .section-bottom-right-title::before{
  content:'';
  width:22px;
  height:4px;
  background:#000;
  position:absolute;
  bottom:0;
  left:0;
}
.section3 .section-bottom p{
  line-height:28px;
}
.section3 .section-bottom-img img{
  display:block;
}
.section3 .section-bottom-left{
  padding-right:35px;
  transition: all 1s linear;
  transform: translateX(0px);
}

.section3 .section-bottom-left1{
  padding-right:35px;
  transform: translateX(-550px);
}
.section3 .section-bottom-img2{
  transition: all 1s linear;
  transform: translateY(0px);
}
.section3 .section-bottom-img3{
  transform: translateY(450px);
}
.section3 .section-bottom-img2 i{
  position:relative;
}
.section3 .section-bottom-img2 img{
  margin-top:-120px;
  display: block;
  border-top:20px solid #F9F9F9;
  border-left:20px solid #F9F9F9;
}
/* 图文4 */
.section4{
  width:1200px;
  margin:auto;
  padding:60px 0 80px;
  /* background:#00C6FF; */
}
.section4 .section-top .gray9{
  padding-bottom:30px;
}
.section4 .section-bottom{
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.section4 .section-bottom li{
  width:310px;
  padding:40px 30px;
  margin-top:50px;
    /* box-shadow:0px 2px 8px 0px rgba(1,12,21,0.12); */
  animation:shadow 5s linear 2s infinite alternate;
}
@keyframes shadow{
  
  0%{
    box-shadow:-15px 10px 15px 4px rgba(1,12,21,0.12);
  }
  25%{
    box-shadow:0px 0px 15px 4px rgba(1,12,21,0.12);
  }
  50%{
    box-shadow:15px -15px 15px 4px rgba(1,12,21,0.12);
  }
  75%{
    box-shadow:0px 0px 15px 4px rgba(1,12,21,0.12);
  }
  100%{
    box-shadow:-15px 10px 15px 4px rgba(1,12,21,0.12);
  }
}
.section4 .section-bottom img{
  display: block;
}
.section4 .section-bottom-right{
  padding-left:20px;
}
.section4 .section-bottom-right-txt{
  width:230px;
  font-size:14px;
  color:#999999;
  line-height:24px;
}
/* 图文5 */
.section5{
  width:100%;
  height:420px;
  color:#fff;
  text-align: center;
  background:url(../image/banner02.png) no-repeat 50% 50%;
}
.section5 .section-title{
  color:#fff;
  padding:130px 0 20px;
  font-size:36px;
}
.section5 .section-title::after{
  width:0;
  height:0;
}
.section5 .section-txt{
  font-size:15px;
  line-height:24px;
  opacity:0.52;
}
.section5 .section-btn{
  padding-top:50px;
}
.section5 .section-btn a{
  color:#fff;
  display:inline-block;
  font-size:14px;
  width:160px;
  height:40px;
  line-height: 40px;
  background:#1371FF;
  outline: none;
  border:0;
  border-radius: 3px;
}
/* 内容6 */
  /* 案例面包屑 */
.section6 {
  width:1200px;
  margin:auto;
  padding:80px 0;
}
.section-case .section-case-title{
  display: flex;
  justify-content: center;
  text-align: center;
  padding:0;
}
.section-case .section-case-title li{
  width:120px;
  margin:0 10px;
}
.section-case .section-case-title li a{
  display:inline-block;
  background:#E5E5E5;
  color:#999999;
  font-size:14px;
  border-radius:16px;
  border:0;
  width:120px;
  height:32px;
  line-height: 32px;
  outline: none;
}
.section-case .section-case-title li a:hover{
  cursor:hand
}
.section-case .section-case-title .active a{
  background:#1371FF;
  color:#fff;
}

  /* 面包屑内容 */
  .section6 .el-tabs__content{
    width: 1200px;
    margin: auto;
    padding:0;
  }
  .section-case ul{
    padding:25px 0;
  }
  .section-case ul.wrap{
    justify-content: left;
  }
  .section-case li{
    width:380px;
    overflow: hidden;
    margin:15px 10px;
  }
  .section-case li a{
    color:#333333;
    font-size:14px;
    text-decoration: none;
  }
  .section-case .section-ul-li-img{
    width: 378px;
    height: 250px;
    border: 1px solid #e5e5e5;
    border-bottom: 0;
    overflow: hidden;
    position: relative;
  }
  .section-case .section-ul-li-img::after{
    content:'查看详情';
    position:absolute;
    top:100%;
    left:0;
    width:380px;
    height:250px;
    color:#fff;
    line-height: 250px;
    text-align: center;
    transition: all .4s ease-in-out;
    background:rgba(0, 0, 0, .72);
  }
  .section-case li:hover .section-ul-li-img::after{
    top:0;
  }
  .section-case li .section-ul-li-img img{
    transform: scale(1);
    transition: all .4s ease-in-out;
  }
  .section-case li:hover .section-ul-li-img img{
    transform: scale(1.05);
  }
  .section-ul-li-div{
    border:1px solid #E5E5E5;
    border-top:none;
    padding:0 20px;
  }
  .section-ul-li-title{
    height:50px;
    line-height:50px;
  }
  .section-case .between{
    height:42px;
    line-height:42px;
    border-top:1px solid #e5e5e5;
  }
  .section-case .btn{
    text-align: center;
  }
  .section-case .btn a{
    width:120px;
    height:36px;
    line-height:36px;
    display:inline-block;
    text-align: center;
    color:#999999;
    font-size: 12px;
    border:1px solid rgba(229,229,229,1);
    border-radius:3px;
    background:transparent;
    /* transition: all .2s linear; */
  }
  .section-case .btn a:hover{
    background:#1371FF;
    color:#fff; 
  }
</style>
