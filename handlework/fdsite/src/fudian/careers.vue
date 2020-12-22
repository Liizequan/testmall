<template>
	<div class="fd-careers"> 
		<!-- <div>
			<my-header></my-header>
		</div> -->
		<section>
			<div class="nav-content">
				<div class="banner">
					<p class="nav-banner"><img src="../image/banner04.png" alt=""></p>
					<div class="img-center">
						<p>舞台永远比想象的要开阔</p>
						<p class="txt">我们拥有不同背景的伙伴凝聚融合、兼收并蓄，并在不断变化中同行</p>
					</div>
				</div>
			</div>
		</section>
		<section>
			<center class="title">
				<p class="bold">招聘职位</p>
				<p class="gray9">员工是企业最宝贵的财富 坚持唯才是用的用人理念</p>
			</center>
			<div class="careers-info">
				<ul>
					<li class="careers-info-list" v-for="(item,index) in careersInfoList" :key="index">
						<div class="between top">
							<h3>{{item.title}}</h3>
							<a href="#careers" class="self">马上联系</a>
						</div>
						<div class="between">
							<div class="duties">
								<h4>工作职责：</h4>
								<!-- <ol>
									<li v-for="(duties,index) in item.duties" :key="index">
										{{duties}}
									</li>
								</ol> -->
								<div v-html="item.duties"></div>
							</div>
							<div class="duties">
								<h4>任职资格：</h4>
								<div v-html="item.status"></div>
								<!-- <ol>
									<li v-html="status"></li>
									<li v-for="(status,index) in item.status" :key="index" v-html="status">
										{{duties}}
									</li>
								</ol> -->
							</div>
						</div>
					</li>
				</ul>
			</div>
			<div class="careers-footer" id="careers">
				<h2>
					以上职位请将简历投至:
					&nbsp;
					1935925823@qq.com
					&nbsp;&nbsp;&nbsp;&nbsp;
					或者电话联系:
					&nbsp;
					135-3506-5918 刘经理
				</h2>
				<p>浮点科技,期待你的加入！</p>
			</div>
		</section>

		<!-- 引入 -->
		<div class="bg-color">
			<my-footer></my-footer>
		</div>
	</div>
</template>

