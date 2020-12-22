<template>
	<div class="fd-science">
		<!-- <div>
			<my-header></my-header>
		</div>	 -->
		<!-- 引入头部跳转组件 -->
		<div>
			<my-navbar v-bind:navbar="navbar" v-bind:navTitle="navTitle" v-bind:imgTitle="imgTitle" v-bind:imgTxt="imgTxt" v-bind:bannerImg="bannerImg"></my-navbar>
		</div>
		<!-- 图文2 -->
		<section>
			<div class="section">
				<ul class="column">
					<!-- 商标注册的优势 -->
					<li class="section-list" id="science1">
						<div class="section-container">
							<div class="section-top" id="brank3" >
								<p class="bold5">商标注册的优势</p>
								<p class="gray9 english">商标注册成为大品牌迈出第一步，保护品牌、提升价值</p>
							</div>
							<div class="info">
								<ul class="between">
									<!--:class="list?'list':'list animated zoomInDown faster'"-->
									<li class="list animated zoomInDown faster" v-for="(item,index) in brand" :key="index">
										<p class="icon-img"><img class="img-center" :src="item.logo" alt=""></p>
										<p>{{item.text}}</p>
									</li>
								</ul>
							</div>
						</div>
					</li>
					<!-- 专利申请的好处 -->
					<li class="section-list" id="science2">
						<div class="section-container">
							<div class="section-top" id="brank3" >
								<p class="bold5">专利申请的好处</p>
								<p class="gray9 english">提升企业竞争力，享受国家政策支持，形成市场经济效益</p>
							</div>
							<div class="section-interest">
								<ul class="between">
									<li :class="active2?'active2':''" v-for="(item,index) in interest" :key="index">
										<p><img :src="item.img" alt=""></p>
										<div>
											<h1>{{item.title}}</h1>
											<p>{{item.text}}</p>
											<p>{{item.txt}}</p>
										</div>
									</li>
								</ul>
							</div>
						</div>
					</li>
					<!-- 高新企业认定作用 -->
					<li class="section-list" id="science3">
						<div class="section-container">
							<div class="section-top" id="brank3" >
								<p class="bold5">高新企业认定作用</p>
								<p class="gray9 english">提升企业竞争力 享受国家政策支持 形成市场经济效益</p>
							</div>
							<div class="section-enterprise">
								<ul class="around">
									<li class="between" :class="active3?'active3':''" v-for="(item,index) in enterprise" :key="index">
										<p><img :src="item.img" alt=""></p>
										<div class="self">
											<h3>{{item.title}}</h3>
											<p>{{item.text}}</p>
										</div>
									</li>
								</ul>
							</div>
						</div>
					</li>
					<!-- 金牌服务 -->
					<!-- <li class="section-list" id="science4">
						<div class="section-container">
							<div class="section-top" id="brank3" >
								<p class="bold5">金牌服务</p>
								<p class="gray9 english">所有服务由专业团队全程服务 客户信息严格保密杜绝信息外泄</p>
							</div>
							<div class="section-service"> 
								<ul class="around">
									<li>
										<p class="icon-img"><img class="img-center" src="../image/science/icon1.png" alt=""></p>
										<p>团队专 服务专</p> 
										<p>一对一 专家服务</p>
									</li>
									<li>
										<p class="icon-img"><img class="img-center" src="../image/science/icon2.png" alt=""></p>
										<p>响应快 定稿快</p> 
										<p>撰写搞笑 递交快捷</p>
									</li>
									<li>
										<p class="icon-img"><img class="img-center" src="../image/science/icon3.png" alt=""></p>
										<p>质量好 保密好</p> 
										<p>授权率高 安全性强</p>
									</li>
									<li>
										<p class="icon-img"><img class="img-center" src="../image/science/icon4.png" alt=""></p>
										<p>省费用 省心力</p> 
										<p>全程托管 进度可查</p>
									</li>
								</ul>
							</div>	
						</div>
					</li> -->
				</ul>
			</div>
		</section>
		<!-- 引入 -->
    <div class="bg-color">
      <my-footer></my-footer>
    </div>
  </div>
