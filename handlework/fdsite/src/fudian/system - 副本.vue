<template>
	<div class="fd-system">
		<!-- <div>
			<my-header></my-header>
		</div> -->
		<div>
			<my-navbar v-bind:navbar="navbar" v-bind:navTitle="navTitle" v-bind:imgTitle="imgTitle" v-bind:imgTxt="imgTxt" v-bind:bannerImg="bannerImg"></my-navbar>
		</div>
		<section>
			<div class="nav-content">
				<div class="txt-img">
					<ul class="column">
						<li id="system1" class="between">
							<div class="system-left animated bounceInLeft fast" :class="!system1?'no-left':'is-left'">
								<h1>高端网站搭建</h1>
								<span>Advantages of high-end website construction</span>
								<p class="system-left-describe">运用企业官网，推行企业品牌形象、推行企业产品；
										合理的进行网络营销、进步品牌知名度；
										更注重的是从互联网营销的视点来制造网页，
										展示公司的实力，提升公司的品牌形象。</p>
							</div>
							<div class="system-right  animated bounceInRight fast" :class="!system1?'no-right':'is-right'">
							 	<p class="system-right-img"><img src="../image/system/list1.png" alt=""></p>
							</div>
						</li>
						<li id="system2" class="between">
							<div :class="!system2?'':'system-right animated bounceInLeft fast'">
							 	<p class="system-right-img"><img src="../image/system/list2.png" alt=""></p>
							</div>
							<div :class="!system2?'':'system-left animated bounceInRight fast'">
								<h1>APP开发服务</h1>
								<span>APP development service</span>
								<p class="system-left-describe">专注于高端型IOS系统开发，提供优质的IOS APP开发设计方案服务<br>
									针对主流的android系统，提供一站式APP咨询、策划、开发服务<br>
									我们了解大中小型企业的生意模式以及需求，我们倡导让客户感知产品的应用体验价值<br>
									我们拥有经验丰富的运营和技术团队，既能提供富有创意的方案，又有技术团队将方案落地</p>
								<p class="auto-logo">
									<i>
										<img src="../image/system/iphone.png" alt=""><br>
										<span>ios平台</span>
									</i>
									<i>
										<img src="../image/system/android.png" alt=""><br>
										<span>android平台</span>
									</i>
								</p>
							</div>
						</li>
						<li id="system3" class="between">
							<div :class="!system3?'':'system-left animated bounceInLeft fast'">
								<h1>微信小程序开发</h1>
								<span>WeChat applet development</span>
								<p class="system-left-describe">无需安装，扫码即用的小程序，框架组件丰富，
									模块化编辑可自定义专属"小程序"，满足您的各项业务需求，
									完善的用户系统，独立注册，微信授权数据同步并配有多种社交功能，
									可视化一键分享，可直接分享到微信好友，群聊天里面，
									开发微信小程序，选择浮点科技，专业定制开发，一步到位</p>
							</div>
							<div :class="!system3?'':'system-right animated bounceInRight fast'">
							 	<p class="system-right-img"><img src="../image/system/list3.png" alt=""></p>
							</div>
						</li>
						<li id="system4" class="between">
							<div :class="!system4?'':'system-right animated bounceInLeft fast'">
							 	<p class="system-right-img"><img src="../image/system/list4.png" alt=""></p>
							</div>
							<div :class="!system4?'':'system-left animated bounceInRight fast'">
								<h1>企业自建商城</h1>
								<span>Enterprise self-built mall</span>
								<p class="system-left-describe">通过自建商城实现在线互动营销、
									提供开放数据等体系化一站式服务打造一整套真正属于你的商城系统。
								</p>
								<p class="system-left-describe">
									完整购物体验和企业形象推广、商家入驻等通过自建商城实现在线互动营销、
									提供开放数据等体系化一站式服务，打造一整套真正属于你的商城，
									产品和营销活动及时传递激活顾客购物欲望</p>
							</div>
						</li>
						<li id="system5" class="between" :style="[!system5?{'overflow':'initial'}:{'overflow': 'initial'}]">
							<div :class="!system5?'':'system-left animated bounceInLeft fast'">
								<h1>后台数据库</h1>
								<span>Background database</span>
								<p class="system-left-describe">从用户属性、使用行为、行业对比等多指标多维度进行全面的移动应用统计分析，帮助运营者深层次挖掘用户需求，准确了解自身行业地位，从而更好地指导产品运营和推广决策。
								</p>
								<p class="system-left-describe">
									全面掌握各应用行业对比找准市场定位，
									视化埋点统计免代码统计分析用户行为数据，动态管理追踪页面</p>
							</div>
							<div :class="!system5?'':'system-right animated bounceInRight fast'">
							 	<p class="system-right-img"><img src="../image/system/list5.png" alt=""></p>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</section>

		<!-- 引入 -->
		<div>
			<my-contact></my-contact>
		</div>
		<div class="bg-color">
			<my-footer></my-footer>
		</div>
	</div>
