<template>
	<div class="fd-science">
		<!-- 引入标题导航 -->
		<div>
			<my-navbar v-bind:navbar="navbar" v-bind:navTitle="navTitle" v-bind:imgTitle="imgTitle" v-bind:imgTxt="imgTxt" v-bind:bannerImg="bannerImg"></my-navbar>
		</div>
		<!-- 图文1 -->
		<section id="about1">
			<header class="section-header">
				<center>
					<h2 class="bold">{{title1}}</h2>
					<!-- <h2 class="bold">广州浮点动力科技服务有限公司</h2> -->
					<!-- <p class="gray9">Guangzhou FP Technology services Co, Ltd.</p>
					<div class="gray9">
						<p>
							广州浮点动力科技服务有限公司是一家致力于为中小企业提供信息化管理软件开发、销售、管理咨询为一体的高科技信息企业。<br>
							公司拥有资深的行业财务专家，销售专家，企业技术管理专家等人才团队，专注为企业提供销售管理、财务管理、仓库管理、生产管理、客户管理、人力资源及办公等全方位ERP软件的个性化开发和应用。总部位于广州经济技术开发区，在佛山、深圳、东莞等地均有咨询服务中心。<br>
							
						</p>
						<p>浮点科技公司希望通过专业的服务技术和创新，卓越的服务质量，与客户建立可持续和战略合作伙伴，把公司打造成为企业信息化管理行业的佼佼者！</p>
					</div> -->
					<html v-html="title1_text"></html>
				</center>
				<div class="content">
					<p><img src="../image/about/list1.png" alt=""></p>
					<div class="content-text">
						<!-- <h4>开放式办公区</h4>
						<p>这里，工作永远是开放的，没有隔断空间的束缚，任何问题，都能在第一时间得到解决，员工关系平等，
							Boss没有架子，这就是许多人眼中互联网公司的样子，让员工更惬意的工作，也是我们实现愿景的每日所需。
						</p> -->
						<h4>{{title2}}</h4>
						<!-- <p v-html="title2_text"></p> -->
						<p>这里，工作永远是开放的，没有隔断空间的束缚，任何问题，都能在第一时间得到解决，员工关系平等，
							Boss没有架子，这就是许多人眼中互联网公司的样子，让员工更惬意的工作，也是我们实现愿景的每日所需。
						</p>
					</div>
				</div>
				<center>
					<!-- <h2 class="bold">我们不推崇个人英雄！</h2>
					<p class="gray9">We do not respect individual heroes</p>
					<p class="blue">我们崇尚团队力量，以团队的联合协作结晶个人智慧，创造出高于常规加法的价值</p>
					<div class="gray9 ">
					  <p>浮点团队基础是尊重每一位成员，包括个体价值、兴趣和成就等等...</p>
					  <p>我们的团队核心是协同合作，民主团结。我们并不要求团队成员以牺牲自我来表现所谓的团队精神，相反，我们更提倡在统一的目标和明确的分工中，挥洒个性，发挥特长，各尽其责，各显其能。让全体成员的向心力、凝聚力趋向一个理想的绝对值接近，虽然达不到，但我们坚信会越来越近。</p>
					  <p>我们主张专注热情的工作，让每一位成员高效充实；我们提倡团结互助的美德，鼓励自由洒脱、环保低碳的健康生活；我们会在空闲时光一起享受美妙的音乐，再品上一杯咖啡，或者一杯茶……</p>
					</div> -->
					 <h2 class="bold">{{title3}}</h2>
					 <div v-html="title3_text"></div>
				</center>
			</header>
			
		</section>

		<!-- 图片分割 -->
		<div class="section-img">
			<img src="../image/about/banner2.png" alt="">
			<div class="img-center">
				<h2>公司使命：创造价值 回馈社会</h2>
				<h2>核心价值观：诚信 共赢 专业 创新 </h2>
			</div>
		</div>

		<!-- 未来 -->
		<section id="about3">
			<div class="section-future">
				<center>
					<h2 class="bold">未来愿景</h2>
					<p class="gray9">为客户创造更多的移动互联网价值</p>
				</center>
				<div class="section-future-content">
					<div class="between">
						<p><img src="../image/about/list2.png" alt=""></p>
						<div class="section-future-content-text">
							<div class="img-y-center">
								<!-- <h4>专注为企业提供信息化管理解决方案</h4>
								<h5>立足未来，引领下一个时代</h5>
								<p class="gray9">时代不断变化，每个时代变迁的同时，都会诞生全新的更加伟大的企业。所以，如果站在未来的维度制定战略，就可能引领下一个时代。</p>
								<p class="gray9 english">The times are constantly changing, and every time the times change, new and greater companies will be born. Therefore, if you set a strategy in the future dimension, you may lead the next era.</p> -->
								<h4>{{title4}}</h4>
								<div v-html="title4_text"></div>
							</div>
						</div>
					</div>
					<div class="between">
						<div class="section-future-content-text section-future-content-left">
							<div class="img-y-center">
								<!-- <h4>帮助客户在时代中完成蜕变</h4>
								<h5>帮助客户创造价值，而我们也将以此为契机</h5>
								<p class="gray9">我们一直紧随时代步伐，调整自己的脚步。如今，我们发现在互联网变革的大背景之下，传统企业亟需解决的转型问题，帮助客户在日新月异的时代中完成蜕变。</p>
								<p class="gray9 english">We have been adjusting our paces at any time. Nowadays, we find that under the background of the Internet revolution, traditional enterprises need to solve the transformation problems to help customers in the ever-changing</p> -->
								<h4>{{title5}}</h4>
								<div v-html="title5_text"></div>
							</div>
						</div>
						<p><img src="../image/about/list3.png" alt=""></p>
					</div>
				</div>
			</div>
		</section>

		<!-- 联系我们 -->
		<section id="about4">
			<div class="section-contact">
				<center>
					<h2 class="bold">联系我们</h2>
					<p class="gray9">项目的开始源于沟通，沟通的开始源于信任，信任的开始源于态度</p>
				</center>
				<div class="section-contact-box">
					<ul class="between">
						<li class="section-contact-box-left">
							<div>
								<b>24小时服务热线：</b> 
								<!-- <p class="blue">020-82016711</p> -->
								<p class="blue">{{server}}</p>
							</div>
							<div>
								<span class="gray9">总部邮箱：</span> 
								<!-- <p>cherrybay@aliyun.com</p> -->
								<p>{{email}}</p>
							</div>
							<div>
								<span class="gray9">联系手机：</span> 
								<!-- <p>131 4371 8588</p> -->
								<p>{{phone}}</p>
							</div>
						</li>
						<li class="section-contact-box-right wrap">
							<div class="section-contact-box-right-list">
								<h4>萝岗营业部</h4>
								<span class="gray9">公司地址</span><br>
								<!-- <p>广州市黄埔区锐丰三街2号（自编1#）1121房</p> -->
								<p>{{huangpu}}</p>
							</div>
							<div class="section-contact-box-right-list">
								<h4>黄埔营业部</h4>
								<span class="gray9">公司地址</span><br>
								<!-- <p>广州市黄埔区开创大道108号锦昊智樽仺217</p> -->
								<p>{{luogang}}</p>
							</div>
							<div class="section-contact-box-right-list">
								<h4>天河公司</h4>
								<span class="gray9">公司地址</span><br>
								<!-- <p>广州市天河区海安路19号东田大厦507</p> -->
								<p>{{tianhe}}</p>
							</div>
						</li>
					</ul>
				</div>
				<!-- 地图 -->
				<div class="amap-container">
					<el-amap :vid="'amap-vue'" :zoom="zoom" :center="center" class="amap-demo">
					<el-amap-marker vid="component-marker" :position="componentMarker.position" :content-render="componentMarker.contentRender" ></el-amap-marker>
					<el-amap-marker v-for="(marker, index) in markers" :key="index" :position="marker.position" :visible="marker.visible" :draggable="marker.draggable" :vid="index"></el-amap-marker>
					</el-amap>
				</div>
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
const exampleComponents = {
	props: ['text'],
	template: `
	<div>
		<h1 style="background-color:#fff; font-size:16px;">{{text}}</h1>
		<p style="font-size:12px">广州市黄埔区开创大道108号锦昊智樽仺217</p>
	</div>
	`
	// 113.54405  23.107337
}
export default {
	components:{
		myNavbar,
		myHeader,
		myFooter
	},
	data(){
		return{
			
			title1:'',//标题1
			title1_text:'',//标题1的描述
			title2:'',//标题2
			title2_text:'',//标题2的描述
			title3:'',//标题3
			title3_text:'',//标题3的描述
			title4:'',//标题4
			title4_text:'',//标题4的描述
			title5:'',//标题4
			title5_text:'',//标题4的描述
			email: "",
			huangpu: "",
			luogang: "",
			phone: "",
			server: "",
			tianhe: "",

			navbarNum:0,
			navTitle:'关于我们',
			navbar:[
				{title:'公司简介',to:'#about1'},
				{title:'企业文化',to:'#about2'},
				{title:'未来愿景',to:'#about3'},
				{title:'联系我们',to:'#about4'},
			],
			bannerImg:require('../image/about/banner.png'),
			imgTitle:'浮点 · 远见卓识的团队',
			imgTxt:'我们拥有见解独到、远见卓识的团队，将行业经验与知识构成赋能市场洞察与策略执行，为您提供专业化服务',
			url:fudian.host,//网站地址
			// 地图开始
			zoom: 14,
			center: [113.544445, 23.10541],
			markers: [
				{
				position: [113.544445, 23.10541],
				visible: true,
				draggable: false,
				}
			],
			componentMarker: {
				position: [113.53455, 23.11280],
					contentRender: (h, instance) => h(exampleComponents,{
					style: {
					backgroundColor: '#fff', 
					width:'250px',
					padding:'15px 10px', 
					color:'#333333', 
					textAlign:'center',
					boxShadow:'1px 1px 4px 0px rgba(0, 0, 0, 0.4)'
				}, 
					props: {text: '广州浮点动力科技有限公司'}
				})
			},
			// 地图结束
		}
	},
	created:function(){
		// http://float.lihope88.com/api/index/worker
		// this.$axios.post("http://float.lihope88.com/api/index/worker")
		// .then((res)=>{
        // //   return Promise.resolve(res.data)
        //   console.log(res)
        // //   console.log('提交成功')
		// });
		var url = this.url+"/api/index/about";
		// 跨域
		/*
		this.$http.get(url).then(result=>{
			console.log(result)
			this.title1 = result.body.data1[0].title//标题1
			this.title1_text = result.body.data1[0].desc
			this.title2 = result.body.data1[1].title//标题2
			this.title2_text = result.body.data1[1].desc
			this.title3 = result.body.data1[2].title//标题3
			this.title3_text = result.body.data1[2].desc
			this.title4 = result.body.data1[3].title//标题4
			this.title4_text = result.body.data1[3].desc
			this.title5 = result.body.data1[4].title//标题4
			this.title5_text = result.body.data1[4].desc
			this.email = result.body.data2.email
			this.huangpu = result.body.data2.huangpu
			this.luogang = result.body.data2.luogang
			this.phone = result.body.data2.phone
			this.server = result.body.data2.server
			this.tianhe = result.body.data2.tianhe
		})
		*/

		// 本地
		var that = this;
		this.$axios({
            method: 'get',
            url: url
        }).then(function (result) {
			console.log(result)
			that.title1 = result.data.data1[0].title//标题1
			that.title1_text = result.data.data1[0].desc
			that.title2 = result.data.data1[1].title//标题2
			that.title2_text = result.data.data1[1].desc
			that.title3 = result.data.data1[2].title//标题3
			that.title3_text = result.data.data1[2].desc
			that.title4 = result.data.data1[3].title//标题4
			that.title4_text = result.data.data1[3].desc
			that.title5 = result.data.data1[4].title//标题4
			that.title5_text = result.data.data1[4].desc
			that.email = result.data.data2.email
			that.huangpu = result.data.data2.huangpu
			that.luogang = result.data.data2.luogang
			that.phone = result.data.data2.phone
			that.server = result.data.data2.server
			that.tianhe = result.data.data2.tianhe
		})
	}
}
</script>
<style scoped>
		/* 图文1 */
		.section-header{
			width:1060px;
			margin:auto;
			/* background:pink; */
			padding-bottom:80px;
		}
		.section-header h2{
			padding:80px 0 20px;
		}
		.section-header center div p{
			padding:20px 20px 0;
			line-height: 24px;
		}

		.content{
			position:relative;
		}
		.content div{
			position:absolute;
			right:0;
			top:50%;
			width:410px;
			padding:110px 40px;
			background:#F9F9F9;
			transform: translateY(-50%);
		}
		.content img{
			display: block;
			margin-top:50px;
		}
		.content-text h4{
			font-weight:500;
			font-size:16px;
			color:#333333;
			position: relative;
			padding-bottom:30px;
			margin-bottom:30px;
		}
		.content-text h4::before{
			content:'';
			position: absolute;
			bottom:0;
			left:0;
			width:32px;
			height:4px;
			background-color:#333333;
		}
		.content-text p{
			width:420px;
			color: #666;
			font-size:14px;
			text-align: justify;
			line-height: 30px;
		}

		/* 内容2 */
		
		.blue{
			color:#1371FF;
			font-size:16px;
			font-weight:500;
			padding-top:20px;
		}

		/* 分割图片 */

		.section-img {
			position:relative;
			color:#fff;
			font-weight:500;
		}
		.section-img img{
			min-width:1200px;
			width:100%;
			margin:auto;
		}
		.section-img h2{
			text-align:center;
			font-size:28px;
			line-height: 50px;
		}

		/* 未来 */
		.section-future{
			padding:70px 0;
			border-bottom:1px solid #E5E5E5;
		}
		.section-future .gray9{
			padding-top:20px;
		}
		.section-future-content{
			width:1200px;
			margin:auto;
			padding-top:40px;
		}
		.section-future-content img{
			display: block;
		}
		.section-future-content-text{
			position: relative;
			flex:1;
		}
		.section-future-content-text>div{
			padding:0 40px 0 70px;
			text-align: justify;
		}
		.section-future-content-text h4{
			font-size:26px;
			font-weight:400;
			color:#333;
			position: relative;
			padding-bottom: 30px;
			margin-bottom: 30px;
		}
		.section-future-content-text h4::before{
			content:'';
			position: absolute;
			bottom:0;
			left:0;
			width:14px;
			height:3px;
			background:#999;
		}
		.section-future-content-text h5{
			font-size:16px;
			color:#333;
		}
		.section-future-content-text p{
			padding-top:30px;
		}
		.section-future-content-text .english{
			font-size:10px;
		}
		.section-future-content-left>div{
			padding:0 60px 0 0;
		}

		/* 联系我们 */
		.section-contact{
			padding:60px 0;
		}
		.section-contact center .gray9{
			padding-top:20px;
		}
		.section-contact-box{
			width:1200px;
			margin:auto;
			padding-top:60px;
			/* background:skyblue; */
		}
		.section-contact-box-left{
			width:420px;
		}
		.section-contact-box-left p{
			font-size:18px;
			color:#333333;
		}
		.section-contact-box-left b{
			font-size: 18px;
			font-weight:400;
		}
		.section-contact-box-left span{
			display: inline-block;
			padding-top:20px;
		}
		.section-contact-box-left .blue{
			font-weight:bold;
			font-size:36px;
			padding-top:0;
			color: #1371FF;
			line-height:36px;
		}
		.section-contact-box-right{
			flex:1;
		}
		.section-contact-box-right div{
			padding-bottom:30px;
			margin-bottom:30px;
			color:#333;
			border-bottom: 1px solid #E5E5E5;
		}
		.section-contact-box-right div+div{
			border:0;
		}
		.section-contact-box-right span{
			display: inline-block;
			padding:20px 0 5px;
		}
		/* 地图 */
		.amap-container{
			width: 1200px;
			margin:auto;
			height: 450px;
			/* -70  -100*/
		}
</style>
