<template>
    <div class="example">
        <section class="between">
            <article class="example-left flex1">
                <header class="between">
                    <h2 class="flex1 self">{{product.title}}</h2>
                    <div class="between-right between">
                        <div>
                            <p class="between"><span>时间: {{product.create_time}}</span><span>浏览量:{{product.view}}</span></p> 
                            <!-- 后台控制 -->
                            <p> <a :href="product.pageurl">直达案例网站</a></p>
                        </div>
                        <div class="direction">
                            <i class="el-icon-arrow-left" @click="leftExample"></i>
                            <i class="el-icon-s-grid" @click="Example"></i>
                            <i class="el-icon-arrow-right" @click="rightExample"></i>
                        </div>
                    </div>
                </header>
                <div class="column">
                    <div class="cooperate-img" style="">
                        <!-- <img :src="url+img" alt=""> -->
                        <div class="pc" v-if='product.cate!=2'>
                            <img src="../../image/pc.png" alt="">
                            <div class="transition" ref="spanImg" @mouseenter="enter()"  @mouseleave="leave()">
                                <img ref="bgImg" :src="url+product.img" alt="" :style="{marginTop:'-'+number+'px', transition:'all .5s linear'}">
                            </div>
                        </div>
                        <div class="sj" v-else>
                            <div class="sj-png"><img src="../../image/sj.png" alt=""></div>
                            <div class="transition" ref="spanImg" @mouseenter="enter()"  @mouseleave="leave()">
                                <img ref="bgImg" :src="url+product.img" alt="" :style="{marginTop:'-'+number+'px', transition:'all .5s linear'}">
                            </div>
                            <div class="ercode"><div><img ref="bgImg" :src="url+product.ercode" alt=""></div></div>
                        </div>
                    </div>
                    <div class="cooperate-text">
                        <h1>项目背景</h1>
                        <p v-html="product.desc">
                        <!-- 佛山市德玛仕网络科技有限公司专注于商用厨房设备、
                        家用厨房用具领域，集研发、生产、销售、工程配套、工程施工、
                        链条管理为一体的专业厨房设备企业，始终以”匠心品质，美食美客“为企业的战略重心，
                        推动现有商业餐厨标准化，家用厨房用具精细化，稳步踏入正在崛起的中国中高端餐饮市场，
                        把德系制造的精工品质带给广大的中国餐饮业从业者，让使用者感受德系制造的“匠心品质”、“ 美食美客”。 -->
                        </p>
                    </div>
                    <div class="cooperate-text">
                        <h1>相关页面</h1>
                        <p>
                            <!-- <img src="../../image/cooperate1.png" alt="">
                            <img src="../../image/cooperate2.png" alt=""> -->
                            <!-- <img v-for="product.imglist" :key="index" :src="item" alt=""> -->
                            <img v-for="(item,index) in product.imglist" :key="index" :src="url+item.url" alt="" >
                        </p>
                    </div>
                </div>
            </article>
            <aside class="example-right">
                <h3>相关案例</h3>
                <ul class="column">
                    <!-- <li v-for="(item,index) in cooperate" :key="index">
                        <a href="#">
                            <p class="section-ul-li-img">
                                <i><img :src="item.img" alt=""></i>
                            </p>
                            <div class="section-ul-li-div">
                                <h4 class="section-ul-li-title">{{item.title}}</h4>
                                <p class="section-ul-li-time between"><span>时间：2019-02-14</span><span>浏览量:  99</span> </p>
                            </div>
                        </a>
                    </li> -->
                    <li v-for="(item,index) in possess" :key="index" @click="newChild(index)">
                        <a href="javascript:;">
                            <div class="section-ul-li-div">
                                <h4 class="section-ul-li-title">{{item.title}}</h4>
                            </div>
                            <p class="section-ul-li-img">
                                <i><img :src="url+item.img" alt=""></i>
                            </p>
                            <div class="section-ul-li-div">
                                <p class="section-ul-li-time between"><span>时间：{{item.create_time}}</span><span>浏览量:{{item.view}}</span> </p>
                            </div>
                        </a>
                    </li>
                </ul>
            </aside>
        </section>
        <div>
            <my-contact></my-contact>
        </div>
        <div>
            <my-footer></my-footer>
        </div>
    </div>
