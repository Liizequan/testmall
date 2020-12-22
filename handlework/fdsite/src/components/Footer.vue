<template>
    <div class="footer">
        <div class="footer-txt ">
            <div class="between">
                <div class="footer-txt-left">
                    <ul class="between">
                        <li class="list" v-for="(item,index) in list" :key="index" >
                            <ul>
                                <li class="list-parent"><router-link :to="item.to">{{item.name}}</router-link></li>
                                <li class="list-child" v-for="(itemList, index) in item.listChild" :key="index" @click="newRoute(item.to)">
                                    <a href="javascript:scroll(0,0)">{{itemList}}</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    
                    <div class="footer-txt-bottom">
                        <span>友情链接：</span> 
                        <ul class="flex-left">
                            <li><a href="javacript:;" target="_blank">农情商事</a> </li>
                            <li><a href="javacript:;" target="_blank">利好财务策划</a></li>
                            <li><a href="javacript:;" target="_blank">利众财富</a></li>
                            <li><a href="javacript:;">浮点动力科技</a></li>
                        </ul>
                    </div>
                </div>
                <div class="footer-txt-center">
                    <p class="footer-txt-center-img"><img src="../image/erweima.png" alt=""></p>
                    <p class="footer-txt-center-know">了解更多讯息</p>
                </div>
                <div class="footer-txt-right">
                    <p class="footer-txt-right-name">24小时服务热线：</p>
                    <h3>020-89855824</h3>
                    <div class="footer-txt-right-img">
                        <i>
                            <img src="../image/qq.png" alt="" class="img-center">
                            <img src="../image/QQ-H.png" alt="" class="img-center"></i>
                        <i>
                            <img src="../image/wx.png" alt="" class="img-center">
                            <img src="../image/WX-H.png" alt="" class="img-center">
                        </i>
                    </div>
                    <!-- <p>
                        <i><img src="../image/logo.png" alt=""></i>
                    </p>     -->
                </div>
            </div>
        </div>
        <div class="footer-brank">
            <div class="between">
                <p>Copyright Guangzhou FP Technology services Co., Ltd. All rights reserved.© 2019-2025 <a href="http://beian.miit.gov.cn/" target="_blank"> 粤ICP备18159670号-4</a> 
                </p>
                <span>广州浮点动力科技服务有限公司版权所有</span> 
                
            </div>
        </div>
    </div>
</template>
<script>
import { watch } from 'fs';
export default {
    data(){
        return{
            list:[
                {
                    name:'系统开发',
                    to:'/system',
                    listChild:[
                        '网站建设',
                        'APP开发',
                        '微信小程序',
                        '企业商城建设',
                        '后台开发'
                    ]
                },  
                {
                    name:'品牌打造',
                    to:'/brank',
                    listChild:[
                        'LOGO设计',
                        '企业画册',
                        '企业VI',
                        // '企业活动物料',
                        // '企业文化墙'
                    ]
                },
                {
                    name:'科技项目申报',
                    to:'/science',
                    listChild:[
                        '商标申请',
                        // '版权登记',
                        '专利申请',
                        '高新技术认定',
                        // '知识产权贯标'
                    ]
                },
                {
                    name:'关于我们',
                    to:'/about',
                    listChild:[
                        '企业简介',
                        '企业文化',
                        '联系我们',
                    ]  
                }
            ],
            nowRoute:'',
        }
    },
    methods:{
        newRoute:function(e){
            console.log(e)
            this.$router.push({  //核心语句
              path:e, 
            })
        }
    },
    watch: {
    // 页面返回上一步时调用
        $route(to,from){
            // console.log(to)//to目前地址   from 上一个页面地址
            var nowTo = to.path;
            console.log(nowTo)
            this.nowRoute = nowTo;
        }
    },
}
</script>
<style scoped>
    .footer{
        width:100%;
        min-width:1200px;
        /* border-bottom: 1px solid #f5f4f4; */
        /* background-color:#368; */
    }
    .footer-txt{
        width:1200px;
        margin:auto;
        padding-top:60px;
        /* background-color: aqua; */
    }
    .footer-txt-left{
        width:730px;
    }
    .footer-txt-left .between{
        padding-bottom: 30px;
        border-bottom:1px solid #E5E5E5;
    }
    .footer-txt-left a:hover{
        display: inline-block;
        text-decoration: underline;
    }
    .list{
        flex:1;
    }
    .list ul{   
        padding-top:10px;
    }
    .list a{
        font-size:16px;
        color:#333333;
    }
    .list-parent{
        font-size:16px;
        font-weight:400;
        color:#333333;
        margin-bottom: 20px;
    }
    .list-child a{
        color:#999;
        font-size:14px;
        line-height: 24px;
    }
    .footer-txt-center-img{
        padding:4px;
        width:96px;
        height:96px;
        margin:auto;
        border:1px solid #C6C6C6;
    }
    .footer-txt-center-img img{
        display: block;
    }
    .footer-txt-center-know{
        font-size:13px;
        color:#89898A;
        text-align: center;
        padding-top:10px;
    }
    .footer-txt-right-name{
        color:#999;
    }
    .footer-txt-right h3{
        font-size: 24px;
        color:#333333;
        height:50px;
        line-height:40px;
        border-bottom:1px solid #E5E5E5;
    }
    .footer-txt-right-img{
        padding:20px 0 30px;
        text-align: left
    }
    .footer-txt-right-img i{
        display:inline-block;
        width:30px;
        height:30px;
        border-radius: 50%;
        position: relative;
        border:1px solid #999999;
    }
    .footer-txt-right-img i img:nth-child(2){
        display: none;
    }
    .footer-txt-right-img i:hover{
        border: 1px solid transparent;
    }
    .footer-txt-right-img i:hover img:nth-child(1){
        display: none;
    }
    .footer-txt-right-img i:hover img:nth-child(2){
        display: block;
    }
    .footer-txt-bottom {
        padding:25px 0;
    }
    .footer-txt-bottom span{
        font-size:16px;
        height:42px;
        line-height:25px;
        color:#666666;
    }
    .footer-txt-bottom li{
        font-size: 14px;
        color: #89898A;
    }
    .flex-left {
        padding-top:10px;
    }
    .flex-left li{
        padding-right: 40px;
    }
    .flex-left li a{
        color: #89898A;
    }
    .footer-brank{
        width:100%;
        min-width:1200px;
        margin:auto;
        font-size:12px;
        height:42px;
        line-height: 42px;
        background-color:#262728;
        color:#89898A;
        text-align: center;
    }
    .footer-brank .between{
        width:1200px;
        margin:auto;
    }
    .footer-brank .between a{
        color:#89898A;
    }
</style>