</template>
<script>
import myNavbar from '../components/NavBar';
import myHeader from '../components/Header';
import myContact from '../components/Contact';
import myFooter from '../components/Footer';
export default {
    components:{
		myNavbar,
        myHeader,
        myContact,
        myFooter
    },
    data() {
        return {
          system1:false,
          system2:false,
          system3:false,
          system4:false,
          system5:false,



          website:false,
          navbarNum:0,
          navTitle:'系统开发',
          navbar:[
            {title:'高端网站建设',to:'#system1'},
            {title:'APP开发',to:'#system2'},
            {title:'微信小程序',to:'#system3'},
            {title:'企业商城建设',to:'#system4'},
            {title:'后台数据库搭建',to:'#system5'},
          ],
          bannerImg:require('../image/system/banner.png'),
          imgTitle:'多元化服务、多套解决方案',
          imgTxt:'专业的技术开发团队，针对更深层次的定位，提供多元化需求',
			
        }
	},
	methods: {
		navbarTap:function(index){
			console.log(index)
			this.navbarNum = index
		},
		menu() {
		this.scroll = document.documentElement.scrollTop || document.body.scrollTop;
		console.log(this.scroll)
		this.system1 = true
		if(this.scroll>200){
			this.system2=true
		}
		if(this.scroll>700){
			this.system3=true
		}
		if(this.scroll>1300){
			this.system4=true
		}
		if(this.scroll>1700){
			this.system5=true
		}
		},
	},
	created(){
    // this.navbarNum = 
    // console.log(this.$route.path)
  },
  mounted() {
    this.system1 = true
    window.addEventListener('scroll', this.menu)
  },
  watch:{
    router(to,from){
      console.log(to)
    }
  }
}
</script>
<style scoped>
    .navbar{
      height:355px;
    }
		/* 左部分 */
		.txt-img li.between:nth-child(2n+1){
			width:1200px;
			margin:auto;
			/* background:pink; */
			padding-top:80px;
      overflow: hidden;
		}
		.txt-img li.between:nth-child(2n){
			width:1200px;
			margin:auto;
			padding-top:60px;
      overflow: hidden;
			/* background:skyblue; */
		}
    .system-left {
				flex:1;
        font-size:14px;
        color:#787878;
		}
		.txt-img li.between:nth-child(2n+1) .system-left {
			padding-right:50px;
      /* transform: translateX(-500px); */
		}
		.txt-img li.between:nth-child(2n) .system-left {
			padding-left:70px;
			padding-right:40px;
		}
		.txt-img li.between:nth-child(3) .system-left{
			padding-right:70px;
		}
		.txt-img li.between:nth-child(2n) h1{
			padding-top:60px;
		}
		.txt-img li.between:last-child h1{
			padding-top:20px;
		}

    .nav-content .txt-img li.between .no-left{
      transform: translateX(-700px);
    }
    .nav-content .txt-img li.between .is-left{
      transition: all 1s linear;
      transform: translateX(0px);
    }

		.txt-img li.between:last-child .system-right{
			width:670px;
			height:460px;
		}

    
    .nav-content .txt-img li.between .no-right{
      transform: translateX(700px);
    }
    .nav-content .txt-img li.between .is-right{
      transform: translateX(0px);
      transition: all 1s linear;
    }

    .system-left h1{
        font-size: 36px;
        color:#333333;
				font-weight:500;
				padding:100px 0 0;
		}
    .system-left span{
        text-transform:uppercase;
        font-size: 12px;
				color:#999;
				padding-top:10px;
				display:inline-block;
		}
		.system-left .system-left-describe{
				padding-top:30px;
				line-height: 26px;
		}
		.auto-logo{
			display: flex;
			justify-content: last baseline;
			padding:30px 0;
		}
		.auto-logo i{
			font-style: normal;
		}
		.auto-logo img{
			padding-right:80px;
		}
</style>