</template>

<script>

import myContact from '../../components/Contact';
import myFooter from '../../components/Footer';
import { setTimeout, setInterval, clearInterval } from 'timers';
import { connect } from 'net';
export default {
    components:{
        myContact,
        myFooter
    },
    data(){
        return{
            // 案例
            cooperate:[
                {img:require('../../image/cooperate1.png'),title:'NO尔斯水杯'},
                {img:require('../../image/cooperate2.png'),title:'农情商事官网'},
                {img:require('../../image/cooperate3.png'),title:'宁波霍科电器有限公司'},
                {img:require('../../image/cooperate4.png'),title:'金箔娱乐'},
                {img:require('../../image/cooperate5.png'),title:'吉利新能源汽车'},
            ],
            url:fudian.host,//域名
            number:0,//需要滚动图片位置为0
            scorll:false,
            product:'',// 需要渲染出来的数据
            possess:'',//所有案例
            possessId:'',//目前案例在所有案例中的id
        }
    },
    methods: {
        // 
        leftExample:function(){
            console.log('点击查看上一条数据');
            var id = parseInt(this.possessId);
            var all = this.possess;
            console.log(id)//目前案例在所有案例中的id
            console.log(all)
            for(var i in all){
                if(all[i].id == id && i>0){
                    console.log(i)//目前案例在所有案例中的下标
                    this.product = all[i-1]
                    // 获取需要跳转到对应案例的id
                    var newId = all[i-1].id;
                    //跳转页面
                    var url = this.url+'/api/index/lookexample/id/'+newId
                    // 跨域
                    /*
                    this.$http.get(url).then(result=>{
                        var data = result.data.data
                        this.product = data;//页面渲染数据
                        this.possessId = newId//让当前路由id为此id
                    })
                    */
                    // 本地
                    var that = this;
                    that.$axios({
                        method: 'get',
                        url: url
                    }).then(function (res) {
                        var data = res.data.data
                        that.product = data;//页面渲染数据
                        that.possessId = newId//让当前路由id为此id
                    })

                    this.$router.push({  //核心语句
                        path:'/example/child/'+newId,   //跳转的路径 //0表示example传递过来的案例分类
                    })
                }
            }
        },
        Example:function(){
            console.log('回到所有案例中去')
            this.$router.push({  //核心语句
                path:'/example/'+'0',   //跳转的路径 //0表示example传递过来的案例分类
            })
        },
        rightExample:function(){
            console.log('点击查看下一条数据');
            var that = this;
            var id = parseInt(this.possessId);
            var all = JSON.stringify(this.possess);
            all = JSON.parse(all)
            // console.log(id)//目前案例在所有案例中的id
            console.log(id)
            // console.log(JSON.stringify(all))

            for(var i in all){
                // console.log(parseInt(i))
                if(all[i].id == id && parseInt(i)<all.length-1){
                    // json解析
                    // var jsonStr = JSON.stringify(all[parseInt(i)+1])
                    // console.log(jsonStr)
                    // this.product = jsonStr;
                    // console.log(this.product)
                    // i 是一个字符串，需要转为数字
                    this.product = all[parseInt(i)+1];
                    var newId = all[parseInt(i)+1].id;
                    //跳转页面
                    var url = this.url+'/api/index/lookexample/id/'+newId
                    // 跨域
                    /*
                    this.$http.get(url).then(result=>{
                        var data = result.data.data
                        this.product = data;//页面渲染数据
                        this.possessId = newId//让当前路由id为此id
                    })
                    */
                    //本地    
                    var that = this;
                    that.$axios({
                        method: 'get',
                        url: url
                    }).then(function (res) {
                        var data = res.data.data
                        that.product = data;//页面渲染数据
                        that.possessId = newId//让当前路由id为此id
                    })

                    this.$router.push({  //核心语句
                        path:'/example/child/'+newId,   //跳转的路径 //0表示example传递过来的案例分类
                    })
                }
                // console.log(all[i].id)
            }
        },
        enter:function(){
            console.log('移入')
            // console.log(this)
            // 绑定元素
            this.scorll = true
            let parentHeight = this.$refs.spanImg.offsetHeight;
            let childHeight= this.$refs.bgImg.offsetHeight;  //100
            let maxHeight = childHeight - parentHeight;
            // console.log('图片父元素的高：'+parentHeight)
            // console.log('图片的高：'+childHeight)
            // console.log('能够滚动最大的高度')

            // 让图片内容自动滚动
            var that = this;
            var number = that.number
            // 设置定时器让图片自动滚动
            var timer = setInterval(function(){
                // var number = that.number;//默认图片位置
                // 定义滚动长度
                var num = (number += 0.5)
                // 控制滚动
                that.number = num
                // 当滚动长度大于图片差度停止滚动
                if(num>=maxHeight){
                    clearInterval(timer)
                }
                if(that.scorll==false){
                    clearInterval(timer)
                    that.number = 0
                }
                // console.log(that.scorll)
                // console.log(num)
            },50)
        },
        leave:function(){
            // console.log('移出')
            this.number = 0
            // conso
            this.scorll = false
        },
        newChild:function(index){
            console.log(index)
            console.log(this.possess)
            if(index!=undefined){
                var id  = this.possess[index].id;
                var url = this.url+'/api/index/lookexample/id/'+id
                // 跨域
                /*
                this.$http.get(url).then(result=>{
                    var data = result.data.data
                    this.product = data;
                    console.log(data)
                })
                */
                //本地    
                var that = this;
                that.$axios({
                    method: 'get',
                    url: url
                }).then(function (res) {
                    var data = res.data.data
                    that.product = data;//页面渲染数据
                })

                that.$router.push({  //核心语句
                    path:'/example/child/'+id,   //跳转的路径 //0表示example传递过来的案例分类
                })
            }
        }
    },
    created:function(e){
        // console.log(e)
        var that = this;
        that.newChild()
        // console.log(this.$route.params.id)//获取路由上的值
        // console.log('渲染')
        var id = this.$route.params.id
        // 目前网页案例
        var url = this.url+'/api/index/lookexample/id/'+id
        // 跨域
        /*
        this.$http.get(url).then(result=>{
            var data = result.data.data
            this.product = data;
            console.log(data)
        })*/
        //本地    
        var that = this;
        that.$axios({
            method: 'get',
            url: url
        }).then(function (res) {
            var data = res.data.data
            that.product = data;//页面渲染数据
        })

        // 所有案例，所有案例必须是包含所有内容
        var Allurl = this.url+"/api/index/example";
        // 跨域
        /*
        this.$http.get(Allurl).then(result=>{
            var list = result.data.list
            // console.log(list)
            this.possess = list;//所有案例
            this.possessId = id//目前案例在所有案例的位置
        })
        */
        //本地 
        var that = this;   
        that.$axios({
            method: 'get',
            url: Allurl
        }).then(function (res) {
            var list = res.data.list
            console.log('我是案例：')
            console.log(res)
            list.sort(() => Math.random() - 0.5);
            var newList = [];
            for(var i=0; i<4; i++){
                // console.log(list[i])
                if(list[i]!=undefined){
                newList.push(list[i])
                }
            }
            that.possess = newList;//页面渲染数据
            that.possessId = id//让当前路由id为此id
        })
    },
}
</script>

