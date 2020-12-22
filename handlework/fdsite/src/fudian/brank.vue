<template>
	<div class="fd-brank">
		<!-- <div>
			<my-header></my-header>
		</div> -->
		<div>
			<my-navbar v-bind:navbar="navbar" v-bind:navTitle="navTitle" v-bind:imgTitle="imgTitle" v-bind:imgTxt="imgTxt" v-bind:bannerImg="bannerImg"></my-navbar>
		</div>
		<!-- 图文1 商标logo -->
		<section>
			<div class="nav-content">
				<div class="logo-list" id="brank1" >
					<ul class="wrap">
						<li class="animated zoomInDown faster" v-for="(item,index) in logoImg" :key="index">
							<a href="javascript:;" class="img-y-center"><img :src="item" alt=""></a>
						</li>
					</ul>
				</div>
			</div>
		</section>
		<!-- 图文2 企业画册与vi系统-->
		<section>
			<div class="section2">
				<div class="section-top" id="brank2" >
					<p class="bold5">企业画册与vi系统</p>
					<p class="gray9 english">Corporate album and vi system</p>
					<p class="gray9 describe">
						一本优秀的画册，除了外表制作精美，还要设计的有内涵，可以更好的突出企业的品牌形象；<br>
						整体的策划让画册的品牌叙述性更强创意的设计让画册的版面充满品牌DNA，精美的印刷让画册的质感更显，<br>
						我们的精力有限，只能服务彼此合适的项目，我们的每个方案都由设计总监亲自领队出设计创意，保证画册质量；<br>
						从策划、产品拍摄、创意设计，到后期的画册印刷，提供一站式服务
					</p>
				</div>
				<div class="art-exhibition between">
					<p><img src="../image/brank/exhibition1.png" alt=""></p>
					<p>
						<img src="../image/brank/exhibition2.png" alt="">
						<img src="../image/brank/exhibition3.png" alt="">
					</p>
					<div>
						<img src="../image/brank/exhibition4.png" alt="">
					</div>
				</div>
			</div>
		</section>
		<!-- 图文3 案例欣赏-->
		<section>
			<div class="section3">
				<div class="section-top" id="brank3" >
					<p class="bold5">案例欣赏</p>
					<p class="gray9 english">我们的实力不仅仅只有这样，还可以为您创造更多</p>
				</div>
				<div class="section-case">
					<ul class="wraps">
                        <li v-for="(item,index) in cooperates" :key="index">
                          <router-link :to="'/example/child/'+item.id">
                            <p class="section-ul-li-img">
                              <!-- {{item}} -->
                              <i><img :src="url+item.img" alt="" style="width:100%"/></i>
                            </p>
                            <div class="section-ul-li-div">
                              <p class="section-ul-li-title">{{item.title}}</p>
                              <p class="between">
                              <span>Details</span>
                              <i><img src="../image/auto_right.png" alt=""/></i>
                              </p>
                            </div>
                          </router-link>
                        </li>
                      </ul>

					<router-link to="/example/0"><h4 class="more"> MORE</h4></router-link>
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
	data(){
		return{
			url:fudian.host,
			navbarNum:0,
			navTitle:'品牌打造',
			navbar:[
				{title:'LOGO设计',to:'#brank1'},
				{title:'企业画册',to:'#brank2'},
				{title:'企业VI',to:'#brank2'},
				{title:'企业活动物料',to:'#brank3'},
				{title:'企业文化墙',to:'#brank3'},
			],
			bannerImg:require('../image/brank/banner.png'),
			imgTitle:'整合设计和需求用策略唤醒品牌',
			imgTxt:'探索策略设计，以协助企业建立和管理品牌形象，提升品牌价值以及科学的品牌建设理念',

			logoImg:[
				require('../image/brank/logo_list1.png'),
				require('../image/brank/logo_list2.png'),
				require('../image/brank/logo_list3.png'),
				require('../image/brank/logo_list4.png'),
				require('../image/brank/logo_list5.png'),
				require('../image/brank/logo_list6.png'),
			],//logo设计
			cooperates:[
				{img:require('../image/brank/list1.png'),title:'新世界集团'},
				{img:require('../image/brank/list2.png'),title:'利马地产集团'},
				{img:require('../image/brank/list3.png'),title:'盛大科技有限公司'},
				{img:require('../image/brank/list4.png'),title:'ESD Acoustics'},
				{img:require('../image/brank/list5.png'),title:'明治芯片'},
				{img:require('../image/brank/list6.png'),title:'慧民医疗科技'},
			]
		}
	},
	methods: {
		navbarTap:function(index){
			console.log(index)
			this.navbarNum = index
		}
	},
	created:function(){
		var url = this.url+"/api/index/example";
		var that = this; 
		that.$axios({
          method: 'get',
          url: url
        }).then(function (result) {
			var list = result.data.list
			list.sort(() => Math.random() - 0.5);
			var newList = [];
			for(var i=0; i<6; i++){
				if(list[i]!=undefined){
				newList.push(list[i])
				}
			}
			that.cooperates = newList
        })
	}
}
</script>
<style scoped>
    /* 面包屑 */
	.section-top{
		text-align: center;
		padding-bottom:40px;
	}
    

		/* 品牌标志设计 */
		.logo-list{
			width:1200px;
			margin:auto;
			padding:80px 0;
		}
		.logo-list .wrap li{
			position:relative;
			width:380px;
			height:280px;
			margin-top:30px;
			overflow: hidden;
		}
		.logo-list .wrap li img{
			transition: all .6s linear;
		}
		.logo-list .wrap li:hover img{
			transform: scale(1.1);
		}
		.logo-list .wrap li:nth-child(1):hover img{
			transform: scale(1)
		}
		/* 画册 */
		.section2,.section3{
			width:1200px;
			margin:auto;
		}
		.section2{
			padding-bottom:80px;
		}
		.section-top .english{
			padding:20px;
		}
		.section-top .describe{
			font-size:14px;
			line-height: 26px;
		}
		.art-exhibition{
			position: relative;
		}
		.art-exhibition p{
			text-align: right;
		}
		.art-exhibition div{
			position: absolute;
			bottom:0;
			left:33%;
			border:4px solid #fff;
			border-bottom: 0;
		}



		.section6 .el-tabs__content{
    width: 1200px;
    margin: auto;
    padding:0;
  }
  .section-case {
	margin-bottom: 100px;
  }
  .section-case .more{
	font-size:16px;
	font-family:SourceHanSansCN-Regular;
	font-weight:400;
	color:#999999;
	position: relative;
	text-align: center;
  }
  .section-case .more::after{
	position: absolute;
    content: '';
    left: 50%;
    bottom: -10px;
    transform: translateX(-50%);
    width: 18px;
    height: 2px;
    background: #E5E5E5;
  }
  .section-case ul{
    padding-bottom:40px;
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
    transition: all .3s linear;
    background:rgba(0, 0, 0, .72);
  }
  .section-case li:hover .section-ul-li-img::after{
    top:0;
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
    width:100%;
    text-align: center;
    padding:10px 0;
  }
  .section-case .btn button{
    border-radius:none;
  }
</style>