<script>
import myHeader from '../components/Header';
import myFooter from '../components/Footer';
export default {
	components:{
		myHeader,
		myFooter
	},
	data(){
		return{
			careersInfoList:'',
			url:fudian.host,//网站地址
			// careersInfoList:[
			// 	{
			// 		title:'产品规划工程师：',
			// 		duties:[
			// 			'1、负责研究建设行业发展趋势，规划并制定产品和技术竞争策略。',
			// 			'2、责需求调研、需求分析和产品原型设计、交互设计，编写需求规格说明书，并为开发工程师提供需求指导。',
			// 			'3、负责进行产品功能、业务规则的设计，形成系统功能架构。',
			// 			'4、负责创新型技术的研究和应用，持续提升产品交互体验。',
			// 			'5、配合项目计划，指导开发工程师完成程序设计和开发工作。'
			// 		],
			// 		status:[
			// 			'1、学历及专业要求：本科及以上学历，通信、自动化、系统工程类相关专业。',
			// 			'2、工作经验：3年以上工作经验，对建设行业、工业控制有较深入的理解和认识。',
			// 			'3、专业技能：熟悉软件开发流程，熟练掌握产品设计、需求分析等相关工具和技能。',
			// 			'4、综合能力要求：逻辑思维清晰，善于沟通交流，具备团队合作精神，具备较强学习能力，强烈的进取心和责任心，能自我驱动。'
			// 		]
			// 	},
			// 	{
			// 		title:'高级软件工程师',
			// 		duties:[
			// 			'1、负责公司CRM/ERP/IM系统的设计、开发、维护、实施工作；',
			// 			'2、负责项目相关的文档编写，完成需求分析、概要设计、详细设计文档；',
			// 			'3、负责项目相关的数据库设计及评审；',
			// 			'4、参与用户需求调研，需求设计，参与项目系统设计说明书编写；',
			// 			'5、协助完成项目的测试、系统交付工作，对项目实施提供支持。',
			// 		],
			// 		status:[
			// 			'1.计算机相关专业毕业，本科或以上学历；6年以上的相关工作经验。',
			// 			'2.精通Java，具备扎实的编程基础和良好的编程习惯；',
			// 			'3.熟悉Linux下Java项目的自动构建与部署，精通Linux下的服务端命令操作；',
			// 			'4.熟悉常用构建工具，如Maven等；精通Apache/Tomcat等主流服务器的配置和使用；',
			// 			'5.熟悉常用开源框架如Spring及spring mvc、spring data jpa、mybatis等有深入了解, 对框架本身有过开发或重构者优先；',
			// 			'6.精通Mysql/Oracle等常用数据库开发，熟练git或其他控制工具；有sql开发经验优先；',

			// 		]
			// 	},
			// 	{
			// 		title:'ERP服务顾问',
			// 		duties:[
			// 			'1、负责客户ERP用户的软件安装、测试和售后技术支持和维护管理工作；',
			// 			'2、为客户提供优质的售后服务，优化业务流程，以提供有针对性的解决方案为导向；',
			// 			'3、解答客户使用过程中提出的问题，提供技术支持，要与客户保持沟通，落实做好售后服务工作。',
			// 			'4、客户维护合约的签订和跟进',
			// 		],
			// 		status:[
			// 			'1、计算机科学、信息技术专业学等相关专业大专及以上学历；',
			// 			'2、SQL数据库应用熟练；',
			// 			'3、有1年以上ERP维护经验或实施经验优先；欢迎优秀应届生投递简历；',
			// 			'4、良好的沟通、组织能力和学习能力，有团队合作精神和敬业精神、积极主动，有坚强的毅力；',
			// 			'5、高度敬业，能承受一定的工作压力，能接受工作上的挑战；',
			// 			'6、能接受短期出差；',

			// 		]
			// 	},
			// 	{
			// 		title:'实施顾问（HR/ERP/CRM）',
			// 		duties:[
			// 			'1、主导项目实施，帮助客户成功应用8Manage 产品(如PM、CRM,ERP、HR、采购管理,)软件，实现企业信息化价值； ',
			// 			'2、负责产品项目的实施计划，实施质量的控制，保证项目能按计划顺利完成； ',
			// 			'3、进行需求调研分析、提供业务解决方案； ',
			// 			'4、负责系统上线前的安装配置、用户培训、撰写产品实施相关文档； ',
			// 			'5、给客户提供合理化建议，优化使用效果，协调与客户的关系； ',
			// 			'6、跟踪客户需求，为客户提供相应解决方案，对需求进行反馈，完善产品功能。',
			// 		],
			// 		status:[
			// 			'1、 对PM/CRM/ERP/HR等管理系统软件实施过程、工作流程评估有相当理解。',
			// 			'2、 较强的组织、人际交往和业务理解、分析能力。',
			// 			'3、 优秀的解决问题能力，能协助客户解决实际问题。',
			// 			'4、 良好的与客户、销售、顾问和技术人员协作能力，能主动推动实施进程、解决问题。',
			// 			'5、 在复杂的环境中工作，能以结果为导向,管理好项目实施进度，确保按时实施、交付及验收。',

			// 		]
			// 	},
			// 	{
			// 		title:'知识产权专员',
			// 		duties:[
			// 			'1、经过公司系统培训，熟悉企业业务流程，识别目标客户潜在需求；',
			// 			'2、利用公司提供平台和自身拥有的资源以网络推广及电话销售的方式开发潜在企业客户；',
			// 			'3、开发新客户，拓展与老客户的业务，对客户需求进行定期追踪，达成客户多次成交，为客户提供专利、软著、高新企业辅导、系统集成资质等企业咨询类持续咨询服务。',
			// 		],
			// 		status:[
			// 			'1、大专以上学历，财会专业 、法律类或市场营销类专业优先，20岁以上，男女不限；',
			// 			'2、有销售经验者优先，有在知识产权代理机构从事业务工作经验者优先；',
			// 			'3、有良好的沟通交流能力，独立工作及团队合作精神，对自己有长远的规划。',

			// 		]
			// 	}
			// ]
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
		var url = this.url+"/api/index/worker";
		// 跨域
		/*
		this.$http.get(url).then(result=>{
			console.log(result)
			// console.log(result.data.data)
			this.careersInfoList = result.data.data;
			// console.log(this.careersInfoList);
			// console.log(result.body);
			// this.info = result.body;
		})
		*/
		// 本地
		var that = this;
		this.$axios({
            method: 'get',
            url: url
        }).then(function (result) {
			that.careersInfoList = result.data.data;
		})
	}
}
</script>
<style scoped>
 .nav-content{
        clear:both;
    }
    .banner{
        position:relative;
				background:#0B112F;
    }
    .nav-banner img{
        display: block;
        width:100%;
        min-width:1200px;
        margin:auto;
    }
    .banner .img-center{
        color:#fff;
				top:40%;
        text-align: center;
        font-size: 42px;
        font-weight:bold;
    }
    .banner .img-center .txt{
        font-size:16px;
        font-weight:400;
        padding:10px 0 40px;
        position:relative;
    }
    .banner .img-center .txt::after{
        position: absolute;
        content: '';
        bottom:0;
        left:50%;
        width:48px;
        height:4px;
        background: #fff;
        transform: translate(-50%);
		}

/* 内容 */
		.title .bold{
			padding:80px 0 20px;
			font-size:20px;
		}
		.title .gray9{
			font-size:14px;
			color:#999999;
		}
		.careers-info{
			width:1200px;
			margin:auto;
			/* background:pink; */
		}
		.careers-info .top{
			border-bottom: 1px solid #E5E5E5;
			padding-bottom: 30px;
		}
		.careers-info .duties{
			width:560px;
			padding-top:40px;
			text-align: justify;
		}
		.careers-info .duties h4{
			line-height:30px;
			font-weight:400;
			font-size:16px;
		}
		.careers-info ul .careers-info-list{
			padding-top:60px;
		}
		.careers-info h2,
		.careers-info ul .careers-info-list h3,
		.careers-info ul .careers-info-list h4{
			color:#333;
		}
		.careers-info-list .top a{
			color:#999;
		}
		.careers-info .duties li{
			line-height:28px;
			color:#999;
			font-weight:400;
			font-size:14px;
		}
		/* 邮箱 */
		.careers-footer{
			width:1200px;
			margin:80px auto 0;
			padding:60px;
			border-top:1px solid #E5E5E5;
		}
		.careers-footer h2{
			font-size:24px;
			font-weight:400;
			line-height:50px;
			color:#333;
		}
</style>
