<template>
    <div class="navbar">
        <!-- <div class="nav">
            <p  class="nav-item"><a href="javascript:;">{{navTitle}}</a> <span class="el-icon-arrow-right"></span></p>
            <ul class="nav-list">
                <li v-for="(item,index) in navbar" :key="index" :class="{active:index==navbarNum}">
                    <a :href="item.to" @click="navbarClick(index)">{{item.title}}</a>
                </li>
            </ul>
        </div> -->
        <div class="banner">
            <p class="nav-banner"><img :src="bannerImg" alt=""></p>
            <div class="img-center">
                <p>{{imgTitle}}</p>
                <p class="txt">{{imgTxt}}</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        navTitle:{
            type:String,
            required:true
        },
        navbar:{
            type:Array,
            required:true
        },
        bannerImg:{
            type:String,
            required:true
        },
        imgTitle:{
            type:String,
            required:true
        },
        imgTxt:{
            type:String,
            required:true
        }
    },
    data(){
        return{
            navbarNum:0
        }
    },
    methods:{
        navbarClick:function(e){
            console.log(e)
            this.navbarNum = e
        }
    }
}
</script>
<style scoped>
    /* .navbar{
        border-top:1px solid #E9E9E9;
    }
    .nav {
        width:1200px;
        overflow: hidden;
        margin:auto;  
        font-size: 14px;
    }
    .nav .nav-item{
        width:290px;
        float:left;
        text-align: center;
    }
    .nav .nav-item span{
        display: inline-block;
        padding-right: 80px;
        color:#1371FF;
        padding:20px;
    }
    .nav .nav-list {
        padding-left: 120px;
        overflow: hidden;
    }
    .nav .nav-list li{
        float: left;
        padding:20px 0;
        padding-right:40px;
    }
    .nav .nav-list li.active a{
        color:#1371FF;
        padding:18px 0;
        border-bottom: 2px solid #1371FF;
    }
    .nav .nav-list li a{
        color:#666666;
    } */


    /* 图片部分 */
    .navbar{
        width:100%;
        min-width:1200px;
        margin:auto;
        overflow: hidden;
    }
    .banner{
        position:relative;
        overflow: hidden;
    }
    .nav-banner img{
        display: block;
        width:100%;
        min-width:1200px;
        margin:auto;
    }
    .banner .img-center{
        color:#fff;
		top:45%;
        text-align: center;
        font-size: 42px;
        font-weight:bold;
    }
    .banner .img-center p{
        width:1200px;
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
</style>