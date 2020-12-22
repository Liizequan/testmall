<template>
<div class="lh-affairs">
    <!-- 头部 -->
    <header>
        <div class="header-banner">
            <img src="../image/affairs/banner.png" alt="">
        </div>
    </header>
    <!-- 内容1 -->
    <section class="section1">
        <div class="section-top">
            <p class="section-top-title">从创业者到企业家的零距离</p>
            <p class="section-top-sub gray">由众创空间到甲级写字楼办公环境的飞越</p>
        </div>
        <div class="section-item">
            <div class="section-list">
                <div class="section-list-img"><i><img src="../image/componey.png" alt=""></i></div> 
                <div class="section-list-text">
                    <p class="section-list-title">多种多样办公类型</p>
                    <p class="gray">从众创空间到甲级写字楼360°全景俯视全城的办公楼，我们能随时提供</p>
                </div>
            </div>
            <div class="section-list">
                <div class="section-list-img"><i><img src="../image/bulbs.png" alt=""></i></div>
                <div class="section-list-text">
                    <p class="section-list-title">多种方案</p>
                    <p class="gray">客户选择多种多样,共享办公空间到商务贵宾室，租赁方式可以按天、小时、月、年等</p>
                </div>
            </div>
            <div class="section-list">
                <div class="section-list-img"><i><img src="../image/made.png" alt=""></i></div>
                <div class="section-list-text">
                    <p class="section-list-title">灵活定制</p>
                    <p class="gray">客户可以根据业务现状更换空间大小，并按需变更办公地点，方便快捷地入驻办公室，不必中断业务</p>
                </div>
            </div>
        </div>
    </section>
    <!-- 内容2 -->
    <section class="section2 bg-color">
        <div class="section-top">
            <p class="section-top-title">为何选择利好财务商务办公？</p>
            <p class="section-top-sub gray">大型办公室、共享办公空间及会议空间，网络现代化办公空间与共享办公解决方案可助您保持高效率</p>
        </div>
        <div class="section-content">
            <div class="section-content-left">
                <div>
                    <p class="num">01</p>
                    <p class="china">满足您业务需求的办公空间一应俱全，即到即用</p>
                    <p class="englth">Office space to meet your business needs, ready to use</p>
                </div>
                <div>
                    <p class="num">02</p>
                    <p class="china">签订一份合约，即可拥有专属的团队随时为您提供服务</p>
                    <p class="englth">You will only need to sign a contract and enjoy clear and clear accounts. A dedicated team is always available to serve you.</p>
                </div>
            </div>
            <div class="section-content-center">
                <img src="../image/affairs/list1.png" alt="">
            </div>
            <div class="section-content-right">
                <div>
                    <p class="num">03</p>
                    <p class="china">您可根据业务现状和企业发展需求，灵活延长或缩短租期</p>
                    <p class="englth">You can flexibly extend or shorten your lease based on your business situation and your business development needs.</p>
                </div>
                <div>
                    <p class="num">04</p>
                    <p class="china">我们拥有专业且激发灵感的办公环境，可满足多种规模 与预算的业务需求</p>
                    <p class="englth">We have a professional and inspiring office environment that meets the needs of a wide range of budgets and budgets.</p>
                </div>
            </div>
        </div>
    </section>
    <!-- 内容3 -->
    <section class="section3">
        <div class="section-top">
            <p class="section-top-title">办公空间解决方案</p>
            <p class="section-top-sub gray">我们提供一系列的方案以满足不同的使用需求</p>
        </div>
        <div class="section3-content">
            <div class="section-content-flex">
                <div class="section-content-text">
                    <div class="translate-center">
                        <p class="title">服务式办公空间</p>
                        <p class="gray">办公空间设备齐全，更配有高速IT设施，可随业务拓展随意调换办公空间的大小。不论是用于个人办公还是团队工作，总有一款适合您。</p>
                    </div>
                </div>
                <div><img src="../image/affairs/list2.png" alt=""></div>
            </div>
            <div class="section-content-flex">
                <div><img src="../image/affairs/list3.png" alt=""></div>
                <div class="section-content-text">
                    <div class="translate-center">
                        <p class="title">注册型办公空间</p>
                        <p class="gray">在保证您公司合法注册的前提下，最大程度地节省公司成立和运营成本。同时拥有专业的服务团队和良好的公司形象，低成本投入+专业配套。</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- 内容5 -->
    <div class="section5">
        <my-ensure></my-ensure>
    </div>
    <!--尾部-->
    <footer>
        <my-foot></my-foot>
    </footer>
</div>
</template>
<script>
import myEnsure from '../components/Ensure.vue'
import myFoot from '../components/Footer.vue'
export default {
    components:{
        myEnsure,
        myFoot,
    }
}
</script>
<style scoped>
    .section2{
        width:100%;
    }
    .lh-affairs .header-top,.section1,.section5 ul,.section3 .section3-content{
        width:1200px;
        margin: auto;
    }
    .header-top{
        padding-top:20px;
        display: flex;
        justify-content: space-between;
    }
    /* 内容2 */
    .section2 .section-content{
        width:1200px;
        padding-bottom: 80px;
        display: flex;
        justify-content: space-between;
    }
    .section-content>div{
        flex:1;
        display:flex;
        text-align: left;
        flex-direction: column;
        justify-content: space-between;
    }
    .section-content-center{
        padding:0 50px;
    }
    .section2 .num{
        font-size:48px;
        font-weight:400;
        color:#BB0000;
        padding:24px 0;
    }
    .section2 .china{
        font-size:14px;
        font-weight:400;
        color:#333333;
        padding:10px 0;
        text-align:justify;
    }
    .section2 .englth{
        font-size:13px; 
        font-weight:400;
        text-align: justify;
        /* text-transform: uppercase; */
        color:rgba(153,153,153,1);
    }
    /* 内容3 */
    .section3 .section-content-flex{
        display: flex;
        justify-content: space-between !important;
    }
    .section3-content{
        padding:10px 0 30px;
    }
    .section-content-flex{
        padding:50px 0;
    }
    .section3-content .title{
        font-size:24px;
        color:#333333;
        padding-bottom:30px;
        margin-bottom: 30px;
        position: relative;
    }
    .section3-content img{
        display: block;
    }
    .section3-content .title::after{
        content: "";
        display: block; 
        width:24px;
        height:4px;
        position: absolute;
        bottom: 0;
        left:50%;
        transform: translateX(-50%);
        background-color: #BB0000;
    }
    .section-content-text{
        position:relative;
        text-align: center;
        margin: 0 20px;
        flex:1;
    }
</style>