</template>
<script>
import myNavbar from '../components/NavBar';
import myHeader from '../components/Header';
import myFooter from '../components/Footer';
export default {
  components:{
	myNavbar,
    myHeader,
    myFooter
  },
	data(){
		return{
			navbarNum:0,
			navTitle:'项目申报',
			navbar:[
				{title:'商标申请',to:'#science1'},
				{title:'版权登记',to:'#science2'},
				{title:'专利申请',to:'#science3'},
				{title:'高新技术认定',to:'#science4'},
				{title:'知识产权贯标',to:'#science5'},
			],
			bannerImg:require('../image/science/banner.png'),
			imgTitle:'提升企业竞争力、助力品牌升级',
			imgTxt:'一站式知识产权服务平台，为企业品牌运营保驾护航',
			brand:[
				{
					logo:require('../image/science/small_icon1.png'),
					text:'区别其他同类商品或者服务来源 获得消费者信赖',
				},
				{
					logo:require('../image/science/small_icon2.png'),
					text:'取得商标专用权，受法律保护避免被抢注风险',
				},
				{
					logo:require('../image/science/small_icon3.png'),
					text:'形成无形资产，实现品牌价值',
				},
				{
					logo:require('../image/science/small_icon4.png'),
					text:'利于品牌宣传、推广及加大市场竞争的优势',
				},
			],
			interest:[
				{
					img:require('../image/science/list1.png'),
					title:'无形资产 企业宣传',
					text:'纯技术一旦授予专利权就变成了工业产权，形成了无形资产，具有了价值 科作为商品出售或转让',
					txt:'在宣传广告或产品时打上专利标志，消费者认为这种商品更具有可靠性， 信用性，提高企业的知名度'
				},
				{
					img:require('../image/science/list2.png'),
					title:'独占市场 技术保护',
					text:'一种产品只要授予专利权，就等于在市场上具有了独占权，其他企业不得生产相同的产品',
					txt:'防止他人模仿本企业开发的新技术、新产品'
				},
				{
					img:require('../image/science/list3.png'),
					title:'荣誉提升 税收减免',
					text:'申请高新技术企业必备条件，企业荣誉、提升价值、评定职称、个人成就实现',
					txt:'各地方政府均出台相应文件，对专利申请进行奖励或补助，税收减免'
				}
			],
			enterprise:[
				{
					img:require('../image/science/small_icon5.png'),
					ittle:'税收减免',
					text:'高企所得税减免40%，同时可享受办理研发经费加计扣除'
				},
				{
					img:require('../image/science/small_icon6.png'),
					ittle:'优先上市',
					text:'吸引政策和资金扶持，推动企业产业化扩张，促进企业融资上市'
				},
				{
					img:require('../image/science/small_icon7.png'),
					ittle:'奖励补贴',
					text:'各地政府对高新技术企业奖励补贴最高可达200万，各地区政策存在差异'
				},
				{
					img:require('../image/science/small_icon8.png'),
					ittle:'资源倾斜',
					text:'土地、电力、排污、节能、科研资金等各项扶持政策和资源倾斜'
				},
				{
					img:require('../image/science/small_icon9.png'),
					ittle:'品牌提升',
					text:'政府帮企业背书，大大提高了企业品牌知名度'
				},{
					img:require('../image/science/small_icon10.png'),
					ittle:'投标加分',
					text:'招投标加分，入围政府采购名单，优先考虑高新技术企业'
				}
			],
			list:false,
			active2:false,
			active3:false,
		}
	},
	methods: {
		menu() {
		this.scroll = document.documentElement.scrollTop || document.body.scrollTop;
		console.log(this.scroll)
		  this.list = true
		  if(this.scroll>200){
		    this.active2=true
		  }
		  if(this.scroll>1100){
		    this.active3=true
		  }
		//   if(this.scroll>1300){
		//     this.system4=true
		//   }
		//   if(this.scroll>1700){
		//     this.system5=true
		//   }
		}
	},
	mounted() {
		this.list = true
		window.addEventListener('scroll', this.menu)
	},
}
</script>
<style scoped>
		.section-top{
			text-align: center;
			padding-bottom:40px;
		}
		.nav-banner img{
			background:#000033;
		}
		/* 列表 */
		.section-list{
			border-bottom:1px solid #E5E5E5;
			padding:80px 0;
		}
		.section-list:last-child{
			border:0;
		}
		.section-container{
			width:1200px;
			margin:auto;
		}
		.section-top .english{
			padding-top:10px;
		}
		.section-container .info{
			color:#666;
			font-size:16px;
		}
		#science1{
			overflow: hidden;
		}
		.section-container .info li{
			width:210px;
			padding:30px 25px;
			text-align: center;
			border-radius: 10px;
			box-shadow:0px 4px 12px 0px rgba(0, 0, 0, 0.15);
			transform: translateY(400px);
			transition: all 1s linear;
		}
		.section-container .info li.list{
			transform: translateY(0)
		}
		.section-container .info li.list:nth-child(2){
			transition-delay: .1s;
		}
		.section-container .info li.list:nth-child(3){
			transition-delay: .2s;
		}
		.section-container .info li.list:nth-child(4){
			transition-delay: .3s;
		}
		.section-container .info p{
			line-height:26px;
		}
		.section-container .info .icon-img{
			width:100%;
			height:75px;
			position:relative;
			margin-bottom:10px;
		}


		#science2 .section-interest{
			overflow: hidden;
		}
		.section-interest li{
			width:380px;
			border: 1px solid #E5E5E5;
			transform: translateY(-600px);
			transition: all .6s linear;
		}
		.section-interest li.active2{
			transform: translateY(0)
		}
		
		.section-interest li.active2:nth-child(2){
			transition-delay: .2s;
		}
		.section-interest li.active2:nth-child(3){
			transition-delay: .4s;
		}
		.section-interest li img{
			width:100%;
			display:block;
		}
		.section-interest li h1{
			text-align: center;
			font-size:20px;
			line-height: 20px;
			padding:5px 0 20px;
			color:#333333;
		}
		.section-interest li p{
			font-size:14px;
			line-height:26px;
			color:#999999;
			padding-bottom:35px;
		}
		.section-interest li>p {
			height: 270px;
			overflow: hidden;
			padding-bottom:0px;
			margin-bottom:35px;
		}
		.section-interest li>p img{
			transition: all .6s linear;
		}
		.section-interest li p:hover img{
			transform: scale(1.1)
		}
		
		.section-interest li div{
			padding:0 20px ;
		}
		.section-interest li div p{
			padding-bottom: 25px;
		}

		/* 高新企业 */
		#science3 .section-enterprise{
			overflow: hidden;
		}
		.section-enterprise li{
			padding:30px 40px 0;
		}
		.section-enterprise .self{
			padding-left:40px;
		}
		.section-enterprise .self h3{
			font-size:20px;
			font-weight:500;
			color:#333;
		}
		.section-enterprise .self p{
			width:265px;
			font-size:14px;
			font-weight:400;
			color:#999999;
			line-height:24px;
		}
		
		.section-enterprise li:nth-child(2n+1){
			transform: translateX(-500px);
			transition: all .6s linear;
		}
		.section-enterprise li:nth-child(2n){
			color:red;
			transform: translateX(500px);
			transition: all .6s linear;
		}
		.section-enterprise li.active3{
			transform: translateX(0px);
		}
		.section-enterprise li.active3:nth-child(3),
		.section-enterprise li.active3:nth-child(4){
			transition-delay: .2s;
		}
		.section-enterprise li.active3:nth-child(5),
		.section-enterprise li.active3:nth-child(6){
			transition-delay: .4s;
		}

		/* 金牌服务 */
		.section-service .around{
			text-align: center;
		}
		.section-service p{
			margin-top:10px;
			font-weight:400;
			font-size:16px;
			color:#333;
		}
		.section-service .icon-img{
			width:70px;
			height:70px;
			margin:auto;
			position:relative;
			text-align: center;
			line-height: 70px;
			border-radius: 50%;
			background:linear-gradient(-45deg,rgba(50,220,129,1) 0%,rgba(48,213,170,1) 100%);
		}
		.section-service li:nth-child(2) .icon-img{
			background:linear-gradient(-45deg,rgba(255,173,87,1) 0%,rgba(255,138,93,1) 100%);
		}
		.section-service li:nth-child(3) .icon-img{
			background:linear-gradient(-45deg,rgba(254,212,0,1) 0%,rgba(247,175,0,1) 100%);
		}
		.section-service li:nth-child(4) .icon-img{
			background:linear-gradient(-45deg,rgba(187,148,255,1) 0%,rgba(158,112,254,1) 100%);
		}
</style>