<style scoped>
    .example{
        border-top:1px solid #eee;
    }
    section{
        width:1200px;
        margin:auto;
    }
    header{
        padding:10px 0;
        /* border-bottom: 1px solid #eee; */
    }
    header h2{
        color:#333;

    }
    
    .flex1{
        flex:1;
    }
    .example-right{
        width: 280px;
        margin-left:50px;
        /* background:pink; */
    }
    .direction{
        align-self: center;
        padding-left:40px;
        font-size:20px;
    }
    header div{
        color:#999;
        font-size: 14px;
    }
    .cooperate-img {
        text-align: center;
        padding:40px 80px 0;
        overflow: hidden;
        /* background:pink; */
    }
    .cooperate-img div>img{
        width:640px;
        margin:auto;
        display: block;
    }
    .cooperate-img div{
        position:relative;
    }
    .cooperate-img div .transition{
        position: absolute;
        top: 23px;
        left: 59px;
        width: 593px;
        height: 338px;
        overflow: auto;
    }
    .cooperate-img .sj {
        width: 710px;
        height: 750px;
        margin: auto;
        overflow: hidden;
    }
    .cooperate-img .sj .sj-png{
        position: absolute;
        top:0;
        left:50%;
        transform: translateX(-50%);
    }
    .cooperate-img .sj-png>img{
        width: 810px;
    }
    .cooperate-img .sj .transition{
        z-index: -1;
        position: absolute;
        top: 20px;
        left: 50.5%;
        transform: translateX(-50%);
        width: 296px;
        height: 640px;
        overflow: auto;
    }
    /* 手机端的二维码 */
    .cooperate-img .sj .ercode{
        position: absolute;
        width: 298px;
        height: 645px;
        top: 15px;
        left: 50.5%;
        transform: translateX(-50%);
        overflow: hidden;
        z-index: 0;
        border-radius: 25px;
    }
    .cooperate-img .sj .ercode div{
        width: 298px;
        height: 645px;
        margin-top:-645px;
        background-color: rgba(0,0,0,.5);
        transition: all .4s linear;
    }
    .cooperate-img .sj .ercode:hover div{
        margin-top:0px;
    }
    .cooperate-img .sj .ercode img{
        width:200px;
        height:228px;
        position: absolute;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);
    }
    .cooperate-img div .transition::-webkit-scrollbar {
        width:0;
        height:0;
        color:transparent;
    }

    .section-ul-li-img i{
        display: block;
        height:200px;
        margin: 10px 0 14px;
        overflow: hidden;
    }
    .cooperate-img div .transition img{
        width:100%;
        display: block;
    }
    .between-right a{
        color:#999;
        display: block;
        text-align: right;
    }
    .between-right .between span:nth-child(1){
        display: inline-block;
        padding:0px 20px 10px 0;
    }
    .cooperate-text{
        border-top: solid 1px #d3d3d3;
    }
    .cooperate-text h1{
        line-height: 63px;
        height: 63px;
        color:#333;
        font-size: 20px;
    }
    .cooperate-text p{
        color: #717171;
        font-size: 14px;
        line-height: 20px;
        text-align: justify;
        padding:20px 20px 40px 20px;
    }
    .example-right h3{
        padding: 16px;
        color: #333;
        font-weight: 400;
        font-size: 16px;
        font-weight: bold;
        background-color: #f7f7f7;
        text-align: center;
        /* margin-bottom: 1px; */
        border-bottom: 1px solid #ddd;
    }
    .example-right ul li{
        background:#f5f5f5;
        padding:10px;
        margin-bottom: 10px;
    }
    .example-right img{
        width:100%;
    }
    .example-right .section-ul-li-div{
        color:#333;
        font-size: 14px;
    }
    .example-right .section-ul-li-div p{
        font-size: 12px;
        color: #b8b8b8;
        line-height: 25px;
    }
    .example-left .cooperate-text>>>img{
        display: block;
        width: 100%;
        margin:auto;
    }
</style>
